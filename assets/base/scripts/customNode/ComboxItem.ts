/**
 * 下拉组合框子项
 */

import SoundManager from "../sound/SoundManager";
import ListViewItem from "./ListViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ComboxItem extends ListViewItem {

    start() {
        this._registerEvent();
    }

    protected _itemOnTouch(event: cc.Event.EventTouch) {
        SoundManager.getInstance().playBtnSound();
        if (this._target) this._target.selItem(this._index, this._data, true);
    }

    protected _registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._itemOnTouch, this);
    }

    protected _unRegisterEvent() {
        this.node.off(cc.Node.EventType.TOUCH_END, this._itemOnTouch, this);
    }

    public onDestroy() {
        this._unRegisterEvent();
    }
}
