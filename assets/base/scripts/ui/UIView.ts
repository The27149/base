/**
 * 界面基础类
 * 
 * 1. 快速关闭与屏蔽点击的选项配置
 * 2. 界面缓存设置（开启后界面关闭不会被释放，以便下次快速打开）
 * 3. 界面显示类型配置
 * 
 * 4. 加载资源接口（随界面释放自动释放），this.loadRes(xxx)
 * 5. 由UIManager释放
 * 
 * 5. 界面初始化回调（只调用一次）
 * 6. 界面打开回调（每次打开回调）
 * 7. 界面打开动画播放结束回调（动画播放完回调）
 * 8. 界面关闭回调
 * 9. 界面置顶回调
 */

import ResKeeper from "../res/ResKeeper";
import { IUIConf } from "./UIManager";

const {ccclass, property} = cc._decorator;

/**
 * 界面展示类型
 * @param UI_FULLSCREEN 全屏显示，全屏界面使用该选项可获得更高性能
 * @param UI_ADDITION 叠加显示，性能较差
 * @param UI_SINGLE 单界面显示，只显示当前界面和背景界面，性能较好
 */
export enum UIShowTypes {
    UI_FULLSCREEN,       // 全屏显示，全屏界面使用该选项可获得更高性能
    UI_ADDITION,         // 叠加显示，性能较差
    UI_SINGLE,           // 单界面显示，只显示当前界面和背景界面，性能较好
};

@ccclass
export default class UIView extends ResKeeper {

    // 快速关闭
    private _quickClose: boolean = false;
    public get quickClose() {
        return this._quickClose;
    }

    // 缓存选项
    private _cache: boolean = false;
    public get cache() {
        return this._cache;
    }

    // 界面展示类型
    private _showType: UIShowTypes = UIShowTypes.UI_SINGLE;
    public get showType() {
        return this._showType;
    }


    // 界面id
    private _uiId: number = 0;
    public get uiId() {
        return this._uiId;
    }


    /**
     * 当界面被创建时回调，生命周期内只调用一次
     * @param uiId 界面id
     * @param uiConf 界面配置
     */
    public initProperty(uiId: number, uiConf: IUIConf) {
        if (typeof uiId == 'number') this._uiId = uiId;
        if (undefined != uiConf.quickClose) this._quickClose = uiConf.quickClose;
        if (undefined != uiConf.cache) this._cache = uiConf.cache;
        if (undefined != uiConf.showType) this._showType = uiConf.showType;
    }

    /**
     * 当界面被创建时回调，生命周期内只调用一次
     * @param args 可变参数
     */
    public init(...args: any[]): void {
        
    }

    /**
     * 当界面被打开时回调，每次调用open时回调
     * @param fromUI 从哪个UI打开的
     * @param args 可变参数
     */
    public onOpen(fromUI: number, ...args: any[]): void {

    }

    /**
     * 每次界面open动画播放完毕时回调
     */
    public onOpenAniOver(): void {

    }

    /**
     * 当界面被关闭时回调，每次调用close时回调
     * 返回值传递给下一个界面
     */
    public onClose(): any {

    }

    /**
     * 当界面被置顶时回调，open时不会调用
     * @param preId 前一个界面id
     * @param args 可变参数
     */
    public onTop(preId: number, ...args: any[]): void {

    }
}
