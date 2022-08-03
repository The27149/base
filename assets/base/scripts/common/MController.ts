import { game } from "../game";
import { ResLoader } from "../res/ResLoader";
import NodeUiConfig from "./NodeUiConfig";

const { ccclass, property, executeInEditMode } = cc._decorator;

/**
 * 控制器插件
 */
 @ccclass
 @executeInEditMode
 export default class MController extends cc.Component {
     // 模板需要记录跟踪的组件属性，附加默认值
     public static inheritedAttrList =
         {
             "cc.Node": {
                 "x": 0,
                 "y": 0,
                 "scaleX": 1,
                 "scaleY": 1,
                 "anchorX": 0.5,
                 "anchorY": 0.5,
                 "width": 100,
                 "height": 100,
                 "active": true,
                 "opacity": 255,
                 "color": {
                     "r": 255,
                     "g": 255,
                     "b": 255
                 },
                 "angle": 0
             },
             "cc.Label": {
                 "enabled": true,
                 "horizontalAlign": 1,
                 "verticalAlign": 1,
                 "overflow": 0,
                 "fontSize": 40
             },
             "cc.Widget": {
                 "isAlignBottom": true,
                 "isAlignLeft": true,
                 "isAlignRight": true,
                 "isAlignTop": true,
                 "isAlignHorizontalCenter": false,
                 "isAlignVerticalCenter": false,
                 "_isAbsBottom": true,
                 "_isAbsHorizontalCenter": true,
                 "_isAbsLeft": true,
                 "_isAbsRight": true,
                 "_isAbsTop": true,
                 "_isAbsVerticalCenter": true,
                 "top": 0,
                 "bottom": 0,
                 "left": 0,
                 "right": 0,
                 "horizontalCenter": 0,
                 "verticalCenter": 0,
                 "enabled": true,
             },
             "cc.Sprite": {
                 "enabled": true,
                 "spriteFrame": {}
             },
             "cc.Layout": {
                 "enabled": true,
                 "type": 0,
                 "resizeMode": 0,
                 "paddingBottom": 0,
                 "paddingLeft": 0,
                 "paddingRight": 0,
                 "paddingTop": 0,
                 "spacingX": 0,
                 "spacingY": 0,
                 "horizontalDirection": 0,
                 "verticalDirection": 1,
                 "startAxis": 0,
                 "affectedByScale": false
             },
             "cc.ScrollView": {
                 "enabled": true,
                 "horizontal": false,
                 "vertical": true,
                 "inertia": true,
                 "brake": 0.75,
                 "elastic": true,
                 "bounceDuration": 0.23
             },
             "cc.BoxCollider": {
                 "enabled": true,
                 "tag": 0,
                 "offset": {
                     "x": 0,
                     "y": 0
                 },
                 "size": {
                     "width": 100,
                     "height": 100
                 }
             },
             "cc.CircleCollider": {
                 "enabled": true,
                 "tag": 0,
                 "offset": {
                     "x": 0,
                     "y": 0
                 },
                 "radius": 100
             },
             "cc.PolygonCollider": {
                 "enabled": true,
                 "threshold": 1,
                 "tag": 0,
                 "offset": {
                     "x": 0,
                     "y": 0
                 },
                 "points": [
                     {
                         "x": -50,
                         "y": -50
                     },
                     {
                         "x": 50,
                         "y": -50
                     },
                     {
                         "x": 50,
                         "y": 50
                     },
                     {
                         "x": -50,
                         "y": 50
                     }
                 ]
             }
         }
 
     protected m_saveConfig: boolean = false;
     @property({
         tooltip: "编辑好页面之后，手动勾选一下保存配置，保存完毕会自动取消勾选"
     })
     get saveConfig() {
         return this.m_saveConfig;
     }
     set saveConfig(value) {
         this.updateConfig();
         Editor.info("配置保存完毕");
     }
 
     //以下有点小bug，暂时没找到解决方案，去掉动态修改
     // @property
     // private _stateCount: number = 2;
     // @property({
     //     tooltip: "选择控制器数量",
     //     min: 2,
     //     max: 10,
     //     step: 1
     // })
     // get stateCount() {
     //     return this._stateCount;
     // }
     // set stateCount(v: number) {
     //     this._stateCount = v;
     //     let obj = {};
     //     for (let i = 0; i < v; i++)
     //         obj["c_" + i] = i;
     //     this.setEnumAttr(this, 'stateIndex', cc.Enum(obj));
     //     Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
     // }
 
     // @property
     // protected _stateIndex = 0;
     // @property({
     //     tooltip: "选择控制器ID",
     //     type: cc.Enum({
     //         "c_0": 0,
     //         "c_1": 1,
     //     })
     // })
     // /**
     //  * 设置控制器ID
     //  */
     // get stateIndex() {
     //     return this._stateIndex;
     // }
     // set stateIndex(value: number) {
     //     if (this._stateIndex != value) {
     //         this._stateIndex = value;
     //         this.updateLayout();
     //     }
     // }
 
     @property
     protected _stateIndex = 0;
     @property({
         tooltip: "选择控制器ID",
         type: cc.Enum({
             "0": 0,
             "1": 1,
             "2": 2,
             "3": 3,
             "4": 4,
             "5": 5,
             "6": 6,
             "7": 7,
             "8": 8,
             "9": 9,
         })
     })
     /**
      * 设置控制器ID
      */
     get stateIndex() {
         return this._stateIndex;
     }
     set stateIndex(value: number) {
         if (this._stateIndex != value) {
             this._stateIndex = value;
             this.updateLayout();
         }
     }
 
     start() {
         // this.updateLayout();
     }
 
     private setEnumAttr(obj, propName, enumDef) {
         cc.Class['Attr'].setClassAttr(obj, propName, 'type', 'Enum');
         cc.Class['Attr'].setClassAttr(obj, propName, 'enumList', cc.Enum['getList'](enumDef));
     }
 
     protected readChildrenProp(node: cc.Node) {
         this.readNodeProp(node);
 
         if (node.childrenCount > 0) {
             var list = node.children;
             for (var i = 0; i < list.length; i++) {
                 var child = list[i];
                 this.readNodeProp(child);
                 if (child.childrenCount > 0)
                     this.readChildrenProp(child);
             }
         }
     }
 
     /**
      * 遍历读取属性
      * @param node 
      */
     protected readNodeProp(node: cc.Node) {
         var nodeUiConfig = node.getComponent(NodeUiConfig);
         if (!nodeUiConfig)
             return;
 
         var cfg = {};
         // var flag: boolean = false;
         for (var key in MController.inheritedAttrList) {
             var comp = node.getComponent(key);
             if (key == "cc.Node")
                 comp = node;
 
             if (!comp)
                 continue;
             cfg[key] = {};
 
             var attr = MController.inheritedAttrList[key];
             for (var prop in attr) {
                 if (comp[prop] == undefined)
                     continue;
                 if (prop != "spriteFrame") {
                     if (prop == "color") {
                         if (comp[prop].r != attr[prop].r || comp[prop].g != attr[prop].g || comp[prop].b != attr[prop].b) {
                             // flag = true;
                             cfg[key][prop] = {};
                             cfg[key][prop].r = comp[prop].r;
                             cfg[key][prop].g = comp[prop].g;
                             cfg[key][prop].b = comp[prop].b;
                         }
                     }
                     else if (prop == "offset") {
                         if (comp[prop].x != attr[prop].x || comp[prop].y != attr[prop].y) {
                             // flag = true;
                             cfg[key][prop] = {};
                             cfg[key][prop].x = comp[prop].x;
                             cfg[key][prop].y = comp[prop].y;
                         }
                     }
                     else if (prop == "size") {
                         if (comp[prop].width != attr[prop].width || comp[prop].height != attr[prop].height) {
                             // flag = true;
                             cfg[key][prop] = {};
                             cfg[key][prop].width = comp[prop].width;
                             cfg[key][prop].height = comp[prop].height;
                         }
                     }
                     else if (prop == "points") {
                         var pflg: boolean = false;
                         var plist = comp[prop];
                         if (comp[prop].length != attr[prop].length)
                             pflg = true;
                         else {
                             for (var i = 0; i < plist.length; i++) {
                                 if (plist[i].x != attr[prop][i].x || plist[i].y != attr[prop][i].y) {
                                     pflg = true;
                                     break;
                                 }
                             }
                         }
 
                         if (pflg) {
                             // flag = true;
                             cfg[key][prop] = [];
                             for (var i = 0; i < plist.length; i++) {
                                 var pv = {};
                                 pv['x'] = plist[i].x;
                                 pv['y'] = plist[i].y;
                                 cfg[key][prop].push(pv);
                             }
                         }
                     }
                     else {
                         if (prop == "width" || prop == "height") {
                             if (!nodeUiConfig.controlSize)
                                 continue;
                         }
                         if (comp[prop] != attr[prop]) {
                             // flag = true;
                             cfg[key][prop] = comp[prop];
                         }
                     }
                 }
                 else {
                     if (!nodeUiConfig.controlSpriteFrame)
                         continue;
                     if (comp[prop]) {
                         // flag = true;
                         var sobj = {};
                         sobj['uuid'] = comp[prop]._uuid;
                         sobj['bundle'] = Editor.remote.assetdb.uuidToUrl(comp[prop]._uuid);
                         sobj['bundle'] = sobj['bundle'].replace('db://assets/', "");
                         sobj['bundle'] = sobj['bundle'].substring(0, sobj['bundle'].indexOf('/'));
                         // Editor.info(sobj['bundle']);
                         cfg[key][prop] = sobj;
                     }
                 }
             };
         }
         // if (flag) {
         var obj = JSON.parse(nodeUiConfig.ui_config);
         obj[this._stateIndex] = cfg;
         nodeUiConfig.ui_config = JSON.stringify(obj);
         // }
     }
 
     /**
      * 遍历设置属性
      */
     protected setChildrenProp(node: cc.Node) {
         var nodeUiConfig: NodeUiConfig = node.getComponent(NodeUiConfig);
         if (nodeUiConfig) {
             var obj = JSON.parse(nodeUiConfig.ui_config);
             if (obj[this._stateIndex]) {
                 var cfgObj = obj[this._stateIndex];
                 for (var key in MController.inheritedAttrList) {
                     var comp = node.getComponent(key);
                     if (key == "cc.Node") {
                         comp = node;
                         var widgetComp = node.getComponent(cc.Widget);
                         if (widgetComp) {
                             //如果有cc.Widget则先干掉widget组件
                             node.removeComponent(widgetComp);
                         }
                         for (var prop in MController.inheritedAttrList[key]) {
                             if (prop != "color") {
                                 if (prop == "active") {
                                     //跳过控制active
                                     if (!nodeUiConfig.controlActive)
                                         continue;
                                 }
                                 else if (prop == "width" || prop == "height") {
                                     //跳过控制size
                                     if (!nodeUiConfig.controlSize)
                                         continue;
                                 }
 
                                 var nattr;
                                 if (cfgObj && cfgObj[key] != undefined && cfgObj[key][prop] != undefined)
                                     nattr = cfgObj[key][prop];
                                 else
                                     nattr = MController.inheritedAttrList[key][prop];
 
                                 if (comp[prop] != nattr)
                                     comp[prop] = nattr;
                             }
                             else {
                                 //color特殊处理
                                 var color;
                                 if (cfgObj && cfgObj[key] != undefined && cfgObj[key][prop] != undefined)
                                     color = cfgObj[key][prop];
                                 else
                                     color = MController.inheritedAttrList[key][prop];
 
                                 if (comp[prop].r != color.r || comp[prop].g != color.g || comp[prop].b != color.b)
                                     comp[prop] = cc.color(color.r, color.g, color.b);
                             }
                         }
                     }
                     else {
                         if (key != "cc.Widget") {
                             if (!comp)
                                 continue;
 
                             for (const prop in MController.inheritedAttrList[key]) {
                                 if (prop == "spriteFrame") {
                                     if (!nodeUiConfig.controlSpriteFrame)
                                         continue;
                                     //spriteFrame特殊处理
                                     if (!cfgObj || !cfgObj[key])
                                         continue;
                                     var sobj = cfgObj[key][prop];
                                     if (!sobj)
                                         continue;
                                     if (!window['Editor'])
                                         this.changeSpriteFrame(comp, sobj);
                                     else {
                                         // 编辑器环境 修改图片
                                         var uuid;
                                         // Editor.info(sobj);
                                         if (typeof sobj != "string")
                                             uuid = sobj.uuid;
                                         else
                                             uuid = sobj;
                                         if (this.isExistFileByUuid(uuid)) {
                                             Editor.Ipc.sendToPanel('scene', 'scene:set-property', {
                                                 id: comp.uuid,
                                                 path: "spriteFrame",//要修改的属性
                                                 type: "cc.SpriteFrame",
                                                 value: { uuid: uuid },
                                                 isSubProp: false,
                                             });
                                         }
                                     }
                                 }
                                 else if (prop == "offset") {
                                     var offset;
                                     if (cfgObj && cfgObj[key] != undefined && cfgObj[key][prop] != undefined)
                                         offset = cfgObj[key][prop];
                                     else
                                         offset = MController.inheritedAttrList[key][prop];
 
                                     if (comp[prop].x != offset.x || comp[prop].y != offset.y)
                                         comp[prop] = cc.v2(offset.x, offset.y);
                                 }
                                 else if (prop == "size") {
                                     var size;
                                     if (cfgObj && cfgObj[key] != undefined && cfgObj[key][prop] != undefined)
                                         size = cfgObj[key][prop];
                                     else
                                         size = MController.inheritedAttrList[key][prop];
 
                                     if (comp[prop].width != size.width || comp[prop].height != size.height)
                                         comp[prop] = cc.size(size.width, size.height);
                                 }
                                 else if (prop == "points") {
                                     var pflg: boolean = false;
                                     var plist;
                                     if (cfgObj && cfgObj[key] != undefined && cfgObj[key][prop] != undefined)
                                         plist = cfgObj[key][prop];
                                     else
                                         plist = MController.inheritedAttrList[key][prop];
 
                                     if (plist.length != comp[prop].length)
                                         pflg = true;
                                     else {
                                         for (var i = 0; i < plist.length; i++) {
                                             if (comp[prop][i].x != plist[i].x || comp[prop][i].y != plist[i].y) {
                                                 pflg = true;
                                                 break;
                                             }
                                         }
                                     }
                                     if (pflg) {
                                         var points = [];
                                         for (var i = 0; i < plist.length; i++)
                                             points.push(cc.v2(plist[i].x, plist[i].y));
                                         comp[prop] = points;
                                     }
                                 }
                                 else {
                                     var nattr;
                                     if (cfgObj && cfgObj[key] != undefined && cfgObj[key][prop] != undefined)
                                         nattr = cfgObj[key][prop];
                                     else
                                         nattr = MController.inheritedAttrList[key][prop];
 
                                     if (comp[prop] != nattr)
                                         comp[prop] = nattr;
                                 }
                             }
 
                             if (key == "cc.Layout") {
                                 // 特殊处理,属性设置完成后调用
                                 if (comp.enabled) {
                                     if (!window['Editor'])// 运行环境下设置 cc.Layout 后立即刷新
                                         comp.updateLayout();
 
                                     this.resetLayoutChildPosition(node);
                                 }
                             }
                         }
                         else {
                             if (cfgObj[key] != undefined)
                                 this.delaySetWidget(node, cfgObj);
                         }
                     }
                 }
             }
         }
 
         if (node.childrenCount > 0) {
             var list = node.children;
             for (var i = 0; i < list.length; i++)
                 this.setChildrenProp(list[i]);
         }
     }
 
     protected changeSpriteFrame(comp: cc.Sprite, sobj) {
         // 运行环境 修改图片
         var uuid: string, bundleName: string;
         if (typeof sobj != "string") {
             uuid = sobj.uuid;
             bundleName = sobj.bundle;
         }
         else
             uuid = sobj;
 
         if (!bundleName)
             return;
 
         var bundle = cc.assetManager.getBundle(bundleName);
         let path = bundle["_config"].assetInfos._map[uuid].path;
         if (!bundle || !path)
             return;
         comp.spriteFrame = null;
         ResLoader.getInstance().loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
             if (!err) {
                 comp.spriteFrame = spriteFrame;
             }
         }, bundleName, "configkey");
     }
 
     protected delaySetWidget(node: cc.Node, cfgObj) {
         setTimeout(() => {
             var comp = node.addComponent(cc.Widget);
             var key = "cc.Widget";
             comp.enabled = false;
             for (const prop in MController.inheritedAttrList[key]) {
                 var nattr;
                 if (cfgObj && cfgObj[key] != undefined && cfgObj[key][prop] != undefined)
                     nattr = cfgObj[key][prop];
                 else
                     nattr = MController.inheritedAttrList[key][prop];
 
                 if (comp[prop] != nattr)
                     comp[prop] = nattr;
             }
             if (!window['Editor'] && comp.enabled)// 运行环境下设置 cc.Widget 后立即刷新
                 comp.updateAlignment();
         }, 30);
     }
 
     protected resetLayoutChildPosition(node: cc.Node) {
         var layoutComp: cc.Layout = node.getComponent(cc.Layout);
         if (layoutComp.type != cc.Layout.Type.HORIZONTAL && layoutComp.type != cc.Layout.Type.VERTICAL)
             return;
         for (var i = 0; i < node.childrenCount; i++) {
             var child = node.children[i];
             if (layoutComp.type == cc.Layout.Type.HORIZONTAL)
                 child.y = 0;
             else if (layoutComp.type == cc.Layout.Type.VERTICAL)
                 child.x = 0;
         }
     }
 
     /**
      * 更新配置
      */
     protected updateConfig() {
         this.readChildrenProp(this.node);
     }
 
     /**
      * 更新页面布局
      */
     protected updateLayout() {
         this.setChildrenProp(this.node);
     }
 
     // 是否存在文件
     protected isExistFileByUuid(uuid) {
         let absP = Editor.remote.assetdb.uuidToFspath(uuid)
         if (!absP) return false;
 
         let p;
         let s_ind = absP.lastIndexOf('.');
         if (s_ind != -1) {
             let e_ind = absP.indexOf('/', s_ind)
             if (e_ind != -1)
                 p = absP.substr(0, e_ind)
             else
                 p = absP;
         }
 
         return p ? Editor.remote.assetdb.existsByPath(p) : false
     }
 }