import LanguageManager from "../language/LanguageManager";

/**
 * 人物
  * 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class RoleSideSayCtrl extends cc.Component {
    @property(cc.Node)
    nodeLeft: cc.Node = null;

    @property(cc.Label)
    labelLeft: cc.Label = null;

    @property(cc.Node)
    nodeRight: cc.Node = null;

    @property(cc.Label)
    labelRight: cc.Label = null;

    start() {

    }

    /**
     * set side and key
     * @param isLeft is left
     * @param key 
     * @returns 
     */
    public setSayWordSide(isLeft: boolean = true, key = 'binance_hash157') {
        this.nodeLeft.stopAllActions();
        this.nodeRight.stopAllActions();

        this.nodeLeft.active = isLeft;
        this.nodeRight.active = !isLeft;
        let label = isLeft ? this.labelLeft : this.labelRight;
        label.string = LanguageManager.getInstance().getDstStr(key);
        label.node.parent.height = label.node.height + 25
        this.sayForever(isLeft ? this.nodeLeft : this.nodeRight);
    }

    private sayForever(node: cc.Node) {
        node.stopAllActions();
        node.scale = 0;
        cc.tween(node)
            .delay(1)
            .repeat(99999,
                cc.tween(node)
                    .to(0.5, { scale: 1 }, { easing: 'sineOut' })
                    .delay(3)
                    .to(0, { scale: 0 })
                    .delay(3)
            )
            .start();
    }
}
