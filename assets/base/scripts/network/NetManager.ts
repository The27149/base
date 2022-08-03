import { NetNode, NetConnectOptions, NetNodeState } from "./NetNode";
import { NetData, CallbackObject } from "./NetInterface";

/*
*   网络节点管理类
*
*/

export class NetManager {
    private static _instance: NetManager = null;
    protected _channels: { [key: number]: NetNode } = {};

    public static getInstance(): NetManager {
        if (this._instance == null) {
            this._instance = new NetManager();
        }
        return this._instance;
    }

    // 添加Node，返回ChannelID
    public setNetNode(newNode: NetNode, channelId: number = 0) {
        this._channels[channelId] = newNode;
    }

    // 移除Node
    public removeNetNode(channelId: number) {
        delete this._channels[channelId];
    }

    // 调用Node连接
    public connect(options: NetConnectOptions, channelId: number = 0): boolean {
        if (this._channels[channelId]) {
            return this._channels[channelId].connect(options);
        }
        return false;
    }

    /**
     * 调用Node发送
     * @param buf           发送给服务器的数据包
     * @param resend        重连之后 是否重发
     * @param force         强制发送，即使在 连接中或者checking 都发送
     * @param channelId     渠道id ，用于不同的socket节点
     */
    public send(buf: NetData, resend: boolean = false, force: boolean = false, channelId: number = 0): boolean {
        let node = this._channels[channelId];
        if (node) {
            return node.send(buf, resend, force);
        }
        return false;
    }

    /**
     * // 发起请求，并在在结果返回时调用指定好的回调函数
     * @param buf           发送给服务器的数据包
     * @param rspCmd        编号用于回调函数识别，可以是单个 和数组，如果是数组   [ respon接收大模块id， respon接收小模块id ， request发出的小模块id]
     * @param rspObject     回调函数对象上下文
     * @param resend        重连之后 是否重发
     * @param showTips      提示对象，可以自己定制提示对象
     * @param force         强制发送
     * @param channelId     渠道id ，用于不同的socket节点
     */
    public request(buf: NetData, rspCmd: number | number[], rspObject: CallbackObject, resend: boolean = false, showTips: boolean = true, force: boolean = false, channelId: number = 0) {
        let node = this._channels[channelId];
        if (node) {
            node.request(buf, rspCmd, rspObject, resend, showTips, force);
        }
    }

    /**
     *  同request，但在request之前会先判断队列中是否已有rspCmd，如有重复的则直接返回
     * @param buf           发送给服务器的数据包
     * @param rspCmd        编号用于回调函数编号识别
     * @param rspObject     回调函数对象上下文
     * @param resend        重连之后 是否重发
     * @param showTips      提示对象，可以自己定制提示对象
     * @param force         强制发送
     * @param channelId     渠道id ，用于不同的socket节点
     */
    public requestUnique(buf: NetData, rspCmd: number, rspObject: CallbackObject, resend: boolean = false, showTips: boolean = true, force: boolean = false, channelId: number = 0): boolean {
        let node = this._channels[channelId];
        if (node) {
            return node.requestUnique(buf, rspCmd, rspObject, resend, showTips, force);
        }
        return false;
    }

    // 调用Node关闭
    public close(code?: number, reason?: string, channelId: number = 0) {
        if (this._channels[channelId]) {
            return this._channels[channelId].closeSocket(code, reason);
        }
    }

    /**
     * getNodeNode 获取socket节点 
     * @param channelId  sockect渠道id
     *
     */
    public getNetNode(channelId: number = 0): NetNode {
        let node = this._channels[channelId];
        if (node) {
            return node;
        } else {
            console.warn("not found this channel sockect ", channelId)
            return null;
        }
    }

    /**
     * 获取连接状态
     * @param channelId sockect渠道id
     */
    public getState(channelId: number = 0): number {
        let node = this._channels[channelId];
        if (node) {
            return node.getState();
        } else {
            console.warn("not found this channel sockect ", channelId)
            return NetNodeState.Closed;
        }
    }


    public socketIsClose(channelId: number = 0): boolean {
        let node = this._channels[channelId];
        if (node) {
            return node.isSocketClose();
        } else {
            console.warn("not found this channel sockect ", channelId)
            return true;
        }
    }
}