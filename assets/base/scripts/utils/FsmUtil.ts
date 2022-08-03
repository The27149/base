/**
 * 状态机工具类
 */

import { IFsmInitObj, StateMachine } from "../common/StateMachine";

export class FsmUtil {

    // 获取状态机实例
    public static getFsmInstance(initObj: IFsmInitObj): StateMachine {
        return new StateMachine(initObj);
    }
}
