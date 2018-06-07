/**
 * Main JavaScript file to manage pages js
 *
 * @author   : jafar rezaei [bomber.man87@yahoo.com <http://jrjs.ir>]
 * @updated : 2018/06/07
 */
var jRun = {


    /**
     *  jRun version to check updates and force files caching validation
     */
    version: "1.0.18",


    /**
     *  Main plugIns that you want to load at page load
     *  @note : add only main plugIns here and use init
     *     jRun.plugins = [{
     *        url : "jquery/jquery.min" ,
     *        kind : "PlugIn"
     *     }];
     */
    plugins: [],


    /**
     * Set array of types we let them to initialize with .init function
     */
    allowedInitTypes : [
        'css',
        'js'
    ],


    /**
     * Files url prefix string link : 'public/'
     * @note : add `/` at the end of string
     */
    urlPrefix : '',


    /**
     * If a file has type which not allowed by `allowedInitTypes` Or has
     * not any type we use js type.
     */
    defaultType : 'js',


    /**
     * Default properties for loadFile function
     */
    defaultLoadProperties : {
        waitLoading : true,
        kind : false,
        url : '',
        attributes : {},
        multiFileUrl : false,
        afterLoad : function () {},
        beforeLoad: function() {},
        errorLoading : function(){}
    },

    /**
     * Attributes which should not added by user
     */
    notAllowedUserAttributes : [
        'href',
        'src'
    ],


    /**
     * Keep loaded files
     */
    loadedFiles: [],


    /**
     * Enable system debug mode
     */
    debugMode: true,


    /**
     * Allow init files flag , this flag check if main
     * plugIns loaded already or not and then allow init
     * the utility or even plug-ins which user want to add.
     */
    allowInit: false,


    /**
     * Remove extra chars from script name
     * @param name
     * @return string
     */
    sanitizeName: function (name) {
        return name.replace(/\/|\.|-/g, "_");
    },


    /**
     * Set flag to remember which files are loaded
     * @param name
     */
    setLoadedFlag: function (name) {
        this.loadedFiles.push(name);
    },


    /**
     * Check if a file is loaded or not
     * @param script
     * @returns {boolean}
     */
    checkLoad: function (script) {
        return this.loadedFiles.indexOf(script) > -1;
    },


    /**
     * Extend object
     *
     * @param out
     * @returns {*|{}}
     */
    deepExtend: function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            if(typeof obj === 'object') {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object')
                            out[key] = jRun.deepExtend(out[key], obj[key]);
                        else
                            out[key] = obj[key];
                    }
                }
            }
        }
        return out;
    },


    /**
     * Build whole mechanism of jRun here
     * system will run it at page load.
     */
    build: function () {

        // alias log instead of console.log in dev mode
        window.log = function (message , type ) {
            type = type || 'log';
            var stack = new Error().stack.toString().split(/\r\n|\n/);
            console[type](message, '          [' + stack[1] + ']');
        };

        // load main configuration
        this.firstCall = true;

        if(this.plugins.length > 0) {
            this.buildPlugIns();
        }else{
            this.allowInit = true;
        }

        return this;
    },


    /**
     * Build main plug-ins
     */
    buildPlugIns: function () {
        this.allowInit = false;
        this.init(this.plugins, function () {
            jRun.allowInit = true;
        });
    },


    /**
     * Add specific file (css,js) to our page
     * @param urls
     * @param callback
     */
    init: function (urls , callback ) {

        if(!(jRun.allowInit || jRun.firstCall)) {
            // sleep a bit and call your self again after 100 milliSeconds
            setTimeout(function () {
                jRun.init(urls , callback);
            } , 100);
            return false;
        }

        jRun.firstCall = false;
        var waiting = false,
            loadFinishCount = 0,
            endsWith = function (str, suffix) {
                if (str === null || suffix === null)
                    return false;
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            },
            loadFinish = function (o) {
                if(!o.multiFileUrl)
                    loadFinishCount++;

                // call self after load function
                o.afterLoad();

                if (urls.length === loadFinishCount) {
                    if (callback !== undefined && typeof callback === "function") {
                        if(jRun.debugMode) {
                            log("...... Start All Callback ......");
                        }
                        callback();
                    } else {
                        var callbackStack = new Error().stack.toString().split(/\r\n|\n/);
                        throw "CallBack should be a function " + (typeof callback) + " given!          [" + callbackStack[1] + "]";
                    }
                }
            },

            loadFile = function (o) {

                if(jRun.debugMode && o.url === ""){
                    var callbackStack = new Error().stack.toString().split(/\r\n|\n/);
                    throw "File url is empty [" + callbackStack[1] + "]";
                }


                if(!waiting) {

                    var realName = jRun.sanitizeName(o.url);

                    // if file is loaded already
                    if(jRun.checkLoad(realName)){
                        if(jRun.debugMode){
                            log(realName + " : Was already added !");
                            log(jRun.loadedFiles);
                        }
                        loadFinish(o);
                        return false;
                    }

                    // add file added flag
                    jRun.setLoadedFlag(realName);


                    var kind = o.kind ? o.kind + "/" : "";
                    var type = o.url.split('.').pop();

                    if(jRun.allowedInitTypes.indexOf(type) < 0){
                        type = jRun.defaultType;
                    }

                    var fileReference = document.createElement((type === "js" ? 'script' : 'link'));
                    var url = kind + (endsWith(o.url , "." + type) ? o.url : o.url + "." + type);


                    o.beforeLoad();


                    if (type === "js") {
                        fileReference.src = jRun.urlPrefix + "Javascript/" + url + "?jVer=" + jRun.version;
                    } else {
                        fileReference.type = "text/css";
                        fileReference.rel = "stylesheet";
                        fileReference.href = jRun.urlPrefix + "Css/" + url + "?jVer=" + jRun.version;
                    }


                    jRun.notAllowedUserAttributes.forEach(function (attr) {
                        delete o.attributes[attr];
                    });


                    // add user extra attributes
                    fileReference = jRun.deepExtend(fileReference , o.attributes);

                    fileReference.onload = function(){
                        if (jRun.debugMode) {
                            log('Loaded -> ' + o.multiFileUrl + " -> " + o.url);
                        }
                        loadFinish(o);
                    };



                    fileReference.onerror = function () {
                        o.errorLoading();
                        if (jRun.debugMode) {
                            log('Error loading -> ' + o.multiFileUrl + " -> " + o.url);
                        }
                    };

                    document.head.appendChild(fileReference);

                }else{
                    // sleep a bit and call your self again after 100 milliSeconds
                    setTimeout(function () {
                        loadFile(o);
                    } , 100);
                }
            };


        urls = (typeof urls === "string") ? [urls] : urls;


        urls.forEach(function (url) {
            var options = {};


            options = jRun.deepExtend({}, jRun.defaultLoadProperties , url);

            if(typeof url === "string") {
                options['url'] = url;
                options['kind'] = 'Utility';
            }

            if(Array.isArray(options.url)){
                options.url.forEach(function(subUrl , index){
                    options.multiFileUrl = (index !== 1);
                    options.url = subUrl;
                    loadFile(options);
                });
            }else{
                loadFile(options);
            }
        });

    }
}.build();


// features :
// get sass or less  concat them
// get js files and minify and concat them
// get pug and transpile it
// .config method
// lang support
// test methods
// load Utilities with npm

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = jRun;
}
