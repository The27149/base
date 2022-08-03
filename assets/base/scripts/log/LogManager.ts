import TimeUtil from "../utils/TimeUtil";
import { zLog } from "./zLog";

//记录中保留50条记录
const saveLogCount = 50;

export class LogManager {
    private static instance: LogManager = null;
    private _log: string[] = [];
    private tempConsoleLogFunc = console.log;
    public _display: boolean = true;

    public static getInstance(): LogManager {
        if (!this.instance) {
            this.instance = new LogManager();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * 是否开启console.log
     */
    set enableConsoleLog(value: boolean) {
        if (value) {
            zLog.level = zLog.LEVEL_ALL;
        } else {
            zLog.level = zLog.LEVEL_NONE;
        }
    }

    /**
     * 这个在build之后依然可以在 控制台中打印日志
     * @param arg 需要打印的内容
     */
    public console(message?: any, ...optionalParams: any[]): void {
        // if(!this._display){
        //     return;
        // }
        // console.log(TimeUtil.getTimeFormat7( new Date()) + " : " + message, ...optionalParams);
        // this.recoder(message, ...optionalParams);
        zLog.log(message, ...optionalParams);
    }
    /**
     * 这个只在Debug在控制台中打印日 
     * @param arg 需要打印的内容
     */
    public log(message?: any, ...optionalParams: any[]): void {
        // if(!this._display){
        //     return;
        // }
        // cc.log(TimeUtil.getTimeFormat7( new Date())  + " : " + message, ...optionalParams);
        // this.recoder(message, ...optionalParams);
        zLog.log(message, ...optionalParams);
    }
    /**
     * 这个只在Debug在控制台中打印错误日志
     * @param arg 需要打印的内容
     */
    public error(message?: any, ...optionalParams: any[]): void {
        // console.error(TimeUtil.getTimeFormat7( new Date())  + " : " + message, ...optionalParams);
        // this.recoder(message, ...optionalParams);
        zLog.error(message, ...optionalParams);
    }
    /**
     * 这个只在Debug在控制台中打印警告日志
     * @param arg 需要打印的内容
     */
    public warn(message?: any, ...optionalParams: any[]): void {
        // console.warn(TimeUtil.getTimeFormat7( new Date())  + " : " + message, ...optionalParams);
        // this.recoder(message, ...optionalParams);
        zLog.warn(message, ...optionalParams);
    }

    private recoder(message?: any, ...optionalParams: any[]) {
        // //如果记录的数据超过阀值 会将前面的老数据删除
        // if (this._log.length > saveLogCount) {
        //     this._log.shift();
        // }
        // this._log.push(message + " , " + optionalParams);
    }

    //展示所有的保存日志，到时候这里会进行实现，是打印在屏幕还是哪里
    public displayAll(): void {
        // console.log(this._log);
    }

    //获取日志
    public getlog(): string[] {
        return this._log;
    }

    //发送至服务器
    public sendserver(): void {

    }

    //保存在本地
    public savelocal(): void {

    }

    public clearlog() {
        this._log = []
    }
}
export let logMgr = LogManager.getInstance();