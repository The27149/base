const { ccclass, property } = cc._decorator;

@ccclass
export default class StarScene extends cc.Component {
    gameconfig = null;
    @property
    curGameId: string = "";

    gamebundle: string = "";
    curGameType: string = "";
    gamebundleVer: string = null;
    bundleVers = {};
    waiteNode: cc.Node = null;
    timeoutId: number = 0;
    commonbundleVer: string = null;
    gameImgBundle: string = ""
    is2Ver: boolean = false;

    onLoad() {
        //转圈动画展示
        this.rotationNode();
        let url = game.ComUtils.getUrl();
        if (url.indexOf("game_id") > -1) {
            // 线上版本动态获取
            this.curGameId = base64.decode(game.ComUtils.getUrlParam(url, 'game_id'));
        } else if (this.curGameId == "" && window["gameConfig"].gameID) {
            this.curGameId = window["gameConfig"].gameID;
        }
        //获取游戏版本管理,如果发布后的在main.js 会获取到游戏版本管理后台的控制的游戏id.(这里是真实游戏id，无需转化)
        let ver = window["gameConfig"].bundleUrls["game_" + this.curGameId];
        //不是远端而且本地没有配置游戏版本，那么默认1.0.0
        if (!ver) {
            this.is2Ver = false;
        } else {
            this.is2Ver = Number(ver.slice(0, 3)) >= 2;
        }
        //转化游戏id 成对应的bundle，多个游戏id对应相同的游戏工程项目
        this.gamebundle = "game_" + game.ComUtils.convertGameId(this.curGameId);

        this.curGameType = this.getgameType(this.curGameId);
        game.Global.gameId = Number(this.curGameId);
        game.Global.gameType = this.curGameType;
        game.Global.clientGameId = Number(game.ComUtils.convertGameId(this.curGameId));

        this.initGameBundel();

        //初始化
        this.intoGame();

        if (cc.sys.isBrowser && document.referrer && document.referrer.indexOf('start/index.html') > 0) {
            //阻止浏览器后退
            cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.stopHistoryBack.bind(this));
        }
    }

    private stopHistoryBack() {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
        cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_START, this.stopHistoryBack);
    }

    initGameBundel() {
        let url = game.ComUtils.getUrl();
        let memoryCount = 3;
        if (url.indexOf("api_game") > -1) {
            // 线上版本动态获取
            let memory = game.ComUtils.getUrlParam(url, 'memory');
            if (memory) {
                let memoryCountSrt = base64.decode(memory);
                let strMemory = memoryCountSrt.slice(0, 1);
                if (strMemory && Number(strMemory) != NaN) {
                    memoryCount = Number(strMemory);
                }
            }
        }
        let gameImgBundle = this.gamebundle;
        if (this.is2Ver) {
            if (memoryCount <= 2) {
                gameImgBundle = this.gamebundle + "_960";
            }
        }
        this.gameImgBundle = gameImgBundle;
        window["curGamebundle"] = gameImgBundle;
    }

    /**
     * 进入子游戏配置和子游戏bundle，然后添加子游戏的层
     */
    async intoGame(): Promise<any> {
        game.EventManager.getInstance().addEventListener("removeStartLoading", this.gameRemoveLoading, this);
        game.EventManager.getInstance().addEventListener("removeWaitNode", this.removeWaitNode, this);
        await this.loadAllVer();
        window["splashDisplay"] && window["splashDisplay"].progressAddPercent(4);
        await this.loadAllBundleAndProtojs();
        window["splashDisplay"] && window["splashDisplay"].progressAddPercent(4);
        await this.baseInit();
        window["splashDisplay"] && window["splashDisplay"].progressAddPercent();
        await this.coreInit();
        window["splashDisplay"] && window["splashDisplay"].progressAddPercent();
        await this.addGamePrefab();
        window["splashDisplay"] && window["splashDisplay"].progressAddPercent(2);
        this.autoRemoveLoading();
        //移除转圈
        setTimeout(() => {
            this.removeWaitNode();
        }, 10000);
    }

    async baseInit(): Promise<any> {
        return new Promise((resolve, reject) => {
            (new window['game'].Main()).init(resolve, reject);
        });
    }

    async coreInit(): Promise<any> {
        return new Promise((resolve, reject) => {
            (new window['core'].GameCore()).init(resolve, reject);
        });
    }

    /**
     * 离开游戏 并且卸载bundle
     */
    async leaveGame(): Promise<any> {
        game.ResLoader.getInstance().releaseAll(this.gameImgBundle);
        this.is2Ver && game.ResLoader.getInstance().releaseAll(this.gamebundle + "_common");

        let game_bundle = cc.assetManager.getBundle(this.gameImgBundle);
        if (game_bundle) {
            game_bundle.releaseAll();
        }
        let game_bundleCommon = cc.assetManager.getBundle(this.gamebundle + "_common");
        if (game_bundleCommon) {
            game_bundleCommon.releaseAll();
        }
    }

    // 加载base库
    async loadBaseBundle(): Promise<any> {
        let bundleName = 'base';
        let type = window["gameConfig"].gameType;
        let path = window["getOtherBundleUrl"](bundleName);
        let options = { version: this.bundleVers[bundleName] };
        if (type == 'base') {
            path = bundleName;
            options = null;
        }
        if (cc.sys.isNative || type == 'base' || type == 'game_core') {
            return new Promise((resolve, reject) => {
                cc.assetManager.loadBundle(path, options, (err, bundle) => {
                    if (!err) {
                        console.log("加载base库完成");
                        resolve(null);
                    } else {
                        reject(null);
                    }
                });
            });
        } else {
            return Promise.resolve();
        }
    }

    // 加载game_core库
    async loadCoreBundle(): Promise<any> {
        let bundleName = 'game_core';
        let type = window["gameConfig"].gameType;
        let path = window["getOtherBundleUrl"](bundleName);
        let options = { version: this.bundleVers[bundleName] };
        if (type == 'game_core') {
            path = bundleName;
            options = null;
        }
        if (cc.sys.isNative || type == 'base' || type == 'game_core') {
            return new Promise((resolve, reject) => {
                cc.assetManager.loadBundle(path, options, (err, bundle) => {
                    if (!err) {
                        console.log("加载game_core库完成");
                        resolve(null);
                    } else {
                        reject(null);
                    }
                });
            });
        } else {
            return Promise.resolve();
        }
    }

    /**
     * 加载子模块 公共库
     */
    async loadSubLibBundle(): Promise<string> {
        let httpdir = window["getOtherBundleUrl"](this.curGameType);
        let options = { version: this.bundleVers[this.curGameType] };
        var type = window["gameConfig"].gameType;
        if (type == 'slotLib' || type == 'hunterLib' || type == 'arcadeLib') {
            httpdir = this.curGameType;
            options = null;
        }
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(httpdir, options, (err, bundle) => {
                if (!err) {
                    console.log("加载子公共库完成");
                    resolve(null);
                } else {
                    reject(null);
                }
            });
        });
    }

    /**
     * 加载子游戏common bundle
    */
    async loadCommonBundle(): Promise<any> {
        if (!this.is2Ver) { //非2.0版本以上return
            return Promise.resolve();
        }
        //本地调试模式下 ，如果是 子游戏项目本身 ，不需要加载远端的
        var type = window["gameConfig"].gameType;
        if (type == "slot" || type == "hunter" || type == "arcade") {
            let game_common = this.gamebundle + "_common";
            return new Promise((resolve, reject) => {
                cc.assetManager.loadBundle(game_common, (err, bundle) => {
                    if (!err) {
                        console.log("加载子游戏bundle完成");
                        resolve(null);
                    } else {
                        reject();
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                let commonbundle = window["getGameBundleUrl"](this.gamebundle, null, true);
                cc.assetManager.loadBundle(commonbundle, { version: this.commonbundleVer }, (err, bundle) => {
                    if (!err) {
                        console.log("加载commonbundle完成");
                        resolve(null);
                    } else {
                        reject(null);
                    }
                });
            });
        }
    }

    /**
    * 加载commonConfig配置
    */
    async loadCommonBundleConfig(): Promise<void> {
        if (!this.is2Ver) { //非2.0版本以上return
            return Promise.resolve();
        }
        let self = this;
        //本地调试模式下  ，如果是 子游戏项目本身 ，不需要加载远端的
        var type = window["gameConfig"].gameType;
        if (type == "slot" || type == "hunter" || type == "arcade") {
            return new Promise((resolve, reject) => {
                resolve();
            });
        } else {
            return new Promise((resolve, reject) => {
                let httpgamebundle = window["getGameBundleUrl"](this.gamebundle, null, true) + "/bundleVer.json?ver=" + new Date().getTime();
                let reqinfo: game.IReqInfo = {
                    url: httpgamebundle,
                    method: "GET",
                    failCb: () => {
                        reject("http请求子游戏CommonBundle 失败");
                    },
                    successCb: (_xhr, baseinfo) => {
                        try {
                            let responseObj = JSON.parse(_xhr.responseText);
                            self.commonbundleVer = responseObj.version;
                            resolve();
                        } catch (error) {
                            console.error("http请求解析错误");
                            reject("http请求子游戏CommonBundle解析错误");
                        }
                    },
                    needSign: false,
                    isAutoRetry: false,
                }
                let http = game.HttpRequest.getInstance();
                http.send(reqinfo);
            });
        }
    }

    /**
     * 加载子游戏bundle
     */
    async loadGameBundle(): Promise<string> {
        //本地调试模式下  ，如果是 子游戏项目本身 ，不需要加载远端的
        var type = window["gameConfig"].gameType;
        if (type == "slot" || type == "hunter" || type == "arcade") {
            let httpgamebundle = this.is2Ver ? this.gameImgBundle : this.gamebundle;
            return new Promise((resolve, reject) => {
                cc.assetManager.loadBundle(httpgamebundle, (err, bundle) => {
                    if (!err) {
                        console.log("加载 game bundle完成");
                        resolve(null);
                    } else {
                        reject();
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                let gamebundleType = this.is2Ver ? this.gameImgBundle : "";
                let httpgamebundle = window["getGameBundleUrl"](this.gamebundle, gamebundleType);
                cc.assetManager.loadBundle(httpgamebundle, { version: this.bundleVers[this.gameImgBundle] }, (err, bundle) => {
                    if (!err) {
                        console.log("加载 game bundle完成");
                        resolve(null);
                    } else {
                        reject(null);
                    }
                });
            });
        }
    }

    /**
     * 加载游戏节点
     */
    async addGamePrefab(): Promise<string> {
        console.log("添加子游戏节点");
        return new Promise((resolve, reject) => {
            game.ResLoader.getInstance().loadRes("main", cc.Prefab
                , (finish: number, total: number, item: any) => {
                    // let per = Math.floor((finish / total) * 3);
                    // window["splashDisplay"].progressAddPercent(per);
                }, (err, prefab: cc.Prefab) => {
                    if (!err) {
                        let gameNoe = cc.instantiate(prefab);
                        cc.Canvas.instance.node.addChild(gameNoe);
                        console.log("添加子游戏完成");
                        resolve(null);
                    } else {
                        reject();
                    }
                }, this.gamebundle, "configkey");
        });
    }

    private autoRemoveLoading(): void {
        let time = 500;
        this.timeoutId = setTimeout(() => {
            console.log("auto remove start loading");
            this.removeLoading();
        }, time);
    }

    private gameRemoveLoading() {
        game.Utils["sendMessageToLobby"]("finishLoading_" + game.Global.gameId);
        game.EventManager.getInstance().removeEventListener("removeStartLoading", this.gameRemoveLoading, this);
        this.removeLoading();
    }

    private removeLoading() {
        clearTimeout(this.timeoutId);
        if (window['UpdatePorgress'] && window['UpdatePorgress']['updateShow'])
            window['UpdatePorgress']['updateShow'](1);
        setTimeout(() => {
            if (window['UpdatePorgress'] && window['UpdatePorgress']['completeShow'])
                window['UpdatePorgress']['completeShow']();
            setTimeout(() => {
                if (window['AdaptUpdate'])
                    window.removeEventListener("resize", window['AdaptUpdate']);
                if (window['AdaptFun'])
                    window.removeEventListener("resize", window['AdaptFun']);

                this.removeDocumentNode('gameMainJs');
                this.removeDocumentNode('splash');
                this.removeDocumentNode('logo-container');
                this.removeDocumentNode('version-label');
                this.removeDocumentNode('loadingInitJsNode');
                this.removeDocumentNode('loading0');
                this.removeDocumentNode('loading1');
                this.removeDocumentNode('loading2');
                this.removeDocumentNode('loading3');
                this.removeDocumentNode('loading4');
            }, 100);
        }, 100);
    }

    private removeDocumentNode(eleId: string) {
        if (document) {
            var ele = document.getElementById(eleId);
            if (ele)
                document.body.removeChild(ele);
        }
    }

    getgameType(gameid: string): string {
        let text = gameid.slice(0, 2);
        let type = "slot";
        switch (text) {
            case "10":
                type = "slot";
                break;
            case "20":
                type = "hunter";
                break;
            case "30":
                type = "arcade";
                break;
        }
        return type;
    }

    //加载proto js脚本库
    async loadScripts(moduleName: string, bundle: string): Promise<any> {
        let httpscript = window["getOtherBundleUrl"](bundle) + "/" + moduleName + "." + this.bundleVers[bundle] + ".js";
        return new Promise((resolve, reject) => {
            function scriptLoaded() {
                document.body.removeChild(domScript);
                domScript.removeEventListener('load', scriptLoaded, false);
                resolve(null);
            };
            var domScript = document.createElement('script');
            domScript.async = false;
            domScript.src = httpscript;
            domScript.addEventListener('load', scriptLoaded, false);
            document.body.appendChild(domScript);
        });
    }

    async loadVerJson(url, bundleName): Promise<any> {
        let self = this;
        //本地调试模式下  ，如果是 子游戏项目本身 ，不需要加载远端的
        var type = window["gameConfig"].gameType;
        if (bundleName == this.gamebundle && (type == "slot" || type == "hunter" || type == "arcade")) {
            return Promise.resolve();
        } else {
            return new Promise((resolve, reject) => {
                var request = new XMLHttpRequest();
                request.open("get", url + "/bundleVer.json?ver=" + new Date().getTime());
                request.send(null);/*不发送数据到服务器*/
                request.onload = function () {/*XHR对象获取到返回信息后执行*/
                    if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                        var json = JSON.parse(request.responseText);
                        //console.log(json);
                        self.bundleVers[bundleName] = json.version;
                        resolve(null);
                    } else {
                        reject(null);
                    }
                }
            });
        }
    }

    private async getSubLibVerJson(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            switch (this.curGameType) {
                case "slot":
                    await this.loadVerJson(window["getOtherBundleUrl"]("slot"), "slot");
                    break;
                case "hunter":
                    await this.loadVerJson(window["getOtherBundleUrl"]("hunter"), "hunter");
                    break;
                case "arcade":
                    await this.loadVerJson(window["getOtherBundleUrl"]("arcade"), "arcade");
                    break;
            }
            resolve(null);
        });
    }

    private async getSubLibProtojs(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            switch (this.curGameType) {
                case "slot":
                    await this.loadScripts("proto_slot", "slot");
                    break;
                case "hunter":
                    await this.loadScripts("proto_hunter", "hunter");
                    break;
                case "arcade":
                    await this.loadScripts("proto_arcade", "arcade");
                    await this.loadScripts("proto_qyxz", "arcade");
                    await this.loadScripts("proto_qzdz", "arcade");
                    break;
            }
            resolve(null);
        });
    }

    async loadAllVer(): Promise<any> {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.loadVerJson(window["getOtherBundleUrl"]("base"), "base"),
                this.loadVerJson(window["getOtherBundleUrl"]("game_core"), "game_core"),
                this.getSubLibVerJson(),
                this.loadCommonBundleConfig(),
                this.loadVerJson(window["getGameBundleUrl"](this.gamebundle, this.gameImgBundle), this.gameImgBundle),
            ]).then(() => {
                console.log("全部bundle版本文件加载完成");
                resolve(null);
            });
        });
    }

    async loadAllBundleAndProtojs(): Promise<any> {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.loadScripts("proto_common", "base"),
                this.loadScripts("proto_report", "game_core"),
                this.getSubLibProtojs(),
                this.loadBaseBundle(),
                this.loadCoreBundle(),
                this.loadSubLibBundle(),
                this.loadCommonBundle(),
                this.loadGameBundle()
            ]).then(() => {
                console.log("全部bundle和proto加载完成");
                resolve(null);
            });
        });
    }

    private rotationNode(): void {
        this.waiteNode = cc.Canvas.instance.node.getChildByName("waitNode");
        if (this.waiteNode) {
            cc.tween(this.waiteNode)
                .by(0.1, { angle: -45 })
                .repeatForever()
                .start();
        }
    }

    private removeWaitNode(): void {
        game.EventManager.getInstance().removeEventListener("removeWaitNode", this.removeWaitNode, this);
        if (this.waiteNode) {
            this.waiteNode.destroy();
            this.waiteNode = null;
        }
    }
}