/**
 * 多语言管理类
 */

import { Utils } from "../common/Utils";
import { IJsonPngValue, ILangFileConf, LanguageType } from "../config/BaseLangConf";
import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import Global from "../global/Global";
import { LogManager } from "../log/LogManager";
import { resLoader } from "../res/ResLoader";
import { ComUtils } from "../utils/ComUtils";

const { ccclass, property } = cc._decorator;

const _useKey = "@LanguageManager"

@ccclass
export default class LanguageManager {

    private static _instance: LanguageManager = null;
    private constructor() { }
    public static getInstance(): LanguageManager {
        if (!this._instance) {
            this._instance = new LanguageManager();
        }
        return this._instance;
    }

    private _curLangType: LanguageType = LanguageType.EN;
    private _langCf: { [key: string]: ILangFileConf[] } = null;
    private _langMapBase: Map<string, string | IJsonPngValue> = new Map<string, string | IJsonPngValue>();
    private _langMapCore: Map<string, string | IJsonPngValue> = new Map<string, string | IJsonPngValue>();
    private _langMapDefault: Map<string, string | IJsonPngValue> = new Map<string, string | IJsonPngValue>();
    private _langMapGame: Map<string, string | IJsonPngValue> = new Map<string, string | IJsonPngValue>();
    private _isReady: boolean = false;
    /** 更换图片的时候 ，保存这个资源 ，便于后面的释放 */
    private _resArray: Map<string, cc.Asset> = new Map<string, cc.Asset>();

    private _finishCb;
    private _resList = [];
    private _loadingIdx: number = 0;
    private _cfArr;

    /**
     * 初始化语言配置文件信息
     * @param conf 语言配置文件信息
     */
    public initLangConf(conf: { [key: string]: ILangFileConf[] }) {
        this._langCf = conf;
    }

    /**
     * 初始化语言键值对
     * @param langType 语种
     * @param finishCb 完成回调
     */
    public initLangMap(langType: LanguageType, finishCb: () => void) {
        // let isFileExist = Utils.isFileExist("textures/hall/" + ComUtils.getCurLanguage(), "game_" + Global.gameId);
        // if (!isFileExist) {
        //     langType = LanguageType.EN;
        // }
        if (!this._langCf[langType]) {
            LogManager.getInstance().console(`未配置语言，lang = ${langType}`);
            return;
        }
        this._finishCb = finishCb;
        this._langMapBase.clear();
        this._langMapCore.clear();
        this._langMapDefault.clear();
        this._langMapGame.clear();
        this._isReady = false;
        this._curLangType = langType;
        this._loadingIdx = 0;
        this._cfArr = this._langCf[langType];
        if (this._langCf[langType].length <= 0) {
            LogManager.getInstance().console(`未配置json文件，lang = ${langType}`);
            return;
        }
        for (let i = 0; i < this._cfArr.length; i++)
            this.loadConfig(this._cfArr[i]);
    }

    private loadConfig(cf) {
        let bundleName = cf.bundleName ? cf.bundleName : 'resources';
        resLoader.loadRes(cf.path, (err: Error, asset: cc.JsonAsset) => {
            if (err) return;
            let objJson = asset.json;
            var mspSet: Map<string, string | IJsonPngValue>;
            if (bundleName == "base")
                mspSet = this._langMapBase;
            else if (bundleName == "game_core")
                mspSet = this._langMapCore;
            else if (bundleName == "slot" || bundleName == "hunter" || bundleName == "arcade")
                mspSet = this._langMapDefault;
            else
                mspSet = this._langMapGame;

            for (let key in objJson.data) {
                mspSet.set(key, objJson.data[key]);
            }
            resLoader.releaseAsset(asset, _useKey);
            this._loadingIdx++;
            if (this._loadingIdx >= this._cfArr.length) {
                this._initFinish();
                if (this._finishCb) {
                    this._finishCb();
                    this._finishCb = undefined;
                }
                EventManager.getInstance().raiseEvent(Const.mess_refreshLanguage);
            }
        }, bundleName, _useKey);
    }

    private getKeyFromMap(key: string) {
        var cfObj = this._langMapGame.get(key);
        if (!cfObj)
            cfObj = this._langMapDefault.get(key);
        if (!cfObj)
            cfObj = this._langMapCore.get(key);
        if (!cfObj)
            cfObj = this._langMapBase.get(key);
        return cfObj;
    }

    public getJsonIndex(cfArr: ILangFileConf[], jsonName: string): number {
        for (let index = 0; index < cfArr.length; index++) {
            const element = cfArr[index];
            if (element.path.indexOf(jsonName) != -1) {
                return index;
            }
        }
        return -1;
    }

    /**
     * 初始化结束
     */
    private _initFinish() {
        this._isReady = true;
    }

    /**
     * 模块是否准备好
     */
    public get isReady() {
        return this._isReady;
    }

    /**
     * 切换语言
     * @param langType 语种
     * @param finishCb 完成回调
     */
    public switchLang(langType: LanguageType, finishCb: () => void) {
        if (this._curLangType == langType) {
            finishCb && finishCb();
            return;
        }
        this.initLangMap(langType, finishCb);
    }

    /**
     * 获取当前语种
     */
    public getCurLang(): LanguageType {
        return this._curLangType;
    }

    /**
     * 获取key值对应字符串（通配符替换后）
     * @param key 键值
     * @param args 可变参数 ， 如果传入的是数组，那么只能传一个，后面不能在添加继续参数
     */
    public getDstStr(key: string, ...args: any[]): string {
        if (!this._isReady) return null;
        let dstStr: string = key;
        let srcStr: string = <string>this.getKeyFromMap(key);
        if (srcStr) {
            dstStr = srcStr;
            if (args[0] && args[0] instanceof Array) {
                args[0].forEach(element => {
                    dstStr = dstStr.replace(/s%/, element);
                });
            } else {
                for (let i = 0; i < args.length; ++i) {
                    dstStr = dstStr.replace(/s%/, args[i]);
                }
            }
            dstStr = dstStr.replace(/&/g, '\n');     // '&'替换为换行符
        }

        return dstStr;
    }

    public getDstToStr(...args: string[]): string {
        let str = this.getDstStr(args[0]);
        if (str == args[0]) {
            str = this.getDstStr(args[1]);
        }
        return str;
    }

    /**
     * 获取key值对应字符串（通配符替换前）
     * @param key 键值
     */
    public getSrcStr(key: string): string {
        if (!this._isReady) return null;
        return <string>this.getKeyFromMap(key);
    }

    /**
     * 获取key值对应字符串（通配符替换前）
     * @param key 键值
     */
    public getSrcPng(key: string): IJsonPngValue {
        if (!this._isReady) return null;
        return <IJsonPngValue>this.getKeyFromMap(key);
    }

    /**
     * 
     * @param key 加载多语言的key的图片资源
     * @param sprite 传进来需要去更改图片的节点
     */
    public setSpriteFrame(key: string, sprite: cc.Sprite): void {
        let tempsprite = sprite;
        let json = this.getSrcPng(key);
        if (!json) {
            LogManager.getInstance().warn(`LanaguageManager setSpriteFrame 图片配置加载未完成 `, key);
            return;
        }
        let lang = this._curLangType;
        if (json.onlyInLanguages && json.onlyInLanguages.length > 0) {
            if (lang != LanguageType.EN && !json.onlyInLanguages.includes(lang)) {
                lang = LanguageType.EN;
            }
        }
        var resPath;
        if (json.atlas != "")
            resPath = json.path + lang + "/" + json.atlas;
        else
            resPath = json.path + lang + "/" + json.frame;
        var isFind: boolean = false;
        for (var i = 0; i < this._resList.length; i++) {
            if (this._resList[i][0] == tempsprite) {
                this._resList[i][1] = resPath;
                this._resList[i][2] = json.bundle;
                isFind = true;
                break;
            }
        }
        if (!isFind)
            this._resList.push([tempsprite, resPath, json.bundle]);

        if (json.atlas != "")
            this.loadImageAtlas(tempsprite, resPath, key, json);
        else
            this.loadImageFrame(tempsprite, resPath, key, json);
    }

    private loadImageAtlas(tempsprite: cc.Sprite, resPath: string, key: string, json) {
        resLoader.loadRes(resPath, cc.SpriteAtlas, (err, atlas: cc.SpriteAtlas) => {
            if (err)
                return;
            if (!cc.isValid(tempsprite)) {
                return;
            }
            var loadPath = this.getResPathFromList(tempsprite);
            if (loadPath[1] != resPath || loadPath[2] != json.bundle)
                return;
            tempsprite.spriteFrame = atlas.getSpriteFrame(json.frame);
            this._resArray.set(key + tempsprite.node.uuid, atlas);
        }, json.bundle, "@languageManager_" + key);
    }

    private loadImageFrame(tempsprite: cc.Sprite, resPath: string, key: string, json) {
        resLoader.loadRes(resPath, cc.SpriteFrame, (err, frame: cc.SpriteFrame) => {
            if (err)
                return;
            if (!cc.isValid(tempsprite)) {
                return;
            }
            var loadPath = this.getResPathFromList(tempsprite);
            if (loadPath[1] != resPath || loadPath[2] != json.bundle)
                return;
            tempsprite.spriteFrame = frame;
            this._resArray.set(key + tempsprite.node.uuid, frame);
        }, json.bundle, "@languageManager_" + key);
    }

    private getResPathFromList(sprite: cc.Sprite) {
        for (var i = this._resList.length - 1; i >= 0; i--) {
            if (!cc.isValid(this._resList[i][0]))
                this._resList.splice(i, 1);
            else {
                if (this._resList[i][0] == sprite)
                    return this._resList[i];
            }
        }
        return null;
    }

    /**
     * 释放资源，动态加载的资源 需要手动去释放
     * @param key 多语言图片的key值
     */
    public releaseAsset(key: string) {
        let asset = this._resArray.get(key);
        resLoader.releaseAsset(asset, "@languageManager_" + key);
        this._resArray.delete(key);
    }

    public resetLangMap() {
        this._langMapGame.clear();
    }

    /**====================================run in editor==================================== */
    private TextureConfig: cc.JsonAsset = null;
    public loadConfigInEditor(configUrl: string) {
        let uuid: string = Editor.remote.assetdb.urlToUuid(configUrl);
        cc.assetManager.loadAny({ uuid: uuid }, (err, data: cc.JsonAsset) => {
            if (!err) {
                this.TextureConfig = data;
            }
        });
    }

    public destory() {
        this.releaseConfig();
        LanguageManager._instance = null;
    }

    private releaseConfig() {
        this.TextureConfig = null;
    }
    public hasKey(key) {
        let value = null;
        if (this.TextureConfig) {
            value = this.TextureConfig.json['data'][key];
        }
        return value != null && value != undefined;
    }
    /**====================================run in editor==================================== */

}
