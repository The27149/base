(function () {
    'use strict';
    //加载第三方库
    loadPlugins();
    var canvas = document.getElementById('GameCanvas');
    window.onload = function () {
        if (window.__quick_compile_engine__) {
            window.__quick_compile_engine__.load(onload);
        }
        else {
            onload();
        }
    };

    /**
     * 加载第三发库
     * @param cb 加载完全部 回调函数
     */
    function loadPlugins() {
        let pluginsPath = window.gameConfig.pluginsDir + '/plugins/';
        let jslist = [
            "base64.js",
            "long.js",
            "protobuf.min.js",
            "async.min.js",
            "fp.min.js",
            "NoSleep.min.js",
            "crypto-js.js",
        ];
        for (var i = 0; i < jslist.length; i++) {
            loadScript(pluginsPath + jslist[i], (name) => {
                console.log(name + "  加载完成");
                if (name.indexOf("NoSleep.min.js") != -1) {
                    var cocosCanvas = document.getElementById("GameCanvas");
                    //init noSleep
                    var noSleep = new NoSleep();
                    // Enable wake lock.
                    // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
                    //  noSleep.enable()初始化方法必须绑定在鼠标事件或触摸事件内，
                    //  当点击页面时就会激活不休眠功能
                    cocosCanvas.addEventListener('click', function enableNoSleep() {
                        cocosCanvas.removeEventListener('click', enableNoSleep, false);
                        noSleep.enable();
                    }, false);
                }
            });
        }
    }

    //加载js脚本库
    function loadScript(moduleName, cb) {
        function scriptLoaded() {
            document.body.removeChild(domScript);
            domScript.removeEventListener('load', scriptLoaded, false);
            cb && cb(moduleName);
        };
        var domScript = document.createElement('script');
        domScript.async = false;
        domScript.src = moduleName;
        domScript.addEventListener('load', scriptLoaded, false);
        document.body.appendChild(domScript);
    }

    function loadJson(url, bundleName, cb) {
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                var json = JSON.parse(request.responseText);
                //console.log(json);
                _CCSettings.bundleVers[bundleName] = json.version;
                cb();
            }
        }
    }


    function onload() {
        _CCSettings.bundleVers = {
            base: "",
            game_core: "",
            slot: "",
            arcade: ""
        };
        // socket
        // =======================

        // Receives a refresh event from the editor, which triggers the reload of the page
        var socket = window.io();
        socket.on('browser:reload', function () {
            window.location.reload();
        });
        socket.on('browser:confirm-reload', function () {
            var r = confirm('Reload?');
            if (r) {
                window.location.reload();
            }
        });


        // init engine
        // ======================

        var engineInited = false;

        var onStart = function () {
            // //动态合图
            // cc.macro.CLEANUP_IMAGE_CACHE = true;
            // cc.dynamicAtlasManager.enabled = false;
            // //开启调试
            // cc.dynamicAtlasManager.showDebug(true);

            cc.view.enableRetina(true);
            cc.view.resizeWithBrowserSize(true);

            // Loading splash scene
            var splash = document.getElementById('splash');
            var progressBar = splash.querySelector('.progress-bar span');

            cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
                splash.style.display = 'none';
            });

            cc.game.pause();

            // init assets
            engineInited = true;

            cc.assetManager.loadAny({ url: 'preview-scene.json', __isNative__: false }, null, function (finish, totalCount) {
                var percent = 100 * finish / totalCount;
                if (progressBar) {
                    progressBar.style.width = percent.toFixed(2) + '%';
                }
            }, function (err, sceneAsset) {
                if (err) {
                    console.error(err.message, err.stack);
                    return;
                }
                var scene = sceneAsset.scene;
                scene._name = sceneAsset._name;
                cc.assetManager.dependUtil._depends.add(scene._id, cc.assetManager.dependUtil._depends.get('preview-scene.json'));
                cc.director.runSceneImmediate(scene, function () {
                    // play game
                    cc.game.resume();
                });
            });

            // purge
            //noinspection JSUnresolvedVariable
            _CCSettings = undefined;
        };

        // 通过bundle地址获取bundle md5版本号，需在 _CCSettings.bundleVers 赋值后使用
        function getBundleMD5VerByUrl(url) {
            let ver = null;
            let strArr = url.split('/');
            let bundleName = strArr[strArr.length - 2];
            if (url.indexOf(bundleName) > -1) ver = _CCSettings.bundleVers[bundleName];
            return ver;
        }

        var AssetManagerInit = function () {
            var option = {
                id: canvas,
                debugMode: _CCSettings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
                showFPS: _CCSettings.debug,
                frameRate: 60,
                groupList: _CCSettings.groupList,
                collisionMatrix: _CCSettings.collisionMatrix,
            };

            cc.assetManager.init({
                bundleVers: _CCSettings.bundleVers,
                importBase: 'assets/others/import',
                nativeBase: 'assets/others/native'
            });

            let { RESOURCES, INTERNAL, MAIN } = cc.AssetManager.BuiltinBundleName;
            var bundleRoot = [INTERNAL];
            _CCSettings.hasResourcesBundle && bundleRoot.push(RESOURCES);

            var count = 0;
            function cb(err) {
                if (err) return console.error(err);
                count++;
                if (count === bundleRoot.length + 1) {
                    cc.assetManager.loadBundle(MAIN, function (err) {
                        if (!err) cc.game.run(option, onStart);
                    });
                }
            }

            //加载游戏公共库
            var type = window.gameConfig.gameType;
            switch (type) {
                case "base":
                    break;
                case "game_core":
                    bundleRoot.push(window["getOtherBundleUrl"]("base"));
                    break;
                case "start":
                case "slotLib":
                case "hunterLib":
                case "arcadeLib":
                    bundleRoot.push(window["getOtherBundleUrl"]("base"));
                    bundleRoot.push(window["getOtherBundleUrl"]("game_core"));
                    break;
                case "slot":
                    bundleRoot.push(window["getOtherBundleUrl"]("base"));
                    bundleRoot.push(window["getOtherBundleUrl"]("game_core"));
                    bundleRoot.push(window["getOtherBundleUrl"]("slot"));
                    break;
                case "hunter":
                    bundleRoot.push(window["getOtherBundleUrl"]("base"));
                    bundleRoot.push(window["getOtherBundleUrl"]("game_core"));
                    bundleRoot.push(window["getOtherBundleUrl"]("hunter"));
                    break;
                case "arcade":
                    bundleRoot.push(window["getOtherBundleUrl"]("base"));
                    bundleRoot.push(window["getOtherBundleUrl"]("game_core"));
                    bundleRoot.push(window["getOtherBundleUrl"]("arcade"));
                    break;
            }

            //去除加载本地 js 脚本公共库
            for (var i = 0; i < _CCSettings.jsList.length; i++) {
                let str = _CCSettings.jsList[i];
                if (str.indexOf("Alib") > 0) {
                    _CCSettings.jsList.splice(i, 1);
                    i--;
                }
            }
            cc.assetManager.loadScript(_CCSettings.jsList.map(function (x) { return '/plugins/' + x; }), cb);

            // load bundles
            for (let i = 0; i < bundleRoot.length; i++) {
                if (bundleRoot[i].indexOf("http") >= 0) {
                    let md5Ver = getBundleMD5VerByUrl(bundleRoot[i]);
                    if (md5Ver) {
                        cc.assetManager.loadBundle(bundleRoot[i], { version: md5Ver }, cb);
                    } else {
                        cc.assetManager.loadBundle(bundleRoot[i], cb);
                    }
                } else {
                    cc.assetManager.loadBundle('assets/' + bundleRoot[i], cb);
                }
            }
        }
        var type = window.gameConfig.gameType;
        async.parallel([
            function (callback) {
                //本地调试版本不加载版本配置
                if (type != 'base') {
                    loadJson(window["getOtherBundleUrl"]("base") + "/bundleVer.json?ver=" + new Date().getTime(), "base", callback);
                } else {
                    callback();
                }
            },
            function (callback) {
                if (type != 'game_core') {
                    loadJson(window["getOtherBundleUrl"]("game_core") + "/bundleVer.json?ver=" + new Date().getTime(), "game_core", callback);
                } else {
                    callback();
                }
            },
            function (callback) {
                if (type != 'slotLib') {
                    loadJson(window["getOtherBundleUrl"]("slot") + "/bundleVer.json?ver=" + new Date().getTime(), "slot", callback);
                } else {
                    callback();
                }
            },
            function (callback) {
                if (type != 'hunterLib') {
                    loadJson(window["getOtherBundleUrl"]("hunter") + "/bundleVer.json?ver=" + new Date().getTime(), "hunter", callback);
                } else {
                    callback();
                }
            },
            // function (callback) {
            //    if (type != 'arcadeLib') {
            //        loadJson(window["getOtherBundleUrl"]("arcade") + "/bundleVer.json?ver=" + new Date().getTime(), "arcade", callback);
            //    } else{
            //        callback();
            //    }
            // }
        ], function (err, result) {
            // console.log("配置加载完成");
            AssetManagerInit();
        });

    }
})();

