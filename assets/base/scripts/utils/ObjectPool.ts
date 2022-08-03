/**
 * 对象池
 */
export default class ObjectPool {

    private static _list: any = {};

    /**
     * 存入对象池
     * @param key 标识
     * @param obj 对象
     */
    static put(key: string, obj: any) {
        if (!ObjectPool._list[key])
            ObjectPool._list[key] = [];

        ObjectPool._list[key].push(obj);
    }

    /**
     * 从对象池取出
     * @param key 标识
     */
    static get(key): any {
        if (ObjectPool._list[key]) {
            var list: any[] = ObjectPool._list[key];
            if (list.length > 0) {
                var obj: any = list.shift();
                return obj;
            }
        }
        return null;
    }

    /**
     * 清理
     * @param key 标识
     */
    static clear(key: string) {
        if (ObjectPool._list[key]) {
            ObjectPool._list[key] = undefined;
            delete ObjectPool._list[key];
        }
    }

    /**
     * 清理所有
     */
    static clearAll() {
        for (var key in ObjectPool._list) {
            ObjectPool._list[key] = undefined;
            delete ObjectPool._list[key];
        }
    }
}