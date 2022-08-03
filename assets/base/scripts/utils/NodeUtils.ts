
const RADIAN = 2 * Math.PI / 360;

export class NodeUtils {

    /**
     * 获取p点绕center点旋转后坐标
     * @param p 旋转点
     * @param angle 旋转角度
     * @param center 旋转中心点
     */
    public static getRotatePoint(p: cc.Vec2, angle: number, center: cc.Vec2) {
        let out = cc.v2();
        let radian = -angle * RADIAN;
        out.x = (p.x - center.x) * Math.cos(radian) - (p.y - center.y) * Math.sin(radian) + center.x;
        out.y = (p.x - center.x) * Math.sin(radian) + (p.y - center.y) * Math.cos(radian) + center.y;
        return out;
    }

    /**
     * 矩形绕center点旋转后坐标
     * @param rect 旋转矩形
     * @param angle 旋转角度
     * @param center 旋转中心点
     */
    public static getRectRotatePoints(rect: cc.Rect, angle: number, center: cc.Vec2) {
        let array = [
            cc.v2(rect.x, rect.y),
            cc.v2(rect.x + rect.width, rect.y),
            cc.v2(rect.x + rect.width, rect.y + rect.height),
            cc.v2(rect.x, rect.y + rect.height),
        ];
        return array.map(p => NodeUtils.getRotatePoint(p, angle, center));
    }

    /**
     * 获取htmlelement位置信息
     * @param element 
     */
    public static getHTMLElementPosition(element: any) {
        var docElem = document.documentElement;
        var leftOffset = window.pageXOffset - docElem.clientLeft;
        var topOffset = window.pageYOffset - docElem.clientTop;
        if (typeof element.getBoundingClientRect === 'function') {
            var box = element.getBoundingClientRect();
            return {
                left: box.left + leftOffset,
                top: box.top + topOffset,
                width: box.width,
                height: box.height
            };
        }
        else {
            if (element instanceof HTMLCanvasElement) {
                return {
                    left: leftOffset,
                    top: topOffset,
                    width: element.width,
                    height: element.height
                };
            }
            else {
                return {
                    left: leftOffset,
                    top: topOffset,
                    width: parseInt(element.style.width),
                    height: parseInt(element.style.height)
                };
            }
        }
    }

    /**
     * 转换世界坐标为html坐标
     * @param x 世界坐标系x
     * @param y 世界坐标系y
     */
    public static convertToHtmlSpaceAR(x: number, y: number) {
        let rect = null;
        if (cc.sys.isBrowser) {
            let canvas = document.getElementById("GameCanvas");
            rect = NodeUtils.getHTMLElementPosition(canvas);
        } else {
            rect = cc.view.getFrameSize();
            rect.left = 0;
            rect.top = 0;
        }

        let vp = cc.view.getViewportRect();
        let sx = cc.view.getScaleX();
        let sy = cc.view.getScaleY();
        let ratio = cc.view.getDevicePixelRatio();
        let htmlx = (x * sx + vp.x) / ratio + rect.left;
        let htmly = rect.top + rect.height - (y * sy + vp.y) / ratio;
        let pt = cc.v2(htmlx, htmly);

        return { pt: pt, rect: rect };
    }

    /**
     * 模拟点击
     * @param x 世界坐标系x
     * @param y 世界坐标系y
     * @param duration 按下至抬起的间隔时间（ms）
     */
    public static simulation_click(x: number, y: number, duration?: number) {
        //@ts-ignore
        let inputManager = window._cc ? window._cc.inputManager : cc.internal.inputManager;
        let result = NodeUtils.convertToHtmlSpaceAR(x, y);
        let pt = result.pt;
        let rect = result.rect;

        console.log(`模拟点击坐标：${pt.x}, ${pt.y}`);
        let touch = inputManager.getTouchByXY(pt.x, pt.y, rect);
        inputManager.handleTouchesBegin([touch]);
        duration = duration || 200;
        setTimeout(() => {
            inputManager.handleTouchesEnd([touch]);
        }, duration);
    }

    /**
     * 模拟触摸移动
     * @param startPos 开始世界坐标
     * @param endPos 结束世界坐标
     * @param duration 历时（ms）
     */
    public static simulation_touchMove(startPos: cc.Vec2, endPos: cc.Vec2, duration?: number) {
        //@ts-ignore
        let inputManager = window._cc ? window._cc.inputManager : cc.internal.inputManager;
        let resultStart = NodeUtils.convertToHtmlSpaceAR(startPos.x, startPos.y);
        let resultEnd = NodeUtils.convertToHtmlSpaceAR(endPos.x, endPos.y);
        let startPt = resultStart.pt;
        let startRect = resultStart.rect;
        let endPt = resultEnd.pt;
        let endRect = resultEnd.rect;

        console.log(`模拟按下坐标：${startPt.x}, ${startPt.y}`);
        let touchStart = inputManager.getTouchByXY(startPt.x, startPt.y, startRect);
        let touchEnd = inputManager.getTouchByXY(endPt.x, endPt.y, endRect);
        inputManager.handleTouchesBegin([touchStart]);
        duration = duration || 400;
        setTimeout(() => {
            console.log(`模拟抬起坐标：${startPt.x}, ${startPt.y}`);
            inputManager.handleTouchesEnd([touchEnd]);
        }, duration);
    }

    /**
     * 模拟点击节点
     * @param node 节点
     * @param duration 按下至抬起的间隔时间（ms）
     */
    public static simulation_clickNode(node: cc.Node, duration?: number) {
        console.log('自动执行，模拟点击');
        console.log('自动节点 :', JSON.stringify(node.position));
        let wp = node.parent.convertToWorldSpaceAR(node.position);
        console.log('世界节点 :', JSON.stringify(wp));
        NodeUtils.simulation_click(wp.x, wp.y, duration);
    }
}