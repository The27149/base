
import BaseLangConf, { ILangFileConf, LanguageType } from "../../base/scripts/config/BaseLangConf";
import BaseUIConf, { BASEUIID } from "../../base/scripts/config/BaseUIConf";
import Const from "../../base/scripts/const/Const";
import { EventManager } from "../../base/scripts/event/EventManager";
import { game } from "../../base/scripts/game";
import LanguageManager from "../../base/scripts/language/LanguageManager";
import SoundManager from "../../base/scripts/sound/SoundManager";
import TipsManager from "../../base/scripts/ui/TipsManager";
import UIManager from "../../base/scripts/ui/UIManager";
import { ComUtils } from "../../base/scripts/utils/ComUtils";

//import CommonProto from "../../base/scripts/network/CommonProto";
//import { ComUtils } from "../../base/scripts/utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class netExample extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    testnode: cc.Node = null;

    @property(cc.Node)
    sprite1: cc.Node = null;

    @property(cc.Node)
    sprite2: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        // EventManager.getInstance().addEventListener("testmess", (name, data, eventData) => {
        //     console.log("jieshou", name, data, eventData);
        // }, this);

    }

    start() {
        // let con = BaseUIConf.getInstance().getUICF();
        // UIManager.getInstance().initUIConf(con);
        cc.assetManager.loadBundle("base", (err, bundle) => {
            if (err) {
                console.log(err);
            } else {
                //console.log("加载成功");
                //let main = new game['Main']().init();

                //this.loadLanageData();


            }
        });
    }

    //加载多语言配置
    private loadLanageData(): any {
        /** ---------------------  langCf定义和合并   ----------------------------------------------- */
        // 定义自己的语言配置json
        var langCf: { [key: string]: ILangFileConf[] } = {
            [LanguageType.EN]: [{ bundleName: 'base', path: "scripts/config/DataUcLangEn" }],
            [LanguageType.JA]: [{ bundleName: 'base', path: "scripts/config/DataUcLangJa" }],
            [LanguageType.KO]: [{ bundleName: 'base', path: "scripts/config/DataUcLangKo" }],
            [LanguageType.TH]: [{ bundleName: 'base', path: "scripts/config/DataUcLangTh" }],
            [LanguageType.VN]: [{ bundleName: 'base', path: "scripts/config/DataUcLangVi" }],
            [LanguageType.PU]: [{ bundleName: 'base', path: "scripts/config/DataUcLangPu" }],
        }
        // 将自己的配置与base库中配置合并
        BaseLangConf.getInstance().mergeLangConf(langCf);
        // 拿到合并后配置
        var finalLangCf = BaseLangConf.getInstance().getLangConf();
        // 初始化语言配置文件信息
        LanguageManager.getInstance().initLangConf(finalLangCf);
        /** ---------------------  langCf定义和合并   ----------------------------------------------- */
        let language = ComUtils.getCurLanguage();
        // 生成键值对map（内存中只保留该语种键值对数据）
        LanguageManager.getInstance().initLangMap(language, () => {
            console.log("公共模块语言配置加载完成  ", language);
            EventManager.getInstance().raiseEvent(Const.mess_refreshLanguage);
        });
    }

    onclickConnect() {

        //ComUtils.setNodeResolutionSize(this.testnode);

        //netMgr.connect({ url: "ws://192.168.88.131:10240" });

        // let netnode = netMgr.getNetNode();
        // let heper: ProtocolHelper = <ProtocolHelper>netnode.getProtoHelper();
        // let hearresp = <base.HeartBeatResp>{
        //     time: Long.fromNumber(TimeUtil.getLocalTimestamp(8))
        // }
        // let buff = heper.getBuffPackage(0, 1, hearresp);
        // console.log(buff);


        //UIManager.getInstance().open(BASEUIID.UI_KEYBOARD);
        //TipsManager.getInstance().showToast("你是谁啊 啊    啊  ");

        //SoundManager.getInstance().playMusic("BGSound1",);

    }

    onclickLogin() {

        //cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);

        //ComUtils.setNodeResolutionSize(this.testnode);



        //game.Com(monProto.getInstance().loginReq();

        // async.waterfall([
        //     function (callback) {
        //         callback(null, 'one', 'two');
        //     },
        //     function (arg1, arg2, callback) {
        //         // arg1 now equals 'one' and arg2 now equals 'two'
        //         callback(null, 'three');
        //     },
        //     function (arg1, callback) {
        //         // arg1 now equals 'three'
        //         callback(null, 'done');
        //     }
        // ], function (err, result) {
        //     // result now equals 'done'
        //     console.log(err, result);
        // });

    }
}
