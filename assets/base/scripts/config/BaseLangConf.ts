/**
 * 多语言配置
 */

/**
 * 语种
 * @param ZH 简中
 * @param EN 英文
 */
export enum LanguageType {
    ZH = 'zh',
    EN = 'en',
    JA = 'ja',
    KO = 'ko',
    TH = 'th',
    VN = 'vn',
    PU = 'pu',
}

/**
 * 语种文件配置
 * @param bundleName 文件位于哪一个bundle下
 * @param path 文件于bundle下的相对路径
 */
export interface ILangFileConf {
    bundleName?: string;
    path: string;
}

/**
 * 多语言json配置 值
 */
export interface IJsonPngValue {
    /**相对于bundle 路径 */
    path: string;
    /** bundle名称 */
    bundle: string;
    /** 图集名称 */
    atlas: string;
    /** 精灵帧名称 */
    frame: string;
    /** 如果仅部分语言有资源，则填写此项*/
    onlyInLanguages:string[];

}

export default class BaseLangConf {

    private static _instance: BaseLangConf = null;
    private _langCf: { [key: string]: ILangFileConf[] } = null;
    public static getInstance(): BaseLangConf {
        if (!this._instance) {
            this._instance = new BaseLangConf();
        }
        return this._instance;
    }

    /**
     * 合并配置至该处
     * @param conf 
     */
    public mergeLangConf(conf: { [key: number]: ILangFileConf[] }) {
        for (let key in conf) {
            let cfArr = conf[key];
            if (!this._langCf[key]) this._langCf[key] = [];
            for (let i = 0; i < cfArr.length; ++i) {
                this._langCf[key].push(cfArr[i]);
            }
        }
    }

    public getLangConf() {
        return this._langCf;
    }

    private constructor() {
        this._langCf = {
            [LanguageType.ZH]: [{ bundleName: 'base', path: "scripts/config/DataUcLangZh" }],
        }
    }
}
