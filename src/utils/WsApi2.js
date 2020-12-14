'use strict';
import * as signalR from "@aspnet/signalr";
import { range } from "rxjs";
import { map, filter } from "rxjs/operators";
import {
  EventEmitter
} from "@/websocket/eventemitter3"


/*
/heartbeat         心跳 
/login             登录 
/user/register     注册 
/public/auth_img   获取图形验证码 
/sms/send          发送短信
/user/update/password/login2 忘记密码 
/commodity/list     品种列表
/contract/list      合约列表
/currency/list      汇率列表
/quote/list         行情列表
/system/notice/list     公告
/system/telecast/list   直播
*/
const UnauthList = [
  '/heartbeat', //         心跳 
  '/login', //             登录 
  '/user/register', //     注册 
  '/code/image', //   获取图形验证码 
  '/code/sms/send', //          发送短信
  '/user/update/password/login2', // 忘记密码 
  '/user/update/password/login1', // 忘记密码 
  '/commodity/list', //     品种列表
  '/contract/list', //      合约列表
  '/currency/list', //      汇率列表
  '/quote/list', //         行情列表
  '/system/notice/list', //     公告
  '/system/telecast/list', //   直播
]
const checkNeedAuth = (cmd) => {
  return true;
  if (UnauthList.indexOf(cmd) == -1) {
    return true
  }
  return false
}

class myWs2 extends EventEmitter {
  constructor(uri, options) {
    super()
    this.options = options || {};
    this.connection = null;
    this.uri = uri
    this.initConnection(this.uri);
    this.token = ""
    this.requestId = 0

    this.queue = []
    this.queueNeedAuth = []
    this.sendingObject = {}

    this.logining = false // 正在登录
    this.logined = true

    this.connection.on('receive', (result) => {
      this.onReceive(result);
      if (this.ready) {
        this.flushPending()
      }
    })

    this.connection.on('error', (error) => {
      this.logined = false
      console.log("signalR 出错: " + this.uri + ", " + error)
    })

    this.connection.on('timeout', () => {
      console.log("signalR 收包超时: " + this.uri)
    });

    this.connection.on("echo", (name, message) => {
      const msg = name + " 说： " + message;
      console.log(msg);
    });

    this.connection.on('disconnected', (value) => {
      console.error("signalR 断开连接: " + this.uri)
    })
  }

  streamSubscribe() {
    this.connection.stream("DelayCounterAsync", 5000)
      .subscribe({
        next: (item) => {
          range(1, item)
        .pipe(
          filter(x => x % 2 === 1),
          map(x => x + x)
        ).subscribe(x => console.log(x));
        },
        complete: () => {
          
          console.log({
            action: 'complete'
          });
        },
        error: (err) => {
          console.log({
            data: err,
            action: 'error'
          });
        }
      });
  }

  sendCommand(cmd) {
    this.connection.send("handler", cmd)
      .then(() => {
        console.info(cmd)
      });
  }

  onClose(error) {
    this.logined = false
    // this.token = ""
    console.log("signalR 关闭: " + this.uri + ", " + error)
  }

  initConnection(url) {
    var protocol = new signalR.JsonHubProtocol();
    var connectionBuilder = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(url, {
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withHubProtocol(protocol);

    this.connection = connectionBuilder.build();
    this.connection.onclose = this.onClose;
    this.connection.onreceive = this.onReceive;

    this.connection.connectionClosed = (error) => {
      console.error(error);
    }
  }

  async start() {
    await this.connection.start();
    console.log("signalR 连接成功：" + this.uri);
    if (this.token && this.token.length > 0) {
      this.logining = false;
      this.logined = true;
    }
    this.flushUnreached();
    this.flushPending();
    return this.isOnline();
  }

  isOnline() {
    return this.connection.state > 0;
  }

  isLogin() {
    return true;//this.token && this.token != ""
  }

  // 设置退出
  logout() {
    this.logined = false
    this.token = ""
    this.emit("logout")
  }

  // 收包
  onReceive(data) {
    if (process.env.VERSION_NAME != "正式版")
      console.log("收到的数据为", data);
    // 处理登录
    if (data.code == 0) {
      if (data.cmd == 'login') {
        // 登录成功
        this.logined = true
        this.logining = false

        this.flushNeedAuthed() // 重发需要登录的消息

        this.emit("login", data.result) // 广播登录上去的消息

      } else if (data.cmd == 'logout') {
        // 退出登录
        this.logout()
      } else if (data.cmd == '/user/query') {
        this.emit('setToken', this.token)
      }
    } else if (data.code == 1007) {
      // token失效，过期，认证失败
      this.logout()
      this.emit('tokenError', data.code)
      return  // 这里直接返回，不处理回调
    }

    if (data.requestId && this.sendingObject[data.requestId]) {
      let obj = this.sendingObject[data.requestId]
      let cb = obj.cb
      delete this.sendingObject[data.requestId]
      if (cb && typeof cb == "function") {
        cb(data)
      }
    }

    // 处理推送
    if (data.requestId == null || data.requestId == undefined) {
      let cmd = data.cmd
      if (data.cmd == '/push/logout') {
        // 被踢下线，推送
        this.logout()
      }
      let scope = data.scope
      /*
      /push/account
      /push/contract
      /push/logout
      */
      this.emit('onPush', scope, cmd, data)
    }
  }

  flushPending() {
    let tmparr = this.queue
    this.queue = []
    for (let i = 0; i < tmparr.length; i++) {
      let obj = tmparr[i]
      if (!this.logined && checkNeedAuth(obj.message.cmd)) {
        if (this.logining) {
          this.queueNeedAuth.push(obj)
        } else {
          // 没鉴权，没登录，直接报错
          obj.cb({
            code: 1001,
            requestId: -1,
            cmd: obj.message.cmd,
            msg: "您未登录，请先登录，否则不能调用需要鉴权的接口"
          })
        }
      } else {
        this.sendInternal(obj.message, obj.cb)
      }
    }
  }

  flushUnreached() {
    let tmpobj = this.sendingObject
    this.sendingObject = {}
    let keys = Object.keys(tmpobj)
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i]
      let obj = tmpobj[k]
      this.sendInternal(obj.message, obj.cb)
    }
  }

  flushNeedAuthed() {
    if (this.logined) {
      let tmparr = this.queueNeedAuth
      this.queueNeedAuth = []
      for (let i = 0; i < tmparr.length; i++) {
        let obj = tmparr[i]
        this.sendInternal(obj.message, obj.cb)
      }
    }
  }

  // send message
  request(scope, cmd, param, cb, emitDefault) {

    let message = {
      cmd: cmd,
      scope: scope,
      param: param
    }
    return this.reqInternal(message, cb, emitDefault || false)
  }

  requestDefault(cmd, param, cb) {
    return this.request(cmd, param, cb, true)
  }

  // promise, private
  reqInternal(message, cb, emitDefault) {
    let promise = null
    let obj = {
      message: message,
      retValue: null
    }
    let makeCallBack = (resolve, reject) => {
      return (res) => {

        obj.retValue = res

        if (res.code == 0) {
          return resolve(res.data)
        } else {
          // 格式化一下message
          let orgmsg = JSON.parse(JSON.stringify(message))
          // 失败：
          console.error(`SocketAPI error: requestId = ${res.requestId}, cmd = ${res.cmd}, message`, orgmsg, ` code = ${res.code}, reason = ${res.msg}`)
          if (reject) {
            return reject(res.msg)
          } else {
            return resolve(res.msg)
          }
        }
      }
    }
    if (!cb && typeof cb !== "function") {
      promise = new SimplePromise((resolve, reject) => {
        obj.cb = makeCallBack(resolve, reject)
      })

      promise.finally(() => {
        // console.log("请求完成...", promise)
        // 获取是否调用过then
        if (emitDefault || promise.getCallNum() <= 0) {
          let res = obj.retValue
          let msg = JSON.parse(JSON.stringify(obj.message))
          let code = res.code
          let cmd = res.cmd
          let data = res.data
          if (code == 0) {
            // 没调用过then，抛一下消息
            this.emit('defaultCallback', cmd, data, msg)
          }
        }
        obj.retValue = null
        obj.cb = null
      })

    } else {
      obj.cb = makeCallBack(cb)
    }

    if (message.cmd == '/login') {
      this.logining = true
    }

    this.queue.push(obj)
    this.ready = true;
    if (this.ready) {
      this.flushPending()
    }
    return promise
  }

  sendInternal(message, cb) {
    let obj = {
      token: this.token,
      requestId: (++this.requestId),
      ...message
    }
    if (process.env.VERSION_NAME != "正式版" && obj.cmd != "/heartbeat")
      console.log("发送的参数", obj)
    let no = obj.requestId
    if (cb && typeof cb == "function") {
      this.sendingObject[no] = {
        message: message,
        cb: cb
      }
    }
    var msg = JSON.stringify(obj);
    this.invoke(this.connection, 'handler', obj.scope, obj.cmd, msg);
    // this.send(JSON.stringify(obj))
  }

  invoke(connection, method) {
    var argsArray = Array.prototype.slice.call(arguments);
    connection.invoke.apply(connection, argsArray.slice(1))
      .then(function (result) {
        console.log("调用成功");
        if (result) {
          console.log(result);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

export let SocketAPI = new myWs2("http://106.75.247.121/notification", {})
