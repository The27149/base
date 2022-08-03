import { IProtoConf } from "../config/IProtoConf";
import { logMgr } from "../log/LogManager";
import { IProtocolHelper, NetData, ProtoType } from "./NetInterface";
/**
 * 具体协议接口，不同的类型需要去实现具体协议类
 */
export interface IProto {
    bundle: string;         //bundle名称
    protoDir: string;       //根目录是bundle的根目录，协议源文件的相对路径
    roots: IProtoRoot[];    //protobuf.Root
    protoConfig: IProtoConf; //这个是自动生成的配置，每个类型对应的都会生成一个文件
    registerMess: () => void;
    destroyMess: () => void;
    init: (call?: Function) => void;
    destroy: () => void;
}

/**
 * 协议的 protobuf.Root的实例 接口
 */
export interface IProtoRoot {
    path: string;
    root: protobuf.Root;
}

// 默认字符串协议对象
export class ProtocolHelper implements IProtocolHelper {

    protoObj: IProto[] = [];
    protoConfig: IProtoConf[] = [];

    getHeadlen(): number {
        return 0;
    }

    //心跳包
    getHearbeat(): NetData {
        return this.getBuffPackage(0, 0, {}, "base");
    }

    getPackageLen(msg: NetData): number {
        return msg.toString().length;
    }

    checkPackage(msg: NetData): boolean {
        return true;
    }

    //返回模块id
    public getPackageId(msg: any): number[] {
        let _messageView: DataView = new DataView(msg);
        let _messageType: number = _messageView.getUint16(0);
        var cmd: number = Number(_messageType) >> 8;     //向右边移动8位，只留前面的8位
        var com: number = Number(_messageType) & 255;    //后面的8位进行 0000000011111111 且 运算，前面8位进行去除
        return [cmd, com];
    }

    //去除头2个字节 ，获取数据信息
    public static getBuffData(msg: any): any {
        if (msg) {
            let tempmsg = msg.slice(2, msg.byteLength);
            let pbBuff: Uint8Array = new Uint8Array(tempmsg);
            return pbBuff;
        } else {
            return null;
        }
    }

    /**
     * 创建游戏socket字节头
     * @param cmd 大字节头
     * @param c_cmd 小字节头
     */
    public static createHeadBuff(cmd, c_cmd): ArrayBuffer {
        var _typeBuff = new ArrayBuffer(2);
        var com = cmd << 8;
        var c_com = c_cmd;
        var total = com + c_com;

        var view = new DataView(_typeBuff);
        view.setInt16(0, total, false);
        return _typeBuff;
    };


    /**
     * 字节头和数据组合成arrayBuff
     * @param args 字节头和数据buff
     */
    public static connectArrayBuff(...args: any[]): ArrayBuffer {
        var length = 0;
        var buffer = null;

        for (let i = 0; i < args.length; i++) {
            buffer = args[i];
            length += buffer.byteLength;
        }

        var joined = new Uint8Array(length);
        var offset = 0;
        for (let i = 0; i < args.length; i++) {
            buffer = args[i];
            joined.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;

        }
        return <ArrayBuffer>joined.buffer;
    };


    /**
     * proto 导出 静态js代码 创建 游戏socket arrayBUff 
     * @param cmd 字节大头
     * @param com 字节小头
     * @param type message数据类型
     * @param data 发送数据
     */
    public static createGameSockBuff<T>(cmd: number, com: number, type: ProtoType<T>, data: any): ArrayBuffer {
        var _connectBuff = null;
        try {
            let headBuff = ProtocolHelper.createHeadBuff(cmd, com);
            //verify 为检测，根据schema检测数据是否有错误
            let errMsg = type.verify(data);
            if (errMsg) {
                throw Error(errMsg);
            }
            let dataBuf = type.encode(type.create(data)).finish();
            _connectBuff = ProtocolHelper.connectArrayBuff(headBuff, dataBuf);
        } catch (error) {
            logMgr.error("protolHelper createGameSockBuff", error);
        }
        return _connectBuff;
    }

    /**
     * 
     * @param type proto协议类型
     * @param buff 服务器传过来的 arraybuff 数据
     * @returns 返回协议类型数据
     */
    public static buffDecode<T>(type: ProtoType<T>, buff: (protobuf.Reader | Uint8Array)): T {
        let buffer = ProtocolHelper.getBuffData(buff);
        let result = type.decode(buffer);
        return result;
    }

    /**
     * 协议的加载
     * @param proto 协议配置实例
     * @param callback 加载结束后的回调
     */
    load(proto: IProto, callback: () => void) {
        let bundle = cc.assetManager.getBundle(proto.bundle);
        let index = 0;
        for (let i = 0; i < proto.roots.length; ++i) {
            let temproot = proto.roots[i];
            logMgr.log("加载proto路径", proto.protoDir + '/' + temproot.path + ".proto");
            bundle.load(proto.protoDir + '/' + temproot.path, null, (err, asset: cc.TextAsset) => {
                if (err) {
                    logMgr.error(temproot.path + ", proto 加载失败");
                } else {
                    logMgr.log(proto.protoDir + '/' + temproot.path + ".proto 加载完成");
                    temproot.root = new protobuf.Root();
                    protobuf.parse(asset.text, temproot.root);
                    if (index == proto.roots.length - 1) {
                        callback();
                    }
                    ++index;
                }
            });
        }
    }

    /**
     * 解析数据包
     * @param buffer 服务器传过来的数据包
     */
    public messDecode(buffer: any, bundle: string, moduleName?: string): any {
        let protoconfig = this.getProtoConfig(bundle);
        if (protoconfig) {
            let cmd = this.getPackageId(buffer);
            let _type: string = protoconfig.getType(cmd[0], cmd[1]);
            let message = null;
            let root = this.getRoot(bundle, moduleName);
            let protoclass = root.lookupType(_type);
            let handlbuffer = ProtocolHelper.getBuffData(buffer);
            if (handlbuffer != null) {
                message = protoclass.decode(handlbuffer);
            }
            return message;
        } else {
            logMgr.warn("ProtoHandler receive 协议配置为空");
        }
        return null;
    }
    /**
     * 获取数据包，用于发送给服务器
     * @param cmd 大模块
     * @param ccmd 小模块
     * @param payload 数据
     */
    public getBuffPackage(cmd: number, ccmd: number, payload: any, bundle: string, moduleName?: string): any {
        let protoclass = this.geClassType(cmd, ccmd, bundle, moduleName);
        if (protoclass) {
            var errMsg = protoclass.verify(payload);
            if (errMsg)
                throw Error(errMsg);
            // Create a new message
            var message = protoclass.create(payload); // or use .fromObject if conversion is necessary
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            var buffer = protoclass.encode(message).finish();
            protoclass.decode(buffer);
            let head = ProtocolHelper.createHeadBuff(cmd, ccmd);
            let buff = ProtocolHelper.connectArrayBuff(head, buffer);

            return buff;
        } else {
            logMgr.warn("ProtoHandler send 协议配置为空");
            return null;
        }
    }

    //获取协议类型
    public geClassType(cmd: number, ccmd: number, bundle: string, moduleName?: string): any {
        let protoconfig = this.getProtoConfig(bundle);
        if (protoconfig) {
            let _type: string = protoconfig.getType(cmd, ccmd);
            let root = this.getRoot(bundle, moduleName);
            var protoclass = root.lookupType(_type);
            return protoclass;
        } else {
            console.warn("not find proto config  ", bundle);
            return null;
        }
    }

    /**
     * 获取protobuf.Root 
     * @param moduleName 模块名，如果只有一个模块不填写
     */
    public getRoot(bundle: string, moduleName?: string): protobuf.Root {
        let protoobj = this.getProtoObj(bundle);
        if (moduleName) {
            if (!protoobj) {
                logMgr.error("protobufRoot 为空", moduleName);
                return null;
            }
            for (const key in protoobj.roots) {
                const element = protoobj.roots[key];
                if (moduleName == element.path) {
                    return element.root;
                }
            }
            return null;
        } else {
            return protoobj.roots[0].root;
        }
    }

    //添加 proto类 和 rootconfig 类
    public addRootAndConfig(root: IProto, proconfig: IProtoConf) {
        if (root && proconfig) {
            if (this.getProtoObj(root.bundle) || this.getProtoConfig(proconfig.bundle)) {
                logMgr.warn("列表中已有改bundle root", root.bundle, proconfig.bundle);
                return;
            }
            this.protoObj.push(root);
            this.protoConfig.push(proconfig);
        } else {
            logMgr.error("传入的参数为空");
        }
    }

    //获取哪个bundle 下的proto 类
    public getProtoObj(bundle: string): IProto {
        for (const key in this.protoObj) {
            let obj = this.protoObj[key];
            if (obj.bundle == bundle) {
                return obj;
            }
        }
        return null;
    }

    //获取哪个bundle 下的proto 配置类
    public getProtoConfig(bundle: string): IProtoConf {
        for (const key in this.protoConfig) {
            let obj = this.protoConfig[key];
            if (obj.bundle == bundle) {
                return obj;
            }
        }
        return null;
    }

}