/**
 * 资源工具类
 */

import { LogManager } from "../log/LogManager";
import ResKeeper from "./ResKeeper";
import { resLoader } from "./ResLoader";

const {ccclass, property} = cc._decorator;

export type ProgressCallback = (finish: number, total: number, item: any) => void;
export type CompleteCallback = (err: Error, assets: any|any[]) => void;

/**
 * LoadRes方法的参数结构
 * @param url 单个资源路径
 * @param urls 资源路径数组
 * @param type 资源类型
 * @param onProgress 进度回调
 * @param onComplete 完成回调
 * @param bundleName 包名
 * @param use 资源使用key
 */
export class LoadResArgs {
    url?: string;
    urls?: string[];
    type?: typeof cc.Asset;
    onProgress?: ProgressCallback;
    onComplete?: CompleteCallback;
    bundleName?: string;
    use?: string;
}

/**
 * loadRemote方法的参数结构
 * @param url 单个资源路径
 * @param options 可选参数
 * @param onComplete 完成回调
 * @param use 资源使用key
 * 
 */
export class LoadRemoteArgs {
    url?: string;
    options?: Record<string, any>;
    onComplete?: CompleteCallback;
    use?: string;
}

/**
 * preloadResMix方法的参数结构（url、urls、dir互斥，择一填充）
 * @param url 单个资源路径
 * @param urls 资源路径数组
 * @param dir 资源目录
 * @param type 资源类型
 * @param bundleName 包名
 */
export class LoadResMixArgs {
    url?: string;               // 本地资源路径
    urls?: string[];            // 本地资源路径数组
    dir?: string;               // 本地资源目录
    type?: typeof cc.Asset;     // 资源类型
    bundleName?: string;        // 包名，默认为'resources'
}

// 缓存（已加载）资源结构体
export interface ICacheResInfo {
    bundleName: string,
    uses: Set<string>,
}

// 兼容性处理
let isChildClassOf = cc.js["isChildClassOf"]
if (!isChildClassOf) {
    isChildClassOf = cc["isChildClassOf"];
}

@ccclass
export class ResUtils {

    /**
     * ResLoader 加载接口参数预处理
     */
    public static makeLoadResArgs(): LoadResArgs {
        if (arguments.length < 1) {
            console.error(`makeLoadResArgs error ${arguments}`);
            return null;
        }

        let ret: LoadResArgs = {bundleName: 'resources'};
        if (typeof arguments[0] == 'string') {
            ret.url = arguments[0];
        } else if (arguments[0] instanceof Array) {
            ret.urls = arguments[0];
        } else if (arguments.length == 1 && (arguments[0] instanceof Object)) {
            // 结构体 LoadResArgs
            return arguments[0];
        } else {
            console.error(`makeLoadResArgs error ${arguments}`);
            return null;
        }

        for (let i = 1; i < arguments.length; ++i) {
            if (i == 1 && isChildClassOf(arguments[i], cc.Asset)) {
                // 判断是不是第一个参数type
                ret.type = arguments[i];
            } else if (typeof arguments[i] == "string") {
                if (i >= 2 && typeof arguments[i - 1] == 'string') {
                    // use
                    ret.use = arguments[i];
                } else {
                    // bundleName
                    ret.bundleName = arguments[i];
                }
            } else if (typeof arguments[i] == "function") {
                // 其他情况为函数
                if (arguments.length > i + 1 && typeof arguments[i + 1] == "function") {
                    ret.onProgress = arguments[i];
                } else {
                    ret.onComplete = arguments[i];
                }
            }
        }

        return ret;
    }

    /**
     * ResLoaderManager.loadRemote 方法的参数预处理
     */
    public static makeLoadRemoteArgs(): LoadRemoteArgs {
        if (arguments.length < 1) {
            console.error(`makeLoadRemoteArgs error ${arguments}`);
            return null;
        }

        let ret: LoadRemoteArgs = {};
        if (typeof arguments[0] == 'string') {
            ret.url = arguments[0];
        } else if (arguments.length == 1 && (arguments[0] instanceof Object)) {
            // 结构体 LoadRemoteArgs
            return arguments[0];
        } else {
            console.error(`makeLoadRemoteArgs error ${arguments}`);
            return null;
        }

        for (let i = 1; i < arguments.length; ++i) {
            if (typeof arguments[i] == 'function') {
                ret.onComplete = arguments[i];
            } else if (typeof arguments[i] == 'string') {
                ret.use = arguments[i];
            } else {
                ret.options = arguments[i];
            }
        }
        return ret;
    }

    /**
     * 从目标节点或其父节点递归查找一个资源挂载组件
     * @param attachNode 目标节点
     * @param autoCreate 当目标节点找不到ResKeeper时是否自动创建一个
     */
    public static getResKeeper(attachNode: cc.Node, autoCreate?: boolean): ResKeeper {
        if (attachNode) {
            let ret = attachNode.getComponent(ResKeeper);
            if (!ret) {
                if (autoCreate) {
                    return attachNode.addComponent(ResKeeper);
                } else {
                    return ResUtils.getResKeeper(attachNode.parent, autoCreate);
                }
            }
            return ret;
        }
        return null;
    }

    /**
     * 赋值srcAsset（通过框架接口动态加载），并使其跟随targetNode自动释放，用法如下
     * mySprite.spriteFrame = AssignWith(otherSpriteFrame, mySpriteNode);
     * @param srcAsset 用于赋值的资源，如cc.SpriteFrame、cc.Texture等等
     * @param targetNode 
     * @param autoCreate 
     */
    public static assignWith(srcAsset: any, targetNode: cc.Node, autoCreate?: boolean): any {
        let keeper = ResUtils.getResKeeper(targetNode, autoCreate);
        if (cc.isValid(keeper) && cc.isValid(srcAsset) && cc.isValid(targetNode)) {
            let useKey = '@' + keeper.constructor.name + resLoader.nextUseKey();
            if (resLoader.addUse(srcAsset._uuid, useKey)) {
                keeper.addAutoRes({ asset: srcAsset, use: useKey });
                return srcAsset;
            }
        }
        console.error(`AssignWith ${srcAsset} to ${targetNode} fail`);
        return null;
    }

    // 打印已加载资源
    public static dumpRes() {
        LogManager.getInstance().console('assetManager已加载资源: --');
        LogManager.getInstance().console(cc.assetManager.assets);
    }

    // 打印已加载资源
    public static dumpBundle() {
        LogManager.getInstance().console('assetManager已加载bundle: --')
        LogManager.getInstance().console(cc.assetManager.bundles);
    }
}
