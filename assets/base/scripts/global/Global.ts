/**
 * 全局数据，可变化状态
 */

import { FundRewardDataClass, LevelDataClass, TrialGuideClass } from "../const/BaseInterface";

export default class Global {
    public static gameId: number = 1000101;             //默认游戏id
    public static clientGameId: number = 1000101;             //默认游戏id, 转化后的id  例如 1000111 转成 1000101
    public static gameType: string = "slot";            //默认游戏类型
    public static language: string = "en";              // 语种
    public static isLocal = true;                       // web版才有效
    public static serverTimeOffset = 0;
    public static serverToken: string = "";                                 // 游戏服token
    public static serverIp: string = "";            //正式中启动的时候会获取
    public static srvIpList: string[] = [];                                 // 游戏服地址列表
    public static api_game_token: string = "";                               // 平台token
    public static api_game: string = "";                                  // 平台地址
    public static api_game_list: string[] = [];                                  // 平台地址列表
    public static cdnList: string[] = [];               // cdn地址列表
    public static cdnIndex: number = 0;                 // cdn地址列表索引
    public static bundle_domain: string = "";
    public static httpConfig: any = {}; //平台配置

    public static leveCconfig: LevelDataClass = null;                                         //个人等级
    public static fundRewardConfig: FundRewardDataClass = null;                                    //成长基金
    public static trialGuideConfig: TrialGuideClass = null;                                       //试玩引导
    public static openRespLog = false;
    public static referrer: string = "";                            //点返回跳转的地址
    public static platformGameConfig: any = {};                     //平台的game config


    /**竖版刘海高度 */
    public static bangsHeight: number = 0;

    /**横版刘海屏高度，如果是0，非刘海屏 */
    public static get statusBarHeight(): number {
        //iphoneX刘海屏高度判断
        if (typeof window !== 'undefined' && window && window.navigator && window.navigator.userAgent && window.innerWidth >= 812) {
            if (/iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812)
                return 80;
        }
        return Global.bangsHeight;
    }

    /**
     * 皮肤ID
     */
    public static skinId: number = 1;

    /**大厅id，若没有就是0 */
    public static lobbyId: number = 0;

    /**小数位数 */
    public static point: number = 2;

    /**功能开关 */
    public static functionSwitch: any = {};
}