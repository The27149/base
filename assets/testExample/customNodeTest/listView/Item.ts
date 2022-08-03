// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ListViewItem from "../../../base/scripts/customNode/ListViewItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends ListViewItem {

    public updateItem(index: number, data: any) {
        super.updateItem(index, data);
        this.node.getComponentInChildren(cc.Label).string = data;
    }
}
