/**
 * @ignore
 * ua
 */

/* eslint-disable */
var win = typeof window !== 'undefined' ? window : {}
var undef
var doc = win.document
var ua = win.navigator && win.navigator.userAgent || ''

function numberify(s) {
    var c = 0
    // convert '1.2.3.4' to 1.234
    return parseFloat(s.replace(/\./g, function() {
        return (c++ === 0) ? '.' : ''
    }))
}

function setTridentVersion(ua, UA) {
    var core, m
    UA[core = 'trident'] = 0.1 // Trident detected, look for revision

    // Get the Trident's accurate version
    if((m = ua.match(/Trident\/([\d.]*)/)) && m[1]) {
        UA[core] = numberify(m[1])
    }

    UA.core = core
}

function getIEVersion(ua) {
    var m, v
    if((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) &&
        (v = (m[1] || m[2]))) {
        return numberify(v)
    }
    return 0
}

function getDescriptorFromUserAgent(ua) {
    var EMPTY = '',
        os,
        core = EMPTY,
        shell = EMPTY,
        m,
        IE_DETECT_RANGE = [6, 9],
        ieVersion,
        v,
        end,
        VERSION_PLACEHOLDER = '{{version}}',
        IE_DETECT_TPL = '<!--[if IE ' + VERSION_PLACEHOLDER + ']><' + 's></s><![endif]-->',
        div = doc && doc.createElement('div'),
        s = []

    /**
     * KISSY UA
     * @class KISSY.UA
     * @singleton
     */
    var UA = {
        version: '@VERSION@',
        /**
         * webkit version
         * @type undef|Number
         * @member KISSY.UA
         */
        webkit: undef,
        /**
         * trident version
         * @type undef|Number
         * @member KISSY.UA
         */
        trident: undef,
        /**
         * gecko version
         * @type undef|Number
         * @member KISSY.UA
         */
        gecko: undef,
        /**
         * presto version
         * @type undef|Number
         * @member KISSY.UA
         */
        presto: undef,
        /**
         * chrome version
         * @type undef|Number
         * @member KISSY.UA
         */
        chrome: undef,
        /**
         * safari version
         * @type undef|Number
         * @member KISSY.UA
         */
        safari: undef,
        /**
         * firefox version
         * @type undef|Number
         * @member KISSY.UA
         */
        firefox: undef,
        /**
         * ie version
         * @type undef|Number
         * @member KISSY.UA
         */
        ie: undef,
        /**
         * ie document mode
         * @type undef|Number
         * @member KISSY.UA
         */
        ieMode: undef,
        /**
         * opera version
         * @type undef|Number
         * @member KISSY.UA
         */
        opera: undef,
        /**
         * mobile browser. apple, android.
         * @type String
         * @member KISSY.UA
         */
        mobile: undef,
        /**
         * browser render engine name. webkit, trident
         * @type String
         * @member KISSY.UA
         */
        core: undef,
        /**
         * browser shell name. ie, chrome, firefox
         * @type String
         * @member KISSY.UA
         */
        shell: undef,

        /**
         * PhantomJS version number
         * @type undef|Number
         * @member KISSY.UA
         */
        phantomjs: undef,

        /**
         * operating system. android, ios, linux, windows
         * @type string
         * @member KISSY.UA
         */
        os: undef,

        /**
         * ipad ios version
         * @type Number
         * @member KISSY.UA
         */
        ipad: undef,
        /**
         * iphone ios version
         * @type Number
         * @member KISSY.UA
         */
        iphone: undef,
        /**
         * ipod ios
         * @type Number
         * @member KISSY.UA
         */
        ipod: undef,
        /**
         * ios version
         * @type Number
         * @member KISSY.UA
         */
        ios: undef,

        /**
         * android version
         * @type Number
         * @member KISSY.UA
         */
        android: undef,

        /**
         * nodejs version
         * @type Number
         * @member KISSY.UA
         */
        nodejs: undef,
    }

    // ejecta
    if(div && div.getElementsByTagName) {
        // try to use IE-Conditional-Comment detect IE more accurately
        // IE10 doesn't support this method, @ref: http://blogs.msdn.com/b/ie/archive/2011/07/06/html5-parsing-in-ie10.aspx
        div.innerHTML = IE_DETECT_TPL.replace(VERSION_PLACEHOLDER, '')
        s = div.getElementsByTagName('s')
    }

    if(s.length > 0) {
        setTridentVersion(ua, UA)

        // Detect the accurate version
        // 注意：
        //  UA.shell = ie, 表示外壳是 ie
        //  但 UA.ie = 7, 并不代表外壳是 ie7, 还有可能是 ie8 的兼容模式
        //  对于 ie8 的兼容模式，还要通过 documentMode 去判断。但此处不能让 UA.ie = 8, 否则
        //  很多脚本判断会失误。因为 ie8 的兼容模式表现行为和 ie7 相同，而不是和 ie8 相同
        for(v = IE_DETECT_RANGE[0], end = IE_DETECT_RANGE[1]; v <= end; v++) {
            div.innerHTML = IE_DETECT_TPL.replace(VERSION_PLACEHOLDER, v)
            if(s.length > 0) {
                UA[shell = 'ie'] = v
                break
            }
        }

        // https://github.com/kissyteam/kissy/issues/321
        // win8 embed app
        if(!UA.ie && (ieVersion = getIEVersion(ua))) {
            UA[shell = 'ie'] = ieVersion
        }
    }else {
        // WebKit
        // https://github.com/kissyteam/kissy/issues/545
        if(((m = ua.match(/AppleWebKit\/*\s*([\d.]*)/)) || (m = ua.match(/Safari\/([\d.]*)/))) && m[1]) {
            UA[core = 'webkit'] = numberify(m[1])

            if((m = ua.match(/OPR\/(\d+\.\d+)/)) && m[1]) {
                UA[shell = 'opera'] = numberify(m[1])
            }else if((m = ua.match(/Chrome\/([\d.]*)/)) && m[1]) {
                UA[shell = 'chrome'] = numberify(m[1])
            }else if((m = ua.match(/\/([\d.]*) Safari/)) && m[1]) {
                UA[shell = 'safari'] = numberify(m[1])
            }else {
                // default to mobile safari
                UA.safari = UA.webkit
            }

            // Apple Mobile
            if(/ Mobile\//.test(ua) && ua.match(/iPad|iPod|iPhone/)) {
                UA.mobile = 'apple' // iPad, iPhone or iPod Touch

                m = ua.match(/OS ([^\s]*)/)
                if(m && m[1]) {
                    UA.ios = numberify(m[1].replace('_', '.'))
                }
                os = 'ios'
                m = ua.match(/iPad|iPod|iPhone/)
                if(m && m[0]) {
                    UA[m[0].toLowerCase()] = UA.ios
                }
            }else if(/ Android/i.test(ua)) {
                if(/Mobile/.test(ua)) {
                    os = UA.mobile = 'android'
                }
                m = ua.match(/Android ([^\s]*);/)
                if(m && m[1]) {
                    UA.android = numberify(m[1])
                }
            }else if((m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
                UA.mobile = m[0].toLowerCase() // Nokia N-series, Android, webOS, ex: NokiaN95
            }

            if((m = ua.match(/PhantomJS\/([^\s]*)/)) && m[1]) {
                UA.phantomjs = numberify(m[1])
            }
        }else {
            // Presto
            // ref: http://www.useragentstring.com/pages/useragentstring.php
            if((m = ua.match(/Presto\/([\d.]*)/)) && m[1]) {
                UA[core = 'presto'] = numberify(m[1])

                // Opera
                if((m = ua.match(/Opera\/([\d.]*)/)) && m[1]) {
                    UA[shell = 'opera'] = numberify(m[1]) // Opera detected, look for revision

                    if((m = ua.match(/Opera\/.* Version\/([\d.]*)/)) && m[1]) {
                        UA[shell] = numberify(m[1])
                    }

                    // Opera Mini
                    if((m = ua.match(/Opera Mini[^;]*/)) && m) {
                        UA.mobile = m[0].toLowerCase() // ex: Opera Mini/2.0.4509/1316
                    }else if((m = ua.match(/Opera Mobi[^;]*/)) && m) {
                        // Opera Mobile
                        // ex: Opera/9.80 (Windows NT 6.1; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00
                        // issue: 由于 Opera Mobile 有 Version/ 字段，可能会与 Opera 混淆，同时对于 Opera Mobile 的版本号也比较混乱
                        UA.mobile = m[0]
                    }
                }
                // NOT WebKit or Presto
            }else {
                // MSIE
                // 由于最开始已经使用了 IE 条件注释判断，因此落到这里的唯一可能性只有 IE10+
                // and analysis tools in nodejs
                if((ieVersion = getIEVersion(ua))) {
                    UA[shell = 'ie'] = ieVersion
                    setTridentVersion(ua, UA)
                    // NOT WebKit, Presto or IE
                }else {
                    // Gecko
                    if((m = ua.match(/Gecko/))) {
                        UA[core = 'gecko'] = 0.1 // Gecko detected, look for revision
                        if((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                            UA[core] = numberify(m[1])
                            if(/Mobile|Tablet/.test(ua)) {
                                UA.mobile = 'firefox'
                            }
                        }
                        // Firefox
                        if((m = ua.match(/Firefox\/([\d.]*)/)) && m[1]) {
                            UA[shell = 'firefox'] = numberify(m[1])
                        }
                    }
                }
            }
        }
    }

    if(!os) {
        if((/windows|win32/i).test(ua)) {
            os = 'windows'
        }else if((/macintosh|mac_powerpc/i).test(ua)) {
            os = 'macintosh'
        }else if((/linux/i).test(ua)) {
            os = 'linux'
        }else if((/rhino/i).test(ua)) {
            os = 'rhino'
        }
    }

    UA.os = os
    UA.core = UA.core || core
    UA.shell = shell
    UA.ieMode = UA.ie && doc.documentMode || UA.ie

    return UA
}

var UA = getDescriptorFromUserAgent(ua)

// nodejs
if(typeof process === 'object') {
    var versions, nodeVersion
    if((versions = process.versions) && (nodeVersion = versions.node)) {
        UA.os = process.platform
        UA.nodejs = numberify(nodeVersion)
    }
}

// use by analysis tools in nodejs
UA.getDescriptorFromUserAgent = getDescriptorFromUserAgent

// var browsers = [
//         // browser core type
//         'webkit',
//         'trident',
//         'gecko',
//         'presto',
//         // browser type
//         'chrome',
//         'safari',
//         'firefox',
//         'ie',
//         'opera',
//     ],
//     documentElement = doc && doc.documentElement,
//     className = ''
// if(documentElement) {
//     for(var i = 0; i < browsers.length; i++) {
//         var key = browsers[i]
//         var v = UA[key]
//         if(v) {
//             className += ' ks-' + key + (parseInt(v, 10) + '')
//             className += ' ks-' + key
//         }
//     }
//     if(className) {
//         documentElement.className = (documentElement.className + className).replace(/^[\s\xa0]+|[\s\xa0]+$/g, '')
//     }
// }

function getQueryString(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if(r != null) return decodeURIComponent(r[2])
    return null
}

;(function() {
    var DISABLE_BROWSER_DETECTION = getQueryString('DISABLE_BROWSER_DETECTION')
    if(DISABLE_BROWSER_DETECTION) {
        return
    }

    var url = 'https://web-url.51zan.com?redirect_url=' + window.location.href

    if(UA.chrome && UA.chrome >= 43) {
        return
    }

    if(UA.firefox) {
        if(UA.firefox >= 63) {
            return
        }else {
            url = 'http://www.firefox.com.cn/'
        }
    }

    window.location.href = url
}())


