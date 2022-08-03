
/**
 * 一些静态的节点，不是动态生成的节点，脚本组件可以直接挂在节点上，进行多语言处理
 * 节点也可以监听 mess_refreshLanguage 刷新多语言
 */
import Const from "../const/Const";
import { EventManager } from "../event/EventManager";
import LanguageManager from "./LanguageManager";

const { ccclass, property, menu, executeInEditMode, } = cc._decorator;

var excludeFolders: string[] = ['textures'];
var LanguageNames: string[] = [];
var EnumLangType = {};
export enum IEnumLanyType { };

@ccclass("LanuguageItem")
export class LanuguageItem {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.String)
    key: string = "";

    @property(cc.String)
    _myUuid: string = "";

    saveMyUuid() {
        if (cc.isValid(this.item)) {
            if (this.item.getComponent(cc.Label)) {
                this._myUuid = this.item.getComponent(cc.Label).string || this.key;
            } else if (this.item.getComponent(cc.Sprite) && this.item.getComponent(cc.Sprite).spriteFrame) {
                this._myUuid = this.item.getComponent(cc.Sprite).spriteFrame['_uuid'];
            }
        }
    }

    initMyUuid() {
        if (cc.isValid(this.item)) {
            if (!this._myUuid) return;
            if (this.item.getComponent(cc.Label)) {
                this.item.getComponent(cc.Label).string = this._myUuid || this.item.getComponent(cc.Label).string;
            } else if (this.item.getComponent(cc.Sprite)) {
                cc.assetManager.loadAny({ uuid: this._myUuid }, (err, data) => {
                    if (!err) {
                        this.item.getComponent(cc.Sprite).spriteFrame = data;
                    }
                });
            }
        }
    }

    cleanContent() {
        if (cc.isValid(this.item)) {
            if (this.item.getComponent(cc.Label)) {
                this.item.getComponent(cc.Label).string = "";
            } else if (this.item.getComponent(cc.Sprite)) {
                let sprite = this.item.getComponent(cc.Sprite);
                let lastSprite = sprite['_spriteFrame'];
                sprite['_spriteFrame'] = null;
                sprite['_applySpriteFrame'](lastSprite);
            }
        }
    }

    async setKey() {
        if (cc.isValid(this.item)) {
            if (this.item.getComponent(cc.Sprite)) {
                let spriteFrame = this.item.getComponent(cc.Sprite).spriteFrame;
                let name = spriteFrame.name;
                let __uuid = spriteFrame['_uuid'];
                let path: string = Editor.remote.assetdb.uuidToUrl(__uuid);
                let bundleName: string = path.replace("db://assets/", "").split("/")[0];
                let reg1 = new RegExp(`db:.+${bundleName}`, "g");
                let folders = path.replace(reg1, "").split(/\.(jpg|jpeg|png|gif|bmp|webp)/g)[0].split("/");
                let keystr = "";
                for (let i = 0; i < folders.length; i++) {
                    if (excludeFolders.indexOf(folders[i]) < 0) {
                        keystr = keystr + "_" + folders[i];
                    }
                }
                keystr = keystr.replace("__", "");
                if (LanguageManager.getInstance().hasKey(keystr)) {
                    this.key = keystr;
                } else {
                    cc.log("多语言图片配置中没有key值:", keystr);
                    this.key = "";
                }
            }
        }
    }

    loadImageByLang(lang: IEnumLanyType) {
        if (cc.isValid(this.item) && this.item.getComponent(cc.Sprite)) {
            let spriteFrame = this.item.getComponent(cc.Sprite).spriteFrame;
            let __uuid = spriteFrame['_uuid'];
            let path: string = Editor.remote.assetdb.uuidToUrl(__uuid);
            let str: string = "";
            for (let i = 0; i < LanguageNames.length; i++) {
                str = `${str}|(\/${LanguageNames[i]}\/)`;
            }
            str = str.replace('|', "");
            let regStr: RegExp = new RegExp(str);
            path = path.replace(regStr, `/${LanguageNames[lang]}/`);
            let uuid = Editor.remote.assetdb.urlToUuid(path);
            if (uuid) {
                cc.assetManager.loadAny({ uuid: uuid }, (err, data) => {
                    if (!err) {
                        this.item.getComponent(cc.Sprite).spriteFrame = data;
                    }
                });
            } else {
                cc.log("图片不存在:", path);
            }
        }
    }
}

/**
 * 支持清除默认资源
 * 支持编辑器预览不同语言资源
 * 配合多语言配置生成插件使用可以一键设置图片多语言节点的key值
 * 支持清空空键值对
 */
@ccclass
@menu("多语言")
@executeInEditMode
export default class LanguageComp extends cc.Component {

    @property([LanuguageItem])
    items: LanuguageItem[] = [];

    @property()
    private _isCleanDefultContent: boolean = false;
    public get isCleanDefultContent(): boolean {
        return this._isCleanDefultContent;
    }
    @property({ displayName: "清除多语言默认资源", tooltip: "保存之前请务必勾选" })
    public set isCleanDefultContent(value: boolean) {
        this._isCleanDefultContent = false;
        EventManager.getInstance().raiseEvent("cleanDefaultContent");
    }

    @property()
    private _refrush: boolean = false;
    public get refrush(): boolean {
        return this._refrush;
    }
    @property({ displayName: "清除空值" })
    public set refrush(value: boolean) {
        this._refrush = false;
        this.items.sort(this.sortItem());
        let len = this.items.length;
        if (len <= 0) return;
        let reduceNum: number = 0;
        for (let i = len - 1; i >= 0; i--) {
            if (!this.items[i].item && !this.items[i].key) {
                reduceNum++;
                continue;
            }
            break;
        }
        this.items.length -= reduceNum;
    }

    @property()
    private _setKey: boolean = false;
    public get setKey(): boolean {
        return this._setKey;
    }
    @property({ tooltip: "为图片节点设置多语言key值", displayName: "为图片节点设置多语言key值" })
    public set setKey(value: boolean) {
        this._setKey = false;
        this.setItemKey();
    }

    @property()
    private _preview: boolean = false;
    public get preview(): boolean {
        return this._preview;
    }
    @property({ displayName: "开启预览" })
    public set preview(value: boolean) {
        this._preview = value;
    }

    @property({ type: cc.Enum(IEnumLanyType) })
    private _priviewLang: IEnumLanyType = 0;
    public get priviewLang(): IEnumLanyType {
        return this._priviewLang;
    }
    @property({
        type: cc.Enum(IEnumLanyType), visible: function () {
            return this.preview;
        }, displayName: "修改预览语种"
    })
    public set priviewLang(value: IEnumLanyType) {
        if (this.preview) {
            EventManager.getInstance().raiseEvent("changePreviewLang", value);
        }
    }

    /**修改预览语言 */
    private changePreviewLang(event, lang: IEnumLanyType) {
        this.preview = true;
        this._priviewLang = lang;
        this.previewImage();
    }

    /**预览图片资源 */
    private previewImage() {
        this.items.forEach(element => {
            element.loadImageByLang(this.priviewLang);
        });
    }

    /**设置图片key值 */
    public setItemKey() {
        this.items.forEach(element => {
            element.setKey();
        });
    }

    /**排序 */
    private sortItem(): any {
        this.items.sort((a, b) => {
            if (!a.item && !a.key) return 1;
            if (!b.item && !b.key) return -1;
            return 0;
        })
    }

    /**多语言配置路径 */
    protected configUrl: string = "";
    /**多语言名称 */
    protected languageNames: string[] = ["en", "pu"];
    /**是否初始化 */
    private isInited: boolean = false;
    public init(configUrl: string, langList: string[]) {
        this.languageNames = langList;
        if (!this.isInited) {
            LanguageManager.getInstance().destory();
            if (configUrl) LanguageManager.getInstance().loadConfigInEditor(configUrl);
            excludeFolders = excludeFolders.concat(this.languageNames);
            this.setEnumAttr(this.languageNames);
            this.isInited = true;
            EventManager.getInstance().addEventListener("cleanDefaultContent", this.cleanDefault, this);
            EventManager.getInstance().addEventListener("loadDefaultContent", this.loadDefault, this);
            EventManager.getInstance().addEventListener("changePreviewLang", this.changePreviewLang, this);
            this.loadDefault();
        }
    }

    /**设置枚举属性 */
    private setEnumAttr(data) {
        LanguageNames = data;
        for (let i = 0; i < LanguageNames.length; i++) {
            let key = LanguageNames[i].toUpperCase();
            EnumLangType[key] = i;
        }
        cc.Class['Attr'].setClassAttr(this, 'priviewLang', 'type', 'Enum');
        cc.Class['Attr'].setClassAttr(this, "priviewLang", 'enumList', cc.Enum['getList'](cc.Enum(EnumLangType)));
        Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
    }

    /**清除默认资源 */
    private cleanDefault() {
        this._preview = false;
        this.items.forEach(element => {
            element.saveMyUuid();
            element.cleanContent();
        });
    }

    /**加载默认资源 */
    private loadDefault() {
        this.items.forEach(element => {
            element.initMyUuid();
        });
    }

    /**在编辑器中重置时触发 */
    protected resetInEditor(): void {
        this.isInited = false;
        this.init(this.configUrl, this.languageNames);
    }

    __preload() {
        if (CC_EDITOR) {
            this.init(this.configUrl, this.languageNames);
        }
    }

    onLoad() {
        EventManager.getInstance().addEventListener(Const.mess_refreshLanguage, this.refresh, this);
    }

    start() {
        if (!CC_EDITOR) {
            this.refresh();
        }
    }

    onDestroy() {
        EventManager.getInstance().removeEventListener("cleanDefaultContent", this.cleanDefault, this);
        EventManager.getInstance().removeEventListener("loadDefaultContent", this.loadDefault, this);
        EventManager.getInstance().removeEventListener("previewDiffLang", this.changePreviewLang, this);
        EventManager.getInstance().removeEventListener(Const.mess_refreshLanguage, this.refresh, this);
        this.items.forEach(element => {
            //if (element.item.getComponent(cc.Sprite)) {
            LanguageManager.getInstance().releaseAsset(element.key + element.item.uuid);
            //}
        });
    }

    /** 刷新多语言 */
    refresh(): void {
        this.items.forEach(element => {
            if (element.item && element.item.getComponent(cc.Label)) {
                element.item.getComponent(cc.Label).string = LanguageManager.getInstance().getDstStr(element.key);
            } else if (element.item && element.item.getComponent(cc.Sprite)) {
                let sprite = element.item.getComponent(cc.Sprite);
                LanguageManager.getInstance().setSpriteFrame(element.key, sprite);
            }
        });
    }
}

