/**
 * 声音管理器
 */
import PageHideShow from "../common/PageHideShow";
import { logMgr } from "../log/LogManager";
import CommonProto from "../network/CommonProto";
import { resLoader, ResLoader } from "../res/ResLoader";

export enum ClipEnum {
    NONE,
    LOADING,
    LOAD,
    CLEAR,
    STOP,   //这个是针对背景音乐的，如果不播放的情况下
}
export class musicClip {
    state: ClipEnum = ClipEnum.NONE;
    clip: cc.AudioClip = null;
    clipId: number = -1;
    /**原始音量最大占比 */
    maxVolumePercentage: number = 1;
    path: string = null;
    bundle: string;
}

let useKey = '@ResSoundMsg' + resLoader.nextUseKey();
export default class SoundManager {
    private static instance: SoundManager;
    /**音乐音量的百分比 */
    private musicVolume: number = 0.5;                  //背景声音大小
    /**音效音量的百分比 */
    private effectVolume: number = 0.5;                 //音效大小
    //音效索引
    private effectList: musicClip[] = [];                  //正在播放等音效列表
    //播放的背景声音 索引 用于切换背景声音
    private bgmusic: musicClip = null;                  //背景音乐   
    private bgmusicList: musicClip[] = [];              //背景音乐列表
    //默认按钮声音
    private defaultBtn: musicClip = null;


    //资源列表
    private loadedRes: { asset: cc.Asset, use: string }[] = [];

    constructor() {
        if (SoundManager.instance) {
            throw new Error("this is singleton,use getInstance()");
        }
    }
    /**
     * 获取实例
     */
    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
            SoundManager.instance.setDefaultButton("sounds/defaultBtn", "base");
        }
        return SoundManager.instance;
    }

    //重置 musicClip 对象
    private resetMusicClip(clip: musicClip) {
        if (clip) {
            clip.clipId = -1;
            clip.clip = null;
            clip.state = ClipEnum.CLEAR;
            clip.path = "";
            clip = null;
        }
    }
    /**
     * 加载本地声音缓存，存储用户设置音量大小，
     */
    public loadLocalVolume(): void {
        var musicV = cc.sys.localStorage.getItem("MusicVolume");
        if (!musicV) {
            musicV = 0.5;
        }
        var effectV = cc.sys.localStorage.getItem("EffectVolume");
        if (!effectV) {
            effectV = 0.5;
        }
        this.musicVolume = Number(musicV);
        this.effectVolume = Number(effectV);
    }

    /**
     * 获取声音值（背景音乐）
     */
    public getMusicVolume() {
        return this.musicVolume;
    }

    /**
     * 获取音效值（音效）
     */
    public getEffectVolume() {
        return this.effectVolume;
    }

    /**
     * 播放音效结束回调函数
     * @param soundId 声音的id
     */
    private onFinishSound(soundId: number): void {
        //结束后 清除 音效数组中该音效值
        for (var i = 0; i < this.effectList.length; i++) {
            var effect = this.effectList[i];
            if (effect && effect.clipId == soundId) {
                this.effectList.splice(i, 1);
                this.resetMusicClip(effect);
                return;
            }
        }
    }
    /**
     * 设置背景声音大小，并且缓存本地
     * @param volume 音量大小 （0--1）
     */
    public setMusicVolume(volume: number): void {
        this.musicVolume = volume;
        cc.sys.localStorage.setItem("MusicVolume", volume);

        for (let i = 0; i < this.bgmusicList.length; i++) {
            let bgm = this.bgmusicList[i];
            if (!bgm || bgm.state == ClipEnum.NONE) {
                continue;
            }
            cc.audioEngine.setVolume(bgm.clipId, this.musicVolume * bgm.maxVolumePercentage);
        }
    }

    /**
     * 设置音效大小，并且缓存本地
     * @param volume 音量大小 （0--1）
     */
    public setEffectVolume(volume: number): void {
        this.effectVolume = volume;
        cc.sys.localStorage.setItem("EffectVolume", volume);
        for (var i = 0; i < this.effectList.length; i++) {
            let tempclip = this.effectList[i];
            if (tempclip && tempclip.state == ClipEnum.LOAD) {
                cc.audioEngine.setVolume(this.effectList[i].clipId, volume * this.effectList[i].maxVolumePercentage);
            }
        }
    }

    /**
     * 播放背景音乐
     * @param path 音乐资源路径
     * @param loop 是否循环播放
     * @param bundle bundle名
     * @param endFunc 播放结束后的回调 可选
     * @param loadFunc 加载完成的回调  可选
     * @param volume 原始音量最大值,默认值100（0，100）
     */
    public playMusic(path: string | musicClip, loop: boolean, bundle: string, endFunc?: Function, loadFunc?: Function, volume: number = 100): void {
        if (!path || !PageHideShow.getInstance().PageIsShow()) return;
        let self = this;
        let tempPath = "";
        let tempclip: musicClip = null;
        if (this.bgmusic && path instanceof musicClip && this.bgmusic == path) {
            return;
        }
        if (this.bgmusic && this.bgmusic.path == path) {
            return;
        }
        if (path instanceof musicClip) {
            tempPath = path.path;
            tempclip = path;
        } else {
            //如果之前有背景音乐 先停止之前的。
            this.stopBgMusic();
            //如果之前有需要先删除，再次删除，这样保持队列后面，而且重复播放的时候 只会保留一份
            this.delBgMusic(path);
            tempclip = new musicClip();
            tempclip.path = path;
            tempclip.bundle = bundle;
            this.bgmusicList.push(tempclip);
            tempPath = path;
        }
        tempclip.state = ClipEnum.LOADING;
        tempclip.maxVolumePercentage = volume / 100;
        self.bgmusic = tempclip;
        ResLoader.getInstance().loadRes(tempPath, cc.AudioClip, (error, clip) => {
            if (!error) {
                if (tempclip.state == ClipEnum.CLEAR) {
                    //不播放，可能出现了，在加载完成前 进行了传参停止音乐，并且进行数组中清理
                    this.delBgMusic(tempPath);
                } else if (tempclip.state == ClipEnum.STOP) {
                    //不播放，可能出现了，在加载完成前 进行了playMusic然后自动停止音乐
                    self.loadedResPush(clip, useKey);
                } else {
                    self.loadedResPush(clip, useKey);
                    tempclip.state = ClipEnum.LOAD;
                    tempclip.clip = clip;
                    tempclip.clipId = cc.audioEngine.play(clip, loop, self.musicVolume * tempclip.maxVolumePercentage);
                    cc.audioEngine.setFinishCallback(self.bgmusic.clipId, () => {
                        if (endFunc) {
                            endFunc(self.bgmusic);
                        }
                    });
                    loadFunc && loadFunc.call(null, path, self.bgmusic);
                }
            } else {
                //logMgr.warn("声音资源未找到：" + path);
                //logMgr.error(error);
            }
        }, bundle, useKey);
    }

    /**
     * 播放音效文件
     * @param path 音效路径，相对于bundle
     * @param bool 是否循环
     * @param bundle bundle名
     * @param isSpecial 是否特殊音乐（可能捕猎一些长音效）
     * @param loadfinish 加载完成的回调
     * @param playfinish 播放完成的回调
     * @param volume 原始音量最大值,默认值100（0，100）
     */
    public playEffect(path: string, loop: boolean = false, bundle: string, loadfinish: Function = null, playfinish: Function = null, volume: number = 100): void {
        if (path == "" || this.effectVolume <= 0 || !PageHideShow.getInstance().PageIsShow()) {
            return;
        }

        let tempclip = new musicClip();
        tempclip.state = ClipEnum.LOADING;
        tempclip.bundle = bundle;
        tempclip.path = path;
        tempclip.maxVolumePercentage = volume / 100;
        //循环音效 仍然存在 path 需要添加个后缀，防止播放播放音效列表对象key值一样，对象被赋值
        if (loop && this.getClipByPath(path)) {
            let number = this.getReaptEffect(path);
            tempclip.path = path + "_" + number;
        }
        this.effectList.push(tempclip);
        let self = this;
        ResLoader.getInstance().loadRes(path, cc.AudioClip, (error, clip) => {
            if (!error) {
                if (tempclip.state == ClipEnum.CLEAR) {
                    this.delEffect(path);
                    return;
                }
                self.loadedResPush(clip, useKey);
                tempclip.state = ClipEnum.LOAD;
                tempclip.clip = clip;
                // logMgr.warn("首次加载声音资源" + path);
                tempclip.clipId = cc.audioEngine.play(clip, loop, self.effectVolume * tempclip.maxVolumePercentage);
                cc.audioEngine.setFinishCallback(tempclip.clipId, () => {
                    self.onFinishSound(tempclip.clipId);
                    playfinish && playfinish.call(this, path, tempclip);
                });
                loadfinish && loadfinish.call(this, path, tempclip);
            } else {
                //logMgr.error(error);
                //logMgr.warn("声音资源未找到：" + path);
            }
        }, bundle, useKey);
    }

    /**
     * 获取音效对象 cc.AudioClip ,有些传入相同的路径名字。 进行playEffect。
     * @param path  播放声音资源路径
     */
    public getClipByPath(path: string): musicClip {
        if (this.bgmusic && this.bgmusic.path == path) {
            return this.bgmusic;
        }
        for (let key in this.effectList) {
            let str = this.effectList[key].path;
            if (str == path) {
                return this.effectList[key];
            }
        }
        return null;
    }

    /**
     * 暂停音效的播放
     * @param path 声音资源路径
     */
    public pauseMusic(path: string): void {
        let clip = this.getClipByPath(path);
        if (clip && clip.state == ClipEnum.LOAD) {
            cc.audioEngine.pause(clip.clipId);
        } else {
            logMgr.warn("暂停音乐失败：" + path);
        }
    }
    /**
     * 恢复音效资源的播放
     * @param path 音效路径
     * @param loop 是否循环
     * @param cbFunc 播放结束后的回调函数 可选
     */
    public resumeMusic(path: string, loop: boolean, cbFunc?: Function): void {
        let clip = this.getClipByPath(path);
        if (clip && clip.state == ClipEnum.LOAD) {
            cc.audioEngine.resume(clip.clipId);
            if (cbFunc) {
                cc.audioEngine.setFinishCallback(clip.clipId, () => {
                    // logMgr.Log("resumeMusic ====恢复音乐播放完毕回调");
                    cbFunc(clip);
                });
            }
        } else {
            logMgr.warn("恢复音乐播放失败：" + path);
        }
    }

    /**
     * 获取音效当前到播放时长
     * @param path 声音资源路径
     */
    public getMusicCurPlayTime(path: string): number {
        let clip = this.getClipByPath(path);
        let curPlayTime = 0;
        if (clip && clip.state == ClipEnum.LOAD) {
            curPlayTime = cc.audioEngine.getCurrentTime(clip.clipId);
        }
        return curPlayTime;
    }

    /**
     * 停止背景音乐
     * 如果传了路径过来，那么需要删除数组里的背景音乐，播放上一个，如果数组中没有音乐，则不播放
     * 如果停止声音不传参数，那么停止当前的，不播放上一个，但是也不会清除这个的声音在列表中
     * @param path 传入播放声音资源路径 ,可选 
     * @param notPlay  是否需要播放前一个  可选 
     */
    public stopBgMusic(path?: string, notPlay?: boolean): void {
        if (path) {
            //这里进来一般都是 主动的去调用函数 停止音乐，停止后需要播放前一个背景音乐
            for (let i = 0; i < this.bgmusicList.length; i++) {
                let clip = this.bgmusicList[i];
                if (clip.path.indexOf(path) >= 0) {
                    if (clip.state == ClipEnum.LOAD) {
                        cc.audioEngine.stop(clip.clipId);
                        this.bgmusicList.splice(i, 1);
                        this.resetMusicClip(clip);
                    } else {
                        clip.state = ClipEnum.CLEAR;
                    }
                }
            }
            if (this.bgmusicList.length > 0 && notPlay != false) {
                let preclip = this.bgmusicList[this.bgmusicList.length - 1];
                this.playMusic(preclip, true, preclip.bundle);
            }
        } else {
            //这里一般都是 当播放下一个背景音乐 ，自动停止当前的，在playMusic自动调用。
            if (this.bgmusic) {
                if (this.bgmusic.clipId != -1) {
                    cc.audioEngine.stop(this.bgmusic.clipId);
                }
                this.bgmusic.state = ClipEnum.STOP;
            }
        }
    }

    /**
     * 停止所有背景声音，并且在列表中的也全部清理
     * 一般用在离开了子游戏的情况下
     */
    public stopAllBgMusic(): void {
        for (let i = 0; i < this.bgmusicList.length; i++) {
            this.stopBgMusic(this.bgmusicList[i].path, false);
        }
        this.bgmusicList.length = 0;
    }

    //删除背景音乐列表中的音乐
    private delBgMusic(path: string): void {
        for (let i = 0; i < this.bgmusicList.length; i++) {
            let clip = this.bgmusicList[i];
            if (clip.path.indexOf(path) >= 0) {
                this.bgmusicList.splice(i, 1);
                this.resetMusicClip(clip);
            }
        }
    }

    /** 列表中是否存在 背景音乐 */
    public hasExtMusicClip(path: string): boolean {
        for (let i = 0; i < this.bgmusicList.length; i++) {
            let clip = this.bgmusicList[i];
            if (clip.path.indexOf(path) >= 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * 停止某个音效  可能存在多个音效，但是会自动加后缀，所以遍历的时候 查找字符
     * @param path 音效资源路径
     */
    public stopEffect(path: string): void {
        for (let i = 0; i < this.effectList.length; i++) {
            let clip = this.effectList[i];
            if (clip.path.indexOf(path) >= 0) {
                if (clip.state == ClipEnum.LOAD) {
                    cc.audioEngine.stop(clip.clipId);
                    this.effectList.splice(i, 1);
                    this.resetMusicClip(clip);
                } else {
                    clip.state = ClipEnum.CLEAR;
                }
            }
        }
    }

    //删除音效列表中的音效
    private delEffect(path: string): void {
        for (let i = 0; i < this.effectList.length; i++) {
            let clip = this.effectList[i];
            if (clip.path.indexOf(path) >= 0) {
                this.effectList.splice(i, 1);
                this.resetMusicClip(clip);
            }
        }
    }


    /**
     * 停止全部音效
     */
    public stopAllEffect(): void {
        let tempArr = this.effectList.slice(0);
        for (let i = 0; i < tempArr.length; i++) {
            let mscclip = tempArr[i];
            if (mscclip.clip) {
                if (mscclip.state == ClipEnum.LOAD) {
                    cc.audioEngine.stop(mscclip.clipId);
                    this.resetMusicClip(mscclip);
                } else {
                    mscclip.state = ClipEnum.CLEAR;
                }
            }
        }
        this.effectList.length = 0;
    }

    /**
     * 设置当前的音频时间。
     * @param path 音效资源路径
     * @param sec 时间
     */
    public setEffectCurrentTime(path: string, sec: number): void {
        let musicclip = this.getClipByPath(path);
        if (musicclip && musicclip.state == ClipEnum.LOAD) {
            cc.audioEngine.setCurrentTime(musicclip.clipId, sec);
        }
    }

    /**
     * 清理所有音效资源缓存，释放资源
     */
    public clearAllSound(): void {
        this.stopAllBgMusic();
        this.stopAllEffect();
        this.releaseAllRes();
    }

    /**
     * 释放单个资源缓存
     * @param path 音效资源路径
     */
    public clearSingleSound(path: string): void {
        this.stopEffect(path);
        let clip = this.getClipByPath(path);
        if (clip) {
            this.releaseRes(clip);
        }
    }

    /**
     * 放到资源列表，清理到时候 需要这个列表进行清理
     * @param tempasset 声音 cc.AudioClip 对象
     * @param usekey usekey
     */
    private loadedResPush(tempasset: cc.Asset, usekey: string): void {
        for (let i = 0; i < this.loadedRes.length; i++) {
            let res = this.loadedRes[i];
            if (tempasset == res.asset && res.use == usekey) {
                return;
            }
        }
        this.loadedRes.push({ asset: tempasset, use: usekey });
    }

    /**
     * 释放单个资源
     * @param mscClip 释放资源 musicClip
     */
    private releaseRes(mscClip: musicClip) {
        resLoader.releaseAsset(mscClip.clip, useKey);
    }

    // 释放所有音效资源
    private releaseAllRes() {
        let assetArr = [];
        for (let i = 0; i < this.loadedRes.length; ++i) {
            assetArr.push(this.loadedRes[i].asset);
        }
        resLoader.releaseAsset(assetArr, useKey);
    }

    /**
     * 设置默认的音效资源路径 
     * @param path 音效的资源路径
     */
    public setDefaultButton(path: string, bundle: string): void {
        if (!this.defaultBtn) {
            this.defaultBtn = new musicClip();
        }
        this.defaultBtn.path = path;
        this.defaultBtn.bundle = bundle;
    }

    /**
     * 播放默认的按钮音效
     */
    public playBtnSound(): void {
        this.playEffect(this.defaultBtn.path, false, this.defaultBtn.bundle, null, null);
    }

    //获取重复音效
    private getReaptEffect(path: string): number {
        let num = 0;
        for (let i = 0; i < this.effectList.length; i++) {
            if (this.effectList[i].path.indexOf(path) >= 0) {
                num++;
            }
        }
        return num;
    }
}
