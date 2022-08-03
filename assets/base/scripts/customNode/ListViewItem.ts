/**
 * 异步列表子项
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class ListViewItem extends cc.Component {

    protected _index: number = 0;
    protected _data: any = null;
    protected _target: any = null;      // 目标句柄
    protected _extParams: any = null;   // 额外参数

    /**
     * 子类实现此方法
     * @param index 索引
     * @param data 数据
     * @param params 附加数据（预留参数）
     */
    public updateItem(index: number, data: any, params?: any) {
        this._index = index;
        this._data = data;
        if (this._data == undefined || this._data == null) {
            this.node.active = false;
        } else {
            this.node.active = true;
        }
    }

    // 绑定target
    public bindTarget(target: any) { this._target = target; }

    public get index() { return this._index; }
    public get data() { return this._data; }
    public getExtParams() { return this._extParams; }
    public setExtParams(params: any) { this._extParams = params; }
}
