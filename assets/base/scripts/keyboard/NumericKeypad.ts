
const { ccclass, property } = cc._decorator;

@ccclass
export default class NumericKeypad extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    private isFocus: boolean = false;
    onLoad() {
        if (!this.label) this.label = this.node.getComponent(cc.Label);
        this.addEvent();
    }

    private addEvent(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onFocus, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    private onFocus(): void {
        this.isFocus = true;
    }

    private onKeyDown(event: cc.Event.EventKeyboard): void {
        if (!this.isFocus) return;
        let key: string;
        cc.log("onKeyDown====", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.num0:
            case cc.macro.KEY["0"]:
                key = '0';
                break;
            case cc.macro.KEY.num1:
            case cc.macro.KEY["1"]:
                key = '1';
                break;
            case cc.macro.KEY.num2:
            case cc.macro.KEY["2"]:
                key = '2';
                break;
            case cc.macro.KEY.num3:
            case cc.macro.KEY["3"]:
                key = '3';
                break;
            case cc.macro.KEY.num4:
            case cc.macro.KEY["4"]:
                key = '4';
                break;
            case cc.macro.KEY.num5:
            case cc.macro.KEY["5"]:
                key = '5';
                break;
            case cc.macro.KEY.num6:
            case cc.macro.KEY["6"]:
                key = '6';
                break;
            case cc.macro.KEY.num7:
            case cc.macro.KEY["7"]:
                key = '7';
                break;
            case cc.macro.KEY.num8:
            case cc.macro.KEY["8"]:
                key = '8';
                break;
            case cc.macro.KEY.num9:
            case cc.macro.KEY["9"]:
                key = '9';
                break;
            case cc.macro.KEY["."]:
                key = '.';
                break;
            case cc.macro.KEY.backspace:

                break;

            default:
                break;
        }
        if (key) this.onEditBoxChanged(key);
    }

    public onEditBoxChanged(key: string) {

        let str = this.label.string;
        str += key;
        this.label.string = str;
    }

    public onBackspace(): void {
        let len = this.label.string.length;
    }
}
