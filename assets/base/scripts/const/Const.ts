/**
 * 全局常量 ，不可变动
 */

export default class Const {
    //资源图中的设计大小
    public static ResDesignSize = cc.size(1920, 1080);

    public static touchSpace: number = 0.3; //点击间隔时间，防止快速频繁点击

    //事件通知
    public static mess_netErrorCodePush = "mess_errorcode_push";
    public static mess_connectSucc = "mess_connect_sucess";
    public static mess_enterGameSucc = "mess_enter_game_success";
    public static mess_enterGameFail = "mess_enterGameFail";
    public static mess_loginSucc = "mess_login_sucess";
    public static mess_windowResize = "mess_windowResize";
    public static mess_pageHideShow = "mess_pageHideShow";
    public static mess_refreshLanguage = "mess_refreshLanguage";            //多语言刷新
    public static mess_startMatchResp = "mess_startMatchResp";

    /******抢庄对战 */
    public static mess_qzdzFriendRoomConfigResp = "mess_qzdzFriendRoomConfigResp";
    public static mess_qzdzCreateFriendRoomResp = "mess_qzdzCreateFriendRoomResp";
    public static mess_qzdzFriendRoomInfoResp = "mess_qzdzFriendRoomInfoResp";
    public static mess_qzdzJoinFriendRoomResp = "mess_qzdzJoinFriendRoomResp";


    //键盘事件
    public static mess_keyboard = "mess_keyboard";

    //网络协议（需要在其他类中处理网络消息）
    //子模块 处理房间协议
    public static mess_netCreateRoom = "mess_net_create_room";
    public static mess_netEnterRoom = "mess_net_enter_room";
    public static mess_netJionRoom = "mess_net_enter_join_room";
    public static mess_netChangeRoom = "mess_net_change_room";
    public static mess_netLeaveRoom = "mess_net_leave_room";
    public static mess_netCancelMatch = "mess_netCancelMatch";

    //用户个人信息 推送到子模块
    public static mess_netgetUserInfoResp = "mess_netgetUserInfoResp";
    public static mess_netsetUserInfoResp = "mess_netsetUserInfoResp";
    public static mess_netgetLvAwardResp = "mess_netgetLvAwardResp";
    public static mess_netbuyFundResp = "mess_netbuyFundResp";
    public static mess_netgetFundAwardResp = "mess_netgetFundAwardResp";
    public static mess_netupdateUserInfoPush = "mess_netupdateUserInfoPush";
    public static mess_lvAwardInfoPush = "mess_lvAwardInfoPush";
    public static mess_netgmResp = "mess_netgmResp";                //gm返回
    //用户协议 被踢
    public static mess_netkickPush = "mess_netkickPush";
    //跑马灯协议
    public static mess_netMarqueePush = "mess_netMarqueePush";
    //socket close
    public static mess_netclose = "mess_netclose";
    //场景id
    public static mess_netSceneId = "mess_netSceneId";

    //网络延时展示
    public static mess_delayshow = "mess_delayshow";
    //网络延时展示设置
    public static mess_set_delayshow = "mess_set_delayshow";

    /**
     * 活动基础信息登录推送
     */
    public static mess_activeInfoPush = "mess_activeInfoPush";
    /**
     * 活动排行奖励推送
     */
    public static mess_activeRankRewardsPush = "mess_activeRankRewardsPush";
    /**
     * 活动全服兑换次数推送
     */
    public static mess_activeExchangeTimePush = "mess_activeExchangeTimePush";
    /**
     * 空投红包活动奖励推送
     */
    public static mess_activeKongTouRewardPush = "mess_activeKongTouRewardPush";


    /**
     * 请求具体活动基础信息返回
     */
    public static mess_activeBaseResp = "mess_activeBaseResp";
    /**
     * 活动排行榜返回
     */
    public static mess_activeRankResp = "mess_activeRankResp";
    /**
     * 活动操作返回
     */
    public static mess_activeOperateResp = "mess_activeOperateResp";
    //mess const 消息

    /**
     * 兑换引导推送
     */
    public static mess_netexchangeGuidePush = "mess_netexchangeGuidePush";

    /**
    * 聊天推送
    */
    public static mess_chatPush = "mess_chatPush";

}