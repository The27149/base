// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { uiMgr } from "../../base/scripts/ui/UIManager";
import UIView from "../../base/scripts/ui/UIView";
import { UIID } from "./UIExample";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILogin extends UIView {

    // 点击登录按钮
    public onLogin() {
        uiMgr.replace(UIID.UI_HALL);
    }

    public onIntro() {
        uiMgr.open(UIID.UI_INTRO);
    }
}
