//使用的时间工具

import Global from "../global/Global";

//美国夏令时（3月11日至11月7日），冬令时（11月8日至次年3月11日）  凌晨2点开始
//console.log("*******************东区时间************************************");
// console.log("零时区-伦敦时间：" + getLocalTime(0));
// console.log("东一区-柏林时间：" + getLocalTime(1));
// console.log("东二区-雅典时间：" + getLocalTime(2));
// console.log("东三区-莫斯科时间：" + getLocalTime(3));
// console.log("东四区-时间：" + getLocalTime(4));
// console.log("东五区-伊斯兰堡时间：" + getLocalTime(5));
// console.log("东六区-科伦坡时间：" + getLocalTime(6));
// console.log("东七区-曼谷时间：" + getLocalTime(7));
// console.log("东八区-北京时间：" + getLocalTime(8));
// console.log("东九区-东京时间：" + getLocalTime(9));
// console.log("东十区-悉尼时间：" + getLocalTime(10));
// console.log("东十二区-斐济时间：" + getLocalTime(12));
// console.log("*******************西区时间************************************");
// console.log("西十区-斐济时间：" + getLocalTime(-10));
// console.log("西九区-阿拉斯加时间：" + getLocalTime(-9));
// console.log("西八区-太平洋时间（美国和加拿大）：" + getLocalTime(-8));
// console.log("西七区-山地时间（美国和加拿大）：" + getLocalTime(-7));
// console.log("西六区-中部时间（美国和加拿大）：" + getLocalTime(-6));
// console.log("西五区-东部时间（美国和加拿大）：" + getLocalTime(-5));
// console.log("西四区-大西洋时间（加拿大）：" + getLocalTime(-4));
// console.log("西三区-巴西利亚时间：" + getLocalTime(-3));
//得到标准时区的时间的函数
export default class TimeUtil {
    /**
     * 获取当地的时间
     * @param i 输入时区 默认是大西洋时区，西四区
     */
    public static getLocalTime(i: number = -4): Date {
        //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
        if (typeof i !== 'number') return;
        var d = new Date();
        //得到1970年一月一日到现在的秒数
        var len = d.getTime();
        //本地时间与GMT时间的时间偏移差
        var offset = d.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = len + offset;
        return new Date(utcTime + 3600000 * i);
    }

    /**
     * 获取本机的时间戳，这里的时区就是当前所在时区，获取毫秒
     */
    public static getTimestamp(): number {
        let date = new Date();
        return date.getTime();
    }

    /**
     *  获取当地时间戳
     * @param i 输入时区 默认是大西洋时区，西四区，获取毫秒
     */
    public static getLocalTimestamp(i: number = -4): number {
        let date = TimeUtil.getLocalTime(i);
        return date.getTime();
    }

    /**
     * 通过传入一个时间戳转成另外一个时区的时间
     * @param time 传入时间戳，需要被转化的时间
     * @param index 需要转化之后的时区，默认是大西洋时区，西四区
     */
    public static getTimeByTimeZone(time: number, index: number = -4): Date {
        if (typeof index !== 'number') return;
        var d = new Date();
        //本地时间与GMT时间的时间偏移差
        var offset = d.getTimezoneOffset() * 60000;
        //得到一个现在时间戳下相对于格林尼治时间 
        var utcTime = time + offset;
        return new Date(utcTime + 3600000 * index);
    }

    /**
     * 通过传入一个格式化的时间字符串eg:"2017/6/28/12/0/0",转成另外一个时区的时间
     * @param timeStr 需要被转化的，格式化的时间字符串eg:"2017/6/28/12/0/0"
     * @param index 需要转化后的时区，默认是大西洋时区，西四区
     */
    public static getTimeFormOtherZone(timeStr: string, index: number = -4): Date {
        var local = new Date();
        var offset = local.getTimezoneOffset() / 60;   //获取当前时区 东 负， 西 正
        var cha = offset + index;
        var timeObj = timeStr.split("/");
        var tempTime = new Date(parseInt(timeObj[0]), parseInt(timeObj[1]), parseInt(timeObj[2]), parseInt(timeObj[3]), parseInt(timeObj[4]), parseInt(timeObj[5]));
        var time = tempTime.getTime() - cha * 3600000;
        return new Date(time);
    }

    /**
     * 时间戳转化成 一定格式化样式的 时间字符串 eg:2017/6/6 19:09:00
     * @param cdt 时间戳
     * @param isNewline 是否换行， 
     */
    public static getTimeFormat(cdt: Date, isNewline?: boolean): string {
        var curYear = cdt.getFullYear();
        var curMonth = cdt.getMonth() + 1;
        var curDay = cdt.getDate();
        var curHour = cdt.getHours();
        var curMinutes = cdt.getMinutes();
        let minStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;
        var curSecond = cdt.getSeconds();
        let secondStr = curSecond >= 10 ? curSecond : "0" + curSecond;
        let timeSymbol = isNewline ? "\n" : "  ";
        return curYear + "/" + curMonth + "/" + curDay + timeSymbol + curHour + ":" + minStr + ":" + secondStr;
    }

    /**
     * 时间戳转化成 一定格式化样式的 时间字符串 eg:2017/6/6 19:09:00
     * @param cdt 时间戳
     * @param isNewline 是否换行， 
     */
    public static getTimeFormatUTC(cdt: Date, isNewline?: boolean): string {
        var curYear = cdt.getUTCFullYear();
        var curMonth = cdt.getUTCMonth() + 1;
        var curDay = cdt.getUTCDate();
        var curHour = cdt.getUTCHours();
        var curMinutes = cdt.getUTCMinutes();
        let minStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;
        var curSecond = cdt.getUTCSeconds();
        let secondStr = curSecond >= 10 ? curSecond : "0" + curSecond;
        let timeSymbol = isNewline ? "\n" : "  ";
        return curYear + "/" + curMonth + "/" + curDay + timeSymbol + curHour + ":" + minStr + ":" + secondStr;
    }

    /**
     * 通过秒数 返回 格式化时间 19:09:00
     * @param second 秒数
     */
    public static getTimeFormat2(second: number): string {
        var curHour = 0;
        var curMinutes = 0;
        var curSecond = 0;
        if (second >= 3600) {
            curHour = parseInt((second / 3600).toString());
            curMinutes = parseInt(((second % 3600) / 60).toString());
            curSecond = Math.floor((second % 3600) % 60);
        } else if (second >= 60) {
            curMinutes = parseInt((second / 60).toString());
            curSecond = Math.floor(second % 60);
        } else {
            curSecond = Math.floor(second);
        }
        let curHourStr = curHour >= 10 ? curHour : "0" + curHour;
        let curMinutesStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;
        let curSecondStr = curSecond >= 10 ? curSecond : "0" + curSecond;
        return curHourStr + ":" + curMinutesStr + ":" + curSecondStr;
    }

    /**
     * 通过时间戳 返回 格式化时间 12月30日 8:00
     * @param cdt 时间戳
     */
    public static getTimeFormat3(cdt: Date): string {
        var curMonth = cdt.getMonth() + 1;
        var curDay = cdt.getDate();
        var curHour = cdt.getHours();
        var curMinutes = cdt.getMinutes();
        let curMinutesStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;

        return curMonth + "月" + curDay + "日" + " " + curHour + ":" + curMinutesStr;
    }

    /**
     * 时间戳转化成 一定格式化样式的 时间字符串 eg:2017/6/6 19:09:00
     * @param cdt 时间戳
     */
    public static getTimeFormat4(cdt: Date): string {
        var curYear = cdt.getFullYear();
        var curMonth = cdt.getMonth() + 1;
        var curDay = cdt.getDate();
        var curHour = cdt.getHours();
        var curMinutes = cdt.getMinutes();
        let minStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;
        var curSecond = cdt.getSeconds();
        let secondStr = curSecond >= 10 ? curSecond : "0" + curSecond;
        return curYear + "/" + curMonth + "/" + curDay + "-" + curHour + ":" + minStr + ":" + secondStr;
    }

    /**
     * 时间戳转化成 一定格式化样式的 时间字符串 eg:2017/06/06-19:09:00
     * @param cdt 时间戳
     */
    public static getTimeFormat5(cdt: Date): string {
        var curYear = cdt.getFullYear();
        var curMonth = cdt.getMonth() + 1;
        let mouth = curMonth >= 10 ? curMonth : "0" + curMonth;
        var curDay = cdt.getDate();
        let day = curDay >= 10 ? curDay : "0" + curDay;
        var curHour = cdt.getHours();
        var curMinutes = cdt.getMinutes();
        let minStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;
        var curSecond = cdt.getSeconds();
        let secondStr = curSecond >= 10 ? curSecond : "0" + curSecond;
        return curYear + "/" + mouth + "/" + day + "-" + curHour + ":" + minStr + ":" + secondStr;
    }

    /**
     * 时间戳转化成 一定格式化样式的 时间字符串 eg:2017-06-06 08:09:00
     * @param cdt 时间戳
     * @param isNewline 是否换行， 
     */
    public static getTimeFormat6(cdt: Date, isNewline?: boolean): string {
        var curYear = cdt.getFullYear();
        var curMonth = cdt.getMonth() + 1;
        let monthStr = curMonth >= 10 ? curMonth : "0" + curMonth;
        var curDay = cdt.getDate();
        let dayStr = curDay >= 10 ? curDay : "0" + curDay;
        var curHour = cdt.getHours();
        let hourStr = curHour >= 10 ? curHour : "0" + curHour;
        var curMinutes = cdt.getMinutes();
        let minStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;
        var curSecond = cdt.getSeconds();
        let secondStr = curSecond >= 10 ? curSecond : "0" + curSecond;
        let timeSymbol = isNewline ? "\n" : "  ";
        return curYear + "-" + monthStr + "-" + dayStr + timeSymbol + hourStr + ":" + minStr + ":" + secondStr;
    }

    /**
   * 时间戳转化成 一定格式化样式的 时间字符串 eg: 19:09:00:000
   * @param cdt 时间戳
   */
    public static getTimeFormat7(cdt: Date): string {
        var curHour = cdt.getHours();
        var curMinutes = cdt.getMinutes();
        let minStr = curMinutes >= 10 ? curMinutes : "0" + curMinutes;
        var curSecond = cdt.getSeconds();
        let secondStr = curSecond >= 10 ? curSecond : "0" + curSecond;
        var curminiSecond = cdt.getMilliseconds();
        let millsencond = null;
        if (curminiSecond >= 100) {
            millsencond = curminiSecond;
        } else if (curminiSecond >= 10) {
            millsencond = "0" + curminiSecond;
        } else {
            millsencond = "00" + curminiSecond;
        }
        return curHour + ":" + minStr + ":" + secondStr + ":" + millsencond;
    }


    /**获取服务端时间 是单位 毫秒的时间戳*/
    public static getServerTimestamp(): number {
        let time = TimeUtil.getTimestamp() + Global.serverTimeOffset;
        return time;
    }
}