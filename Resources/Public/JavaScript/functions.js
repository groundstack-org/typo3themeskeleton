function openLink(link, target) {
    if(target === "_blank") {
        window.open = link;
    } else {
        window.location.href = link;
    }
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

var beUser = getCookie("be_typo_user");

// if cookie be_typo_user dont exists
if (beUser != null) {
    // START: NoIframe
    // if this page is located in e. g. a iframe redirect the browser directly to your site!
    if(window != window.top){
        window.top.location = window.location;
    }
    // END: NoIframe
}



// START: Default vars
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight,
    lang = document.documentElement.lang;

window.addEventListener("resize", function() {
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
});
// END: Default vars

/**
 * Load .css files
 * @public
 * @param {String} url  the url / path to the css file
 */
function loadCSS(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

/**
 * Load .js files
 * @public loadJS(source, callback)
 * @param {String} source  the url / path to the js script
 * @param {String} callback  callback function - optional
 *
 * use: loadJS("/YourPath/ToYourScript.js", function() {  });
 */
function loadJS(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('body')[0];
    script.async = 1;
    prior.appendChild(script);

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if(!isAbort) { if(callback) callback(); }
        }
    };

    script.src = source;
}

/**
 * If element has CSS class
 * @public
 * @param {Element} el  the element to simulate a click on
 */
function hasClass(el, className) {
    if(el.classList) {
        return el.classList.contains(className);
    } else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
}

/**
 * Add a CSS class to an element
 * @public
 * @param {Element} el  the element to add the className
 * @param {String} className  the class name to add
 */
function addClass(el, className) {
    const classes = className.split(" ");
    for (var i = 0; i < classes.length; i++) {
        if(el.classList) {
            el.classList.add(classes[i]);
        } else if (!hasClass(el, classes[i])) {
            el.classes[i] += " " + classes[i];
        }
    }
}

/**
 * Removes CSS class from an element
 * @public
 * @param {Element} el  the element from which the the className should be removed
 * @param {String} className  the class name to remove
 */
function removeClass(el, className) {
    const classes = className.split(" ");
    for (var i = 0; i < classes.length; i++) {
        if(el.classList) {
            el.classList.remove(classes[i]);
        } else if (hasClass(el, classes[i])) {
            var reg = new RegExp('(\\s|^)' + classes[i] + '(\\s|$)');
            el.classes[i]=el.className.replace(reg, ' ');
        }
    }
}

/**
 * Object merge:
 * Usage:
 * var myObject1 = { One: "One" };
 * myObject1.merge({ Two: "Two" }).merge({ Three: "Three" });
 * ### myObject1 is { One: "One", Two: "Two", Three: "Three", merge: function }
 *
 * var myObject2 = Object.merge2({ One: "One" }, { Two: "Two" });
 * Object.merge2(myObject2, { Three: "Three" });
 * ### myObject2 is { One: "One", Two: "Two", Three: "Three" }
 */
// Extend the protype so you can make calls on the instance
Object.prototype.merge = function(obj2) {
    for (var attrname in obj2) {
        this[attrname] = obj2[attrname];
    }
    // Returning this is optional and certainly up to your implementation.
    // It allows for nice method chaining.
    return this;
};
// Append to the object constructor function so you can only make static calls
Object.merge2 = function(obj1, obj2) {
    for (var attrname in obj2) {
        obj1[attrname] = obj2[attrname];
    }
    // Returning obj1 is optional and certainly up to your implementation
    return obj1;
};

/**
 * Print function
 * @public
 * @param {Element} content  the element to which should be printed
 */
function printcontent(content) {
    var win=null;
    win = window.open();
    self.focus();
    win.document.open();
    win.document.write('<html><head><style>');
    win.document.write('html, body { float: left; display: block; max-width: 800px; width: 100%; } body, td, th { font-family: Verdana; font-size: 10pt; text-align: left; } thead { font-size: 10pt; } h1 { font-family: Verdana; font-size: 12pt; } h2 { font-family: Verdana; font-size: 10pt; }.contenttable { border-collapse: separate; border-spacing: 0; color:#706f6f; clear: both; margin: 0 auto; width: 100%; }b {color:#706f6f;}.tx-powermail {display:none;}');
    win.document.write('</style></head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    setTimeout(function() {
        win.print();
        win.close();
    }, 2000);
}

var dictionary, set_lang;
dictionary = {
    "en-EN": {
    },
    "de-DE": {
    }
};

/**
 * Print function
 * @public
 * @param {String} dictionary  which language are to choose
 * @param {String} name  key of the text witch should be translated
 */
function set_lang(dictionary, name) {
    var key = name;
    if (dictionary.hasOwnProperty(key)) {
        return dictionary[key];
    }
}

/**
 * Print function
 * @public
 * @param {String} name  key of the text which should be translated
 */
function change_lang(name) {
    var language = document.documentElement.lang;
    if (dictionary.hasOwnProperty(language)) {
        return set_lang(dictionary[language], name);
    } else {
        var specLang = language.toUpperCase();
        if(dictionary.hasOwnProperty(language + "-" + specLang)) {
            return set_lang(dictionary[language + "-" + specLang], name);
        }
    }
}


function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}
