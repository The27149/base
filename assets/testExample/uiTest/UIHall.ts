// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LogManager } from "../../base/scripts/log/LogManager";
import { ResUtils } from "../../base/scripts/res/ResUtils";
import TipsManager from "../../base/scripts/ui/TipsManager";
import { uiMgr } from "../../base/scripts/ui/UIManager";
import UIView from "../../base/scripts/ui/UIView";
import { IDialogCallBackTarget } from "../../base/scripts/ui/uiViews/UIDialog";
import { UIID } from "./UIExample";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIView {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    private gId: number = 0;

    public onChangeIcon() {
        uiMgr.open(UIID.UI_BAG);
    }

    public onBack() {
        uiMgr.open(UIID.UI_LOGIN);
    }

    public onDialog() {
        let tips = `This is test ${++this.gId}!`;
        let okCbTarget: IDialogCallBackTarget = {callback: this.dialogOK, target: this};
        let cancelCbTarget: IDialogCallBackTarget = {callback: this.dialogCancel, target: this};
        let onlyOKBtn = (this.gId % 2 == 0) ? false : true;
        TipsManager.getInstance().showDialog(tips, okCbTarget, cancelCbTarget, onlyOKBtn);
    }

    public dialogOK(data: any) {
        LogManager.getInstance().console(`dialogOK`);
        uiMgr.open(UIID.UI_BAG);
    }

    public dialogCancel(data: any) {
        LogManager.getInstance().console(`dialogCancel`);
    }

    public onTop(preId: number, spf: cc.SpriteFrame): void {
        if (cc.isValid(spf)) {
            this.icon.spriteFrame = ResUtils.assignWith(spf, this.icon.node);
        }
    }
}
