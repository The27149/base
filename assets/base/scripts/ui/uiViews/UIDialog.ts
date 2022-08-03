// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AutoTest, { BaseAutoTestKey, IAutoTestData } from "../../autoTest/AutoTest";
import Global from "../../global/Global";
import LanguageManager from "../../language/LanguageManager";
import SoundManager from "../../sound/SoundManager";
import { ComUtils } from "../../utils/ComUtils";
import { IUIArgs, uiMgr } from "../UIManager";
import UIView from "../UIView";
import View from "../View";

const { ccclass, property } = cc._decorator;

// 模态对话框回调目标
export interface IDialogCallBackTarget {
    callback: (data: any) => void,
    target?: any,
}

// 模态对话框打开参数
export interface IDialogArgs {
    tips?: string;                              // 显示文本
    okCbTarget?: IDialogCallBackTarget;         // 确认回调
    cancelCbTarget?: IDialogCallBackTarget;     // 取消回调
    onlyOKBtn?: boolean;                        // 是否只显示确认按钮
    hideCloseBtn?: boolean;                      // 是否隐藏关闭按钮 在只显示确认按钮情况下关闭按钮会隐藏，此参数失效
    tipsFontSize?: number;                       //文本的字体大小
    cancelCbSprFrame: string;                     //确认文本资源名
    okCbSprFrame: string;            //取消文本资源名
}

@ccclass
export default class UIDialog extends View {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    btnOK: cc.Node = null;

    @property(cc.Node)
    btnCancel: cc.Node = null;

    @property(cc.Sprite)
    btnOKSpr: cc.Sprite = null;

    @property(cc.Sprite)
    btnCancelSpr: cc.Sprite = null;

    @property(cc.Label)
    labTips: cc.Label = null;

    private _okCbTarget: IDialogCallBackTarget = null;
    private _cancelCbTarget: IDialogCallBackTarget = null;
    private _btnOK_x: number = 0;       // ok按钮在预制中的原始坐标x

    public onLoad() {
        this._btnOK_x = this.btnOK.x;
        let testData: IAutoTestData = { target: this.btnOK };
        AutoTest.getInstance().setAutoTestData(BaseAutoTestKey.BASE_BTN_DIALOG_OK, testData);
        testData = { target: this.btnCancel };
        AutoTest.getInstance().setAutoTestData(BaseAutoTestKey.BASE_BTN_DIALOG_CANCEL, testData);
        super.resize();
    }

    layout() {
        let size = cc.winSize;
        let scale = 1;
        let root = this.node.getChildByName("root");
        if (!ComUtils.checkHorOrVec()) {
            scale = (size.width / root.width) - 0.2;
        }
        root.setScale(scale, scale);
    }

    public onOpen(fromUI: number, ...args: any[]): void {
        let uiArgs: IDialogArgs = args[0];
        if (uiArgs.tips) this.labTips.string = uiArgs.tips;
        this.labTips.fontSize = uiArgs.tipsFontSize || 45;
        this.labTips.lineHeight = this.labTips.fontSize + 2;
        this._okCbTarget = uiArgs.okCbTarget;
        this._cancelCbTarget = uiArgs.cancelCbTarget;
        this.btnClose.active = !uiArgs.hideCloseBtn;
        if (uiArgs.onlyOKBtn) {
            this.btnOK.active = true;
            this.btnCancel.active = false;
            this.btnOK.x = 0;
            this.btnClose.active = false;
        } else {
            this.btnOK.active = true;
            this.btnCancel.active = true;
            this.btnOK.x = this._btnOK_x;
        }
        //设置按钮文本
        if (this.btnCancelSpr) {
            let cancelCbSprFrame = uiArgs.cancelCbSprFrame ? uiArgs.cancelCbSprFrame : ("quxiao_text" + Global.skinId);
            LanguageManager.getInstance().setSpriteFrame(cancelCbSprFrame, this.btnCancelSpr);
        }
        //设置按钮文本
        if (this.btnOKSpr) {
            let okCbSprFrame = uiArgs.okCbSprFrame ? uiArgs.okCbSprFrame : ("queding_text" + Global.skinId);
            LanguageManager.getInstance().setSpriteFrame(okCbSprFrame, this.btnOKSpr);
        }
    }

    // 确认回调
    public onOK() {
        SoundManager.getInstance().playBtnSound();
        uiMgr.close(this);
        if (this._okCbTarget) {
            let callback = this._okCbTarget.callback;
            let target = this._okCbTarget.target;
            if (target) {
                callback.call(target, null);
            } else {
                callback(null);
            }
        }
    }

    // 取消回调
    public onCancel() {
        SoundManager.getInstance().playBtnSound();
        uiMgr.close(this);
        if (this._cancelCbTarget) {
            let callback = this._cancelCbTarget.callback;
            let target = this._cancelCbTarget.target;
            if (target) {
                callback.call(target, null);
            } else {
                callback(null);
            }
        }
    }

    public onEnable() {
        this._registerEvent();
    }

    public onDisable() {
        this._unRegisterEvent();
    }

    private _registerEvent() {
        this.btnOK.on(cc.Node.EventType.TOUCH_END, this.onOK, this);
        this.btnCancel.on(cc.Node.EventType.TOUCH_END, this.onCancel, this);
        this.btnClose.on(cc.Node.EventType.TOUCH_END, this.onCancel, this);
    }

    private _unRegisterEvent() {
        this.btnOK.off(cc.Node.EventType.TOUCH_END, this.onOK, this);
        this.btnCancel.off(cc.Node.EventType.TOUCH_END, this.onCancel, this);
        this.btnClose.off(cc.Node.EventType.TOUCH_END, this.onCancel, this);
    }
}
