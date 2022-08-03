/**
 * 资源记录类
 * 1. 提供加载功能，并记录加载过的资源
 * 2. 在node释放时自动清理加载过的资源
 * 3. 支持手动添加记录
 */

import { resLoader } from "./ResLoader";
import { CompleteCallback, LoadRemoteArgs, LoadResArgs, ProgressCallback, ResUtils } from "./ResUtils";


const {ccclass, property} = cc._decorator;

/** 自动释放配置 */
export interface IAutoResInfo {
    asset: cc.Asset,
    use: string
};

@ccclass
export default class ResKeeper extends cc.Component {

    private _autoResInfo: IAutoResInfo[] = [];

    /**
     * 完成一个Item的加载
     * @param item 资源对象实例
     * @param use 资源使用key
     */
    private _finishItem(item: any, use?: string) {
        if (!this._cacheItem(item, use)) {
            cc.warn(`_cacheItem item error! for uuid = ${item._uuid}`);
        }
    }

    /**
     * 缓存一个Item
     * @param item 资源对象实例
     * @param use 资源使用key
     */
    private _cacheItem(item: any, use?: string) {
        if (cc.isValid(item)) {
            let info: IAutoResInfo = {asset: item, use: use};
            this._autoResInfo.push(info);
            return true;
        }
        return false;
    }

    /**
     * 加载资源
     * @param paths 资源路径
     * @param type 资源类型
     * @param onProgress 加载进度回调函数
     * @param onComplete 加载完成回调函数
     * @param bundleName 包名
     * @param use 资源使用key
     */
    loadRes(paths: string|string[], type: typeof cc.Asset, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadRes(paths: string|string[], onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadRes(paths: string|string[], type: typeof cc.Asset, onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadRes(paths: string|string[], onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadRes(paths: string|string[], type: typeof cc.Asset, bundleName: string, use?: string): void;
    loadRes(paths: string|string[], bundleName: string, use?: string): void;
    loadRes() {
        let resArgs: LoadResArgs = ResUtils.makeLoadResArgs.apply(this, arguments);
        if (!resArgs) return;
        let className = this.constructor.name;
        if (!resArgs.use) {
            let _useKey = '@' + className;  // 使用实例类名做useKey前缀
            resArgs.use = _useKey + resLoader.nextUseKey();
        }

        let callback = resArgs.onComplete;
        resArgs.onComplete = (err, assets) => {
            if (!err) {
                if (cc.isValid(this)) {
                    if (assets instanceof Array) {
                        for (let i = 0; i < assets.length; ++i) {
                            this._finishItem(assets[i], resArgs.use);
                        }
                    } else {
                        this._finishItem(assets, resArgs.use);
                    }
                } else {
                    // 组件提前被摧毁，释放资源
                    if (assets instanceof Array) {
                        for (let i = 0; i < assets.length; ++i) {
                            resLoader.releaseAsset(assets[i], resArgs.use);
                        }
                    } else {
                        resLoader.releaseAsset(assets, resArgs.use);
                    }
                    err = new Error(`${className} Component ResKeeper inValid`);
                    assets = undefined;
                }
            }
            callback && callback(err, assets);
        }

        resLoader.loadRes(resArgs);
    }

    /**
     * 加载资源
     * @param dir 文件夹路径
     * @param type 资源类型
     * @param onProgress 加载进度回调函数
     * @param onComplete 加载完成回调函数
     * @param bundleName 包名
     * @param use 资源使用key
     */
    loadResDir(dir: string, type: typeof cc.Asset, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadResDir(dir: string, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadResDir(dir: string, type: typeof cc.Asset, onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadResDir(dir: string, onComplete: CompleteCallback, bundleName: string, use?: string): void;
    loadResDir(dir: string, type: typeof cc.Asset, bundleName: string, use?: string): void;
    loadResDir(dir: string, bundleName: string, use?: string): void;
    loadResDir() {
        let resArgs: LoadResArgs = ResUtils.makeLoadResArgs.apply(this, arguments);
        if (!resArgs) return;
        let className = this.constructor.name;
        if (!resArgs.use) {
            let _useKey = '@' + className;  // 使用实例类名做useKey前缀
            resArgs.use = _useKey + resLoader.nextUseKey();
        }

        let callback = resArgs.onComplete;
        resArgs.onComplete = (err, assets) => {
            if (!err) {
                if (cc.isValid(this)) {
                    if (assets instanceof Array) {
                        for (let i = 0; i < assets.length; ++i) {
                            this._finishItem(assets[i], resArgs.use);
                        }
                    } else {
                        this._finishItem(assets, resArgs.use);
                    }
                } else {
                    // 组件提前被摧毁，释放资源
                    if (assets instanceof Array) {
                        for (let i = 0; i < assets.length; ++i) {
                            resLoader.releaseAsset(assets[i], resArgs.use);
                        }
                    } else {
                        resLoader.releaseAsset(assets, resArgs.use);
                    }
                    err = new Error(`${className} Component ResKeeper inValid`);
                    assets = undefined;
                }
            }
            callback && callback(err, assets);
        }

        resLoader.loadResDir(resArgs);
    }

    /**
     * 加载远端资源
     * @param resArgs 
     * @param url 远端地址
     * @param options 可选参数
     * @param onComplete 完成回调
     * @param use 资源使用key
     */
    loadRemote(url: string, options: Record<string, any>, onComplete: CompleteCallback, use?: string): void;
    loadRemote(url: string, options: Record<string, any>, use?: string): void;
    loadRemote(url: string, onComplete: CompleteCallback, use?: string): void;
    loadRemote(url: string, use?: string): void;
    loadRemote() {
        let resArgs: LoadRemoteArgs = ResUtils.makeLoadRemoteArgs.apply(this, arguments);
        if (!resArgs) return;
        let className = this.constructor.name;
        if (!resArgs.use) {
            let _useKey = '@' + className;  // 使用实例类名做useKey前缀
            resArgs.use = _useKey + resLoader.nextUseKey();
        }

        let callback = resArgs.onComplete;
        resArgs.onComplete = (err, assets) => {
            if (!err) {
                if (cc.isValid(this)) {
                    this._finishItem(assets, resArgs.use);
                } else {
                    // 组件提前被摧毁，释放资源
                    resLoader.releaseAsset(assets, resArgs.use);
                    err = new Error(`${className} Component ResKeeper inValid`);
                    assets = undefined;
                }
            }
            callback && callback(err, assets);
        };

        resLoader.loadRemote(resArgs);
    }

    /**
     * 组件销毁时自动释放所有keep的资源
     */
    public onDestroy() {
        this.releaseAutoRes();
    }

    /**
     * 释放资源，组件销毁时自动调用
     */
    public releaseAutoRes() {
        for (let index = 0; index < this._autoResInfo.length; ++index) {
            const element = this._autoResInfo[index];
            resLoader.releaseAsset(element.asset, element.use);
        }
        this._autoResInfo.length = 0;
    }

    /**
     * 加入一个自动释放的资源
     */
    public addAutoRes(resConf: IAutoResInfo) {
        if (resConf) this._finishItem(resConf.asset, resConf.use);
    }
}
