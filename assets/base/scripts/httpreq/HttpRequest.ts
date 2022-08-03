import { LogManager, logMgr } from "../log/LogManager";
import { ComUtils } from "../utils/ComUtils";

export interface IReqInfo {
    method: string;                 // POST,GET...
    url: string;                    // 发送url
    dynamicUrl?: string;            // 动态url前缀(可能动态变换的url前缀，无则不填)
    data?: string | FormData;       //
    headerList?: { name: string, value: string }[];    // 消息头列表发送数据(json字符串 ("Content-Type", "application/json") /formData ("Content-Type", "application/x-www-form-urlencoded"))
    sync?: boolean;                 // 是否等待响应返回
    successCb?: Function;           // 成功回调
    failCb?: Function;              // 失败回调
    timeoutCb?: Function;           // 超时回调
    outTime?: number;               // 超时时间(s)
    showTipsType?: HttpType         // 提示类型
    isAutoRetry?: boolean;          // 出错自动重发
    reqTimes?: number;              // 请求次数
    needSign?: boolean;             // 是否需要签名
    maxReqTimes?: number;           // 最多请求次数
}

// http请求触发提示类型
export enum HttpType {
    None = 0b000000,   // 无提示
    ReqSuccess = 0b000001,   // 请求成功
    OpSuccess = 0b000010,   // 操作成功
    OpFail = 0b000100,   // 操作失败
    ReqFail = 0b001000,   // 请求失败
    ReqTimeout = 0b010000,   // 请求超时
    All = 0b011111,   // 全部类型
}


const signKey = "22!@p0OPo3v5*&aV8d";   // 签名key
export default class HttpRequest {
    private static _instance: HttpRequest = null;
    private constructor() { }
    public static getInstance(): HttpRequest {
        if (!this._instance) {
            this._instance = new HttpRequest();
        }
        return this._instance;
    }
    /**
     * 发送http消息通用接口
     */
    send(baseInfo: IReqInfo): boolean {
        // LogManager.getInstance().console("httpRequest url：", baseInfo.url);
        let self = this;
        if (!baseInfo.url) {
            logMgr.console("HTTP的请求地址必须设置");
            return false;
        }

        var _xhr = new XMLHttpRequest();
        if (!_xhr) {
            logMgr.console("XMLHttpRequest对象创建失败");
            return false;
        }

        // 赋默认参数值
        baseInfo.method = baseInfo.method.toUpperCase();
        if (baseInfo.sync === undefined) baseInfo.sync = true;
        if (baseInfo.outTime === undefined) baseInfo.outTime = 10;
        if (baseInfo.showTipsType === undefined) baseInfo.showTipsType = HttpType.None;
        if (baseInfo.isAutoRetry === undefined) baseInfo.isAutoRetry = true;
        if (baseInfo.reqTimes === undefined) baseInfo.reqTimes = 0;
        if (baseInfo.maxReqTimes === undefined) baseInfo.maxReqTimes = 3;

        if (baseInfo.needSign) {
            let params = ComUtils.getUrlParam(baseInfo.url);
            if (!params['sign']) {
                // url中未加签名
                let sortArr = [];
                for (const key in params) {
                    if (params.hasOwnProperty(key)) {
                        sortArr.push(key);
                    }
                }
                if (sortArr.length > 0) {
                    // param排序后
                    sortArr.sort();
                    let urlParam = '';
                    for (let i = 0; i < sortArr.length; ++i) {
                        urlParam = urlParam + sortArr[i] + '=' + params[sortArr[i]];
                        if (i !== sortArr.length - 1) urlParam += '&';
                    }
                    // //需要加第三发库 crypto
                    // let crypto = require('crypto');
                    // let sign = crypto.createHash('md5').update(urlParam + signKey).digest('hex');
                    // baseInfo.url = baseInfo.url + '&sign=' + sign;
                }
            }
        }

        var isTimeOut = false;
        var timer = setTimeout(function () {
            isTimeOut = true;
            self.timeoutHandler(_xhr, baseInfo);
            if (baseInfo.timeoutCb && !baseInfo.isAutoRetry) baseInfo.timeoutCb(_xhr, baseInfo);
            _xhr.abort();
        }, baseInfo.outTime * 1000);  // 注意：这个接口的时间单位是ms

        _xhr.onreadystatechange = function () {
            if (_xhr.readyState === 1) {
                baseInfo.reqTimes++;
            }
            else if (_xhr.readyState === 4) {
                if (isTimeOut) return;
                clearTimeout(timer);
                if (_xhr.status === 200) { //成功
                    self.successHandler(_xhr, baseInfo);
                    if (baseInfo.successCb) baseInfo.successCb(_xhr, baseInfo);
                }
                else {
                    self.failHandler(_xhr, baseInfo);
                    if (baseInfo.failCb && !baseInfo.isAutoRetry) baseInfo.failCb(_xhr, baseInfo);
                }
            }
        };

        logMgr.log(`HttpRequest-send: ${JSON.stringify(baseInfo)}`);
        _xhr.open(baseInfo.method, baseInfo.url);
        if (baseInfo.headerList) {
            for (let i in baseInfo.headerList) {
                _xhr.setRequestHeader(baseInfo.headerList[i].name, baseInfo.headerList[i].value);
            }
        }
        _xhr.send(baseInfo.data);

        return true;
    }


    // 通用成功回调
    successHandler(_xhr: XMLHttpRequest, baseInfo: IReqInfo): boolean {
        // logMgr.console("XMLHttpRequest通用成功回调, responseURL: " + _xhr.responseURL + ",返回的数据：" + _xhr.responseText);
        let responseObj = undefined;
        try {
            responseObj = JSON.parse(_xhr.responseText);
        }
        catch (err) {
            if (baseInfo.showTipsType & HttpType.ReqSuccess) {
                // 请求成功提示
                logMgr.console("请求成功，但是解析错误")
            }
            return false;
        }

        if (responseObj && responseObj.state == 0) {
            // 操作成功
        }
        else {
            // 操作失败
            if (baseInfo.showTipsType & HttpType.OpFail) {
                // 失败提示
            }
        }

        return true;
    }

    // 通用失败回调
    failHandler(_xhr: XMLHttpRequest, baseInfo: IReqInfo) {
        logMgr.console("XMLHttpRequest通用失败回调, responseURL: " + baseInfo.url + ", 响应码：" + _xhr.status + ", 响应码的文本信息：" + _xhr.statusText + ", 发送次数: " + baseInfo.reqTimes);

        if (_xhr.status === 401) {
            // token无效
            logMgr.console("token失效");
            if (baseInfo.showTipsType & HttpType.ReqFail) {
                // 请求失败提示
            }
        }
        else {
            if (baseInfo.isAutoRetry) {
                this.reSendFailureRequest(baseInfo, 'fail', _xhr);
            }
            else if (baseInfo.showTipsType & HttpType.ReqFail) {
                // 请求失败提示
            }
        }
    }

    // 通用超时回调
    timeoutHandler(_xhr: XMLHttpRequest, baseInfo: IReqInfo) {
        logMgr.console("XMLHttpRequest通用超时回调, method: " + baseInfo.method + ",url = " + baseInfo.url + ", 发送次数: " + baseInfo.reqTimes);
        if (baseInfo.isAutoRetry) {
            this.reSendFailureRequest(baseInfo, 'timeout', _xhr);
        }
        else if (baseInfo.showTipsType & HttpType.ReqTimeout) {
            // 请求超时提示
        }
    }

    /**
     * 重发失败消息
     * @param {object} baseInfo 
     * @param {string} reason 重发原因(fail、timeout)
     * @param {string} _xhr XMLHttpRequest
     */
    reSendFailureRequest(baseInfo: IReqInfo, reason: string, _xhr: XMLHttpRequest) {
        let self = this;
        if (baseInfo.reqTimes >= baseInfo.maxReqTimes) {
            // 重发最大次数依然失败，中断重发
            var tips = '';
            if (reason === 'fail') {
                if (baseInfo.failCb) baseInfo.failCb(_xhr, baseInfo);
                if (baseInfo.showTipsType & HttpType.ReqFail) tips = '请求失败，请稍候再试';
            }
            else {
                if (baseInfo.timeoutCb) baseInfo.timeoutCb(_xhr, baseInfo);
                if (baseInfo.showTipsType & HttpType.ReqTimeout) tips = '网络请求超时,请重试';
            }
            if (tips !== '') {
                // 提示
            }
            return false;
        }

        let delayTime = 0;
        if (reason === 'fail') {
            delayTime = 1000;  // 失败延时重发
        } else {
            delayTime = 0;
        }
        setTimeout(() => {
            HttpRequest.getInstance().send(baseInfo);
        }, delayTime);

        return true;
    }
}