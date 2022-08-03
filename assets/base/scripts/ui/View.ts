import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import { ComUtils } from "../utils/ComUtils";
import UIView from "./UIView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class View extends UIView {

    private isLandscape: boolean = false;
    protected resize() {

        this.isLandscape = ComUtils.checkHorOrVec();
        this.setLayout();
        this.layout();
        if (this.node.getComponent(cc.Layout)) {
            this.node.getComponent(cc.Layout).updateLayout();
        }

        if (this.node.getComponent(cc.Widget)) {
            this.node.getComponent(cc.Widget).updateAlignment();
        }

        EventManager.getInstance().addEventListener(Const.mess_windowResize, this.onResize, this);

    }

    private onResize(): void {
        this.upResize();
    }

    private upResize(): void {
        if (this.isLandscape != ComUtils.checkHorOrVec()) {
            this.isLandscape = ComUtils.checkHorOrVec();
            this.setLayout();
        }
        this.layout();
    }

    private setLayout(): void {
        if (this.isLandscape) {
            this.layoutLandscape();
        } else {
            this.layoutPortrait();
        }
    }

    onDestroy(): void {
        super.onDestroy();
        EventManager.getInstance().removeEventListener(Const.mess_windowResize, this.onResize, this);

    }

    /**
     * 只要有屏幕尺寸改变就会调用 
     */
    layout(): void {

    }

    /**
     * 切换到横屏
     */
    layoutLandscape(): void {

    }

    /**
    * 切换到竖屏
    */
    layoutPortrait(): void {

    }
}