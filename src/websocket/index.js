"use strict"
import {
    EventEmitter
} from "./eventemitter3"

class WebSocketBrowser extends EventEmitter {
    /** Instantiate a WebSocket class
     * @constructor
     * @param {String} address - url to a websocket server
     * @param {(Object)} options - websocket options
     * @param {(String|Array)} protocols - a list of protocols
     * @return {WebSocket} - returns a WebSocket instance
     */
    constructor(address, options, protocols) {
        super()

        let BrowserWebSocket = window.WebSocket || window.MozWebSocket;

        this.socket = new BrowserWebSocket(address, protocols)

        if (options && options.binaryType) {
            this.socket.binaryType = options.binaryType
        }

        this.socket.onopen = (evt) => this.emit("open", evt)
        this.socket.onmessage = (event) => this.emit("message", event)
        this.socket.onerror = (error) => this.emit("error", error)
        this.socket.onclose = (evt) => this.emit("close", evt.code, evt.reason)
    }

    /**
     * Sends data through a websocket connection
     * @method
     * @param {(String|Object)} data - data to be sent via websocket
     * @param {Object} options - ws options
     * @param {Function} callback - a callback called once the data is sent
     * @return {Undefined}
     */
    send(data, options, callback) {
        callback = callback || options || function () { }

        try {
            if (this.socket.readyState == 1) {
                this.socket.send(data)
                callback()
            } else if (this.socket.readyState == 2) {
                this.emit('close', 101)
            } else if (this.socket.readyState == 3) {
                this.emit('close', 102)
            }
        } catch (error) {
            console.error(error)
            this.emit("error", error)
        }
    }

    /**
     * Closes an underlying socket
     * @method
     * @param {Number} code - status code explaining why the connection is being closed
     * @param {String} reason - a description why the connection is closing
     * @return {Undefined}
     * @throws {Error}
     */
    close(code, reason) {
        this.socket.close(code, reason)
    }
}

export class WebSocketClient extends EventEmitter {
    /**
     * Instantiate a Client class.
     * @constructor
     * @param {String} address - url to a websocket server
     * @param {Object} options - ws options object with reconnect parameters
     * @param {Function} generate_request_id - custom generation request Id
     * @return {Client}
     */
    constructor(address = "ws://localhost:8080", {
        binaryType = "blob",
        autoconnect = true,
        reconnect = true,
        heartbeat_inteval = 10 * 1000, // 心跳间隔
        reconnect_interval = 1000,
        /** The number of milliseconds to delay before attempting to reconnect. */
        max_reconnect_interval = 30000,
        /** The maximum number of milliseconds to delay a reconnection attempt. */
        reconnectDecay = 1.5,
        /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
        timeoutInterval = 2000,
        /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
        max_reconnects = 0 /** 0 means forever */
    } = {}) {
        super()

        this.binaryType = binaryType
        this.address = address
        this.options = arguments[1]
        this.autoconnect = autoconnect
        this.ready = false
        this.reconnect = reconnect
        this.reconnecting = false, // 重连中
            this.reconnect_interval = reconnect_interval
        this.max_reconnects = max_reconnects

        this.max_reconnect_interval = max_reconnect_interval
        this.reconnectDecay = reconnectDecay
        this.timeoutInterval = timeoutInterval

        this.current_reconnects = 0

        this.heartbeat_timeout = 3 * heartbeat_inteval
        this.heartbeat_inteval = heartbeat_inteval
        this.heartbeatTimer = null
        this.heartbeatInterval = null

        this._visibleLister = this._setupVisibleLister()

        this.userclose = false

        if (this.autoconnect)
            this._connect(this.address, this.options)
    }
    /**
     * Connects to a defined server if not connected already.
     * @method
     * @return {Undefined}
     */
    connect() {
        if (this.socket)
            return

        this._connect(this.address, this.options)
    }

    /**
     * Closes a WebSocket connection gracefully.
     * @method
     * @param {Number} code - socket close code
     * @param {String} data - optional data to be sent before closing
     * @return {Undefined}
     */
    close(code, data) {
        let c = code || 1000
        this.ready = false
        if (c == 1000) {
            this.userclose = true
            this._clearVisibleLister()
            this._clearTimerAndInterval()
        }
        this.socket.close(c, data)
    }

    send(data) {
        if (this.ready) {
            this.socket.send(data)
        }
    }

    // 强制重连
    _refresh() {
        this.socket.close()
    }

    _resetTimer() {
        if (this.heartbeatTimer) {
            clearTimeout(this.heartbeatTimer)
            this.heartbeatTimer = null
        }
        this.heartbeatTimer = setTimeout(() => {
            this.emit('timeout') // 超时重连
            this._refresh()
        }, this.heartbeat_timeout)
    }

    _setHeartbeatInterval() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
            this.heartbeatInterval = null
        }
        this.heartbeatInterval = setInterval(() => {
            this.emit('heartbeat') // 上层自己去send ping
        }, this.heartbeat_inteval)
    }

    _clearTimerAndInterval() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
            this.heartbeatInterval = null
        }
        if (this.heartbeatTimer) {
            clearTimeout(this.heartbeatTimer)
            this.heartbeatTimer = null
        }
    }

    _clearVisibleLister() {
        if (document) {
            document.removeEventListener("visibilitychange", this._visibleLister)
        }
    }

    _setupVisibleLister() {
        var _visibleLister = () => {
            if (document) {
                if (document.visibilityState == "hidden") {
                    // visible -> hidden
                    this.hiddenTime = new Date().getTime()
                } else {
                    // hidden  -> visible
                    let visibleTime = new Date().getTime()
                    if ((visibleTime - this.hiddenTime) > 30 * 1000) {
                        // console.log("灭屏重显。。超过30秒")
                        console.log("灭屏重显。。超过30秒")
                        this.close(3000)
                    } else {
                        this._resetTimer()
                        this._setHeartbeatInterval()
                    }
                }
            }
        }
        if (document) {
            document.addEventListener("visibilitychange", _visibleLister)
        }
        return _visibleLister
    }

    /**
     * Connection/Message handler.
     * @method
     * @private
     * @param {String} address - WebSocket API address
     * @param {Object} options - ws options object
     * @return {Undefined}
     */
    _connect(address, options) {
        var _reconnect = () => {
            if (this.reconnecting) {
                // 已经重连了，退出
                return;
            }
            this.current_reconnects++

            if (this.reconnect &&
                (this.max_reconnects > this.current_reconnects) ||
                this.max_reconnects === 0) {
                var timeout = this.reconnect_interval * Math.pow(this.reconnectDecay, this.current_reconnects)
                this.reconnecting = true // 准备重连，保证只有一次
                setTimeout(() => {
                    this._connect(address, options)
                    this.reconnecting = false
                }, timeout > this.max_reconnect_interval ? this.max_reconnect_interval : timeout)
            }
        }

        this.socket = new WebSocketBrowser(address, options)

        this.socket.on("open", (evt) => {
            this.ready = true

            this.emit("open", evt)

            this.current_reconnects = 0

            this._setHeartbeatInterval()
            this._resetTimer()
        })

        this.socket.on("message", (message) => {
            this._resetTimer()
            this.emit("message", message.data)
        })

        this.socket.on("error", (error) => {
            this.ready = false

            this._clearTimerAndInterval()
            this.emit("error", error)

            _reconnect()
        })

        this.socket.on("close", (code, message) => {
            let ready = this.ready
            this.ready = false

            this._clearTimerAndInterval()

            if (ready)
                this.emit("close", code, message)

            // the only way to close
            if (this.userclose == true) {
                // console.log("ws真实退出，不重连")
                // dbgLog("ws真实退出，不重连")
                this.removeAllListeners()
                return
            }

            _reconnect()
        })
    }
}
