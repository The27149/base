// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ComboxItem from "../../../base/scripts/customNode/ComboxItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CbItem extends ComboxItem {

    public updateItem(index: number, data: any, ...args: any[]) {
        super.updateItem(index, data, ...args);
        this.getComponent(cc.Label).string = data;
    }
}
