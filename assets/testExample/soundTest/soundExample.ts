import SoundManager from "../../base/scripts/sound/SoundManager";
import TipsManager from "../../base/scripts/ui/TipsManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class soundExample extends cc.Component {

    start() {

    }



    playbg1() {
        SoundManager.getInstance().playMusic("sound/BGSound1", true, "resources", (data) => {
            console.log("播放结束");
        }, () => { console.log("播放中") });
        //this.closebg1();
    }
    playbg2() {
        SoundManager.getInstance().playMusic("sound/BGSound2", true, "resources", (data) => {
            console.log("播放结束");
        }, () => { console.log("播放中") });
    }

    stopBg2(): void {
        SoundManager.getInstance().stopBgMusic("sound/BGSound2");
    }

    playsound1() {
        SoundManager.getInstance().playEffect("sound/tx_famale_small", false, "resources");
        this.closeeffect1();
    }
    playsound2() {
        SoundManager.getInstance().playEffect("sound/tx_famale_tzxz", false, "resources");
    }
    closebg1() {
        SoundManager.getInstance().stopBgMusic();
    }
    closeeffect1() {
        SoundManager.getInstance().stopEffect("sound/tx_famale_small");
    }
    closeeffect2() {
        SoundManager.getInstance().stopEffect("sound/tx_famale_tzxz");
    }
    closeAllSound() {
        SoundManager.getInstance().stopAllEffect();
    }
    clearSound1() {
        SoundManager.getInstance().clearSingleSound("sound/tx_famale_small");
    }
    clearAll() {
        SoundManager.getInstance().clearAllSound();

        //TipsManager.getInstance().showToast("nihaooaoaoao");
    }

    stopAllBg(): void {

        SoundManager.getInstance().stopAllBgMusic();
    }

    // update (dt) {}
}
