'use strict';

import {
    WebSocketClient
} from '.././websocket'



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
    if (UnauthList.indexOf(cmd) == -1) {
        return true
    }
    return false
}

class myWs2 extends WebSocketClient {
    constructor(uri, opts) {
        super(uri, {
            binaryType: "arraybuffer"
        })

        this.uri = uri
        this.token = ""
        this.requestId = 0

        this.queue = []
        this.queueNeedAuth = []
        this.sendingObject = {}

        // this.cbonpush = [] // 推送列表

        this.logining = false // 正在登录
        this.logined = false

        this.on('open', () => {
            console.log("SocketAPI 连接成功：" + this.uri)
            this.token = localStorage.getItem("token") || ""
            if (this.token && this.token.length > 0) {
                // console.error("对不起，还不能自动重连，没有token登录接口")
                this.logining = false
                this.logined = true
            }
            this.flushUnreached()
            this.flushPending()
        })

        this.on('message', (msg) => {
            let message = ""
            if (msg instanceof ArrayBuffer) {
                message = Buffer.from(msg).toString('utf-8')
            } else if (typeof msg == "string") {
                message = msg
            }
            this.onmessage(message)
            if (this.ready) {
                this.flushPending()
            }
        })

        this.on('error', (error) => {
            this.logined = false
            // this.token = ""
            console.log("SocketAPI 出错: " + this.uri + ", " + error)
        })

        this.on('close', (code, msg) => {
            this.logined = false
            // this.token = ""
            console.log("SocketAPI 关闭: " + this.uri + ", " + code)
        })

        this.on('timeout', () => {
            // console.log("ws 收包超时: " + this.uri)
        })

        this.on('heartbeat', () => {
            // console.log("ws 发送心跳: " + this.uri)
            if (this.ready) {
                this.sendInternal({
                    cmd: "/heartbeat"
                })
            }
        })
    }

    isOnline() {
        return this.ready
    }

    isLogin() {
        return this.token && this.token != ""
    }

    // 设置退出
    logout() {
        this.logined = false
        this.token = ""
        Storage.delString("token")
        this.emit("logout")
    }

    // 收包
    onmessage(msg) {
        let data = {}

        try {
            data = JSON.parse(msg)
        } catch (e) {
            console.log("json出错", msg);
            return
        }
        if (process.env.VERSION_NAME != "正式版" && data.cmd != "/heartbeat") 
            console.log("收到的数据为", data);

        // 处理登录
        if (data.code == 0) {
            // if (data.cmd == '/login' || data.cmd == '/user/register') {
            if (data.cmd == '/login') {
                // 登录成功
                this.logined = true
                this.logining = false

                this.flushNeedAuthed() // 重发需要登录的消息

                if (data.data && data.data.token) {
                    Storage.setString("token", data.data.token)
                    this.token = data.data.token
                }
                if (data.data && !data.data.token) {
                    data.data.token = Storage.getString("token")
                }
                this.emit("login", data.result) // 广播登录上去的消息

            } else if (data.cmd == '/logout') {
                // 退出登录
                this.logout()
            } else if (data.cmd == '/user/query') {
                this.emit('setToken', this.token)
            }
        } else if (data.code == 1007 || data.code == 1008 || data.code == 1014) {
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

            // let router = cmd.split('/')[2]
            let router = cmd.substring(6);
            let accountType = data.accountType

            /*
            /push/tradeRecord
            /push/account
            /push/commodity
            /push/contract
            /push/logout
            */
            this.emit('onPush', router, accountType, data.data)
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
    request(cmd, param, cb, emitDefault) {
        let message = {
            cmd: cmd,
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
        this.send(JSON.stringify(obj))
    }
}

export let SocketAPI = new myWs2("ws://119.23.207.130:53932/chat")
