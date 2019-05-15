"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;

    if (this === null) {
      throw new TypeError(' this is null or not defined');
    } // 1. Let O be the result of calling ToObject passing the |this| value as the argument.


    var O = Object(this); // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).

    var len = O.length >>> 0; // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11

    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    } // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.


    if (arguments.length > 1) {
      T = thisArg;
    } // 6. Let k be 0


    k = 0; // 7. Repeat, while k < len

    while (k < len) {
      var kValue; // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then

      if (k in O) {
        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k]; // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.

        callback.call(T, kValue, k, O);
      } // d. Increase k by 1.


      k++;
    } // 8. return undefined

  };
} // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Production steps of ECMA-262, Edition 6, 22.1.2.1


if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;

    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };

    var toInteger = function toInteger(value) {
      var number = Number(value);

      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    }; // The length property of the from method is 1.


    return function from(arrayLike
    /*, mapFn, thisArg */
    ) {
      // 1. Let C be the this value.
      var C = this; // 2. Let items be ToObject(arrayLike).

      var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      } // 4. If mapfn is undefined, then let mapping be false.


      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;

      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.


        if (arguments.length > 2) {
          T = arguments[2];
        }
      } // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).


      var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).

      var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

      var k = 0; // 17. Repeat, while k < len (also steps a - h)

      var kValue;

      while (k < len) {
        kValue = items[k];

        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k += 1;
      } // 18. Let putStatus be Put(A, "length", len, true).


      A.length = len; // 20. Return A.

      return A;
    };
  }();
} // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
} // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }

    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]); // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }

    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

var IoUtilities =
/*#__PURE__*/
function () {
  function IoUtilities() {
    _classCallCheck(this, IoUtilities);
  }

  _createClass(IoUtilities, [{
    key: "windowWidth",
    value: function windowWidth() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  }, {
    key: "windowHeight",
    value: function windowHeight() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
  }, {
    key: "width",
    value: function width(element, _width) {
      if (typeof _width != "undefined") {
        element.style.width = Number.isInteger(_width) ? _width + "px" : _width;
      } else {
        return element.clientWidth || 0;
      }
    }
  }, {
    key: "height",
    value: function height(element, _height) {
      if (typeof _height != "undefined") {
        element.style.height = Number.isInteger(_height) ? _height + "px" : _height;
      } else {
        return element.clientHeight || 0;
      }
    }
  }, {
    key: "heightContent",
    value: function heightContent(element) {
      var elStyle = window.getComputedStyle(element);

      if (elStyle.display == "none" || elStyle.height == "0px" || elStyle.maxHeight == "0px") {
        var elStyleInline = {
          display: element.style.display,
          height: element.style.height,
          maxHeight: element.style.maxHeight
        };
        element.style.display = "block";
        element.style.height = "auto";
        element.style.maxHeight = "none";
      }

      var elementHeight = element.clientHeight || 0;

      if (typeof elStyleInline != "undefined") {
        element.style.display = elStyleInline.display || "";
        element.style.height = elStyleInline.height || "";
        element.style.maxHeight = elStyleInline.maxHeight || "";
      }

      return elementHeight;
    }
  }, {
    key: "prefixClass",
    value: function prefixClass(className) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.config.prefix;
      return prefix ? prefix + className : className;
    }
  }, {
    key: "addClass",
    value: function addClass(element, className) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.prefix;
      element.classList.add(this.prefixClass(className, prefix));
    }
  }, {
    key: "removeClass",
    value: function removeClass(element, className) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.prefix;
      element.classList.remove(this.prefixClass(className, prefix));
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(element, className) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.prefix;
      this.hasClass(element, className) ? this.removeClass(element, className) : this.addClass(element, className);
    }
  }, {
    key: "hasClass",
    value: function hasClass(element, className) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.prefix;
      return element.classList.contains(this.prefixClass(className, prefix));
    }
  }, {
    key: "addChild",
    value: function addChild(elementSrc, elementTarget, attributes, position) {
      var elementNode = typeof elementSrc === "string" ? document.createElement(elementSrc) : elementSrc;

      if (attributes) {
        for (var attr in attributes) {
          elementNode.setAttribute(attr, attributes[attr]);
        }
      }

      this.attr(elementNode, attributes);

      if (position === "prepend" || position === "top") {
        elementTarget.prepend(elementNode);
      } else if (position === "append" || position === "bottom") {
        elementTarget.append(elementNode);
      }

      return elementNode;
    }
  }, {
    key: "attr",
    value: function attr(element, props, val) {
      if (typeof val == "undefined" && _typeof(props) == "object") {
        for (var prop in props) {
          element.setAttribute(prop, props[prop]);
        }
      } else if (typeof props == "string" && val) {
        element.setAttribute(props, val);
      } else {
        this.log("attr()", "wrong arguments given. Use attr(element, prop, val) or attr(element, { prop: val, ... }) instead.");
      }
    }
  }, {
    key: "css",
    value: function css(element, props, val) {
      if (typeof val == "undefined" && _typeof(props) == "object") {
        for (var prop in props) {
          element.style[prop] = props[prop];
        }
      } else if (typeof props == "string" && val) {
        element.style[props] = val;
      } else {
        this.log("css()", "wrong arguments given. Use css(element, prop, val) or css(element, { prop: val, ... }) instead.");
      }
    }
  }, {
    key: "wrap",
    value: function wrap(element, wrapper) {
      var wrapperElement = typeof wrapper == "string" || typeof wrapper == "undefined" ? document.createElement(wrapper || "div") : wrapper;
      element.parentNode.insertBefore(wrapperElement, element);
      wrapperElement.appendChild(element);
      return wrapperElement;
    }
  }, {
    key: "prependTo",
    value: function prependTo(elementSrc, elementTarget, attributes) {
      return this.addChild(elementSrc, elementTarget, attributes || {}, "top");
    }
  }, {
    key: "appendTo",
    value: function appendTo(elementSrc, elementTarget, attributes) {
      return this.addChild(elementSrc, elementTarget, attributes || {}, "bottom");
    }
  }, {
    key: "next",
    value: function next(element, selector) {
      var sibling = element.nextElementSibling;

      if (!selector) {
        return sibling;
      }

      while (sibling) {
        if (sibling.matches(selector)) {
          return sibling;
        }

        sibling = sibling.nextElementSibling;
      }
    }
  }, {
    key: "prev",
    value: function prev(element, selector) {
      var sibling = element.previousElementSibling;

      if (!selector) {
        return sibling;
      }

      while (sibling) {
        if (sibling.matches(selector)) {
          return sibling;
        }

        sibling = sibling.previousElementSibling;
      }
    }
  }, {
    key: "elements",
    value: function elements(selector) {
      return typeof selector === "string" ? Array.from(document.querySelectorAll(selector)) : selector.constructor.name == "NodeList" ? Array.from(selector) : [selector];
    }
  }, {
    key: "elementsEach",
    value: function elementsEach(selector, func) {
      var elements = this.elements(selector);
      elements.forEach(func); // @ToDo: Alternative??: elements.forEach((fn) => func.call(this, fn));

      return elements;
    }
  }, {
    key: "elementsClone",
    value: function elementsClone(elementSrc, elementTarget) {
      var _this = this;

      var saveCopy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return this.elementsEach(elementSrc ? elementSrc : this.config.elements, function (el) {
        var elClone = el.cloneNode(true),
            elClasslist = Array.from(elClone.classList);

        if (saveCopy) {
          elClasslist.forEach(function (cssClass) {
            elClone.classList.remove(cssClass);
            elClone.classList.add(_this.config.prefix + cssClass);
          });

          if (elClone.id) {
            elClone.id = _this.config.prefix + elClone.id;
          }
        }

        _this.addClass(el, "source");

        _this.addClass(elClone, _this.config.prefix + "target");

        elementTarget.append(elClone);
      });
    }
  }, {
    key: "elementsTarget",
    value: function elementsTarget(selector, func) {// @ToDo: Targets prefixed selectors/id elements (Really Needed?!?!)
    }
  }, {
    key: "elementsFilter",
    value: function elementsFilter(selector) {// @ToDo: Needs to be implemented!! (only if needed?!)
    }
  }, {
    key: "elementBreakpoint",
    value: function elementBreakpoint(element) {} // @ToDo: Return a breakpoint on which the element will definitely break / not fit into the available space
    // (needs to check multiple breakpoints dynamically, how?!?!)
    // Add Event to a Element

  }, {
    key: "on",
    value: function on(selector, eventName, func) {
      // @ToDo: on/off need an ELEMENT STACK (to remove all elements events later on at once if neccessary?!)
      if (eventName) {
        this.elementsEach(selector, function (el) {
          el._events = _typeof(el._events) === "object" ? el._events : {};
          el._events[eventName] = Array.isArray(el._events[eventName]) ? el._events[eventName] : [];

          el._events[eventName].push(func);

          el.addEventListener(eventName, func);
        });
      } else {
        this.error("on()", selector + " - 2nth argument (eventName) is missing.");
      }
    } // Remove Event of a Element

  }, {
    key: "off",
    value: function off(selector, eventName, func) {
      if (eventName) {
        this.elementsEach(selector, function (el) {
          if (func) {
            el.removeEventListener(eventName, func);
            el._events[eventName] = el._events[eventName].filter(function (f) {
              return f.toString() != func.toString();
            });
          } else {
            el._events[eventName].forEach(function (fn) {
              return el.removeEventListener(eventName, fn);
            });

            el._events[eventName] = [];
          }
        });
      } else {
        this.error("off()", selector + " - 2nth argument (eventName) is missing.");
      }
    }
  }, {
    key: "log",
    value: function log(title) {
      if (this.config.debug) {
        var _console;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, [typeof title === "string" && args.length ? this.name + "." + title + ":" : title].concat(args));
      }
    }
  }, {
    key: "logAll",
    value: function logAll() {
      if (this.config.debug) {
        console.groupCollapsed(this.name + " (settings)");
        this.log("config", this.config);

        if (typeof this._eventListObject != "undefined") {
          this.log("events", this._eventListObject("/" + this.name + "/"));
        }

        this.log("ui", this.ui);
        console.groupEnd();
      }
    }
  }, {
    key: "error",
    value: function error(title) {
      if (this.config.debug) {
        var _console2;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        (_console2 = console).error.apply(_console2, [typeof title === "string" && args.length ? this.name + "." + title + ":" : title].concat(args));
      }
    }
  }]);

  return IoUtilities;
}();

var Io =
/*#__PURE__*/
function (_IoUtilities) {
  _inherits(Io, _IoUtilities);

  function Io() {
    var _this2;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Io);

    // Super Class Constructor (needed if you use inheritance)
    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Io).call(this)); // Set Defaults, Options & Config

    _this2.options = options;
    _this2.config = {};
    _this2.ui = {};
    _this2.body = document.body;
    _this2.html = document.documentElement;
    _this2.name = "io";
    _this2.defaults = {
      prefix: _this2.name + "-",
      mqlQuery: false,
      // Object | With Media Query Parameters (use a camelcase css notation),
      elements: [],
      // Array (HTML Elements) | NodeList | String
      debug: false // true | false (default) - Debug Messages

    }; // Merge Plugin Defaults and User Options to one Config
    // (everything is accessible through this.config then)

    _extends(_this2.config, _this2.defaults, _this2.options);

    if (!window.io_events) {
      window.io_events = {};
    } // Logging
    // ToDo: if(use logAll only if the class is directly instantiated){...
    // this.logAll();


    return _this2;
  } // MQL - Public Methods


  _createClass(Io, [{
    key: "mqlManager",
    value: function mqlManager(path, mql, fn) {
      var mqlQuery = mql ? mql : this.config.mqlQuery,
          mQuery = this._mqlQuery(mqlQuery),
          mMatch = this._mqlMatch(mQuery);

      mMatch._fn = fn;
      mMatch._path = this._eventPath(path);
      mMatch.addListener(this._mqlHandler);
      fn.call(this, mMatch);
      this.sub(path, fn, {
        _mql: mMatch
      });
    }
  }, {
    key: "mqlManagerRemove",
    value: function mqlManagerRemove(path) {
      if (path) {
        io._eventListValuesData(path).forEach(function (mql) {
          mql.removeListener(mql._fn);
        });

        this.unsub(path);
      } else {
        this.error("mqlManagerRemove", "No path argument specified or empty");
      }
    } // MQL - Private Methods

  }, {
    key: "_mqlMatch",
    value: function _mqlMatch(mqlQuery) {
      return window.matchMedia(mqlQuery);
    }
  }, {
    key: "_mqlQuery",
    value: function _mqlQuery(mqlObj) {
      var mqlQuery = "";

      for (var m in mqlObj) {
        if (mqlObj[m]) {
          if (mqlQuery.length != 0) {
            mqlQuery += " and ";
          }

          mqlQuery += "(" + m.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ": " + mqlObj[m] + ")";
        }
      }

      return mqlQuery;
    }
  }, {
    key: "_mqlHandler",
    value: function _mqlHandler(mql) {
      if (mql) {
        if (this && this._path) {
          io.pub(this._path, mql);
        } else if (mql._path) {
          io.pub(mql._path, mql);
        } else {
          io.log("_mqlHandler()", "No _path defined");
        }
      } else {
        io.log("_mqlHandler()", "mql argument is undefined");
      }
    } // Pub/Sub Events - Public Methods

  }, {
    key: "pub",
    value: function pub(eventPath) {
      var _this3 = this;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      /* @ToDo: Implementing Async Promises (e.g. async pub(...))?!? */
      // @ToDo: Optimaly _eventListValues(), etc. should use _eventPath() internally instead of const path!
      setTimeout(function () {
        var path = _this3._eventPath(eventPath);

        if (typeof window.io_events[path] !== "undefined") {
          _this3._eventListValuesFunctions(path).forEach(function (fn) {
            if (typeof fn == "function") {
              fn.apply(_this3, args);
            } else if (typeof fn[0] == "function") {
              // Weird IE Behavior
              fn[0].apply(_this3, args);
            } else {
              _this3.log("pub()", fn + "is not a function.");
            }
          });
        } else {
          _this3.log("pub()", path + " does not exist (yet).");
        }
      }, 0);
    }
  }, {
    key: "sub",
    value: function sub(eventPath, fn, data) {
      var path = this._eventPath(eventPath);

      if (typeof fn === "function") {
        window.io_events[path] = typeof window.io_events[path] === "undefined" ? {} : window.io_events[path];

        if (!Array.isArray(window.io_events[path]["_fn"])) {
          window.io_events[path]["_fn"] = [];
        }

        if (data) {
          if (_typeof(data) === "object") {
            if (_typeof(window.io_events[path]["_data"]) === "object") {
              _extends(window.io_events[path]["_data"], data);
            } else {
              window.io_events[path]["_data"] = data;
            }
          } else {
            this.error("sub()", path + " - the data argument has to be of the type object {}");
          }
        }

        window.io_events[path]["_fn"].push(fn);
      } else {
        this.error("sub()", path + " - 2nth argument needs to be a function.");
      }
    }
  }, {
    key: "unsub",
    value: function unsub(eventPath) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var path = this._eventPath(eventPath);

      if (typeof window.io_events[path] !== "undefined") {
        if (fn && typeof window.io_events[path]["_fn"] !== "undefined") {
          window.io_events[path]["_fn"] = window.io_events[path]["_fn"].filter(function (f) {
            return f.toString() != fn.toString();
          });
        } else {
          this._eventListKeys(path).forEach(function (eventP) {
            delete window.io_events[eventP];
          });
        }
      } else {
        this.log("unsub()", path + " does not exist.");
      }
    } // Pub/Sub Events - Private Methods

  }, {
    key: "_eventListKeys",
    value: function _eventListKeys(eventPath) {
      var result = [];

      for (var prop in window.io_events) {
        if (!eventPath || prop.lastIndexOf(eventPath, 0) === 0) {
          result.push(prop);
        }
      }

      return result;
    }
  }, {
    key: "_eventListObject",
    value: function _eventListObject(eventPath) {
      if (eventPath) {
        var result = {};

        this._eventListKeys(eventPath).forEach(function (prop) {
          result[prop] = window.io_events[prop];
        });

        return result;
      }

      return window.io_events;
    }
  }, {
    key: "_eventListValues",
    value: function _eventListValues(eventPath, eventProp) {
      var result = [];

      this._eventListKeys(eventPath).forEach(function (prop) {
        // ToDo: Maybe needs a rewrite (because of "..Values" in general),
        // _fn doesn't have to be used here (maybe another method _eventListFunctions?! Or a filter arg instead?!)
        if (!eventPath || typeof window.io_events[prop][eventProp] !== "undefined") {
          if (Array.isArray(window.io_events[prop][eventProp])) {
            window.io_events[prop][eventProp].forEach(function (fn) {
              return result.push(fn);
            });
          } else if (_typeof(window.io_events[prop][eventProp]) === "object") {
            for (var propObj in window.io_events[prop][eventProp]) {
              result.push(window.io_events[prop][eventProp][propObj]);
            }
          } else {
            result.push(window.io_events[prop][eventProp]);
          }
        }
      });

      return result;
    }
  }, {
    key: "_eventListValuesFunctions",
    value: function _eventListValuesFunctions(eventPath) {
      return this._eventListValues(eventPath, "_fn");
    }
  }, {
    key: "_eventListValuesData",
    value: function _eventListValuesData(eventPath) {
      return this._eventListValues(eventPath, "_data");
    }
  }, {
    key: "_eventPath",
    value: function _eventPath(eventPath) {
      // Relative Event Path (with this.name as prefix)
      return (this.name != "io" && eventPath.lastIndexOf("/" + this.name + "/", 0) === -1 ? "/" + this.name : "") + (eventPath.charAt(0) == "/" ? "" : "/") + eventPath + (eventPath.charAt(eventPath.length - 1) == "/" ? "" : "/");
    }
  }]);

  return Io;
}(IoUtilities);

var io = new Io();

var IoAccordion =
/*#__PURE__*/
function (_Io) {
  _inherits(IoAccordion, _Io);

  function IoAccordion() {
    var _this4;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, IoAccordion);

    // Super Class Constructor (needed if you use inheritance)
    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(IoAccordion).call(this, options)); // Set Defaults, Options & Config

    _this4.name = "ioaccordion"; // Change this to your needs

    _this4.defaults = {
      // All default params are optional, except "prefix"
      prefix: _this4.name + "-",
      // Neccessary (change only if really needed)
      accToggle: ".ioaccordion-toggle",
      accContent: ".ioaccordion-content",
      accContainer: false // Selector (e.g. .ioaccordion-group)

    }; // Merge Plugin Defaults and User Options to one Config
    // (everything is accessible through this.config then)

    _extends(_this4.config, _this4.defaults, _this4.options); // Subscribers


    _this4.sub("/init/", _this4.init);

    _this4.sub("/open/", _this4.openAccordion);

    _this4.sub("/close/", _this4.closeAccordion); // Publishers


    _this4.pub("/init/");

    return _this4;
  }

  _createClass(IoAccordion, [{
    key: "init",
    value: function init() {
      var _this5 = this;

      this.ui.accContainer = this.config.accContainer ? this.elements(this.config.accContainer) : [this.body];
      this.ui.accContent = [];
      this.ui.accToggle = [];
      this.ui.accContainer.forEach(function (accContainer, accContainerCnt) {
        var accToggle = accContainer.querySelectorAll(_this5.config.accToggle);
        var accContent = accContainer.querySelectorAll(_this5.config.accContent);
        var accContentWrapper = [];

        if (_this5.config.debug) {
          _this5.ui.accContent.push(accContent);

          _this5.ui.accToggle.push(accToggle);
        }

        if (accToggle.length != accContent.length) {
          _this5.log("init()[WARNING]", "Different amounts of Accordion Togglers Vs. Contents.", "\naccToggles: ", accToggle, "\naccContents: ", accContent);
        }

        accContent.forEach(function (el) {
          var accW = _this5.wrap(el);

          accW.style.maxHeight = 0;

          _this5.addClass(accW, "content-wrapper");

          accContentWrapper.push(accW);
        }); // @ToDo: Needs some refactoring.. (all in pub/sub needed, +more dynamic, accContentWrapper refactoring..)

        accToggle.forEach(function (el, cnt) {
          var accContentNext = accContent[cnt].parentNode;

          var accContentNextHeight = _this5.heightContent(accContentNext);

          _this5.on(el, "click", function (e) {
            accToggle.forEach(function (accT) {
              if (el != accT) {
                _this5.pub("/close/", accT);
              } else {
                _this5.pub("/open/", accT);
              }
            });
            accContentWrapper.forEach(function (accCW, accIndex) {
              // @ToDo: Replace/Make compatible to pub/sub
              if (cnt == accIndex) {
                _this5.toggleClass(accCW, "-active");

                accCW.style.maxHeight = _this5.height(accCW) == 0 ? accContentNextHeight + "px" : 0;
              } else {
                _this5.removeClass(accCW, "-active");

                accCW.style.maxHeight = 0;
              }
            });
          });
        });
      }); // Logging

      this.logAll();
    }
  }, {
    key: "openAccordion",
    value: function openAccordion(element) {
      this.toggleClass(element, "-active");
    }
  }, {
    key: "closeAccordion",
    value: function closeAccordion(element) {
      this.removeClass(element, "-active");
    }
  }]);

  return IoAccordion;
}(Io);

var IoNav =
/*#__PURE__*/
function (_Io2) {
  _inherits(IoNav, _Io2);

  function IoNav() {
    var _this6;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, IoNav);

    // Super Class Constructor (needed if you use inheritance)
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(IoNav).call(this, options)); // Set Defaults, Options & Config

    _this6.name = "ionav";
    _this6.defaults = {
      prefix: _this6.name + "-",
      mqlQuery: {
        // Media Query Parameters (use a camelcase css notation)
        minWidth: "0px",
        maxWidth: "1024px"
      },
      elementsNav: [],
      // Array (HTML Elements) | NodeList | String (Selector)
      elementsNavCollapsable: true,
      // @ToDo: Still needs to be integrated!!
      buttonTarget: document.body,
      // HTML Element | NodeElement
      buttonElement: "div",
      // HTML Tag Name | NodeElement
      theme: "default" // String (Choose a Theme) - NOT IMPLEMENTED YET!

    }; // Merge Plugin Defaults and User Options to one Config
    // (everything is accessible through this.config then)

    _extends(_this6.config, _this6.defaults, _this6.options); // Initialize Mobi Main-Logic


    _this6.sub("/init/", _this6.init);

    _this6.pub("/init/");

    return _this6;
  }

  _createClass(IoNav, [{
    key: "init",
    value: function init() {
      var _this7 = this;

      // UI Elements
      this.ui.btn = this.prependTo(typeof buttonElement === "string" ? "div" : this.config.buttonElement, this.config.buttonTarget);
      this.ui.overlay = this.prependTo("div", this.body, {
        "class": this.config.prefix + "overlay"
      });
      this.ui.canvas = this.prependTo("div", this.ui.overlay, {
        "class": this.config.prefix + "canvas"
      });
      this.addClass(this.ui.btn, "btn");
      this.addClass(this.html, "-closed"); // Subscribers

      this.sub("/initOverlay/", this.initOverlay);
      this.sub("/initElementsNav/", this.elementsNav);
      this.sub("/openOverlay/", this.openOverlay);
      this.sub("/closeOverlay/", this.closeOverlay);
      this.sub("/toggleOverlay/", this.toggleOverlay);
      this.sub("/destroyOverlay/", this.destroyOverlay);
      this.sub("/destroyAll/", this.destroyAll);
      this.mqlManager("/mqlMain/", this.config.mqlQuery, function (mql) {
        if (mql.matches) {
          // console.log("IS MATCHING");
          _this7.addClass(_this7.html, "-active");
        } else {
          // console.log("IS NOT MATCHING");
          _this7.closeOverlay();

          _this7.removeClass(_this7.html, "-active");
        }
      }); // Publishers & Events

      this.pub("/initOverlay/", this.config.elements);
      this.pub("/initElementsNav/", this.config.elementsNav);
      this.on(this.ui.btn, "click", function () {
        return _this7.pub("/toggleOverlay/");
      });
      this.on(this.ui.overlay, "click", function (e) {
        if (e.target === e.currentTarget) {
          _this7.pub("/closeOverlay/");
        }
      }); // Logging

      this.logAll();
    }
  }, {
    key: "destroyAll",
    value: function destroyAll() {
      this.log("destroyAll()", "Destroying all events and elements");

      for (var prop in this.ui) {
        this.ui[prop].remove();
      }

      this.ui = {};
      this.unsub(this.name);
    }
  }, {
    key: "destroyOverlay",
    value: function destroyOverlay() {
      this.log("destroyOverlay()", "Destroying Overlay and Canvas");
      this.unsub("/initOverlay/");
      this.ui.canvas.remove();
      this.ui.overlay.remove();
      delete this.ui.canvas;
      delete this.ui.overlay;
    }
  }, {
    key: "initOverlay",
    value: function initOverlay(elements) {
      this.log("initOverlay()", "Initializing Overlay");
      this.elementsClone(elements, this.ui.canvas);
    }
  }, {
    key: "toggleOverlay",
    value: function toggleOverlay() {
      this.log("toggleOverlay()", "Toggling Overlay");

      if (this.hasClass(this.html, "-open")) {
        this.pub("/closeOverlay/");
      } else {
        this.pub("/openOverlay/");
      }
    }
  }, {
    key: "openOverlay",
    value: function openOverlay() {
      this.log("openOverlay()", "Opening Overlay");
      this.addClass(this.html, "-open");
      this.removeClass(this.html, "-closed");
    }
  }, {
    key: "closeOverlay",
    value: function closeOverlay() {
      this.log("closeOverlay()", "Closing Overlay");
      this.removeClass(this.html, "-open");
      this.addClass(this.html, "-closed");
    }
  }, {
    key: "elementsNav",
    value: function elementsNav(selector) {
      var _this8 = this;

      document.querySelectorAll(selector).forEach(function (el) {
        el.querySelectorAll("ul li").forEach(function (li) {
          var link = false;
          var subnav = false;
          li.childNodes.forEach(function (node) {
            if (node.tagName == "A") {
              link = node;
            }

            if (node.tagName == "UL") {
              subnav = node;
            }

            if (node.tagName == "A" || node.tagName == "UL") {
              _this8.addClass(node, "-hasSubnav");
            }
          });

          if (link && subnav) {
            _this8.addClass(li, "-hasSubnav");

            _this8.on(link, "click", function (e) {
              e.preventDefault();

              _this8.toggleClass(li, "-active");

              _this8.toggleClass(link, "-active");

              _this8.toggleClass(subnav, "-active");
            });
          }
        });
      });
    }
  }]);

  return IoNav;
}(Io);