(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vueSelectable", [], factory);
	else if(typeof exports === 'object')
		exports["vueSelectable"] = factory();
	else
		root["vueSelectable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.objectAssignSimple = objectAssignSimple;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function objectAssignSimple(target) {
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            if (_typeof(arguments[i]) !== 'object' || arguments[i] === null) {
                continue;
            }
            var keys = Object.keys(arguments[i]);
            for (var j = 0; j < keys.length; j++) {
                target[keys[j]] = arguments[i][keys[j]];
            }
        }
    }

    return target;
}

var objectAssign = Object.assign || objectAssignSimple;

var selectable = function () {

    /**
     * Initializes selection component
     * @param {Object} options misc selection options
     */


    /**
     * Selection frame always adds items to selection, despite "Ctrl" or "Meta" keys being pressed
     * @type {boolean}
     */


    /**
     * Add CSS selectedClass to elements currently selected (w/o framework)
     * @type {boolean}
     */


    /**
     * Enable/disable document scrolling while selecting items, ignored when scrollingFrame is configured
     * @type {boolean}
     */


    /**
     * Speed of scroll (in px per 16ms)
     * @type {number}
     */


    /**
     * Called to set list of items under selection box
     * @type {Function | null}
     */


    /**
     * Called to pass out list of selected items
     * @type {Function | null}
     */


    /**
     * CSS selector of element that limits where selection can be made (has higher priority than boundingBox)
     * @type {HTMLDocument}
     */


    /**
     * Event listeners are attached to this element
     * @type {HTMLDocument}
     */
    function selectable() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, selectable);

        this.selectBox = null;
        this.selectBoxSelector = '.selection';
        this.rootElement = document;
        this.boundingBox = document;
        this.boundingBoxSelector = null;
        this.dragging = false;
        this.startX = null;
        this.startY = null;
        this.endX = null;
        this.endY = null;
        this.selectables = [];
        this.selected = [];
        this.selectedSetter = null;
        this.selectedGetter = null;
        this.selectingSetter = null;
        this.selecting = [];
        this.addMode = false;
        this.disableTextSelection = true;
        this.handlers = {
            mousedown: null,
            mouseup: null,
            mousemove: null
        };
        this.scrollingFrame = null;
        this.scrollSpeed = 10;
        this.scrollDistance = 10;
        this.scrollDocumentEnabled = true;
        this.scrollRepeater = null;
        this.renderSelected = false;
        this.renderSelecting = false;
        this.overrideAddMode = false;
        this.selectingClass = 'selecting';
        this.selectedClass = 'selected';
        this.firstRun = true;

        this.handlers.mousedown = this.mouseDown.bind(this);
        this.handlers.mouseup = this.mouseUp.bind(this);
        this.handlers.mousemove = this.mouseMove.bind(this);

        objectAssign(this, options);

        Object.keys(this.handlers).forEach(function (event) {
            return _this.rootElement.addEventListener(event, _this.handlers[event]);
        });
    }

    /**
     * Removes all registered event handlers and clears references to DOM nodes
     */


    /**
     * Add CSS selectedClass to elements currently under selection box (w/o framework)
     * @type {boolean}
     */


    /**
     *  Timeout ID (from setInterval() call)
     * @type {null|object}
     */


    /**
     * Distance from borders (in px) when scroll begins to work
     * @type {number}
     */


    /**
     * Scrolling element that contains
     * @type {HTMLElement|null}
     */


    /**
     * Called to get list of selected items
     * @type {Function | null}
     */


    /**
     * Element that limits where selection can be made
     * @type {HTMLDocument}
     */


    _createClass(selectable, [{
        key: 'detach',
        value: function detach() {
            var _this2 = this;

            Object.keys(this.handlers).forEach(function (event) {
                return _this2.rootElement.removeEventListener(event, _this2.handlers[event]);
            });
            if (this.disableTextSelection && this.dragging) {
                this.rootElement.removeEventListener('selectstart', selectable.disableTextSelection);
            }
            if (this.scrollRepeater) {
                clearInterval(this.scrollRepeater);
            }
            this.selectables = [];
            this.selectBox = null;
            this.boundingBox = null;
            this.rootElement = null;
            this.scrollingFrame = null;
        }

        /**
         * Updates list of selectable items
         * @param {Element[]} elements
         */

    }, {
        key: 'setSelectables',
        value: function setSelectables(elements) {
            this.selectables = elements;
            this.selected = elements.map(function (i) {
                return false;
            });
            if (typeof this.selectedSetter === 'function') {
                this.selectedSetter(this.selected, this.selected);
            }
        }

        /**
         * Disables text selection (as a default browser action)
         * @param {Event} e
         * @return {boolean}
         */

    }, {
        key: 'mouseDown',


        /**
         * Mouse key down handler
         * @param {MouseEvent} e
         */
        value: function mouseDown(e) {
            if (e.button !== 0) {
                return;
            }
            if (!!this.boundingBoxSelector) {
                this.boundingBox = document.querySelector(this.boundingBoxSelector);
            }
            var bb = selectable.absBox(this.boundingBox);
            if (e.pageX < bb.left || e.pageX > bb.width + bb.left || e.pageY < bb.top || e.pageY > bb.height + bb.top) {
                return;
            }
            if (this.disableTextSelection) {
                this.rootElement.addEventListener('selectstart', selectable.disableTextSelection);
            }
            if (this.scrollRepeater) {
                clearInterval(this.scrollRepeater);
                this.scrollRepeater = null;
            }

            var _bound = this.bound(e),
                _bound2 = _slicedToArray(_bound, 2),
                x = _bound2[0],
                y = _bound2[1];

            this.selectBox = document.querySelector(this.selectBoxSelector);
            if (this.scrollingFrame) {
                y += this.scrollingFrame.scrollTop;
            }
            this.startX = x;
            this.startY = y;
            this.endX = x;
            this.endY = y;
            this.dragging = true;
            this.selecting = this.selectables.map(function (i) {
                return false;
            }); // reset all selection
            if (typeof this.selectingSetter === 'function') {
                this.selectingSetter(this.selecting);
            }
            this.addMode = this.overrideAddMode || e.ctrlKey || e.metaKey;
            if (!this.addMode) {
                this.selected = this.selecting;
                if (typeof this.selectedSetter === 'function') {
                    this.selectedSetter(this.selected, this.selecting);
                }
            } else if (typeof this.selectedGetter === 'function') {
                var gotSelection = this.selectedGetter() || [];
                this.selected = this.selectables.map(function (v, i) {
                    return !!gotSelection[i];
                });
            }
            this.updateSelection();
            this.render();
        }

        /**
         * Mouse key up handler
         * @param {MouseEvent} e
         */

    }, {
        key: 'mouseUp',
        value: function mouseUp(e) {
            var _this3 = this;

            if (this.dragging) {
                if (e.button !== 0) {
                    return;
                }
                if (this.disableTextSelection) {
                    this.rootElement.removeEventListener('selectstart', selectable.disableTextSelection);
                }

                var _bound3 = this.bound(e),
                    _bound4 = _slicedToArray(_bound3, 2),
                    x = _bound4[0],
                    y = _bound4[1];

                this.endX = x;
                this.endY = y;
                if (this.scrollingFrame) {
                    this.endY += this.scrollingFrame.scrollTop;
                }
                if (this.scrollRepeater) {
                    clearInterval(this.scrollRepeater);
                    this.scrollRepeater = null;
                }
                this.dragging = false;
                this.updateSelection();
                if (typeof this.selectedGetter === 'function') {
                    var gotSelection = this.selectedGetter() || [];
                    this.selected = this.selectables.map(function (v, i) {
                        return !!gotSelection[i];
                    });
                }
                if (this.addMode) {
                    var selectingItemsQty = this.selecting.reduce(function (a, i) {
                        return a + i ? 1 : 0;
                    }, 0);
                    var idx = this.selecting.findIndex(function (v) {
                        return !!v;
                    });
                    if (selectingItemsQty === 1 && this.selected[idx]) {
                        this.selected[idx] = false;
                    } else {
                        this.selected = this.selected.map(function (v, i) {
                            return v || _this3.selecting[i];
                        });
                    }
                } else {
                    this.selected = this.selecting;
                }
                if (typeof this.selectedSetter === 'function') {
                    this.selectedSetter(this.selected, this.selecting);
                }
                this.selecting = [];
                if (this.selectingSetter) {
                    this.selectingSetter(this.selecting);
                }
                this.render();
            }
        }

        /**
         * Mouse move handler
         * @param {MouseEvent} e
         */

    }, {
        key: 'mouseMove',
        value: function mouseMove(e) {
            if (this.dragging) {
                var _bound5 = this.bound(e),
                    _bound6 = _slicedToArray(_bound5, 2),
                    x = _bound6[0],
                    y = _bound6[1];

                this.endX = x;
                this.endY = y;
                if (this.scrollRepeater) {
                    clearInterval(this.scrollRepeater);
                    this.scrollRepeater = null;
                }
                if (this.scrollingFrame) {
                    this.endY += this.scrollFrame(e);
                } else if (this.scrollDocumentEnabled) {
                    this.scrollDocument(e);
                }
                this.updateSelection();
                this.render();
            }
        }

        /**
         * Scroll frame with selectable items when mouse reaches one of edges
         * @param {MouseEvent} e
         * @return {int}
         */

    }, {
        key: 'scrollFrame',
        value: function scrollFrame(e) {
            var _this4 = this;

            var sf = this.scrollingFrame;
            var frame = sf.getBoundingClientRect();
            var diff = 0;
            if (e.pageY >= frame.bottom - this.scrollDistance) {
                diff = this.scrollSpeed;
            } else if (e.pageY <= frame.top + this.scrollDistance) {
                diff = -this.scrollSpeed;
            }
            sf.scrollTop += diff;

            // repeat mouse move event if mouse were close to borders
            if (e.pageY >= frame.bottom || e.pageY <= frame.top) {
                if (this.scrollRepeater) {
                    clearInterval(this.scrollRepeater);
                }
                this.scrollRepeater = setInterval(function () {
                    return _this4.mouseMove(e);
                }, 16);
            }

            return sf.scrollTop;
        }

        /**
         * Scroll document with selectable items when mouse reaches one of edges
         * @param {MouseEvent} e
         */

    }, {
        key: 'scrollDocument',
        value: function scrollDocument(e) {
            var _this5 = this;

            var diff = 0;
            if (this.endY <= window.pageYOffset) {
                diff = -this.scrollSpeed;
            } else if (this.endY >= window.pageYOffset + window.innerHeight) {
                diff = this.scrollSpeed;
            }

            if (diff !== 0) {
                window.scrollBy(0, diff);
                if (this.scrollRepeater) {
                    clearInterval(this.scrollRepeater);
                }
                this.scrollRepeater = setInterval(function () {
                    return _this5.mouseMove(e);
                }, 16);
            }
        }

        /**
         * Returns [x, y] coordinates from mouse event limited to selection area
         * @param {MouseEvent} e
         * @return {[int, int]}
         */

    }, {
        key: 'bound',
        value: function bound(e) {
            var bb = selectable.absBox(this.boundingBox);
            return [Math.min(Math.max(bb.left, e.pageX), bb.width + bb.left), Math.min(Math.max(bb.top, e.pageY), bb.height + bb.top)];
        }

        /**
         * Returns element's absolute position (on the page) and size
         * @param {Element} element
         * @return {{top: number, left: number, width: Number, height: Number}}
         */

    }, {
        key: 'updateSelection',


        /**
         * Updates list of selected items (under current selection box)
         */
        value: function updateSelection() {
            var s = this.getSelectionBox();
            s.top -= this.scrollingFrame ? this.scrollingFrame.scrollTop : 0;
            this.selecting = this.selectables.map(selectable.absBox).map(function (b) {
                return Math.abs((s.left - b.left) * 2 + s.width - b.width) < s.width + b.width && Math.abs((s.top - b.top) * 2 + s.height - b.height) < s.height + b.height;
            });
            if (this.selectingSetter) {
                this.selectingSetter(this.selecting);
            }
        }

        /**
         * Gets size and relative position of selection box
         * @return {{left: number, top: number, width: number, height: number}}
         */

    }, {
        key: 'getSelectionBox',
        value: function getSelectionBox() {
            return {
                left: Math.min(this.startX, this.endX),
                top: Math.min(this.startY, this.endY),
                width: Math.abs(this.startX - this.endX),
                height: Math.abs(this.startY - this.endY)
            };
        }

        /**
         * Renders visible state for selectable items
         */

    }, {
        key: 'renderSelection',
        value: function renderSelection() {
            var _this6 = this;

            if (!this.renderSelected && !this.renderSelecting) {
                return;
            }
            this.selectables.forEach(function (e, i) {
                if (_this6.renderSelecting) {
                    if (_this6.dragging && !!_this6.selecting[i]) {
                        e.classList.add(_this6.selectingClass);
                    } else {
                        e.classList.remove(_this6.selectingClass);
                    }
                }
                if (_this6.renderSelected) {
                    if (!_this6.selected[i]) {
                        e.classList.remove(_this6.selectedClass);
                    } else {
                        e.classList.add(_this6.selectedClass);
                    }
                }
            });
        }

        /**
         * Renders current selection state
         */

    }, {
        key: 'render',
        value: function render() {
            var elStyle = this.selectBox.style;
            if (this.dragging) {
                var box = this.getSelectionBox();
                var bb = selectable.absBox(this.boundingBox);
                elStyle.display = 'block';
                if (this.firstRun) {
                    var selectBoxStart = selectable.absBox(this.selectBox);
                    this.selectBoxStartX = bb.left - selectBoxStart.left;
                    this.selectBoxStartY = bb.top - selectBoxStart.top;
                    this.firstRun = false;
                }
                elStyle.left = box.left - bb.left + this.selectBoxStartX + 'px';
                elStyle.top = box.top - bb.top + this.selectBoxStartY - (this.scrollingFrame ? this.scrollingFrame.scrollTop : 0) + 'px';
                elStyle.width = box.width + 'px';
                elStyle.height = box.height + 'px';
            } else {
                elStyle.display = 'none';
            }
            this.renderSelection();
        }
    }], [{
        key: 'disableTextSelection',
        value: function disableTextSelection(e) {
            e.preventDefault();
            return false;
        }
    }, {
        key: 'absBox',
        value: function absBox(element) {
            var box = element.getBoundingClientRect();

            return { top: box.top + window.pageYOffset, left: box.left + window.pageXOffset, width: box.width, height: box.height };
        }
    }]);

    return selectable;
}();

exports.default = selectable;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSelectableItems = setSelectableItems;
exports.setOptions = setOptions;

var _selectable = __webpack_require__(0);

var _selectable2 = _interopRequireDefault(_selectable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectAssign = Object.assign || _selectable.objectAssignSimple;

function initSelectable(el, params, arg) {
    el.selectable = new _selectable2.default(objectAssign({
        boundingBox: !!params.constraint ? document.querySelector(params.constraint) : el,
        selectBoxSelector: params.box || '.selection',
        boundingBoxSelector: params.constraint
    }, arg));
    el.selectable.setSelectables(Array.prototype.slice.call(el.querySelectorAll(params.items || '.selectable')));
}

var vueSelectable = {
    twoWay: false,

    params: ['items', 'box', 'constraint'],

    bind: function bind(el, binding) {
        var arg = void 0,
            params = void 0;
        if (!!el && !!binding) {
            // Vue.js v2
            arg = binding.value;
            params = el.dataset;
            initSelectable(el, params, arg);
        }
    },
    update: function update(value) {
        if (!!this && !!this.el && !this.el.selectable) {
            // Vue.js v1 - init selectable
            initSelectable(this.el, this.el.dataset, value);
        }
    },
    unbind: function unbind(el) {
        if (!el) {
            el = this.el;
        }
        el.selectable.detach();
        el.selectable = null;
    }
};

exports.default = vueSelectable;

/**
 * Allows to change internal selectable items list
 * @param {HTMLElement} el Element where v-selectable directive applied
 * @param {string} itemSelector (optional) CSS selector of elements to be used as selectable items
 * @return {number} number of selectable items or -1 if no selectable component found
 */

function setSelectableItems(el, itemSelector) {
    if (!!el && !!el.selectable && typeof el.selectable.setSelectables === 'function') {
        var items = Array.prototype.slice.call(el.querySelectorAll(itemSelector || el.dataset.items || '.selectable'));
        el.selectable.setSelectables(items);
        return items.length;
    } else {
        return -1;
    }
}

/**
 * Sets options to directive
 * @param {HTMLElement} el Element where v-selectable directive applied
 * @param {object} options
 */
function setOptions(el, options) {
    if (!!el && !!el.selectable && typeof el.selectable.setSelectables === 'function') {
        objectAssign(el.selectable, options);
    }
}

/***/ })
/******/ ]);
});