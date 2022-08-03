
/*
*   网络相关接口定义
*   
*/

export type NetData = (string | ArrayBufferLike | Blob | ArrayBufferView);
export type NetCallFunc = (cmd: number, data: any) => void;

// 回调对象
export interface CallbackObject {
    /**
     * 回调对象，不为null时调用target.callback(xxx)
     */
    target: any,
    /**
     * 回调函数
     */
    callback: NetCallFunc,
}

// 请求对象
export interface RequestObject {
    /**
     * 是否需要重发，在断线之前发送了，重连上来之后再次重发
     */
    resend: boolean,
    /**
     * 请求的Buffer
     */
    buffer: NetData,
    /**
     * 发送指令 （错误码返回，不会走响应指令，只能用发送指令判定）
     */
    rqestCmd: number,
    /**
     * 等待响应指令
     */
    rspCmd: number,
    /**
     *  等待响应的回调对象
     */
    rspObject: CallbackObject,
}

// 协议辅助接口
export interface IProtocolHelper {
    getHeadlen(): number;                   // 返回包头长度
    getHearbeat(): NetData;                 // 返回一个心跳包
    getPackageLen(msg: NetData): number;    // 返回整个包的长度
    checkPackage(msg: NetData): boolean;    // 检查包数据是否合法
    getPackageId(msg: NetData): number[];   // 返回包的id或协议类型(cmd ,com)
    //getBuffData(msg: any): any;              //返回buff的数据
}

// 默认字符串协议对象
export class DefStringProtocol implements IProtocolHelper {
    getHeadlen(): number {
        return 0;
    }
    getHearbeat(): NetData {
        return "";
    }
    getPackageLen(msg: NetData): number {
        return msg.toString().length;
    }
    checkPackage(msg: NetData): boolean {
        return true;
    }
    getPackageId(msg: NetData): number[] {
        return [0, 0];
    }
    getBuffData(msg: any): any {
        return null;
    }

}

// Socket接口
export interface ISocket {
    onConnected: (event) => void;           // 连接回调
    onMessage: (msg: NetData) => void;      // 消息回调
    onError: (event) => void;               // 错误回调
    onClosed: (event) => void;              // 关闭回调

    connect(options: any);                  // 连接接口
    send(buffer: NetData);                  // 数据发送接口
    close(code?: number, reason?: string);  // 关闭接口
}

// 网络提示接口
export interface INetworkTips {
    connectTips(isShow: boolean): void;
    reconnectTips(isShow: boolean): void;
    requestTips(isShow: boolean): void;
    /**
     * 网络异常，导致网络关闭 弹出的提示框
     * @param isShow 是否展示
     * @param netnode 当前网络节点，如果isShow false 可以传null
     * @param closeState 关闭状态值 是服务器推送的 errorcode ，如果isShow false 可以传null
     */
     netCloseTips(isShow: boolean, netnode: any, closeState: number)
}

/**
 * 协议接口
 */
export interface IProtoMess {
    /**
     * 协议大头
     */
    cmd: number;
    /**
    * 协议小头
    */
    com: number;
    /**
     * 协议数据
     */
    proBuff: any;
}


/**
 * message数据类型兼容接口
 */
export interface ProtoType<T> {
    verify(message: { [k: string]: any }): (null | string);
    create(properties?: T): T;
    encode(message: T, writer?: protobuf.Writer): protobuf.Writer;
    decode(reader: (protobuf.Reader | Uint8Array), length?: number): any;
}