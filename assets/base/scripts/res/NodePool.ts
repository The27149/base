/**
 * Prefab的实例对象池管理类，目标为减少instantiate的次数，复用Node
 */

import { resLoader } from "./ResLoader";

const { ccclass, property } = cc._decorator;

export type NodePoolCallback = (err: Error, nodePool: NodePool) => void;
const _useKey: string = '@NodePool';

@ccclass
export default class NodePool {

    private _isReady: boolean = false;
    private _createCount: number = 0;
    private _warterMark: number = 10;
    private _res: cc.Prefab = null;
    private _bundleName: string = null;
    private _nodes: Array<cc.Node> = new Array<cc.Node>();
    private _resIsPrefab: boolean = false;

    public isReady() { return this._isReady; }

    /**
     * 初始化NodePool(每个pool只调用一次)
     * 如果使用url来初始化，需要检查isReady，否则获取node会返回null
     * @param url 资源路径
     * @param finishCallback 完成回调
     * @param bundleName 包名
     */
    public init(url: string | cc.Prefab, finishCallback: NodePoolCallback, bundleName: string) {
        this._bundleName = bundleName;
        if (typeof (url) == "string") {
            resLoader.loadRes(url, cc.Prefab, (err: Error, prefab: cc.Prefab) => {
                if (!err) {
                    this._res = prefab;
                    this._isReady = true;
                }
                if (finishCallback) {
                    finishCallback(err, this);
                }
            }, this._bundleName, _useKey);
        } else {
            if (!this._res && cc.isValid(url)) {
                this._resIsPrefab = true;
                url.addRef();
                this._res = url;
                this._isReady = true;
                if (finishCallback) {
                    finishCallback(null, this);
                }
            }
        }

    }

    /**
     * 获取或创建一个Prefab实例Node
     */
    public getNode(): cc.Node {
        if (!this.isReady) {
            return null;
        }

        if (this._nodes.length > 0) {
            return this._nodes.pop();
        } else {
            this._createCount++;
            return cc.instantiate(this._res);
        }
    }

    /**
     * 回收Node实例
     * @param node 要回收的Prefab实例
     */
    public freeNode(node: cc.Node) {
        if (!(node && cc.isValid(node))) {
            cc.error('[ERROR] PrefabPool: freePrefab: isValid node');
            this._createCount--;
            return;
        }
        if (this._warterMark < this._nodes.length) {
            this._createCount--;
            node.destroy();
        } else {
            node.removeFromParent(true);
            node.cleanup();
            this._nodes.push(node);
        }
    }

    /**
     * 设置回收水位
     * @param waterMakr 水位
     */
    public setWaterMark(waterMakr: number) {
        this._warterMark = waterMakr;
    }

    /**
     * 池子里的prefab是否都没有使用
     */
    public isUnuse() {
        if (this._nodes.length > this._createCount) {
            cc.error('PrefabPool: _nodes.length > _createCount');
        }
        return this._nodes.length == this._createCount;
    }

    /**
     * 清空prefab
     */
    public destory() {
        // 清空节点、回收资源
        for (let node of this._nodes) {
            node.destroy();
        }
        this._createCount -= this._nodes.length;
        this._nodes.length = 0;
        if (this._resIsPrefab) {
            this._res.addRef();
        } else {
            resLoader.releaseAsset(this._res, _useKey);
        }
    }
}
