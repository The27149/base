// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIManager, { uiMgr } from "../../base/scripts/ui/UIManager";
import UIView from "../../base/scripts/ui/UIView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBag extends UIView {

    @property([cc.Sprite])
    iconList: cc.Sprite[] = [];

    private selectNode: cc.Node = null;
    private selectItem: cc.SpriteFrame = null;

    start() {
        let resArr = ['textures/Stalker', 'autoAtlas/FlatOut', 'autoAtlas/NOD']
        this.loadRes(resArr, cc.SpriteFrame, (err: Error, assets: cc.SpriteFrame[]) => {
            for (let i = 0; i < assets.length; ++i) {
                this.iconList[i].spriteFrame = assets[i];
            }
        }, 'resources');
    }

    public onClick(event: cc.Event.EventTouch) {
        if (this.selectNode) this.selectNode.setScale(1);

        let node: cc.Node = event.target;
        this.selectNode = node;
        this.selectNode.setScale(1.5);
    }

    public onOKClick() {
        if (this.selectNode) this.selectItem = this.selectNode.getComponent(cc.Sprite).spriteFrame;
        uiMgr.close();
    }

    public onClose() {
        return this.selectItem;
    }
}
