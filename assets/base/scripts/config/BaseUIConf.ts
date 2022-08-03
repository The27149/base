/**
 * UI界面配置
 */

import { IUIConf } from "../ui/UIManager";
import { UIShowTypes } from "../ui/UIView";

/**
 * UIID(base库 0-199，core库 200-399，slot库 400-599，hunter库 600-799，arcade库 800-999，子项目 >= 1000)
 * @param UI_DIALOG 模态对话框
 */
export enum BASEUIID {
    UI_DIALOG,
    UI_KEYBOARD,
}

export default class BaseUIConf {

    private static _instance: BaseUIConf = null;
    private _uicf: { [key: number]: IUIConf } = null;
    public static getInstance(): BaseUIConf {
        if (!this._instance) {
            this._instance = new BaseUIConf();
        }
        return this._instance;
    }

    // 大方向层级定义(游戏层、ui层、特效层、loading层、提示层)
    public static BASELAYER_BG: number = 0;
    public static BASELAYER_GAME: number = 100;
    public static BASELAYER_UI: number = 200;
    public static BASELAYER_EFFECT: number = 300;
    public static BASELAYER_LOADING: number = 400;
    public static BASELAYER_TIPS: number = 500;

    /**
     * 合并配置至该处
     * @param conf 
     */
    public mergeUIConf(conf: { [key: number]: IUIConf }) {
        for (let key in conf) {
            this._uicf[key] = conf[key];
        }
    }

    public getUICF() {
        return this._uicf;
    }

    private constructor() {
        this._uicf = {
            [BASEUIID.UI_DIALOG]: { bundleName: 'base', path: 'prefabs/uiViews/UIDialog', cache: true, preventTouch: true, showType: UIShowTypes.UI_ADDITION },
            [BASEUIID.UI_KEYBOARD]: { bundleName: 'base', path: '/prefabs/keyboard/keyboard', showType: UIShowTypes.UI_ADDITION },
        }
    }
}
