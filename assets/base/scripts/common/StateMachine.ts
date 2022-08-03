/**
 * 状态机（借鉴仓库 https://github.com/jakesgordon/javascript-state-machine，接口用法与其基本保持一致，可参考其使用文档）
 * 
 * 1. 生命周期事件顺序：onBeforeTransition - onBefore<TRANSITION> - onLeaveState - onLeave<STATE> - onTransition - onEnterState - 
 *                      onEnter<STATE> - on<STATE> - onAfterTransition - onAfter<TRANSITION> - on<TRANSITION>
 * 2. 生命周期详细介绍（https://github.com/jakesgordon/javascript-state-machine/blob/master/docs/lifecycle-events.md）
 * 3. 执行带参构造或 initFsm() 后，对象才能正常使用
 * 4. 虽然提供了动态增删【状态、转换、事件监听】（configureTransitions, configureMethods, delTransitions, delMethods, delStates），
 *    但更建议使用new StateMachine() 或 initFsm() 接口在一开始设置好【状态、转换、事件监听】
 * 
 */

import { ComUtils } from "../utils/ComUtils";

// 状态机默认值
const fsm_defaults = {
    wildcard: "*",
    init: {
      name: 'init',
      from: 'none'
    },
}
export type FsmEventCallbacks = { [lifecycleEvent: string]: Function };

export interface IFsmTransition {
    name?: string,
    from?: string | string[],
    to?: string | Function
}

export interface IFsmInitObj {
    init?: string,
    transitions?: IFsmTransition[],
    methods?: FsmEventCallbacks,
}

export interface IFsmLifecycleEvents {
    onBefore?: { [transition: string]: string },
    onAfter?:  { [transition: string]: string },
    onEnter?:  { [state: string]: string },
    onLeave?:  { [state: string]: string },
    on?:       { [key: string]: string },
}

export interface IFsmTransitArgs {
    transition?: string,
    from?: string,
    to?: string,
    fsm?: StateMachine,
    event?: string
}

export class StateMachine {
    private _state: string = fsm_defaults.init.from;    // 当前状态
    private _pending: boolean = false;                  // 状态转换中，挂起
    private _states: string[] = [];                     // 全部状态名
    private _transitions: string[] = [];                // 全部转换名
    private _lifecycleEvents: IFsmLifecycleEvents = {}; // 生命周期事件名
    private _eventCallbacks: FsmEventCallbacks = {};    // 生命周期事件回调
    private _map: { [state: string]: { [transition: string]: IFsmTransition } } = {};
    public constructor(param?: IFsmInitObj) {
        if (param) this.initFsm(param);
    }

    // 重置状态机
    private _resetFsm() {
        this._state = fsm_defaults.init.from;
        this._pending = false;
        this._states = [];
        this._transitions = [];
        this._lifecycleEvents = {};
        this._eventCallbacks = {};
        this._map = {};
        this._map[fsm_defaults.wildcard] = {};
    }

    // 初始化状态机
    public initFsm(param: IFsmInitObj) {
        this._resetFsm();
        this._configureLifecycle();
        let initTransition = this._configureInitTransition(param.init);
        this.configureTransitions(param.transitions);
        this.configureMethods(param.methods);
        if (param.init) this._fire(initTransition.name!, []);
    }
    
    public get state() { return this._state; }                          // 当前状态
    public allStates() { return this._states; }                         // 全部状态
    public transitions() { return this._transitionsFor(this._state); }  // 当前状态全部可执行转换
    public allTransitions() { return this._transitions; }               // 全部转换名
    public isPending() { return this._pending; }                        // 是否转换中
    // 当前是否处于某状态或某组状态中
    public is(state: string | string[]) {
        return Array.isArray(state) ? (state.indexOf(this.state) >= 0) : (this.state === state);
    }
    // 是否可以转换
    public can(transition: string) {
        return !this.isPending() && !!this._seek(transition);
    }
    // 是否禁止转换
    public cannot(transition: string) {
        return !this.can(transition);
    }

    // 获取转换配置
    private _transitionFor(state: string, transition: string): IFsmTransition | null {
        let wildcard = fsm_defaults.wildcard;
        return this._map[state][transition] || this._map[wildcard][transition];
    }

    // 获取指定状态所有可执行转换名
    private _transitionsFor(state: string): string[] {
        let wildcard = fsm_defaults.wildcard;
        return Object.keys(this._map[state]).concat(Object.keys(this._map[wildcard]));
    }

    // 添加状态
    private _addState(name: string) {
        if (!this._map[name]) {
            this._states.push(name);
            this._addStateLifecycleNames(name);
            this._map[name] = {};
        }
    }

    // 删除状态
    private _delState(name: string, force: boolean = false) {
        let wildcard = fsm_defaults.wildcard
        if (name == wildcard) return false;
        let transitions = this._transitionsFor(name);
        let canDel = (force || transitions.length <= 0) ? true : false;

        if (canDel) {
            let index = this._states.indexOf(name);
            index >= 0 && this._states.splice(index, 1);
            this._delStateLifecycleNames(name);
            delete this._map[name];

            for (let i = 0, len = transitions.length; i < len; ++i) {
                this._delTransition(transitions[i]);   // 尝试删除该状态下的 transition
            }
            return true;
        }

        return true;
    }

    // 删除一组状态
    public delStates(names: string[], force: boolean = false) {
        if (this.isPending()) return false;
        for (let i = 0, len = names.length; i < len; ++i) {
            this._delState(names[i], force);
        }
        return true;
    }

    // 添加生命周期名 - 状态相关
    private _addStateLifecycleNames(name: string) {
        this._lifecycleEvents.onEnter![name] = ComUtils.camelize_prefix('onEnter', name);
        this._lifecycleEvents.onLeave![name] = ComUtils.camelize_prefix('onLeave', name);
        this._lifecycleEvents.on![name]      = ComUtils.camelize_prefix('on',      name);
    }

    // 删除生命周期名 - 状态相关
    private _delStateLifecycleNames(name: string) {
        delete this._lifecycleEvents.onEnter![name];
        delete this._lifecycleEvents.onLeave![name];
        delete this._lifecycleEvents.on![name];
    }

    // 添加转换
    private _addTransition(name: string) {
        if (this._transitions.indexOf(name) < 0) {
            this._transitions.push(name);
            this._addTransitionLifecycleNames(name);
        }
    }

    // 删除转换
    private _delTransition(name: string, force: boolean = false) {
        let canDel = true;
        if (!force) {
            for (let key_name in this._map) {
                let map_from = this._map[key_name];
                if (map_from[name]) {
                    canDel = false;
                    break;
                }
            }
        }

        if (canDel) {
            let index = this._transitions.indexOf(name);
            index >= 0 && this._transitions.splice(index, 1);
            this._delTransitionLifecycleNames(name);
            return true;
        }
        return false;
    }

    // 添加生命周期名 - 转换相关
    private _addTransitionLifecycleNames(name: string) {
        this._lifecycleEvents.onBefore![name] = ComUtils.camelize_prefix('onBefore', name);
        this._lifecycleEvents.onAfter![name]  = ComUtils.camelize_prefix('onAfter',  name);
        this._lifecycleEvents.on![name]       = ComUtils.camelize_prefix('on',       name);
    }

    // 删除生命周期名 - 转换相关
    private _delTransitionLifecycleNames(name: string) {
        delete this._lifecycleEvents.onBefore![name];
        delete this._lifecycleEvents.onAfter![name];
        delete this._lifecycleEvents.on![name];
    }

    // 配置单条转换信息
    private _mapTransition(transition: IFsmTransition) {
        var name = transition.name as string,
            from = transition.from as string,
            to   = transition.to;
        this._addState(from);
        if (typeof to !== 'function') this._addState(to!);
        this._addTransition(name);
        this._map[from][name] = transition;
        return transition;
    }

    // 删除单条转换信息(name 及 from 均相等，则认为是待删除 transition)
    private _mapTransition_del(transition: IFsmTransition) {
        let name = transition.name as string,
            from = transition.from as string;

        // 如果 from == wildcard，删除所有 state 关联transition
        // var wildcard = this.defaults.wildcard;
        // if (from == wildcard) {
        //   for (let key_name in this._map) {
        //     let map_from = this._map[key_name];
        //     if (map_from[name]) delete map_from[name];
        //   }
        // } else {
        //   let map_from = this._map[from];
        //   if (map_from) delete map_from[name];
        // }

        // 只对 from 精确匹配删除关联transition
        let map_from = this._map[from];
        if (map_from) delete map_from[name];

        this._delTransition(name);
        this._delState(from);
        return transition;
    }

    // 配置通用生命周期名
    private _configureLifecycle() {
        this._lifecycleEvents = {
          onBefore: { transition: 'onBeforeTransition' },
          onAfter:  { transition: 'onAfterTransition'  },
          onEnter:  { state:      'onEnterState'       },
          onLeave:  { state:      'onLeaveState'       },
          on:       { transition: 'onTransition'       },
        };
    }

    // 配置初始化转换信息
    private _configureInitTransition(init?: string | IFsmTransition): IFsmTransition {
        let transition: IFsmTransition = {};
        if (typeof init === "string") {
            transition = this._mapTransition({ name: 'init', from: fsm_defaults.init.from, to: init })
        } else if (typeof init === "object") {
            transition = this._mapTransition(init);
        } else {
            this._addState(fsm_defaults.init.from);
            transition = fsm_defaults.init;
        }

        return transition;
    }

    // 配置多条转换信息(新的增加，重复的替换)
    public configureTransitions(transitions?: IFsmTransition[]) {
        if (!transitions || this.isPending()) return false;
        var i, n, transition, from, to, wildcard = fsm_defaults.wildcard;
        for(n = 0 ; n < transitions.length ; n++) {
            transition = transitions[n];
            from = Array.isArray(transition.from) ? transition.from : [transition.from || wildcard];
            to = transition.to || wildcard;
            for(i = 0 ; i < from.length ; i++) {
                this._mapTransition({ name: transition.name, from: from[i], to: to });
            }
        }
        return true;
    }

    // 删除多条转换信息(转换中该操作不会生效,name 及 from 均相等，则认为是待删除 transition)
    public delTransitions(transitions: IFsmTransition[]) {
        if (this.isPending()) return false;
        var i, n, transition, from, to, wildcard = fsm_defaults.wildcard;
        for(n = 0 ; n < transitions.length ; n++) {
            transition = transitions[n];
            from = Array.isArray(transition.from) ? transition.from : [transition.from || wildcard];
            to = transition.to || wildcard;
            for(i = 0 ; i < from.length ; i++) {
                this._mapTransition_del({ name: transition.name, from: from[i], to: to });
            }
        }
        return true;
    }

    // 配置事件回调监听(新的增加，重复的替换)
    public configureMethods(methods?: FsmEventCallbacks) {
        if (!methods || this.isPending()) return false;
        for (let event in methods) {
            this._eventCallbacks[event] = methods[event];
        }
        return true;
    }

    // 删除事件回调监听(转换中该操作不会生效)
    public delMethods(methods: string[]) {
        if (this.isPending()) return false;
        for (let i = 0, len = methods.length; i < len; ++i) {
            delete this._eventCallbacks[methods[i]];
        }
        return true;
    }

    private _seek(transition: string, args?: any[]) {
        let wildcard = fsm_defaults.wildcard,
            entry    = this._transitionFor(this.state, transition),
            to       = entry && entry.to;
        if (typeof to === 'function')
            if (args) {
                return to(...args);
            } else {
                return to();
            }
        else if (to === wildcard)
            return this.state
        else
            return to
    }

    /**
     * 触发转换
     * @param transition 转换名
     * @param args 必填，即使是空数组
     * @returns 
     */
    private _fire(transition: string, args: any[]) {
        return this._transit(transition, this.state, this._seek(transition, args), args);
    }

    /**
     * 执行转换
     * @param transition 转换名
     * @param from 起始状态
     * @param to 终止状态
     * @param args 必填，即使是空数组
     */
    private _transit(transition: string, from: string, to: string, args: any[]) {
        let lifecycle = this._lifecycleEvents,
            changed   = (from !== to);

        if (!to) return this.onInvalidTransition(transition, from, to);

        if (this.isPending()) return this.onPendingTransition(transition, from, to);

        this._addState(to);  // might need to add this state if it's unknown (e.g. conditional transition or goto)

        this._beginTransit();

        args.unshift({             // this context will be passed to each lifecycle event observer
            transition: transition,
            from:       from,
            to:         to,
            fsm:        this,
        });

        return this._observeEvents([
                    lifecycle.onBefore!.transition,
                    lifecycle.onBefore![transition],
            changed ? lifecycle.onLeave!.state : null,
            changed ? lifecycle.onLeave![from] : null,
                    lifecycle.on!.transition,
            changed ? 'doTransit' : null,
            changed ? lifecycle.onEnter!.state : null,
            changed ? lifecycle.onEnter![to]   : null,
            changed ? lifecycle.on![to]        : null,
                    lifecycle.onAfter!.transition,
                    lifecycle.onAfter![transition],
                    lifecycle.on![transition]
        ], args);
    }

    // 注册生命周期事件监听回调
    public observe(lifecycleEvent: string, callback: Function): void;
    public observe(methods: FsmEventCallbacks): void;
    public observe(...args: any[]) {
        if (args.length === 2) {
            this._eventCallbacks[args[0]] = args[1];
        }
        else {
            for (let event in args[0]) {
                this._eventCallbacks[event] = args[0][event];
            }
        }
    }

    // 观察事件
    private _observeEvents(events: any[], args: any[], previousEvent?: string, previousResult?: boolean): any {
        if (events.length === 0) {
          return this._endTransit(previousResult === undefined ? true : previousResult);
        }

        let event = events.shift(), result: any = null;
        args[0].event = event;
        if ('doTransit' == event) {
            result = this._doTransit(args[0]);
        } else {
            if (this._eventCallbacks[event]) result = this._eventCallbacks[event](...args);
        }
        if (result && typeof result.then === 'function') {
            return result.then(this._observeEvents.bind(this, events, args, event))
                        .catch(this._failTransit.bind(this))
        } else if (result === false) {
            return this._endTransit(false);
        } else {
            return this._observeEvents(events, args, event, result);
        }
    }

    private _beginTransit()                         { this._pending = true;                 }
    private _endTransit(result: any)                { this._pending = false; return result; }
    private _failTransit(result: any)               { this._pending = false; throw result;  }
    private _doTransit(lifecycle: IFsmTransitArgs)  { this._state = lifecycle.to!;          }

    // 无效转换
    public onInvalidTransition(transition: string, from: string, to: string) {
        if (this._eventCallbacks.onInvalidTransition) {
            this._eventCallbacks.onInvalidTransition(transition, from, to);
        } else {
            console.error("transition is invalid in current state - ", transition, from, to, this._state);
        }
    }
    
    // 转换进行中
    public onPendingTransition(transition: string, from: string, to: string) {
        if (this._eventCallbacks.onPendingTransition) {
            this._eventCallbacks.onPendingTransition(transition, from, to);
        } else {
            console.warn("transition is invalid while previous transition is still in progress - ", transition, from, to, this._state);
        }
    }

    /**
     * 执行转换
     * @param transition 转换名
     * @param args 可选参数
     * @returns 
     */
    public execTransit(transition: string, ...args: any[]) {
        return this._fire(transition, args || []);
    }
}