declare namespace core {
    export enum COREUIID {
        /**
         * 打开好友房创建面板
         */
        UI_FRIEND_ROOM = 200,
        /**
        * 打开好友房输入
        */
        UI_FRIEND_INPUT = 201,
        /**
        * 打开跑马灯
        */
        UI_BANNER = 202,
        /**
        * 打开个人信息面板
        */
        UI_BASEROLE_INFO = 203,
        /**
        * 打开自己个人信息面板
        */
        UI_SELFROLE_INFO = 204,
        /**
        * 打开自己个人信息面板
        */
        UI_NO_SELFROLE_INFO = 205,
        /**
        * 头像选择面板
        */
        UI_HEAD_LIST = 206,
        /**
        * 礼物盒子
        */
        UI_REWARD_BOX = 207,
        /**
        * 等级提升
        */
        UI_LEVEL_UP = 208,
        /**
        * 礼物盒子
        */
        UI_LEVEL_REWARD_ANI = 209,
        /**
        * 等级提升
        */
        UI_FUND_REWARD_ANI = 210,
        /**
        * 打开成长基金
        */
        UI_GROWTH_FUND = 211,
        /**
        * 成长基金奖励列表
        */
        UI_GROWTH_REWARDLIST = 212,
        /**
        * 成长基金帮助
        */
        UI_GROWTH_HELP = 213,
        /**
        * 成长基金领取记录
        */
        UI_GROWTH_RECORD = 214,
        /**新手引导 */
        UI_GUIDE = 215,
        /**
         * 游戏记录
         */
        UI_GAME_RECORD = 216,
        /**
         * 记录详情
         */
        UI_RECORD_DETAIL = 217,
        /**
         * 记录详情 - 捕鱼
         */
        UI_RECORD_DETAIL_HUNTER = 218,
        /**
         * 记录详情 - 桌游
         */
        UI_RECORD_DETAIL_ARCADE = 219,
        /**
         * 活动
         */
        UI_ACTIVITY = 220,
        /**
         * 兑换确认弹窗
         */
        UI_EXCHANGE_POPUP = 221,
        /**
         * 恭喜获得
         */
        UI_ACTIVITY_Congratulation = 222,
        /**
         * 排行奖励
         */
        UI_RANK_REWARD = 223,
        /**
         * 反馈
         */
        UI_FEEDBACK = 224,
        /**活动中心 */
        UI_ACT_CENTER = 225,
        /**红包空投领奖 */
        UI_ACT_HBTK_REWARD = 226,
        /**
         * 兑换引导
         */
        UI_EXCHANGE_GUIDE = 227,
        /**
         * 大厅游戏活动界面
         */
        UI_ACT_CENTER_LOBBY = 228,
        /**
         * 哈希查验帮助
         */
        UI_HASH_CHECK_HELP = 229,
        /**
        * 哈希查验
        */
        UI_HASH_CHECK = 230,
        /**
        * 哈希手动查验
        */
        UI_HASH_MANUAL_CHECK = 231,
        /**
         * 桌游币安哈希查验帮助
         */
        UI_BINANCE_HASH_CHECK_HELP = 232,
        /**
        *  桌游币安哈希查验
        */
        UI_BINANCE_HASH_CHECK = 233,
        /**
         * 桌游哈希查验中心
         */
        UI_ARCADE_HASH_CHECK = 234,
        /**
         * 桌游哈希查验中心单牌查验
         */
        UI_ARCADE_HASH_CHECK_CARD = 235,
        /**
         * 桌游哈希选择卡牌查验中心
         */
        UI_ARCADE_HASH_CHECK_SELECT_CARD = 236,
        /**
         * 桌游哈希切牌界面
         */
        UI_ARCADE_HASH_CUT_CARD = 237,
        /**
         * 哈希验证说明
         */
        UI_HASH_VERIFICATION_INSTRUCTIONS = 238,
        /**
         * 完整牌堆
         */
        UI_WHOLE_CARD_STACK = 239
    }
    export enum BINANCE_UIID {
        UI_BINANCE_HASH_kjtubiao = "UI_BINANCE_HASH_kjtubiao"
    }
    export const COREUICF1: {
        [key: number]: game.IUIConf;
    };
    export const COREUICF2: {
        [key: number]: game.IUIConf;
    };
    export const COREUICF3: {
        [key: number]: game.IUIConf;
    };
    export const COREUICF_SINGLE: {
        [key: string]: game.IUIConf;
    };
    export const ResPath: {
        banner: string;
        guide_finger: string;
        guide_text: string;
        waitPrefab: string;
    };
    export class GameCoreConst {
        static getCoreUICF(): any;
        static getSkinFolder(): string;
        static bannerCacheMax: number;
        /**
         * 跳转游戏
         * @param gameId 游戏id
         * @returns
         */
        static jumpToGame(gameId: number): void;
        /**
         * 关闭窗口
         */
        static closewin(): void;
        /**
         * 打开新窗口
         * @param url
         */
        static openWin(url: string): void;
        static mess_openBanner: string;
        static mess_inFriendRoom: string;
        static mess_clickBuyfund: string;
        static mess_clickgetfundReward: string;
        static mess_clickgetlvReward: string;
        static mess_openFriend: string;
        static mess_openFriendInput: string;
        static mess_changeRoomLogic: string;
        static mess_createRoomLogic: string;
        static mess_joinRoomLogic: string;
        static mess_openBaseRoleInfo: string;
        static mess_selectHeadIcon: string;
        static mess_changeHeadIcon: string;
        static mess_openGrowhfund: string;
        static mess_updateUserInfo: string;
        static mess_upDateGrowhfundState: string;
        static mess_loadingShow: string;
        static mess_loadingHide: string;
        /**
         * 更新金币，增量，这里不会累加到userinfo ，只是客户端做显示
         */
        static mess_updateCoinfInfo: string;
        /**
         * 游戏奖励公告，客户端自己配发
         */
        static mess_gameRewardNotice: string;
        static mess_checkRecordDetail: string;
        /**==================活动================== */
        /**
         * 显示活动界面
         */
        static mess_showActivity: string;
        /**
         * 显示活动图标
         * 附带参数：isShowEntrance 是否显示入口
         */
        static mess_showActivityIcon: string;
        /**
         * 在活动图标上显示红点
         * 附带参数：isShowRedPoint 是否显示红点
         */
        static mess_showRedPointOnActivityIcon: string;
        /**
         * 更新个人排行榜
         */
        static mess_updateMyRank: string;
        /**
         * 活动配置更新
         */
        static mess_updateActivityConfig: string;
        /**
         * 请求具体活动基础信息返回
         */
        static mess_activeBaseResp: string;
        static mess_lotteryErrorCodePush: string;
        /**==================活动================== */
        static mess_netJpResp: string;
        static mess_netJpRewardPush: string;
        static mess_netJpRecordDetail: string;
        static mess_netJpNormalDetail: string;
        static mess_netJpFreeDetail: string;
        static mess_netJpLittleDetail: string;
        /**
         * 世界boss信息请求后的回调数据
         */
        static mess_netWorldMissionInfoResp: string;
        /**
         * 世界boss任务开始
         */
        static mess_networldMissionStartPush: string;
        /**
         * 世界boss任务更新
         */
        static mess_netWorldMissionUpdatePush: string;
        /**
         * 世界boss任务奖励
         */
        static mess_netWorldMissionRewardPush: string;
        /**
         * 世界boss任务完成
         */
        static mess_netWorldMissionDonePush: string;
        /**
         * 世界boss任务停止
         */
        static mess_networldMissionStopPush: string;
        static mess_clockStart: string;
        static mess_clockHide: string;
        /**显示热门游戏按钮 */
        static mess_showHotGameBtn: string;
        /**设置热门游戏皮肤风格 */
        static mess_setHotGameSkin: string;
        /**活动-基础信息返回 */
        static act_mess_activeBaseResp: string;
        /**活动-更新排行榜 */
        static act_mess_updateMyRank: string;
        /**活动-操作返回 */
        static act_mess_activeOperateResp: string;
        /**活动-更新我的排行 */
        static mess_updateMyRankInfo: string;
        /**活动-更新日日领列表 */
        static act_mess_update_ririlingList: string;
        /**活动-更新兑换列表 */
        static act_mess_update_exchangeList: string;
        /**活动-操作失败 */
        static act_mess_operateFail: string;
        /**活动-更新当前活动积分 */
        static act_mess_updateActCurScore: string;
        /**
         * 打开兑换窗口
         * 后面附带参数
         * @param {Function}exchangeCallback 点击兑换时的回调，选填
         * @param {Function}continueCallback 点击继续时的回调，选填
         */
        static mess_openExchangeGuide: string;
        /**
        * 分数不足弹窗
        * @param tipsKey 提示文本key值
        * @param isShowDialog 是弹窗还是飘字
        */
        static mess_openRechargeGuide: string;
        /**slot哈希滚轴列表点击事件 */
        static slot_mess_rollerListClick: string;
        /**哈希验证卡牌界面卡牌点击事件 */
        static hash_mess_cardClick: string;
        /**哈希完整牌堆界面，更新事件 */
        static hash_mess_updateWholdCardStack: string;
    }
    /**
     * 游戏记录数据
     */
    /**
    * 游戏记录标签
    * @param BET_RECORD 游戏记录
    * @param ACCOUNT_FLOW 账户流水
    */
    export enum GameRecordTab {
        BET_RECORD = 0,
        ACCOUNT_FLOW = 1,
        NUM = 2
    }
    export enum GameTypeID {
        ALL = 0,
        SLOT = 10,
        HUNTER = 11,
        ARCADE = 12,
        SLOT_HASH = 20,
        SLOT_TIME_HASH = 30,
        ARCADE_BAN = 42,
        ARCADE_HASH = 22
    }
    /** 哈希查验类型 */
    export enum HashCheckType {
        SLOT = 0,
        HUNTER = 1,
        /** 桌游币安哈希查验 */
        ARCADE_BINANCEHASH = 2,
        /** 桌游哈希查验 */
        ARCADE_HASH = 3
    }
    export enum SearchTimeId_Record {
        TODAY = 1,
        YESTERDAY = 2,
        LAST_3_DAYS = 3,
        LAST_7_DAYS = 4,
        NUM = 4
    }
    /**
     * 玩法类型id
     * @REPORT_NORMAL_SPIN_TYPE 普通转
     * @REPORT_FREE_SPIN_TYPE 免费转
     * @REPORT_RETURN_SPIN_TYPE 重转
     * @REPORT_LITTLE_GAME_TYPE 小游戏
     * @REPORT_JACKPOT_TYPE jackpot
     * @REPORT_WORLD_MISSION 世界boss
     * @REPORT_BUY_FREE_GAME 购买免费游戏
     * @REPORT_TRIGGER_REWARD_EVENT 触发奖励事件
     * @REPORT_COLLECT_REWARD 收集奖励金币
     */
    export enum PlayTypeId_Record {
        REPORT_NORMAL_SPIN_TYPE = 1,
        REPORT_FREE_SPIN_TYPE = 2,
        REPORT_RETURN_SPIN_TYPE = 3,
        REPORT_LITTLE_GAME_TYPE = 4,
        REPORT_JACKPOT_TYPE = 5,
        REPORT_WORLD_MISSION = 6,
        REPORT_BUY_FREE_GAME = 7,
        REPORT_TRIGGER_REWARD_EVENT = 8,
        REPORT_COLLECT_REWARD = 9
    }
    /**
     * 辅助类型id
    @AUXILIARY_TYPE_COIN	%%	金币
    @AUXILIARY_TYPE_INC_FREE_TIMES	%%	免费游戏次数
    @AUXILIARY_TYPE_RESULT_RATE_FACTOR	%%	结果倍率递增系数
    @AUXILIARY_TYPE_RESULT_RATE_SET	%%	结果倍率设置
    @AUXILIARY_TYPE_RANDOM_WILD	%%	随机百搭
    @AUXILIARY_TYPE_RANDOM_SCATTER	%%	随机分散
    @AUXILIARY_TYPE_ASSIGN_ROLLER	%%	指定滚轴
    @AUXILIARY_TYPE_ELEMENT_RESULT_RATE	%%	元素结果倍率影响
    @AUXILIARY_TYPE_ELEMENT_FREE_TIMES	%%	元素免费次数影响
    @AUXILIARY_TYPE_FIX_ELEMENT_POS	%%	元素固定在的位置
    @AUXILIARY_TYPE_INC_CHOOSE_NUM	%%	增加可选数量
    @AUXILIARY_TYPE_RESULT_RATE_ADD	%%	结果倍率增加
    @AUXILIARY_TYPE_COLLECT_FREETIMES	%%	收集免费次数
    @AUXILIARY_TYPE_COLLECT_SCATTER	%%	收集分散
    @AUXILIARY_TYPE_COLLECT_COIN	%%	收集金币
    @AUXILIARY_TYPE_COIN_UNIT_RATE_ADD	%%	金币倍率增加
    @AUXILIARY_TYPE_COLLECT_COIN_UNIT_RATE	%%	收集金币倍率增加
    @AUXILIARY_TYPE_MAGICAL_SYMBOLS	%%	神奇符号
    @AUXILIARY_TYPE_COIN_MULTI	%%	金币系
    @AUXILIARY_TYPE_COIN_MULTI_RESULT_RATE_SET  %%  金币系数倍率设置
    @AUXILIARY_TYPE_RANDOM_ELEMENT_POS %%  随机元素位置
    @AUXILIARY_TYPE_LUCKY_GOLD  %%  幸运金币
     */
    export enum AuxiliaryTypeId_Record {
        AUXILIARY_TYPE_COIN = 0,
        AUXILIARY_TYPE_INC_FREE_TIMES = 1,
        AUXILIARY_TYPE_RESULT_RATE_FACTOR = 2,
        AUXILIARY_TYPE_RESULT_RATE_SET = 3,
        AUXILIARY_TYPE_RANDOM_WILD = 4,
        AUXILIARY_TYPE_RANDOM_SCATTER = 5,
        AUXILIARY_TYPE_ASSIGN_ROLLER = 6,
        AUXILIARY_TYPE_ELEMENT_RESULT_RATE = 7,
        AUXILIARY_TYPE_ELEMENT_FREE_TIMES = 8,
        AUXILIARY_TYPE_FIX_ELEMENT_POS = 9,
        AUXILIARY_TYPE_INC_CHOOSE_NUM = 10,
        AUXILIARY_TYPE_RESULT_RATE_ADD = 11,
        AUXILIARY_TYPE_COLLECT_FREETIMES = 12,
        AUXILIARY_TYPE_COLLECT_SCATTER = 13,
        AUXILIARY_TYPE_COLLECT_COIN = 14,
        AUXILIARY_TYPE_COIN_UNIT_RATE_ADD = 15,
        AUXILIARY_TYPE_COLLECT_COIN_UNIT_RATE = 16,
        AUXILIARY_TYPE_MAGICAL_SYMBOLS = 17,
        AUXILIARY_TYPE_COIN_MULTI = 18,
        AUXILIARY_TYPE_COIN_MULTI_RESULT_RATE_SET = 23,
        AUXILIARY_TYPE_RANDOM_ELEMENT_POS = 51,
        AUXILIARY_TYPE_LUCKY_GOLD = 69,
        AUXILIARY_TYPE_CAPTAIN_SUPERSPIN = 92,
        AUXILIARY_TYPE_CAPTAIN_CAPTAINEXPAND = 98,
        AUXILIARY_TYPE_CAPTAIN_SKULLEXPAND = 99,
        AUXILIARY_TYPE_CAPTAIN_FREEGAMES = 100
    }
    /**
     * 类型1
     * @MANUAL_TRANSACTION 人工交易
     * @API_GOLD api金币
     * @ACTIVITY_GOLD 活动金币
     * @ELECTRONIC_GAMES 电子游戏
     * @SPORTS_GAME 体育游戏
     */
    export enum Type1Id_Record {
        MANUAL_TRANSACTION = 1,
        API_GOLD = 2,
        ACTIVITY_GOLD = 3,
        ELECTRONIC_GAMES = 4,
        SPORTS_GAME = 5
    }
    /**
     * 类型2
     * @ADD 人工交易 - 增加
     * @SUB 人工交易 - 减少
     *
     * @TRANSFER_IN api金币 - 转入
     * @TRANSFER_OUT api金币 - 转出
     *
     * @LEVEL_REWARD 活动金币 - 等级奖励
     * @FUND 活动金币 - 基金
     * @BUY_FUND 活动金币 - 购买基金
     * @JIFEN 活动金币 - 积分活动奖励
     *
     * @SLOT 电子游戏 - 旋转
     * @HUNTER 电子游戏 - 捕猎
     */
    export enum Type2Id_Record {
        ADD = 1,
        SUB = 2,
        TRANSFER_IN = 1,
        TRANSFER_OUT = 2,
        LEVEL_REWARD = 1,
        FUND = 2,
        BUY_FUND = 3,
        JIFEN = 4,
        DASHANG = 5,
        KONGTOU = 6,
        JINBIAOSAI = 7,
        TIANTI = 8,
        RIRILING = 9,
        SLOT = 10,
        HUNTER = 11,
        ARCADE = 12
    }
    /**
     * 游戏信息（与服务器下发字段名一样）
     * @game_id 游戏id
     * @name 游戏名
     * @game_type_id 游戏类型id
     * @game_sub_type 游戏类型名
     */
    export class GameInfo_Record {
        game_id: number;
        name: string;
        game_type_id: number;
        game_sub_type: string;
    }
    /**
     * 游戏类型信息
     * @id 游戏类型id
     * @name 游戏类型名
     */
    export class GameTypeInfo_Record {
        id: number;
        name: string;
    }
    export class RecordGridShow {
        show: number[];
    }
    /**
     * 记录列表数据
     * @data 列表数据
     * @recordNum 记录总数量（因为分批请求列表，该值 >= data.length）
     * @tabId 标签页id
     * @gameTypeId 游戏类型id
     * @gameId 游戏id
     * @searchTimeId 查询时间id
     * @sumNum 总计数据数组
     * @latelyLVII 离 ListView 边界最近 item 索引（ListViewItemIndex）
     */
    export class RecordListData {
        data: any[];
        recordNum: number;
        tabId?: number;
        gameTypeId?: number;
        gameId?: number;
        searchTimeId?: number;
        sumNum?: number[];
        latelyLVII?: number;
    }
    /**
     * 查询条件
     * @tabId 标签页id
     * @gameTypeId 游戏类型id
     * @gameId 游戏id
     * @searchTimeId 查询时间id
     * @offset 偏移量
     */
    export class SearchCondition {
        tabId?: number;
        gameTypeId?: number;
        gameId?: number;
        searchTimeId?: number;
        offset?: number;
    }
    export type GameType_Record_Map = Map<number, RecordListData>;
    export enum RecordSumIndex {
        BET = 0,
        BONUS = 1,
        BULLET_NUM = 0,
        BULLET_VALUE = 1,
        WIN_LOSE = 2
    }
    export class RecordDI_ExtData {
        crush_rate?: number;
        roller_lv?: number;
        scatter?: number[];
        wild?: number[];
    }
    export class GameRecordData {
        private static _instance;
        private constructor();
        static getInstance(): GameRecordData;
        private _gameInfo;
        private _gameTypeInfo;
        private _id_typeGame;
        private _recordListData;
        gtComboxList: any[];
        gtComboxSelIndex: number;
        gnComboxSelIndex: number;
        stComboxSelIndex: number;
        comboxInited: boolean;
        checkOrderData: any;
        checkOrderDetail: any;
        resUrl: string;
        dataSlotBase: any;
        dataSlotDetail: any;
        dataQyxzBetDsc: any;
        dataQyxzReportDsc: any;
        dataSlotRoller: any;
        curSelTabId: GameRecordTab;
        curGameTypeId: GameTypeID;
        curSC: SearchCondition;
        protoMainId: number;
        protoSubId: number;
        reset(): void;
        setGameInfo(gameId: number, info: GameInfo_Record): void;
        getGameInfo(gameId: number): GameInfo_Record;
        getGameTypeInfo(gameTypeId: number): GameTypeInfo_Record;
        generateHelpData(): void;
        /**
         * 获取某游戏类型下的游戏id列表
         * @param typeId 游戏类型id，不填则为全部类型
         */
        getGameIdList(typeId?: number): number[];
        getGameTypeIdList(): number[];
        getSearchTimeIdList(): number[];
        getGameTypeId(gameId: number): number;
        game_id2Name(gameId: number): string;
        gameType_id2Name(typeId: number): string;
        searchTime_id2Name(typeId: number): string;
        playType_id2Name(typeId: number): string;
        playType_id3Name(typeId: number): string;
        auxiliaryType_id2Name(typeId: number): string;
        roomType_idName(game_id: number, typeId: number): string;
        pokerName_idName(game_id: number, typeId: number): string;
        type1_id2Name(typeId: number): string;
        type2_id2Name(type1: number, type2: number): string;
        /**
         * 加载json格式配置文件
         * @param path 文件路径
         * @param successCb 加载成功回调
         * @param bundleName bundle名
         */
        loadCfJson(path: string, successCb?: Function, bundleName?: string): Promise<any>;
        /**
         * 加载slot配置
         */
        loadSlotCf(): Promise<void>;
        dataSlotBaseOK(obj: any, path: string, bundleName: string): void;
        dataSlotRollerOK(obj: any, path: string, bundleName: string): void;
        dataQyxzBetDscOK(obj: any, path: string, bundleName: string): void;
        dataQyxzReportDscOK(obj: any, path: string, bundleName: string): void;
        dataSlotDetailOK(obj: any, path: string, bundleName: string): void;
        getoffsetAry(str: string): any[];
        /**
         * 游戏类型id对应的索引（编辑器中数组索引）
         * @param type 游戏类型id
         */
        gameType2EditorIndex(type: number): number;
        getRecordListData(tabId: number, gameTypeId: number): RecordListData;
        setRecordListData(tabId: number, gameTypeId: number, obj: RecordListData): void;
        addRecordList(tabId: number, gameTypeId: number, list: any[]): void;
        clearRecordListData(tabId?: number, gameTypeId?: number): void;
    }
    export class CoreUtils {
        /**
         * 加载远程资源
         *
         * @static
         * @param {cc.Node} node 节点
         * @param {string} url 资源地址
         * @param {string} assetKey 资源使用key
         * @memberof CoreUtils
         */
        static getSpriteFrame(node: cc.Node, url: string, assetKey: string): void;
        static getHeadIcon(node: cc.Node, id: number): void;
        /**
         * 设置灰色滤镜
         * @param node node节点 或 label、sprite组件
         * @param gray true变灰
         * @param children 子项是否变灰 默认false 只有node会有子项
         * @param interactable  当节点有bttton组件时，是否根据节点状态设置按钮事件是否被响应，如果为true，gray为true时按钮被禁用，false时开启
         */
        static setGray(node: cc.Node | cc.Label | cc.Sprite, gray?: boolean, children?: boolean, interactable?: boolean): void;
        /**
         * 设置节点全屏显示缩放,节点的宽高不能为0
         * @param node
         */
        static setNodeFullScreen(node: cc.Node): void;
        /**
         * 文件是否存在
         * @param filePath 文件路径
         * @param bundleName bundleName名
         * @returns
         */
        static isFileExist(filePath: string, bundleName?: string): boolean;
        /**
         * 新建事件回调
         * @param node 节点
         * @param compName 脚本名
         * @param handlerName 方法名
         */
        static createEventHandler(node: cc.Node, compName: string, handlerName: string, customData?: string): cc.Component.EventHandler;
        /**
         * 主动触发窗口大小变化的事件
         * 主要解决初始化时，预制节点上的widget组件 resize监听事件
         */
        static sendWindowResizeEvent(): void;
        /**
         *  生成多语言图片配置
         *
         * @static
         * @param {string} bundleName
         * @memberof CoreUtils
         */
        static createI18nTextureConfig(bundleName?: string): void;
        /**下载 */
        static Download(content: any, filename: any): void;
        /**
         * 复制内容到剪切板
         * @param text
         */
        static copyText(text: string): void;
        static getTimestampRoller(ciphertext: string, column: number, rollerId: number): string[];
        /**获取 commonRes 路径 */
        static getCommonResPath(): string;
        /**获取 game_core bundle version */
        private static gameCoreBundleMd5;
        static getGameCoreMd5(): string;
    }
    export class ToggleLabelCtrl extends cc.Component {
        normalColor: cc.Color;
        selectColor: cc.Color;
        private toggleList;
        protected onLoad(): void;
        init(targetNode: cc.Node): void;
        checkEvent(): void;
    }
    export class CoreListView extends game.ListView {
        /**
         * 列表数据更新后刷新列表显示
         */
        updateList(): void;
        /**
         * 更新列表宽高
         */
        private updateContentWH;
    }
    /**
     * 用户活动信息
     */
    export class UserActivityInfo {
        /**
         * 活动积分
         */
        activeScores: Map<string, number>;
        /**
         * 入口开始时间
         */
        enterStart: number;
        /**
         * 入口关闭时间
         */
        enterEnd: number;
        /**
         * 活动列表
         */
        activityInfo: protoCommon.active_info_type[];
        /**
         * 活动配置信息
         */
        activityConfig: IActivityConfigInfo[];
    }
    /**
     * 活动配置信息
     */
    export interface IActivityConfigInfo {
        /**
         * 活动类型
         */
        activity_type: protoCommon.active_type;
        /**
         * 活动id
         */
        id: any;
        /**
         * 活动名称
         */
        name: string;
        /**
         * 活动对象游戏id
         */
        game_ids: number[];
        /**
         * 积分活动功能
         */
        type_ids: EnumActScoreFun[];
        /**
         * 活动背景url
         */
        pic_bg: string;
        /**
         * 活动内容url
         */
        pic_body: string[];
        /**
         * 活动标题
         */
        pic_title: string;
        /**
         * 活动图片配置
         */
        info: IActImagesConifg[];
        /**
         * 奖品配置
         */
        setting: {
            prize: IPrizeType;
        };
        /**
         * 活动开始时间
         */
        time_activity_begin: number;
        /**
         * 活动结束时间
         */
        time_activity_end: number;
        /**
        * 活动展示开始时间
        */
        time_display_begin: number;
        /**
       * 活动展示结束时间
       */
        time_display_end: number;
    }
    /**
     * 奖品类型
     * @param [prize_1] 抽奖
     * @param [prize_2] 兑换
     */
    export interface IPrizeType {
        /**
         * 抽奖
         */
        prize_1?: IPrizeConfig;
        /**
         * 兑换
         */
        prize_2?: IPrizeConfig;
    }
    /**
     * 奖品配置
     */
    export interface IPrizeConfig {
        /**
         * 活动id
         */
        activity_id: number;
        /**
         * 活动名称
         */
        activity_name: string;
        /**
         * 单次消耗金额
         */
        consume_price: number;
        /**
         * 10连抽消耗金额
         */
        consume_consecutive: number;
        /**
         * 奖品信息
         */
        data: IPropInfo[];
    }
    /**
     * 抽奖、兑换奖品数据
     */
    export interface IPropInfo {
        /**
         * 物品数量
         */
        amount: number;
        /**
         * 个人兑换上限
         */
        exchange_limit: number;
        /**
         * 兑换价格
         */
        exchange_price: number;
        /**
         * 格子位
         */
        grid: number;
        /**
         * icon地址
         */
        icon: string;
        /**
         * id
         */
        id: number;
        /**
         * 物品id
         */
        props_id: number;
        /**
         * 中奖数量上限/物品数量上限（全服）
         */
        props_limit: number;
        /**
         * 物品类型
         */
        props_type: number;
    }
    /**
     * 活动图片配置
     * @param [language] 语言
     * @param [name] 活动名称
     * @param [pic_title] 标题图片地址
     * @param [pic_body] 介绍地址图片列表
     */
    export interface IActImagesConifg {
        /**
         * 语言
         */
        language: string;
        /**
         * 活动名称
         */
        name: string;
        /**
         * 标题图片地址
         */
        pic_title: string;
        /**
         * 介绍地址图片列表
         */
        pic_body: string[];
    }
    /**
     * 活动操作类型'
     * @param [Lottery] 抽奖
     * @param [Exchange] 兑换
     */
    export enum EnumActOperateType {
        /**
         * 抽奖
         */
        Lottery = 1,
        /**
         * 兑换
         */
        Exchange = 2
    }
    /**
     * 活动功能类型
     * @param [CONTENT] 活动内容
     * @param [LOTTERY] 抽奖
     * @param [EXCHANGE] 兑换
     * @param [RANK] 排行
     */
    export enum EnumActFunType {
        /**活动内容 */
        CONTENT = 1,
        /**抽奖 */
        LOTTERY = 2,
        /**兑换 */
        EXCHANGE = 3,
        /**排行 */
        RANK = 4
    }
    /**
     * 活动排行榜类型
     * @param [jifen_rank] 积分排行榜
     * @param [yingli_rank] 盈利榜
     * @param [yingfen_rank] 赢分
     * @param [jisha_rank] 击杀榜
     */
    export enum EnumActRankType {
        /**积分排行榜 */
        jifen_rank = 1001,
        /**盈利榜 */
        yingli_rank = 1002,
        /**赢分 */
        yingfen_rank = 1003,
        /**击杀 */
        jisha_rank = 1004
    }
    /**
     * 活动类型
     * @param [jifen] 积分
     * @param [jinbiaosai] 锦标赛
     * @param [tainti] 天梯
     * @param [tianjianghongbao] 天降红包
     * @param [hongbaoririling] 红包日日领
     */
    export enum EnumActType {
        /**积分 */
        jifen = 1,
        /**锦标赛 */
        jinbiaosai = 2,
        /**天梯 */
        tainti = 3,
        /**天降红包 */
        tianjianghongbao = 4,
        /**红包日日领 */
        hongbaoririling = 5
    }
    /**
     * 积分活动功能
     * @param [Lottery] 积分抽奖
     * @param [Exchange] 积分兑换
     * @param [Rank] 积分排行
     */
    export enum EnumActScoreFun {
        /**积分抽奖 */
        Lottery = 1,
        /**积分兑换 */
        Exchange = 2,
        /**积分排行 */
        Rank = 3
    }
    /**
     * 活动标签数据
     */
    export interface IBtnData {
        /**活动类型 */
        actType: protoCommon.active_type;
        /**活动id */
        actId: string;
        /**活动名称 */
        actName: string;
    }
        /**
     * 活动内容
     */
    export class ActContentBase extends cc.Component {
        contentNode: cc.Node;
        gameTargetlistView: CoreListView;
        private _actType;
        actType: protoCommon.active_type;
        private _actId;
        actId: string;
        /**类名 */
        protected readonly className: string;
        /**
         * 初始化活动内容
         */
        initPanel(actType: number, actId: string, imageUrls: string[], list: any[]): void;
        /**
         * 初始化活动内容
         */
        private initActContentDesc;
        /**
         * 初始化活动对象列表
         */
        private initActTargetList;
        /**
         * 更新布局
         */
        private updateLayout;
        activeContentUpdate?(event: string, type: protoCommon.active_type): void;
    }
    export class LotteryItem extends cc.Component {
        prizeIcon: cc.Sprite;
        prizeNumLabel: cc.Label;
        itemId: number;
        init(data: protoCommon.act_lottery_reward_type, id: number): void;
    }
    /**
     * 转盘抽奖类，可实现不同数量等分区域中奖模拟旋转
     *
     * @export
     * @class Lottery
     * @extends {cc.Component}
     */
    export class ActLotteryBase extends cc.Component {
        zhuanpanNode: cc.Node;
        lotteryItem: cc.Prefab;
        curScoreLabel: cc.Label;
        startAngle: number;
        totalCount: number;
        stopTouchNode: cc.Node;
        /**转动时长 */
        private rollTimes;
        /**当前转动时长 */
        private _curRollTimes;
        /**当前角度 */
        private _curAngle;
        /**上次中奖id */
        private lastIndex;
        /**是否可操作 */
        protected isCanTouch: boolean;
        /**当前活动id */
        private curActId;
        /**当前活动类型 */
        private curActType;
        /**
         * 中奖区域item
         */
        private itemArr;
        /**
         * 单次消耗
         */
        protected onceCost: number;
        /**
         * 多次消耗
         */
        protected multiCost: number;
        onLoad(): void;
        start(): void;
        protected addEventListener(): void;
        protected removeEventListener(): void;
        onDestroy(): void;
        /**
         * 初始化活动内容
         * @param data 活动配置信息
         */
        init(data: protoCommon.act_lottery_base_type, curActType: number, curActId: string): void;
        /**
         * 更新玩家信息
         */
        private updateUserInfo;
        /**
         * 抽奖次数
         */
        protected onToggleEvent(event: any): void;
        /**
         * 开始滚动按钮点击
         */
        protected onStartRunBtnClick(): void;
        /**
         * 请求抽奖
         */
        private getRewardReq;
        /**
         * 活动抽奖返回
         */
        private activeCallResp;
        /**
         * 模拟抽奖滚动
         *
         * @private
         * @param {number} rewardIndex 中奖id
         * @param {Function} finishCall 滚动结束回调
         * @param {boolean} isShowInAdvance 是否提前展示结果
         * @memberof Lottery
         */
        private showRollAni;
        /**
         * 展示抽奖结果
         */
        private showReward;
        /**
         * 禁止点击
         */
        protected stopTouch(isShow: boolean): void;
        /**
         * 快速停止
         */
        private quickStopCall;
        protected showResult(): void;
        operateFail(): void;
    }
    /**
     * 活动排行item基类
     */
    export class ActRantItemBase extends cc.Component {
        private _updateTime;
        private _updateInterval;
        private view;
        private itmeHeight;
        private _index;
        index: number;
        protected onLoad(): void;
        updateItem(index?: number, data?: any, extraData?: any): void;
        private updateOpacity;
        update(dt: number): void;
        private getPos;
    }
    export class ActListBase extends cc.Component {
        scrollView: cc.ScrollView;
        itemTemp: cc.Prefab;
        noDataNode: cc.Node;
        private _itemList;
        private _dataList;
        readonly dataList: any[];
        private _inited;
        private _type;
        private _extraData;
        init(arg: any): Promise<void>;
        updateList(type: any): Promise<void>;
        private showNoDataNode;
        framingLoad(childNodeCount: number, startIndex?: number): Promise<void>;
        /**
         * 分帧执行 Generator 逻辑
         *
         * @param generator 生成器
         * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
         */
        private executePreFrame;
        private _getItemGenerator;
        private _initItem;
    }
            /**
     * 活动排行按钮列表
     */
    export class ActRank {
        type: EnumActRankType;
        toggle: cc.Toggle;
        listView: ActListBase;
        private _listData;
        listData: any[];
        private _actType;
        actType: number;
    }
    /**
     * 活动排行榜基类
     */
    export class ActRankBase extends cc.Component {
        actRankList: ActRank[];
        myRankLabel: cc.Label;
        myIdLabel: cc.Label;
        myScoreLabel: cc.Label;
        myRewardLabel: cc.Label;
        defaultRank: ActRank;
        /**当前排行榜界面 */
        private _curRank;
        curRank: ActRank;
        private isInited;
        /**类名 */
        private readonly className;
        private _actType;
        actType: protoCommon.active_type;
        private _actId;
        actId: string;
        private rankData;
        initRank(actType: protoCommon.active_type, actId: string, list: protoCommon.act_rank_type[]): void;
        protected start(): void;
        /**
         * 初始化排行榜列表
         */
        protected initRankList(): void;
        /**
         * 按钮选中
         */
        private onToggleClick;
        protected onRankBtnClick(type: protoCommon.act_rank_type, curRank: ActRank): void;
        protected addEventListener(): void;
        protected removeEventListener(): void;
        protected onDestroy(): void;
        /**
         * 活动排行榜返回
         * @param event
         * @param data
         */
        protected activeRankResp(event: string, data: protoCommon.activeRankResp): void;
    }
        /**
     * 活动功能
     */
    class ActFun {
        type: EnumActFunType;
        toggle: cc.Toggle;
        panel: cc.Node;
    }
    /**
     * 活动基类
     */
    export class ActBase extends cc.Component {
        /**活动标题 */
        private actTitleSprite;
        /**活动标题 */
        private bgNode;
        /**活动功能列表 */
        private ActFunList;
        /**活动时间 */
        private actTimeLabel;
        /**兑换比例 */
        private exchangeRateLabel;
        /**最低押分 */
        private minCostLabel;
        private defaultFun;
        /**当前功能界面 */
        private _curFun;
        curFun: ActFun;
        private isInited;
        /**类名 */
        protected readonly className: string;
        private _actType;
        actType: protoCommon.active_type;
        private _actId;
        actId: string;
        /**当前活动配置 */
        curActConfig: IActivityConfigInfo;
        initPanel(data: IActivityConfigInfo, typeList: EnumActFunType[]): void;
        /**
         * 初始化背景
         */
        private initBg;
        /**
         * 初始化标题
         */
        private initTitle;
        /**
         * 初始化内容
         */
        private initContent;
        /**
         * 初始化抽奖
         */
        private initLottery;
        onEnable(): void;
        layoutContent(): void;
        private scrollToTop;
        /**
         * 初始化活动时间
         */
        private initActivityTime;
        /**
         * 初始化功能列表
         */
        protected initFunList(typeList: EnumActFunType[]): void;
        /**
         * 按钮选中
         */
        private onToggleClick;
        protected onDestroy(): void;
        addEventListener(): void;
        removeEventListener(): void;
        start(): void;
        activeBaseResp(event: string, type: protoCommon.active_type, data?: protoCommon.activeBaseResp): void;
        /**显示积分金币转化比例和最小押分 */
        private initScoreAndMincost;
        /**
         * 初始化排行榜
         */
        initRank(): void;
        /**
         * 更新内容
         * @param event
         * @param type
         */
        updateContent(event: string, type: protoCommon.active_type): void;
        /**
         * 按钮点击回调
         * @param type 功能类型
         */
        protected onFunBtnClick?(type: EnumActFunType): void;
    }
    export class BtnItem extends cc.Component {
        activityNameLabels: cc.Label[];
        /**
         * 当前活动id
         */
        curActId: string;
        /**
         * 当前活动类型
         */
        curActType: number;
        /**
         * 活动名称
         */
        activityName: string;
        /**
         * 初始化按钮
         * @param activityName 活动名称
         * @param actId 活动id
         * @param curActType 活动类型
         */
        init(activityName: string, actId: string, curActType: number): void;
    }
    /**
     * 活动中心
     */
    export class ActivityCenter extends game.View {
        /**活动节点容器 */
        private contentNode;
        /**单选框  */
        private toggleContainer;
        /**活动页签按钮 */
        private actBtnPrefab;
        /**活动页签容器 */
        private actBtnContent;
        private layer;
        /**
         * 活动节点列表
         */
        private contentNodeList;
        /**活动预制 */
        private prefabMap;
        /**是否可以触摸 */
        private isCanTouch;
        /**活动按钮信息 */
        private btnConfing;
        /**活动背景图片 */
        private actBgSpMap;
        /**活动按钮列表 */
        private btnList;
        protected onLoad(): void;
        onDestroy(): void;
        layout(): void;
        layoutLandscape(): void;
        layoutPortrait(): void;
        /**
         * 初始化
         */
        init(...args: any[]): void;
        onOpen(fromUI: number, ...args: any[]): void;
        /**
         * 节点缩放
         */
        private scaleNode;
        /**
         * 更新活动遮罩状态
         */
        private updateActMask;
        private updateContentLayout;
        /**
         * 初始化活动按钮列表
         */
        private initActBtnList;
        /**
         * 初始进入时禁用toggle,加载完成后启用
         */
        private enableToggle;
        /**
         * 加载内容预制
         * @param index 索引
         * @param finishCall 完成回调
         * @returns
         */
        private loadContentPrefab;
        /**
         * 显示内容
         */
        private showContentNode;
        /**
         * 显示节点
         */
        private showNode;
        /**
         * 初始化活动
         * @param actBase
         * @param index
         */
        private initActPanel;
        /**
         * 关闭
         */
        private onCloseBtnClick;
        curAct: string;
        setBgSp(actType: number, actId: string, nodeSp: cc.Sprite, url?: string): void;
        /**
         * 适配刘海屏
         */
        private adaptBang;
    }
    export enum EnumActTipsType {
        /**
         * 积分不足
         */
        NO_SCORE = 0,
        /**
         * 次数不足
         */
        NO_TIMES = 1,
        /**
         * 不在活动中
         */
        ACT_OUT_TIME = 2,
        /**
         * 兑换成功
         */
        OPERATE_SUC = 3
    }
    class TipsNode {
        tipstType: EnumActTipsType;
        tipsPrefab: cc.Prefab;
        targetNode: cc.Node;
        targetTween: cc.Tween;
    }
    /**
     * 活动提示
     *
     * @export
     * @class ActivityTips
     * @extends {cc.Component}
     */
    export class ActivityTips extends cc.Component {
        tipsNodes: TipsNode[];
        protected onLoad(): void;
        protected onDestroy(): void;
        /**
         * 显示提示
         * @param event
         * @param type
         */
        private showTips;
    }
        /**
     * 活动管理器
     *
     * @export
     * @class ActivityManager
     */
    export class ActivityManager {
        private static _intance;
        static getIntance(): ActivityManager;
        /**
         * 玩家活动信息
         */
        private _userActivityInfo;
        readonly userActivityInfo: UserActivityInfo;
        /**
         * 是否已经初始化
         */
        private isInited;
        /**
         * 配置是否已加载
         */
        private isConfigLoaded;
        /**
         * 活动数据是否已推送
         */
        private isActivityPushed;
        /**
             * 是否显示入口
             */
        private isShowEntrance;
        /**
         * 活动入口节点
         */
        private activityIcon;
        /**
         * 活动入口图标资源路径
         */
        private iconUrl;
        private lastPoint;
        /**当前活动类型 */
        private _curActType;
        /**当前活动类型 */
        curActType: EnumActType;
        /**当前活动id */
        private _curActId;
        /**当前活动id */
        curActId: string;
        actBaseInfoResp: Map<string, protoCommon.activeBaseResp>;
        /**活动基础信息 */
        private actBaseInfoMap;
        /**活动中心component */
        private actCenter;
        /**活动名称列表 */
        private actBtns;
        /**类名 */
        private readonly className;
        /**
         * 初始化
         */
        init(): void;
        /**
         * 添加活动入口图标
         */
        private addAvtivityEntrance;
        private onResize;
        /**按钮适配 */
        static setWidget(node: cc.Node, target?: cc.Node): void;
        static readonly isLandscape: boolean;
        /**开启widget属性 */
        private static openWidgetProperty;
        /**
         * 初始化多语言配置
         */
        private initLangConfig;
        /**添加事件监听 */
        private addEventListener;
        /**移除事件监听 */
        private removeEventListener;
        /**
         * 更新红点状态
         */
        private updateRedPoint;
        /**·
         * 显示红点
         */
        private showRedPoint;
        destroy(): void;
        private onTouchStart;
        /**
         * 显示活动界面
         */
        private showActivity;
        /**
         * 按钮移动
         */
        private iconTouchMove;
        /**
         * 检查是否显示活动入口
         */
        private checkIsShowEntrance;
        /**请求活动配置 */
        private requestActivityData;
        /**
         * 解析活动配置信息
         * @param configList 配置列表
         */
        private decodeConfig;
        /**
         * 通过id获取对应icon url
         * @param id 商品id
         * @param type 类型 1：转盘  2：兑换
         */
        getIconUrlById(id: number, type: number): string;
        /**
         * 错误码推送
         */
        private errCodePush;
        /**
         * 请求游戏数据
         */
        private requestGameInfo;
        private gameIds;
        /**游戏图标列表 */
        private gameIconList;
        /**
         * 请求游戏列表回调
         */
        private requestGameListBack;
        /**
         * 通过游戏id获取游戏icon url
         */
        getIconLinkByGameId(gameId: number): string;
        /**
         * 活动基础信息返回
         */
        private activeBaseResp;
        /**
         * 活动排行榜返回
         */
        private activeRankResp;
        /**
         * 活动操作-返回
         */
        private activeOperateResp;
        /**
         * 用户信息更新推送
         */
        private updateUserInfoPush;
        /**
         * 活动信息推送
         */
        private activeInfoPush;
        private sortGameList;
        /**排行奖励数据 */
        private rankRewardPushDataList;
        /**
         * 弹出排行奖励界面
         */
        popupRankReward(): void;
        /**
         * 活动排行奖励推送
         */
        private activeRankRewardsPush;
        /**红包空投奖励数据 */
        private HBKTRewardDataList;
        /**
         * 弹出红包空投奖励界面
         */
        popupHHKTReward(): void;
        /**
         * 空投活动奖励推送
         */
        private activeKongTouRewardPush;
        /**
         * 获取活动信息
         * 包括开始、结束时间和类型以及id
         * @param actType 活动类型
         * @param actId 活动id
         * @returns
         */
        getActivityInfo(actType: protoCommon.active_type, actId: any): protoCommon.active_info_type;
        /**
         * 获取活动基础信息（不同类型活动基础信息不同）
         * 包括抽奖、兑换、排行、日日领信息
         * @param actType 活动类型
         * @param actId 活动id
         * @returns
         */
        getActBaseInfo(actType: protoCommon.active_type, actId: string): protoCommon.act_base_type;
        /**
         * 设置活动背景
         * @param nodeSp 背景节点
         * @param url 背景链接
         * @returns
         */
        setActBgSp(nodeSp: cc.Sprite, url?: string): void;
        /**
         * 获取活动开始、结束时间
         * @param actType 活动类型
         * @param actId 活动id
         */
        getStartAndEndTime(actType: protoCommon.active_type, actId: string): number[];
        /**
         * 获取活动配置
         * @param actType 活动类型
         * @param actId 活动id
         * @returns
         */
        getActConfig(actType: protoCommon.active_type, actId: string): IActivityConfigInfo;
        private actErrorCode;
    }
    export enum BannerType {
        Sys = 0,
        Plat = 1,
        Game = 2
    }
    export enum RoomState {
        Normal_Room = 0,
        Friend_Room = 1
    }
    export enum DisplayRoleInfo {
        Other = 0,
        Ower = 1
    }
    export enum RewardBoxType {
        Level = 1,
        FundReward = 2
    }
        export interface RewardBoxParam {
        id: number;
        /**
         * bundle 名字，才能去加载对应的资源
         */
        bundle: string;
        /**
         * 礼盒图资源路径 用来加载spriteFrame
         */
        boxFrame: string;
        /**
         * 礼盒图资源路径 用来加载spriteFrame
         */
        btnFrame: string;
        /**
         * 礼盒上面展示的文字
         */
        boxLabel: string;
        /**
         * 按钮上面展示的文字
         */
        btnText: string;
        /**
         * 默认的按钮位置  1 在礼盒的下侧， 2 在礼盒的右侧（如果设置了btnPos位置这个则不生效）
         */
        btnPosType: number;
        /**
         * 设置按钮位置 可选参数
         */
        btnPos?: cc.Vec2;
        /**
         * 点击按钮的回调函数 可选 ，如果没有则默认
         */
        clickCallFun?: Function;
        /**
         * 回调函数上下文 可选
         */
        clickTarget?: object;
        /**
         * 点击按钮声音自定义  可选
         */
        clickSound?: {
            bundle: string;
            path: string;
        };
        /**
         * 按钮状态 1正常 2灰色
         */
        btnState?: number;
    }
    export interface GrowFundParam {
        id: number;
        name: string;
        reward: number;
        price: number;
        titleTag: string;
        icon: string;
    }
    export interface GrowListParam {
        level: string;
        exp: string;
        baiyin: number;
        huangjin: number;
        zuanshi: number;
    }
    export interface GrowHelpParam {
        id: number;
        title: string;
        description: string;
    }
    export interface GrowRecordParam {
        id: number;
        level: string;
        exp: number;
        bonus: number;
        state: number;
    }
    export interface BannerParam {
        /**
         * 跑马灯的父节点，如果不设置 默认是canvas
         */
        parent: cc.Node;
        /**
         * 相对父节点的y坐标偏移
         */
        verPos: cc.Vec2;
        horPos: cc.Vec2;
        /**
         * 节点缩放
         */
        scale: number;
        /**
         * 回调
         */
        callback?: (objInst: Banner | null) => void;
    }
    /**登录ip信息 */
    export class IpInfo {
        /**ip */
        ip: string;
        /**国家 */
        country: string;
        /**国家代码 */
        country_zh: string;
        /**省份 */
        province: string;
        /**省份代码 */
        province_zh: string;
        /**城市 */
        city: string;
        /**城市代码 */
        city_zh: string;
    }
    export class ClientEventReportRequest {
        platform_id: number;
        application_id: number;
        channel_id: number;
        user_id?: number;
        event_id: number;
        event_value: number;
        device_type: number;
        device_id: string;
        version: string;
        time: string;
        sign: string;
        params: string;
        /**ip */
        login_ip: string;
        /**国家 */
        country: string;
        /**国家代码 */
        country_zh: string;
        /**省份 */
        province: string;
        /**省份代码 */
        province_zh: string;
        /**城市 */
        city: string;
        /**城市代码 */
        city_zh: string;
    }
    export class LanguageCoreComp extends game.LanguageComp {
    }
    export class BannerInfo {
        isInFriendRoom: any;
        results: protoCommon.marqueePush[];
        private guideTime;
        private isFrist;
        static instance: BannerInfo;
        static getInstance(): BannerInfo;
        /**
         * 注册消息
         */
        registerMessage(): void;
        private rewardNoticeEvent;
        getTrialGuideInfo(form: number): game.CfgTrialGuide;
        sendTrialGuideNotice(): void;
        private getTrialGuideGameType;
        unRegisterMessage(): void;
        private inFriendRoom;
        /**
        * 服务器过来的 公告
        * @param message
        * @param type
        * @param data
        */
        private marqueePush;
        /**
         * 游戏奖励公告，分跑马灯、弹窗提示，内容自行转换
         * //slot内容
         * "swyd_slotled": "恭喜玩家s%在正式服获得s%倍奖励！",//跑马灯
            "swyd_tips1": "运气真好，赢的s%倍奖励！去正式游戏吧",//弹窗提示
            //捕鱼内容
            "swyd_hunterled": "恭喜玩家s%在正式服捕获海盗船，获得s%倍奖励！"
            "swyd_tips2": "运气真好，捕获s%获得s%倍奖励！去正式游戏吧",//弹窗提示
         * @param ent
         * @param form //触发形式 game.ConfigGroup.GUIDE_FORM_MARQUEE 跑马灯
         * @param values //数组类型，按顺序替换字符串中的"s%"
         * @param okCall //确认回调
         */
        gameRewardNotice(ent: string, form: number, values?: any[], okCall?: Function): void;
        /**
         * 前端配发跑马灯
         * @param msg 内容
         * @param startTime
         * @param endTime
         * @param intervalTime //间隔时间,使用于播放多次
         * @param limitTime //最大播放次数,小于等于0表示不限次数默认1次
         */
        sendMarqueePush(msg: string, startTime?: number, endTime?: number, intervalTime?: number, limitTime?: number): void;
    }
        export class BannerItem {
        /**
         * 跑马灯ID
         */
        id: number;
        /**
         * 类型, 平台: 1, 游戏: 2
         */
        type: BannerType;
        /**
         * 对应的游戏id
         */
        gameId: number;
        /**
         * 渠道id
         */
        channelId: number;
        /**
         * 优先级
         */
        priority: number;
        /**
         * 重复
         */
        repeat: number;
        /**
         * 展示内容
         */
        content: string;
        /**
         * 是否关闭(平台控制可能某一条需要马上关闭)
         */
        closeState: boolean;
        /**
         * 公告开始展示时间（在这个时间段才会展示）
         */
        startTime: number;
        /**
         * 公告结束展示时间（过了这个时间段会清除，一般是指活动公告）
         */
        endTime: number;
        /**
         * 间隔时间
         */
        intervalTime: number;
        /**
         * 最大播放次数
         */
        limitTime: number;
    }
        export class Banner extends game.View {
        rfNode: cc.Node;
        friendText: cc.RichText;
        maskNode: cc.Node;
        bgSk: sp.Skeleton;
        private defaultWidth;
        private widthOption1;
        private widthOption2;
        private isFriendCodeInCenter;
        private bannerItemList;
        private runtime;
        private pacetime;
        private isHide;
        private isruning;
        private isInFriendRoom;
        private isFristShow;
        private initParam;
        onLoad(): void;
        start(): void;
        layoutLandscape(): void;
        layoutPortrait(): void;
        /**
         * 初始化{}
         * @param param 参数
         */
        init(param: BannerParam): void;
        /**
         * 初始化数据
         */
        private initData;
        /**
         * 初始化ui
         */
        private initUI;
        /**
         * 注册消息
         */
        registerMessage(): void;
        unRegisterMessage(): void;
        onDestroy(): void;
        private inFriendRoom;
        /**
         * 修正位置
         */
        private fixedLabelsPosition;
        /**
         * 开始跑马灯
         */
        private startScroll;
        private runBanner;
        private getItem;
        /**
         * 重置跑马灯的位置到开始位置
         */
        private resetPos;
        /**
         * 滚动跑马灯
         */
        private scrollAni;
        /**
         * 滚动完成
         */
        private scrollComplete;
        /**
         * 服务器过来的 公告
         * @param message
         * @param type
         * @param data
         */
        private marqueePush;
        private handleMess;
        /**
         * 排序算法规则
         * @param a
         * @param b
         */
        private sortListener;
        private sortOut;
        private rule;
        private hideAni;
        private showAni;
        /**列表中是否有数据 */
        private hasPlayData;
        /** 推送需要关闭的消息 */
        private pushCloseItem;
        /**
         * 对于一些公告 ，循环插入
         */
        private loopInsert;
    }
    export class FriendRoom extends game.View {
        friendBoard: cc.Node;
        inputRoom: cc.Node;
        isChangeTip: boolean;
        isJoinTip: boolean;
        isCreateTip: boolean;
        roomId: number;
        onLoad(): void;
        init(): void;
        layout(): void;
        destory(): void;
        private registerEvent;
        private removeEvent;
        openBorad(mess: string, param: any): void;
        openInputRoom(): void;
        createRoom(): void;
        createTipClickOk(): void;
        private createRoomResp;
        enterRoom(roomid: number): void;
        private enterRoomResp;
        joinRoom(roomid: number): void;
        jionTipClickOk(): void;
        private joinRoomResp;
        leaveRoom(): void;
        private leaveRoomResp;
        changeRoom(): void;
        changeTipClickOk(): void;
        private changeRoomResp;
    }
    type ConditionFun = (...param: any[]) => boolean;
    export class RedPoint extends cc.Component {
        /**
         * 红点对象节点
         */
        redPoint: cc.Node;
        /**
         * 是否已经初始化
         */
        isinit: boolean;
        /**
         * 目标函数上下文对象
         */
        targetObj: any;
        /**
         * 条件函数,返回boolean
         * 返回true 红点展示，返回false 红点不展示
         */
        conditionFunc: ConditionFun;
        /**
         * 目标节点
         */
        targetNode: cc.Node;
        onLoad(): void;
        /**
         * 初始化红点脚本组件
         * @param targetNode 附着的目标节点
         * @param context 条件函数 上下文
         * @param conditionFunc 条件函数 , 返回true 红点展示，返回false 红点消失
         * @param offetPos   位置偏移，相对于传进来的父节点, 可选 默认是 cc.v2(0,0)
         * @param RefreshTime 刷新条件函数的时间 ，可选 默认是 0.5s
         */
        init(targetNode: cc.Node, context: any, conditionFun: ConditionFun, offetPos?: cc.Vec2, RefreshTime?: number): void;
        private show;
        private hide;
        private schedulefunc;
        onDestroy(): void;
    }
    export class RoleInfoManager {
        private static instance;
        selfHeadNode: cc.Node;
        constructor();
        /**
         * 获取实例
         */
        static getInstance(): RoleInfoManager;
        init(): void;
        destory(): void;
        private registerEvent;
        private removeEvent;
        private listenMessHandle;
        /**
         * 监听打开人物信息
         * @param eventName 消息名
         * @param data 个人信息 人物数据
         * @param param [1:自己，相对目标节点，相对于目标节点坐标设置]
         */
        private openRoleInfo;
        /**
         * 设置自己的人物头像
         * @param node 头像节点
         */
        setSelfHeadNode(node: cc.Node): void;
        /**
         * 获取人物头像
         */
        getSelfHeadNode(): cc.Node;
        private checkHasReward;
        private addRedPoint;
    }
    /**
     * 聚焦节点信息
     */
    export interface GuideNode {
        /** 聚焦的高亮节点 */
        node: cc.Node;
        /** 提示文字 */
        text?: string;
        /** 提示字体的位置 */
        textPos?: cc.Vec2;
    }
    /**
     * 传入新手引导参数对象
     */
    export interface GuideTarget {
        /** 点击的目标节点 */
        focusNode: GuideNode[];
        /** 目标上下文 */
        target: any;
        /** 目标回调函数（引导结束） */
        callback: Function;
    }
    export class Guide extends game.UIView {
        focusNode: GuideNode[];
        guideIndex: number;
        mask: cc.Mask;
        finger: cc.Node;
        textNode: cc.Node;
        /**
         * 回调函数和回调上下文
         */
        targetContext: any;
        finishCallback: Function;
        onLoad(): void;
        private registerEvent;
        private removeEvent;
        start(): void;
        onClose(): void;
        /** 初始化 */
        init(...args: any[]): void;
        resize(): void;
        /**
         * 聚焦引导节点
         * @param guidenode 引导节点
         */
        private focusToNode;
        /**
         * 下一个提示引导
         */
        private nextGuide;
        private createfinger;
        private createText;
    }
    export class GuideManager {
        private static instance;
        /** 登陆后的初始等级 用于判定是否第一次升级*/
        private initialLevel;
        constructor();
        /**
         * 获取实例
         */
        static getInstance(): GuideManager;
        private registerEvent;
        private removeEvent;
        init(): void;
        destory(): void;
        loginSuccessListen(mess: string, data: any): void;
        updateUserInfoPushListen(mess: string, data: protoCommon.updateUserInfoPush, err: any): void;
        exchangeGuidePushData: protoCommon.exchangeGuidePush;
        exchangeGuidePush(mess: string, data: protoCommon.exchangeGuidePush, err: any): void;
        showExchangeGuideDialog(msg: string, callback1: Function, callback2: Function): void;
        showRechargeGuideDialog(msg: string, tipsKey?: string, isShowDialog?: boolean, value?: number): void;
    }
    /**
     * 热门游戏
     */
    export class HotGame extends game.View {
        private listView;
        private btnContentNode;
        private touchNode;
        private hotGameBtn;
        private openState;
        private closeState;
        private layer;
        /**是否打开 */
        private isOpen;
        /**是否正在播放动画 */
        private _isPlaying;
        isPlaying: boolean;
        onLoad(): void;
        onDestroy(): void;
        layout(): void;
        layoutLandscape(): void;
        layoutPortrait(): void;
        enableWidget(isEnable: boolean): void;
        updateUIWidget(): void;
        /**
         * 初始化界面
         */
        initPanel(): void;
        initList(list: any[]): void;
        /**
         * 更新位置
         * @param verticalCenter 居中对齐方式百分比
         */
        updateWidget(verticalCenter: number): void;
        /**
         * 更新界面位置
         */
        private updatePanelWidget;
        /**
         * 显示界面
         * @param isShow 是否显示
         */
        showNode(isShow: boolean): void;
        hideCall: Function;
        /**
         * 按钮触摸事件
         */
        private onTouchNode;
        /**
         * 缩放节点
         */
        private scaleNode;
        /**
         * 打开热门游戏
         */
        private onBtnClick;
        /**
         * 显示热门游戏列表
         */
        private showList;
        /**
         * 设置【打开/关闭】按钮状态
         */
        private setHotGameBtnStatus;
        /**
         * 设置列表显示状态
         * @param isShow 是否显示
         * @returns
         */
        private setListStatus;
        /**
         * 未打开或未完成动画时禁用滚动
         */
        private setEnableScrollView;
        private lastVerticalCenter;
        /**
         * 重设按钮位置，以防在某些情况下出现按钮和面板分离的问题
         */
        private resetBtnWidget;
        private showBtn;
        /**
         * 适配刘海屏
         */
        private adaptBang;
    }
    /**
     * 热门游戏管理类
     *
     *
     * 支持修改皮肤:
     * game.EventManager.getInstance().raiseEvent(core.GameCoreConst.mess_setHotGameSkin,skinid);
     *
        skinid = 1|2|3;
     *
     * 支持自定义设置入口显示隐藏以及位置
     * game.EventManager.getInstance().raiseEvent(core.GameCoreConst.mess_showHotGameBtn,isShow,VerticalCenterNum);
     * @param isShow 是否显示
     * @param VerticalCenterNum 纵向居中对齐百分比
     */
    export class HotGameManager {
        private static _instance;
        static getInstance(): HotGameManager;
        /**资源预制 */
        private prefab;
        /**热门游戏节点 */
        private hotGame;
        /**是否显示开关 */
        private isShowBtn;
        /**按钮开关 */
        private btnSwitch;
        /**是否已初始化 */
        private isInited;
        /**预制路径 */
        private readonly prefabPath;
        /**当前对齐百分比 */
        private curVerticalCenter;
        /**初始化是节点层级zIndex */
        private lastIndex;
        /**当前目标父节点 */
        private curParentNode;
        /**当前皮肤id */
        private curSkinId;
        /**热门游戏列表 */
        private gameList;
        /**
         * 初始化
         */
        init(parentNode?: cc.Node, zIndex?: number): void;
        /**
         * 销毁
         */
        destroy(): void;
        /**
         * 事件注册
         */
        private addEventListener;
        /**
         * 事件注销
         */
        private removeEventListener;
        /**
         * 资源加载
         */
        private loadPrefab;
        /**
         * 显示热门游戏按钮
         * @param isShow
         */
        private showHotGameBtn;
        /**
         * 初始化界面
         */
        private initPanel;
        /**
         * 请求热门游戏开关信息
         */
        private requestSwitch;
        /**
         * 热门游戏配置信息
         */
        private decodeData;
        /**
         * 设置皮肤
         * @param evnet
         * @param skinId
         */
        private setSkinId;
        /**
         * 皮肤
         */
        private readonly skin;
    }
    export class CoreProto {
        bundle: string;
        protoHelper: game.ProtocolHelper;
        private netNode;
        jpInfos: protoReport.jpInfoType[];
        private static _instance;
        static getInstance(): CoreProto;
        constructor();
        registerMess(): void;
        destroyMess(): void;
        setReceiveCallBack(): void;
        init(call?: Function): void;
        destroy(): void;
        /**
         * 网络断开 需要重置一些数据
         */
        private netOnClose;
        private netRequest;
        private worldMissionInfoResp;
        private worldMissionStartPush;
        private worldMissionUpdatePush;
        private worldMissionRewardPush;
        private worldMissionDonePush;
        private worldMissionStopPush;
        /**
         * 请求世界boss任务信息
         * @param gameId
         */
        worldMissionInfoReq(gameId: number): void;
        jackpotInfoReq(gameid: number): void;
        private jackpotInfoResp;
        private jackpotRewardPush;
        jackpotDetail(msg: any, err?: any): any;
        normalSpinDetail(msg: any, err?: any): any;
        slot_commonGameDetail(msg: any, err?: any): any;
        littleGameDetail(msg: any, err?: any): any;
        freeSpinDetail(msg: any, err?: any): any;
        buyFreeGameDetail(msg: any, err?: any): any;
        worldMissionGameDetail(msg: any, err?: any): any;
        hunter_normalDetail(msg: any, err?: any): any;
        arcade_playerDetail(msg: any, err?: any): any;
        arcade_commonDetail(msg: any, err?: any): any;
        arcade_qzCommonDetail(msg: any, err?: any): any;
        arcade_trucoCommonDetail(msg: any, err?: any): any;
        arcade_qzPlayerDetail(msg: any, err?: any): any;
        arcade_trucoPlayerDetail(msg: any, err?: any): any;
        private errorCodePush;
    }
    /**
     * 在一定时间内跳到最终值
     * 跳动设计 每次都是取差值的一般进行跳动，如果得到的jp比当前值还要小，那么就以最终值的90%
     */
    export class JpItem extends cc.Component {
        /**本地的JP 标示，有客户端初始化传过来的 */
        localId: string;
        /**
         * jp 奖池信息
         */
        jpinfo: protoReport.jpInfoType;
        private targetValue;
        private currtValue;
        private stepValue;
        private startPrecent;
        private needTime;
        private downrate;
        private intervalId;
        private coinrate;
        onLoad(): void;
        start(): void;
        onDestroy(): void;
        init(jpinfo: protoReport.jpInfoType): void;
        updateData(): void;
        private setCurJpValue;
        private countStepValue;
        private changeStep;
        private updateLabel;
    }
        export class JpManager {
        jpInfoArr: protoReport.jpInfoType[];
        jpItems: JpItem[];
        jpReqTime: number;
        timeoutId: number;
        private static _instance;
        static getInstance(): JpManager;
        constructor();
        /**
         * jpmanager初始化
         */
        init(): void;
        /**
         * 销毁这个jpmanager 的时候数据数据
         */
        destory(): void;
        private registerEvent;
        private removeEvent;
        /**
         *  请求JP奖池值
         */
        getJpReq(): void;
        stopJpReq(): void;
        /**
         * 请求jp奖池回复
         * @param mess 消息名
         * @param result 结果
         * @param param 附加参数
         */
        private jpResp;
        /**
         * 推送 jp 中奖信息
         * @param mess 消息名
         * @param result 结果
         * @param param 附加参数
         */
        private jpRwardResp;
        /**
         * 设置初始化 jpitem 值，更新展示
         */
        private setJpItemValue;
        /**
         * 设置一个jp 展示的label
         * @param localId jpid  子项目对应的 01字符串 ，02 ，03， 04 。。。发过来
         * @param item label 节点，需要在这个label上跳动
         */
        setJpItem(localId: string, item: cc.Node): void;
        /**
         * 单独设置单个奖池的 JP奖池奖励
         * @param id jpid
         * @param value jp奖赏
         */
        private setJpInfoById;
        /**
         * 获取 该 id 的jp信息
         * @param jpid jp id
         *
         */
        getJpInfo(jpid: number): protoReport.jpInfoType;
        /**
         * 获取 该 id 的jp信息
         * @param localid 00 01 02 03 04
         */
        getJpInfoByLocalId(localid: string): protoReport.jpInfoType;
        /**
         *根据local id值获取的 label 节点
         * @param localId 是初始化 01 02 03 04
         */
        getJpItemByLocalId(localId: string): JpItem[];
        /**
         * 根据真实的 jpid 来获取 label 节点
         * @param jpid  jpinfo 服务器传过来的id
         */
        getJpItemByJpId(jpid: number): JpItem[];
        /**
         * 将本地初始化的 id 来获取 jp 的服务器id
         * @param id 子项目传过来的是末尾2位 01，02，03 ，04 获取 真正的id
         */
        transformJpId(id: string): number;
        /**
         * 服务器的jp ID 转化成本地 id  ，01 02 03
         * @param jpid 服务器传过来的真实jp id
         */
        transformLocalId(jpid: number): string;
        /**
         * 获取所有的item label 节点
         */
        getAllJpItem(): JpItem[];
    }
    export class Loading extends game.View {
        private static _instance;
        private percent;
        private waiteNode;
        private percentLabel;
        private waitePrefab;
        private logoNode;
        private mask;
        static getInstance(): Loading;
        constructor();
        layout(): void;
        /**
         * Loading初始化
         */
        init(): void;
        /**
         * 销毁这个Loading
         */
        destory(): void;
        private registerEvent;
        private removeEvent;
        private show;
        private hide;
        /**
         * 等待百分比展示
         * @param precent 0--100
         */
        loadPercent(percent: number): void;
    }
            export class GameCore {
        friendRoom: FriendRoom;
        roleinfoMgr: RoleInfoManager;
        init(resolve: any, reject: any): void;
        destory(): void;
        private registerEvent;
        private removeEvent;
        /**
         * 创建跑马灯
         * @param mess 消息
         * @param data bannerparam
         * @param param 附加参数
         */
        private createBanner;
        private initLanguage;
        private EnterGame;
        private enterRoom;
        private leaveRoom;
    }
        /**
     * 红包空投
     */
    export class ActHBKTPanel extends ActBase {
    }
        /**
     * 锦标赛
     */
    export class ActJBSPanel extends ActBase {
    }
        /**
     * 红包日日领
     */
    export class HBRRLContentNode extends ActBase {
        scoreLabel: cc.Label;
        addEventListener(): void;
        removeEventListener(): void;
        activeOperateResp(event: string, data: protoCommon.activeOperateResp): void;
        activeBaseResp(event: string, type: protoCommon.active_type, data?: protoCommon.activeBaseResp): void;
    }
        export class JFRank extends ActRankBase {
        rankIconSp: cc.SpriteFrame[];
        rankIcon: cc.Sprite;
        weishangbangNode: cc.Node;
        firstInit(): void;
        protected activeRankResp(event: string, data: protoCommon.activeRankResp): void;
        /**
         * 初始化我的排行
         */
        private initMyRank;
    }
                export class ActScorePanel extends ActBase {
        scoreLabel: cc.Label;
        weishangbangLabel: cc.Node;
        myRankLabel: cc.Label;
        exchangeList: ActListBase;
        /**当前活动积分 */
        private curScore;
        private list;
        protected onLoad(): void;
        /**
         * 初始化排行榜
         */
        initRank(): void;
        /**注册监听 */
        addEventListener(): void;
        /**移除监听 */
        removeEventListener(): void;
        /**操作返回 */
        activeOperateResp(event: string, data: protoCommon.activeOperateResp): void;
        /**
         * 活动兑换返回
         */
        private activeExchangeResp;
        /**
         * 对列表进行排序
         * 可兑换物品＞不可兑换物品，相同类型下积分兑换消耗从低到高排列
         */
        private sortList;
        /**
         * 判断是否可兑换
         */
        private isCanExchange;
        /**初始化界面 */
        initPanel(data: IActivityConfigInfo, typeList: EnumActFunType[]): void;
        /**活动基础信息返回 */
        activeBaseResp(event: string, type: protoCommon.active_type, data?: protoCommon.activeBaseResp): void;
        /**更新我的排行 */
        private updateRankInfo;
    }
            /**
     * 天梯榜单
     */
    export class ActTTBDPanel extends ActBase {
        rankTitleList: cc.Node;
        onFunBtnClick(type: EnumActFunType): void;
    }
    export class Coin extends cc.Component {
        initial_velocity: cc.Vec2;
        acceleration: cc.Vec2;
        _initial_position: cc.Vec2;
        onLoad(): void;
        private _emiting;
        emitCoin(): void;
        resetCoin(): void;
        private _time;
        update(dt: any): void;
    }
    export class ActivityTargetItem extends game.ListViewItem {
        gameIconNode: cc.Node;
        /**
         * 游戏id
         */
        private gameId;
        onLoad(): void;
        /**
         * 注册事件监听
         */
        private addEventListener;
        /**
         * 移除事件监听
         */
        private removeEventListener;
        onDestroy(): void;
        /**
         * 触摸事件
         */
        private touchEvent;
        /**
         * 初始化
         */
        updateItem(index: number, data: number): void;
        /**
         * 跳转到游戏
         */
        private jumpToGame;
    }
    export class Congratulation extends game.UIView {
        layout: cc.Layout;
        rewardPrefab: cc.Prefab;
        onLoad(): void;
        addEventListener(): void;
        removeEventListener(): void;
        onDestroy(): void;
        onOpen(fromUi: number, data: any[]): void;
        private onOkBtnClick;
        onResize(): void;
    }
        /**
     * 活动内容-红包空投
     */
    export class HBKTActContent extends ActContentBase {
    }
            /**
     * 活动内容-红包日日领
     */
    export class HBRRLActContent extends ActContentBase {
        exchangeList: ActListBase;
        /**初始化红包日日领兑换列表 */
        activeContentUpdate(event: string, type: protoCommon.active_type): void;
    }
        /**
     * 活动内容-欢庆元旦
     */
    export class HQYDActContent extends ActContentBase {
    }
        /**
     * 活动内容-锦标赛
     */
    export class JBSActContent extends ActContentBase {
    }
        /**
     * 活动内容-天梯榜单
     */
    export class TTBDActContent extends ActContentBase {
    }
    export class CountryBox extends cc.Component {
        curItem: cc.Node;
        upBtn: cc.Node;
        downBtn: cc.Node;
        box: cc.Node;
        private cuntrys;
        start(): void;
        onEnable(): void;
        onDisable(): void;
        private onUp;
        private onDown;
        private resItemEvent;
        private unItemEvent;
        private onItem;
    }
    /**
     * 兑换确认弹窗
     */
    export class ExchangePopup extends game.UIView {
        icon: cc.Sprite;
        rewardNum: cc.Label;
        costLabel: cc.Label;
        layoutNode: cc.Node;
        okCallBack: Function;
        onLoad(): void;
        addEventListener(): void;
        removeEventListener(): void;
        onDestroy(): void;
        onOpen(fromUi: number, data: any[]): void;
        private onOkBtnClick;
        private onCloseBtnClick;
        onResize(): void;
    }
    /**
     * 红包空投领奖界面
     */
    export class HBKTReward extends game.View {
        multiLabel: cc.Label;
        rewardLabel: cc.Label;
        protected onLoad(): void;
        onDestroy(): void;
        isCanTouch: boolean;
        onOpen(fromUI: number, data: protoCommon.activeKongTouRewardPush): void;
        onCloseBtnClick(): void;
        hidePanel(): void;
        onClose(): void;
    }
        export class ExchangeItem extends ActRantItemBase {
        prizeIcon: cc.Node;
        prizeDescLabel: cc.Label;
        canExchangeTimesLabel: cc.Label;
        totalExchangeTimesLabel: cc.Label;
        exchangeBtn: cc.Button;
        normalState: cc.Node;
        disableState: cc.Node;
        costNumLabels: cc.Label[];
        selloutLabel: cc.Label;
        private curData;
        /**当前活动积分 */
        private curScore;
        protected onLoad(): void;
        protected onDestroy(): void;
        /**更新当前兑换item按钮状态 */
        private updataCurScore;
        /**
         * 更新兑换列表
         * @param event
         * @param data
         */
        private updateList;
        /**
         * 更新item
         */
        updateItem(index?: number, data?: protoCommon.act_exchange_base_type, curScore?: any): void;
        /**实例化item */
        private initItem;
        /**
         * 兑换按钮
         */
        private onExchangeBtnClick;
    }
        /**
     * 红包日日领
     */
    export class HBRRLItem extends ActRantItemBase {
        costLabel: cc.Label;
        rewardLabel: cc.Label;
        leftTimesLabel: cc.Label;
        timesLabel: cc.Label;
        enabledNode: cc.Node;
        disabledNode: cc.Node;
        /**当前item数据 */
        private curData;
        protected onLoad(): void;
        protected onDestroy(): void;
        /**更新item */
        updateItem(index: number, data: protoCommon.act_hongbaoririling_base_type, params?: any): void;
        /**更新当前兑换item按钮状态 */
        private updataCurScore;
        /**更新列表信息 */
        private updateList;
        /**实例化item */
        private initItem;
        /**
         * 兑换按钮
         */
        private onExchangeBtnClick;
    }
        /**
     * 背景
     */
    class ItemBgs {
        defaultBg: cc.SpriteFrame[];
        firstBg: cc.SpriteFrame[];
        secondBg: cc.SpriteFrame[];
        thirdBg: cc.SpriteFrame[];
    }
    /**
     * 排名图标
     */
    class ItemIcons {
        firstIcon: cc.SpriteFrame;
        secondIcon: cc.SpriteFrame;
        thirdIcon: cc.SpriteFrame;
    }
    /**
     * 锦标赛排行item
     */
    export class JBSRankItem extends ActRantItemBase {
        rankLabel: cc.Label;
        playerIdLabel: cc.Label;
        scoreLabel: cc.Label;
        rewardLabel: cc.Label;
        bg: cc.Sprite;
        rankIcon: cc.Sprite;
        itemBg: ItemBgs;
        itemIcon: ItemIcons;
        updateItem(index: number, data: protoCommon.active_rank_rewards): void;
    }
    export class OptimizeDrawCallOptions {
        /**
         * 待优化节点的路径，层级使用斜线分隔
         * 例如：nodeNameA/nodeNameB/nodeNameC
         */
        pathToNode: string[];
        /**
         * 记录上次的数组长度
         */
        oldLength: number;
        /**
         * 分层节点的zIndex
         */
        containerZIndex: number;
    }
    export class OptimizeDrawCall extends cc.Component {
        enabledOptimize: boolean;
        _options: OptimizeDrawCallOptions[];
        options: OptimizeDrawCallOptions[];
        start(): void;
        _setNodeRender(): void;
    }
        /**
     * 天梯榜单排行item
     */
    export class TTBDRankItem extends ActRantItemBase {
        private rankLabel;
        private playerIdLabel;
        private scoreLabel;
        private rewardLabel;
        private bg;
        private bgs;
        private _reName;
        reName: boolean;
        updateItem(index: number, data: protoCommon.active_rank_rewards, params?: any): void;
    }
        /**
     * 转盘抽奖类，可实现不同数量等分区域中奖模拟旋转
     *
     * @export
     * @class Lottery
     * @extends {cc.Component}
     */
    export class Lottery extends ActLotteryBase {
        onLoad(): void;
        onDestroy(): void;
        start(): void;
        layout(): void;
        /**
         * 缩放节点
         */
        private scaleNode;
    }
    /**
     * 嵌套滚动列表内层列表
     *
     * @export
     * @class NestableScrollViewInner
     * @extends {cc.ScrollView}
     */
    export class NestableScrollViewInner extends cc.ScrollView {
        private m_OuterScrollView;
        setOuterScrollView(outer: any): void;
        _onTouchMoved(event: any, captureListeners: any): void;
    }
        /**
     * 嵌套滚动列表外层列表
     *
     * @export
     * @class NestableScrollViewOuter
     * @extends {cc.ScrollView}
     */
    export class NestableScrollViewOuter extends cc.ScrollView {
        m_InnerScrollViews: NestableScrollViewInner[];
        m_PlanDir: number;
        m_ScrollingInnerSv: any;
        onLoad(): void;
        _isHisChild(child: any, undeterminedParent: any): any;
        _findScrollingInnerSv(target: any): NestableScrollViewInner;
        isDifferentBetweenSettingAndPlan(sv: any): boolean;
        hasNestedViewGroup(event: any, captureListeners: any): boolean;
        _onTouchBegan(event: any, captureListeners: any): void;
        _onTouchMoved(event: any, captureListeners: any): void;
    }
        /**
     * 排行榜-锦标赛
     */
    export class JBSRank extends ActRankBase {
    }
        /**
     * 排行榜-天梯榜单
     */
    export class TTBDRank extends ActRankBase {
    }
        /**
     * 排行榜item
     *
     * @export
     * @class RankItem
     * @extends {game.ListViewItem}
     */
    export class RankItem extends ActRantItemBase {
        rankIconSp: cc.SpriteFrame[];
        rankIcon: cc.Sprite;
        myRankLabel: cc.Label;
        myIdLabel: cc.Label;
        myScoreLabel: cc.Label;
        myPrizeLabel: cc.Label;
        bgSps: cc.SpriteFrame[];
        bg: cc.Sprite;
        curData: protoCommon.active_rank_rewards;
        updateItem(index: number, data: protoCommon.active_rank_rewards): void;
        updateList(): void;
    }
    export class RankReward extends game.UIView {
        rankLabel: cc.Label;
        rankIconSp: cc.SpriteFrame[];
        rewardLabel: cc.Label;
        rankIcon: cc.Sprite;
        panelNode: cc.Node;
        aniNode: cc.Node;
        prefab_coin: cc.Prefab;
        node_coin_layer: cc.Node;
        onLoad(): void;
        addEventListener(): void;
        removeEventListener(): void;
        onDestroy(): void;
        closeTween: cc.Tween;
        coinNum: number;
        onOpen(fromUi: number, data: protoCommon.activeRankRewardsPush): void;
        private onOkBtnClick;
        showAni(): void;
        onResize(): void;
        private isPlaying;
        private onTouchStart;
        update(): void;
        onClose(): void;
        private _coinZIndex;
        private emitCoin;
    }
    export class RedPacketFly extends game.View {
        closeUI: cc.Node;
        openUI: cc.Node;
        openBtn: cc.Node;
        acceptBtn: cc.Button;
        coinLab: cc.Label;
        multipleLab: cc.Label;
        private coinPoint;
        private multiplePoint;
        private coinVal;
        private multipleVal;
        private _winMoney;
        start(): void;
        onOpen(fromUI: number, rewardNum: number): void;
        winMoney: number;
        openRedPacket(): void;
    }
    /**
     * 嵌套滚动列表解决方案
     */
    export class ViewGroupNesting extends cc.Component {
        private events;
        onLoad(): void;
        private onTouchHandle;
        update(): void;
    }
    export enum COPY_TYPE_ARCADE {
        CIPHERTEXT = 0
    }
    export class BinanceHashCheckCenterArcade extends game.View {
        roundId: cc.Label;
        timeText: cc.Label;
        BSC_Box: cc.Node;
        binanceBlock: cc.Label;
        copyCiphertext: cc.Label;
        copyCiphertextBtn: cc.Node;
        rollerBox: cc.Node;
        paiXingBox_baiJiaLe: cc.Prefab;
        closeBtn: cc.Node;
        rollerIconItem: cc.Prefab;
        onOpen(): void;
        layout(): void;
        upShow(): void;
        onClose(): void;
        private openHelpView;
        private openWindow;
        private copyText;
        private upIconShow;
    }
    export class BinanceHashHelpKJArcade extends game.View {
        leftBtn: cc.Node;
        rightBtn: cc.Node;
        checkBtn: cc.Node;
        ruleSpr: cc.Sprite;
        private pageIndex;
        private minIndex;
        private maxIndex;
        /** 哈希模式 */
        private gameMode;
        onLoad(): void;
        onDestroy(): void;
        private addEvent;
        private removeEvent;
        private onCheckBtn;
        setGameMode(data: any): void;
        private onLeftBtn;
        private onRightBtn;
        private setBtnClick;
        private btnList;
        setPageShow(index?: number): void;
    }
    export class BinanceHashHelpWFArcade extends game.View {
        ruleSpr: cc.Sprite;
        setPageShow(): void;
    }
    export enum BANANCEHASHHELPTYPE {
        RULE = 0,
        ROLLER = 1
    }
    export class BinanceHashHelpArcade extends game.View {
        closeBtn: cc.Node;
        toggleContainer: cc.Node;
        ruleView: cc.Node;
        rollerView: cc.Node;
        content: cc.Node;
        onLoad(): void;
        start(): void;
        onOpen(eny: any, data: any): void;
        private addEvent;
        layout(): void;
        private onCloseBtn;
        private onToggleEvent;
        private setViewActive;
    }
    export class BinanceHash_300013 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300023 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300033 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300043 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300053 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300063 extends cc.Component {
        title: cc.Label;
        result: cc.Sprite;
        index: cc.Label;
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300073 extends cc.Component {
        label1: cc.Label;
        label2: cc.Label;
        label3: cc.Label;
        sprite1: cc.Sprite;
        sprite2: cc.Sprite;
        sprite3: cc.Sprite;
        game_id: string;
        _defaultBundleName: string;
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300083 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300093 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300093 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300113 extends cc.Component {
        init(): void;
        private setItemIcon;
    }
    export class BinanceHash_300123 extends cc.Component {
        nodeCock: cc.Node;
        nodeDragonTiger: cc.Node;
        labelResult: cc.Label;
        labelLong: cc.Label;
        labelHu: cc.Label;
        spriteLong: cc.Sprite;
        spriteHu: cc.Sprite;
        spriteRed: cc.Sprite;
        labelRed: cc.Label;
        spriteBlue: cc.Sprite;
        labelBlue: cc.Label;
        labelCenter: cc.Label;
        game_id: string;
        _defaultBundleName: string;
        protected onLoad(): void;
        init(): void;
        /**币安哈希斗鸡 */
        initGamecockResult(cardInfo: any[]): void;
        /**币安哈希龙虎斗 */
        initDragonTigerResult(cardInfo: any[]): void;
        setCock(resKeeper: game.ResKeeper, sprite: cc.Sprite, point: number): void;
        private setItemIcon;
    }
    /** 是否可验证 */
    export enum OnOffVerify {
        /**可验证 */
        Verify = 0,
        /**不可验证 */
        notVerify = 1
    }
    /** 验证状态 */
    export enum VerifyState {
        /**未验证 */
        noneVerify = 10,
        /**已验证 */
        alreadyVerify = 11
    }
    /** 验证结果类型 */
    export enum VerifyResultType {
        /**成功 */
        succeed = 0,
        /**失败 */
        failure = 1
    }
    export enum COPY_TYPE {
        mingWenText = 0,
        miWenText = 1,
        copyMiWenText = 2
    }
    export class CardVerifyCenter extends game.View {
        mingWenText: cc.Label;
        miWenText: cc.Label;
        miWenTextCopy: cc.Label;
        cardItem_mix: cc.Node;
        cardItem_max: cc.Node;
        huanPaiLabel: cc.Node;
        shoudongChayanLabel: cc.Node;
        mingWenBox: cc.Node;
        miWentextBox: cc.Node;
        copyMiWentextBox: cc.Node;
        verifyShowType: cc.Node[];
        chongzhiBtn: cc.Node;
        yanzhengBtn: cc.Node;
        cardData: protoReport.hash_card_num_type;
        private gameId;
        /** 是否可验证 */
        private onOffVerify;
        /** 验证状态 */
        private verifyState;
        /** 验证结果 */
        private verifyResultType;
        copyMiWentextString_1: string;
        onLoad(): void;
        onDestroy(): void;
        onOpen(fromUI: number, data: protoReport.hash_card_num_type): void;
        /**初始化 */
        protected upShow(data: protoReport.hash_card_num_type): void;
        /** 图片赋值 */
        private upShowCardIcon;
        /**loadRemote */
        private setItemIcon;
        /** 明文 */
        private setmingWenText;
        /** 密文 */
        private setMiWentextText;
        /** 可验证  与  不可验证 */
        private setOnOffVerify;
        /** 未验证  与  已验证  */
        private setVerifyState;
        /** 验证 成功 与 失败 */
        private setVerifyResultType;
        /** 验证按钮显示状态 */
        private setyanzhengType;
        /** 重置按钮显示状态 */
        private setchongzhiTyoe;
        /** 明文按钮显示状态 */
        private setmingWenBtnType;
        /** copy密文按钮显示状态 */
        private setcopyMiWenBtnType;
        /** copy 密文text */
        private setCopyMiWenText;
        /** 验证成功与失败显示*/
        private setVerifyShowType;
        /**小牌，换张牌试试 按钮*/
        private cardItemMixButton;
        /** 点击小牌 换牌完成回应 */
        private cardMixClickBack;
        /**大牌，手动查验 按钮 */
        private cardItemMaxButton;
        /** 查看完整牌堆 */
        paiduiButton(): void;
        /** 哈希开奖说明 */
        private helpButton;
        /** 复制 */
        private copyText;
        /** 验证button */
        private yanzhengButton;
        /** 重置Button */
        private chongzhiButton;
        onClose(): void;
    }
    export class HashCardItem extends game.ListViewItem {
        card: cc.Sprite;
        jiaobiao: cc.Label;
        cardItemData: protoReport.hash_card_num_type;
        index: number;
        path: string;
        updateItem(index: number, data: protoReport.hash_card_num_type): void;
        private setItemIcon;
        private cardButton;
    }
    export class HashSelectCardItem extends game.ListViewItem {
        card: cc.Sprite;
        jiaobiao: cc.Label;
        cardItemData: protoReport.hash_card_num_type;
        onLoad(): void;
        onDestroy(): void;
        updateItem(index: number, data: protoReport.hash_card_num_type): void;
        private setItemIcon;
        onClick(): void;
    }
    export class HashSelectCardView extends game.ListView {
        content: cc.Node;
        selectcardItemFrame: cc.Prefab;
        private listItem;
        private frameNode;
        /** 排序 */
        selectionSort(array: protoReport.hash_card_num_type[]): protoReport.hash_card_num_type[];
        onLoad(): void;
        onDestroy(): void;
        private addEvent;
        private removeEvent;
        init(args: game.IListViewArgs): void;
        /**
         * 列表数据更新后刷新列表显示
         */
        updateList(): void;
        /**
         * 更新列表宽高
         */
        private updateContentWH;
        currentCard(data: protoReport.hash_card_num_type): void;
        /**
         * @param card 更新的卡牌
         * @param frameNode 卡牌的框节点
         */
        private updataFrameView;
        private cardClick;
        private closeView;
    }
    export class HashSelectCard extends game.View {
        private openArgs;
        hashData: protoReport.hash_type;
        onOpen(fromUI: number, args: protoReport.hash_card_num_type): void;
        upShow(): void;
        private upIconShow;
    }
    /*****
     * 哈希验证说明
     * 用法：
     * 打开界面调用init(pageNum);
     * 公共位置：'https://cdn-api-game.ydev.app/game_core/commonRes/arcade/3000711/zh/'
     * 图片名称：sm1.png, sm2.png, sm3.png ...
     */
    export class HashVerificationInstructions extends game.View {
        leftBtn: cc.Node;
        rightBtn: cc.Node;
        checkBtn: cc.Node;
        ruleSpr: cc.Sprite;
        private pageId;
        private pageNum;
        onLoad(): void;
        layout(): void;
        init(pageNum?: number): void;
        private onCloseBtn;
        private btnPrePage;
        private btnNextPage;
        /**to check */
        private onCheckBtn;
        private renderBtns;
        private setPageShow;
    }
    export class HashVerifyCenter extends game.View {
        roundId: cc.Label;
        content1: cc.Node;
        content2: cc.Node;
        hashData: protoReport.hash_type;
        onOpen(): void;
        upShow(): void;
        private upIconShow_1;
        private upIconShow_2;
    }
    export class HashVerifyCenter_1 extends game.ListView {
        /** 排序 */
        private selectionSort;
        init(args: game.IListViewArgs): void;
        /**
         * 列表数据更新后刷新列表显示
         */
        updateList(): void;
        /**
         * 更新列表宽高
         */
        private updateContentWH;
    }
    export class HashWholeCardStackView extends game.ListView {
        init(args: game.IListViewArgs): void;
        /**
         * 列表数据更新后刷新列表显示
         */
        updateList(): void;
        /**
         * 更新列表宽高
         */
        private updateContentWH;
    }
    export class HashWholeCardStack extends game.View {
        spriteTitle: cc.Sprite;
        spriteTips: cc.Sprite;
        onLoad(): void;
        onDestroy(): void;
        getRoomInfoResp(evt: string, data: any): void;
        RoomStagePush(evt: string, data: any): void;
        layout(): void;
        init(data: {
            frameTips: cc.SpriteFrame;
            frameTitle: cc.SpriteFrame;
            hash_info: protoReport.hash_type;
        }): void;
        /**
         *
         * @param evt
         * @param data {hash_info:{cut_index:number, hash_card_num: protoReport.hash_card_num_type[]}}
         * @returns
         */
        updateWholdCardStack(evt: string, hash_info: protoReport.hash_type): void;
        initCards(datas?: protoReport.hash_card_num_type[]): void;
        private onCloseBtn;
    }
    export class HashVerifyCenter_2_300012 extends cc.Component {
        paizhuo: cc.Node;
        init(): void;
    }
    export class HashRollerIdItemSlot extends cc.Component {
        label: cc.Label;
        private index;
        private data;
        onLoad(): void;
        onDestroy(): void;
        initShow(index: number, data: any): void;
        private addEvnet;
        private removeEvent;
        private onClick;
    }
    export class HashRollerIdListSlot extends cc.Component {
        curRollerText: cc.Label;
        listBtn: cc.Node;
        list: cc.Node;
        item: cc.Prefab;
        private isShow;
        private curIndex;
        onLoad(): void;
        onDestroy(): void;
        initList(curIndex: number, datas: any[]): void;
        private addEvent;
        private removeEvent;
        private onList;
        upShowText(data: any): void;
        private upShow;
    }
    export const spin_type_enum: string[];
    export class HashHelpRollerSlot extends cc.Component {
        content: cc.Node;
        rollerTexts: cc.Node;
        rollerList: cc.Node;
        rollerIdList: cc.Node;
        scrollView: cc.ScrollView;
        rollerItem: cc.Prefab;
        private number;
        private rollerId;
        private rollerData;
        private gameData;
        private rollerMaxRow;
        private gameId;
        private rollerModeId;
        private curRollerIndex;
        onLoad(): void;
        onDestroy(): void;
        setScrollToPercent(data: any): void;
        private addEvent;
        private removeEvent;
        private setScrollToPercentVertical;
        private loadJson;
        private upRollerShow;
        private initToggleContainer;
        /**
         * 更新滚轴列表
         * @param rollerId 使用的滚轴id
         * @param gameId 使用的滚轴游戏id
         */
        private upRoller;
    }
        export class HashIconSlot extends cc.Component {
        number: cc.Label;
        bg: cc.Node;
        icon: cc.Node;
        private data;
        onLoad(): void;
        onDestroy(): void;
        private onClickIcon;
        upIconShow(data: IHashGridParam): void;
        private setSize;
    }
    /**
     * 哈希结果格子结构体参数
     * @param gridId 图片id
     * @param number 编号
     * @param size 图片大小
     * @param offset 偏移量
     */
    export interface IHashGridParam {
        gridId: number;
        number: number;
        size?: number;
        offset?: number;
    }
    export enum COPY_TYPE {
        PLAINTEXT = 0,
        CIPHERTEXT = 1,
        CHECK_CIPHERTEXT = 2
    }
    export enum game_mode_type_enum {
        normal = 1,
        direct_hash = 2,
        timestamp_hash = 3
    }
    export class HashCheckCenterSlot extends game.View {
        roundId: cc.Label;
        plaintextEditBox: cc.EditBox;
        plaintext: cc.Label;
        ciphertext: cc.Label;
        copyCiphertext: cc.Label;
        plaintextDes: cc.Label;
        ciphertextDes: cc.Label;
        copyCiphertextDes: cc.Label;
        plaintextBtn: cc.Label;
        ciphertextBtn: cc.Node;
        copyCiphertextBtn: cc.Node;
        checkBtn: cc.Node;
        rollerBox: cc.Node;
        closeBtn: cc.Node;
        plaintextBox: cc.Node;
        ciphertextBox: cc.Node;
        copyCiphertextBox: cc.Node;
        vsBox: cc.Node;
        checkResultsSuccess: cc.Node;
        checkResultsFail: cc.Node;
        timestampBox: cc.Node;
        rollerId: cc.Label;
        rollerIconItem: cc.Prefab;
        root: cc.Node;
        private gameId;
        onOpen(): void;
        layout(): void;
        upShow(): void;
        private initShow;
        onClose(): void;
        onCheck(): void;
        private getTimestamphashToResult;
        private setTextColor;
        private initTextColor;
        private setBgBoxShow;
        private openHelpView;
        private openManualView;
        private copyText;
        private setRollerText;
        private upIconShow;
    }
    export enum TIPS_TYPE {
        OPEN_REWARD = 1,
        CIPHERTEXT = 2,
        CHECH_CIPHERTEXT = 3
    }
    export class HashCaption extends cc.Component {
        text: cc.Label;
        textBox: cc.Node;
        maskBox: cc.Node;
        private isClick;
        upTextShow(text: string): void;
        onLoad(): void;
        onDestroy(): void;
        private addEvent;
        private romveEvent;
        private onCanvasClick;
        onClick(ent: any, type: string): void;
    }
    export class HashCheckCaptionSlot extends cc.Component {
        timestampHash: cc.Node;
        directHash: cc.Node;
        plaintextT: cc.Label;
        plaintextD: cc.Label;
        ciphertextT: cc.Label;
        ciphertextD: cc.Label;
        private plaintext;
        private ciphertext;
        upShow(data: any): void;
        private openWindow;
        private copyBtn;
    }
    export class HashHelpRuleSlot extends cc.Component {
        leftBtn: cc.Node;
        rightBtn: cc.Node;
        checkBtn: cc.Node;
        ruleSpr: cc.Sprite;
        gameBtn: cc.Node;
        private pageIndex;
        private minIndex;
        private maxIndex;
        private gameMode;
        private isFristOpen;
        onLoad(): void;
        onDestroy(): void;
        private addEvent;
        private removeEvent;
        private onCheckBtn;
        private onGameBtn;
        setGameMode(data: any): void;
        private onLeftBtn;
        private onRightBtn;
        private setBtnClick;
        private setPageShow;
    }
    export class HashRuleCodeSlot extends cc.Component {
        code_direct: cc.Node;
        code_timestamp: cc.Node;
        upShow(data: any): void;
    }
    export enum HASHHELPTYPE {
        RULE = 0,
        ROLLER = 1,
        CODE = 2,
        CAPTION = 3
    }
    export class HashHelpSlot extends game.View {
        closeBtn: cc.Node;
        toggleContainer: cc.Node;
        ruleView: cc.Node;
        title_t: cc.Node;
        title_d: cc.Node;
        rollerView: cc.Node;
        codeView: cc.Node;
        captionView: cc.Node;
        root: cc.Node;
        onLoad(): void;
        start(): void;
        onOpen(eny: any, data: any): void;
        private addEvent;
        layout(): void;
        private onCloseBtn;
        private onToggleEvent;
        private setViewActive;
    }
    export class HashManualCheckSlot extends game.View {
        topPlaintext: cc.Label;
        plaintext: cc.Label;
        ciphertext: cc.Label;
        direct: cc.Node;
        timestamp: cc.Node;
        topPlaintextDes: cc.Node;
        root: cc.Node;
        onOpen(ent: any, data: any): void;
        layout(): void;
        private closeBtn;
        private openWindow;
        private copyBtn;
        private openHelpView;
    }
    export class HashRollerItemSlot extends game.ListViewItem {
        pos: cc.Label;
        list: cc.Node;
        updateItem(index: number, data: any): void;
    }
    /**
     * 闹钟传参类型参数
     */
    export class ClockParamType {
        target?: object;
        endCallBack?: Function;
        enterCrucialCall?: Function;
        maxCountNum?: number;
        crucialSecond?: number;
        autoHide?: boolean;
        canShake?: boolean;
    }
    export class ClockTimer extends game.View {
        timeLabel: cc.Label;
        private clockParam;
        private startTime;
        private timeCount;
        private interID;
        private hasEnterCrucialCall;
        private isCount;
        private preTween;
        onLoad(): void;
        start(): void;
        initData(param: ClockParamType): void;
        onDestroy(): void;
        /**注册事件 */
        registerEvent(): void;
        /**移除注册事件 */
        removeEvent(): void;
        /**重置数据 */
        resetData(clockParam: ClockParamType): void;
        /**结束计时 */
        private endCount;
        /**计时 */
        private tick;
        private shakeTween;
        private shakeAni;
        /**开始计时 */
        private clockStart;
        /**隐藏计时器，但不是移除 */
        private clockHide;
        setTimeLabelString(str: string): void;
    }
    export class GameKeboard extends game.Keyboard {
    }
    export class GameUIDialog extends game.UIDialog {
    }
    export enum IMaterialType {
        GRAY = 1,
        NORMAL = 2
    }
    export class MyButton extends cc.Button {
        _updateDisabledState(force: any): void;
        /**
         * 置灰节点以及子节点
         * @param node
         * @param type
         */
        private grayAllChildren;
    }
    export class PostbirdAlertBox {
        containerClass: string;
        box: any;
        textTemplate: {
            title: string;
            content: string;
            okBtn: string;
            cancelBtn: string;
            contentColor: string;
            okBtnColor: string;
            promptTitle: string;
            promptOkBtn: string;
        };
        getAlertTemplate(): string;
        getConfirmTemplate(): string;
        getPromptTemplate(): string;
        alert(opt: any): void;
        confirm(opt: any): void;
        prompt(opt: any): void;
        colse(): void;
        removeBox(): void;
    }
    export class CoreCombox extends game.Combox {
    }
    export class CoreLanguageComponent extends game.LanguageComp {
    }
        export class DataAnalysis {
        private static _instance;
        static readonly instance: DataAnalysis;
        ipInfo: IpInfo;
        apiUserInfo: any;
        appUserInfo: any;
        apiEventReq: string;
        apiEventToekn: string;
        appEventReq: string;
        appEventToekn: string;
        init(): void;
        getUrlParams(): void;
        httpEventReport(eventCode: number, value?: number, successCall?: Function, failCall?: Function): void;
        /**填充大厅的一些信息 */
        private fillAppInfo;
        /**获取api 用户信息 */
        getApiUserInfo(): void;
        /**获取app 用户信息 */
        getAppUserInfo(): void;
        private eventSignCreate;
    }
    export class GameEventData {
        private static _instance;
        static readonly instance: GameEventData;
        /** 创建角色 */
        hall_create_role: number;
        /** 游戏icon点击 */
        hall_click_game_id: number;
        /** 房间级别 */
        select_room_level: number;
        /** 房间倍数（底注） */
        select_room_multiple: number;
        /** 桌号 */
        select_table: number;
        /** 开始游戏（快速开始） */
        game_start: number;
        /** 排行榜 */
        click_rank: number;
        /** 排行榜（本周） */
        click_rank_preweek: number;
        /** 排行榜（上周） */
        click_rank_nextweek: number;
        /** 1v1模式 */
        click_1v1_model: number;
        /** 2v2模式 */
        click_2v2_model: number;
        /** 脏的模式 */
        click_dirty_model: number;
        /** 干净的模式 */
        click_clean_model: number;
        /** 基础场 */
        click_basic_sence: number;
        /** 加倍场 */
        click_double_sence: number;
        /** 十倍牛牛 */
        ten_niu_model: number;
        /** vip房间模式 */
        vip_room_model: number;
        /** 创建好友房间 */
        create_friend_room: number;
        /** 加入好友房间 */
        join_friend_room: number;
        /** 疯狂加倍模式 */
        crazy_bet_model: number;
        /** 下注加倍模式 */
        nomorl_bet_model: number;
        /** 游戏内充值 */
        game_to_pay: number;
        /** 游戏余额不足，点击充值 */
        nomoney_to_pay: number;
        /** 双倍加速 */
        double_speed: number;
        /** 增加线注 */
        add_bet_line: number;
        /** 减少线注 */
        reduce_bet_line: number;
        /** 自动旋转 */
        auto_spine: number;
        /** 自动旋转次数选择1 */
        auto_spine_select_time1: number;
        /** 自动旋转次数选择2 */
        auto_spine_select_time2: number;
        /** 自动旋转次数选择3 */
        auto_spine_select_time3: number;
        /** 自动旋转次数选择4 */
        auto_spine_select_time4: number;
        /** 自动旋转次数选择5 */
        auto_spine_select_time5: number;
        /** 自动旋转次数选择6 */
        auto_spine_select_time6: number;
        /** 自动旋转次数选择7 */
        auto_spine_select_time7: number;
        /** 自动旋转开始 */
        auto_spine_model_start: number;
        /** 自动旋转取消 */
        auto_spine_model_cancel: number;
        /** slot返回大厅 */
        slot_back_hall: number;
        /** 自动发炮 */
        shoot_auto: number;
        /** 固定目标 */
        fixed_hunt_target: number;
        /** 固定方向 */
        fixed_hunt_direction: number;
        /** 切换炮台1 */
        switch_gun_1: number;
        /** 切换炮台2 */
        switch_gun_2: number;
        /** 切换炮台3 */
        switch_gun_3: number;
        /** 切换炮台4 */
        switch_gun_4: number;
        /** 切换炮台5 */
        switch_gun_5: number;
        /** 90秒未操作，退出房间 */
        not_operated_to_quit: number;
        /** hunt返回大厅 */
        hunt_back_hall: number;
        /** 自动模式切换 */
        auto_switch_model: number;
        /** 桌游加速 */
        arcade_add_speed: number;
        /** 返回桌游大厅 */
        arcade_back_gamehall: number;
        /** 继续下一局 */
        continue_next_play: number;
        /** slot新手引导1 */
        slot_guide_1: number;
        /** slot新手引导2 */
        slot_guide_2: number;
        /** slot新手引导3 */
        slot_guide_3: number;
        /** slot新手引导4 */
        slot_guide_4: number;
        /** hunt新手引导1 */
        hunt_guide_1: number;
        /** hunt新手引导2 */
        hunt_guide_2: number;
        /** hunt新手引导3 */
        hunt_guide_3: number;
        /** hunt新手引导4 */
        hunt_guide_4: number;
        /** 桌游新手引导1 */
        arcade_guide_1: number;
        /** 桌游新手引导2 */
        arcade_guide_2: number;
        /** 桌游新手引导3 */
        arcade_guide_3: number;
        /** 桌游新手引导4 */
        arcade_guide_4: number;
        /** 游戏记录 */
        open_game_record: number;
        /** 记录详情 */
        open_game_record_detail: number;
        /** 账户流水 */
        open_account_water: number;
        /** 个人信息 */
        open_user_info: number;
        /** 等级帮助 */
        open_level_help: number;
        /** 购买基金 */
        open_buy_fund: number;
        /** 系统设置 */
        open_seting: number;
        /** 好友开房 */
        set_friend_room: number;
        /** 游戏模式 */
        set_game_model: number;
        /** 普通模式 */
        set_normal_model: number;
        /** 欢乐模式 */
        set_happy_model: number;
        /** 心跳模式 */
        set_heart_model: number;
        /** 模式说明 */
        set_models_des: number;
        /** 帮助 */
        open_help: number;
        /** 操作介绍 */
        operation_help: number;
        /** 音效开关 */
        open_sound_set: number;
        /** 音乐 */
        click_misic: number;
        /** 音效 */
        click_sound_effect: number;
        /** 活动icon */
        click_activity_icon: number;
        /** 活动类型 */
        click_activity_type: number;
        /** 开红包 */
        open_red_packet: number;
        /** 确定领取红包 */
        confirm_get_red_packet: number;
        /** 兑换红包 */
        exchange_red_packet: number;
        /** 兑换确定 */
        excharge_confirm: number;
        /** 兑换取消 */
        excharge_cancel: number;
        /** 抽一次 */
        lottery_draw_one: number;
        /** 抽十次 */
        lottery_draw_ten: number;
        /** 抽奖 */
        lottery_draw: number;
        /** 兑换物品 */
        excharge_prop: number;
        /** 领奖 */
        events_reward: number;
        /** 活动参与跳转游戏 */
        events_in_jump_game: number;
        /** 离开游戏 */
        game_quit: number;
    }
    export class FeedBack extends game.View {
        private editBox;
        private tipsNode;
        /**是否已提交过 */
        private isSubmited;
        /**是否正在提交 */
        private isSubmitting;
        onLoad(): void;
        showInput(): void;
        onOpen(fromUI: number, ...args: any[]): void;
        setFocus(): void;
        start(): void;
        layout(): void;
        /**
         * 提交按钮
         */
        private onSubmitBtnClick;
        private submitContext;
        private submitContextBack;
        private textChange;
        /**
         * 关闭按钮
         */
        private onCloseBtnClick;
    }
        export class FriendBoard extends game.View {
        friendRoom: FriendRoom;
        onLoad(): void;
        start(): void;
        init(...args: any[]): void;
        layout(): void;
        removeEvent(): void;
        onclickCreatRoom(): void;
        onclickJionRoom(): void;
        onclickChangeRoom(): void;
        onclickClose(): void;
    }
    export class FriendNumber extends game.UIView {
        roomNumber: number;
        nodePostion: cc.Vec2;
        nodeScale: number;
        init(args: any[]): void;
        onLoad(): void;
        start(): void;
    }
        export class InputRoom extends game.View {
        itemList: cc.Node[];
        focusIndex: number;
        friendRoom: FriendRoom;
        friendID: string;
        inputIndex: number;
        isopenkeyboard: boolean;
        onLoad(): void;
        init(...args: any[]): void;
        start(): void;
        layout(): void;
        onDestroy(): void;
        private messListener;
        private keyboardHandler;
        onClickClose(): void;
        onClickOpenKeyBoard(): void;
        onClickOK(): void;
    }
    /** 单个球 */
    export class BingoBall extends cc.Component {
        bg: cc.Node;
        valueLabel: cc.Label;
        clickedNode: cc.Node;
        /**设置球视图数据 */
        setView(data: protoReport.grid_info_type): void;
        /**
         * 根据数字获取颜色值
         * @param v
         * @returns
         */
        private getColorByNumber;
        /**
         * 通过数字大小获取组内下标 共分五组 id为0~4
         * @param v
         */
        private getGroupIdByNumber;
        /**
         * 动态显示图片
         * @param target
         * @param path
         * @param call
         */
        private dynamicShowSprite;
    }
    export class AccountFlowItemL_Hunter extends game.ListViewItem {
        bg: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
    }
    export class AccountFlowItemL_Slot extends game.ListViewItem {
        bg: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
    }
    export class AccountFlowItemP_Hunter extends game.ListViewItem {
        bg: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
    }
    export class AccountFlowItemP_Slot extends game.ListViewItem {
        bg: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
    }
    export class BetRecordItemL_Arcade extends game.ListViewItem {
        bg: cc.Node;
        checkBtn: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
        onItemTouch(): void;
        onCheck(): void;
    }
    export class BetRecordItemL_Hunter extends game.ListViewItem {
        bg: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
        onItemTouch(): void;
    }
    export class BetRecordItemL_Slot extends game.ListViewItem {
        bg: cc.Node;
        checkBtn: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
        onItemTouch(): void;
        onCheck(): void;
    }
    export class BetRecordItemP_Arcade extends game.ListViewItem {
        bg: cc.Node;
        checkBtn: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
        onItemTouch(): void;
        onCheck(): void;
    }
    export class BetRecordItemP_Hunter extends game.ListViewItem {
        bg: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
        onItemTouch(): void;
    }
    export class BetRecordItemP_Slot extends game.ListViewItem {
        bg: cc.Node;
        checkBtn: cc.Node;
        private _labArr;
        private _init;
        updateItem(index: number, data: any, params?: any): void;
        onItemTouch(): void;
        onCheck(): void;
    }
    export class DetailItem extends cc.Component {
        protected _index: number;
        protected _data: any;
        updateItem(index: number, data: any, ...args: any[]): void;
    }
    export class DIResultCOM extends cc.Component {
        bg: cc.Node;
        key: cc.Label;
        value: cc.Label;
        updateItem(index: number, key: string, value: string): void;
    }
    /**
     * 押分中奖结果
     */
        export class DIResultFullLine extends cc.Component {
        bg: cc.Node;
        elemRoot: cc.Node;
        labDesc: cc.Label[];
        private _index;
        private _game_id;
        private _data;
        private _extData;
        init(index: number, game_id: number, data: protoReport.fullLineResultListType, extData?: RecordDI_ExtData): void;
    }
    /**
     * 详情item - slot
     */
        export class DIResultJP extends DetailItem {
        bg: cc.Node;
        key: cc.Label;
        value: cc.Label;
        updateItem(index: number, data: any): void;
    }
    export class DIResultJP_Hunter extends game.ListViewItem {
        bg: cc.Node;
        labDesc: cc.Label[];
        /**
         * 子类实现此方法
         * @param index 索引
         * @param data 数据
         * @param params 额外数据
         */
        updateItem(index: number, data: any, params?: any): void;
    }
    /**
     * 详情item - slot
     */
        export class DIResultLG extends DetailItem {
        bg: cc.Node;
        key: cc.Label;
        value: cc.Label;
        elemRoot: cc.Node;
        updateItem(index: number, data: protoReport.rgProcessType, game_id: number): void;
    }
    /**
     * 押分中奖结果
     */
        export class DIResultNormal extends cc.Component {
        bg: cc.Node;
        elemRoot: cc.Node;
        labDesc: cc.Label[];
        private _index;
        private _game_id;
        private _data;
        private _extData;
        init(index: number, game_id: number, data: protoReport.lineResultType, extData?: RecordDI_ExtData): void;
    }
    export class DIResultNormal_Hunter extends game.ListViewItem {
        bg: cc.Node;
        fishIcon: cc.Sprite;
        hitTag: cc.Sprite;
        labDesc: cc.Label[];
        hitTagSpf: cc.SpriteFrame[];
        private _game_id;
        /**
         * 子类实现此方法
         * @param index 索引
         * @param data 数据
         * @param params 额外数据
         */
        updateItem(index: number, data: any, params?: any): void;
    }
    /**
     * 押分中奖结果
     */
        export class DIResultScatter extends cc.Component {
        bg: cc.Node;
        elemRoot: cc.Node;
        labDesc: cc.Label[];
        private _index;
        private _game_id;
        private _data;
        private _extData;
        init(index: number, game_id: number, data: protoReport.scatterResultType, extData?: RecordDI_ExtData): void;
    }
    /**
     * 押分中奖结果
     */
        export class DIResult_1007401 extends DetailItem {
        bg: cc.Node;
        elemRoot: cc.Node;
        private _game_id;
        updateItem(index: number, data: protoReport.allActiveLineListType, game_id: number): void;
    }
    /**
     * 押分中奖结果
     */
            export class DIResult_1008801 extends DIResultNormal {
        init(index: number, game_id: number, data: protoReport.lineResultType, extData?: RecordDI_ExtData): void;
    }
    /**
     * 详情item - slot
     */
        export class DISlot extends DetailItem {
        bg: cc.Node;
        key: cc.Label;
        value: cc.Label;
        updateItem(index: number, data: any): void;
    }
    export class GameDetail extends cc.Component {
        title: cc.Node;
        detailRoot: cc.Node;
        itemTemplate: cc.Prefab;
        private _itemList;
        start(): void;
        init(): void;
    }
    export class GameDetail_Arcade extends cc.Component {
        title: cc.Node;
        detailRoot: cc.Node;
        itemTemplate: cc.Prefab;
        private _itemList;
        start(): void;
        init(): void;
    }
    /**
     * 游戏记录面板
     */
                    export class GameRecordPanel extends cc.Component {
        private _target;
        tabs: cc.Node[];
        searchTime: cc.Label;
        matchNum: cc.Label;
        total: cc.Label;
        totalBet: cc.Label;
        totalWin: cc.Label;
        totalGain: cc.Label;
        grListView: CoreListView;
        gtCombox: CoreCombox;
        gnCombox: CoreCombox;
        stCombox: CoreCombox;
        infoHeaderRoot: cc.Node;
        balance: cc.Label;
        brItemTemplate: cc.Prefab[];
        brInfoHeader: cc.Prefab[];
        afItemTemplate: cc.Prefab[];
        afInfoHeader: cc.Prefab[];
        private _infoHeaderNodes;
        start(): void;
        private _registerEvent;
        private _unRegisterEvent;
        private _createInfoHeaderNode;
        private _showInfoHeaderNode;
        private _hideInfoHeaderNode;
        switchInfoHeader(tabId?: number, gameTypeId?: number): void;
        bindTarget(target: GameRecord): void;
        onTabTouch(event: cc.Event.EventTouch): void;
        onSearchTouch(event: cc.Event.EventTouch): void;
        autoModifyTab(): void;
        /**
         * 选择标签
         * @param tabId 标签id
         * @param force 是否强制执行（相同选择也会响应）
         */
        selTab(tabId: number, force?: boolean): void;
        initCombox(isSelTab?: boolean): void;
        onGameTypeSel(index: number, data: any, manual: boolean): void;
        onGameSel(index: number, data: any, manual: boolean): void;
        onSearchTimeSel(index: number, data: any, manual: boolean): void;
        private _refresh_tab;
        listView_isReady(tabId?: number, gameTypeId?: number): boolean;
        initListView(record: RecordListData): void;
        ReqAddListViewData(listView: game.ListView, event: game.ListViewEvent): void;
        addListViewData(tabId?: number, gameTypeId?: number): void;
        refresh_summary(tabId?: number, gameTypeId?: number): void;
        private _layout_summary;
        private _refresh_balance;
        onDestroy(): void;
        oriSwitchExit(): void;
        oriSwitchEnter(): void;
    }
            /**
     * 请求记录列表结构体参数
     * @param type2_id 游戏类型id
     * @param game_id 游戏id
     * @param time_kind 时间区间id
     * @param offset 偏移量
     * @param language 语种
     */
    export interface IReqGameRecordParam {
        type2_id?: number;
        game_id?: number;
        time_kind: number;
        offset: number;
        language: string;
    }
    /**
     * 请求单号详情结构体参数
     * @param order_id 单号
     * @param isCheck
     * @param check_type 查验类型
     */
    export interface IReqOrderDetailParam {
        order_id: string;
        isCheck?: boolean;
        check_type?: HashCheckType;
    }
    export class GameRecord extends game.UIView {
        recordPanelL: GameRecordPanel;
        recordPanelP: GameRecordPanel;
        tips: cc.Node;
        betRecordData: any[];
        accountFlowData: any[];
        private _isLandscape;
        private _recordPanel;
        onBtnClose(): void;
        private _registerEvent;
        private _unRegisterEvent;
        /**
         * 窗口size改变
         */
        private _onResize;
        /**
         * 界面布局
         * @param checkOri 是否重新检测屏幕方向 (首次布局才需要检测)
         */
        private _layout;
        private _autoScale;
        showTips(): void;
        hideTips(): void;
        start(): void;
        onDestroy(): void;
        onCheckRecordDetail(eventName: string, eventData?: any, ...optionalParams: any[]): void;
        /**
         * 请求游戏列表
         * @param lang 语种（zh, en）
         */
        reqGameList(lang: string): void;
        respGameList(_xhr: XMLHttpRequest, baseInfo: game.IReqInfo): void;
        checkRepeatSearch(sc: SearchCondition): boolean;
        reqGameOrder(param: IReqGameRecordParam): void;
        respGameOrder_init(_xhr: XMLHttpRequest, baseInfo: game.IReqInfo): void;
        respGameOrder_append(_xhr: XMLHttpRequest, baseInfo: game.IReqInfo): void;
        reqGameFlow(param: IReqGameRecordParam): void;
        respGameFlow_init(_xhr: XMLHttpRequest, baseInfo: game.IReqInfo): void;
        respGameFlow_append(_xhr: XMLHttpRequest, baseInfo: game.IReqInfo): void;
        reqOrderDetail(param: IReqOrderDetailParam): void;
        respOrderDetail(_xhr: XMLHttpRequest, baseInfo: game.IReqInfo): void;
    }
    export class ResultCOM extends cc.Component {
        title: cc.Label;
        updateItem(title: string): void;
    }
    /**
     * 滚轴结果
     */
        export class ResultRoller extends cc.Component {
        iconRoot: cc.Node;
        bg: cc.Node;
        private _iconList;
        private _replaceIconList;
        private _game_id;
        private _grid;
        private _originGrid;
        private _row;
        private _col;
        private _gridShow;
        private _rowShow;
        private _colShow;
        private _beginX;
        private _beginY;
        /**
         * 滚轴初始化
         * @param game_id 游戏id
         * @param grid 元素id格子
         * @param gridShow 滚轴展示数组
         * @param fixedGrid 是否固定滚轴
         * @param extData 扩展数据
         */
        init(game_id: number, grid: number[], gridShow: RecordGridShow[], fixedGrid?: boolean, extData?: RecordDI_ExtData): void;
        private _fixOverlapGrid;
        private _generateResultGrid;
        private _getoffsetByCol;
        private _generateResultGrid_fixed;
        private _calculateBeginPos;
        private _resize;
    }
        export class GameResult extends cc.Component {
        summary: cc.Node;
        btnDrop: cc.Node;
        order: cc.Label;
        bonusType: cc.Label;
        bonus: cc.Label;
        resultRoot: cc.Node;
        rollerTemplate: cc.Prefab;
        lineResultTemplate: cc.Prefab[];
        fullLineResultTemplate: cc.Prefab[];
        scatterResultTemplate: cc.Prefab[];
        comResultTemplate: cc.Prefab[];
        lgResultTemplate: cc.Prefab;
        jpResultTemplate: cc.Prefab;
        placeholderTemplate: cc.Prefab;
        private _template;
        setTitle(index: number, typeId?: number, bonus?: number): void;
        createRoller(game_id: number, grid: number[], gridShow: RecordGridShow[], fixedGrid?: boolean, extData?: RecordDI_ExtData): void;
        /**
         * 异步加载预制模板
         */
        loadTemplate(path: string): Promise<any>;
        createPlaceholder(height?: number): void;
        createDetail_lineResult(game_id: number, detail: protoReport.lineResultType[], extData?: RecordDI_ExtData): Promise<void>;
        createDetail_fullLineResult(game_id: number, detail: protoReport.fullLineResultListType[], extData?: RecordDI_ExtData): void;
        createDetail_crushLineResult(game_id: number, detail: protoReport.lineResultType[]): void;
        createDetail_crushFullLineResult(game_id: number, detail: protoReport.fullLineResultType[]): void;
        createDetail_scatterResult(game_id: number, detail: protoReport.scatterResultType[], exData?: RecordDI_ExtData): void;
        createDetail_1007401(game_id: number, detail: protoReport.allActiveLineListType[]): Promise<void>;
        createDetail_lgResult(game_id: number, detail: protoReport.rgProcessType[]): void;
        createDetail_jpResult(game_id: number, detail: protoReport.jackpotDetail): void;
        createDetail_comTitle(title: string): void;
        createDetail_comResult(game_id: number, index: number, key: string, value: string): void;
        btnDropOnTouch(): void;
        onDestroy(): void;
    }
    export class ResultArcadeCardItem extends cc.Component {
        result: cc.Node;
        bg: cc.Node;
        setItemResultData(index: number, data: any): void;
        private setItemIcon;
    }
    export class ResultArcadeCardTitle extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeDominoItem extends cc.Component {
        bg: cc.Node;
        setItemResultData(index: number, data: protoReport.domino_total_detail): void;
        private setItemIcon;
        createDominoIcon(game_id: string, parent: cc.Node, info: protoReport.card_info, iconW?: number, iconH?: number): void;
    }
    export class ResultArcadeDominoTitle extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeNumItem extends cc.Component {
        bg: cc.Node;
        setItemResultData(index: number, data: any): void;
    }
    export class ResultArcadeNumTitle extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeTrucoItem extends cc.Component {
        bg: cc.Node;
        setItemResultData(index: number, data: protoReport.truco_total_detail): void;
    }
    export class ResultArcadeTrucoTitle extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultComonArcade extends cc.Component {
        container: cc.Node;
        bg: cc.Node;
        setResultData(index: number, data: any, type: number): void;
        private setItemIcon;
    }
    export class GameResult_Arcade extends cc.Component {
        summary: cc.Node;
        btnDrop: cc.Node;
        order: cc.Label;
        resultRoot: cc.Node;
        commonTemplate: cc.Prefab;
        templateCradTitle: cc.Prefab;
        templateNumTitle: cc.Prefab;
        templateTrucoTitle: cc.Prefab;
        templateDominoTitle: cc.Prefab;
        placeholderTemplate: cc.Prefab;
        resultTitleTmp: cc.Prefab[];
        private _template;
        private _curOrderDetail;
        setTitle(): void;
        createCommonResult(): void;
        createPlayerResult(): void;
        /**
         * 异步加载预制模板
         */
        loadTemplate(path: string): Promise<any>;
        createPlaceholder(height?: number): void;
        btnDropOnTouch(): void;
        onDestroy(): void;
    }
    export class GRComboxItem extends game.ComboxItem {
        bg: cc.Node;
        text: cc.Label;
        comboxId: number;
        updateItem(index: number, data: any, params?: any): void;
        setExtParams(params: any): void;
        private _checkBg;
    }
    /**
     * 记录数据定义
     * 注：如果玩法有变动，导致该文件定义数据有变动，需手动修改该文件
     */
    /** ------------ slot相关定义 ------------------ */
    /**
     * 线模式
     * @param NORMAL 普通
     * @param FREE 免费
     */
    export enum SlotLineMode {
        NORMAL = 1,
        FREE = 2
    }
    /**
     * 线类型
     * @param LIGATURE 连线
     * @param ASSIGN 指定
     * @param ROLLER 滚轴
     * @param NO_NOSE_TAIL_LIGATURE 非首尾连线
     * @param GLOBAL_DISPERSE 全局分散
     * @param NORMAL_DISPERSE 普通分散
     * @param FREE_DISPERSE 免费分散
     * @param NO_NOSE_TAIL_ROLLER 非首尾滚轴
     * @param CLOSETO_DISPERSE 相邻分散
     * @param RANDOM_REWARD_ASSIGN 随机奖励指定
     * @param ORDER_ROLLER 有序滚轴
     * @param ROLLER_SPECIAL 滚轴X战警
     * @param MAX_LINES 满线
     * @param SERIES_ROLLER 连续滚轴
     */
    export enum SlotLineType {
        LIGATURE = 1,
        ASSIGN = 2,
        ROLLER = 3,
        NO_NOSE_TAIL_LIGATURE = 4,
        GLOBAL_DISPERSE = 5,
        NORMAL_DISPERSE = 6,
        FREE_DISPERSE = 7,
        NO_NOSE_TAIL_ROLLER = 8,
        CLOSETO_DISPERSE = 9,
        RANDOM_REWARD_ASSIGN = 10,
        ORDER_ROLLER = 11,
        ROLLER_SPECIAL = 12,
        MAX_LINES = 13,
        SERIES_ROLLER = 14
    }
    /**
     * 线方向
     * @param LEFT_2_RIGHT 左起
     * @param RIGHT_2_LEFT 右起
     */
    export enum SlotLineDir {
        LEFT_2_RIGHT = 1,
        RIGHT_2_LEFT = 2
    }
    /**
     * 记录详情
     */
        export class RecordDetail extends game.UIView {
        bg: cc.Node;
        scrollView: cc.ScrollView;
        gameDetail: GameDetail;
        gameResultTemplate: cc.Prefab;
        btnBack: cc.Node;
        private _isLandscape;
        private _curOrderData;
        private _curOrderDetail;
        private _gameResultList;
        private _registerEvent;
        private _unRegisterEvent;
        /**
         * 窗口size改变
         */
        private _onResize;
        onBtnBackTouch(event: cc.Event.EventTouch): void;
        start(): void;
        onDestroy(): void;
        /**
         * 界面布局
         * @param checkOri 是否重新检测屏幕方向 (首次布局才需要检测)
         */
        private _layout;
        private _autoScale;
        oriSwitchExit(): void;
        oriSwitchEnter(): void;
        setListViewSize(width?: number, height?: number): void;
        private _handle_GameResult;
        private _createGameResult;
        private _autoCreateGameResult;
        private _handle_jpDetail;
        /**
         *
         * @param game_id 游戏id
         * @param detail 默认数据
         * @param normalSpinDetail 普通转数据
         * @param freeSpinDetail 免费转数据
         */
        private _handle_spinDetail;
        private _handle_lgDetail;
        private _handle_bfgDetail;
        private _handle_wmDetail;
    }
        export class RecordDetail_Aracde extends game.UIView {
        bg: cc.Node;
        scrollView: cc.ScrollView;
        gameDetail: GameDetail_Arcade;
        gameResultTemplate: cc.Prefab;
        btnBack: cc.Node;
        private _isLandscape;
        private _curOrderData;
        private _curOrderDetail;
        private _gameResultList;
        private _registerEvent;
        private _unRegisterEvent;
        /**
         * 窗口size改变
         */
        private _onResize;
        onBtnBackTouch(event: cc.Event.EventTouch): void;
        start(): void;
        onDestroy(): void;
        /**
         * 界面布局
         * @param checkOri 是否重新检测屏幕方向 (首次布局才需要检测)
         */
        private _layout;
        private _autoScale;
        oriSwitchExit(): void;
        oriSwitchEnter(): void;
        setListViewSize(width?: number, height?: number): void;
        private _createGameResult;
    }
    /**
     * 记录详情
     */
        export class RecordDetail_Hunter extends game.UIView {
        bg: cc.Node;
        listView: CoreListView;
        btnBack: cc.Node;
        contentTitle: cc.Node;
        normalResultTemplate: cc.Prefab[];
        jpResultTemplate: cc.Prefab[];
        private _isLandscape;
        private _latelyLVII;
        private _registerEvent;
        private _unRegisterEvent;
        /**
         * 窗口size改变
         */
        private _onResize;
        onBtnBackTouch(event: cc.Event.EventTouch): void;
        start(): void;
        onDestroy(): void;
        /**
         * 界面布局
         * @param checkOri 是否重新检测屏幕方向 (首次布局才需要检测)
         */
        private _layout;
        private _autoScale;
        oriSwitchExit(): void;
        oriSwitchEnter(): void;
        setListViewSize(width?: number, height?: number): void;
    }
    export class ResultArcadeItem_1 extends cc.Component {
        result: cc.Node;
        bg: cc.Node;
        setItemResultData(index: number, roundIdx: number, data: protoReport.player_qz_detail_type): void;
        private setLabStr;
        private setItemIcon;
        private createIcons;
    }
    export class ResultArcadeItem_2 extends cc.Component {
        result: cc.Node;
        bg: cc.Node;
        setItemResultData(index: number, roundIdx: number, data: protoReport.player_qz_detail_type): void;
        private setLabStr;
        private setItemIcon;
        private createIcons;
    }
    export class ResultArcadeItem_3 extends cc.Component {
        result: cc.Node;
        bg: cc.Node;
        setItemResultData(index: number, roundIdx: number, data: protoReport.player_qz_detail_type): void;
        private setLabStr;
        private setItemIcon;
        private createIcons;
    }
    export class ResultArcadeItem_4 extends cc.Component {
        result: cc.Node;
        bg: cc.Node;
        setItemResultData(index: number, roundIdx: number, data: protoReport.truco_role_detail): void;
        private setLabStr;
        private setItemIcon;
        private createIcons;
    }
    export class ResultArcadeItem_5 extends cc.Component {
        result: cc.Node;
        bg: cc.Node;
        setItemResultData(index: number, roundIdx: number, data: protoReport.domino_role_detail): void;
        private setLabStr;
        private setItemIcon;
        createDominoIcon(game_id: string, parent: cc.Node, info: protoReport.card_info, iconW?: number, iconH?: number): void;
    }
    export class ResultArcadeItem_6 extends cc.Component {
        bg: cc.Node;
        container: cc.Node;
        /**
         * 根据数据刷新所有球ui
         * @param data
         */
        updateBalls(cardInfo: protoReport.card_info_type): void;
    }
    export class ResultArcadeTitle_1 extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeTitle_2 extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeTitle_3 extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeTitle_4 extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeTitle_5 extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        resultItem: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class ResultArcadeTitle_6 extends cc.Component {
        list: cc.Node;
        bg: cc.Node;
        luckyCoinLabel: cc.Label;
        cardPre: cc.Prefab;
        createPlayerResultItem(): void;
    }
    export class GameCoreGlobal {
    }
    export class GMReg extends game.UIView {
        getDataParam: string;
        private _contentText;
        onLoad(): void;
        closePop(): void;
        showResult(respData: protoCommon.gmResp): string;
        updateGMResp(): void;
    }
    /**
     * GM 管理类，用于初始化GM界面
     *
     * @export
     * @class GMManager
     */
    export class GMManager {
        private static _instance;
        static readonly instance: GMManager;
        /**
         * GM 节点
         */
        private GMNode;
        GMRegNode: cc.Node;
        /**
         * GM预制
         */
        private resPrefab;
        private regPrefab;
        /**
         * 初始化gm
         * @param gmConfig gm配置表
         * @returns
         */
        initGM(gmConfig: any): void;
        private gmResp;
        /**
         * 销毁
         */
        destroy(): void;
    }
    /**
     * GM
     *
     * @export
     * @class GMLayer
     * @extends {game.UIView}
     */
    export class GMLayer extends game.UIView {
        private GmBtn;
        private gmLayer;
        private blockNode;
        private contentNode;
        private cmdItem;
        private confirmBtn;
        private cancelBtn;
        private editbox;
        private toggleContainerNode;
        private toggleItem;
        private GMReg;
        /**
         * GM配置
         */
        private gmconfig;
        onLoad(): void;
        private reqMsg;
        /**
         * 初始化GM
         * @param gmConfig
         * @returns
         */
        initGM(gmConfig: any): void;
        /**
         * 布局
         */
        private layout;
        /**
         * 按钮触摸开始
         */
        private GmBtnTouchStart;
        /**
         * 按钮触摸结束
         */
        private GmBtnTouchEnd;
        /**
         * 按钮移动
         */
        private GmBtnMove;
        /**
         * 初始化命令列表
         */
        private initSlotCmdList;
        /**
         * 初始化命令列表
         */
        private initHuntCmdList;
        /**
         * 初始化命令列表
         */
        private initArcadeCmdList;
        /**
         * 初始化标题 dev sit
         */
        private initCmdTitle;
        /**
         * 添加特殊命令
         */
        private addSpecialCMD;
        private showFps;
        /**
         * cmd按钮点击监听
         */
        private cmdBtnClick;
        updateEditbox(result: any): void;
        showVillageData(result: protoCommon.gmResp): void;
        /**
         * 显示gm层
         */
        private showGMlayer;
        /**
         * 确认按钮
         */
        private confirmBtnClick;
        /**
         * GM游戏数值控制面板显示
         */
        regShow(): void;
        /**
         * resize
         */
        private resize;
        /**
         * 是否横屏
         */
        private readonly isLandscape;
        private openWidgetProperty;
        /**
         * 设置widget属性
         */
        private setWidget;
        onDestroy(): void;
    }
        export class GrowthFundItem extends game.UIView {
        info: GrowFundParam;
        titleLabel: cc.Sprite;
        rewardLabel: cc.Label;
        icon: cc.Sprite;
        priceLabel: cc.Label;
        tagLabel: cc.Label;
        canclick: boolean;
        private langAry;
        updateInfo(info: any): void;
        onLoad(): void;
        start(): void;
        updateShow(): void;
        onClickBuy(): void;
        setClickBtn(click: boolean): void;
    }
        export class GrowthFund extends game.View {
        content: cc.Node;
        itemDataList: GrowFundParam[];
        growthfundList: cc.Node[];
        private itemPrefab;
        private static _instance;
        static readonly instance: GrowthFund;
        init(param: any): void;
        updateInfo(): void;
        destory(): void;
        registerEvent(): void;
        removeEvent(): void;
        onLoad(): void;
        start(): void;
        onDestroy(): void;
        layout(): void;
        onclickClose(): void;
        onClickReward(): void;
        onClickHelp(): void;
        listenClickBuy(): void;
        createFundItem(parent: cc.Node, info: GrowFundParam): void;
        private buyGrowthFund;
        setAllBunttonCanClick(canclick: boolean): void;
    }
        export class GrowthHelpItem extends game.View {
        info: GrowHelpParam;
        titleLabel: cc.Sprite;
        desLabel: cc.Label;
        private langAry;
        updateInfo(info: any): void;
        onLoad(): void;
        updateShow(): void;
    }
        export class GrowthFunHelp extends game.View {
        content: cc.Node;
        itemDataList: GrowHelpParam[];
        private helpItemPrefab;
        init(param: any): void;
        updateInfo(): void;
        onLoad(): void;
        start(): void;
        layout(): void;
        onclickClose(): void;
        createFundHelpItem(parent: cc.Node, info: GrowHelpParam): void;
        createTiaojianItem(parent: cc.Node, str: string): void;
    }
        export class GrowthListItem extends game.View {
        info: GrowListParam;
        lvLabel: cc.Label;
        expLabel: cc.Label;
        baiyinLabel: cc.Label;
        huangjinLabel: cc.Label;
        zuanshiLabel: cc.Label;
        updateInfo(info: any): void;
        onLoad(): void;
        start(): void;
        updateShow(): void;
    }
        export class GrowthRecordItem extends game.View {
        info: GrowRecordParam;
        lvLabel: cc.Label;
        expLabel: cc.Label;
        valueLabel: cc.Label;
        stateLabel: cc.Label;
        private unReceivedlabelColer;
        private receivedlabelColer;
        updateInfo(info: any): void;
        onLoad(): void;
        start(): void;
        updateShow(): void;
        /**
         * 1.待领取2.已领取
         */
        upDateState(): void;
    }
        export class GrowthRecord extends game.View {
        curLvLabel: cc.Label;
        nextLvLabel: cc.Label;
        totalGetLabel: cc.Label;
        nextGetLabel: cc.Label;
        progress: cc.ProgressBar;
        progressLabel: cc.Label;
        scrollview: cc.ScrollView;
        info: any;
        content: cc.Node;
        itemDataList: GrowRecordParam[];
        currLv: number;
        nextLv: number;
        totalGetReward: number;
        nextReward: number;
        canGetLvStart: number;
        private itemPrefab;
        init(param: any): void;
        onLoad(): void;
        start(): void;
        layout(): void;
        onclickClose(): void;
        createFundHelpItem(parent: cc.Node, info: GrowRecordParam): void;
        upDateInfo(msg: string, fundAward: number[]): void;
        private getExp;
    }
        export class GrowthRewardList extends game.View {
        info: any;
        content: cc.Node;
        itemDataList: GrowListParam[];
        titleLabel: cc.Label[];
        totalLabel: cc.Label[];
        totalFund: number[];
        private itemPrefab;
        init(param: any): void;
        onLoad(): void;
        start(): void;
        updateInfo(): void;
        layout(): void;
        onclickClose(): void;
        createListItem(parent: cc.Node, info: GrowListParam): void;
    }
    export class ExchangeGuide extends game.View {
        btnContinue: cc.Node;
        btnToExchange: cc.Node;
        labTips: cc.Label;
        private continueCallback;
        private exchangeCallback;
        onLoad(): void;
        layout(): void;
        onOpen(fromUI: number, ...args: any[]): void;
        onContinue(): void;
        onExchange(): void;
    }
    /**
     * 热门游戏item
     */
    export class HotGameItem extends game.ListViewItem {
        gameIcon: cc.Sprite;
        gameName: cc.Label;
        /**游戏id */
        private gameId;
        onLoad(): void;
        updateItem(index: number, data: {
            game_id: number;
            icon_link: string;
            name: string;
        }, params?: any): void;
        /**跳转游戏 */
        private jumpToGame;
    }
    export class MenuBarCtrl {
        /**
         * ShowBackToHallBtn
         * 设置返回大厅按钮的显隐状态
         */
        SetBackBtnVisible(): void;
        /**
         * goBackToGameHall
         * 返回大厅
         */
        static goBackToGameHall(): void;
        static dialogOK(): void;
        /**
         * openHelpView
         * 打开帮助界面
         */
        openHelpView(): void;
        /**
         * openSetView
         * 打开设置界面
         */
        openSetView(): void;
        /**
         * createFriendRoom
         * 创建好友房间
         */
        createFriendRoom(): void;
        /**
         * openDataReport
         * 打开数据报表
         */
        openDataReport(): void;
    }
    export class LanguageTest extends game.LanguageComp {
        languageNames: string[];
        private _setLabelKey;
        setLabelKey: boolean;
        config: cc.JsonAsset;
        __preload(): void;
        /** 刷新多语言 */
        refresh(): void;
        /**设置图片key值 */
        setLabelItemKey(): void;
        /**设置图片key值 */
        setItemKey(): void;
        getLabelNode(node: cc.Node): void;
        getSprNode(node: any): void;
    }
    export class SceneIdMgr {
        private static _instance;
        private scenceId;
        private showLabel;
        static getInstance(): SceneIdMgr;
        constructor();
        /**
         * SceneIdMgr初始化
         */
        init(): void;
        /**
         * 销毁这个SceneIdMgr 的时候数据数据
         */
        destory(): void;
        private createLabel;
        private registerEvent;
        private removeEvent;
        private updateLabel;
        private enterRoom;
        private leaveRoom;
        /**
         * getSceneId 获取场景id
         */
        getSceneId(): string;
        /**
         * Show 展示和隐藏场景ID
         */
        display(show: boolean): void;
        updatePos(pos: cc.Vec2): void;
    }
    export class BaseRoleInfo extends game.View {
        protected headicon: cc.Node;
        protected nameLabel: cc.Label;
        protected lvLabel: cc.Label;
        protected userInfo: protoCommon.user_info;
        protected targetNode: cc.Node;
        protected targetOffsetVecPos: cc.Vec2;
        protected targetOffsetHorPos: cc.Vec2;
        /**
         * 初始化人物信息
         * @param args = {
         *  data :个人信息数据
         *  node ：目标节点（相对改节点位置偏移）
         *  vecPos : 竖屏位置  （如果设置了节点就不会自动做相对节点的偏移）
         *  horPos ： 横屏位置 （如果设置了节点就不会自动做相对节点的偏移）
         * }
         *
         */
        init(args: any): void;
        onLoad(): void;
        start(): void;
        onDestroy(): void;
        protected updateInfo(): void;
        protected setTargetNode(target: cc.Node): void;
        resize(): void;
        onclickClose(): void;
    }
    export class HeadItem extends cc.Component {
        iconId: number;
        isSelect: boolean;
        selectSp: cc.Node;
        init(headId: number, curId: number): void;
        onLoad(): void;
        start(): void;
        onDestroy(): void;
        private touchSelect;
        setSelectState(select: boolean): void;
        getItemId(): number;
    }
    export class HeadList extends game.UIView {
        headContent: cc.Node;
        headitem: cc.Prefab;
        rootNode: cc.Node;
        headNodelist: cc.Node[];
        curSelectHeadId: number;
        hasChange: boolean;
        /**
         * 初始化人物信息
         * @param args 参数值
         *
         */
        init(args: any): void;
        layout(): void;
        private registerEvent;
        private removeEvent;
        onLoad(): void;
        start(): void;
        onclickClose(): void;
        onclickOk(): void;
        onDestroy(): void;
        private removeAllchild;
        private listenMessHandle;
    }
    export class LevelUpTips extends game.View {
        levelLabel: cc.Label;
        spine: sp.Skeleton;
        jbLabel: cc.Label;
        readBtn: cc.Node;
        tweeNode: cc.Node;
        levelTargetPos: cc.Vec2;
        private isShow;
        private callBack;
        private result;
        private ticks;
        private aniText;
        private originPos;
        onLoad(): void;
        onOpen(uuid: number, data: any): void;
        layout(): void;
        private onShow;
        private onReadClick;
    }
        export class RewardBox extends game.UIView {
        boxSp: cc.Node;
        showLabel: cc.Label;
        clickBtn: cc.Node;
        nodeParam: RewardBoxParam;
        btnSprite: cc.Sprite;
        btnTextSprite: cc.Sprite;
        canClickbtn: boolean;
        btnDisableSprite: cc.Sprite;
        init(param: RewardBoxParam): void;
        onLoad(): void;
        start(): void;
        updateInfo(param: RewardBoxParam): void;
        private onclickCallback;
        private loadSpriteFrame;
        private setBtnPos;
        /**
         * 置按钮不可用 或者 隐藏， 置灰
         * @param acti  true 可见, false 不可见
         * @param isenable  true 正常颜色 false 灰色
         */
        setBtnState(acti: boolean, isenable: boolean): void;
        /**
         * 如果有 点击按钮后 改变了回调函数的 需求，可以调用这个
         * @param callFun  回调函数
         * @param target  回调函数对象
         */
        setBtnCallFun(callFun: Function, target: object): void;
    }
    export class RewardBoxAni extends game.UIView {
        spine: sp.Skeleton;
        coin: cc.Node;
        coinlab: cc.Label;
        rewardtype: number;
        score: number;
        onLoad(): void;
        init(score: number): void;
        start(): void;
        onDestroy(): void;
        protected updateInfo(): void;
        actionComplete(): void;
        stopAction(): void;
    }
            export class SelfRoleInfo extends BaseRoleInfo {
        protected curLvLabel: cc.Label;
        protected nextLvLabel: cc.Label;
        protected roleExpLabel: cc.Label;
        protected roleExp: cc.Node;
        protected rewardParent: cc.Node;
        protected growfunSwitch: boolean;
        protected expProess: cc.ProgressBar;
        private levelBox;
        private fundBox;
        private curSelectAvatar;
        private fundNode;
        private aniNode;
        private canClicklvbtn;
        private canClickfundbtn;
        private selfinfoBoxSize;
        init(args: protoCommon.user_info): void;
        private registerEvent;
        private removeEvent;
        onLoad(): void;
        onclickClose(): void;
        start(): void;
        onDestroy(): void;
        layout(): void;
        protected updateInfo(): void;
        private upUserData;
        protected setTargetNode(target: cc.Node): void;
        protected updateBoardPos(): void;
        protected setProgress(curexp: number, maxexp: number): void;
        /**
        * 切换到横屏
        */
        layoutLandscape(): void;
        /**
        * 切换到竖屏
        */
        layoutPortrait(): void;
        /**
        * 更新玩家信息 推送
        */
        private updateUserInfoPush;
        private clickChangeHead;
        private createRewarBox;
        private fundparam;
        private canClickbtn;
        private upFundReward;
        private grayAllChildren;
        private upFundFanLiInfo;
        private onclickCallback;
        /**
         * 加载资源创建礼盒
         * @param pos 礼盒的位置
         * @param nodeParam 礼盒参数
         */
        private loadRewardBox;
        /**
         * 领取个人等级奖励
         */
        private getLevelReward;
        /**
         * 领取成长基金奖励
         */
        private getGrowthFunReward;
        onClickReward(): void;
        /**
         * 查看成长基金奖励
         */
        private lookGrowthFunReward;
        /**
         * 跳转购买成长基金界面
         */
        private buyGrowthFunReward;
        /**
         * 监听  领取结果，购买，更换头像结果
         * @param mess 消息类型
         * @param data 数据
         * @param param 附加参数
         */
        private listenMessHandle;
        getLevelParam(level: number, btntype: number, btnstate: number): RewardBoxParam;
        getFundParam(level: number, isBuy: boolean, btntype: number, callback?: Function): RewardBoxParam;
        private getNextLevel;
        private updateRewardBox;
        private getBtnPos;
        private getSuccAni;
        clearAni(): void;
        onClose(): void;
    }
    export class LabelColor extends cc.Label {
        private _colors;
        colors: cc.Color[];
        protected _updateColor(): void;
    }
    export class core {
    }

}