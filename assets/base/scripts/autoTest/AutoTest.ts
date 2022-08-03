import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import { LogManager } from "../log/LogManager";
import CommonProto from "../network/CommonProto";
import { NodeUtils } from "../utils/NodeUtils";

/**
 * 自动测试key(节点、方法)
 * @param BASE_BTN_DIALOG_OK 对话框确认按钮
 * @param BASE_BTN_DIALOG_CANCEL 对话框取消按钮
 * @param BASE_FUNC_GETUSERINFO 获取用户信息
 */
export enum BaseAutoTestKey {
    BASE_BTN_DIALOG_OK = 'BASE_BTN_DIALOG_OK',
    BASE_BTN_DIALOG_CANCEL = 'BASE_BTN_DIALOG_CANCEL',

    BASE_FUNC_GETUSERINFO = 'BASE_FUNC_GETUSERINFO',
}

/**
 * 自动测试错误码
 * @param ERR_NONE 无错误
 * @param ERR_KEYNOTFOUND 键值未配置
 * @param ERR_KEYDATANOTNODE 键值数据非节点
 * @param ERR_NODENOTFOUND 节点未找到
 * @param ERR_NODEINVALID 节点无效
 * @param ERR_UNDEFINEATTR 未定义属性
 * @param ERR_UNDEFEXECFUNC 未定义执行函数
 * @param ERR_KEYDATANOTEXECFUNC 键值数据非可执行函数
 */
export enum AutoTestErrorCode {
    ERR_NONE = 0,
    ERR_KEYNOTFOUND,
    ERR_KEYDATANOTNODE,
    ERR_NODENOTFOUND,
    ERR_NODEINVALID,
    ERR_UNDEFINEATTR,
    ERR_UNDEFEXECFUNC,
    ERR_KEYDATANOTEXECFUNC,
}

/**
 * 自动测试错误描述
 */
const autoTestErrMsg = {
    [AutoTestErrorCode.ERR_NONE]: "无错误",
    [AutoTestErrorCode.ERR_KEYNOTFOUND]: "键值未配置",
    [AutoTestErrorCode.ERR_KEYDATANOTNODE]: "键值数据非节点",
    [AutoTestErrorCode.ERR_NODENOTFOUND]: "节点未找到",
    [AutoTestErrorCode.ERR_NODEINVALID]: "节点无效",
    [AutoTestErrorCode.ERR_UNDEFINEATTR]: "未定义属性",
}

/**
 * 自动测试属性码
 * @param ATTR_ACTIVE 节点是否激活、可见
 * @param ATTR_INTERACTIVE 节点是否可交互
 * @param ATTR_POSITION_WORLD 节点位置(世界坐标)
 * @param ATTR_TEXT 节点展示文本
 */
export enum AutoTestAttrCode {
    ATTR_ACTIVE = 1,
    ATTR_INTERACTIVE,
    ATTR_POSITION_WORLD,
    ATTR_TEXT,
}

/**
 * 自动测试错误
 * @param code 错误码
 * @param msg 错误描述
 */
export interface IAutoTestError {
    code: AutoTestErrorCode;
    msg?: string;
}

/**
 * 接口返回值
 */
export interface IAutoTestRet {
    err?: IAutoTestError;
    result: any;
};

/**
 * 自动测试存储数据
 * @param target 目标（cc.Node、回调函数绑定对象）
 * @param execFunc 回调函数
 */
export interface IAutoTestData {
    target?: any;
    execFunc?: any;
}

/**
 * 局部变量，防止导出至外部使用
 */
var _testing: boolean = false;      // 测试中
var _loginRet: boolean = false;     // 登录请求已返回

export default class AutoTest {

    private static _instance: AutoTest = null;
    private constructor() {
        EventManager.getInstance().addEventListener(Const.mess_loginSucc, this._enterLoginSuccess, this);
    }
    public static getInstance() {
        if (!this._instance) {
            this._instance = new AutoTest();
        }
        return this._instance;
    }

    private _dataMap: Map<string, IAutoTestData> = new Map<string, IAutoTestData>();    // 数据map

    private _enterLoginSuccess() {
        let gameSwitch = CommonProto.getInstance().gameSwitch;
        if (gameSwitch && gameSwitch.gm) {
            _testing = true;
        }
        _loginRet = true;

        let getUserInfo = () => { return CommonProto.getInstance().userinfo };
        let testData: IAutoTestData = { execFunc: getUserInfo }
        this.setAutoTestData(BaseAutoTestKey.BASE_FUNC_GETUSERINFO, testData);
    }

    private _generateError(key: string, attrCode: AutoTestAttrCode, ret: IAutoTestRet, errCode: AutoTestErrorCode) {
        ret.err = { code: errCode };
        ret.err.msg = `key = ${key}, attrCode = ${attrCode} | `,
            ret.err.msg += autoTestErrMsg[errCode];
    }

    /**
     * 设置键值对
     * @param key string
     * @param data 数据
     */
    public setAutoTestData(key: string, data: IAutoTestData) {
        if (!_testing && _loginRet) return;

        // let oldData = this._dataMap.get(key);
        // if (oldData) {
        //     console.log(`setAutoTestData() - 键值已存在，key = ${key}`);
        // }

        this._dataMap.set(key, data);
    }

    // 重置键值对数据
    public resetAutoTestData() {
        this._dataMap.clear();
    }

    /**
     * 获取key绑定节点属性
     * @param key string
     * @param attrCode 属性码
     */
    public getNodeAttribute(key: string, attrCode: AutoTestAttrCode): string {
        let ret: IAutoTestRet = { result: null };
        if (!_testing) return;

        let data = this._dataMap.get(key);
        if (!data) {
            this._generateError(key, attrCode, ret, AutoTestErrorCode.ERR_KEYNOTFOUND);
            return JSON.stringify(ret);
        }
        let target = data.target;
        let execFunc = data.execFunc;

        if (execFunc) {
            this._generateError(key, attrCode, ret, AutoTestErrorCode.ERR_KEYDATANOTNODE);
            return JSON.stringify(ret);
        } else if (!target) {
            this._generateError(key, attrCode, ret, AutoTestErrorCode.ERR_NODENOTFOUND);
            return JSON.stringify(ret);
        } else if (!cc.isValid(target)) {
            this._generateError(key, attrCode, ret, AutoTestErrorCode.ERR_NODEINVALID);
            return JSON.stringify(ret);
        }

        switch (attrCode) {
            case AutoTestAttrCode.ATTR_ACTIVE:
                // 节点是否激活、可见
                ret.result = target.active;
                break;
            case AutoTestAttrCode.ATTR_INTERACTIVE:
                ret.result = false;
                let listerners = target._touchListener;
                if (listerners) ret.result = true;
                break;
            case AutoTestAttrCode.ATTR_POSITION_WORLD:
                let wp = target.parent.convertToWorldSpaceAR(target.position);
                ret.result = wp;
                break;
            case AutoTestAttrCode.ATTR_TEXT:
                let comp = null;
                if (!comp) {
                    comp = target.getComponent(cc.Label);
                    if (comp) ret.result = comp.string;
                }

                if (!comp) {
                    comp = target.getComponent(cc.EditBox);
                    if (comp) ret.result = comp.string;
                }

                break;
            default:
                this._generateError(key, attrCode, ret, AutoTestErrorCode.ERR_UNDEFINEATTR);
                break;
        }

        return JSON.stringify(ret);
    }

    /**
     * 执行key绑定函数
     * @param key 与函数绑定的键值
     * @param args 可变参数
     */
    public execKeyFunc(key: string, ...args: any[]): string {
        let ret: IAutoTestRet = { result: null };
        let data = this._dataMap.get(key);
        if (data) {
            if (data.execFunc) {
                if (typeof data.execFunc == 'function') {
                    if (data.target) {
                        ret.result = data.execFunc.apply(data.target, args);
                    } else {
                        ret.result = data.execFunc(args);
                    }
                } else {
                    this._generateError(key, -1, ret, AutoTestErrorCode.ERR_KEYDATANOTEXECFUNC);
                }

            } else {
                this._generateError(key, -1, ret, AutoTestErrorCode.ERR_UNDEFEXECFUNC);
            }
        } else {
            this._generateError(key, -1, ret, AutoTestErrorCode.ERR_KEYNOTFOUND);
        }

        return JSON.stringify(ret);
    }

    /**
     * 点击key绑定节点
     * @param key 节点对应键值
     */
    public clickNode(key: string) {
        if (!_testing) return;

        let data = this._dataMap.get(key);
        if (data) {
            let target = data.target;
            if (target instanceof cc.Node) {
                if (cc.isValid(target)) {
                    NodeUtils.simulation_clickNode(target);
                } else {
                    LogManager.getInstance().console(`键值对应节点无效，key = ${key}`);
                }
            }
        } else {
            LogManager.getInstance().console(`键值数据不存在，key = ${key}`);
        }
    }

    /**
     * 模拟点击
     * @param x 世界坐标系x
     * @param y 世界坐标系y
     * @param duration 按下至抬起的间隔时间（ms）
     */
    public click(x: number, y: number, duration?: number) {
        if (!_testing) return;
        NodeUtils.simulation_click(x, y, duration);
    }

    /**
     * 滑动屏幕
     * @param startPos 开始世界坐标
     * @param endPos 结束世界坐标
     * @param duration 历时（ms）
     */
    public touchMove(startPos: cc.Vec2, endPos: cc.Vec2, duration?: number) {
        if (!_testing) return;
        NodeUtils.simulation_touchMove(startPos, endPos, duration);
    }

    /**
     * 发送gm命令
     * @param cmdStr 命令
     */
    public gmSend(cmdStr: string) {
        if (!_testing) return;
        CommonProto.getInstance().GMSend(cmdStr);
    }
}

window['autoTest'] = AutoTest.getInstance();