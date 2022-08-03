/**
 * 提示管理类
 */

import BaseUIConf, { BASEUIID } from "../config/BaseUIConf";
import { EventManager } from "../event/EventManager";
import { resLoader } from "../res/ResLoader";
import { uiMgr } from "./UIManager";
import { IDialogArgs, IDialogCallBackTarget } from "./uiViews/UIDialog";

const { ccclass, property } = cc._decorator;

// 提示附加参数
export interface ITipsArgs {
    startPos?: cc.Vec3;     // 飘字起始位，默认 (0, -150)
    endPos?: cc.Vec3;       // 飘字结束位，默认 (0, 0)
    fontSize?: number;      // 飘字字体大小，默认40
    showTime?: number;      // 飘字展示时间（s），默认2s
}

@ccclass
export default class TipsManager {

    private static _instance: TipsManager = null;
    private constructor() { }
    public static getInstance() {
        if (!this._instance) {
            this._instance = new TipsManager();
            this._instance.getTipBg();
        }
        return this._instance;
    }

    private _toastQueue: cc.Node[] = [];
    private _tipBg: cc.SpriteFrame = null;

    /**
     * 显示模态对话框
     * @param tips 提示文本
     * @param okCbTarget 确认回调
     * @param cancelCbTarget 取消回调
     * @param onlyOKBtn 是否只显示确认按钮
     * @param okCbSprFrame 确认文本资源名
     * @param cancelCbSprFrame 取消文本资源名
     */
    public showDialog(tips: string, okCbTarget?: IDialogCallBackTarget, cancelCbTarget?: IDialogCallBackTarget, onlyOKBtn?: boolean, hideCloseBtn?: boolean, tipsFontSize?: number, okCbSprFrame?: string, cancelCbSprFrame?: string) {
        EventManager.getInstance().raiseEvent("mess_loadingHide");
        let uiArgs: IDialogArgs = {
            tips: tips,
            okCbTarget: okCbTarget,
            cancelCbTarget: cancelCbTarget,
            onlyOKBtn: onlyOKBtn,
            hideCloseBtn: hideCloseBtn,
            tipsFontSize: tipsFontSize,
            cancelCbSprFrame: cancelCbSprFrame,
            okCbSprFrame: okCbSprFrame,
        }
        uiMgr.open(BASEUIID.UI_DIALOG, uiArgs);
    }

    // 隐藏模态对话框
    public hideDialog() {
        uiMgr.closeByUIID(BASEUIID.UI_DIALOG);
    }

    /**
     * 显示飘字提示
     * @param tips 提示文本
     * @param tipsArgs 提示附加参数
     */
    public showToast(tips: string, tipsArgs?: ITipsArgs): cc.Node {
        let node = this._createToast(tips, tipsArgs);
        if (node) {
            node.parent = cc.find('Canvas');
            node.zIndex = BaseUIConf.BASELAYER_TIPS + 2;
            this._toastQueue.push(node);

            let self = this;
            let onAniOver = function (target: cc.Node) {
                for (let i = 0; i < self._toastQueue.length; ++i) {
                    if (target == self._toastQueue[i]) {
                        self._toastQueue.splice(i, 1);
                        break;
                    }
                }
            }

            let startPos = cc.v3(0, -cc.winSize.height * 0.5, 0);
            let endPos = cc.v3(0, -cc.winSize.height * 0.5 + 100, 0);
            let delayTime = 2;
            if (tipsArgs) {
                if (tipsArgs.startPos) startPos = tipsArgs.startPos;
                if (tipsArgs.endPos) endPos = tipsArgs.endPos;
                if (tipsArgs.showTime) delayTime = tipsArgs.showTime;
            }
            node.setPosition(startPos);

            cc.tween(node)
                .to(0.2, { position: endPos }, { easing: 'sineIn' })
                .delay(delayTime)
                .to(1, { opacity: 0 }, { easing: 'sineIn' })
                .removeSelf()
                .call(onAniOver)
                .start()
        }

        return node;
    }

    /**
     * 隐藏飘字提示
     * @param target 飘字节点，不填则隐藏全部
     */
    public hideToast(target?: cc.Node) {
        if (target) {
            cc.Tween.stopAllByTarget(target);
            target.destroy();
        } else {
            for (let i = 0; i < this._toastQueue.length; ++i) {
                let target = this._toastQueue[i];
                cc.Tween.stopAllByTarget(target);
                target.destroy();
            }
            this._toastQueue.length = 0;
        }
    }

    private _createToast(tips: string, tipsArgs?: ITipsArgs) {
        //父节点
        let parent = new cc.Node("parent");
        //背景
        let bgnode = new cc.Node("tipbg");
        let sprite = bgnode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.getTipBg();
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //字体
        let node = new cc.Node('toast');
        let lab = node.addComponent(cc.Label);
        lab.overflow = cc.Label.Overflow.NONE;
        lab.string = tips;
        lab.fontSize = 20;
        lab.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lab.verticalAlign = cc.Label.VerticalAlign.CENTER;
        if (tipsArgs && tipsArgs.fontSize) lab.fontSize = tipsArgs.fontSize;
        lab.lineHeight = lab.fontSize + 2;
        lab["_forceUpdateRenderData"]();   //提示报错，运行起来正常，强制刷新更改宽度
        let size = node.getContentSize();
        bgnode.setContentSize(cc.size(size.width * 1.5, size.height * 1.2));
        parent.addChild(bgnode);
        parent.addChild(node);

        return parent;
    }


    //获取提示背景spritesframe
    private getTipBg(): cc.SpriteFrame {
        if (!cc.isValid(this._tipBg)) {
            resLoader.loadRes('textures/tips_bottom', cc.SpriteFrame, (err: Error, asset: cc.SpriteFrame) => {
                if (!err) this._tipBg = asset;
            }, 'base', "tipToast");
        }
        return this._tipBg;
    }

}
