// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Combox from "../../base/scripts/customNode/Combox";
import ListView, { IListViewArgs, IListViewCallback, ListViewEvent } from "../../base/scripts/customNode/ListView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Entrance extends cc.Component {

    private len: number = 10;

    start () {
        cc.assetManager.loadBundle('base', (err: Error, bundle: cc.AssetManager.Bundle) => {
            if (err) {
                console.log(err);
                return;
            }

            let listView = cc.find('Canvas/ListView').getComponent(ListView);
            let combox = cc.find('Canvas/Combox').getComponent(Combox);
            let arr = [];
            for (let i = 0; i < 30; ++i) {
                arr.push(i);
            }

            let cbTarget: IListViewCallback = { callback: this.listViewEvent, target: this };
            let args: IListViewArgs = { list: arr, eventCb: cbTarget }
            listView.init(args);
            this.len = arr.length;

            combox.init(args);
        });
    }

    listViewEvent(sender: any, event) {
        switch(event) {
            case ListViewEvent.DATA_RUNOUT:
                if (this.len <= 30) {
                    let listView = cc.find('Canvas/ListView').getComponent(ListView);
                    let arr = [];
                    for (let i = 30; i < 50; ++i) {
                        arr.push(i);
                    }
                    listView.addDataList(arr);
                    this.len += arr.length;
                }
                break;
        }
    }

    // update (dt) {}
    onBtnClick() {
        let listView = cc.find('Canvas/ListView').getComponent(ListView);
        let combox = cc.find('Canvas/Combox').getComponent(Combox);

        // let editbox = cc.find('Canvas/EditBox').getComponent(cc.EditBox);
        // let boxStr = editbox.string;
        // if (boxStr) {
        //     let index = parseInt(boxStr) || 0;
        //     listView.scrollToItem(index);
        // }

        combox.showDropBox();
    }
}
