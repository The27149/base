import { EventManager } from "../event/EventManager";
import LanguageManager from "../language/LanguageManager";
import TipsManager from "../ui/TipsManager";
import UIManager from "../ui/UIManager";
import CommonProto from "./CommonProto";
import { INetworkTips } from "./NetInterface";
import { NetNode } from "./NetNode";

const { ccclass, property } = cc._decorator;

//具体实现到时候放到 拓展库中去  公共弹窗ui
export class NetTips implements INetworkTips {
    private getLabel(): cc.Label {
        let label = null;
        // let node = cc.director.getScene().getChildByName("@net_tip_label");
        // if (node) {
        //     label = node.getComponent(cc.Label);
        // } else {
        //     node = new cc.Node("@net_tip_label");
        //     label = node.addComponent(cc.Label);
        //     node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        // }
        return label;
    }

    public connectTips(isShow: boolean): void {
        this.showTipNode(isShow);
    }

    public reconnectTips(isShow: boolean): void {
        this.showTipNode(isShow);
    }

    public requestTips(isShow: boolean): void {
        //this.showTipNode(isShow);
    }

    private showTipNode(isShow: boolean) {
        if (isShow) {
            EventManager.getInstance().raiseEvent("mess_loadingShow");
        } else {
            EventManager.getInstance().raiseEvent("mess_loadingHide");
        }
    }

    /**
     * 网络异常，导致网络关闭 弹出的提示框
     * @param isShow 是否展示
     * @param netnode 当前网络节点，如果isShow false 可以传null
     * @param closeState 关闭状态值 是服务器推送的 errorcode ，如果isShow false 可以传null
     */
    public netCloseTips(isShow: boolean, netnode: NetNode, closeState: number): void {
        if (isShow) {
            UIManager.getInstance().closeAll();
            let lang = LanguageManager.getInstance().getDstStr("ycts_outage");
            switch (closeState) {
                case protoCommon.code_type.force_kick: {
                    let okcall = {
                        target: this, callback: () => { CommonProto.getInstance().backPage(); }
                    };
                    lang = LanguageManager.getInstance().getDstStr("fwyc_tips");
                    //TODO 翻译后面需要更新
                    TipsManager.getInstance().showDialog(lang, okcall, null, true);
                }
                    break;
                case protoCommon.code_type.other_login: {
                    let okcall = {
                        target: this, callback: () => { CommonProto.getInstance().backPage(); }
                    };
                    lang = LanguageManager.getInstance().getDstStr("yddl_tips");
                    TipsManager.getInstance().showDialog(lang, okcall, null, true);
                }
                    break;
                case protoCommon.code_type.server_stop: {
                    let okcall = {
                        target: this, callback: () => { CommonProto.getInstance().backPage(); }
                    };
                    lang = LanguageManager.getInstance().getDstStr("fwyc_tips");
                    TipsManager.getInstance().showDialog(lang, okcall, null, true);
                }
                    break;
                default: {
                    let okcall = {
                        target: this, callback: () => {
                            netnode.resetAutoReconnect();
                            netnode.reconnect();
                        }
                    };
                    let cancelcall = {
                        target: this, callback: () => { CommonProto.getInstance().backPage(); }
                    };
                    TipsManager.getInstance().showDialog(lang, okcall, cancelcall);

                }
                    break;
            }
        } else {
        }

    }
}