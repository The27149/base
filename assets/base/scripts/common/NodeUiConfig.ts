const { ccclass, property } = cc._decorator;

@ccclass
export default class NodeUiConfig extends cc.Component {
    @property({
        tooltip: "是否记录node节点的active属性，默认不勾选，需要控制手动勾选",
    })
    controlActive: boolean = false;

    @property({
        tooltip: "是否记录sprite组件的spriteFrame属性，默认勾选，需要另外控制(例如多语言)手动去除勾选",
    })
    controlSpriteFrame: boolean = true;

    @property({
        tooltip: "是否记录node的size，默认勾选，不需要控制(例如多语言)手动去除勾选",
    })
    controlSize: boolean = true;

    @property({
        tooltip: "自动生成的配置",
        readonly: true
    })
    ui_config: string = "{}";
}
