/**
 * Created by dell on 2017/4/10.
 * 线和圆相交的工具类
 */

var EPS = 0.00001;
export default class IntersectUtils {
    // 线段起点// 线段终点// 圆心坐标
    // ptStart cc.v2(x,y)
    // ptEnd cc.v2(x,y)
    // ptCenter cc.v2(x,y)
    // Radius cc.v2(x,y)
    // 两个焦点
    // ptInter1 {x:0,y:0}       这个传入在引用 可以作为一个处理结果
    // ptInter2  {x:0,y:0}      这个引入在引用 可以作为一个处理结果
    public static LineInterCircle(ptStart, ptEnd, ptCenter, Radius, ptInter1, ptInter2) {
        ptInter1.x = ptInter2.x = 65535;
        ptInter1.y = ptInter2.y = 65535;

        var fDis = Math.sqrt((ptEnd.x - ptStart.x) * (ptEnd.x - ptStart.x) + (ptEnd.y - ptStart.y) * (ptEnd.y - ptStart.y));

        var d = cc.v2(0, 0);
        d.x = (ptEnd.x - ptStart.x) / fDis;
        d.y = (ptEnd.y - ptStart.y) / fDis;

        var E = { x: 0, y: 0 };
        E.x = ptCenter.x - ptStart.x;
        E.y = ptCenter.y - ptStart.y;

        var a = E.x * d.x + E.y * d.y;
        var a2 = a * a;

        var e2 = E.x * E.x + E.y * E.y;

        var r2 = Radius * Radius;

        if ((r2 - e2 + a2) < 0) {
            return false;
        }
        else {
            let f = Math.sqrt(r2 - e2 + a2);

            let t = a - f;

            if (((t - 0.0) > -EPS) && (t - fDis) < EPS) {
                ptInter1.x = ptStart.x + t * d.x;
                ptInter1.y = ptStart.y + t * d.y;
            }

            t = a + f;

            if (((t - 0.0) > -EPS) && (t - fDis) < EPS) {
                ptInter2.x = ptStart.x + t * d.x;
                ptInter2.y = ptStart.y + t * d.y;
            }

            return true;
        }
    }
}