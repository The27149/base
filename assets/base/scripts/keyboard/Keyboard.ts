import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import View from "../ui/View";
import { ComUtils } from "../utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Keyboard extends View {

    @property(cc.Node)
    verkey: cc.Node = null;

    @property(cc.Node)
    horkey: cc.Node = null;

    onLoad() {
        this.resize();
    }
    start() {

    }

    /**
     * 只要有屏幕尺寸改变就会调用 
     */
    layout(): void {
        let size = cc.director.getWinSize();
        if (ComUtils.checkHorOrVec()) {
            //let yrat = size.height / Const.ResDesignSize.height;
            let xrat = size.width / this.horkey.width;
            // let rate = yrat > xrat ? xrat : yrat;
            this.horkey.setScale(xrat);
        } else {
            //let yrat = size.height / Const.ResDesignSize.width;
            let xrat = size.width / this.verkey.width
            //let rate = yrat > xrat ? xrat : yrat;
            this.verkey.setScale(xrat);
        }
    }

    /**
     * 切换到横屏
     */
    layoutLandscape(): void {
        this.node.setContentSize(cc.size(1920, 350));
        this.verkey.active = false;
        this.horkey.active = true;
    }

    /**
    * 切换到竖屏
    */
    layoutPortrait(): void {
        this.node.setContentSize(cc.size(1920, 700));
        this.horkey.active = false;
        this.verkey.active = true;
    }

    onclick(event, customEventData): void {
        //console.log(event, customEventData);
        // if (customEventData == "ok") {
        //     UIManager.getInstance().close(this);
        // }
        EventManager.getInstance().raiseEvent(Const.mess_keyboard, customEventData);

    }
    // update (dt) {}
}
