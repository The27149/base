/**
 * UI管理模块使用示例
 */

import { TaskCallback, TaskManager } from "../../base/scripts/common/TaskQueue";
import BaseLangConf, { LanguageType } from "../../base/scripts/config/BaseLangConf";
import BaseUIConf from "../../base/scripts/config/BaseUIConf";
import LanguageManager from "../../base/scripts/language/LanguageManager";
import { resLeakChecker } from "../../base/scripts/res/ResLeakChecker";
import { resLoader } from "../../base/scripts/res/ResLoader";
import { LoadResMixArgs } from "../../base/scripts/res/ResUtils";
import TipsManager from "../../base/scripts/ui/TipsManager";
import { IUIConf, UIDefAni, uiMgr } from "../../base/scripts/ui/UIManager";
import { UIShowTypes } from "../../base/scripts/ui/UIView";
import { ComUtils } from "../../base/scripts/utils/ComUtils";

const { ccclass, property } = cc._decorator;

export enum UIID {
    UI_LOGIN = 1000,
    UI_HALL,
    UI_BAG,
    UI_INTRO,
}

let UICF: { [key: number]: IUIConf } = {
    [UIID.UI_LOGIN]: { bundleName: "resources", path: "prefabs/UILogin", openAni: UIDefAni.UI_NONE, closeAni: UIDefAni.UI_NONE, zOrder: 1 },
    [UIID.UI_HALL]: { path: "prefabs/UIHall" },
    [UIID.UI_BAG]: { path: "prefabs/UIBag", preventTouch: true, quickClose: true, showType: UIShowTypes.UI_ADDITION },
    [UIID.UI_INTRO]: { path: "prefabs/UIIntroduction", preventTouch: true, quickClose: true },
}

@ccclass
export default class UIExample extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        cc.assetManager.loadBundle('base', (err: Error, bundle: cc.AssetManager.Bundle) => {
            if (err) {
                console.log(err);
                return;
            }
            this._registerEvent();
            resLeakChecker.startCheck();
            BaseUIConf.getInstance().mergeUIConf(UICF);
            let uicf = BaseUIConf.getInstance().getUICF();
            uiMgr.initUIConf(uicf);
            uiMgr.open(UIID.UI_LOGIN);

            // let res: LoadResMixArgs[] = [
            //     {url: 'atlas/icon'},
            //     {dir: 'autoAtlas', type: cc.SpriteFrame},
            //     {urls: ['textures/Stalker', 'textures/test']},
            // ];
            // let progress: number = 0;
            // resLoader.preloadResMix(res, (finish: number, total: number, item: any) => {
            //     let tmpNum = finish/total;
            //     if (tmpNum > progress) progress = tmpNum;

            //     console.log(`finish = ${finish}, total = ${total}, progress = ${progress.toFixed(2)}, item = ${item}`);
            // }, (err: Error, assets: any) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log('完成数组某一元素加载');
            //     }
            // });

            // let langCf = BaseLangConf.getInstance().getLangConf();
            // LanguageManager.getInstance().initLangConf(langCf);
            // LanguageManager.getInstance().initLangMap(LanguageType.ZH, () => {
            //     console.log('多语言加载完成');

            //     let str = LanguageManager.getInstance().getCurLang();
            //     console.log(str);

            //     str = LanguageManager.getInstance().getSrcStr("cjcg_tips");
            //     console.log(str);

            //     str = LanguageManager.getInstance().getDstStr('jrhyf_tip2', '小王');
            //     console.log(str);

            //     str = LanguageManager.getInstance().getDstStr("cjcg_tips");
            //     console.log(str);
            // });




            // let begin = (finish) => {
            //     console.log("开始任务");
            //     finish();
            // }
            // TaskManager.getInstance().pushTaskByTag(begin, 1);

            // let creatTask = (idx, pri): TaskCallback => {
            //     return (finish) => {
            //         console.log(`执行任务1 ${idx} 优先级 ${pri}`);
            //         setTimeout(() => {
            //             finish();
            //         }, 3000);
            //     };
            // };
            // let task = creatTask(1, 1);
            // TaskManager.getInstance().pushTaskByTag(task, 1);

            // let creatTask1 = (idx, pri): TaskCallback => {
            //     return (finish) => {
            //         console.log(`执行任务2 ${idx} 优先级 ${pri}`);
            //         setTimeout(() => {
            //             finish();
            //         }, 3000);
            //     };
            // };
            // let task2 = creatTask1(1, 1);
            // TaskManager.getInstance().pushTaskByTag(task2, 1);


        });


    }

    onDestroy() {
        this._unRegisterEvent();
    }

    private _registerEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private _unRegisterEvent() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.s:
                console.log('start resLeakChecker --');
                resLeakChecker.startCheck();
                break;
            case cc.macro.KEY.b:
                console.log('stop resLeakChecker --');
                resLeakChecker.stopCheck();
                break;
            case cc.macro.KEY.r:
                console.log('reset resLeakChecker --');
                resLeakChecker.resetLog();
                break;
            case cc.macro.KEY.d:
                console.log('dump resLeakChecker --');
                resLeakChecker.dump();
                break;
            case cc.macro.KEY.m:
                console.log('memory res --');
                console.log(cc.assetManager.assets);
            default:
                break;
        }
    }
}
