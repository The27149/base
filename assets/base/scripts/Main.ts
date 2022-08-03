import { ProtocolHelper } from "./network/ProtocolHelper";
import { NetManager } from "./network/NetManager";
import { NetNode } from "./network/NetNode";
import { NetTips } from "./network/NetTip";
import { WebSock } from "./network/WebSock";
import CommonProto from "./network/CommonProto";
import { LogManager, logMgr } from "./log/LogManager";
import { CallbackObject, NetData } from "./network/NetInterface";
import HttpRequest, { IReqInfo } from "./httpreq/HttpRequest";
import { ComUtils } from "./utils/ComUtils";
import Global from "./global/Global";
import { EventManager } from "./event/EventManager";
import Const from "./const/Const";
import { ResLoader } from "./res/ResLoader";
import PageHideShow from "./common/PageHideShow";
import BaseLangConf, { ILangFileConf, LanguageType } from "./config/BaseLangConf";
import LanguageManager from "./language/LanguageManager";
import TipsManager from "./ui/TipsManager";
import { IDialogCallBackTarget } from "./ui/uiViews/UIDialog";
import { zLog } from "./log/zLog";
import BaseUIConf, { BASEUIID } from "./config/BaseUIConf";
import BehaviorRecord from "./log/BehaviorRecord";
import { Utils } from "./common/Utils";

//基础库入口
export default class Main {
    netnode: NetNode = null;
    protohelper: ProtocolHelper = null;
    comproto: CommonProto = null;

    /**
    * 检测环境，全局值赋，加载配置，初始化socket节点
     * @param callback    异步函数回调 成功回调
     * @param reject      异步函数回调 失败回调
     */
    public init(callback: Function, reject: Function) {
        zLog.init();
        zLog.level = zLog.LEVEL_INFO;
        if (window.location.href.indexOf('localhost') >= 0 || window.location.href.indexOf('.ydev.') >= 0)
            zLog.level = zLog.LEVEL_ALL;

        LogManager.getInstance().log("base main init ");
        if (window['gameConfig'].platformGameConfig)
            Global.platformGameConfig = window['gameConfig'].platformGameConfig;
        BehaviorRecord.instance.init();
        if (window['gameConfig'].isGetServerIp) {
            //测试的，正式的是http获取 serverip
            if (window["gameConfig"].server)
                Global.serverIp = window["gameConfig"].server;
            if (window["gameConfig"].srvIpList)
                Global.srvIpList = window["gameConfig"].srvIpList;
            if (Global.srvIpList.length == 0)
                Global.srvIpList.push(Global.serverIp);
            if (window["gameConfig"].serverToken)
                Global.serverToken = window["gameConfig"].serverToken;
            if (window["gameConfig"].cdnList)
                Global.cdnList = window["gameConfig"].cdnList;

        }

        if (window["gameConfig"].switch) {
            Global.functionSwitch = window["gameConfig"].switch;
        }

        if (window["gameConfig"].brand != undefined && window["gameConfig"].brand.skin_id != undefined) {
            Global.skinId = window["gameConfig"].brand.skin_id;
        }

        if (window["gameConfig"].point != undefined) {
            Global.point = window["gameConfig"].point;
            if (Global.point > 9) {
                Global.point = 9;
            }
            if (Global.point < 0) {
                Global.point = 2;
            }
        }

        if (window["gameConfig"].pluginsDir)
            Global.bundle_domain = window["gameConfig"].pluginsDir;

        //屏幕尺寸变化发出事件
        if (cc.sys.os == cc.sys.OS_IOS && window['webkit']) {
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.onResize.bind(this), false);
        } else {
            window.addEventListener('resize', this.onResize);
        }

        //监听网页激活还是后台
        PageHideShow.getInstance().Init();
        TipsManager.getInstance();

        if (cc.sys.isBrowser) {
            let url = ComUtils.getUrl();
            if (window["gameConfig"].return_url) {
                Global.referrer = window["gameConfig"].return_url;
            }
            else {
                if (document.referrer && document.referrer != "") {
                    if (document.referrer.indexOf('start/index.html') < 0)
                        Global.referrer = document.referrer;
                    else {
                        let referrer = ComUtils.getUrlParam(url, 'referrer');
                        if (referrer)
                            Global.referrer = referrer;
                    }
                }
            }
            let lobbyId = ComUtils.getUrlParam(url, 'lobby') || ComUtils.getUrlParam(url, "lobby_web");
            if (lobbyId) {
                // lobbyId = lobbyId.split("_")[1];
                // Global.lobbyId = parseFloat(lobbyId);
                // cc.game.setFrameRate(45);
                Global.lobbyId = 1000;
            }

            let statusBarHeight = ComUtils.getUrlParam(url, 'statusBarHeight');
            if (statusBarHeight)
                Global.bangsHeight = parseFloat(statusBarHeight);
        }

        //强制打开性能显示
        // cc.debug.setDisplayStats(true);

        //创建延时节点
        this.createNetDelay();

        //流程控制
        async.auto({
            checkEvn: this.checkIsLocal.bind(this),
            //依赖checkIsLocal 执行完成才能执行httpGetConfig
            httpGet: ["checkEvn", this.httpGetConfig.bind(this)],
            testServer: ["httpGet", this.testForServer.bind(this)],
            initNet: this.initNetNode.bind(this),
            loadLv: this.loadLvData.bind(this),
            loadFund: this.loadFundData.bind(this),
            loadLanguage: this.loadLanageData.bind(this),
            loadTrialGuide: this.loadTrialGuideData.bind(this),
            loadCommonPop: this.loadCommonPop.bind(this),
            initsocket: ["testServer", "loadLv", "loadFund", "loadLanguage", "loadTrialGuide", "loadCommonPop", "initNet", this.initSocket.bind(this)],
        }, function (err, results) {
            if (err) {
                LogManager.getInstance().console("base init fail ", err);
                if (reject) {
                    reject();
                }
            } else {
                LogManager.getInstance().console("base init finish  ");
                if (callback) {
                    callback();
                }
            }
        });
    }

    private onResize(): void {
        EventManager.getInstance().raiseEvent(Const.mess_windowResize);
    }

    /**
     * 获取配置文件
     */
    private httpGetConfig(result, callback: Function): any {
        //兼容本地调试与发布后的版本
        if (window['gameConfig'].isGetServerIp) {
            callback(null);
            return;
        }
        //检测链接的是否有参数 如果参数,则说明是正式跑，否则在本地
        let ip, token;
        if (cc.sys.isNative) {
            ip = base64.decode(Global.api_game);
            token = base64.decode(Global.api_game_token);
        } else if (!Global.isLocal) {
            let url = ComUtils.getUrl();
            ip = base64.decode(ComUtils.getUrlParam(url, 'api_game'));
            token = base64.decode(ComUtils.getUrlParam(url, 'api_game_token'));
        }

        if (ip) {
            logMgr.log("get url", "ip:" + ip, "token:" + token);
            let reqinfo: IReqInfo = {
                url: ip + "/v1/game_config",
                method: "GET",
                failCb: () => {
                    logMgr.error("request http config fail");
                    let okCbTarget: IDialogCallBackTarget = {
                        callback: () => {
                            CommonProto.getInstance().backPage();
                        }, target: this
                    };
                    let tips = LanguageManager.getInstance().getDstStr("fhdtcxjr_expired");
                    TipsManager.getInstance().showDialog(tips, okCbTarget, null, true);
                    callback("http请求配置错误");
                },
                successCb: (_xhr, baseinfo) => {
                    try {
                        let responseObj = JSON.parse(_xhr.responseText);
                        logMgr.log("request http config sucess", responseObj);
                        if (responseObj.data.server_ip)
                            if (responseObj.data.server_ip instanceof Array) {
                                Global.serverIp = responseObj.data.server_ip[0];
                                Global.srvIpList = responseObj.data.server_ip;
                            } else {
                                Global.serverIp = responseObj.data.server_ip;
                            }
                        if (responseObj.data.token)
                            Global.serverToken = responseObj.data.token;
                        if (responseObj.data.switch)
                            Global.functionSwitch = responseObj.data.switch;
                        // if (responseObj.data.ratio)
                        //     CommonProto.getInstance().coinRate = responseObj.data.ratio;
                        if (responseObj.data.cdn_arr instanceof Array) {
                            Global.cdnList = responseObj.data.cdn_arr;
                            Global.cdnIndex = 0;
                        }
                        callback(null);
                    } catch (error) {
                        console.error("http请求解析错误");
                        callback("http请求解析错误");
                    }
                },
                needSign: false,
                isAutoRetry: true,
                headerList: [{ name: "Authorization", value: token }],
            }
            HttpRequest.getInstance().send(reqinfo);
        } else {
            callback(null);
        }
    }

    //检测链接的是否有参数 如果参数,则说明是正式跑，否则在本地
    private checkIsLocal(callback: Function): any {
        if (!cc.sys.isNative) {
            let para = ComUtils.GetUrlPara();
            let hasApitoken = false;
            for (let i = 0; i < para.length; i++) {
                if (para[i].indexOf("api_game") > -1) {
                    hasApitoken = true;
                    break;
                }
            }
            if (para.length >= 1 && hasApitoken) {
                Global.isLocal = false;
            }
        }
        callback(null);
    }

    //初始化网络节点,加载协议
    private initNetNode(callback: Function): any {
        this.netnode = new NetNode();
        NetManager.getInstance().setNetNode(this.netnode);
        this.protohelper = new ProtocolHelper();
        this.comproto = CommonProto.getInstance();
        let proto = this.comproto;
        this.netnode.init(new WebSock(), this.protohelper, new NetTips(), (callobject: CallbackObject, buffer: NetData) => {
            //解析后的结果再次传入
            callobject.callback.call(callobject.target, buffer);
        });
        //连接socket 成功 回调
        this.netnode.setConectCallback(() => {
            //如果reconnectToken 有值说明是重连状态
            if (CommonProto.getInstance().reconnectToken) {
                //发起登陆请求
                proto.loginReq();
            }
            EventManager.getInstance().raiseEvent(Const.mess_connectSucc);
        })
        this.comproto.init();
        callback(null);
    }

    /**
     * 初始化socket 并且连接
     */
    private initSocket(result, callback: Function): any {
        LogManager.getInstance().console("建立socket节点");
        let tmpNetNode = NetManager.getInstance().getNetNode();
        if (tmpNetNode) tmpNetNode.setUrls(Global.srvIpList);
        NetManager.getInstance().connect({ url: Global.serverIp, autoReconnect: 5 });
        callback(null);
    }

    //加载公共弹窗提示文本
    private loadCommonPop(callback: Function): any {

        ResLoader.getInstance().loadRes("textures/skin" + Global.skinId + "/language/" + LanguageManager.getInstance().getCurLang() + "/btn_qd_test", cc.SpriteFrame, (err, frame: cc.SpriteFrame) => {
        }, "game_core", "@languageManager_btn_qd_test");
        ResLoader.getInstance().loadRes("textures/skin" + Global.skinId + "/language/" + LanguageManager.getInstance().getCurLang() + "/btn_qx_test", cc.SpriteFrame, (err, frame: cc.SpriteFrame) => {
            callback(null);
        }, "game_core", "@languageManager_btn_qx_test");

    }

    //加载个人等级配置
    private loadLvData(callback: Function): any {
        ResLoader.getInstance().loadRes("scripts/config/DataDataUcUserLevel", (err, asset: cc.JsonAsset) => {
            if (!err) {
                //console.log(asset);
                Global.leveCconfig = asset.json;
                callback(null);
            } else {
                callback(err);
            }
        }, "base", "configkey");

    }

    //加载试玩引导配置
    private loadTrialGuideData(callback: Function): any {
        ResLoader.getInstance().loadRes("scripts/config/DataUcTrialGuide", (err, asset: cc.JsonAsset) => {
            if (!err) {
                //console.log(asset);
                Global.trialGuideConfig = asset.json;
                callback(null);
            } else {
                callback(err);
            }
        }, "base", "configkey");


    }

    //加载等级基金奖励等级配置
    private loadFundData(callback: Function): any {
        ResLoader.getInstance().loadRes("scripts/config/DataDataUcLevelReward", (err, asset: cc.JsonAsset) => {
            if (!err) {
                //console.log(asset);
                Global.fundRewardConfig = asset.json;

                LogManager.getInstance().console("loadFundData end");
                callback(null);
            } else {
                callback(err);
            }
        }, "base", "configkey");


    }

    //加载多语言配置
    private loadLanageData(callback: Function): any {
        /** ---------------------  langCf定义和合并   ----------------------------------------------- */
        // 定义自己的语言配置json
        var langCf: { [key: string]: ILangFileConf[] } = {
            [LanguageType.EN]: [{ bundleName: 'base', path: "scripts/config/DataUcLangEn" }],
            [LanguageType.JA]: [{ bundleName: 'base', path: "scripts/config/DataUcLangJa" }],
            [LanguageType.KO]: [{ bundleName: 'base', path: "scripts/config/DataUcLangKo" }],
            [LanguageType.TH]: [{ bundleName: 'base', path: "scripts/config/DataUcLangTh" }],
            [LanguageType.VN]: [{ bundleName: 'base', path: "scripts/config/DataUcLangVi" }],
            [LanguageType.PU]: [{ bundleName: 'base', path: "scripts/config/DataUcLangPu" }],
        }
        // 将自己的配置与base库中配置合并
        BaseLangConf.getInstance().mergeLangConf(langCf);
        // 拿到合并后配置
        var finalLangCf = BaseLangConf.getInstance().getLangConf();
        // 初始化语言配置文件信息
        LanguageManager.getInstance().initLangConf(finalLangCf);
        /** ---------------------  langCf定义和合并   ----------------------------------------------- */
        let language = ComUtils.getCurLanguage();
        // 生成键值对map（内存中只保留该语种键值对数据）
        LanguageManager.getInstance().initLangMap(language, () => {
            LogManager.getInstance().console("公共模块语言配置加载完成  ", language);
            if (callback) {
                LogManager.getInstance().console("load lanagedata end");
                callback(null);
            }
        });
    }

    private testForServer(result, callback: Function): any {
        //test 给服务器测试
        let url = ComUtils.getUrl();
        let testip = ComUtils.getUrlParam(url, 'testip');
        if (testip) {
            Global.serverIp = testip;
        }
        callback();
    }


    public static closeSplash(): void {
        var splash = document.getElementById('splash');
        splash.style.display = 'none';
    }

    private createNetDelay(): void {
        ResLoader.getInstance().loadRes("prefabs/netDelay/netDelay", cc.Prefab, (err, prefab: cc.Prefab) => {
            if (!err) {
                let delay = cc.instantiate(prefab);
                cc.Canvas.instance.node.addChild(delay);
                delay.zIndex = 501;
                EventManager.getInstance().raiseEvent(Const.mess_set_delayshow);
            }
        }, "base", "baseDelayLabel");
    }
}