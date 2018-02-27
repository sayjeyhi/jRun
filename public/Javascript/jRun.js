/**
 * Main JavaScript file to manage pages js
 *
 * @author   : jafar rezaei [bomber.man87@yahoo.com <http://jrjs.ir>]
 * @updated : 2018/02/20
 */
var log;
var jRun = {


    /**
     *  jRun version to check updates and force files caching validation
     */
    version: "0.1.09",


    /**
     *  Main plugIns that you want to load at page load
     *  @note : add only main plugIns here and use init
     */
    plugins: [{
        url : "vivus/vivus.min" ,
        kind : "PlugIn"
    }],


    /**
     * enable system debug mode
     */
    debugMode: true,

    /**
     * allow init files flag , this flag check if main
     * plugIns loaded already or not and then allow init
     * the utility or even plug-ins which user want to add.
     */
    allowInit: false,


    /**
     * Build whole mechanism of jRun here
     * system will run it at page load.
     */
    build: function () {

        // alias log instead of console.log in dev mode
        log = function (message) {
            var e = new Error();
            var stack = e.stack.toString().split(/\r\n|\n/);
            console.log(message, '          [' + stack[1] + ']');
        };

        // load main configuration
        jRun.firstCall = true;
        jRun.init(jRun.plugins , function(){
            jRun.allowInit = true;
        });
    },

    
    loadFinish: function () {
        loadFinishCount++;

        if (urls.length === loadFinishCount) {
            if (callback !== undefined && typeof callback === "function") {
                callback();
            } else {
                var callbackError = new Error();
                var callbackStack = callbackError.stack.toString().split(/\r\n|\n/);
                throw "CallBack should be a function " + (typeof callback) + " given!          [" + callbackStack[1] + "]";
            }
        }
    },

    
    loadFile : function (url, wait, kind, after, ignore) {
        if(!waiting) {
            log(url);
            // add file added flag
            var fileCorrectName = scapeFilename(url);
            jRun["has" + fileCorrectName] = true;

            kind = kind === "" ? "" : kind + "/";

            var type = endsWith(url, ".css") ? "css" : "js";
            var fileReference = document.createElement((type === "js" ? 'script' : 'link'));


            url = url.indexOf(type) > 0 ? url : url + "." + type;
            if (type === "js") {
                fileReference.src = "public/Javascript/" + kind + url + "?Ver=" + jRun.version;
            } else {
                fileReference.type = "text/css";
                fileReference.rel = "stylesheet";
                fileReference.href = "public/Css/" + kind + url + "?Ver=" + jRun.version;
            }
            
            if(ignore){
                jRun.loadFinish();
            }
            
            fileReference.onload = function () {
                if (jRun.debugMode) {
                    log('Loaded script ...');
                }
                
                if(!ignore){
                    jRun.loadFinish();
                }
            };

            fileReference.onerror = function () {
                if (jRun.debugMode) {
                    log('Error loading script !');
                }
            };

            document.head.appendChild(fileReference);
        }else{
            // sleep a bit and call your self again after 100 milliSeconds
            setTimeout(function () {
                jRun.loadFile(url, wait, after, ignore);
            } , 100);
        }
    },
                    
    /**
     * Add specific file (css,js) to our page
     * @param urls
     * @param callback
     * @TODO ADD multi URL of a specific kind support
     */
    init: function (urls , callback ) {

        if(jRun.allowInit || jRun.firstCall) {
            jRun.firstCall = false;
            var waiting = false,
                loadFinishCount = 0,
                endsWith = function (str, suffix) {
                    if (str === null || suffix === null)
                        return false;
                    return str.indexOf(suffix, str.length - suffix.length) !== -1;
                },
                scapeFilename = function (name) {
                    if (name.indexOf("/") > 0) {
                        name = name.substr(0, name.indexOf("/"));
                    }
                    return name.replace([".min", "/", ".", "-"], "");
                },
                



            urls = (typeof urls === "string") ? [urls] : urls;



            for (var i = 0; i < urls.length; i++) {

                var address, wait, after, ignore, kind = '';

                // is an object and has some dependency
                wait = urls[i].hasOwnProperty('wait') ? urls[i]['wait'] : undefined;
                kind = urls[i].hasOwnProperty('kind') ? urls[i]['kind'] : 'Utility';
                after = urls[i].hasOwnProperty('after') ? urls[i]['after'] : undefined;
                address = urls[i].hasOwnProperty('url') ? urls[i]['url'] : urls[i];
                ignore = urls[i].hasOwnProperty('ignore') ? urls[i]['ignore'] : false;

                jRun.loadFile(address, wait, kind, after, ignore);
            }

        }else{
            // sleep a bit and call your self again after 100 milliSeconds
            setTimeout(function () {
                jRun.init(urls , callback , kind);
            } , 100);
        }

    }

};


jRun.build();
