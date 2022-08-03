import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import Global from "../global/Global";
import LanguageManager from "../language/LanguageManager";
import { LogManager, logMgr } from "../log/LogManager";
import { zLog } from "../log/zLog";
import TipsManager from "../ui/TipsManager";
import CommonProto from "./CommonProto";
import { ISocket, INetworkTips, IProtocolHelper, RequestObject, CallbackObject, NetData, NetCallFunc } from "./NetInterface";

/*
*   CocosCreator网络节点基类，以及网络相关接口定义
*   1. 网络连接、断开、请求发送、数据接收等基础功能
*   2. 心跳机制
*   3. 断线重连 + 请求重发
*   4. 调用网络屏蔽层
*
*/

type ExecuterFunc = (callback: CallbackObject, buffer: NetData) => void;
type VoidFunc = () => void;
type BoolFunc = () => boolean;

export enum NetTipsType {
    Connecting,
    ReConnecting,
    Requesting,
}

export enum NetNodeState {
    Closed,                     // 已关闭
    Connecting,                 // 连接中
    Checking,                   // 验证中
    Working,                    // 可传输数据
}

export interface NetConnectOptions {
    host?: string,              // 地址
    port?: number,              // 端口
    url?: string,               // url，与地址+端口二选一
    autoReconnect?: number,     // -1 永久重连，0不自动重连，其他正整数为自动重试次数
}

export class NetNode {
    protected _connectOptions: NetConnectOptions = null;
    protected _autoReconnect: number = 3;                                   //重连计数器
    protected _isSocketInit: boolean = false;                               // Socket是否初始化过
    protected _isSocketOpen: boolean = false;                               // Socket是否连接成功过
    protected _state: NetNodeState = NetNodeState.Closed;                   // 节点当前状态
    protected _socket: ISocket = null;                                      // Socket对象（可能是原生socket、websocket、wx.socket...)
    protected _closeCode: number = 0;                                       // 网络关闭错误码，服务器推送的errorCode

    protected _networkTips: INetworkTips = null;                            // 网络提示ui对象（请求提示、断线重连提示等）
    protected _protocolHelper: IProtocolHelper = null;                      // 包解析对象
    protected _connectedCallback: Function;                         // 连接完成回调 
    protected _disconnectCallback: BoolFunc = null;                         // 断线回调
    protected _callbackExecuter: ExecuterFunc = null;                       // 回调执行

    protected _keepAliveTimer: any = null;                                  // 心跳定时器
    protected _receiveMsgTimer: any = null;                                 // 接收数据定时器
    protected _reconnectTimer: any = null;                                  // 重连定时器
    protected _heartTime: number = 3000;                                   // 心跳间隔
    protected _receiveTime: number = 6000000;                               // 多久没收到数据断开
    protected _reconnetTimeOut: number = 10000;                              // 超时连接
    protected _requests: RequestObject[] = Array<RequestObject>();          // 请求列表
    protected _listener: { [key: number]: CallbackObject[] } = {}           // 监听者列表
    protected _urls: string[] = [];                                         // url列表，不为空则表示启用轮徇机制
    protected _curUrlIndex: number = -1;                                    // 当前使用url索引
    protected _isUrlEffect: boolean = false;                                // 当前url有效

    /********************** 网络相关处理 *********************/
    public init(socket: ISocket, protocol: IProtocolHelper, networkTips: any = null, execFunc: ExecuterFunc = null) {
        LogManager.getInstance().console(`NetNode init socket`);
        this._socket = socket;
        this._protocolHelper = protocol;
        this._networkTips = networkTips;
        this._callbackExecuter = execFunc ? execFunc : (callobject: CallbackObject, buffer: NetData) => {
            callobject.callback.call(callobject.target, buffer);
        }
    }

    // 设置url列表
    public setUrls(urls: string[]) {
        this._urls = urls;
    }
    // 返回url列表
    public getUrls() { return this._urls; }
    // 轮徇下一个url
    public nextUrl() {
        let url = null, maxIndex = this._urls.length - 1;
        if (maxIndex >= 0 && this._curUrlIndex >= 0) {
            if (!this._isUrlEffect) {
                // 当前url无效，切换下一个
                ++this._curUrlIndex;
                if (this._curUrlIndex > maxIndex) this._curUrlIndex = 0;
            }
            url = this._urls[this._curUrlIndex];
        }
        return url;
    }

    public connect(options: NetConnectOptions): boolean {
        if (!options) {
            TipsManager.getInstance().showToast("Socket ip invalid");
            zLog.info("Socket ip invalid");
            return;
        }
        this._closeCode = 0;
        if (this._socket && this._state == NetNodeState.Closed) {
            if (this._urls.length > 0) {
                this._isUrlEffect = false;
                this._curUrlIndex = this._urls.indexOf(options.url);     // 计算本次使用url在列表中的索引
            }
            if (!this._isSocketInit) {
                this.initSocket();
            }
            zLog.info("Start connect socket :" + options.url);
            this._state = NetNodeState.Connecting;
            if (!this._socket.connect(options)) {
                //this.updateNetTips(NetTipsType.Connecting, false);
                return false;
            }

            // if (this._connectOptions == null) {
            //     options.autoReconnect = options.autoReconnect;
            // }
            this._connectOptions = options;
            this.updateNetTips(NetTipsType.Connecting, true);
            return true;
        }
        return false;
    }

    protected initSocket() {
        this._socket.onConnected = (event) => { this.onConnected(event) };
        this._socket.onMessage = (msg) => { this.onMessage(msg) };
        this._socket.onError = (event) => { this.onError(event) };
        this._socket.onClosed = (event) => { this.onClosed(event) };
        this._isSocketInit = true;
    }

    protected updateNetTips(tipsType: NetTipsType, isShow: boolean) {
        if (this._networkTips) {
            if (tipsType == NetTipsType.Requesting) {
                this._networkTips.requestTips(isShow);
            } else if (tipsType == NetTipsType.Connecting) {
                this._networkTips.connectTips(isShow);
            } else if (tipsType == NetTipsType.ReConnecting) {
                this._networkTips.reconnectTips(isShow);
            }
        }
    }

    // 网络连接成功
    protected onConnected(event) {
        zLog.info("NetNode onConnected! state = " + this._state);
        this.clearTimer();
        this._isSocketOpen = true;
        this._isUrlEffect = true;
        this.onChecked();
        if (this._connectedCallback)
            this._connectedCallback();
    }

    // 连接验证成功，进入工作状态
    protected onChecked() {
        LogManager.getInstance().console("NetNode onChecked!")
        this._state = NetNodeState.Working;
        this.resetAutoReconnect();
        // 关闭连接或重连中的状态显示
        this.updateNetTips(NetTipsType.Connecting, false);
        this.updateNetTips(NetTipsType.ReConnecting, false);

        // 重发待发送信息
        LogManager.getInstance().console(`NetNode flush ${this._requests.length} request`);
        if (this._requests.length > 0) {
            for (var i = 0; i < this._requests.length;) {
                let req = this._requests[i];
                if (req.resend) {
                    this._socket.send(req.buffer);
                }
                if (req.rspObject == null || req.rspCmd <= 0) {
                    this._requests.splice(i, 1);
                } else {
                    ++i;
                }
            }
            // 如果还有等待返回的请求，启动网络请求层
            this.updateNetTips(NetTipsType.Requesting, this.request.length > 0);
        }

        //连上之后 就要发个心跳
        this.startHeartBeat();
    }

    // 接收到一个完整的消息包
    protected onMessage(msg): void {
        // LogManager.getInstance().console(`NetNode onMessage status = ` + this._state);
        // 进行头部的校验（实际包长与头部长度是否匹配）
        if (!this._protocolHelper.checkPackage(msg)) {
            console.error(`NetNode checkHead Error`);
            return;
        }
        // 接受到数据，重新定时收数据计时器
        this.resetReceiveMsgTimer();
        // 重置心跳包发送器
        //this.resetHearbeatTimer();
        // 触发消息执行
        let rspCmd = this._protocolHelper.getPackageId(msg);
        if (rspCmd[0] !== 0 && Global.openRespLog) {
            LogManager.getInstance().console(`NetNode onMessage rspCmd = `, rspCmd[0], rspCmd[1]);
        }
        let id = this.responCmdTransform(rspCmd);
        // 优先触发request队列
        if (this._requests.length > 0) {
            for (let reqIdx in this._requests) {
                let req = this._requests[reqIdx];
                if (req.rspCmd == id) {
                    //LogManager.getInstance().console(`NetNode execute request rspcmd ${rspCmd}`);
                    this._callbackExecuter(req.rspObject, msg);
                    this._requests.splice(parseInt(reqIdx), 1);
                    break;
                }
            }
            if (this._requests.length == 0) {
                this.updateNetTips(NetTipsType.Requesting, false);
            } else {
                // LogManager.getInstance().console(`NetNode still has ${this._requests.length} request watting`);
            }
        }

        let listeners = this._listener[id];
        if (null != listeners) {
            for (const rsp of listeners) {
                //LogManager.getInstance().console(`NetNode execute listener cmd ${rspCmd}`);
                this._callbackExecuter(rsp, msg);
            }
        }
    }

    protected onError(event) {
        zLog.info("Connect server error : " + event);
        this.onClosed(event);
    }


    /**
     * 网络关闭原因处理附带了关闭原因， 需要加工下 arraybuffer ,不然解析值有问题，
     * @param reason 网络关闭 断开原因
     */
    protected closeReasonHandle(reason: string): ArrayBuffer {
        //踢人消息
        var uint8ar = new TextEncoder().encode(reason);
        var len = uint8ar.length;
        if (len <= 5) {
            len = 6;
        }
        var arrayBuff = new ArrayBuffer(len);
        var u8a = new Uint8Array(arrayBuff);
        for (var i = 0; i < len; i++) {
            u8a[i] = uint8ar[i] ? uint8ar[i] : 0;
        }
        return arrayBuff;
    }

    //监听被动断开
    protected onClosed(event) {
        this.clearTimer();
        zLog.info("netnode onClosed  ", event);
        //网络断开发送子模块 ，子模块做相应的处理
        EventManager.getInstance().raiseEvent(Const.mess_netclose);
        // 执行断线回调，返回false表示不进行重连
        if (this._disconnectCallback && !this._disconnectCallback()) {
            zLog.info(`disconnect return!`);
            return;
        }
        // 自动重连
        if (this.isAutoReconnect()) {
            TipsManager.getInstance().showToast(LanguageManager.getInstance().getDstStr("ycts_anomaly"));
            this.updateNetTips(NetTipsType.ReConnecting, true);
            //进行重连
            let url = this.nextUrl();
            if (url) this._connectOptions.url = url;
            this.reconnect();
        } else {
            this.closeTips();
        }
    }

    //断网弹窗
    private closeTips(): void {
        this._state = NetNodeState.Closed;
        if (this._closeCode === protoCommon.code_type.server_stop) {//维护公告不需要再弹断网弹窗
            return;
        }
        //弹出提示框，提示框的按钮逻辑
        this._networkTips.netCloseTips(true, this, this._closeCode);
    }

    //重连操作
    public reconnect(): void {
        zLog.info("Netnode reconnect...");
        this._socket.close();
        this._state = NetNodeState.Closed;
        this.connect(this._connectOptions);
        if (this._autoReconnect > 0) {
            this._autoReconnect--;
        }
        clearTimeout(this._reconnectTimer);
        this._reconnectTimer = setTimeout(() => {//超时连接
            if (this._state == NetNodeState.Connecting) {
                this._autoReconnect = 0;
                this._socket.close();
                this._state = NetNodeState.Closed;
                this.clearTimer();
                // 关闭连接或重连中的状态显示
                this.updateNetTips(NetTipsType.Connecting, false);
                //弹出提示框，提示框的按钮逻辑
                this._networkTips.netCloseTips(true, this, this._closeCode);
            }
        }, this._reconnetTimeOut);
    }

    //主动关闭socket 并且清理计时器，清空缓存列表
    public close(code?: number, reason?: string) {
        logMgr.warn("netnode close  ", code, reason);
        this.clearTimer();
        this.updateNetTips(NetTipsType.ReConnecting, true);
        //网络断开发送子模块 ，子模块做相应的处理
        EventManager.getInstance().raiseEvent(Const.mess_netclose);
        ///this.cleanListeners(-1);
        this._requests.length = 0;
        if (this._networkTips) {
            this._networkTips.connectTips(false);
            this._networkTips.reconnectTips(false);
            this._networkTips.requestTips(false);
        }
        if (this._socket) {
            if (code && reason) {
                this._socket.close(code, reason);
            } else {
                this._socket.close();
            }
        } else {
            logMgr.warn("netnode close1  ");
            this._state = NetNodeState.Closed;
        }
    }

    // 只是关闭Socket套接字（仍然重用缓存与当前状态）
    public closeSocket(code?: number, reason?: string) {
        // if (this._socket) {
        //     if (code && reason) {
        //         this._socket.close(code, reason);
        //     } else {
        //         this._socket.close();
        //     }
        //     //网络断开发送子模块 ，子模块做相应的处理
        //     this.updateNetTips(NetTipsType.ReConnecting, true);
        //     EventManager.getInstance().raiseEvent(Const.mess_netclose);
        // }
        this.onClosed(null);
    }

    // 发起请求，如果当前处于重连中，进入缓存列表等待重连完成后发送，如果强制则不进入缓存列表
    public send(buf: NetData, _resend: boolean = false, force: boolean = false): boolean {
        if (this._state == NetNodeState.Working || force) {
            return this._socket.send(buf);
        } else if (this._state == NetNodeState.Checking ||
            this._state == NetNodeState.Connecting) {
            this._requests.push({
                resend: _resend,
                buffer: buf,
                rqestCmd: 0,
                rspCmd: 0,
                rspObject: null
            });
            LogManager.getInstance().console("NetNode socket is busy, push to send buffer, current state is " + this._state);
            return true;
        } else {
            console.error("NetNode request error! current state is " + this._state);
            return false;
        }
    }

    // 发起请求，并进入缓存列表
    public request(buf: NetData, _rspCmd: number | number[], rspObject: CallbackObject, _resend: boolean = false, showTips: boolean = true, force: boolean = false) {
        if (this._state == NetNodeState.Working || force) {
            this._socket.send(buf);
        }
        //LogManager.getInstance().console(`NetNode request with timeout for ${_rspCmd}`);
        let id: number = this.responCmdTransform(_rspCmd);
        let reqid: number = this.requestCmdTransform(_rspCmd);
        // 进入发送缓存列表
        this._requests.push({
            resend: _resend,
            buffer: buf, rqestCmd: reqid, rspCmd: id, rspObject
        });
        // 启动网络请求层
        if (showTips) {
            this.updateNetTips(NetTipsType.Requesting, true);
        }
    }

    // 唯一request，确保没有同一响应的请求（避免一个请求重复发送，netTips界面的屏蔽也是一个好的方法）
    public requestUnique(buf: NetData, _rspCmd: number | number[], rspObject: CallbackObject, _resend: boolean = false, showTips: boolean = true, force: boolean = false): boolean {
        let id: number = this.responCmdTransform(_rspCmd);
        for (let i = 0; i < this._requests.length; ++i) {
            if (this._requests[i].rspCmd == id) {
                LogManager.getInstance().console(`NetNode requestUnique faile for ${_rspCmd}`);
                return false;
            }
        }
        this.request(buf, _rspCmd, rspObject, _resend, showTips, force);
        return true;
    }

    // 设置连接成功后的回调 设置的回调行数需要调用 checkfunc()
    public setConectCallback(callback: Function) {
        this._connectedCallback = callback;
    }

    // 设置断开连接后的回调 返回false  表示不进行重连
    public setDisconnectCallback(callback: BoolFunc) {
        this._disconnectCallback = callback;
    }

    public getProtoHelper(): IProtocolHelper {
        return this._protocolHelper;
    }

    /********************** 回调相关处理 *********************/
    /** respon 响应指令 二维转化成一维 */
    private responCmdTransform(cmd: number | number[]): number {
        if (typeof (cmd) == "object") {
            return (cmd[0] * 10000 + cmd[1]);
        } else {
            return cmd;
        }
    }

    /** request 发送指令 二维转化成一维 */
    private requestCmdTransform(cmd: number | number[]): number {
        if (!cmd[2]) {
            return 0;
        }
        if (typeof (cmd) == "object") {
            return (cmd[0] * 10000 + cmd[2]);
        } else {
            return cmd;
        }
    }

    public setResponeHandler(cmd: number | number[], callback: NetCallFunc, target?: any): boolean {
        if (callback == null) {
            console.error(`NetNode setResponeHandler error ${cmd} `);
            return false;
        }
        let id = this.responCmdTransform(cmd);
        this._listener[id] = [{ target, callback }];
        return true;
    }

    public addResponeHandler(cmd: number | number[], callback: NetCallFunc, target?: any): boolean {
        if (callback == null) {
            console.error(`NetNode addResponeHandler error ${cmd}`);
            return false;
        }
        let id = this.responCmdTransform(cmd);
        let rspObject = { target, callback };
        if (null == this._listener[id]) {
            this._listener[id] = [rspObject];
        } else {
            let index = this.getNetListenersIndex(id, rspObject);
            if (-1 == index) {
                this._listener[id].push(rspObject);
            }
        }
        return true;
    }

    public removeResponeHandler(cmd: number | number[], callback: NetCallFunc, target?: any) {
        let id = this.responCmdTransform(cmd);
        if (null != this._listener[id] && callback != null) {
            let index = this.getNetListenersIndex(id, { target, callback });
            if (-1 != index) {
                this._listener[id].splice(index, 1);
            }
        }
    }

    public cleanListeners(cmd: number | number[] = -1) {
        let id = this.responCmdTransform(cmd);
        if (id == -1) {
            this._listener = {}
        } else {
            this._listener[id] = null;
        }
    }

    protected getNetListenersIndex(cmd: number | number[], rspObject: CallbackObject): number {
        let id = this.responCmdTransform(cmd);
        let index = -1;
        for (let i = 0; i < this._listener[id].length; i++) {
            let iterator = this._listener[id][i];
            if (iterator.callback == rspObject.callback
                && iterator.target == rspObject.target) {
                index = i;
                break;
            }
        }
        return index;
    }

    /********************** 心跳、超时相关处理 *********************/
    protected resetReceiveMsgTimer() {
        clearTimeout(this._receiveMsgTimer);
        this._receiveMsgTimer = setTimeout(() => {
            this._socket.close();
        }, this._receiveTime);
    }

    // protected resetHearbeatTimer() {
    //     if (this._keepAliveTimer !== null) {
    //         clearTimeout(this._keepAliveTimer);
    //     }
    //     this._keepAliveTimer = setTimeout(() => {
    //         //LogManager.getInstance().console("NetNode keepAliveTimer send Hearbeat")
    //         this.send(this._protocolHelper.getHearbeat());
    //     }, this._heartTime);
    // }

    //开始心跳
    protected startHeartBeat(): void {
        CommonProto.getInstance().hearBeatReq();
        clearTimeout(this._keepAliveTimer);
        this._keepAliveTimer = setTimeout(() => {
            this.startHeartBeat();
        }, this._heartTime);
    }

    protected clearTimer() {
        clearTimeout(this._receiveMsgTimer);
        clearTimeout(this._keepAliveTimer);
        clearTimeout(this._reconnectTimer);
    }

    public isAutoReconnect(): boolean {
        return this._autoReconnect != 0;
    }

    /**
     * 拒绝重连，一般是异地登陆，账号异常等导致不重连
     * @param errorCode 服务器推送的错误码
     */
    public rejectReconnect(errorCode?: number): void {
        this._autoReconnect = 0;
        this.clearTimer();
        this.setCloseErrorCode(errorCode ? errorCode : 0);
    }

    public resetAutoReconnect() {
        this._autoReconnect = 3;
    }

    /**
     * 清理没有回复的resp
     * 部分协议错误码那边统一的处理，没有回复对应的协议
     * cmd ccmd 是发送指令，错误码里的result.cmd 是发送指令
     */
    public clearNotRespMess(cmd: number, ccmd: number): void {
        let id = this.requestCmdTransform([cmd, 0, ccmd]);
        for (let reqIdx in this._requests) {
            let req = this._requests[reqIdx];
            if (req.rqestCmd == id) {
                //TODO
                //this._callbackExecuter(req.rspObject, msg);
                this._requests.splice(parseInt(reqIdx), 1);
                break;
            }
        }
    }

    public getState(): number {
        return this._state;
    }

    public setCloseErrorCode(code: number) {
        this._closeCode = code;
    }

    //是否为关闭状态
    public isSocketClose(): boolean {
        if (this._socket && this._state == NetNodeState.Closed) {
            return true;
        }
        return false;
    }
}