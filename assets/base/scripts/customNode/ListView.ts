/**
 * 异步加载列表组件
 * 1. 该组件正常工作前提：
 *      （1）纵向滑动content锚点设为（0.5, 1），居中对齐view上边界；横向滑动content锚点设为（0, 0.5），居中对齐view左边界
 *      （2）使用item锚点需要设为 (0.5, 0.5)，item根节点宽高会用于布局坐标计算，不能为0
 * 2. 该组件滑动方向与关联scrollview同步
 * 3. 横向列表item排列顺序：从上至下，从左至右
 * 4. 纵向列表item排列顺序：从左至右，从上至下
 */

import ListViewItem from "./ListViewItem";

const { ccclass, property } = cc._decorator;

enum Direction {
    Horizontal = 0,
    Vertical = 1,
}

// listview 事件
export enum ListViewEvent {
    DATA_RUNOUT = 0,    // 源数据耗尽
}

// listview 回调
export interface IListViewCallback {
    callback: (sender: any, event: any) => void,
    target?: any,
}

/**
 * ListView参数
 * @param list 列表数据
 * @param eventCb ListView事件回调
 * @param itemTemplate ListViewItem使用模板
 */
export interface IListViewArgs {
    list?: any[],
    eventCb?: IListViewCallback,
    itemTemplate?: cc.Prefab,
}

@ccclass
export default class ListView extends cc.Component {
    @property(cc.ScrollView)
    public scrollView: cc.ScrollView = null;

    @property({
        type: cc.Prefab,
        tooltip: "item预制体 预制挂的脚本要继承ListViewItem"
    })
    public itemTemplate: cc.Prefab = null;//item预制体 预制挂的脚本要继承ListViewItem

    @property({
        type: cc.Integer,
        tooltip: "实际生成的item数,一般比可视视图的多一行或一列"
    })
    public spawnCount: number = 0;      // 需要创建的item实例数量

    @property({
        type: cc.Integer,
        tooltip: "横向间隔"
    })
    public spacingX: number = 0; // item横向间隔

    @property({
        type: cc.Integer,
        tooltip: "纵向间隔"
    })
    public spacingY: number = 0; // item纵向间隔

    @property({
        type: cc.Integer,
        tooltip: "纵向布局时的列数，仅纵向布局生效",
        min: 1,
    })
    public colNum: number = 1; // 纵向布局时的列数

    @property({
        type: cc.Integer,
        tooltip: "横向布局时的行数，仅横向布局生效",
        min: 1,
    })
    public rowNum: number = 1; // 横向布局时的行数

    @property({
        type: cc.Integer,
        tooltip: "item左边距"
    })
    public paddingLeft: number = 0;     // 左边距

    @property({
        type: cc.Integer,
        tooltip: "item右边距"
    })
    public paddingRight: number = 0;    // 右边距

    @property({
        type: cc.Integer,
        tooltip: "item上边距"
    })
    public paddingTop: number = 0;      // 上边距

    @property({
        type: cc.Integer,
        tooltip: "item下边距"
    })
    public paddingBottom: number = 0;   // 下边距

    protected _extParams: any = null;   // 额外参数
    protected _isReady: boolean = false;              // 列表是否准备好
    protected _direction = Direction.Vertical;
    protected _totalCount: number = 0;    // 在列表中显示item总数量
    protected _itemHeight: number = 0;    // item的高度
    protected _itemWidth: number = 0;     // item的宽度
    protected _itemBeginX: number = 0;    // item开始坐标x
    protected _itemBeginY: number = 0;    // item开始坐标y
    protected _dataList: any[] = [];
    protected _itemList: cc.Node[] = [];
    protected _updateTime: number = 0;
    protected _updateInterval: number = 0.1;
    protected _bufferZoneY: number = 0;
    protected _bufferZoneX: number = 0;
    protected _lastContentY: number = 0;
    protected _lastContentX: number = 0;
    protected _content: cc.Node = null;
    protected _eventCb: IListViewCallback = null;     // 最后item回调
    protected _eventSendTag: Map<number, boolean> = new Map<number, boolean>();          // event派发tag

    // 额外参数
    public getExtParams() { return this._extParams; }
    public setExtParams(params: any) {
        this._extParams = params;
        // 同步至 item
        for (let i = 0; i < this._itemList.length; ++i) {
            let comp = this._itemList[i].getComponent(ListViewItem);
            if (comp) comp.setExtParams(this._extParams);
        }
    }

    // 列表是否准备好（初始化完成）
    public get isReady() { return this._isReady; }

    // 重置数据
    public _resetData() {
        this._isReady = false;              // 列表是否准备好
        this._direction = Direction.Vertical;
        this._totalCount = 0;    // 在列表中显示item总数量
        this._itemHeight = 0;    // item的高度
        this._itemWidth = 0;     // item的宽度
        this._itemBeginX = 0;    // item开始坐标x
        this._itemBeginY = 0;    // item开始坐标y
        this._dataList = [];
        this._updateTime = 0;
        this._updateInterval = 0.1;
        this._bufferZoneY = 0;
        this._bufferZoneX = 0;
        this._lastContentY = 0;
        this._lastContentX = 0;
        this._content = null;
        this._eventCb = null;               // 最后item回调
        this._eventSendTag.clear();         // event派发tag
    }

    // 初始化
    public init(args: IListViewArgs) {
        this._resetData();
        this._content = this.scrollView.content;
        this._dataList = args.list || [];
        this._totalCount = this._dataList.length;

        // scrollView重新贴顶
        this.scrollView.stopAutoScroll();
        if (this.scrollView.horizontal) {
            this._direction = Direction.Horizontal;
            this.scrollView.scrollToLeft();
        } else {
            this._direction = Direction.Vertical;
            this.scrollView.scrollToTop();
        }

        if (args.eventCb) this._eventCb = args.eventCb;
        if (this._itemList.length > 0) {
            // 已生成spawnItem
            if (args.itemTemplate && args.itemTemplate != this.itemTemplate) {
                // spawnItem 使用新预制
                this.itemTemplate = args.itemTemplate;
                this._initialize(true);
            } else {
                // spawnItem 不变
                this._initialize(false);
            }
        } else {
            // 未生成spawnItem
            if (args.itemTemplate && args.itemTemplate != this.itemTemplate) this.itemTemplate = args.itemTemplate;
            this._initialize(true);
        }

        this._isReady = true;
    }

    // 清除旧spawnItem
    protected _clearSpawnItem() {
        for (let i = 0; i < this._itemList.length; ++i) {
            this._itemList[i].destroy();
        }
        this._itemList = [];
    }

    /**
     * 列表初始化
     * @param needCreate 是否需要创建spawnItem
     */
    protected _initialize(needCreate?: boolean) {
        if (needCreate) {
            this._clearSpawnItem();
            for (let i = 0; i < this.spawnCount; ++i) {
                let item = cc.instantiate(this.itemTemplate);
                this._content.addChild(item);
                this._itemList.push(item);
            }
        }

        // 同步至 item
        for (let i = 0; i < this._itemList.length; ++i) {
            let comp = this._itemList[i].getComponent(ListViewItem);
            if (comp) comp.setExtParams(this._extParams);
        }

        if (this._itemList.length > 0) {
            this._itemHeight = this._extParams?.setHeight ? this._extParams.setHeight : this._itemList[0].height;
            this._itemWidth = this._extParams?.setWidth ? this._extParams.setWidth : this._itemList[0].width;
            // 设定缓冲矩形的大小为实际创建项的高度累加，当某项超出缓冲矩形时，则更新该项的显示内容
            let view = this.scrollView.content.parent;
            this._bufferZoneY = (view.height + this._itemHeight + this.spacingY) / 2;
            // 设定缓冲矩形的大小为实际创建项的宽度累加，当某this._extParams项超出缓冲矩形时，则更新该项的显示内容
            this._bufferZoneX = (view.width + this._itemWidth + this.spacingX) / 2;
        }

        let stepX = this._itemWidth + this.spacingX;
        let stepY = this._itemHeight + this.spacingY;
        if (this._direction == Direction.Vertical) {
            this._content.height = Math.ceil(this._totalCount / this.colNum) * stepY - this.spacingY + this.paddingTop + this.paddingBottom;
            this._itemBeginX = -this._content.width / 2 + this._itemWidth / 2 + this.paddingLeft;
            this._itemBeginY = -this._itemHeight / 2 - this.paddingTop;

            for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
                let item = this._itemList[i];
                item.active = true;
                //设置该item的坐标（注意父节点content的Anchor坐标是(0.5, 1)，所以item的y坐标总是负值）
                let row = Math.floor(i / this.colNum);
                let col = i % this.colNum;
                item.x = this._itemBeginX + col * stepX;
                item.y = this._itemBeginY - row * stepY;
                item.getComponent(ListViewItem).bindTarget(this);
                item.getComponent(ListViewItem).updateItem(i, this._dataList[i]);
            }
        } else {
            this._content.width = Math.ceil(this._totalCount / this.rowNum) * stepX - this.spacingX + this.paddingLeft + this.paddingRight;
            this._itemBeginX = this._itemWidth / 2 + this.paddingLeft;
            this._itemBeginY = this._content.height / 2 - this.paddingTop - this._itemHeight / 2;

            for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
                let item = this._itemList[i];
                item.active = true;
                // 设置该item的坐标（注意父节点content的Anchor坐标是(0, 0.5)，所以item的x坐标总是正值）
                let col = Math.floor(i / this.rowNum);
                let row = i % this.rowNum;
                item.x = this._itemBeginX + col * stepX;
                item.y = this._itemBeginY - row * stepY;
                item.getComponent(ListViewItem).bindTarget(this);
                item.getComponent(ListViewItem).updateItem(i, this._dataList[i]);
            }
        }
    }

    // 返回item在ScrollView空间的坐标值
    protected getPositionInView(item: cc.Node) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    // 获取某索引item在content中的坐标（initialize之后才有效）
    protected _getPositionByIndex(index: number): cc.Vec2 {
        let pos = cc.v2(0, 0);
        let stepX = this._itemWidth + this.spacingX;
        let stepY = this._itemHeight + this.spacingY;
        if (this._direction == Direction.Vertical) {
            let row = Math.floor(index / this.colNum);
            let col = index % this.colNum;
            pos.x = this._itemBeginX + col * stepX;
            pos.y = this._itemBeginY - row * stepY;
        } else {
            let col = Math.floor(index / this.rowNum);
            let row = index % this.rowNum;
            pos.x = this._itemBeginX + col * stepX;
            pos.y = this._itemBeginY - row * stepY;
        }

        return pos;
    }

    // 每帧调用一次。根据滚动位置动态更新item的坐标和显示(所以spawnCount可以比totalCount少很多)
    public update(dt: number) {
        if (!this._isReady) return;
        this._updateTime += dt;
        if (this._updateTime < this._updateInterval) {
            return; // 我们不需要每帧都做计算
        }
        this._updateTime = 0;

        if (this._direction == Direction.Vertical) {
            // 如果当前content的y坐标小于上次记录值，则代表往下滚动，否则往上。
            let isDown = this._content.y < this._lastContentY;
            let isUp = this._content.y > this._lastContentY;
            let offset = Math.ceil(this.spawnCount / this.colNum) * (this._itemHeight + this.spacingY);
            let contentOffset = Math.abs(this._content.y - this._lastContentY);
            let repeatCount = Math.ceil(contentOffset / offset);

            let updateItemList_v = (repeatCount: number) => {
                for (let i = 0; i < this._itemList.length; ++i) {
                    let item = this._itemList[i];
                    let viewPos = this.getPositionInView(item);
                    if (isDown) {
                        // 如果往下滚动时item已经超出可视范围
                        if (viewPos.y < -this._bufferZoneY) {
                            let itemComp = item.getComponent(ListViewItem);
                            let newIndex = itemComp.index - this.spawnCount * repeatCount; // 新index
                            if (newIndex >= 0) {
                                item.y += offset * repeatCount;   // 更新item的坐标（即上移一个offset的位置）
                                itemComp.updateItem(newIndex, this._dataList[newIndex]);    // 更新item的显示内容
                            }
                        }
                    } else if (isUp) {
                        // 如果往上滚动时item已经超出可视范围
                        if (viewPos.y > this._bufferZoneY) {
                            let itemComp = item.getComponent(ListViewItem);
                            let newIndex = itemComp.index + this.spawnCount * repeatCount; // 新index
                            if (newIndex < this._totalCount) {
                                item.y -= offset * repeatCount;   // 更新item的坐标（即下移一个offset的位置）
                                itemComp.updateItem(newIndex, this._dataList[newIndex]);    // 更新item的显示内容
                            } else {
                                if (this._eventCb && !this._eventSendTag.get(ListViewEvent.DATA_RUNOUT)) {
                                    this._eventSendTag.set(ListViewEvent.DATA_RUNOUT, true);
                                    let callback = this._eventCb.callback;
                                    let target = this._eventCb.target;
                                    if (target) {
                                        callback.call(target, this, ListViewEvent.DATA_RUNOUT);
                                    } else {
                                        callback(this, ListViewEvent.DATA_RUNOUT);
                                    }
                                }
                            }
                        }
                    } else {
                        if (this._eventSendTag.get(ListViewEvent.DATA_RUNOUT)) this._eventSendTag.set(ListViewEvent.DATA_RUNOUT, false);
                    }
                }
            }

            // 遍历数组，更新item的位置和显示
            if (repeatCount >= 2) updateItemList_v(repeatCount - 1);
            updateItemList_v(1);
            this._lastContentY = this._content.y;
        } else {
            // 如果当前content的x坐标小于上次记录值，则代表往左滚动，否则往右。
            let isLeft = this._content.x < this._lastContentX;
            let isRight = this._content.x > this._lastContentX;
            let offset = Math.ceil(this.spawnCount / this.rowNum) * (this._itemWidth + this.spacingX);
            let contentOffset = Math.abs(this._content.x - this._lastContentX);
            let repeatCount = Math.ceil(contentOffset / offset);

            let updateItemList_h = (repeatCount: number) => {
                for (let i = 0; i < this._itemList.length; ++i) {
                    let item = this._itemList[i];
                    let viewPos = this.getPositionInView(item);
                    if (isLeft) {
                        // 如果往左滚动时item已经超出可视范围
                        if (viewPos.x < -this._bufferZoneX) {
                            let itemComp = item.getComponent(ListViewItem);
                            let newIndex = itemComp.index + this.spawnCount * repeatCount; // 新index
                            if (newIndex < this._totalCount) {
                                item.x += offset * repeatCount;
                                itemComp.updateItem(newIndex, this._dataList[newIndex]);
                            } else {
                                if (this._eventCb && !this._eventSendTag.get(ListViewEvent.DATA_RUNOUT)) {
                                    this._eventSendTag.set(ListViewEvent.DATA_RUNOUT, true);
                                    let callback = this._eventCb.callback;
                                    let target = this._eventCb.target;
                                    if (target) {
                                        callback.call(target, this, ListViewEvent.DATA_RUNOUT);
                                    } else {
                                        callback(this, ListViewEvent.DATA_RUNOUT);
                                    }
                                }
                            }
                        }
                    } else if (isRight) {
                        // 如果往右滚动时item已经超出可视范围
                        if (viewPos.x > this._bufferZoneX) {
                            let itemComp = item.getComponent(ListViewItem);
                            let newIndex = itemComp.index - this.spawnCount * repeatCount; // 新index
                            if (newIndex >= 0 && newIndex < this._totalCount) {
                                item.x -= offset * repeatCount;
                                itemComp.updateItem(newIndex, this._dataList[newIndex]);
                            }
                        }
                    } else {
                        if (this._eventSendTag.get(ListViewEvent.DATA_RUNOUT)) this._eventSendTag.set(ListViewEvent.DATA_RUNOUT, false);
                    }
                }
            }

            // 遍历数组，更新item的位置和显示
            if (repeatCount >= 2) updateItemList_h(repeatCount - 1);
            updateItemList_h(1);
            this._lastContentX = this._content.x;
        }
    }

    // 移至某索引item
    public scrollToItem(index: number, seconds?: number) {
        let itemPos = this._getPositionByIndex(index);
        let offset = cc.v2(0, 0);
        let maxOffset = this.scrollView.getMaxScrollOffset();
        if (this._direction == Direction.Vertical) {
            offset.y = Math.abs(itemPos.y) - (this._itemHeight + this.spacingY) / 2;
            if (offset.y > maxOffset.y) offset.y = maxOffset.y;
        } else {
            offset.x = Math.abs(itemPos.x) - (this._itemWidth + this.spacingX) / 2;
            if (offset.x > maxOffset.x) offset.x = maxOffset.x;
        }

        this.scrollView.scrollToOffset(offset, seconds);
    }

    /**
     * 追加数据，并重设content尺寸
     * @param list 不填则不会修改本对象记录数据列表，填了会重新赋值内部列表且不改动外部列表(
     * 因本对象记录数据列表为外部列表的浅拷贝，故建议该值不填写，以保同时刻只需维护一份列表数据，而不用内外不同列表保持同步)
     * 
     */
    public addDataList(list?: any[]) {
        if (!this._isReady) return false;   // 未初始化不允许追加
        if (list) this._dataList = this._dataList.concat(list);
        this._totalCount = this._dataList.length;

        let stepX = this._itemWidth + this.spacingX;
        let stepY = this._itemHeight + this.spacingY;
        if (this._direction == Direction.Vertical) {
            this._content.height = Math.ceil(this._totalCount / this.colNum) * stepY - this.spacingY + this.paddingTop + this.paddingBottom;
        } else {
            this._content.width = Math.ceil(this._totalCount / this.rowNum) * stepX - this.spacingX + this.paddingLeft + this.paddingRight;
        }

        return true;
    }

    // 获取数据列表
    public getDataList() {
        return this._dataList;
    }

    // 获取itemlist
    public getItemList() {
        return this._itemList;
    }

    // 获取数据总量
    public get totalCount() {
        return this._totalCount;
    }

    // 获取当前离边界最近的item索引
    public getLatelyIndex(): number {
        // 二分查找
        let bSearch = (low: number, high: number, target: number) => {
            if (low > high) return -1;
            var mid = Math.floor((low + high) / 2);
            var midPos = this._getPositionByIndex(mid);

            if (this._direction == Direction.Vertical) {
                if (low == high) {
                    return mid;
                } else if (Math.abs(midPos.y) > target) {
                    return bSearch(low, mid, target);
                } else {
                    return bSearch(mid + 1, high, target);
                }
            } else {
                if (low == high) {
                    return mid;
                } else if (Math.abs(midPos.x) > target) {
                    return bSearch(low, mid, target);
                } else {
                    return bSearch(mid + 1, high, target);
                }
            }
        }

        if (this._direction == Direction.Vertical) {
            return bSearch(0, this._totalCount - 1, Math.abs(this._content.y - this._content.parent.height / 2));
        } else {
            return bSearch(0, this._totalCount - 1, Math.abs(this._content.x + this._content.parent.width / 2));
        }
    }

    /**
     * 列表数据更新后手动刷新列表显示
     */
    public updateList() {
        this._updateContentWH();
        let itemList: cc.Node[] = this.getItemList();
        let len: number = itemList.length;
        for (let i = 0; i < len; i++) {
            let item: ListViewItem = itemList[i].getComponent(ListViewItem);
            let index: number = item.index;
            item.updateItem(index, this._dataList[index]);
        }
    }

    /**
     * 更新列表宽高
     */
    protected _updateContentWH() {
        this._totalCount = this._dataList.length;
        let stepX = this._itemWidth + this.spacingX;
        let stepY = this._itemHeight + this.spacingY;
        if (this._direction == Direction.Vertical) {
            this._content.height = Math.ceil(this._totalCount / this.colNum) * stepY - this.spacingY + this.paddingTop + this.paddingBottom;
        } else {
            this._content.width = Math.ceil(this._totalCount / this.rowNum) * stepX - this.spacingX + this.paddingLeft + this.paddingRight;
        }
    }
}


