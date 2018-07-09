/**
 * Main JavaScript file to manage pages js
 *
 * @author    : jafar rezaei <bomber.man87@yahoo.com>
 * @link      : http://jrjs.ir
 * @version   : 2018/06/08
 */
let jRun = {


    /**
     *  jRun version to check updates and force files caching validation
     */
    version: "1.0.24",


    /**
     *  Main plugIns that you want to load at page load
     *  add only main plugIns here and use init
     *  @example :
     *     jRun.plugins = [{
     *        url : "jquery/jquery.min" ,
     *        kind : "PlugIn"
     *     }];
     */
    plugins: [],



    /**
     * Set array of types we let them to initialize with .init function
     */
    allowedInitTypes: [
        'css',
        'js'
    ],


    /**
     * Files url prefix string link : 'public/'
     * @summary : add `/` at the end of string
     */
    urlPrefix: '',


    /**
     * If a file has type which not allowed by `allowedInitTypes` Or has
     * not any type we use js type.
     */
    defaultType: 'js',


    /**
     * Default properties for loadFile function
     */
    defaultLoadProperties: {
        waitLoading: true,
        kind: false,
        url: '',
        urls: [],
        cdn: false,
        attributes: {},
        multiFileUrl: false,
        afterLoad: function () { },
        beforeLoad: function () { },
        errorLoading: function () { }
    },

    /**
     * Attributes which should not added by user
     */
    notAllowedUserAttributes: [
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
     * Do not let files to be cached
     */
    disableCache: true,


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
        return name.toString().split("/").pop().replace(/\/|\.|-/g, "_");
    },


    /**
     * Build dummy string
     * @return {string}
     */
    buildDummy: function () {
        return "?jDummy=" + Math.floor(999999999 * Math.random() + 1);
    },


    /**
     * Set flag to remember which files are loaded
     * @param name
     */
    setLoadedFlag: function (name) {
        this.loadedFiles.push(this.sanitizeName(name));
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

        for (let i = 1; i < arguments.length; i++) {
            let obj = arguments[i];

            if (!obj)
                continue;

            if (typeof obj === 'object') {
                for (let key in obj) {
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
        let log = function (message, type) {
            type = type || 'log';
            let stack = new Error().stack.toString().split(/\r\n|\n/);
            console[type](message, '          [' + stack[1] + ']');
        };

        if (typeof window !== 'undefined') {
            window.log = log;
        }

        // load main configuration
        this.firstCall = true;

        if (this.plugins.length > 0) {
            this.buildPlugIns();
        } else {
            this.allowInit = true;
        }

        return this;
    },


    /**
     * Build main plug-ins
     * @param plugins
     * @param callback
     */
    buildPlugIns: function (plugins , callback) {

        this.plugins = plugins || this.plugins;

        this.allowInit = false;
        this.init(this.plugins, function () {
            jRun.allowInit = true;
            return callback || (function () {});
        });
    },


    /**
     * Add lang file
     * @param lang
     * @param callback
     */
    addLanguage: function (lang, callback) {

        if (jRun.checkLoad("lang" + lang) || lang === "") {
            return true;
        }

        jRun.init(
            [{
                url: "lang." + lang + ".js",
                kind: "Langs",
                attributes: { class: 'isLanguageFile' },
                waitLoading: false,
                afterLoad: function () {
                    if (typeof callback === "function") callback();
                }
            }]
        );

    },


    /**
     * Add specific file (css,js) to our page
     * @param urls
     * @param callback
     */
    init: function (urls, callback) {

        if (!(jRun.allowInit || jRun.firstCall)) {
            // sleep a bit and call your self again after 100 milliSeconds
            setTimeout(function () {
                jRun.init(urls, callback);
            }, 100);
            return false;
        }

        jRun.firstCall = false;
        let waiting = false,
            loadFinishCount = 0,
            endsWith = function (str, suffix) {
                if (str === null || suffix === null)
                    return false;
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            },
            loadFinish = function (o) {
                if (!o.multiFileUrl)
                    loadFinishCount++;


                // add file added flag
                jRun.setLoadedFlag(o.url);

                // call self after load function
                o.afterLoad();

                if (urls.length === loadFinishCount) {
                    if (callback !== undefined && typeof callback === "function") {
                        if (jRun.debugMode) {
                            log("...... Start All Callback ......");
                        }
                        callback();
                    }
                }
            },

            loadFile = function (o) {

                if (jRun.debugMode && o.url === "") {
                    let callbackStack = new Error().stack.toString().split(/\r\n|\n/);
                    throw "File url is empty [" + callbackStack[1] + "]";
                }


                if (!waiting) {

                    let realName = jRun.sanitizeName(o.url);

                    // if file is loaded already
                    if (jRun.checkLoad(realName)) {
                        if (jRun.debugMode) {
                            log(realName + " : Was already added !");
                            log(jRun.loadedFiles);
                        }
                        loadFinish(o);
                        return false;
                    }



                    let kind = o.kind ? o.kind + "/" : "";
                    let type = o.url.split('.').pop();

                    if (jRun.allowedInitTypes.indexOf(type) < 0) {
                        type = jRun.defaultType;
                    }

                    let fileReference = document.createElement((type === "js" ? 'script' : 'link'));
                    let url = kind + (endsWith(o.url, "." + type) ? o.url : o.url + "." + type);


                    o.beforeLoad();


                    let extraParameter = "?jVer=" + jRun.version;
                    if (jRun.disableCache) {
                        extraParameter = jRun.buildDummy();
                    }

                    if (type === "js") {
                        fileReference.src = o.cdn ? url : jRun.urlPrefix + "Javascript/" + url + extraParameter;
                    } else {
                        fileReference.type = "text/css";
                        fileReference.rel = "stylesheet";
                        fileReference.href = o.cdn ? url : jRun.urlPrefix + "Css/" + url + extraParameter;
                    }


                    jRun.notAllowedUserAttributes.forEach(function (attr) {
                        delete o.attributes[attr];
                    });


                    // add user extra attributes
                    fileReference = jRun.deepExtend(fileReference, o.attributes);

                    fileReference.onload = function () {
                        if (jRun.debugMode) {
                            log('Loaded -> ' + o.multiFileUrl + " -> " + o.url);
                        }
                        if (typeof loadFinish === "function") loadFinish(o);
                    };



                    fileReference.onerror = function () {
                        o.errorLoading();
                        if (jRun.debugMode) {
                            log('Error loading -> ' + o.multiFileUrl + " -> " + o.url);
                        }
                    };

                    document.head.appendChild(fileReference);

                } else {
                    // sleep a bit and call your self again after 100 milliSeconds
                    setTimeout( () => {
                        loadFile(o);
                    }, 100);
                }
            };


        urls = (typeof urls === "string") ? [urls] : urls;


        urls.forEach(function (url) {
            let options = {};


            options = jRun.deepExtend({}, jRun.defaultLoadProperties, url);

            if (typeof url === "string") {
                options['url'] = url;
                options['kind'] = 'Utility';
            }

            let urlKeys = Object.keys(options.urls);
            if (urlKeys.length > 0) {
                urlKeys.forEach(function (key) {
                    options.multiFileUrl = (key !== 1);
                    options.url = options.urls[key];
                    loadFile(options);
                });
            } else {
                loadFile(options);
            }
        });

    }
}.build();


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = jRun;
}
