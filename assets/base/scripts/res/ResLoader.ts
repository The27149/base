/**
 * 资源加载类
 * 1. 记录资源使用key
 * 2. 根据使用key释放资源，任意一处在使用均不会导致资源错误释放
 */

import { ComUtils } from "../utils/ComUtils";
import { resLeakChecker } from "./ResLeakChecker";
import { ICacheResInfo, CompleteCallback, LoadResArgs, ProgressCallback, ResUtils, LoadRemoteArgs, LoadResMixArgs } from "./ResUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export class ResLoader {

    private static _instance: ResLoader = null;
    private _usedId: number = 0;
    private _resMap: Map<string, ICacheResInfo> = new Map<string, ICacheResInfo>();   // 动态加载资源 <uuid, ICacheResInfo>

    private constructor() {

    }

    public static getInstance(): ResLoader {
        if (!this._instance) {
            this._instance = new ResLoader();
        }
        return this._instance;
    }

    public destroy() {
        // do nothing
    }

    public dump() {
        console.log(this._resMap);
    }

    /**
     * 生成一个资源使用Key
     * @param where 在哪里使用，如Scene、UI、Pool
     * @param who 使用者，如Login、UIHelp...
     * @param why 使用原因，自定义...
     */
    public makeUseKey(where: string, who: string = "none", why: string = ""): string {
        return `use_${where}_by_${who}_for_${why}`;
    }

    /**
     * 自动生成一个唯一的资源id
     */
    public nextUseKey(): string {
        return `@${++this._usedId}`;
    }

    /**
     * 获取资源缓存信息
     * @param uuid 资源uuid
     */
    public getCacheResInfo(uuid: string): ICacheResInfo {
        return this._resMap.get(uuid);
    }

    /**
     * 完成一个Item的加载
     * @param item 资源对象实例
     * @param bundleName 包名
     * @param use 资源使用key
     * @param stack 堆栈信息
     */
    private _finishItem(item: any, bundleName?: string, use?: string, stack?: string) {
        if (!this._cacheItem(item, bundleName, use, stack)) {
            cc.warn(`_cacheItem item error! for ${item._uuid}`);
        }
    }

    /**
     * 缓存一个Item
     * @param item 资源对象实例
     * @param bundleName 包名
     * @param use 资源使用key
     * @param stack 堆栈信息
     */
    private _cacheItem(item: any, bundleName?: string, use?: string, stack?: string) {
        if (cc.isValid(item) && item._uuid) {
            if (!this._resMap.has(item._uuid)) {
                // 不存在，添加map记录
                this._resMap.set(item._uuid, {
                    bundleName: bundleName,
                    uses: new Set<string>(),
                });
                item.addRef();
            }

            let info = this.getCacheResInfo(item._uuid);
            if (info && use) {
                info.uses.add(use);
                resLeakChecker.logLoad(item._uuid, use, stack);
            }

            return true;
        }
        return false;
    }

    /**
     * 为某资源增加一个新的use
     * @param key 资源的uuid
     * @param use 新的use字符串
     */
    public addUse(key: string, use: string): boolean {
        if (this._resMap.has(key)) {
            let uses = this._resMap.get(key).uses;
            if (!uses.has(use)) {
                uses.add(use);
                resLeakChecker.logLoad(key, use);
                return true;
            } else {
                console.warn(`addUse ${key} by ${use} faile, repeating use key`);
                return false;
            }
        }
        console.warn(`addUse ${key} faile, key nofound, make sure you load with resloader`);
        return false;
    }

    /**
     * 加载单个或一组资源
     * @param resArgs 
     * @param paths 资源路径（数组）
     * @param type 资源类型
     * @param onProgress 加载进度回调函数
     * @param onComplete 加载完成回调函数
     * @param bundleName 包名
     * @param use 资源使用key
     */
    loadRes(resArgs: LoadResArgs): void;
    loadRes(paths: string | string[], type: typeof cc.Asset, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadRes(paths: string | string[], onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadRes(paths: string | string[], type: typeof cc.Asset, onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadRes(paths: string | string[], onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadRes(paths: string | string[], type: typeof cc.Asset, bundleName: string, use: string): void;
    loadRes(paths: string | string[], bundleName: string, use: string): void;
    loadRes() {
        let resArgs: LoadResArgs = ResUtils.makeLoadResArgs.apply(this, arguments);

        //如果是游戏的bundle ,那么根据高低清分辨率区分
        resArgs.bundleName = ComUtils.getRealBundle(resArgs.bundleName, resArgs.url || resArgs.urls);

        if (!resArgs) return;
        let stack: string;
        if (resLeakChecker.checkFilter(resArgs.url)) {
            // paths为数组时，checkFilter总会通过
            stack = ComUtils.getCallStack(1);
        }

        let finishCb: CompleteCallback = <T extends cc.Asset>(err: Error, assets: T | Array<T>) => {
            if (!err) {
                // console.log(assets);
                if (assets instanceof Array) {
                    for (let i = 0; i < assets.length; ++i) {
                        this._finishItem(assets[i], resArgs.bundleName, resArgs.use, stack);
                    }
                } else {
                    this._finishItem(assets, resArgs.bundleName, resArgs.use, stack);
                }
            } else {
                console.error(err);
            }
            if (resArgs.onComplete) {
                resArgs.onComplete(err, assets);
            }
        };

        let bundle = cc.assetManager.getBundle(resArgs.bundleName);
        if (cc.isValid(bundle)) {
            if (resArgs.url) {
                bundle.load(resArgs.url, resArgs.type, resArgs.onProgress, finishCb);
            } else {
                bundle.load(resArgs.urls, resArgs.type, resArgs.onProgress, finishCb);
            }
        } else {
            console.error(`ResLoader.loadRes() - bundle[${resArgs.bundleName}]获取失败`);
        }
    }

    /**
     * 预加载单个或一组资源
     * @param resArgs 
     * @param paths 资源路径（数组）
     * @param type 资源类型
     * @param onProgress 加载进度回调函数
     * @param onComplete 加载完成回调函数
     * @param bundleName 包名
     */
    preloadRes(resArgs: LoadResArgs): void;
    preloadRes(paths: string | string[], type: typeof cc.Asset, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string): void;
    preloadRes(paths: string | string[], onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string): void;
    preloadRes(paths: string | string[], type: typeof cc.Asset, onComplete: CompleteCallback, bundleName: string): void;
    preloadRes(paths: string | string[], onComplete: CompleteCallback, bundleName: string): void;
    preloadRes(paths: string | string[], type: typeof cc.Asset, bundleName: string): void;
    preloadRes(paths: string | string[], bundleName: string): void;
    preloadRes() {
        let resArgs: LoadResArgs = ResUtils.makeLoadResArgs.apply(this, arguments);
        if (!resArgs) return;

        //如果是游戏的bundle ,那么根据高低清分辨率区分
        resArgs.bundleName = ComUtils.getRealBundle(resArgs.bundleName, resArgs.url || resArgs.urls);

        let bundle = cc.assetManager.getBundle(resArgs.bundleName);
        if (cc.isValid(bundle)) {
            if (resArgs.url) {
                bundle.preload(resArgs.url, resArgs.type, resArgs.onProgress, resArgs.onComplete);
            } else {
                bundle.preload(resArgs.urls, resArgs.type, resArgs.onProgress, resArgs.onComplete);
            }
        } else {
            console.error(`ResLoader.preloadRes() - bundle[${resArgs.bundleName}]获取失败`);
        }
    }

    /**
     * 加载目标文件夹资源
     * @param resArgs 
     * @param dir 文件夹路径
     * @param type 资源类型
     * @param onProgress 加载进度回调函数
     * @param onComplete 加载完成回调函数
     * @param bundleName 包名
     * @param use 资源使用key
     */
    loadResDir(resArgs: LoadResArgs): void;
    loadResDir(dir: string, type: typeof cc.Asset, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadResDir(dir: string, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadResDir(dir: string, type: typeof cc.Asset, onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadResDir(dir: string, type: typeof cc.Asset, bundleName: string, use: string): void;
    loadResDir(dir: string, onComplete: CompleteCallback, bundleName: string, use: string): void;
    loadResDir(dir: string, bundleName: string, use: string): void;
    loadResDir() {
        let resArgs: LoadResArgs = ResUtils.makeLoadResArgs.apply(this, arguments);
        if (!resArgs) return;

        //如果是游戏的bundle ,那么根据高低清分辨率区分
        resArgs.bundleName = ComUtils.getRealBundle(resArgs.bundleName, resArgs.url || resArgs.urls);

        let stack: string;
        if (resLeakChecker.checkFilter(resArgs.url)) {
            stack = ComUtils.getCallStack(1);
        }

        let finishCb: CompleteCallback = <T extends cc.Asset>(err: Error, assets: T | Array<T>) => {
            if (!err) {
                // console.log(assets);
                if (assets instanceof Array) {
                    for (let i = 0; i < assets.length; ++i) {
                        this._finishItem(assets[i], resArgs.bundleName, resArgs.use, stack);
                    }
                } else {
                    this._finishItem(assets, resArgs.bundleName, resArgs.use, stack);
                }
            } else {
                console.error(err);
            }
            if (resArgs.onComplete) {
                resArgs.onComplete(err, assets);
            }
        };

        let bundle = cc.assetManager.getBundle(resArgs.bundleName);
        if (cc.isValid(bundle)) {
            bundle.loadDir(resArgs.url, resArgs.type, resArgs.onProgress, finishCb);
        } else {
            console.error(`ResLoader.loadResDir() - bundle[${resArgs.bundleName}]获取失败`);
        }
    }

    /**
     * 预加载目标文件夹资源
     * @param resArgs 
     * @param dir 文件夹路径
     * @param type 资源类型
     * @param onProgress 加载进度回调函数
     * @param onComplete 加载完成回调函数
     * @param bundleName 包名
     */
    preloadResDir(resArgs: LoadResArgs): void;
    preloadResDir(dir: string, type: typeof cc.Asset, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string): void;
    preloadResDir(dir: string, onProgress: ProgressCallback, onComplete: CompleteCallback, bundleName: string): void;
    preloadResDir(dir: string, type: typeof cc.Asset, onComplete: CompleteCallback, bundleName: string): void;
    preloadResDir(dir: string, type: typeof cc.Asset, bundleName: string): void;
    preloadResDir(dir: string, onComplete: CompleteCallback, bundleName: string): void;
    preloadResDir(dir: string, bundleName: string): void;
    preloadResDir() {
        let resArgs: LoadResArgs = ResUtils.makeLoadResArgs.apply(this, arguments);
        if (!resArgs) return;

        //如果是游戏的bundle ,那么根据高低清分辨率区分
        resArgs.bundleName = ComUtils.getRealBundle(resArgs.bundleName, resArgs.url || resArgs.urls);

        let bundle = cc.assetManager.getBundle(resArgs.bundleName);
        if (cc.isValid(bundle)) {
            bundle.preloadDir(resArgs.url, resArgs.type, resArgs.onProgress, resArgs.onComplete);
        } else {
            console.error(`ResLoader.preloadResDir() - bundle[${resArgs.bundleName}]获取失败`);
        }
    }

    /**
     * 预加载一堆资源
     * @param res 混合资源结构体
     * @param onProgress 加载进度回调（因不可控原因，进度存在回跳可能，需自行处理）
     * @param onComplete 加载完成回调（res数组任意元素完成预载入都会回调）
     */
    preloadResMix(res: LoadResMixArgs[], onProgress: ProgressCallback, onComplete: CompleteCallback) {
        let finishArr = [], totalArr = [];
        let finishNum = function () {
            let ret = 0;
            for (let i = 0; i < finishArr.length; ++i) {
                ret += finishArr[i];
            }
            return ret;
        }
        let totalNum = function () {
            let ret = 0;
            for (let i = 0; i < totalArr.length; ++i) {
                ret += totalArr[i];
            }
            return ret;
        }

        for (let i = 0; i < res.length; ++i) {
            finishArr.push(0);
            totalArr.push(0);

            let tmpRes = res[i];
            if (!tmpRes.bundleName) tmpRes.bundleName = 'resources';

            //如果是游戏的bundle ,那么根据高低清分辨率区分
            tmpRes.bundleName = ComUtils.getRealBundle(tmpRes.bundleName, tmpRes.url || tmpRes.urls);

            let bundle = cc.assetManager.getBundle(tmpRes.bundleName);
            if (cc.isValid(bundle)) {
                let progressCb: ProgressCallback = (finish: number, total: number, item: any) => {
                    finishArr[i] = finish;
                    totalArr[i] = total;
                    if (onProgress) onProgress(finishNum(), totalNum(), item);
                };

                let finishCb: CompleteCallback = (err: Error, assets: any) => {
                    if (err) console.log(err);
                    if (onComplete) onComplete(err, assets);
                };

                if (tmpRes.dir) {
                    bundle.preloadDir(tmpRes.dir, tmpRes.type, progressCb, finishCb);
                } else {
                    if (tmpRes.url) {
                        bundle.preload(tmpRes.url, tmpRes.type, progressCb, finishCb);
                    } else {
                        bundle.preload(tmpRes.urls, tmpRes.type, progressCb, finishCb);
                    }
                }
            } else {
                console.error(`ResLoader.preloadResMix() - bundle[${tmpRes.bundleName}]获取失败`);
            }
        }
    }

    /**
     * 加载远端资源
     * @param resArgs 
     * @param url 远端地址
     * @param options 可选参数
     * @param onComplete 完成回调
     * @param use 资源使用key
     */
    loadRemote(resArgs: LoadRemoteArgs): void;
    loadRemote(url: string, options: Record<string, any>, onComplete: CompleteCallback, use: string): void;
    loadRemote(url: string, options: Record<string, any>, use: string): void;
    loadRemote(url: string, onComplete: CompleteCallback, use: string): void;
    loadRemote(url: string, use: string): void;
    loadRemote() {
        let resArgs: LoadRemoteArgs = ResUtils.makeLoadRemoteArgs.apply(this, arguments);
        if (!resArgs) return;
        let stack: string;
        if (resLeakChecker.checkFilter(resArgs.url)) {
            stack = ComUtils.getCallStack(1);
        }

        let finishCb: CompleteCallback = <T extends cc.Asset>(err: Error, assets: T) => {
            if (!err) {
                // console.log(assets);
                this._finishItem(assets, undefined, resArgs.use, stack);
            } else {
                console.error(err);
            }
            if (resArgs.onComplete) {
                resArgs.onComplete(err, assets);
            }
        };
        cc.assetManager.loadRemote(resArgs.url, resArgs.options, finishCb);
    }

    /**
     * 直接通过asset释放资源（如cc.Prefab、cc.SpriteFrame）
     * @param asset 要释放的asset
     * @param use 资源使用key
     */
    public releaseAsset(asset: any, use: string) {
        if (cc.isValid(asset) && asset._uuid) {
            let uuid = asset._uuid;
            let info = this.getCacheResInfo(uuid);
            if (info) {
                if (use) {
                    info.uses.delete(use);
                    resLeakChecker.logRelease(uuid, use);
                }

                if (info.uses.size <= 0) {
                    asset.decRef();
                    this._resMap.delete(uuid);
                }
            }
        }
    }

    /**
     * 释放一组asset
     * @param assets 要释放的asset数组
     * @param use 资源使用key
     */
    public releaseArray(assets: cc.Asset[], use: string) {
        for (let i = 0; i < assets.length; ++i) {
            this.releaseAsset(assets[i], use);
        }
    }

    /**
     * 释放包中所有资源
     * @param bundleName 包名，不填则删除全部网络资源
     */
    public releaseAll(bundleName?: string) {
        let delArr = [];

        //如果是游戏的bundle ,那么根据高低清分辨率区分
        bundleName = ComUtils.getRealBundle(bundleName);

        if (bundleName) {
            let bundle = cc.assetManager.getBundle(bundleName);
            if (cc.isValid(bundle)) {
                bundle.releaseAll();

                this._resMap.forEach((resInfo, uuid) => {
                    //如果是游戏的bundle ,那么根据高低清分辨率区分
                    resInfo.bundleName = ComUtils.getRealBundle(resInfo.bundleName);

                    if (resInfo.bundleName == bundleName) delArr.push(uuid);
                });
            }
        } else {
            this._resMap.forEach((resInfo, uuid) => {
                if (!resInfo.bundleName) {

                    //如果是游戏的bundle ,那么根据高低清分辨率区分
                    bundleName = ComUtils.getRealBundle(resInfo.bundleName);

                    let asset = cc.assetManager.assets.get(uuid);
                    if (cc.isValid(asset)) cc.assetManager.releaseAsset(asset);

                    delArr.push(uuid);
                }
            })
        }

        for (let i = 0; i < delArr.length; ++i) {
            this._resMap.delete(delArr[i]);
        }
    }
}

export let resLoader = ResLoader.getInstance();