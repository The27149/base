/**
 * 日志
 */
export class zLog {

    /**所有不打印 */
    public static LEVEL_NONE: number = 0;
    /**打印trace信息 */
    public static LEVEL_TRACE: number = 1;
    /**打印日志信息 */
    public static LEVEL_LOG: number = 2;
    /**打印调试信息 */
    public static LEVEL_DEBUG: number = 4;
    /**打印警告信息 */
    public static LEVEL_WARN: number = 8;
    /**打印错误信息 */
    public static LEVEL_ERROR: number = 16;
    /**打印自定义信息 */
    public static LEVEL_INFO: number = 32;
    /**打印全部信息 */
    public static LEVEL_ALL: number = 63;

    private static _isInit: boolean = false;

    /**打印开关 */
    public static enabled: boolean = true;

    private static _consoleTrace;
    private static _consoleLog;
    private static _consoleWarn;
    private static _consoleDebug;
    private static _consoleError;

    /**打印信息等级 */
    public static level: number = zLog.LEVEL_ALL; // Log.level = Log.LEVEL_LOG | Log.LEVEL_ERROR | Log.LEVEL_WARN;

    /**替换原生方法 */
    public static init(): void {
        if (!zLog.enabled) return;
        if (zLog.isIE) {
            if (console.log) {
                console.log = function (message?: any, ...optionalParams) { };
            }
            return;
        }
        if (zLog._isInit) return;
        zLog._isInit = true;

        try {
            zLog._consoleTrace = console.trace;
            console.trace = zLog.trace;

            zLog._consoleDebug = console.debug;
            console.debug = zLog.debug;


            zLog._consoleWarn = console.warn;
            console.warn = zLog.warn;

            zLog._consoleError = console.error;
            console.error = zLog.error;

            zLog._consoleLog = console.log;
            console.log = zLog.log;

        } catch (error) {
            console.log("Non support Log module!");
        }
    }

    public static dispose(): void {
        if (zLog._consoleTrace) {
            console.trace = zLog._consoleTrace;
            zLog._consoleTrace = null;
        }
        if (zLog._consoleDebug) {
            console.debug = zLog._consoleDebug;
            zLog._consoleDebug = null;
        }
        if (zLog._consoleWarn) {
            console.warn = zLog._consoleWarn;
            zLog._consoleWarn = null;
        }
        if (zLog._consoleError) {
            console.error = zLog._consoleError;
            zLog._consoleError = null;
        }
        if (zLog._consoleLog) {
            console.log = zLog._consoleLog;
            zLog._consoleLog = null;
        }
    }

    private static insertHead(type: number): string {
        var logType: string;
        switch (type) {
            case 1:
                logType = "trace";
                break;
            case 2:
                logType = "log";
                break;
            case 3:
                logType = "debug";
                break;
            case 4:
                logType = "warn";
                break;
            case 5:
                logType = "error";
                break;
            case 6:
                logType = "info";
                break;
        }
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var ms = date.getMilliseconds();
        var ss;
        if (ms < 10)
            ss = "00" + ms;
        else if (ms < 100)
            ss = "0" + ms;
        else
            ss = ms.toString();
        var time = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + "." + ss;
        return `[${time}][${logType}]>\t`;
    }

    private static execLogFun(fn: Function, type: number, message?: any, ...optionalParams): void {
        var needHead: boolean = (typeof message == "string") || (typeof message == "number") || (typeof message == "boolean");
        fn(needHead ? `${zLog.insertHead(type)}${message}` : message, ...optionalParams);
    }

    /**
     * 打印信息
     */
    public static trace(message?: any, ...optionalParams): void {
        if (zLog.isIE) return;
        if (!zLog.enabled)
            console.trace(message, ...optionalParams);
        else {
            if (!zLog._isInit)
                zLog.init();
            if ((zLog.level & zLog.LEVEL_TRACE) == zLog.LEVEL_TRACE)
                zLog.execLogFun(zLog._consoleTrace ? zLog._consoleTrace : console.trace, 1, message, ...optionalParams);
        }
    }

    /**
     * 日志信息
     */
    public static log(message?: any, ...optionalParams): void {
        if (zLog.isIE) return;
        if (!zLog.enabled)
            console.log(message, ...optionalParams);
        else {
            if (!zLog._isInit)
                zLog.init();
            if ((zLog.level & zLog.LEVEL_LOG) == zLog.LEVEL_LOG)
                zLog.execLogFun(zLog._consoleLog ? zLog._consoleLog : console.log, 2, message, ...optionalParams);
        }
    }

    /**
     * 调试信息
     */
    public static debug(message?: any, ...optionalParams): void {
        if (zLog.isIE) return;
        if (!zLog.enabled)
            console.debug(message, ...optionalParams);
        else {
            if (!zLog._isInit)
                zLog.init();
            if ((zLog.level & zLog.LEVEL_DEBUG) == zLog.LEVEL_DEBUG)
                zLog.execLogFun(zLog._consoleDebug ? zLog._consoleDebug : console.debug, 3, message, ...optionalParams);
        }
    }

    /**
     * 警告信息
     */
    public static warn(message?: any, ...optionalParams): void {
        if (zLog.isIE) return;
        if (!zLog.enabled)
            console.warn(message, ...optionalParams);
        else {
            if (!zLog._isInit)
                zLog.init();
            if ((zLog.level & zLog.LEVEL_WARN) == zLog.LEVEL_WARN)
                zLog.execLogFun(zLog._consoleWarn ? zLog._consoleWarn : console.warn, 4, message, ...optionalParams);
        }
    }

    /**
     * 错误信息
     */
    public static error(message?: any, ...optionalParams): void {
        if (zLog.isIE) return;
        if (!zLog.enabled)
            console.error(message, ...optionalParams);
        else {
            if (!zLog._isInit)
                zLog.init();
            if ((zLog.level & zLog.LEVEL_ERROR) == zLog.LEVEL_ERROR)
                zLog.execLogFun(zLog._consoleError ? zLog._consoleError : console.error, 5, message, ...optionalParams);
        }
    }

    /**
     * 自定义信息
     */
    public static info(message?: any, ...optionalParams): void {
        if (zLog.isIE) return;
        if (!zLog.enabled)
            console.log(message, ...optionalParams);
        else {
            if (!zLog._isInit)
                zLog.init();
            if ((zLog.level & zLog.LEVEL_INFO) == zLog.LEVEL_INFO) {
                var level: number = zLog.level;
                zLog.level = zLog.LEVEL_LOG;
                zLog.execLogFun(zLog._consoleLog ? zLog._consoleLog : console.log, 6, message, ...optionalParams);
                zLog.level = level;
            }
        }
    }

    private static get isIE(): boolean {
        return window['ActiveXObject'] || "ActiveXObject" in window;
    }
}