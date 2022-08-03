import Global from "../global/Global";
import { LogManager, logMgr } from "../log/LogManager";
import { CallbackObject, NetData } from "./NetInterface";
import { NetManager } from "./NetManager";
import { NetNode } from "./NetNode";
import { ProtocolHelper } from "./ProtocolHelper";
import { EventManager } from "../event/EventManager";
import Const from "../const/Const";
import TipsManager from "../ui/TipsManager";
import { IDialogCallBackTarget } from "../ui/uiViews/UIDialog";
import LanguageManager from "../language/LanguageManager";
import { ComUtils } from "../utils/ComUtils";
import { game } from "../game";
import { ResLoader } from "../res/ResLoader";
import DataCollectionMgr from "../httpreq/DataCollectionMgr";
import { zLog } from "../log/zLog";
import { Utils } from "../common/Utils";

export interface ErrorCodeCallFun {
    codekey: number;
    func: CallbackObject;
}

/**
 * 活动操作数据
 */
export interface IActivityOperateData {
    /**
     * 兑换、红包日日领
     */
    exchange?: protoCommon.act_exchange_type;
    /**
     * 抽奖
     */
    lottery?: protoCommon.act_lottery_type;
}

class HeartTime {
    id: number = 0;
    time: number = 0;
    constructor(_id, _time) {
        this.id = _id;
        this.time = _time;
    }
}

/**
 * 具体的协议解析类，这里需要实现接口IProto
 * 协议的监听网络 事件，并且处理业务逻辑
 * 并且缓存一些通用的服务器数据，用于其他模块获取，尽量将通用的数据放在这，更清晰的获取
 */

export default class CommonProto {

    bundle: string = "base";    //自己的bundle name ，需加载bundle
    //protoDir: string = "scripts/network"  //存放协议的路径.相对bundle下的路径
    //roots: IProtoRoot[] = [];
    //protoConfig: ProtoComConf = null;
    //protoHelper: ProtocolHelper = null;

    //网络节点
    private netNode: NetNode = null;
    //心跳
    private heartSendId: number = 0             //发送心跳的id
    private heartRespId: number = 0;            //接收的心跳id
    private heartTimeArr: HeartTime[] = [];     //保存发送心跳的时间和id
    public netdelaytime: number = 0;            //和服务器的延时

    //缓存接受服务器的值
    public userinfo: protoCommon.user_info = null;
    public reconnectToken: string = null;
    public infriendRoom: boolean = false;
    public friendRoomId: number = 0;
    /**默认0，普通房间记录，重连或者加入好友房失败需要重新进入该房间 */
    public normalRoomIndex: number = 0;
    /**游戏开关 */
    public gameSwitch: protoCommon.switch_type = null;
    /**coin倍率 */
    public coinRate: number = 1;
    /** 当前状态是否发生了重连 */
    public isReconnect: boolean = false;
    /**是否是正式玩 */
    public isNormal: boolean = false;
    public resultEnterGame: protoCommon.enterGameResp = null;
    //错误回调函数列表
    errorCodeCallList: ErrorCodeCallFun[] = [];

    //单例是为了 获取缓存的服务器数据
    private static _instance: CommonProto = null;
    public static getInstance(): CommonProto {
        if (this._instance == null) {
            this._instance = new CommonProto();
        }
        return this._instance;
    }

    constructor() {
        // this.protoConfig = new ProtoComConf();
        // for (const key in this.protoConfig.path) {
        //     let element = this.protoConfig.path[key];
        //     this.roots.push({ path: element, root: new protobuf.Root() })
        // }
    }

    registerMess(): void {
        this.setReceiveCallBack();
        EventManager.getInstance().addEventListener(Const.mess_netclose, this.netOnClose, this);
    }

    destroyMess(): void {
    }

    //进行初始化 和 注册你的 网络消息接受函数
    setReceiveCallBack(): void {
        //获取socket 连接节点
        this.netNode = NetManager.getInstance().getNetNode();

        //设置监听者 ，心跳需要持续监听 ，传参 ([大模块,子模块],回调函数,对象)
        this.netNode.setResponeHandler([protoCommon.cmd.msg_base, protoCommon.base_cmd.heartBeatResp], this.hearBeatResp, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_error_code, protoCommon.error_code_cmd.errorCodePush], this.errorCodePush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_user, protoCommon.user_cmd.kickPush], this.kickPush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_broadcast, protoCommon.broadcast_cmd.marqueePush], this.marqueePush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_user, protoCommon.user_cmd.updateTokenPush], this.updateTokenPush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_user, protoCommon.user_cmd.updateUserInfoPush], this.updateUserInfoPush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_user, protoCommon.user_cmd.lvAwardInfoPush], this.lvAwardInfoPush, this);

        this.netNode.setResponeHandler([protoCommon.cmd.msg_active, protoCommon.active_cmd.activesInfoPush], this.activeInfoPush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_active, protoCommon.active_cmd.activeRankRewardsPush], this.activeRankRewardsPush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_active, protoCommon.active_cmd.activeKongTouRewardPush], this.activeKongTouRewardPush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_user, protoCommon.user_cmd.exchangeGuidePush], this.exchangeGuidePush, this);
        this.netNode.setResponeHandler([protoCommon.cmd.msg_chat, protoCommon.chat_cmd.chatPush], this.chatPush, this);

    }

    init(): void {
        this.registerMess();
        //this.protoHelper = <ProtocolHelper>this.netNode.getProtoHelper();
        //协议加载和消息处理
        //this.protoHelper.addRootAndConfig(this, new ProtoComConf());
    }

    destroy(): void {
        this.destroyMess();
    }

    /**
     * 网络断开 需要重置一些数据
     */
    private netOnClose() {
        this.heartSendId = 0             //发送心跳的id
        this.heartRespId = 0;            //接收的心跳id
        this.heartTimeArr = [];     //保存发送心跳的时间和id
    }
    //----------------------聊天快捷语-------------------------------

    //聊天语推送
    private chatPush(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.chatPush, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_chatPush, result, err);
    }

    /**发送聊天语 */
    public sendChatReq(chat: string): void {
        let data = new protoCommon.chatReq();
        data.content = chat;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_chat, protoCommon.chat_cmd.chatReq, protoCommon.chatReq, data);
        NetManager.getInstance().send(buff);
    }

    //-----------------------------base模块---------------------------------------------------------------
    //心跳服务器回调
    private hearBeatResp(msg: any, err: any = null): void {
        if (msg) {
            let result = ProtocolHelper.buffDecode(protoCommon.heartBeatResp, msg);
            this.heartRespId = result.id;
            //服务器时间偏移 和 延时,当收到了心跳，那么将列表的第一个去除
            let element = this.heartTimeArr.shift();
            if (element) {
                Global.serverTimeOffset = Number(result.time) - element.time;
                this.netdelaytime = (new Date).getTime() - element.time;
                EventManager.getInstance().raiseEvent(Const.mess_delayshow, this.netdelaytime);
            }
        }
    }
    //心跳请求
    public hearBeatReq(): void {
        this.heartSendId++;
        if (this.heartSendId - this.heartRespId > 3) {
            this.heartSendId = 0;
            this.heartRespId = 0;
            this.heartTimeArr.length = 0;
            NetManager.getInstance().close();
            LogManager.getInstance().warn("心跳超时，主动断开");
            return;
        }
        //存储一个心跳ID和时间
        let curtime = (new Date).getTime();
        this.heartTimeArr.push(new HeartTime(this.heartSendId, curtime));
        //这一次获取的时间 和 列表中第一个时间相比较（一般进入这里是因为，一直发出，服务器没有返回，但是需要去刷新延时）
        if (this.heartTimeArr.length > 1) {
            this.netdelaytime = curtime - this.heartTimeArr[0].time;
            EventManager.getInstance().raiseEvent(Const.mess_delayshow, this.netdelaytime);
        }

        let data = new protoCommon.heartBeatReq();
        data.id = this.heartSendId;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_base, protoCommon.base_cmd.heartBeatReq, protoCommon.heartBeatReq, data);
        //心跳不需要回调 可以直接发送
        this.netNode.send(buff);
    }
    //-----------------------------login模块---------------------------------------------------------------
    //登录请求 （这里利用request 不用send 是因为需要回调函数，并且防止断网后，重连后再次请求成功）
    loginReq(): void {
        //获取设备唯一标识
        ComUtils.getFingerprint(this, this.sendLoginReq);
    }

    private sendLoginReq(visitorId: string) {
        //这里的类型强制转化 是为了更好的利用 x.d.ts 提示
        let payload = new protoCommon.loginReq();
        payload.token = this.reconnectToken ? this.reconnectToken : Global.serverToken;
        payload.lang = ComUtils.getCurLanguage();
        payload.code = visitorId;
        zLog.info("发送登录消息", payload);
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_login, protoCommon.login_cmd.loginReq, protoCommon.loginReq, payload);
        //这里注意： 参数的 respcmd  是需要服务器返回的模块id (LoginResp)
        this.netRequest(protoCommon.cmd.msg_login, protoCommon.login_cmd.loginReq, protoCommon.login_cmd.loginResp, buff, this.loginResp, true);
    }

    //登录服务器返回
    private loginResp(msg: any, err: any = null): void {
        if (msg) {
            let result = ProtocolHelper.buffDecode(protoCommon.loginResp, msg);
            this.userinfo = result.userInfo;
            this.reconnectToken = result.reconnectToken;
            this.gameSwitch = result.switch;
            this.isNormal = result.isNormal;
            this.coinRate = this.userinfo.coinRate;
            this.isReconnect = result.isReconnect;
            zLog.info("接收登录消息", result);
            DataCollectionMgr.instance.sendLoginData();
            //登陆成功发出消息
            EventManager.getInstance().raiseEvent(Const.mess_loginSucc);
            this.enterGameReq();
        } else {
            let okcall = { target: this, callback: () => { window.location.reload(); } };
            let lang = LanguageManager.getInstance().getDstStr("dlsb_tips");
            TipsManager.getInstance().showDialog(lang, okcall, null, true);
        }

    }
    //----------------------------user模块--------------------------------------------------------------
    enterGameReq(): void {
        logMgr.console("发起进入游戏请求");
        let payload = new protoCommon.enterGameReq();
        payload.gameId = Long.fromNumber(Global.gameId);
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_user, protoCommon.user_cmd.enterGameReq, protoCommon.enterGameReq, payload);
        this.netRequest(protoCommon.cmd.msg_user, protoCommon.user_cmd.enterGameReq, protoCommon.user_cmd.enterGameResp, buff, this.enterGameResp);
    }
    private enterGameResp(msg: any, err: any = null): void {
        if (!err) {
            logMgr.log("成功进入游戏ID", Global.gameId);
            let result: protoCommon.enterGameResp = ProtocolHelper.buffDecode(protoCommon.enterGameResp, msg);
            this.resultEnterGame = result;
            this.infriendRoom = result.isInFriendRoom;
            this.friendRoomId = result.roomId;
            EventManager.getInstance().raiseEvent(Const.mess_enterGameSucc, result);
            if (Global.gameType == "slot") {
                if (this.infriendRoom && this.friendRoomId !== 0) {
                    this.joinFriendRoomReq(this.friendRoomId);
                } else {
                    this.enterRoomReq(0, 0);
                }
            }
        } else {
            /**
             * 进入游戏失败
             */
            let okcall = { target: this, callback: () => { CommonProto.getInstance().backPage(); } };
            let lang = LanguageManager.getInstance().getDstStr("jrsb_tips");
            TipsManager.getInstance().showDialog(lang, okcall, null, true);
            EventManager.getInstance().raiseEvent(Const.mess_enterGameFail);
        }
    }
    /**
     * 获取角色用户信息 请求
     * @param userid 用户userid
     */
    getUserInfoReq(userid: number | Long): void {
        let payload = new protoCommon.getUserInfoReq();
        payload.userId = userid;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_user, protoCommon.user_cmd.getUserInfoReq, protoCommon.getUserInfoReq, payload);
        this.netRequest(protoCommon.cmd.msg_user, protoCommon.user_cmd.getUserInfoReq, protoCommon.user_cmd.getUserInfoResp, buff, this.getUserInfoResp);
    }
    private getUserInfoResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.getUserInfoResp, msg);
            if (Number(result.userInfo.userId) == Number(this.userinfo.userId)) {
                this.userinfo = result.userInfo;
            }
        }
        EventManager.getInstance().raiseEvent(Const.mess_netgetUserInfoResp, result, err);
    }
    /**
     * 设置角色用户信息 请求
     * @param key 更改属性key值
     * @param _value 更改属性值
     * 这里不用明确类型是因为生成的 proto 枚举 类型名更改了
     */
    setUserInfoReq(key: any/*protoCommon.user_key_type*/, _value: string): void {
        let payload = new protoCommon.setUserInfoReq();
        payload.userKey = key;
        payload.value = _value;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_user, protoCommon.user_cmd.setUserInfoReq, protoCommon.setUserInfoReq, payload);
        this.netRequest(protoCommon.cmd.msg_user, protoCommon.user_cmd.setUserInfoReq, protoCommon.user_cmd.setUserInfoResp, buff, this.setUserInfoResp);
    }
    private setUserInfoResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.setUserInfoResp, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_netsetUserInfoResp, result, err);
    }

    /**
     * 获取个人等级奖励 请求
     * @param level 等级
     */
    getLvAwardReq(level: number): void {
        let payload = new protoCommon.getLvAwardReq();
        payload.lv = level;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_user, protoCommon.user_cmd.getLvAwardReq, protoCommon.getLvAwardReq, payload);
        this.netRequest(protoCommon.cmd.msg_user, protoCommon.user_cmd.getLvAwardReq, protoCommon.user_cmd.getLvAwardResp, buff, this.getLvAwardResp);
    }
    private getLvAwardResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.getLvAwardResp, msg);
            this.userinfo.scores = result.scores;
        }
        EventManager.getInstance().raiseEvent(Const.mess_netgetLvAwardResp, result, err);
    }

    /**
     * 购买成长基金奖励 请求
     * @param type 成长基金奖励 类型
     */
    buyFundReq(type: protoCommon.fund_type): void {
        let payload = new protoCommon.buyFundReq();
        payload.type = type;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_user, protoCommon.user_cmd.buyFundReq, protoCommon.buyFundReq, payload);
        this.netRequest(protoCommon.cmd.msg_user, protoCommon.user_cmd.buyFundReq, protoCommon.user_cmd.buyFundResp, buff, this.buyFundResp);
    }
    private buyFundResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.buyFundResp, msg);
            this.userinfo.awardInfo.fundAward = result.fundAward;
            this.userinfo.fundType = <protoCommon.fund_type>result.type;
            this.userinfo.scores = result.scores;
        }
        EventManager.getInstance().raiseEvent(Const.mess_netbuyFundResp, result, err);

    }

    /**
     * 购买成长基金奖励 请求
     * @param lv 成长基金等级
     */
    getFundAwardReq(lv: number): void {
        let payload = new protoCommon.getFundAwardReq();
        payload.lv = lv;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_user, protoCommon.user_cmd.getFundAwardReq, protoCommon.getFundAwardReq, payload);
        this.netRequest(protoCommon.cmd.msg_user, protoCommon.user_cmd.getFundAwardReq, protoCommon.user_cmd.getFundAwardResp, buff, this.getFundAwardResp);
    }
    private getFundAwardResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.getFundAwardResp, msg);
            this.userinfo.scores = result.scores;
        }
        EventManager.getInstance().raiseEvent(Const.mess_netgetFundAwardResp, result, err);
    }

    /**
     * 更新玩家信息 推送
     */
    private updateUserInfoPush(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.updateUserInfoPush, msg);
            let info = result.userInfo;
            if (Number(info.userId) == Number(this.userinfo.userId)) {
                this.userinfo = info;
            }
        }
        EventManager.getInstance().raiseEvent(Const.mess_netupdateUserInfoPush, result, err);
    }

    /**
     * 更新 重连的 token 推送
     */
    private updateTokenPush(msg: any, err: any = null): void {
        if (msg) {
            let result = ProtocolHelper.buffDecode(protoCommon.updateTokenPush, msg);
            this.reconnectToken = result.reconnectToken;
        }
    }

    /**
     * 玩家升级奖励信息 推送
    */
    private lvAwardInfoPush(msg: any, err: any = null): void {
        if (Global.lobbyId > 0) {
            return;
        }

        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.lvAwardInfoPush, msg);
        }
        let userinfo = CommonProto.getInstance().userinfo;
        let isShow = cc.sys.localStorage.getItem("LevelUpTips_" + userinfo.userName);
        if (isShow === "false") {
            /**子模块的 总金币的更新展示 */
            EventManager.getInstance().raiseEvent("mess_updateUserInfo", Number(result.scores), Number(result.awardScores));
        } else {
            EventManager.getInstance().raiseEvent(Const.mess_lvAwardInfoPush, result, err);

        }
    }

    /**
     * 服务器踢出推送
     */
    private kickPush(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.kickPush, msg);
        }
        NetManager.getInstance().getNetNode().rejectReconnect(result.code);
        EventManager.getInstance().raiseEvent(Const.mess_netkickPush, result, err);
        LogManager.getInstance().warn("服务器踢出: ", result.code + " , " + result.content);
        let okCbTarget: IDialogCallBackTarget = { callback: this.backPage, target: this };
        let content = result.content ? result.content : LanguageManager.getInstance().getSrcStr("game_maintenance");
        TipsManager.getInstance().showDialog(content, okCbTarget, null, true);
    }

    private exchangeGuidePush(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.exchangeGuidePush, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_netexchangeGuidePush, result, err, this.isReconnect);
    }


    /**
     * /返回界面
     * @param msg 附带关闭游戏时的信息
     */
    public backPage(msg?: string): void {
        // var userAgent = navigator.userAgent;
        // var isNativeLobby: boolean = userAgent.indexOf('BrowserType/AndroidApp') > -1;
        var isNativeLobby = Utils.isLobbyGame();
        if (isNativeLobby == 1) {
            if (cc.sys.isNative) {
                if (window['PlatformAPI'])
                    window['PlatformAPI'].getInstance().onCloseGame();
            } else {
                if (cc.sys.isBrowser) {
                    if (Global.referrer && Global.referrer != "") {
                        window.location.href = Global.referrer;
                    }
                    else {
                        if (document.referrer && document.referrer != "" && document.referrer.indexOf('start/index.html') < 0) {
                            window.history.back();
                        }
                        else
                            window.close();
                    }
                } else
                    window.close();
            }
        }
        else {
            let str = Global.gameId.toString();
            if (msg) {
                str = str + "_" + msg;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                let call = () => {
                    window['webkit'].messageHandlers.quitGamge && window['webkit'].messageHandlers.quitGamge.postMessage('');
                }
                Utils.sendMessageToLobby(str, call);
            } else {
                let call = () => {
                    window.close();
                }
                Utils.sendMessageToLobby(str, call);
            }
        }
    }

    //-----------------------------房间模块---------------------------------------------------------------
    //创建好友房间请求
    createFriendRoomReq(roomType: number = 0): void {
        let payload = new protoCommon.createFriendRoomReq();
        payload.roomType = roomType;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.createFriendRoomReq, protoCommon.createFriendRoomReq, payload);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.createFriendRoomReq, protoCommon.room_cmd.createFriendRoomResp, buff, this.createFriendRoomResp);
    }
    private createFriendRoomResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.createFriendRoomResp, msg);
            this.friendRoomId = result.roomId;
            this.infriendRoom = true;
        }
        EventManager.getInstance().raiseEvent(Const.mess_netCreateRoom, result, err, this.isReconnect);
    }

    //加入好友房间请求
    joinFriendRoomReq(id: number): void {
        this.friendRoomId = id;
        let payload = new protoCommon.joinFriendRoomReq();
        payload.roomId = id;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.joinFriendRoomReq, protoCommon.joinFriendRoomReq, payload);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.joinFriendRoomReq, protoCommon.room_cmd.joinFriendRoomResp, buff, this.joinFriendRoomResp);
    }
    private joinFriendRoomResp(msg: any, err: protoCommon.errorCodePush = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.joinFriendRoomResp, msg);
            this.infriendRoom = true;
        } else {
            //已经达到最大人数，服务器不会踢出客户端 所以不需要重新发进入房间协议，其他的需要发送进入房间协议
            if (err.code == protoCommon.code_type.max_count_limit) {
            } else if (err.code == protoCommon.code_type.room_not_exist) {
                //console.log("进入好友房错误");
            } else {
                this.enterRoomReq(this.normalRoomIndex);
            }
        }
        EventManager.getInstance().raiseEvent(Const.mess_netJionRoom, msg, err, this.isReconnect);
    }

    //抢庄进房间匹配
    startMatchReq(type: number, roomId: number = 0): void {
        logMgr.log("发起开始匹配请求");
        this.normalRoomIndex = type;
        let payload = new protoCommon.startMatchReq();
        payload.roomType = type;
        payload.roomId = roomId;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.startMatchReq, protoCommon.startMatchReq, payload);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.startMatchReq, protoCommon.room_cmd.startMatchResp, buff, this.startMatchResp);
    }

    private startMatchResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            logMgr.log("匹配请求成功");
            result = ProtocolHelper.buffDecode(protoCommon.startMatchResp, msg);
            this.infriendRoom = false;
        } else {
            this.cancelMatchReq();
            this.normalRoomIndex = 0;
        }
        EventManager.getInstance().raiseEvent(Const.mess_startMatchResp, result, err, this.isReconnect);
    }

    //取消房间匹配
    cancelMatchReq(): void {
        logMgr.log("取消匹配请求");
        let payload = new protoCommon.cancelMatchReq();
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.cancelMatchReq, protoCommon.cancelMatchReq, payload);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.cancelMatchReq, protoCommon.room_cmd.cancelMatchResp, buff, this.cancelMatchResp);
    }

    private cancelMatchResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            logMgr.log("取消匹配成功");
            result = ProtocolHelper.buffDecode(protoCommon.cancelMatchResp, msg);
            this.normalRoomIndex = 0;
        } else {
        }
        EventManager.getInstance().raiseEvent(Const.mess_netCancelMatch, result, err, this.isReconnect);
    }

    //进入普通房间请求
    enterRoomReq(type: number, roomId: number = 0): void {
        logMgr.log("发起进入房间请求");
        this.normalRoomIndex = type;
        let payload = new protoCommon.enterRoomReq();
        payload.roomType = type;
        payload.roomId = roomId;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.enterRoomReq, protoCommon.enterRoomReq, payload);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.enterRoomReq, protoCommon.room_cmd.enterRoomResp, buff, this.enterRoomResp);

        if (core && core.DataAnalysis) {
            core.DataAnalysis.instance.httpEventReport(core.GameEventData.instance.game_start);
        }
    }
    private enterRoomResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            logMgr.log("进入房间成功");
            result = ProtocolHelper.buffDecode(protoCommon.enterRoomResp, msg);
            this.infriendRoom = false;
        } else {
            this.normalRoomIndex = 0;
        }
        EventManager.getInstance().raiseEvent(Const.mess_netEnterRoom, result, err, this.isReconnect);
    }
    //切换普通房间
    changeRoomReq(roomId: number = 0): void {
        let payload = new protoCommon.changeRoomReq();
        payload.roomId = roomId;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.changeRoomReq, protoCommon.changeRoomReq, payload);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.changeRoomReq, protoCommon.room_cmd.changeRoomResp, buff, this.changeRoomResp);
    }
    private changeRoomResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.changeRoomResp, msg);
            this.infriendRoom = false;
        }
        EventManager.getInstance().raiseEvent(Const.mess_netChangeRoom, result, err, this.isReconnect);
    }
    //离开房间请求
    leaveRoomReq(): void {
        let payload = new protoCommon.leaveRoomReq();
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.leaveRoomReq, protoCommon.leaveRoomReq, payload);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.leaveRoomReq, protoCommon.room_cmd.leaveRoomResp, buff, this.leaveRoomResp);
    }
    private leaveRoomResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            this.normalRoomIndex = 0;
            result = ProtocolHelper.buffDecode(protoCommon.leaveRoomResp, msg);
            this.infriendRoom = false;
        }
        EventManager.getInstance().raiseEvent(Const.mess_netLeaveRoom, result, err, this.isReconnect);
    }

    //准备消息，当客户端都初始化好了，后发送准备消息，这时候服务器开始推送消息
    readyReq(): void {
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.readyReq, protoCommon.readyReq, new protoCommon.readyReq());
        NetManager.getInstance().send(buff);
    }

    /*******************抢庄类好友房****************** */
    //------------------------------qzdz---------------------------------------

    // 抢庄类好友房间配置请求
    qzdzFriendRoomConfigReq(): void {
        logMgr.log("发起请求--抢庄类好友房间创建参数信息请求");
        let qzdzFriendRoomConfig: protoCommon.qzdzFriendRoomConfigReq = new protoCommon.qzdzFriendRoomConfigReq();
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzFriendRoomConfigReq, protoCommon.qzdzFriendRoomConfigReq, qzdzFriendRoomConfig);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzFriendRoomConfigReq, protoCommon.room_cmd.qzdzFriendRoomConfigResp, buff, this.qzdzFriendRoomConfigResp);
    }

    private qzdzFriendRoomConfigResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            logMgr.log("抢庄类好友房间创建参数信息请求成功");
            result = ProtocolHelper.buffDecode(protoCommon.qzdzFriendRoomConfigResp, msg);
        } else {
        }
        EventManager.getInstance().raiseEvent(Const.mess_qzdzFriendRoomConfigResp, result, err, this.isReconnect);
    }

    // 抢庄类好友房间创建创建请求
    qzdzCreateFriendRoomReq(config: protoCommon.qzdz_friend_room_config_type[]): void {
        logMgr.log("发起请求--抢庄类好友房间创建请求");
        let info: protoCommon.qzdzCreateFriendRoomReq = new protoCommon.qzdzCreateFriendRoomReq();
        info.config = config;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzCreateFriendRoomReq, protoCommon.qzdzCreateFriendRoomReq, info);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzCreateFriendRoomReq, protoCommon.room_cmd.qzdzCreateFriendRoomResp, buff, this.qzdzCreateFriendRoomResp);
        Utils.sendMessageToLobby(Global.gameId.toString() + "_createRoom", null);
    }

    private qzdzCreateFriendRoomResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            logMgr.log("抢庄类好友房间创建请求成功");
            result = ProtocolHelper.buffDecode(protoCommon.qzdzCreateFriendRoomResp, msg);
            this.friendRoomId = result.roomId;
            this.infriendRoom = true;
            Utils.sendMessageToLobby(Global.gameId.toString() + "_createRoomSucc", null);
        }
        EventManager.getInstance().raiseEvent(Const.mess_qzdzCreateFriendRoomResp, result, err, this.isReconnect);
    }

    // 抢庄类好友房间信息请求
    qzdzFriendRoomInfoReq(roomId: number): void {
        logMgr.log("发起请求--抢庄类好友房间加入信息请求", roomId);
        let info: protoCommon.qzdzFriendRoomInfoReq = new protoCommon.qzdzFriendRoomInfoReq();
        info.roomId = roomId;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzFriendRoomInfoReq, protoCommon.qzdzFriendRoomInfoReq, info);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzFriendRoomInfoReq, protoCommon.room_cmd.qzdzFriendRoomInfoResp, buff, this.qzdzFriendRoomInfoResp);
    }

    // 抢庄类好友房间信息响应
    private qzdzFriendRoomInfoResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            logMgr.log("抢庄类好友房间加入信息请求响应成功");
            result = ProtocolHelper.buffDecode(protoCommon.qzdzFriendRoomInfoResp, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_qzdzFriendRoomInfoResp, result, err, this.isReconnect);
    }

    // 抢庄类加入好友房请求
    qzdzJoinFriendRoomReq(roomId: number): void {
        logMgr.log("发起请求--抢庄类请求加入好友房", roomId);
        let info: protoCommon.qzdzJoinFriendRoomReq = new protoCommon.qzdzJoinFriendRoomReq();
        info.roomId = roomId;
        this.friendRoomId = roomId;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzJoinFriendRoomReq, protoCommon.qzdzJoinFriendRoomReq, info);
        this.netRequest(protoCommon.cmd.msg_room, protoCommon.room_cmd.qzdzJoinFriendRoomReq, protoCommon.room_cmd.qzdzJoinFriendRoomResp, buff, this.qzdzJoinFriendRoomResp);
        Utils.sendMessageToLobby(Global.gameId.toString() + "_joinRoom");
    }

    // 抢庄类加入好友房响应
    private qzdzJoinFriendRoomResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            logMgr.log("抢庄类请求加入好友房间成功");
            result = ProtocolHelper.buffDecode(protoCommon.qzdzJoinFriendRoomResp, msg);
            this.infriendRoom = true;
            Utils.sendMessageToLobby(Global.gameId.toString() + "_joinRoomSucc");
        } else {
            this.friendRoomId = 0;
        }
        EventManager.getInstance().raiseEvent(Const.mess_qzdzJoinFriendRoomResp, result, err, this.isReconnect);
    }

    //------------------------------跑马灯----------------------------------------------------------
    //跑马灯推送
    private marqueePush(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.marqueePush, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_netMarqueePush, result, err);
    }

    //-----------------------------GM命令----------------------------------------------------------
    GMSend(str: string) {
        let payload = new protoCommon.gmReq();
        payload.gmStr = str;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_gm, protoCommon.gm_cmd.gmReq, protoCommon.gmReq, payload);
        this.netRequest(protoCommon.cmd.msg_gm, protoCommon.gm_cmd.gmReq, protoCommon.gm_cmd.gmResp, buff, this.GMrespon);
    }

    //gmrespon
    GMrespon(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.gmResp, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_netgmResp, result, err, this.isReconnect);

    }

    /** ********************活动相关*******************************/
    /**
     * 活动信息推送
     */
    private activeInfoPush(msg: any, err: any = null): void {
        if (!err) {
            let result = ProtocolHelper.buffDecode(protoCommon.activesInfoPush, msg);
            EventManager.getInstance().raiseEvent(Const.mess_activeInfoPush, result);
        }
    }
    /**
     * 活动排行奖励信息推送
     */
    private activeRankRewardsPush(msg: any, err: any = null): void {
        if (!err) {
            let result = ProtocolHelper.buffDecode(protoCommon.activeRankRewardsPush, msg);
            EventManager.getInstance().raiseEvent(Const.mess_activeRankRewardsPush, result);
        }
    }
    /**
     * 空投红包奖励推送
     */
    private activeKongTouRewardPush(msg: any, err: any = null): void {
        if (!err) {
            let result = ProtocolHelper.buffDecode(protoCommon.activeKongTouRewardPush, msg);
            EventManager.getInstance().raiseEvent(Const.mess_activeKongTouRewardPush, result);
        }
    }

    /**
     * 请求具体活动基础信息
     * @param actType 活动类型
     * @param actId 活动ID
     */
    activeBaseReq(actType: number, actId: string): void {
        let payload = new protoCommon.activeBaseReq();
        payload.actType = actType;
        payload.actId = actId;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_active, protoCommon.active_cmd.activeBaseReq, protoCommon.activeBaseReq, payload);
        this.netRequest(protoCommon.cmd.msg_active, protoCommon.active_cmd.activeBaseReq, protoCommon.active_cmd.activeBaseResp, buff, this.activeBaseResp);
    }

    //活动基础信息返回
    private activeBaseResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.activeBaseResp, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_activeBaseResp, result, err);
    }

    /**
     * 请求活动排行榜
     * @param actType 活动类型
     * @param actId 活动ID
     * @param type 排行榜类型
     * @param page 请求页数
     * @param page_len 每页长度
     */
    activeRankReq(actType: number, actId: string, type: protoCommon.act_rank_type, page: number, page_len: number) {
        let data = new protoCommon.activeRankReq();
        data.actType = actType;
        data.actId = actId;
        data.rankType = type;
        data.page = page;
        data.pageLen = page_len;
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_active, protoCommon.active_cmd.activeRankReq, protoCommon.activeRankReq, data);
        this.netRequest(protoCommon.cmd.msg_active, protoCommon.active_cmd.activeRankReq, protoCommon.active_cmd.activeRankResp, buff, this.activeRankResp);
    }

    //活动积分排行榜返回
    private activeRankResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.activeRankResp, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_activeRankResp, result, err);
    }

    /**
     * 活动操作
     * @param actType 活动类型
     * @param actId 活动ID
     * @param type 操作类型
     * @param cost 红包空投的值，用于判断能否抽奖
     */
    activeOperateReq(actType: number, actId: string, type: protoCommon.act_operate_type, opreateData: IActivityOperateData) {
        let data = new protoCommon.activeOperateReq();
        data.actType = actType;
        data.actId = actId;
        data.type = type;
        switch (type) {
            case protoCommon.act_operate_type.ririling:
                if (!opreateData.exchange) {
                    return;
                }
                data.ririling = opreateData.exchange;
                break;
            case protoCommon.act_operate_type.exchange:
                if (!opreateData.exchange) {
                    return;
                }
                data.exchange = opreateData.exchange;
                break;
            case protoCommon.act_operate_type.lottery:
                if (!opreateData.lottery) {
                    return;
                }
                data.lottery = opreateData.lottery;
                break;
        }
        console.log("activeOperateReq====", data);
        let buff = ProtocolHelper.createGameSockBuff(protoCommon.cmd.msg_active, protoCommon.active_cmd.activeOperateReq, protoCommon.activeOperateReq, data);
        this.netRequest(protoCommon.cmd.msg_active, protoCommon.active_cmd.activeOperateReq, protoCommon.active_cmd.activeOperateResp, buff, this.activeOperateResp);
    }

    //活动操作返回,同时 updateUserInfoPush
    private activeOperateResp(msg: any, err: any = null): void {
        let result = null;
        if (!err) {
            result = ProtocolHelper.buffDecode(protoCommon.activeOperateResp, msg);
        }
        EventManager.getInstance().raiseEvent(Const.mess_activeOperateResp, result, err);
    }
    /** ********************活动相关*******************************/

    //-----------------------------发送--------------------------------------------------------
    //socket 发送buff 数据
    private netRequest(cmd: number, reqcmd: number, respcmd: number, buff: NetData, call: Function, resend: boolean = false): void {
        let callobj = <CallbackObject>{ target: this, callback: call };
        NetManager.getInstance().request(buff, [cmd, respcmd, reqcmd], callobj, resend);
        this.ErrorCallPush(cmd, reqcmd, callobj);
    }

    //------------------------------错误码处理列表----------------------------------------------------------
    //两个cmd码转化成一个
    private cmdTransform(cmd: number, ccmd: number): number {
        return cmd * 10000 + ccmd;
    }

    //发起请求的时候push 的列表
    private ErrorCallPush(cmd: number, ccmd: number, call: CallbackObject): void {
        let key = this.cmdTransform(cmd, ccmd);
        let isHas = false;
        for (let i = 0; i < this.errorCodeCallList.length; i++) {
            let code = this.errorCodeCallList[i].codekey;
            if (code == key) {
                isHas = true;
                return;
            }
        }

        this.errorCodeCallList.push(<ErrorCodeCallFun>{
            codekey: key,
            func: call
        });
    }

    //错误码的返回，错误码的返回的是发送请求的cmd,而不是resp的cmd，  遍历 push 进去的errorcode 函数，并调用
    private errorCodePushHandle(errorResult: protoCommon.errorCodePush, cmd: number, ccmd: number): void {
        for (let i = 0; i < this.errorCodeCallList.length; i++) {
            let callobj = this.errorCodeCallList[i];
            let codekey = this.cmdTransform(cmd, ccmd);
            if (callobj.codekey == codekey) {
                callobj.func.callback.call(callobj.func.target, null, errorResult);
            }
        }
    }

    //------------------------------错误码推送--------------------------------------------------------------
    private errorCodePush(msg: any): void {
        if (msg) {
            let result = ProtocolHelper.buffDecode(protoCommon.errorCodePush, msg);
            var cmd: number = Number(result.cmd) >> 8;     //向右边移动8位，只留前面的8位
            var ccmd: number = Number(result.cmd) & 255;    //后面的8位进行 0000000011111111 且 运算，前面8位进行去除
            console.warn("对应协议的错误推送：  ", cmd, ccmd, result.code, result.content);
            //如果是 common 的协议,直接调用回调原来resp函数
            this.errorCodePushHandle(result, cmd, ccmd);
            //清理没有回复的列表
            NetManager.getInstance().getNetNode().clearNotRespMess(cmd, ccmd);
            //发送错误码回复 消息 给 子模块
            EventManager.getInstance().raiseEvent(Const.mess_netErrorCodePush, result, cmd, ccmd);

            switch (result.code) {
                case protoCommon.code_type.other_login:
                case protoCommon.code_type.force_kick:
                    NetManager.getInstance().getNetNode().rejectReconnect(result.code);
                    break;
            }
        }
    }
}

