import Global from "../global/Global";
import HttpRequest from "../httpreq/HttpRequest";
import CommonProto from "../network/CommonProto";
import TimeUtil from "../utils/TimeUtil";
import { zLog } from "./zLog";

export enum ReportType {
    ERROR,
    INFO
}

/**
 * 玩家行为记录
 */
export default class BehaviorRecord {
    private static _instance: BehaviorRecord = null;
    private preErrorMsgArr: string[] = [];
    public static get instance() {
        if (this._instance == null) {
            this._instance = new BehaviorRecord();
        }
        return this._instance;
    }

    private reqUrl: string;

    public init() {
        if (!Global.platformGameConfig['client_log_url'])
            return;
        this.reqUrl = Global.platformGameConfig['client_log_url'];
        if (!CC_EDITOR) {
            /**原生捕捉js错误 */
            if (cc.sys.isNative) {
                let __handler
                if (window['__errorHandler']) {
                    __handler = window['__errorHandler']
                }
                window['__errorHandler'] = function (file, line, msg, error) {
                    //console.log('native js error:', ...args);
                    if (__handler) {
                        __handler(file, line, msg, error)
                    }
                    BehaviorRecord.instance.errorReport(file, line, msg, error);
                }
            }
            else {
                if (cc.sys.isBrowser) {
                    let __handler;
                    if (window.onerror) {
                        __handler = window.onerror
                    }
                    window.onerror = function (file, line, msg, errors) {
                        console.log('browser js error:');
                        if (__handler) {
                            __handler(file, line, msg, errors)
                        }
                        BehaviorRecord.instance.errorReport(file, line, msg, errors);
                    }
                }
            }
        }
    }

    //错误上报
    errorReport(file, line, msg, error): void {
        let errInfo = file + line + msg;
        let index = this.preErrorMsgArr.indexOf(errInfo);
        //相同的错误不能大于5个 （可能出现报错交替，不能单纯一个字符串判定）
        if (index < 0) {
            this.preErrorMsgArr.push(errInfo);
            if (this.preErrorMsgArr.length > 5) {
                this.preErrorMsgArr.shift();
            }
        } else {
            return;
        }
        let info = {
            "type": ReportType.ERROR.toString(),
            "key": "",
            "value": "",
            "msg": {
                "file": file,
                "line": line,
                "error": msg,
                "stack": error
            }
        }
        this.httpCollectDataSend(info);
    }

    /**
     * http 传错误日志
     * info = {
     *  "type"  : "",
        "key"   : "",
        "value" : "",
        "msg"   : "",
        }
     */
    private httpCollectDataSend(info: any, retry: boolean = false): void {
        if (cc.sys.isBrowser) {
            return;
        }
        let successHandle = function (_xhr: XMLHttpRequest, baseInfo: any) {
            //zLog.log('错误日志上报成功');
        };
        let failHandle = function (_xhr: XMLHttpRequest, baseInfo: any) {
            zLog.log('错误日志上报失败', JSON.stringify(_xhr));
        };
        let timeoutHandle = function (_xhr: XMLHttpRequest, baseInfo: any) {
            zLog.log('错误日志上报超时', JSON.stringify(_xhr));
        };

        var version = "";
        if (window['gameConfig'].bundleUrls && window['gameConfig'].bundleUrls[Global.gameId.toString()]) {
            version = window['gameConfig'].bundleUrls[Global.gameId.toString()];
        }
        info.msg.clientVer = version;
        info.msg.device_id = navigator.userAgent;
        info.msg = JSON.stringify(info.msg);

        let userinfo = CommonProto.getInstance().userinfo;
        let userId = userinfo ? userinfo.userId : "0";
        let time = TimeUtil.getServerTimestamp();
        let logMsg = {
            "node": "client",
            "device": navigator.userAgent,
            "channel": "",
            "user_id": userId,
            "nickname": userinfo ? userinfo.userName : "",
            "phone": "",
            "ip": "",
            "balance": userinfo ? userinfo.scores.toString() : 0,
            "time": time.toString(),
            "sign": "",
            "type": info.type,
            "key": info.key,
            "value": info.value,
            "msg": info.msg,
        }
        let baseInfo = {
            method: 'POST',
            url: this.reqUrl,
            successCb: successHandle,
            failCb: failHandle,
            timeoutCb: timeoutHandle,
            data: JSON.stringify(logMsg),
            isAutoRetry: retry,
            outTime: 5,
            headerList: [{ name: "Content-Type", value: "application/json" }]
        }
        zLog.log("发送数据采集： ", userId, time, baseInfo);
        HttpRequest.getInstance().send(baseInfo);
    }
}