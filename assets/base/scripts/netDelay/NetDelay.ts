import { Utils } from "../common/Utils";
import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import View from "../ui/View";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NetDelay extends View {

    @property(cc.Label)
    delayLabel: cc.Label = null;

    timeout: number = 0;
    widgetData: any = null;
    private static _instance: NetDelay = null;
    public static getInstance(): NetDelay {
        return this._instance;
    }

    onLoad() {
        NetDelay._instance = this;
        EventManager.getInstance().addEventListener(Const.mess_delayshow, this.UpdateDelayShow, this);
        this.delayLabel.node.color = cc.Color.GREEN;
        // this.node.getComponent(cc.Widget).target = cc.Canvas.instance.node;
        this.node.active = false;
        //防止初始布局不生效，延迟显示
        this.timeout = setTimeout(() => {
            this.node.active = true;
            this.layout();
        }, 5000);
        super.resize();
    }

    /**
     * 
     * @param data 配置数据(例: { "top": 180, "left": 50 }或{"landscape": { "top": 180, "left": 50 }, "portrait": { "top": 860, "left": 50 }}, "horizontalCenter":0, "verticalCenter":0 })
     * @param point x,y的配置，如果配置了，widget不会生效
     */
    setWidget(data: any, point?: cc.Vec2) {
        this.widgetData = data;
        this.layout();
        if (point) {
            this.node.y = point.y;
            this.node.x = point.x;
        }
    }

    layout() {
        if (this.widgetData) {
            Utils.setWidget(this.node, this.widgetData);
        } else {
            Utils.setWidget(this.node, { "top": 0, "right": 250 });
        }
    }

    start() {
    }

    onDestroy() {
        EventManager.getInstance().removeEventListener(Const.mess_delayshow, this.UpdateDelayShow, this);
        super.onDestroy();
        clearTimeout(this.timeout);
    }

    /**
     * 显示延迟
     *
     * @memberof PowerAndSignalLayer
     */
    UpdateDelayShow(mess: string, delay: number) {
        if (!delay) {
            return;
        }
        this.delayLabel.string = delay + "ms";
        if (delay < 100) {
            this.delayLabel.node.color = cc.Color.GREEN;
        } else if (delay >= 100 && delay <= 150) {
            this.delayLabel.node.color = cc.Color.YELLOW;
        } else if (delay > 150 && delay <= 250) {
            this.delayLabel.node.color = cc.Color.ORANGE;
        } else if (delay > 250) {
            this.delayLabel.node.color = cc.Color.RED;
        }
    }

    // update (dt) {}
}
