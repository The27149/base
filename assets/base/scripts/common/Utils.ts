import { ComUtils } from "../utils/ComUtils";

/**
 * 布局类，提供了layout和widget布局设置,以及根据当前分辨率缩放节点的方法
 */
export class Utils {

    static get isLandscape(): boolean {
        var size = cc.view.getCanvasSize();
        if (cc.sys.isMobile) {
            size = cc.winSize;
        }
        return size.width >= size.height;
    }

    /**
     * 设置横向布局
     * @param node 
     * @param spacingX 相邻节点的水平间隔
     * @param containerHeight 容器高度 默认设为第一个子元素高度
     * @param direction 排列子点方向
     * @param resizeMode 缩放模式
     */
    public static setHorizontalLayout(node: cc.Node, spacingX: number = 0,
        containerHeight?: number,
        direction: number = cc.Layout.HorizontalDirection.LEFT_TO_RIGHT,
        resizeMode: number = cc.Layout.ResizeMode.CONTAINER): void {
        //重置上次布局遗留的坐标
        for (var i = 0; i < node.children.length; i++) {
            node.children[i].setPosition(0, 0);
            if (node.children[0]) {
                node.height = (typeof containerHeight === 'number') ? containerHeight : node.children[0].height;
            }
            var layout = node.getComponent(cc.Layout) || node.addComponent(cc.Layout);
            layout.type = cc.Layout.Type.HORIZONTAL;
            layout.resizeMode = resizeMode;
            layout.spacingX = spacingX;
            layout.horizontalDirection = direction;
            layout.updateLayout();
        }
    }

    /**
    * 设置纵向布局
    * @param node 
    * @param spacingY 相邻节点的垂直间隔
    * @param containerWidth 容器宽度 默认为第一个子节点宽度
    * @param direction 排列子点方向
    * @param resizeMode 缩放模式
    */
    public static setVerticalLayout(node: cc.Node, spacingY: number = 0,
        containerWidth?: number,
        direction: number = cc.Layout.VerticalDirection.TOP_TO_BOTTOM,
        resizeMode: number = cc.Layout.ResizeMode.CONTAINER): void {
        //重置上次布局遗留的坐标
        for (var i = 0; i < node.children.length; i++) {
            node.children[i].setPosition(0, 0);
        }
        if (node.children[0]) {
            node.width = (typeof containerWidth === 'number') ? containerWidth : node.children[0].width;
        }
        var layout = node.getComponent(cc.Layout) || node.addComponent(cc.Layout);
        layout.type = cc.Layout.Type.VERTICAL;
        layout.resizeMode = resizeMode;
        layout.spacingY = spacingY;
        layout.horizontalDirection = direction;
        layout.updateLayout();
    }

    /**
     * 根据配置设置Layout
     * @param node 要设置的节点
     * @param data 配置数据(例:{
                                    "landscape": {
                                                "spacingY": 30,
                                                "spacingX": 0,
                                            },
                                            "portrait": {
                                                "spacingX": 30,
                                                "spacingY": 0,
                                                
                                            }
                                        })
     */
    public static setLayout(node: cc.Node, data: any): void {
        if (!data) return;
        var isL = Utils.isLandscape;
        var lData = isL ? data.landscape : data.portrait;
        if (!lData) lData = data;
        var layout = node.getComponent(cc.Layout) || node.addComponent(cc.Layout);
        if (layout) {
            //重置上次布局遗留的坐标
            for (var i = 0; i < node.children.length; i++) {
                node.children[i].x = node.children[i].y = 0;
            }
            if (lData.spacingX) {
                Utils.setHorizontalLayout(node, lData.spacingX);
            }
            if (lData.spacingY) {
                Utils.setVerticalLayout(node, lData.spacingY);
            }
            layout.updateLayout();
        }
    }

    /**
     * 根据配置设置widget
     * @param node 
     * @param data 配置数据(例: {
                            "landscape": {
                                "top": 180,
                                "left": 50
                            },
                            "portrait": {
                                "top": 860,
                                "left": 50
                            },
                            "horizontalCenter":0,
                            "verticalCenter":0
                        })
     */
    public static setWidget(node: cc.Node, data: any, target?: cc.Node): void {
        if (!data) return;

        var isL = Utils.isLandscape;
        var lData = isL ? data.landscape : data.portrait;
        if (!lData) lData = data;
        var widget: cc.Widget = node.getComponent(cc.Widget) || node.addComponent(cc.Widget);
        if (target) widget.target = target;
        widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
        Utils.openWidgetProperty(widget, lData);
        for (var key in lData) {
            if (widget[key] != undefined) {
                widget[key] = lData[key];
            }
        }
        widget.updateAlignment();
    }

    //开启widget属性
    private static openWidgetProperty(widget: cc.Widget, data: any): void {
        widget.isAlignBottom = (data.bottom != undefined);
        widget.isAlignLeft = (data.left != undefined);
        widget.isAlignRight = (data.right != undefined);
        widget.isAlignTop = (data.top != undefined);
        widget.isAlignVerticalCenter = (data.verticalCenter != undefined);
        widget.isAlignHorizontalCenter = (data.horizontalCenter != undefined);
    }


    //判定是否为大厅打开 1：无(直接启动)  2:巴西大厅  3:web大厅
    public static isLobbyGame(): number {
        let nativeLobby = ComUtils.getUrlParam(window.location.href, "lobby");
        let webLobby = ComUtils.getUrlParam(window.location.href, "lobby_web");
        let webLobbyh5 = ComUtils.getUrlParam(window.location.href, "lobby_h5");
        if (nativeLobby) {
            return 2;
        } else if (webLobby || webLobbyh5) {
            return 3;
        } else {
            return 1;
        }
    }

    /**
     * 游戏发送消息给大厅
     * @param msg 
     */
    public static sendMessageToLobby(msg: string, callback?: Function) {
        let type = Utils.isLobbyGame();
        //3是web Lobby
        if (type == 3) {
            //window.parent && window.parent["sendMessageToWeb"] && window.parent["sendMessageToWeb"](msg);
            var message = { type: "sendMessageToWeb", msg: msg };
            window.parent.postMessage(message, '*');
        } else {
            if (cc.sys.os == cc.sys.OS_IOS) {
                window['webkit'] && window['webkit'].messageHandlers
                    && window['webkit'].messageHandlers.sendMessageToCocos.postMessage(msg);
            } else {
                window["AndroidApp"] && window["AndroidApp"].sendMessageToCocos(msg);
            }
            callback && callback();
        }
    }

    /**
     * 文件是否存在
     * @param filePath 文件路径
     * @param bundleName bundleName名
     * @returns 
     */
    public static isFileExist(filePath: string, bundleName: string = "base") {
        let bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            let resInfo = bundle.getDirWithPath(filePath);
            // if (resInfo.length == 0) cc.warn(`The file [${filePath}] in bundle[${bundleName}] is not exist`);
            return resInfo.length > 0;
        }
        // cc.warn(`bundle[${bundleName}] is not exist`);
        return false;
    }
}