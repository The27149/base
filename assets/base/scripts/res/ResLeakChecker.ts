
/**
 * 资源泄露检查类，可以用于跟踪
 * 
 * 1. 实例化ResLeakChecker之后，需要先绑定到resLoader中
 * 2. 设置resFilter过滤器可以过滤不需要检测的资源，可用于专门跟踪某资源的使用情况
 * 3. 设置startCheck和stopCheck可动态开启、关闭检测，可用于跟踪某时间段内分配了未释放的资源
 * 4. dump方法可以将收集到的未释放资源打印到控制台
 * 5. getLog可以获取收集到的泄露日志，自己进行打印、上传或存档
 * 6. resetLog方法可以清空泄露日志
 * 
 */

import { ComUtils } from "../utils/ComUtils";

export type FilterCallback = (urlOruuid: string) => boolean;  // 需要过滤文件返回false

export class ResLeakChecker {

    private static _instance: ResLeakChecker = null;
    private resFilter: FilterCallback = null;
    private _checking: boolean = false;
    private _log: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();      // Map<uuid, <use, stack>>

    private constructor() {
        // do nothing
    }

    public static getInstance(): ResLeakChecker {
        if (!this._instance) {
            this._instance = new ResLeakChecker();
        }
        return this._instance;
    }

    // 该接口全程都不用
    // public static destroy(): void {
    //     if (this._instance) {
    //         this._instance = null;
    //     }
    // }

    public setFilterCallback(cb: FilterCallback) {
        this.resFilter = cb;
    }

    public checkFilter(urlOruuid: string): boolean {
        if (!this._checking) {
            return false;
        }
        if (this.resFilter) {
            return this.resFilter(urlOruuid);
        }
        return true;
    }

    public logLoad(uuid: string, use: string, stack?: string) {
        if (!this.checkFilter(uuid)) {
            return;
        }

        if (!this._log.has(uuid)) {
            this._log.set(uuid, new Map<string, string>());
        }

        let info: Map<string, string> = this._log.get(uuid);
        if (info.has(use)) {
            console.warn(`ResLeakChecker doubel same use ${uuid} : ${use}, stack ${info[use]}`);
        }
        info.set(use, stack ? stack : ComUtils.getCallStack(2));
    }

    public logRelease(uuid: string, use: string) {
        if (!this.checkFilter(uuid)) {
            return;
        }

        if (!this._log.has(uuid)) {
            console.warn(`ResLeakChecker uuid nofound ${uuid}`);
            return;
        }
        
        let info: Map<string, string> = this._log.get(uuid);
        if (!info.has(use)) {
            console.warn(`ResLeakChecker use nofound ${uuid} : ${use}`);
        } else {
            info.delete(use);
        }

        if (info.size <= 0) this._log.delete(uuid);
    }

    public startCheck() { this._checking = true; }
    public stopCheck() { this._checking = false; }
    public getLog() { return this._log; }
    public resetLog() {
        this._log = new Map<string, Map<string, string>>();
    }
    
    public dump(showStack?: boolean) {
        this._log.forEach((log, uuid) => {
            let assetInfo = cc.assetManager.assets.get(uuid);
            console.log(assetInfo);

            if (showStack) {
                log.forEach((stack, use) => {
                    console.log(`${use} : ${stack}`);
                });
            } else {
                log.forEach((stack, use) => {
                    console.log(`${use}`);
                });
            }
        });
    }
}

export let resLeakChecker = ResLeakChecker.getInstance();