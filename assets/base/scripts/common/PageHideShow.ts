import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import LanguageManager from "../language/LanguageManager";
import { LogManager } from "../log/LogManager";
import CommonProto from "../network/CommonProto";
import { NetManager } from "../network/NetManager";
import { NetTips } from "../network/NetTip";
import SoundManager, { musicClip } from "../sound/SoundManager";
import TipsManager from "../ui/TipsManager";

export default class PageHideShow {
    private static instance: PageHideShow = null;
    //这里的监听 切换后台在某些设备上，可能出现调用的两次的情况
    private comeinOnce: boolean = false;
    private pageShow: boolean = true;
    private setimeId: number = 0;

    constructor() {
        if (PageHideShow.instance) {
            throw new Error("this is singleton,use getInstance()");
        }
    }

    public static getInstance(): PageHideShow {
        if (!this.instance) {
            this.instance = new PageHideShow();
        }
        return this.instance;
    }

    public Init(): void {
        // if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_IOS) {
        //     cc.game.on(cc.game.EVENT_SHOW, () => {
        //         cc.sys['__audioSupport'].context.resume();
        //     });
        //     cc.game.on(cc.game.EVENT_HIDE, () => {
        //         cc.sys['__audioSupport'].context.suspend();
        //     });
        // }

        cc.game.on(cc.game.EVENT_HIDE, this.PauseCallBack, this);
        cc.game.on(cc.game.EVENT_SHOW, this.RestoreCallBack, this);
    }

    public onDisable(): void {
        cc.game.off(cc.game.EVENT_HIDE, this.PauseCallBack, this);
        cc.game.off(cc.game.EVENT_SHOW, this.RestoreCallBack, this);
    }

    private PauseCallBack(): void {
        if (!this.comeinOnce) {
            LogManager.getInstance().console("切换到后台");
            this.comeinOnce = true;
            this.pageShow = false;

            //ios系统中浏览器切前后台声音处理
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_IOS)
                cc.sys['__audioSupport'].context.suspend();

            EventManager.getInstance().raiseEvent(Const.mess_pageHideShow, false);
        }
    }

    private RestoreCallBack(): void {
        if (this.comeinOnce) {
            LogManager.getInstance().console("切换到前台");
            this.comeinOnce = false;
            this.pageShow = true;

            //ios系统中浏览器切前后台声音处理
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_IOS)
                cc.sys['__audioSupport'].context.resume();

            EventManager.getInstance().raiseEvent(Const.mess_pageHideShow, true);
            if (NetManager.getInstance().socketIsClose()) {
                // let okcall = { target: this, callback: () => { CommonProto.getInstance().backPage(); } };
                // let tips = LanguageManager.getInstance().getDstStr("ycts_relink");
                // TipsManager.getInstance().showDialog(tips, okcall, null, true);
            }
        }
    }

    public PageIsShow(): boolean {
        return this.pageShow;
    }
}