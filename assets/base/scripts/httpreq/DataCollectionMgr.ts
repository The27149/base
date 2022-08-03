import CommonProto from "../network/CommonProto";
import HttpRequest, { IReqInfo } from "./HttpRequest";

/**
 * 数据采集
 */
export default class DataCollectionMgr {
    private static _instance: DataCollectionMgr = null;
    private constructor() { }
    public static get instance(): DataCollectionMgr {
        if (!this._instance) {
            this._instance = new DataCollectionMgr();
        }
        return this._instance;
    }

    sendLoginData() {
        if (!window['gameConfig'].analysis_url)
            return;
        let reqUrl: string = `${window['gameConfig'].analysis_url}/v1/frontend/push/login`;
        reqUrl += `user_id=${CommonProto.getInstance().userinfo.userId}`;
        reqUrl += `&user_name=${CommonProto.getInstance().userinfo.userName}`;
        if (window['gameConfig'].device_name)
            reqUrl += `&device_name=${window['gameConfig'].device_name}`;
        if (window['gameConfig'].device_id)
            reqUrl += `&device_id=${window['gameConfig'].device_id}`;

        var reqData = {};
        reqData['user_id'] = CommonProto.getInstance().userinfo.userId.toString();
        reqData['user_name'] = CommonProto.getInstance().userinfo.userName;
        if (window['gameConfig'].device_name)
            reqData['device_name'] = window['gameConfig'].device_name;
        if (window['gameConfig'].device_id)
            reqData['device_id'] = window['gameConfig'].device_id;
        let reqinfo: IReqInfo = {
            url: `${window['gameConfig'].analysis_url}/v1/frontend/push/login`,
            method: "post",
            data: JSON.stringify(reqData),
            needSign: false,
            isAutoRetry: true,
            headerList: [
                { name: "Content-Type", value: "application/json; charset=UTF-8" },
                { name: "Authorization", value: window['gameConfig'].analysis_token },
                { name: "refresh_token", value: window['gameConfig'].analysis_refresh_token }
            ],
        }
        HttpRequest.getInstance().send(reqinfo);
    }
}