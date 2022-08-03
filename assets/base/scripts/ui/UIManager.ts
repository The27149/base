/**
 * 界面管理类
 * 
 * 1.打开界面，根据配置自动加载界面、调用初始化、播放打开动画、隐藏其他界面、屏蔽下方界面点击
 * 2.关闭界面，根据配置自动关闭界面、播放关闭动画、恢复其他界面
 * 3.切换界面，与打开界面类似，但是是将当前栈顶的界面切换成新的界面（先关闭再打开）
 * 4.提供界面缓存功能
 */

import { LogManager } from "../log/LogManager";
import { IAutoResInfo } from "../res/ResKeeper";
import { resLoader } from "../res/ResLoader";
import { ProgressCallback } from "../res/ResUtils";
import UIView, { UIShowTypes } from "./UIView";

const { ccclass, property } = cc._decorator;

const _useKey: string = '@UIManager';

/**
 * UI栈结构体
 * @param uiId 界面id
 * @param uiView UIView对象
 * @param uiArgs 附加参数
 * @param preventNode 遮罩层
 * @param zOrder 层级
 * @param isClose 是否关闭
 * @param resToClear 待清理资源数组（预留）
 * @param resCache 带缓冲资源数组（预留）
*/
export interface IUIInfo {
    uiId: number;                   // 界面id
    uiView: UIView;                 // UIView对象
    uiArgs: any;                    // 附加参数
    preventNode?: cc.Node;          // 遮罩层
    zOrder?: number;                // 层级
    isClose?: boolean;              // 是否关闭
    resToClear?: string[];          // 待清理资源（预留）
    resCache?: string[];            // 待缓存资源（预留）
}

/**
 * UI配置结构体
 * @param bundleName 包名，默认'resources'
 * @param path prefab路径
 * @param preventTouch 是否需要创建遮罩层，默认 false
 * @param preventKeyboard 是否拦截按键，默认 false（行为意识，不做实际事件拦截，使用 UIManager.getInstance().preventKeyboard 判定当前整体状态）
 * @param quickClose 是否支持快速关闭，默认 false
 * @param cache 界面关闭是否缓存，默认 false
 * @param showType 界面展示类型，默认 UIShowTypes.UI_SINGLE
 * @param openAni 界面开启动画，默认 UIDefAni.UI_OPEN
 * @param closeAni 界面关闭动画，默认 UIDefAni.UI_CLOSE
 * @param zOrder 层级
 * @param loadingAni 是否显示加载loading动画 默认 true
 * @param preventTouchOpacity 遮罩透明度，0~255,默认 180
 */
export interface IUIConf {
    /**bundle */
    bundleName?: string;
    /**prefab路径 */
    path: string;               // 
    /**是否需要创建遮罩层，默认 false */
    preventTouch?: boolean;     // 
    /**是否拦截按键，默认 false（行为意识，不做实际事件拦截，使用 UIManager.getInstance().preventKeyboard 判定当前整体状态） */
    preventKeyboard?: boolean;  // 
    /**是否支持快速关闭，默认 false */
    quickClose?: boolean;       // 
    /**界面关闭是否缓存，默认 false */
    cache?: boolean;            // 
    /**界面展示类型，默认 UIShowTypes.UI_SINGLE */
    showType?: UIShowTypes;     // 
    /**界面开启动画，默认 UIDefAni.UI_OPEN */
    openAni?: string;           // 
    /**界面关闭动画，默认 UIDefAni.UI_CLOSE */
    closeAni?: string;          // 
    /**层级 */
    zOrder?: number;            // 
    /**是否显示加载loading动画 默认 true */
    loadingAni?: boolean;        // 
    /**遮罩透明度，0~255,默认 180 */
    preventTouchOpacity?: number;// 
}

/**
 * 附加参数基类(按需继承，非必要)
 * @param openType 界面打开类型，'quiet'时忽略open动画配置，不播动画直接打开
 */
export interface IUIArgs {
    openType?: 'quiet' | 'other';       // 界面打开类型，'quiet'时忽略open动画配置，不播动画直接打开
}

/**
 * UI默认动画
 * @param UI_NONE 无动画
 * @param UI_OPEN 打开
 * @param UI_CLOSE 关闭
 */
export enum UIDefAni {
    UI_NONE = 'uiNone',     // 无动画
    UI_OPEN = 'uiOpen',     // 打开
    UI_CLOSE = 'uiClose',   // 关闭
}

@ccclass
export default class UIManager {

    private static _instance: UIManager = null;
    // 根节点（所有open节点以此为父节点，默认为 Canvas）
    private _rootNode: cc.Node = null;
    // 背景UI数量（有若干层UI作为背景UI，不受切换影响）
    private _backgroundUI: number = 0;
    // 是否正在关闭UI
    private _isClosing = false;
    // 是否正在打开UI
    private _isOpening = false;

    // UI界面缓存
    private _uiCache: { [uiId: number]: UIView } = {};
    // UI界面堆栈
    private _uiStack: IUIInfo[] = [];
    // UI待打开列表
    private _uiOpenQueue: IUIInfo[] = [];
    // UI待关闭列表
    private _uiCloseQueue: UIView[] = [];
    // UI配置
    private _uiConf: { [key: number]: IUIConf } = {};
    // 纯白色贴图(常驻内存，勿删)
    private _pureWhiteSPF: cc.SpriteFrame = null;
    private _pureWhiteLoading: boolean = false;
    // 是否拦截按键（行为意识，不做实际拦截）
    private _preventKeyboard: boolean = false;

    // 纯白色贴图(常驻内存，勿删)
    private _loadingIconSPF: cc.SpriteFrame = null;
    private _loadingIconLoading: boolean = false;

    private _loadingMaskNode: cc.Node = null;
    private _loadingIconNode: cc.Node = null;

    private constructor() {

    }

    public static getInstance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    public getPureWhiteSPF(): cc.SpriteFrame {
        if (!cc.isValid(this._pureWhiteSPF) && !this._pureWhiteLoading) {
            this._pureWhiteLoading = true;
            resLoader.loadRes('textures/pureWhite', cc.SpriteFrame, (err: Error, asset: cc.SpriteFrame) => {
                if (!err) this._pureWhiteSPF = asset;
                this._pureWhiteLoading = false;
            }, 'base', _useKey + '@pureWhite');
        }

        return this._pureWhiteSPF;
    }

    private getLoadingIcon(): cc.SpriteFrame {
        if (!cc.isValid(this._loadingIconSPF) && !this._loadingIconLoading) {
            this._loadingIconLoading = true;
            resLoader.loadRes('textures/loadingIcon', cc.SpriteFrame, (err: Error, asset: cc.SpriteFrame) => {
                if (!err) this._loadingIconSPF = asset;
                this._loadingIconLoading = false;
            }, 'base', _useKey + '@pureWhite');
        }

        return this._loadingIconSPF;
    }

    // 设置根节点(如需设置，请在 initUIConf 之前调用)
    public setRootNode(node: cc.Node) {
        if (cc.isValid(this._rootNode)) {
            LogManager.getInstance().console('UIManager.setRootNode(): 重复设置根节点');
            return;     // 设置过，返回
        }
        if (cc.isValid(node)) {
            this._rootNode = node;
        } else {
            console.error('UIManager.setRootNode(): 设置根节点无效');
        }
    }

    // 获取根节点
    public getRootNode(): cc.Node {
        if (!cc.isValid(this._rootNode)) this._rootNode = cc.find('Canvas');
        return this._rootNode;
    }

    // 设置背景UI数量
    public setBackgroundUI(count: number) {
        this._backgroundUI = count;
    }

    /**
     * 初始化所有UI配置对象
     * @param conf 配置对象
     */
    public initUIConf(conf: { [key: number]: IUIConf }): void {
        this._uiConf = conf;
        this.getPureWhiteSPF();
        this.getLoadingIcon();
    }

    /**
     * 设置或覆盖某界面配置
     * @param uiId 待设置界面id
     * @param conf 配置对象
     */
    public setUIConf(uiId: number, conf: IUIConf) {
        this._uiConf[uiId] = conf;
    }

    /**
     * 添加防触摸层
     * @param zOrder 屏蔽层层级
     */
    private _preventTouch(zOrder: number) {
        let node = new cc.Node();
        node.name = 'preventTouch';
        node.setContentSize(cc.size(10000, 10000));
        let sprite = node.addComponent(cc.Sprite);
        if (cc.isValid(sprite)) {
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.getPureWhiteSPF();
            node.color = new cc.Color(0, 0, 0);
            node.opacity = 180;
        }
        node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            event.stopPropagation();
        }, node);
        let parent = this.getRootNode();
        parent.addChild(node, zOrder);
        return node;
    }

    private showLoadingIcon(uiInfo: IUIInfo): void {
        let parent = this.getRootNode();
        let zOrder = uiInfo.zOrder;
        if (!uiInfo.preventNode || uiInfo.preventNode.opacity < 80) {//本身没有屏蔽遮罩或其透明度低的才加另一层loading遮罩
            if (!this._loadingMaskNode) {
                this._loadingMaskNode = this._preventTouch(zOrder + 1);
                this._loadingMaskNode.name = "loadingMaskNode";
            } else {
                parent.addChild(this._loadingMaskNode, zOrder + 1);
            }
        }
        if (!this._loadingIconNode) {
            let loadingIconNode = new cc.Node();
            loadingIconNode.name = "loadingIcon";
            let sp = loadingIconNode.addComponent(cc.Sprite);
            sp.spriteFrame = this.getLoadingIcon();
            this._loadingIconNode = loadingIconNode;
            parent.addChild(this._loadingIconNode);
        }
        if (!this._loadingIconNode.parent) {
            cc.Tween.stopAllByTarget(this._loadingIconNode);
            parent.addChild(this._loadingIconNode);
        }
        this._loadingIconNode.zIndex = zOrder + 2;
        this._loadingIconNode.active = false;
        this._loadingMaskNode && (this._loadingMaskNode.opacity = 0);
        uiInfo.preventNode && (uiInfo.preventNode.opacity = 0);

        cc.tween(this).delay(0.5).call(() => {//0.5秒后才显示转圈
            this._loadingMaskNode && (this._loadingMaskNode.opacity = 180);
            uiInfo.preventNode && (uiInfo.preventNode.opacity = 180);
            this._loadingIconNode.active = true;
            cc.tween(this._loadingIconNode).repeatForever(cc.tween(this._loadingIconNode).by(0.5, { angle: 360 })).start();
        }).start();
    }

    // 自动执行下一个待关闭或待打开界面
    private _autoExecNextUI() {
        // 逻辑上先关后开
        if (this._uiCloseQueue.length > 0) {
            let uiView: UIView = this._uiCloseQueue[0];
            this._uiCloseQueue.splice(0, 1);
            this.close(uiView);
        } else if (this._uiOpenQueue.length > 0) {
            let uiInfo: IUIInfo = this._uiOpenQueue[0];
            this._uiOpenQueue.splice(0, 1);
            this.open(uiInfo.uiId, uiInfo.uiArgs);
        }
    }

    /**
     * 自动检测动画组件及特定动画，如存在则播放，无论动画是否播放，都执行回调
     * @param uiView ui对象
     * @param aniName 动画名
     * @param aniOverCallback 动画播放完成回调
     */
    private _autoExecAnimation(uiView: UIView, aniName: string, aniOverCallback: () => void) {
        this._playDefAnimation(uiView, aniName, aniOverCallback);
    }

    /**
     * 播放默认动画
     * @param uiView ui对象
     * @param aniName 动画名
     * @param aniOverCallback 动画播放完成回调
     */
    private _playDefAnimation(uiView: UIView, aniName: string, aniOverCallback: () => void) {
        let target = uiView.node;
        switch (aniName) {
            case UIDefAni.UI_OPEN:
                cc.Tween.stopAllByTarget(target);
                target.setScale(0.2);   // 先设置初始缩放
                cc.tween(target)
                    .to(0.2, { scale: 1 })
                    .call(aniOverCallback)
                    .start();
                break;
            case UIDefAni.UI_CLOSE:
                cc.Tween.stopAllByTarget(target);
                cc.tween(target)
                    .to(0.2, { scale: 0.2 })
                    .call(aniOverCallback)
                    .start();
                break;
            default:
                aniOverCallback();
                break;
        }
    }

    /**
     * 自动检测资源预加载组件，如果存在则加载完成后调用onComplete，否则直接调用
     * @param uiView ui对象
     * @param onComplete 资源加载完成回调
     */
    private _autoLoadRes(uiView: UIView, onComplete: () => void) {
        // 暂时先省略
        onComplete();
    }

    // UI栈排序
    private _sortUIStack() {
        this._uiStack.sort(function (aInfo, bInfo) {
            return aInfo.zOrder - bInfo.zOrder;
        });
    }

    // 根据界面类型刷新显示UI
    private _updateUI() {
        let hideIndex = 0;
        let showIndex = this._uiStack.length - 1;

        for (; showIndex >= 0; --showIndex) {
            let uiView = this._uiStack[showIndex].uiView;
            if (cc.isValid(uiView)) {
                let mode = uiView.showType;
                // 任何模式，顶部UI都应显示
                uiView.node.active = true;
                if (UIShowTypes.UI_FULLSCREEN == mode) {
                    break;
                } else if (UIShowTypes.UI_SINGLE == mode) {
                    for (let i = 0; i < this._backgroundUI; ++i) {
                        if (this._uiStack[i]) this._uiStack[i].uiView.node.active = true;
                    }
                    hideIndex = this._backgroundUI;
                    break;
                }
            }
        }

        // 隐藏不该显示的UI
        for (let hide = hideIndex; hide < showIndex; ++hide) {
            let uiView = this._uiStack[hide].uiView;
            if (uiView) uiView.node.active = false;
        }

        this._checkKeyboard();
    }

    // 检测是否拦截按键
    private _checkKeyboard() {
        this._preventKeyboard = false;
        for (let i = 0; i < this._uiStack.length; ++i) {
            let uiView = this._uiStack[i].uiView;
            if (cc.isValid(uiView) && uiView.node.active) {
                let uiId = this._uiStack[i].uiId;
                let uiConf = this._uiConf[uiId];
                if (uiConf && uiConf.preventKeyboard) {
                    this._preventKeyboard = true;
                    break;
                }
            }
        }
    }

    // 获取拦截按键状态
    public get preventKeyboard() {
        return this._preventKeyboard;
    }

    private _getOrCreateUI(uiId: number, onProgress: ProgressCallback, onComplete: (uiView: UIView) => void, uiArgs: any) {
        // 存在缓存对象，直接返回
        let uiView: UIView = this._uiCache[uiId];
        if (uiView) {
            onComplete(uiView);
            return;
        }

        // 找到UI配置
        let uiConf = this._uiConf[uiId];
        if (!uiConf) {
            LogManager.getInstance().console(`_getOrCreateUI ${uiId} faile, _uiConf not found`);
            onComplete(null);
            return;
        }

        let uiPath = uiConf.path;
        if (!uiPath) {
            LogManager.getInstance().console(`_getOrCreateUI ${uiId} faile, prefab conf not found`);
            onComplete(null);
            return;
        }

        this._loadUI(uiId, onProgress, onComplete, uiArgs);
    }

    private _loadUI(uiId: number, onProgress: ProgressCallback, onComplete: (uiView: UIView) => void, uiArgs: any) {
        // 找到UI配置
        let uiConf = this._uiConf[uiId];
        let uiPath = uiConf.path;
        let bundleName = uiConf.bundleName || 'resources';
        let useKey = _useKey + resLoader.nextUseKey();
        resLoader.loadRes(uiPath, cc.Prefab, onProgress, (err: Error, prefab: cc.Prefab) => {
            // 资源加载错误
            if (err) {
                LogManager.getInstance().console(`_getOrCreateUI loadRes ${uiId} faile, path: ${uiPath}`);
                onComplete(null);
                return;
            }

            // 实例化错误
            let uiNode: cc.Node = cc.instantiate(prefab);
            if (!cc.isValid(uiNode)) {
                LogManager.getInstance().console(`_getOrCreateUI instantiate ${uiId} faile, path: ${uiPath}`);
                onComplete(null);
                resLoader.releaseAsset(prefab, useKey);
                return;
            }

            let uiView = uiNode.getComponent(UIView);
            if (!cc.isValid(uiView)) {
                LogManager.getInstance().console(`_getOrCreateUI getComponent ${uiId} faile, path: ${uiPath}`);
                uiNode.destroy();
                onComplete(null);
                resLoader.releaseAsset(prefab, useKey);
                return;
            }

            // 异步加载UI预加载资源
            this._autoLoadRes(uiView, () => {
                // uiView初始化
                uiView.initProperty(uiId, uiConf);
                uiView.init(uiArgs);
                // 添加自身至界面类自动释放队列
                let resConf: IAutoResInfo = { asset: prefab, use: useKey };
                uiView.addAutoRes(resConf);
                onComplete(uiView);
            })
        }, bundleName, useKey);
    }

    /**
     * 打开界面并添加进界面栈
     * @param uiId _uiConf 中的key值
     * @param uiArgs 附加参数
     * @param onProgress 进程回调
     */
    public open(uiId: number, uiArgs: any = null, onProgress: ProgressCallback = null) {
        let uiConf = this._uiConf[uiId];
        if (!uiConf) {
            LogManager.getInstance().console(`open ${uiId} faile, _uiConf not found`);
            return;
        }
        let uiInfo: IUIInfo = {
            uiId: uiId,
            uiArgs: uiArgs,
            uiView: null,
        };
        if (this._isOpening || this._isClosing) {
            console.log("isOpening:::::1", "_isOpening:", this._isOpening, this._isClosing);
            this._uiOpenQueue.push(uiInfo);
            return;
        }

        let uiIndex = this.getUIIndex(uiId);
        if (-1 != uiIndex) {
            // 重复打开同一个界面，直接回到该界面
            console.log("closeToUI:::::", "uiId:", uiId);
            this.closeToUI(uiId, uiArgs);
            return;
        }
        // 设置zOrder
        if (uiConf.zOrder) {
            uiInfo.zOrder = uiConf.zOrder;
        } else if (this._uiStack.length <= 0) {
            uiInfo.zOrder = 1;
        } else {
            uiInfo.zOrder = this._uiStack[this._uiStack.length - 1].zOrder + 1;
        }
        this._uiStack.push(uiInfo);
        this._sortUIStack();

        // 先屏蔽点击
        if (uiConf.preventTouch && !uiInfo.preventNode)
            uiInfo.preventNode = this._preventTouch(uiInfo.zOrder);

        if (uiConf.loadingAni === undefined || uiConf.loadingAni) {
            this.showLoadingIcon(uiInfo);
        }

        this._isOpening = true;
        this._getOrCreateUI(uiId, onProgress, (uiView: UIView) => {
            if (uiInfo.isClose || null == uiView) {
                LogManager.getInstance().console(`_getOrCreateUI ${uiId} faile!
                        close state : ${uiInfo.isClose} , uiView : ${uiView}`);
                if (this._loadingIconNode) {
                    cc.Tween.stopAllByTarget(this._loadingIconNode);
                    this._loadingIconNode.removeFromParent(true);
                }
                this._loadingMaskNode && this._loadingMaskNode.removeFromParent();
                if (cc.isValid(uiInfo.preventNode)) {
                    uiInfo.preventNode.destroy();
                    uiInfo.preventNode = null;
                }
                return;
            }

            if (uiInfo.preventNode) {
                if (uiConf.preventTouchOpacity != undefined) {
                    uiInfo.preventNode.opacity = uiConf.preventTouchOpacity;
                } else {
                    uiInfo.preventNode.opacity = 180;
                }
            }
            console.log("open:::::2", "uiId:", uiId);
            // 打开UI，执行配置
            // cc.Tween.stopAllByTarget(this);
            if (this._loadingIconNode) {
                cc.Tween.stopAllByTarget(this._loadingIconNode);
                this._loadingIconNode.removeFromParent(true);
            }
            this._loadingMaskNode && this._loadingMaskNode.removeFromParent();
            this._onUIOpen(uiId, uiView, uiInfo, uiArgs);
        }, uiArgs);
    }

    /**
     * UI被打开时回调，对UI进行初始化设置，刷新其他界面的显示，并根据
     * @param uiId 哪个界面被打开了
     * @param uiView 界面对象
     * @param uiInfo 界面栈对应的信息结构
     * @param uiArgs 界面初始化参数
     */
    private _onUIOpen(uiId: number, uiView: UIView, uiInfo: IUIInfo, uiArgs: any) {
        if (!cc.isValid(uiView)) return;

        // 激活界面
        uiInfo.uiView = uiView;
        uiView.node.active = true;
        uiView.node.zIndex = uiInfo.zOrder || this._uiStack.length;

        // 快速关闭界面的设置，绑定界面中的background，实现快速关闭
        if (uiView.quickClose) {
            let background = uiView.node.getChildByName('background');
            if (!background) {
                background = new cc.Node('background');
                background.setContentSize(cc.size(10000, 10000));
                uiView.node.addChild(background, -1);
            }

            // let widget = background.getComponent(cc.Widget);
            // if (!widget) widget = background.addComponent(cc.Widget);
            // if (cc.isValid(widget)) {
            //     widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
            //     widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
            //     widget.target = cc.find('Canvas');
            // }

            background.targetOff(cc.Node.EventType.TOUCH_START);
            background.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
                event.stopPropagation();
                if (!this._isOpening && !this._isClosing) this.close(uiView);
            }, background);
        }

        // 添加到场景中
        let parent = this.getRootNode();
        if (!uiView.node.parent)
            parent.addChild(uiView.node);

        // 刷新其它UI
        this._updateUI();

        // 从哪个界面打开的
        let fromUIID = -1;
        if (this._uiStack.length > 1) {
            fromUIID = this._uiStack[this._uiStack.length - 2].uiId;
        }

        // 执行onOpen回调
        let uiAni = null;
        if (uiArgs && uiArgs.openType == 'quiet') {
            uiAni = UIDefAni.UI_NONE;
        } else {
            let uiConf = this._uiConf[uiId];
            if (uiConf) uiAni = uiConf.openAni || UIDefAni.UI_OPEN;
        }
        uiView.onOpen(fromUIID, uiArgs);
        this._autoExecAnimation(uiView, uiAni, () => {
            this._isOpening = false;
            this._autoExecNextUI();
            uiView.onOpenAniOver();
        });
    }

    /**
     * 关闭界面
     * @param closeUI ui对象（不填则关闭栈顶ui）
     */
    public close(closeUI?: UIView) {
        let uiCount = this._uiStack.length;
        if (uiCount < 1 || this._isClosing || this._isOpening) {
            if (closeUI) {
                this._uiCloseQueue.push(closeUI);
            } else if (uiCount >= 1) {
                let closeUIInfo = this._uiStack[uiCount - 1];
                let closeUIView = closeUIInfo.uiView;
                this._uiCloseQueue.push(closeUIView);
            }
            return;
        }

        let closeUIInfo: IUIInfo;
        if (closeUI) {
            for (let index = this._uiStack.length - 1; index >= 0; --index) {
                let ui = this._uiStack[index];
                if (ui.uiView == closeUI) {
                    closeUIInfo = ui;
                    this._uiStack.splice(index, 1);
                    break;
                }
            }

            // 找不到这个UI
            if (!closeUIInfo) return;
        } else {
            closeUIInfo = this._uiStack.pop();
        }

        // 关闭当前界面
        let closeUIID = closeUIInfo.uiId;
        let closeUIView = closeUIInfo.uiView;
        closeUIInfo.isClose = true;

        // 回收遮罩层
        if (cc.isValid(closeUIInfo.preventNode)) {
            closeUIInfo.preventNode.destroy();
            closeUIInfo.preventNode = null;
        }

        if (!cc.isValid(closeUIInfo.uiView)) return;

        let preUIInfo = this._uiStack[uiCount - 2];
        this._updateUI();
        let cb = () => {
            // 显示之前的界面
            if (preUIInfo && preUIInfo.uiView && this.isTopUI(preUIInfo.uiId)) {
                if (preUIInfo.uiView.node)
                    preUIInfo.uiView.node.active = true;
                preUIInfo.uiView.onTop(preUIInfo.uiId, closeUIView.onClose());
            } else {
                closeUIView.onClose();
            }

            if (closeUIView.cache) {
                this._uiCache[closeUIID] = closeUIView;
                closeUIView.node.removeFromParent(false);
                LogManager.getInstance().console(`uiView removeFromParent ${closeUIID}`);
            } else {
                closeUIView.node.destroy();
                LogManager.getInstance().console(`uiView destroy ${closeUIID}`);
            }
            this._isClosing = false;
            this._autoExecNextUI();
        }

        // 执行关闭动画
        let uiConf = this._uiConf[closeUIID];
        let uiAni = null;
        if (uiConf) uiAni = uiConf.closeAni || UIDefAni.UI_CLOSE;
        this._isClosing = true;
        this._autoExecAnimation(closeUIView, uiAni, cb);
    }

    /**
     * 关闭界面，一直关闭到顶部为uiId的界面，为避免循环打开UI导致UI栈溢出
     * @param uiId 要关闭到的uiId，关闭其顶部UI
     * @param uiArgs 附加参数
     */
    public closeToUI(uiId: number, uiArgs: any) {
        let uiIndex = this.getUIIndex(uiId);
        if (-1 == uiIndex) return;

        let fromUIInfo = this._uiStack[this._uiStack.length - 1];
        let toUIInfo = this._uiStack[uiIndex];
        for (let i = this._uiStack.length - 1; i > uiIndex; --i) {
            let uiInfo = this._uiStack.pop();
            let uiId = uiInfo.uiId;
            let uiView = uiInfo.uiView;
            uiInfo.isClose = true;

            // 回收屏蔽层
            if (uiInfo.preventNode) {
                uiInfo.preventNode.destroy();
                uiInfo.preventNode = null;
            }

            if (uiView) {
                uiView.onClose();
                if (uiView.cache) {
                    this._uiCache[uiId] = uiView;
                    uiView.node.removeFromParent(false);
                } else {
                    uiView.node.destroy();
                }
            }
        }

        this._updateUI();
        this._uiOpenQueue = [];
        this._uiCloseQueue = [];
        toUIInfo.uiView.onOpen(fromUIInfo.uiId, uiArgs);
    }

    /**
     * 关闭界面
     * @param uiId 界面id（不填则关闭栈顶ui）
     */
    public closeByUIID(uiId?: number) {
        let uiIndex: number = -1, uiView: UIView = null;
        if (uiId == undefined) {
            uiIndex = this._uiStack.length - 1;
        } else {
            uiIndex = this.getUIIndex(uiId);
        }

        if (uiIndex >= 0) {
            let uiInfo: IUIInfo = this._uiStack[uiIndex];
            uiView = uiInfo.uiView;
        }

        if (uiView) this.close(uiView);
    }

    // 关闭UI栈中所有界面（不播动画，也不清缓存）
    public closeAll() {
        for (const uiInfo of this._uiStack) {
            uiInfo.isClose = true;
            if (cc.isValid(uiInfo.preventNode)) {
                uiInfo.preventNode.destroy();
                uiInfo.preventNode = null;
            }
            if (uiInfo.uiView) {
                uiInfo.uiView.onClose();
                if (uiInfo.uiView.cache) {
                    uiInfo.uiView.node.removeFromParent(false);
                } else {
                    uiInfo.uiView.node.destroy();
                }
            }
        }

        this._uiOpenQueue = [];
        this._uiCloseQueue = [];
        this._uiStack = [];
        this._isOpening = false;
        this._isClosing = false;
    }

    // 清理界面缓存
    public clearCache() {
        for (const key in this._uiCache) {
            let uiView = this._uiCache[key];
            if (cc.isValid(uiView.node)) {
                uiView.node.destroy();
            }
        }
        this._uiCache = {};
    }

    // 替换栈顶界面
    public replace(uiId: number, uiArgs: any = null) {
        this.close();
        this.open(uiId, uiArgs);
    }

    // 是否栈顶ui
    public isTopUI(uiId: number): boolean {
        if (this._uiStack.length == 0) return false;
        return this._uiStack[this._uiStack.length - 1].uiId == uiId;
    }

    // 获取ui位于堆栈索引
    public getUIIndex(uiId: number): number {
        for (let i = 0; i < this._uiStack.length; ++i) {
            const element = this._uiStack[i];
            if (uiId == element.uiId) {
                return i;
            }
        }
        return -1;
    }

    // 获取uiview对象
    public getUI(uiId: number): UIView {
        for (let index = 0; index < this._uiStack.length; index++) {
            const element = this._uiStack[index];
            if (uiId == element.uiId) {
                return element.uiView;
            }
        }
        return null;
    }

    // 获取栈顶uiview对象
    public getTopUI(): UIView {
        if (this._uiStack.length > 0) {
            return this._uiStack[this._uiStack.length - 1].uiView;
        }
        return null;
    }
}

export let uiMgr = UIManager.getInstance();