/**
 * 通用工具类
 */

import { Utils } from "../common/Utils";
import { LanguageType } from "../config/BaseLangConf";
import Const from "../const/Const";
import Global from "../global/Global";

const { ccclass, property } = cc._decorator;

export enum PICQUALITY {
    HEIGHT,                 //高质量
    LOW,                    //低质量
    MIDDLE,                 //中等
}
//游戏类型
export enum GAME_TYPE {
    QYXZ = "QYXZ",
    QZDZ = "QZDZ",
    TRUCO = "TRUCO"
}
@ccclass
export class ComUtils {
    // 检测有效url
    public static checkURL(url: string) {
        if (-1 != url.indexOf('http://')) return true;
        if (-1 != url.indexOf('https://')) return true;
        return false;
    }

    /**
     * 查找子串位置
     * @param str 源字符串
     * @param cha 子串
     * @param num 第几个子串
     */
    public static findCharPos(str: string, cha: string, num: number): number {
        let x = str.indexOf(cha);
        let ret = x;
        for (var i = 0; i < num; i++) {
            x = str.indexOf(cha, x + 1);
            if (x != -1) {
                ret = x;
            } else {
                return ret;
            }
        }
        return ret;
    }

    /**
     * 获取堆栈信息
     * @param popCount 剔除前几段内容
     */
    public static getCallStack(popCount: number): string {
        let ret = (new Error()).stack;
        let pos = this.findCharPos(ret, '\n', popCount);
        if (pos > 0) {
            ret = ret.slice(pos);
        }
        return ret;
    }

    public static formatStr(num, saveNum) {
        var str = '0000000' + num;
        var str = str.substr(str.length - saveNum);

        return str;
    }

    // 深度拷贝 dstObj 需要是{} 或者 [],如果是null ,那么是返回值。
    public static deepClone(srcObj, dstObj) {
        if (!srcObj) {
            return srcObj;
        }
        var obj = dstObj || ((srcObj.constructor === Array) ? [] : {});
        for (var i in srcObj) {
            var prop = srcObj[i];        // 避免相互引用对象导致死循环，如 srcObj.a = srcObj 的情况
            if (!prop && prop === obj) {
                continue;
            }
            //这里 prop 为 null 判定也是为true
            if (typeof prop === 'object') {
                if (prop) {
                    obj[i] = (prop.constructor === Array) ? [] : {};
                } else {
                    obj[i] = prop;
                }
                this.deepClone(prop, obj[i]);
                // arguments.callee(prop, obj[i]);  // 相当于 this.deepClone(prop, obj[i]), 严格模式下会失效
            } else {
                obj[i] = prop;
            }
        }
        return obj;
    }

    //金币转成千分位 ps : 用之前需 x.fixed()保留2位
    public static comma(strCoin) {
        var commades = new Array();
        var commasrc = new Array();
        var negative = (strCoin[0] == '-');
        if (negative) strCoin = strCoin.slice(1);   // 先移除负号
        var _coinsArr = strCoin.split(".");
        var _cSuffix = _coinsArr[1];
        var _coinStr = _coinsArr[0];
        var _length = _coinStr.length;
        commasrc = _coinStr.split("");
        var j = 0, k = 0;
        for (var i = _length - 1; i >= 0; i--) {
            commades[j] = commasrc[i];
            k++;
            j++;
            if ((k % 3) == 0 && i > 0) {
                commades[j] = ',';
                j++;
            }
        }
        commades.reverse();
        var _s = commades.join("");
        if (_cSuffix) _s = _s + "." + _cSuffix;
        if (negative) _s = '-' + _s;    // 加上负号
        return _s;
    }

    public static randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    // 随机start-end之间的随机数 左闭又开
    public static getFloatRandom(start, end): number {
        return start + Math.random() * (end - start);
    }

    // 随机start-end之间的随机数 左闭又开
    public static getIntRandom(start, end): number {
        return start + Math.round(Math.random() * (end - start));
    }

    // 随机start-end之间的随机数 左闭又开
    public static getIntRandomNoLoop(num: number, start: number, end: number): number {
        if (num != 0 || start < 0 || num > end) {
            return num;
        }
        let randomNum = start + Math.round(Math.random() * (end - start));
        if (randomNum == num) {
            randomNum = this.getIntRandomNoLoop(num, start, end);
        }
        return randomNum;
    }

    // 数组去重
    public static array_noRepeat(a) {
        if (!(a instanceof Array)) return;

        var obj = {}, newArr = [], val;
        for (var i = 0; i < a.length; ++i) {
            val = a[i];
            if (!obj[val]) {
                obj[val] = true;
                newArr.push(val);
            }
        }

        if (newArr.length <= 0) return;
        return newArr;
    }

    // 数组交集
    public static array_intersection(a, b) {
        if (!(a instanceof Array)) return;
        if (!(b instanceof Array)) return;
        //return a.filter(v => b.includes(v));
        return a.filter(function (v) { return b.indexOf(v) !== -1 })
    }

    // 数组差集
    public static array_difference(a, b) {
        if (!(a instanceof Array)) return;
        if (!(b instanceof Array)) return;
        //return a.concat(b).filter(v => !a.includes(v) || !b.includes(v));
        return a.filter(function (v) {
            return (a.indexOf(v) !== -1 && b.indexOf(v) === -1);
        });
    }

    // 数组并集
    public static array_union(a, b) {
        if (!(a instanceof Array)) return;
        if (!(b instanceof Array)) return;

        return this.array_noRepeat(a.concat(b));
    }

    //获取两点间的距离
    public static GetTwoPosDistance(point1, point2) {
        let x = point1.x - point2.x;
        let y = point1.y - point2.y;
        return Math.sqrt(x * x + y * y);
    }

    //获取两点间的角度
    public static GetAngleTwoPos(point1, point2) {
        let k = (point2.y - point1.y) / (point2.x - point1.x);
        let angel = Math.atan(k) * 180 / Math.PI;

        return k > 0 ? (90 - angel) : (-90 - angel);
    }

    //返回直线坐标
    public static GetLinePos(posArray, t) {
        let k = (posArray[1].y - posArray[0].y) / (posArray[1].x - posArray[0].x);
        let b = posArray[0].y - k * posArray[0].x;

        let x = posArray[0].x + t * (posArray[1].x - posArray[0].x);
        let y = x * k + b;
        return cc.v2(x, y);
    }

    /**
     * 获取已知两点组成线段的垂线的函数 返回k、b值
     * @param startVec2 
     * @param endVec2 
     */
    public static getVlineKB(startVec2: cc.Vec2, endVec2: cc.Vec2) {
        let k = (startVec2.y - endVec2.y) / (startVec2.x - endVec2.x);
        let b = startVec2.y - k * startVec2.x;

        // let midVec2 = this.GetMiddlePoint(startVec2, endVec2);
        // let vline_k = -k;
        // let vline_b = midVec2.y - vline_k*midVec2.x; //获得垂线的b值

        return [-k, b];
    }

    //获取两点中点
    public static GetMiddlePoint(startPos: cc.Vec2, endPos: cc.Vec2): cc.Vec2 {
        let x = (startPos.x + endPos.x) / 2;
        let y = (startPos.y + endPos.y) / 2
        return new cc.Vec2(Math.round(x), Math.round(y));
    }

    //已经中心点和半径 球圆上随机你一点
    public static GetCirlePos(radius: number, centerPos: cc.Vec2): cc.Vec2 {
        let angle = ComUtils.getIntRandom(0, 360);
        let x = centerPos.x + radius * Math.cos(angle * 3.14 / 180)
        let y = centerPos.y + radius * Math.sin(angle * 3.14 / 180);
        return new cc.Vec2(Math.round(x), Math.round(y));
    }

    //获取圆的固定角度内的点
    public static GetCirlePosByAngle(radius: number, centerPos: cc.Vec2, ang: number): cc.Vec2 {
        let angle = ComUtils.getIntRandom(ang, 180 + ang);
        let x = centerPos.x + radius * Math.cos(angle * 3.14 / 180)
        let y = centerPos.y + radius * Math.sin(angle * 3.14 / 180);
        return new cc.Vec2(Math.round(x), Math.round(y));
    }

    //根据参数t(0-1) 返回二阶贝塞尔曲线坐标
    public static GetTwoLevelBezier(posArray, t) {
        let x = 0;
        let y = 0;

        x = (1 - t) * (1 - t) * posArray[0].x + 2 * t * (1 - t) * posArray[1].x + t * t * posArray[2].x;
        y = (1 - t) * (1 - t) * posArray[0].y + 2 * t * (1 - t) * posArray[1].y + t * t * posArray[2].y;

        return cc.v2(x, y);
    };

    //根据参数t(0-1) 返回三阶贝塞尔曲线坐标
    public static GetThreeLevelBezier(posArray, t) {
        let x = 0;
        let y = 0;

        x = (1 - t) * (1 - t) * (1 - t) * posArray[0].x + 3 * t * (1 - t) * (1 - t) * posArray[1].x + 3 * t * t * (1 - t) * posArray[2].x + t * t * t * posArray[3].x;
        y = (1 - t) * (1 - t) * (1 - t) * posArray[0].y + 3 * t * (1 - t) * (1 - t) * posArray[1].y + 3 * t * t * (1 - t) * posArray[2].y + t * t * t * posArray[3].y;

        return cc.v2(x, y);
    };

    /**
     *  PC = 1; //PC
        IOS_WIDTH = 2; // IOS横
        IOS_HIGHT = 3; // IOS竖
        AND_WIDTH = 4; // android横
        AND_HIGHT = 5; // android竖
        OTR_WIGHT = 6; // 其他横
        ORT_HIGHT = 7; // 其他
     * @param code 
     */
    public static GetPlatformType(): number {
        var platform = 7;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            if (window.innerWidth < window.innerHeight) {
                platform = 5;
            } else {
                platform = 4;
            }
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            if (window.innerWidth < window.innerHeight) {
                platform = 3;
            } else {
                platform = 2;
            }
        } else if (cc.sys.os == cc.sys.OS_WINDOWS || cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT || cc.sys.os == cc.sys.OS_LINUX) {
            platform = 1;
        } else {
            if (window.innerWidth < window.innerHeight) {
                platform = 6;
            } else {
                platform = 7;
            }
        }
        return platform;
    }

    /**
     * 服务器传过来的筹码，转换为千分号
     *  @param v 要转换的数字，默认是分制
     *  @param n 保留几位小数点，默认为2 目前失效，由服务器传来的小数位控制
     *  @param c 除数
     *  @param  isReserved 是否保留小数点位数(默认保留，如果不保留按原值显示,不进行四舍五入处理),目前失效，由服务器传来的小数位控制
     *  @param  thousandSign 千分位符号
     */
    static formatNumber(v: number | Long, n: number = 2, c: number = 100, isReserved: boolean = true, thousandSign: string = ""): string {
        if (v instanceof Long) {
            v = (v as Long).toNumber();
        }
        let fuhao: string = v < 0 ? "-" : "";
        v = Math.abs(v);
        //n = n >= 0 && n <= 20 ? n : 2;
        n = Global.point;
        isReserved = true;
        let s: string;
        v = v / c;
        if (!isReserved) {
            return fuhao + v.toString();
        }
        s = parseFloat((v + "").replace(/[^\d\.-]/g, "")) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        let t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? thousandSign : "");
        }
        if (n > 0) {
            if (!r) {
                r = "";
            }
            let diff = n - r.length;
            if (diff < 0) {
                r = r.substring(0, n);
            } else {
                for (let i = 0; i < diff; i++) {
                    r = r + "0";
                }
            }
        } else {
            r = "";
        }
        if (r)
            return fuhao + t.split("").reverse().join("") + "." + r;
        else
            return fuhao + t.split("").reverse().join("");
    }

    //获取链接中的参数
    public static getUrlParam(url: string, key?: string) {
        //先去除全部空格
        url = url.replace(/\s*/g, "");
        //将编码过的 URI 解析成明文
        url = decodeURI(url);
        let params = {};
        let idx = url.indexOf("?");
        if (idx != -1) {
            let sub_str = url.substring(idx + 1);
            let strArr = sub_str.split("&");
            for (var i = 0; i < strArr.length; i++) {
                params[strArr[i].split("=")[0]] = strArr[i].split("=")[1];
            }
        }
        if (key) {
            return params[key];
        }
        else {
            return params;
        }
    }

    //获取链接的全部参数
    public static GetUrlPara(): string[] {
        var url = window.location.href;
        if (url.indexOf('?') < 0) {
            return [];
        }
        var arrUrl = url.split("?");
        if (arrUrl[1].indexOf('&') < 0) {
            return [arrUrl[1]];
        }
        let strArr = arrUrl[1].split("&");
        return strArr;
    }

    //获取当前网页链接
    public static getUrl(): string {
        return window.location.href;
        // var url = window.location.href;
        // var url = self.location.href;
        // var url = document.URL;
        // var url = document.location;
    }

    //获取当前相对路径的方法
    public static GetUrlRelativePath(): string {
        var url = window.location.href;
        var arrUrl = url.split("//");

        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

        if (relUrl.indexOf("?") != -1) {
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    }



    // 手机号规则匹配
    public static verifyPhone(phone: string) {
        let retStr = '';
        if (phone.length !== 11 || phone.match("/[^0-9]/g")) {
            retStr = '请输入11位手机号';
        }

        return retStr;
    }

    // 密码规则匹配
    public static verifyPassword(psw: string) {
        let retStr = '';
        if (psw.length < 8 || psw.length > 20 || psw.match("/[^_a-zA-Z0-9]/g")) {
            retStr = "密码需8-20位数字，字母及下划线组合";
        }

        return retStr;
    }

    /**
     * 得到合法的名字显示
     */
    static GetLegalNameStr(str: string): string {
        var newStrLen = 0;
        var newStr = "";
        var strLen = str.replace(/[^\x00-\xff]/g, "**").length; //[^\x00-\xff] 表示匹配非单字节的字符，例如汉字
        for (var i = 0; i < str.length - 1; i++) {
            var code = str.charCodeAt(i);
            if (code >= 41 && code <= 90 && (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_ANDROID)) //大写字母在移动端站2位
            {
                strLen++;
            }
        }

        //如果字符长度超过12位  中文占2位，英文占1位
        if (strLen >= 12) {
            for (var i = 0; i < str.length - 1; i++) {
                if (newStrLen >= 8) {
                    return newStr + "...";
                }
                var code = str.charCodeAt(i);
                newStr += str.charAt(i);
                if (code >= 0 && code <= 128) { //非中文
                    newStrLen++;
                    if (code >= 41 && code <= 90) {
                        newStrLen++;
                    }
                }
                else {
                    newStrLen += 2;
                }
            }
        }
        else {
            return str;
        }
    }

    /**
     * 截取指定长度的String,  末尾加...
     *
     * @static
     * @param {string} initialString 初始String
     * @param {number} len 字长或字节数
     * @param {boolean} [isByByte] 是否通过字节数判断
     * @param {string} [endStr="..."] 修饰字符
     * @returns {string} 返回结果
     * @memberof Utils 
     */
    public static cutStringByLength(initialString: string, len: number, isByByte?: boolean, endStr: string = "..."): string {
        let result: string = "";
        let byteLen: number = 0;
        let strLen: number = 0;
        strLen = initialString.length;
        if (strLen == 0) {
            console.error("the initial string can not be null or \"\"");
            return;
        }
        byteLen = initialString.replace(/[^\x00-\xff]/g, 'xx').length;// 判断字节数
        if (isByByte) {
            if (byteLen > len) {
                let tempLen: number = 0;
                for (let i = 0; i < strLen; i++) {
                    tempLen += initialString.charCodeAt(i) > 255 ? 2 : 1;
                    if (tempLen > len) break;
                    result += initialString[i];
                }
                result += endStr;
            } else {
                result = initialString;
            }
        } else {
            if (strLen > len) {
                result = initialString.substr(0, len);
                result += endStr;
            } else {
                result = initialString;
            }
        }
        return result;
    }


    /**
     * 转化金币展示格式
     * @param coin 金币
     * @param places 保留几位小数点，默认为2 参数isReserved为true才有效，isReserved默认true 目前失效，由服务器传来的小数位控制
     * @param c 除数
     * @param  isReserved 是否保留小数点位数(默认保留，如果不保留按原值显示,不进行四舍五入处理) 目前失效，由服务器传来的小数位控制
     */
    public static formatNumToKMB(coin: number, places: number = 2, c: number = 100, isReserved: boolean = true): string {
        let num = coin / c;
        let absValue = Math.abs(num);
        let str = "";
        let numKBM: number;
        let kbm: string = "";
        // if (absValue < 1e3) {
        //     if (!isReserved) {
        //         str = this.toDecimal3(num.toString());
        //     } else {
        //         str = this.toDecimal2(num, places);
        //     }
        //     return str;
        // } else if (absValue < 1e6) {
        //     numKBM = (num / 1e3);
        //     kbm = "K";
        // } else if (absValue < 1e9) {
        //     numKBM = (num / 1e6);
        //     kbm = "M";
        // } else {
        //     numKBM = (num / 1e9);
        //     kbm = "B";
        // }
        places = Global.point;
        isReserved = true;
        // if (Global.gameId > 3001400) {//临时处理抢庄牛牛5合一没有kmb
        //     str = this.toDecimal2(num, places);
        //     return str;
        // }
        if (absValue < 1e5) {
            if (!isReserved) {
                str = this.toDecimal3(num.toString());
            } else {
                str = this.toDecimal2(num, places);
            }
            return str;
        } else if (absValue < 1e8) {
            numKBM = (num / 1e3);
            kbm = "K";
        } else {
            numKBM = (num / 1e6);
            kbm = "M";
        }
        if (!isReserved) {
            str = this.toDecimal3(numKBM.toString()) + kbm;
        } else {
            str = this.toDecimal2(numKBM, places) + kbm;
        }
        return str;
    }

    public static toDecimal3(str: string, pos: number = 3): string {
        var f = str.indexOf(".");
        if (f < 0) {
            return str;
        }
        var s = str.split(".")[1];
        if (s.length > pos) {
            return this.toDecimal2(str, pos);
        }
        return str;
    }

    //制保留pos位小数，如：2，会在2后面补上00.即2.00 
    public static toDecimal2(num, pos): string {
        pos = pos >= 0 && pos <= 20 ? pos : 2;
        var f = parseFloat(num);
        if (isNaN(f)) {
            return "";
        }
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            if (pos > 0) {
                rs = s.length;
                s += '.';
            } else {
                return s;
            }

        }
        while (s.length <= rs + pos) {
            s += '0';
        }
        if (pos == 0) {
            s = s.substr(0, s.indexOf('.'));
        } else {
            s = s.substr(0, s.indexOf('.') + pos + 1);
        }
        return s;
    }

    /**
     * 去除字符串数组 中 字符串的空格
     * @param value 字符串数组 
     */
    public static RemoveSpaceByArrayStr(value: Array<string>): Array<string> {
        let targetArr = [];
        for (var i = 0; i < value.length; i++) {
            targetArr[i] = this.RemoveAllSpace(value[i]);
        }
        return targetArr;
    }


    // 去除所有空格
    public static RemoveAllSpace(str) {
        return str.replace(/\s+/g, "");
    }

    /**
    * 将字符串中包含的"{0},{1}..."替换成自定义参数
    * @param str 要替换的字符串
    * @param params 要替换的参数
    */
    public static substitute(str: string, ...params): string {
        if (!str) return undefined;
        var newStr: string = str.concat();
        var list: Array<string> = str.match(/{\d}/g);
        if (params) {
            for (let i = 0; i < list.length; i++) {
                var idx: number = parseFloat(list[i].substring(1, list[i].length - 1));
                if (idx > params.length - 1) break;
                newStr = newStr.replace(list[i], params[idx]);
            }
        }
        return newStr;
    }


    /**
     * 检测横竖屏幕 返回true 是横屏，否则是竖屏
     * 返回true 就是横屏 ，返回 false 是竖屏
     */
    public static checkHorOrVec(): boolean {
        var size = cc.view.getCanvasSize();
        return size.width >= size.height;
    }


    /**
     * //资源设计是 1920
     * 根据当前分辨率缩放节点
     * @param node 
     */
    public static setNodeResolutionSize(node: cc.Node): void {
        let size = cc.view.getDesignResolutionSize();
        let maxlen = size.width > size.height ? size.width : size.height;
        let rate = maxlen / Const.ResDesignSize.width;
        node.setScale(rate);
    }

    /**返回当前语言 */
    public static getCurLanguage(): LanguageType {
        let language = "en";
        if (cc.sys.isBrowser) {
            let url = ComUtils.getUrl();
            language = ComUtils.getUrlParam(url, 'language');
        } else {
            language = Global.language;
        }
        let isFileExist = ComUtils.getGameisLanguage(language);
        if (!isFileExist) {
            language = LanguageType.EN;
        }
        let type = LanguageType.EN;
        switch (language) {
            case "zh":
                type = LanguageType.ZH;
                break;
            case "en":
                type = LanguageType.EN;
                break;
            case "ja":
                type = LanguageType.JA;
                break;
            case "ko":
                type = LanguageType.KO;
                break;
            case "th":
                type = LanguageType.TH;
                break;
            case "vn":
                type = LanguageType.VN;
                break;
            case "pu":
                type = LanguageType.PU;
                break;
            default:
                type = LanguageType.EN;
                break;
        }
        return type;
    }

    static getGameisLanguage(language: string): boolean {
        let text = Global.gameId.toString().slice(0, 2);
        let type: string[] = [];
        switch (text) {
            case "10":
                type.push("textures/language/");
                type.push("textures/language/turnSetting/");
                type.push("textures/paytable/");
                type.push("textures/turnSetting/");
                type.push("textures/language/payTable/");
                type.push("textures/language/setting/");
                type.push("textures/language/paytable/");
                break;
            case "20":
                type.push("textures/language/");
                type.push("atlas/language/");
                break;
            case "30":
                type.push("textures/hall/");
                break;
        }
        let bundle = ComUtils.getRealBundle("game_" + Global.gameId)
        for (let i = 0; i < type.length; i++) {
            let str = type[i];
            if (Utils.isFileExist(str + language, bundle)) {
                return true;
            }
        }
        return false;
    }


    /**
     * 获取一个随机的哈希值，每次获取都是一个新的
     * 获取 crypto 生成的Uint8Array(16) ,然后转16位进制的 字符串
     * 如果拿到不到 window.crypto 那么用 Math.random 做相同的操作
    */
    public static getUUid(): string {
        if (window.crypto) {
            let temp = window.crypto.getRandomValues(new Uint8Array(16));
            let str = ""
            //@ts-ignore
            for (let i = 0; i < temp.length; i++) {
                str += temp[i].toString(16);
            }
            return str;
        } else {
            let str = ""
            for (let i = 0; i < 16; i++) {
                str += parseInt((Math.random() * 200).toString()).toString(16);
            }
            return str;
        }
    }

    static getGameType(): string {
        let type = GAME_TYPE.TRUCO;
        let qyxzList = [30026];
        let gameId = Math.floor(Global.gameId / 100);
        if ((gameId >= 30001 && gameId <= 30012) || qyxzList.indexOf(gameId) != -1) {
            type = GAME_TYPE.QYXZ;
        } else if (gameId >= 30014 && gameId <= 30021) {
            type = GAME_TYPE.QZDZ;
        }
        return type;
    }


    /**
     * 通过FingerprintJS 库获取指纹，固定的uuid识别码.
     * @param target 回调函数上下文
     * @param callFun 回调函数 callFun(visitorId:string){}
     */
    public static getFingerprint(target: any, callFun: (visitorId: string) => void) {
        if (window["FingerprintJS"]) {
            console.log("获取个人uuid识别码");
            (async () => {
                // We recommend to call `load` at application startup.
                const fp = await window["FingerprintJS"].load();

                // The FingerprintJS agent is ready.
                // Get a visitor identifier when you'd like to.
                const result = await fp.get();

                // This is the visitor identifier:
                const visitorId = result.visitorId;
                //console.log(visitorId);
                callFun.call(target, visitorId)
            })();
        } else {
            console.warn("获取个人uuid识别码失败，缺少插件库");
        }
    }

    // 字符串驼峰化
    public static camelize(label: string) {
        if (label.length === 0)
            return label;

        var n, result, words = label.split(/[_-]/);

        // single word with first character already lowercase, return untouched
        if ((words.length === 1) && (words[0][0].toLowerCase() === words[0][0]))
            return label;

        result = words[0].toLowerCase();
        for (n = 1; n < words.length; n++) {
            result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
        }

        return result;
    }

    // 字符串驼峰化 + 前缀
    public static camelize_prefix(prefix: string, label: string) {
        label = ComUtils.camelize(label);
        return prefix + label[0].toUpperCase() + label.substring(1);
    }

    //获取游戏的bundle 可能根据内存 获取的不同分辨率的bundle
    public static getRealBundle(bundleName: string, path?: string | string[]): string {
        let bundle = bundleName;
        let commonBundle = "";
        let hasCommon = null;

        //在start 已经做了转化，这里是防止有可能是其他地方代码写死了 游戏id传过来的情况。
        bundle = ComUtils.convertGameId(bundle);

        //这里可能多了一次转化，传入进来 例如game_1000_960
        if (/game_[0-9]+/.test(bundle)) {
            if (/game_[0-9]+_/.test(bundle)) {
                let str = bundle.slice(0, bundle.lastIndexOf("_"));
                commonBundle = str + "_common"
            } else {
                commonBundle = bundle + "_common";
            }
            hasCommon = cc.assetManager.getBundle(commonBundle);
        }

        //如果是游戏的bundle ,那么根据高低清分辨率
        if (window["curGamebundle"] && /game_[0-9]+/.test(bundle)) {
            if (path) {
                if (hasCommon) {
                    if (path instanceof Array) {
                        if (path[0] && /sound/i.test(path[0])) {
                            bundle = commonBundle;
                        }
                    } else if (/sound/i.test(path)) {
                        bundle = commonBundle;
                    } else {
                        bundle = window["curGamebundle"];
                    }
                } else {
                    bundle = window["curGamebundle"];
                }

            } else {
                bundle = window["curGamebundle"];
            }
        }


        return bundle;
    }

    /**
     * 游戏id转化，有倒数第二位其他类型的都转成0，真实的bundle在普通工程上
     * gameid 如果传入 game_1000111 那么会返回  game_1000101
     * gameid 如果传入 1000111 那么会返回  1000101
     * 如果是捕猎游戏，因为
     */
    public static convertGameId(gameid: string): string {
        let id = gameid;
        //传进来的 game_1001001_960这种就直接return
        if (/game_[0-9]+_/.test(gameid)) {
            return id;
        }
        //多个游戏id对应同一个工程，通过倒数第二位决定是什么模式。倒数第二位改成0 那么就是原始工程。例如1000111 改成 1000101
        if (/^(game_)?(1|3)[0-9]+$/.test(gameid)) {
            id = ComUtils.replaceStr(gameid, gameid.length - 2, '0');
        } else if (/^(game_)?2[0-9]+$/.test(gameid)) {
            //捕猎哈希玩法 假如  game_2001101 转成 game_2000101
            id = ComUtils.replaceStr(gameid, gameid.length - 4, '0');
        }

        return id;
    }

    /** 获取当前游戏id 所属类型（返回的0 1 2 3代表不同玩法） 
      * gameId ：number
     */
    public static getGameModel(gameId?: number): number {
        let game_id = gameId ? gameId : Global.gameId;
        let idstr = game_id.toString();
        let type = 0;
        //slot 和 其他游戏取倒数第二位作为 作为游戏玩法
        if (/^(game_)?(1|3)[0-9]+$/.test(idstr)) {
            type = Number(idstr[idstr.length - 2]);
        } else if (/^(game_)?2[0-9]+$/.test(idstr)) {
            //捕猎取倒数第四 作为游戏玩法
            type = Number(idstr[idstr.length - 4]);
        }
        return type;
    }

    //资源高低质量
    private static picQuality: PICQUALITY = null;
    public static getPicQuality(): PICQUALITY {
        if (ComUtils.picQuality) {
            return ComUtils.picQuality;
        }
        let bundles = cc.assetManager.bundles;
        let hascommon = false;      //如果有common说明是由高低清晰
        for (const key in bundles["_map"]) {
            if (/^game_[0-9]+_common$/.test(key)) {
                hascommon = true;
                break;
            }
        }
        if (hascommon && window["curGamebundle"]) {
            if (/^game_[0-9]+_960$/.test(window["curGamebundle"])) {
                ComUtils.picQuality = PICQUALITY.LOW;
            } else {
                ComUtils.picQuality = PICQUALITY.HEIGHT;
            }
        } else {
            ComUtils.picQuality = PICQUALITY.HEIGHT;
        }
        return ComUtils.picQuality;
    }

    /**
     * 替换一个字符串的第几个字符
     * @param str 需要替换的目标字符
     * @param index 第几个字符
     * @param char 替换成该字符
     * @returns 
     */
    public static replaceStr = (str, index, char) => {
        return str.substring(0, index) + char + str.substring(index + 1);
    }

}
