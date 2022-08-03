/**
 * 下拉组合框组件
 */

import BaseUIConf from "../config/BaseUIConf";
import ListView, { IListViewArgs } from "./ListView";
import ListViewItem from "./ListViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Combox extends cc.Component {

    @property(cc.Label)
    curSel: cc.Label = null;

    @property(cc.Prefab)
    dropBoxTemplate: cc.Prefab = null;

    @property(cc.Node)
    btnDrop: cc.Node = null;

    // 当前选择索引
    protected _curSelIndex: number = 0;
    public get curSelIndex() { return this._curSelIndex; }
    // 当前选择数据
    protected _curSelData: any = null;
    public get curSelData() { return this._curSelData; }
    // 选择完成回调
    private _selCb: Function = null;

    // 下拉框相对于该组件根节点偏移量
    private _offsetX: number = 0;
    private _offsetY: number = 0;

    // 遮罩层
    private _preventNode: cc.Node = null;
    // 下拉框（动态创建并添加至 Canvas 节点）
    public dropBox: ListView = null;

    public start() {
        this._registerEvent();
    }

    protected _registerEvent() {
        this.btnDrop.on(cc.Node.EventType.TOUCH_END, this._btnDropOnTouch, this);
    }

    protected _unRegisterEvent() {
        this.btnDrop.off(cc.Node.EventType.TOUCH_END, this._btnDropOnTouch, this);
    }

    // 设置下拉框偏移量
    public setDropBoxOffset(x: number, y: number) {
        this._offsetX = x;
        this._offsetY = y;
    }

    // 初始化
    public init(args: IListViewArgs, selCallback?: Function) {
        if (selCallback) this._selCb = selCallback;
        if (!this.dropBox) {
            let node = cc.instantiate(this.dropBoxTemplate);
            let parent = cc.find('Canvas');
            parent.addChild(node, BaseUIConf.BASELAYER_EFFECT + 1);
            this.dropBox = node.getComponent(ListView);
        }
        this.dropBox.init(args);
        this._bindTarget();
        this.hideDropBox();
    }

    // 绑定 Combox 与 ComboxItem
    protected _bindTarget() {
        let itemList = this.dropBox.getItemList();
        for (let i = 0; i < itemList.length; ++i) {
            itemList[i].getComponent(ListViewItem).bindTarget(this);
        }
    }

    /**
     * 选择item
     * @param index 索引
     * @param data 数据
     * @param manual 是否手动选择
     */
    public selItem(index: number, data?: any, manual?: boolean) {
        this._curSelIndex = index;
        if (data == undefined) data = this.dropBox.getDataList()[index];
        this._curSelData = data;
        this.hideDropBox();
        if (this._selCb) this._selCb(index, data, manual);
    }

    // 展示下拉框
    public showDropBox() {
        if (!this.dropBox) return;
        if (!this._preventNode) this._preventNode = this._preventTouch(BaseUIConf.BASELAYER_EFFECT);
        let wp = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let np = cc.find('Canvas').convertToNodeSpaceAR(wp);
        this.dropBox.node.x = np.x + this._offsetX;
        this.dropBox.node.y = np.y + this._offsetY;
        this.dropBox.node.active = true;
        this._preventNode.active = true;
    }

    // 收起下拉框
    public hideDropBox() {
        if (this.dropBox) this.dropBox.node.active = false;
        if (this._preventNode) this._preventNode.active = false;
    }

    protected _btnDropOnTouch(event: cc.Event.EventTouch) {
        if (this.dropBox.node.active) {
            this.hideDropBox();
        } else {
            this.showDropBox();
        }
    }

    public onDestroy() {
        if (cc.isValid(this._preventNode)) {
            this._preventNode.destroy();
            this._preventNode = null;
        }
        this._unRegisterEvent();
    }

    /**
     * 添加防触摸层
     * @param zOrder 屏蔽层层级
     */
    private _preventTouch(zOrder: number) {
        let node = new cc.Node();
        node.x = 0;
        node.y = 0;
        node.name = 'preventTouch';
        node.setContentSize(cc.size(10000, 10000));

        let self = this;
        node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            event.stopPropagation();
            self.hideDropBox();
        }, node);
        let parent = cc.find('Canvas');
        parent.addChild(node, zOrder);
        return node;
    }
}
