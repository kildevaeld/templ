(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("orange"), require("eventsjs"));
	else if(typeof define === 'function' && define.amd)
		define(["orange", "eventsjs"], factory);
	else if(typeof exports === 'object')
		exports["templ"] = factory(require("orange"), require("eventsjs"));
	else
		root["templ"] = factory(root["orange"], root["eventsjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var orange_1 = __webpack_require__(1);
	var repository_1 = __webpack_require__(2);
	var vnode = __webpack_require__(3);
	var components = __webpack_require__(16);
	var attributes = __webpack_require__(20);
	var modifiers = __webpack_require__(29);
	var utils = __webpack_require__(30);
	var view_1 = __webpack_require__(31);
	var compiler = __webpack_require__(32);
	var binding_1 = __webpack_require__(34);
	var runloop_1 = __webpack_require__(35);
	exports.version = "$$version$$";
	function attribute(name, attr) {
	    if (typeof attr !== 'function') {
	        attr = utils.extendClass(attributes.BaseAttribute, attr);
	    }
	    attributes[name] = attr;
	}
	exports.attribute = attribute;
	function component(name, cmp) {
	    if (typeof cmp !== 'function') {
	        cmp = utils.extendClass(components.BaseComponent, cmp);
	    }
	    components[name] = cmp;
	}
	exports.component = component;
	function modifier(name, func) {
	    modifiers[name] = func;
	}
	exports.modifier = modifier;
	function compile(str, options) {
	    var vn = vnode,
	        fn = compiler.compile(str);
	    var n = fn(vn.fragment, vn.element, vn.text, vn.comment, vn.dynamic, binding_1.binding);
	    return vn.template(n, orange_1.extend({
	        document: document,
	        viewClass: view_1.View,
	        attributes: new repository_1.Repository(attributes),
	        components: new repository_1.Repository(components),
	        modifiers: modifiers,
	        runloop: new runloop_1.RunLoop()
	    }, options || {}));
	}
	exports.compile = compile;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Repository = function () {
	    function Repository(values) {
	        _classCallCheck(this, Repository);

	        this.values = values || {};
	    }

	    Repository.prototype.set = function set(key, value) {
	        this.values[key] = value;
	    };

	    Repository.prototype.get = function get(key) {
	        return this.values[key];
	    };

	    Repository.prototype.has = function has(key) {
	        return !!this.get(key);
	    };

	    Repository.prototype.delete = function _delete(key) {
	        delete this.values[key];
	    };

	    return Repository;
	}();

	exports.Repository = Repository;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(7));
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	__export(__webpack_require__(12));
	__export(__webpack_require__(15));
	__export(__webpack_require__(13));
	__export(__webpack_require__(6));

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Comment = function () {
	    function Comment(nodeValue) {
	        _classCallCheck(this, Comment);

	        this.nodeType = 8 /* Comment */;
	        this.nodeValue = nodeValue;
	    }

	    Comment.prototype.render = function render(options) {
	        return Promise.resolve(options.document.createComment(this.nodeValue));
	    };

	    return Comment;
	}();

	exports.Comment = Comment;
	exports.comment = function (nodeValue) {
	    return new Comment(nodeValue);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(6);

	var Dynamic = function () {
	    function Dynamic(vnode, bindingClass) {
	        _classCallCheck(this, Dynamic);

	        this.nodeType = -200 /* Dynamic */;
	        this.vnode = vnode;
	        this.bindingClass = bindingClass;
	        this.vnode.parentNode = this;
	    }

	    Dynamic.prototype.render = function render(options, renderers) {
	        if (options.components.has(this.vnode['tagName'])) {
	            return this._renderComponent(options, renderers);
	        } else {
	            return this._renderElement(options, renderers);
	        }
	    };

	    Dynamic.prototype._renderElement = function _renderElement(options, renderers) {
	        var _this = this;

	        return this.vnode.render(options, renderers).then(function (node) {
	            renderers.push(new DynamicRenderer(node, _this.bindingClass, options));
	            return node;
	        });
	    };

	    Dynamic.prototype._renderComponent = function _renderComponent(options, renderers) {
	        var _this2 = this;

	        var _r = [];
	        return this.vnode.render(options, _r).then(function (element) {
	            renderers.push(new DynamicComponentRenderer(_r[0], _this2.bindingClass, options));
	            return element;
	        });
	    };

	    return Dynamic;
	}();

	exports.Dynamic = Dynamic;
	exports.dynamic = function (vnode, bindClass) {
	    return new Dynamic(vnode, bindClass);
	};

	var DynamicComponentRenderer = function () {
	    function DynamicComponentRenderer(renderer, bindingClass, options) {
	        _classCallCheck(this, DynamicComponentRenderer);

	        this.renderer = renderer;
	        this.bindingClass = bindingClass;
	        this.options = options;
	    }

	    DynamicComponentRenderer.prototype.generate = function generate(root, view) {
	        var _this3 = this;

	        return this.renderer.generate(root, view).then(function () {
	            var component = view.bindings[view.bindings.length - 1];
	            view.bindings.splice(view.bindings.indexOf(component), 0, new _this3.bindingClass(component, view));
	        });
	    };

	    return DynamicComponentRenderer;
	}();

	var DynamicRenderer = function () {
	    function DynamicRenderer(node, bindingClass, options) {
	        _classCallCheck(this, DynamicRenderer);

	        this.ref = node;
	        this.bindingClass = bindingClass;
	        this.options = options;
	    }

	    DynamicRenderer.prototype.generate = function generate(root, view) {
	        if (!this._refPath) this._refPath = vnode_1.getNodePath(this.ref);
	        view.bindings.push(new this.bindingClass(vnode_1.getNodeByPath(root, this._refPath), view));
	        return Promise.resolve();
	    };

	    return DynamicRenderer;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	function getNodeByPath(root, path) {
	    var c = root;
	    for (var i = 0, n = path.length; i < n; i++) {
	        c = c.childNodes[path[i]];
	    }
	    return c;
	}
	exports.getNodeByPath = getNodeByPath;
	function getNodePath(node) {
	    var path = [];
	    var p = node.parentNode;
	    var c = node;
	    while (p) {
	        path.unshift(Array.prototype.indexOf.call(p.childNodes, c));
	        c = p;
	        p = p.parentNode;
	        // virtual nodes - must be skipped
	        while (p && p.nodeType > 12) {
	            p = p.parentNode;
	        }
	    }
	    return path;
	}
	exports.getNodePath = getNodePath;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(1);
	var fragmentsection_1 = __webpack_require__(8);
	var nodesection_1 = __webpack_require__(9);

	var Element = function () {
	    function Element(tagName, attributes, children) {
	        _classCallCheck(this, Element);

	        this.nodeType = 1 /* Element */;
	        this.tagName = String(tagName).toLocaleLowerCase();
	        this.childNodes = children;
	        this.attributes = attributes || {};
	        for (var i = 0; i < children.length; i++) {
	            children[i].parentNode = this;
	        }
	    }

	    Element.prototype.render = function render(options, renderers) {
	        var components = options.components; // || {}
	        if (components.has(this.tagName)) {
	            return this._renderComponent(components.get(this.tagName), options, renderers);
	        }
	        return this._renderElement(options, renderers);
	    };

	    Element.prototype.setAttributes = function setAttributes(key, value) {
	        if (typeof key === 'string') {
	            this.attributes[key] = value;
	        } else {
	            orange_1.extend(this.attributes, key);
	        }
	    };

	    Element.prototype._renderComponent = function _renderComponent(component, options, renderers) {
	        var section = new fragmentsection_1.FragmentSection(options.document);
	        renderers.push(new ComponentAttributeRenderer(component, section, this, this._splitAttributes(options), options));
	        return Promise.resolve(section.render());
	    };

	    Element.prototype._renderElement = function _renderElement(options, renderers) {
	        var element = options.document.createElement(this.tagName);
	        var _attr = this._splitAttributes(options);
	        // Set static attributes
	        for (var attrKey in _attr.staticAttributes) {
	            element.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
	        }
	        var r = this.childNodes.map(function (m) {
	            return m.render(options, renderers);
	        });
	        return Promise.all(r).then(function (children) {
	            children.forEach(function (child) {
	                element.appendChild(child);
	            });
	            if (Object.keys(_attr.dynamicAttributes).length) {
	                renderers.push(new ElementAttributeRenderer(new nodesection_1.NodeSection(options.document, element), options, _attr.dynamicAttributes));
	            }
	            return element;
	        });
	        /*for (let child of this.childNodes) {
	          element.appendChild(child.render(options, renderers));
	        }
	        
	        // Set dynamic attributes
	        if (Object.keys(_attr.dynamicAttributes).length) {
	               renderers.push(new ElementAttributeRenderer(new NodeSection(options.document, element), options, _attr.dynamicAttributes))
	        }
	             return element;*/
	    };

	    Element.prototype._splitAttributes = function _splitAttributes(options) {
	        var dynamicAttributes = {};
	        var staticAttributes = {};
	        if (options.attributes) {
	            for (var key in this.attributes) {
	                var attrClass = options.attributes.get(key);
	                if (attrClass && (!attrClass.test || attrClass.test(this, key, this.attributes[key]))) {
	                    dynamicAttributes[key] = this.attributes[key];
	                } else {
	                    staticAttributes[key] = this.attributes[key];
	                }
	            }
	        } else {
	            staticAttributes = this.attributes;
	        }
	        return {
	            dynamicAttributes: dynamicAttributes,
	            staticAttributes: staticAttributes
	        };
	    };

	    return Element;
	}();

	exports.Element = Element;
	exports.element = function (tagName, attributes) {
	    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        children[_key - 2] = arguments[_key];
	    }

	    return new Element(tagName, attributes, children);
	};

	var ComponentAttributeRenderer = function () {
	    function ComponentAttributeRenderer(component, section, element, attr, options) {
	        _classCallCheck(this, ComponentAttributeRenderer);

	        this.section = section;
	        this.componentClass = component;
	        this.element = element;
	        this.options = options;
	        this.attributes = attr.staticAttributes;
	        this.dynamicAttributes = attr.dynamicAttributes;
	    }

	    ComponentAttributeRenderer.prototype.generate = function generate(root, view) {
	        if (!this._marker) this._marker = this.section.createMarker();
	        var ref = new this.componentClass(this._marker.createSection(root), this.element, this.attributes, view);
	        if (Object.keys(this.dynamicAttributes).length) {
	            _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
	        }
	        if (ref.update) view.bindings.push(ref);
	        return ref.initialize();
	    };

	    return ComponentAttributeRenderer;
	}();

	var ElementAttributeRenderer = function () {
	    function ElementAttributeRenderer(section, options, attributes) {
	        _classCallCheck(this, ElementAttributeRenderer);

	        this.section = section;
	        this.options = options;
	        this.attributes = attributes;
	    }

	    ElementAttributeRenderer.prototype.generate = function generate(root, view) {
	        if (!this._marker) this._marker = this.section.createMarker();
	        _hydrateDynamicAttributes(this._marker.findNode(root), this.options, this.attributes, view);
	        return Promise.resolve();
	    };

	    return ElementAttributeRenderer;
	}();

	function _hydrateDynamicAttributes(ref, options, dynamicAttributes, view) {
	    for (var key in dynamicAttributes) {
	        var clazz = options.attributes.get(key);
	        var attr = new clazz(ref, key, dynamicAttributes[key], view);
	        if (attr.update) view.bindings.push(attr);
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(6);

	var FragmentSection = function () {
	    function FragmentSection(document, start, end) {
	        _classCallCheck(this, FragmentSection);

	        this.document = document;
	        this.start = start || document.createTextNode('');
	        this.end = end || document.createTextNode('');
	        if (!this.start.parentNode) {
	            var parent = document.createDocumentFragment();
	            parent.appendChild(this.start);
	            parent.appendChild(this.end);
	            // Chrome bug. If the reference to the newly created dparent
	            // Chrome (v8?) will release it, and the parent will become null;
	            this.__parent = parent;
	        }
	    }

	    FragmentSection.prototype.appendChild = function appendChild(node) {
	        this.end.parentNode.insertBefore(node, this.end);
	    };

	    FragmentSection.prototype.render = function render() {
	        return this.start.parentNode;
	    };

	    FragmentSection.prototype.remove = function remove() {
	        var node = this.removeChildNodes();
	        node.insertBefore(this.start, node.childNodes[0]);
	        node.appendChild(this.end);
	        return this;
	    };

	    FragmentSection.prototype.removeChildNodes = function removeChildNodes() {
	        var node = this.document.createDocumentFragment(),
	            start = this.start;
	        var current = start.nextSibling;
	        var end = this.end;
	        while (current !== end) {
	            node.appendChild(current);
	            current = start.nextSibling;
	        }
	        return node;
	    };

	    FragmentSection.prototype.createMarker = function createMarker() {
	        return new FragmentSectionMarker(this.document, vnode_1.getNodePath(this.start), vnode_1.getNodePath(this.end));
	    };

	    FragmentSection.prototype.clone = function clone() {
	        var parentClone;
	        // fragment?
	        if (this.start.parentNode.nodeType === 11) {
	            parentClone = this.start.parentNode.cloneNode(true);
	        } else {
	            parentClone = this.document.createDocumentFragment();
	            var children = this._getChildNodes();
	            var n = children.length;
	            for (var i = 0; i < n; i++) {
	                parentClone.appendChild(children[i].cloneNode(true));
	            }
	        }
	        var first = parentClone.childNodes[0];
	        var last = parentClone.childNodes[parentClone.childNodes.length - 1];
	        return new FragmentSection(this.document, first, last);
	    };

	    FragmentSection.prototype._getChildNodes = function _getChildNodes() {
	        var current = this.start;
	        var end = this.end.nextSibling;
	        var children = [];
	        while (current !== end) {
	            children.push(current);
	            current = current.nextSibling;
	        }
	        return children;
	    };

	    return FragmentSection;
	}();

	exports.FragmentSection = FragmentSection;

	var FragmentSectionMarker = function () {
	    function FragmentSectionMarker(document, startPath, endPath) {
	        _classCallCheck(this, FragmentSectionMarker);

	        this.document = document;
	        this.startPath = startPath;
	        this.endPath = endPath;
	    }

	    FragmentSectionMarker.prototype.createSection = function createSection(root) {
	        return new FragmentSection(this.document, vnode_1.getNodeByPath(root, this.startPath), vnode_1.getNodeByPath(root, this.endPath));
	    };

	    return FragmentSectionMarker;
	}();

	exports.FragmentSectionMarker = FragmentSectionMarker;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(6);

	var NodeSection = function () {
	    function NodeSection(document, node) {
	        _classCallCheck(this, NodeSection);

	        this.document = document;
	        this.node = node;
	    }

	    NodeSection.prototype.createMarker = function createMarker() {
	        return new NodeSectionMarker(this.document, vnode_1.getNodePath(this.node));
	    };

	    NodeSection.prototype.appendChild = function appendChild(node) {
	        this.node.appendChild(node);
	    };

	    NodeSection.prototype.render = function render() {
	        return this.node;
	    };

	    NodeSection.prototype.remove = function remove() {
	        if (this.node.parentNode) this.node.parentNode.removeChild(this.node);
	    };

	    NodeSection.prototype.removeChildren = function removeChildren() {
	        while (this.node.childNodes.length) {
	            this.node.removeChild(this.node.childNodes[0]);
	        }
	    };

	    NodeSection.prototype.clone = function clone() {
	        return new NodeSection(this.document, this.node.cloneNode(true));
	    };

	    return NodeSection;
	}();

	exports.NodeSection = NodeSection;

	var NodeSectionMarker = function () {
	    function NodeSectionMarker(document, path) {
	        _classCallCheck(this, NodeSectionMarker);

	        this.document = document;
	        this.path = path;
	    }

	    NodeSectionMarker.prototype.createSection = function createSection(root) {
	        return new NodeSection(this.document, this.findNode(root));
	    };

	    NodeSectionMarker.prototype.findNode = function findNode(root) {
	        return vnode_1.getNodeByPath(root, this.path);
	    };

	    return NodeSectionMarker;
	}();

	exports.NodeSectionMarker = NodeSectionMarker;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	/*function iterateSync(list:any[], fn:(child:any) => Promise<any>): Promise<any[]> {
	  return new Promise((resolve, reject) => {
	    var current = 0, length = list.length;
	    var out = [];
	    const next = (err, value) => {
	      if (current == length - 1) {
	        return resolve(out);
	      } else if (err != null) {
	        return reject(err)
	      } else if (err == null && value == null) {

	      }
	    };

	    next(null, null);
	  });
	}*/

	var Fragment = function () {
	    function Fragment(children) {
	        _classCallCheck(this, Fragment);

	        this.nodeType = 11 /* Fragment */;
	        this.childNodes = children;
	        for (var i = 0; i < children.length; i++) {
	            children[i].parentNode = this;
	        }
	    }

	    Fragment.prototype.render = function render(options, renderers) {
	        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
	            var fragment, i, n, child;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            fragment = options.document.createDocumentFragment();
	                            /*let r = this.childNodes.map( c => {
	                              return c.render(options, renderers);
	                            });
	                                   return Promise.all(r)
	                            .then( childs => {
	                              childs.forEach( m => fragment.appendChild(<any>m));
	                              return fragment;
	                            });*/

	                            i = 0, n = this.childNodes.length;

	                        case 2:
	                            if (!(i < n)) {
	                                _context.next = 10;
	                                break;
	                            }

	                            _context.next = 5;
	                            return this.childNodes[i].render(options, renderers);

	                        case 5:
	                            child = _context.sent;

	                            fragment.appendChild(child);

	                        case 7:
	                            i++;
	                            _context.next = 2;
	                            break;

	                        case 10:
	                            return _context.abrupt("return", fragment);

	                        case 11:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    };

	    return Fragment;
	}();

	exports.Fragment = Fragment;
	exports.fragment = function (children) {
	    return new Fragment(children);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var fragmentsection_1 = __webpack_require__(8);
	var nodesection_1 = __webpack_require__(9);
	function section(document, node) {
	    var section = void 0;
	    if (node.nodeType == 11 /* Fragment */) {
	            var frag = new fragmentsection_1.FragmentSection(document);
	            frag.appendChild(node);
	            section = frag;
	        } else {
	        section = new nodesection_1.NodeSection(document, node);
	    }
	    return section;
	}
	exports.section = section;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var section_1 = __webpack_require__(11);
	var view_1 = __webpack_require__(13);

	var Template = function () {
	    function Template(vnode, options) {
	        _classCallCheck(this, Template);

	        this._renderers = [];
	        this.vnode = vnode;
	        /*let node = vnode.render(<any>options, this._renderers);
	        
	        this.section = section(options.document, node)*/
	        this.options = options;
	    }

	    Template.prototype.render = function render(context, options) {
	        var _this = this;

	        return this.vnode.render(this.options, this._renderers).then(function (node) {
	            _this.section = section_1.section(_this.options.document, node);
	            return _this.view(context, options);
	        });
	    };

	    Template.prototype.view = function view(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
	            var sec, DestView, k, view, i, ii;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            if (!(this.section == null)) {
	                                _context.next = 2;
	                                break;
	                            }

	                            throw new Error('must call render before view');

	                        case 2:
	                            sec = this.section.clone();
	                            DestView = this.options.viewClass || view_1.View;

	                            for (k in this.options) {
	                                if (!options[k]) options[k] = this.options[k];
	                            }
	                            view = new DestView(sec, this, context, options);
	                            /*let all = this._renderers.map( r => {
	                                return r.generate(sec.node||sec.start.parentNode,view);
	                            });
	                            
	                            return Promise.all(all)
	                            .then( () => {
	                                return view;
	                            });*/

	                            i = 0, ii = this._renderers.length;

	                        case 7:
	                            if (!(i < ii)) {
	                                _context.next = 13;
	                                break;
	                            }

	                            _context.next = 10;
	                            return this._renderers[i].generate(sec.node || sec.start.parentNode, view);

	                        case 10:
	                            i++;
	                            _context.next = 7;
	                            break;

	                        case 13:
	                            return _context.abrupt('return', view);

	                        case 14:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    };

	    return Template;
	}();

	exports.Template = Template;
	function template(vnode, options) {
	    return new Template(vnode, options);
	}
	exports.template = template;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var eventsjs_1 = __webpack_require__(14);

	var View = function (_eventsjs_1$EventEmit) {
	    _inherits(View, _eventsjs_1$EventEmit);

	    function View(section, template, context, options) {
	        _classCallCheck(this, View);

	        var _this = _possibleConstructorReturn(this, _eventsjs_1$EventEmit.call(this));

	        _this.section = section;
	        _this.template = template;
	        _this.bindings = [];
	        _this._runloop = options.runloop;
	        _this.context = context;
	        return _this;
	    }

	    View.prototype.update = function update() {
	        return Promise.all(this.bindings.map(function (m) {
	            return m.update();
	        })).then(function (v) {
	            return void 0;
	        });
	    };

	    View.prototype.addListener = function addListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        elm.addEventListener(eventName, callback, capture);
	        return callback;
	    };

	    View.prototype.removeListener = function removeListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        elm.removeEventListener(eventName, callback, capture);
	    };

	    View.prototype.render = function render() {
	        return Promise.resolve(this.section.render());
	    };

	    View.prototype.remove = function remove() {
	        for (var _iterator = this.bindings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var binding = _ref;

	            binding.destroy();
	        }
	        return this.section.remove();
	    };

	    return View;
	}(eventsjs_1.EventEmitter);

	exports.View = View;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Text = function () {
	    function Text(nodeValue) {
	        _classCallCheck(this, Text);

	        this.nodeType = -201 /* Text */;
	        this.nodeValue = nodeValue;
	    }

	    Text.prototype.render = function render(options) {
	        return Promise.resolve(options.document.createTextNode(this.nodeValue));
	    };

	    return Text;
	}();

	exports.Text = Text;
	exports.text = function text(nodeValue) {
	    return new Text(nodeValue);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(17));
	__export(__webpack_require__(18));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var template_1 = __webpack_require__(12);
	var fragment_1 = __webpack_require__(10);

	var BaseComponent = function () {
	    function BaseComponent(section, vvnode, attributes, view) {
	        _classCallCheck(this, BaseComponent);

	        this.section = section;
	        this.vnode = vvnode;
	        this.attributes = attributes;
	        this.view = view;
	        this.document = view.template.options.document;
	        if (vvnode.childNodes) this.childTemplate = template_1.template(fragment_1.fragment(vvnode.childNodes), view.template.options);
	        for (var key in attributes) {
	            this.setAttribute(key, attributes[key]);
	        } //this.initialize()
	    }

	    BaseComponent.prototype.initialize = function initialize() {
	        return Promise.resolve();
	    };

	    BaseComponent.prototype.setAttribute = function setAttribute(key, value) {
	        this.attributes[key] = value;
	    };

	    BaseComponent.prototype.removeAttribute = function removeAttribute(key) {
	        this.attributes[key] = void 0;
	    };

	    BaseComponent.prototype.destroy = function destroy() {};

	    return BaseComponent;
	}();

	exports.BaseComponent = BaseComponent;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var component_1 = __webpack_require__(17);
	var action_1 = __webpack_require__(19);
	function _each(target, iterate) {
	    if (!target) return;
	    if (target.forEach) {
	        // use API here since target could be an object
	        target.forEach(iterate);
	    } else {
	        for (var key in target) {
	            if (target.hasOwnProperty(key)) iterate(target[key], key);
	        }
	    }
	}

	var Repeat = function (_component_1$BaseComp) {
	    _inherits(Repeat, _component_1$BaseComp);

	    function Repeat() {
	        _classCallCheck(this, Repeat);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, _component_1$BaseComp.call.apply(_component_1$BaseComp, [this].concat(args)));

	        _this._children = [];
	        return _this;
	    }

	    Repeat.prototype.initialize = function initialize() {
	        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.next = 2;
	                            return this.childTemplate.render({}, {});

	                        case 2:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    };

	    Repeat.prototype.update = function update() {
	        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
	            var as, each, key, n, self, parent, properties, promises, i, ii, model, child;
	            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            as = this['as'];
	                            each = this['each'];
	                            key = this['key'] || "key";
	                            n = 0;
	                            self = this;
	                            parent = this.view;

	                            if (each instanceof action_1.Call) {
	                                each = each.call();
	                            }

	                            if (!(each == null)) {
	                                _context2.next = 9;
	                                break;
	                            }

	                            return _context2.abrupt('return');

	                        case 9:
	                            promises = [];
	                            i = 0, ii = each.length;

	                        case 11:
	                            if (!(i < ii)) {
	                                _context2.next = 31;
	                                break;
	                            }

	                            model = each[i];

	                            if (as) {
	                                properties = {};
	                                properties[key] = i;
	                                properties[as] = model;
	                            } else {
	                                properties = model;
	                            }
	                            properties.parent = self.view.context;
	                            // TODO - provide SAME context here for speed and stability

	                            if (!(n >= self._children.length)) {
	                                _context2.next = 24;
	                                break;
	                            }

	                            _context2.next = 18;
	                            return this.childTemplate.view(properties, {
	                                parent: parent
	                            });

	                        case 18:
	                            child = _context2.sent;

	                            self._children.push(child);
	                            self.section.appendChild(child.section.render());
	                            promises.push(child.render(properties));
	                            _context2.next = 27;
	                            break;

	                        case 24:
	                            child = self._children[n];
	                            child.context = properties;
	                            child.update();

	                        case 27:
	                            n++;

	                        case 28:
	                            i++;
	                            _context2.next = 11;
	                            break;

	                        case 31:
	                            this._children.splice(n).forEach(function (child) {
	                                child.remove();
	                            });
	                            _context2.next = 34;
	                            return promises;

	                        case 34:
	                        case 'end':
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, this);
	        }));
	    };

	    Repeat.prototype.update2 = function update2() {
	        var as = this['as'];
	        var each = this['each'];
	        var key = this['key'] || "key";
	        var n = 0;
	        var self = this;
	        var parent = this.view;
	        var properties;
	        if (each instanceof action_1.Call) {
	            each = each.call();
	        }
	        console.log(each);
	        _each(each, function (model, k) {
	            var child;
	            if (as) {
	                properties = {};
	                properties[key] = k;
	                properties[as] = model;
	            } else {
	                properties = model;
	            }
	            properties.parent = self.view.context;
	            // TODO - provide SAME context here for speed and stability
	            if (n >= self._children.length) {
	                child = self.childTemplate.view(properties, {
	                    parent: parent
	                });
	                self._children.push(child);
	                self.section.appendChild(child.render(properties));
	            } else {
	                child = self._children[n];
	                child.context = properties;
	                child.update();
	            }
	            n++;
	        });
	        this._children.splice(n).forEach(function (child) {
	            child.remove();
	        });
	    };

	    Repeat.prototype.setAttribute = function setAttribute(key, value) {
	        this[key] = value;
	    };

	    return Repeat;
	}(component_1.BaseComponent);

	exports.Repeat = Repeat;
	exports.repeat = Repeat;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(1);

	var Reference = function () {
	    function Reference(view, path, gettable, settable) {
	        _classCallCheck(this, Reference);

	        this.gettable = gettable;
	        this.settable = settable;
	        this.view = view;
	        this.path = path;
	    }

	    Reference.prototype.value = function value(_value) {
	        if (arguments.length === 0) {
	            return this.gettable ? this.view.get(this.path) : void 0;
	        }
	        if (this.settable) this.view.set(this.path, _value);
	    };

	    Reference.prototype.toString = function toString() {
	        return this.view.get(this.path) || '';
	    };

	    _createClass(Reference, [{
	        key: "__classType",
	        get: function get() {
	            return "Reference";
	        }
	    }]);

	    return Reference;
	}();

	exports.Reference = Reference;

	var Assignment = function () {
	    function Assignment(view, path, value) {
	        _classCallCheck(this, Assignment);

	        this.view = view;
	        this.path = path;
	        this.value = value;
	        this.assign = orange_1.bind(this.assign, this);
	        this.toString = orange_1.bind(this.toString, this);
	    }

	    Assignment.prototype.assign = function assign() {
	        this.view.set(this.path, this.value.call(this));
	    };

	    Assignment.prototype.toString = function toString() {
	        var val = this.value.call(this);
	        return val ? String(val) : '';
	    };

	    _createClass(Assignment, [{
	        key: "__classType",
	        get: function get() {
	            return "Assignment";
	        }
	    }]);

	    return Assignment;
	}();

	exports.Assignment = Assignment;

	var Call = function () {
	    function Call(view, keypath, params) {
	        _classCallCheck(this, Call);

	        this.view = view;
	        this.keypath = keypath;
	        this.params = params || [];
	    }

	    Call.prototype.call = function call() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        args = args || [];
	        var fn = this.view.get(this.keypath);
	        if (fn == null || typeof fn !== 'function') {
	            //throw new Error("not exists or not function");
	            return this.view.trigger('error', this, new Error("function does not exists or is not a function"));
	        }
	        return fn.apply(this.view, this.params.concat(args));
	    };

	    Call.prototype.toString = function toString() {
	        var val = this.call();
	        return val ? String(val) : '';
	    };

	    _createClass(Call, [{
	        key: "__classType",
	        get: function get() {
	            return "Call";
	        }
	    }]);

	    return Call;
	}();

	exports.Call = Call;
	function isCall(a) {
	    return a && (a instanceof Call || a.__classType === 'Call');
	}
	exports.isCall = isCall;
	function isReference(a) {
	    return a && (a instanceof Reference || a.__classType === 'Reference');
	}
	exports.isReference = isReference;
	function isAssignment(a) {
	    return a && (a instanceof Assignment || a.__classType === 'Assignment');
	}
	exports.isAssignment = isAssignment;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var value_1 = __webpack_require__(21);
	var event_1 = __webpack_require__(23);
	var style_1 = __webpack_require__(27);
	var focus_1 = __webpack_require__(28);
	__export(__webpack_require__(22));
	exports.value = value_1.ValueAttribute;
	exports.onclick = event_1.ClickAttribute;
	exports.onenter = event_1.OnEnterAttribute;
	exports.onescape = event_1.OnEscapeAttribute;
	exports.onchange = event_1.ChangeAttribute;
	exports.onscroll = event_1.ScrollAttribute;
	exports.onfocus = event_1.OnFocusAttribute;
	exports.onblur = event_1.BlurAttribute;
	exports.checked = value_1.ValueAttribute;
	exports.style = style_1.StyleAttribute;
	exports.focus = focus_1.FocusAttribute;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(22);
	var action_1 = __webpack_require__(19);
	var orange_1 = __webpack_require__(1);
	var _events = ['change', 'keyup', 'input'];

	var ValueAttribute = function (_base_1$BaseAttribute) {
	    _inherits(ValueAttribute, _base_1$BaseAttribute);

	    function ValueAttribute() {
	        _classCallCheck(this, ValueAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    ValueAttribute.prototype.initialize = function initialize() {
	        this._onInput = orange_1.bind(this._onInput, this, null);
	        for (var _iterator = _events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var e = _ref;

	            this.ref.addEventListener(e, this._onInput);
	        }
	    };

	    ValueAttribute.prototype.update = function update() {
	        var model = this.model = this.value;
	        if (!model) return Promise.resolve();
	        if (!model || !action_1.isReference(model)) {
	            return Promise.reject(new Error("input value must be a reference. Make sure you have <~> defined"));
	        }
	        if (model.gettable) {
	            this._elementValue(this._parseValue(model.value()));
	        }
	        return Promise.resolve();
	    };

	    ValueAttribute.prototype._parseValue = function _parseValue(value) {
	        if (value == null || value === "") return void 0;
	        return value;
	    };

	    ValueAttribute.prototype._onInput = function _onInput(event) {
	        clearInterval(this._autocompleteCheckInterval);
	        // ignore some keys
	        if (event && (!event.keyCode || !~[27].indexOf(event.keyCode))) {
	            event.stopPropagation();
	        }
	        var value = this._parseValue(this._elementValue());
	        if (!this.model) return;
	        if (String(this.model.value()) == String(value)) return;
	        this.model.value(value);
	    };

	    ValueAttribute.prototype._elementValue = function _elementValue(value) {
	        var node = this.ref;
	        var isCheckbox = /checkbox/.test(node.type);
	        var isRadio = /radio/.test(node.type);
	        var isRadioOrCheckbox = isCheckbox || isRadio;
	        var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
	        var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
	        var isSelect = /select/i.test(node.nodeName);
	        if (!arguments.length) {
	            if (isCheckbox) {
	                return Boolean(node.checked);
	            } else if (isInput || isSelect) {
	                return node.value || "";
	            } else {
	                return node.innerHTML || "";
	            }
	        }
	        if (value == null) {
	            value = "";
	        } else {
	            clearInterval(this._autocompleteCheckInterval);
	        }
	        if (isRadioOrCheckbox) {
	            if (isRadio) {
	                if (String(value) === String(node.value)) {
	                    node.checked = true;
	                }
	            } else {
	                node.checked = value;
	            }
	        } else if (String(value) !== this._elementValue()) {
	            if (isInput || isSelect) {
	                node.value = value;
	            } else {
	                node.innerHTML = value;
	            }
	        }
	    };

	    return ValueAttribute;
	}(base_1.BaseAttribute);

	exports.ValueAttribute = ValueAttribute;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseAttribute = function () {
	    function BaseAttribute(ref, key, value, view) {
	        _classCallCheck(this, BaseAttribute);

	        this.ref = ref;
	        this.key = key;
	        this.value = value;
	        this.view = view;
	        this.initialize();
	    }

	    BaseAttribute.prototype.initialize = function initialize() {};

	    BaseAttribute.prototype.update = function update() {
	        return Promise.resolve();
	    };

	    BaseAttribute.prototype.destroy = function destroy() {};

	    BaseAttribute.test = function test() {};

	    return BaseAttribute;
	}();

	exports.BaseAttribute = BaseAttribute;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(22);
	var action_1 = __webpack_require__(19);
	var orange_1 = __webpack_require__(1);
	var Debug = __webpack_require__(24);
	var debug = Debug('attributes:event');

	var EventAttribute = function (_base_1$BaseAttribute) {
	    _inherits(EventAttribute, _base_1$BaseAttribute);

	    function EventAttribute() {
	        _classCallCheck(this, EventAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    EventAttribute.prototype.initialize = function initialize() {
	        this._onEvent = orange_1.bind(this._onEvent, this);
	        //if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
	        //debug('added event listener %s: %o', this.event, this.value)
	        //this.view.addListener(<Element>this.ref, this.event, this._onEvent)
	    };

	    EventAttribute.prototype._onEvent = function _onEvent(e) {
	        var self = this;
	        var fn = void 0;
	        if (action_1.isAssignment(this.value)) {
	            fn = this.value.assign;
	        } else {
	            fn = this.value;
	        }
	        if (typeof fn !== 'function' && !action_1.isCall(fn)) {
	            throw new Error('[event] value is not a function or a Callable');
	        }
	        debug('fired event: %s', this._event);
	        if (action_1.isCall(fn)) {
	            fn.call();
	        } else if (typeof fn === 'function') {
	            return fn(e);
	        }
	        e.preventDefault();
	    };

	    EventAttribute.prototype.destroy = function destroy() {
	        debug('removed event listener %s: %o', this._event, this.value);
	        this.view.removeListener(this.ref, this._event, this._onEvent);
	    };

	    _createClass(EventAttribute, [{
	        key: 'event',
	        set: function set(event) {
	            if (this._event) {
	                debug('added event listener %s: %o', this._event, this.value);
	                this.view.removeListener(this.ref, this._event, this._onEvent);
	            }
	            this._event = event;
	            debug('added event listener %s: %o', this._event, this.value);
	            this.view.addListener(this.ref, this._event, this._onEvent);
	        },
	        get: function get() {
	            return this._event;
	        }
	    }]);

	    return EventAttribute;
	}(base_1.BaseAttribute);

	exports.EventAttribute = EventAttribute;

	var KeyCodeAttribute = function (_EventAttribute) {
	    _inherits(KeyCodeAttribute, _EventAttribute);

	    function KeyCodeAttribute(ref, key, value, view) {
	        _classCallCheck(this, KeyCodeAttribute);

	        var _this2 = _possibleConstructorReturn(this, _EventAttribute.call(this, ref, key, value, view));
	        //this.event = "keydown"
	        //this.keyCodes = []


	        _this2.keyCodes = [];
	        _this2.event = "keydown";
	        return _this2;
	    }

	    KeyCodeAttribute.prototype._onEvent = function _onEvent(event) {
	        if (!~this.keyCodes.indexOf(event.keyCode)) {
	            return;
	        }
	        _EventAttribute.prototype._onEvent.call(this, event);
	    };

	    return KeyCodeAttribute;
	}(EventAttribute);

	exports.KeyCodeAttribute = KeyCodeAttribute;

	var ChangeAttribute = function (_EventAttribute2) {
	    _inherits(ChangeAttribute, _EventAttribute2);

	    function ChangeAttribute() {
	        _classCallCheck(this, ChangeAttribute);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this3 = _possibleConstructorReturn(this, _EventAttribute2.call.apply(_EventAttribute2, [this].concat(args)));

	        _this3.event = "change";
	        return _this3;
	    }

	    return ChangeAttribute;
	}(EventAttribute);

	exports.ChangeAttribute = ChangeAttribute;

	var ClickAttribute = function (_EventAttribute3) {
	    _inherits(ClickAttribute, _EventAttribute3);

	    function ClickAttribute() {
	        _classCallCheck(this, ClickAttribute);

	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        var _this4 = _possibleConstructorReturn(this, _EventAttribute3.call.apply(_EventAttribute3, [this].concat(args)));

	        _this4.event = "click";
	        return _this4;
	    }

	    return ClickAttribute;
	}(EventAttribute);

	exports.ClickAttribute = ClickAttribute;

	var ScrollAttribute = function (_EventAttribute4) {
	    _inherits(ScrollAttribute, _EventAttribute4);

	    function ScrollAttribute() {
	        _classCallCheck(this, ScrollAttribute);

	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	        }

	        var _this5 = _possibleConstructorReturn(this, _EventAttribute4.call.apply(_EventAttribute4, [this].concat(args)));

	        _this5.event = "scroll";
	        return _this5;
	    }

	    return ScrollAttribute;
	}(EventAttribute);

	exports.ScrollAttribute = ScrollAttribute;

	var OnFocusAttribute = function (_EventAttribute5) {
	    _inherits(OnFocusAttribute, _EventAttribute5);

	    function OnFocusAttribute() {
	        _classCallCheck(this, OnFocusAttribute);

	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	            args[_key4] = arguments[_key4];
	        }

	        var _this6 = _possibleConstructorReturn(this, _EventAttribute5.call.apply(_EventAttribute5, [this].concat(args)));

	        _this6.event = "focus";
	        return _this6;
	    }

	    return OnFocusAttribute;
	}(EventAttribute);

	exports.OnFocusAttribute = OnFocusAttribute;

	var BlurAttribute = function (_EventAttribute6) {
	    _inherits(BlurAttribute, _EventAttribute6);

	    function BlurAttribute() {
	        _classCallCheck(this, BlurAttribute);

	        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	            args[_key5] = arguments[_key5];
	        }

	        var _this7 = _possibleConstructorReturn(this, _EventAttribute6.call.apply(_EventAttribute6, [this].concat(args)));

	        _this7.event = "blur";
	        return _this7;
	    }

	    return BlurAttribute;
	}(EventAttribute);

	exports.BlurAttribute = BlurAttribute;

	var OnEnterAttribute = function (_KeyCodeAttribute) {
	    _inherits(OnEnterAttribute, _KeyCodeAttribute);

	    function OnEnterAttribute() {
	        _classCallCheck(this, OnEnterAttribute);

	        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	            args[_key6] = arguments[_key6];
	        }

	        var _this8 = _possibleConstructorReturn(this, _KeyCodeAttribute.call.apply(_KeyCodeAttribute, [this].concat(args)));

	        _this8.keyCodes = [13];
	        return _this8;
	    }

	    return OnEnterAttribute;
	}(KeyCodeAttribute);

	exports.OnEnterAttribute = OnEnterAttribute;

	var OnEscapeAttribute = function (_KeyCodeAttribute2) {
	    _inherits(OnEscapeAttribute, _KeyCodeAttribute2);

	    function OnEscapeAttribute() {
	        _classCallCheck(this, OnEscapeAttribute);

	        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	            args[_key7] = arguments[_key7];
	        }

	        var _this9 = _possibleConstructorReturn(this, _KeyCodeAttribute2.call.apply(_KeyCodeAttribute2, [this].concat(args)));

	        _this9.KeyCodes = [27];
	        return _this9;
	    }

	    return OnEscapeAttribute;
	}(KeyCodeAttribute);

	exports.OnEscapeAttribute = OnEscapeAttribute;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(25);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(26);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(22);

	var StyleAttribute = function (_base_1$BaseAttribute) {
	    _inherits(StyleAttribute, _base_1$BaseAttribute);

	    function StyleAttribute() {
	        _classCallCheck(this, StyleAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    StyleAttribute.prototype.initialize = function initialize() {
	        this._currentStyles = {};
	    };

	    StyleAttribute.prototype.update = function update() {
	        var styles = this.value;
	        if (typeof styles === "string") {
	            this.ref.setAttribute("style", styles);
	            return Promise.resolve();
	        }
	        var newStyles = {};
	        for (var name in styles) {
	            var style = styles[name];
	            if (style !== this._currentStyles[name]) {
	                newStyles[name] = this._currentStyles[name] = style || "";
	            }
	        }
	        for (var key in newStyles) {
	            this.ref.style[key] = newStyles[key];
	        }
	        return Promise.resolve();
	    };

	    return StyleAttribute;
	}(base_1.BaseAttribute);

	exports.StyleAttribute = StyleAttribute;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(22);

	var FocusAttribute = function (_base_1$BaseAttribute) {
	    _inherits(FocusAttribute, _base_1$BaseAttribute);

	    function FocusAttribute() {
	        _classCallCheck(this, FocusAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    FocusAttribute.prototype.initialize = function initialize() {};

	    FocusAttribute.prototype.update = function update() {
	        if (!this.value) return Promise.resolve();
	        if (this.ref.focus) {
	            var self = this;
	            //if (!process.browser) return this.node.focus();
	            // focus after being on screen. Need to break out
	            // of animation, so setTimeout is the best option
	            setTimeout(function () {
	                self.ref.focus();
	            }, 1);
	        }
	        return Promise.resolve();
	    };

	    return FocusAttribute;
	}(base_1.BaseAttribute);

	exports.FocusAttribute = FocusAttribute;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	function uppercase(value) {
	    return String(value).toUpperCase();
	}
	exports.uppercase = uppercase;
	function lowercase(value) {
	    return String(value).toLowerCase();
	}
	exports.lowercase = lowercase;
	function titlecase(value) {
	    var str;
	    str = String(value);
	    return str.substr(0, 1).toUpperCase() + str.substr(1);
	}
	exports.titlecase = titlecase;
	function json(value, count, delimiter) {
	    return JSON.stringify.apply(JSON, arguments);
	}
	exports.json = json;
	function isNaN(value) {
	    return isNaN(value);
	}
	exports.isNaN = isNaN;
	exports.round = Math.round;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var orange_1 = __webpack_require__(1);
	/*export function extend(obj: any, ...args: any[]): any {
	  let a, k;
	  for (a of args) {
	    if (a !== Object(a)) continue;
	    for (k in a) obj[k] = a[k];

	  }
	  return obj
	}

	export function slice(obj, ...args): any {
	  return Array.prototype.slice.apply(obj, args)
	}*/
	function extendClass(parent, protoProps, staticProps) {
	  var child;
	  // The constructor function for the new subclass is either defined by you
	  // (the "constructor" property in your `extend` definition), or defaulted
	  // by us to simply call the parent constructor.
	  if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
	    child = protoProps.constructor;
	  } else {
	    child = function child() {
	      return parent.apply(this, arguments);
	    };
	  }
	  // Add static properties to the constructor function, if supplied.
	  orange_1.extend(child, parent, staticProps);
	  // Set the prototype chain to inherit from `parent`, without calling
	  // `parent` constructor function.
	  var Surrogate = function Surrogate() {
	    this.constructor = child;
	  };
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate();
	  // Add prototype properties (instance properties) to the subclass,
	  // if supplied.
	  if (protoProps) orange_1.extend(child.prototype, protoProps);
	  // Set a convenience property in case the parent's prototype is needed
	  // later.
	  child.__super__ = parent.prototype;
	  return child;
	}
	exports.extendClass = extendClass;
	;
	/*export function bind<T extends Function>(method: T, context: any, ...args: any[]): T {
	  if (typeof method !== 'function') throw new Error('method not at function')

	  if (nativeBind != null) return nativeBind.call(method, context, ...args)

	  args = args || []

	  let fnoop = function() { }

	  let fBound = function() {
	    let ctx = this instanceof fnoop ? this : context
	    return method.apply(ctx, args.concat(slice(arguments)))
	  }

	  fnoop.prototype = this.prototype
	  fBound.prototype = new fnoop()

	  return <any>fBound
	}*/
	/*export class Debug {
	  static enable(enabled: boolean, namespace?: string) {
	    for (let k in this.loggers) {
	      if (namespace && k === namespace) {
	        this.loggers[k].enabled = enabled
	      } else if (!namespace) {
	        this.loggers[k].enabled = enabled
	      }
	    }
	  }
	  static loggers: { [key: string]: Debug } = {}
	  static formatters: { [key: string]: (args: any) => string } = {
	    j: function(args: any) {
	      return JSON.stringify(args);
	    }
	  }

	  static create(namespace: string): (...args: any[]) => void {
	    let logger
	    if (this.loggers[namespace]) {
	      logger = this.loggers[namespace]; //.debug
	    } else {
	      logger = new Debug(namespace);
	      this.loggers[namespace] = logger
	    }

	    return bind(logger.debug, logger)
	  }

	  enabled: boolean = false

	  namespace: string
	  constructor(namespace: string) {
	    this.namespace = namespace
	  }

	  debug(...args: any[]) {
	    if (!this.enabled) return;


	    args[0] = this._coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = Debug.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    args = this._formatArgs(args);

	    this._log(...args)

	  }

	  private _log(...args: any[]) {
	    return 'object' === typeof console
	      && console.log
	      && Function.prototype.apply.call(console.log, console, arguments);
	  }

	  private _coerce(val) {
	    if (val instanceof Error) return val.stack || val.message;
	    return val;
	  }

	  private _formatArgs(args): any[] {
	    args[0] = '[templ:' + this.namespace + '] ' + args[0]
	    return args;
	  }
	}

	export function debug(namespace: string): (...args: any[]) => void {
	  return Debug.create(namespace)
	}*/

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var vnode = __webpack_require__(3);
	var action_1 = __webpack_require__(19);
	//import {RunLoop} from './runloop';
	var Debug = __webpack_require__(24);
	var debug = Debug('templ:view');
	function _set(target, keypath, value) {
	    var keys = typeof keypath === "string" ? keypath.split(".") : keypath;
	    var ct = target;
	    var key;
	    for (var i = 0, n = keys.length - 1; i < n; i++) {
	        key = keys[i];
	        if (!ct[key]) {
	            ct[key] = {};
	        }
	        ct = ct[key];
	    }
	    ct[keys[keys.length - 1]] = value;
	    return value;
	}

	var View = function (_vnode$View) {
	    _inherits(View, _vnode$View);

	    function View(section, template, context) {
	        var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	        _classCallCheck(this, View);

	        var _this = _possibleConstructorReturn(this, _vnode$View.call(this, section, template, context, options));

	        _this.context = context;
	        _this._callers = {};
	        _this._getters = {};
	        if (options.parent) {
	            _this.parent = options.parent;
	        }
	        if (options.delegator) {
	            _this._delegator = options.delegator;
	        }
	        //this._runloop = options.runloop;
	        return _this;
	    }

	    View.prototype.getDelegator = function getDelegator() {
	        if (this._delegator) return this._delegator;
	        var parent = this.parent;
	        while (parent != undefined) {
	            if (parent._delegator) return parent._delegator;
	            parent = parent.parent;
	        }
	        return null;
	    };

	    View.prototype.addListener = function addListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        var delegator = this.getDelegator();
	        if (delegator) {
	            return delegator.addListener(elm, eventName, callback, capture);
	        } else if (typeof callback === 'function') {
	            return _vnode$View.prototype.addListener.call(this, elm, eventName, callback, capture);
	        }
	    };

	    View.prototype.removeListener = function removeListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        var delegator = this.getDelegator();
	        if (delegator) {
	            delegator.removeListener(elm, eventName, callback, capture);
	        } else if (typeof callback === 'function') {
	            _vnode$View.prototype.removeListener.call(this, elm, eventName, callback, capture);
	        }
	    };

	    View.prototype.get = function get(keypath) {
	        if (!this.context) return void 0;
	        var pt = typeof keypath !== "string" ? keypath.join(".") : keypath;
	        var v;
	        try {
	            var getter;
	            if (!(getter = this._getters[pt])) {
	                getter = this._getters[pt] = new Function("return this." + pt);
	            }
	            v = getter.call(this.context);
	        } catch (e) {
	            v = void 0;
	        }
	        v = v != void 0 ? v : this.parent ? this.parent.get(keypath) : void 0;
	        debug('get value "%s": %s', keypath, v);
	        return v;
	    };

	    View.prototype.set = function set(path, value) {
	        debug('set value %s on context %j', value, this.context);
	        if (!this.context) return void 0;
	        if (typeof path === "string") path = path.split(".");
	        var ret = _set(this.context, path, value);
	        this.updateLater();
	    };

	    View.prototype.render = function render() {
	        var _this2 = this;

	        //;
	        //var section = super.render()
	        //this.transitions.enter();
	        return _vnode$View.prototype.render.call(this).then(function (section) {
	            return _this2.update();
	        }).then(function () {
	            return _this2.section.render();
	        });
	    };

	    View.prototype.updateLater = function updateLater() {
	        this._runloop.deferOnce(this);
	    };

	    View.prototype.ref = function ref(path, gettable, settable) {
	        debug('reference %s, gettable: %o, settabble: %o', path, gettable, settable);
	        return new action_1.Reference(this, path, gettable, settable);
	    };

	    View.prototype.assign = function assign(path, value) {
	        debug('assignment %s %s', path, value);
	        return new action_1.Assignment(this, path, value);
	    };

	    View.prototype.call = function call(keypath, params) {
	        var caller;
	        var v;
	        debug('call keypath "%s", args: "%o"', keypath, params);
	        if (typeof keypath !== "string") keypath = keypath.join(".");
	        if (!(caller = this._callers[keypath])) {
	            var ctxPath = ["this"].concat(keypath.split("."));
	            ctxPath.pop();
	            caller = this._callers[keypath] = new Function("params", "return this." + keypath + ".apply(" + ctxPath.join(".") + ", params);");
	        }
	        /*try {
	            v = caller.call(this.context, params);
	        } catch (e) {
	            console.error('could not call', e)
	        }
	         return v != void 0 ? v : this.parent ? this.parent.call(keypath, params) : void 0;*/
	        return new action_1.Call(this, keypath, params);
	    };

	    _createClass(View, [{
	        key: 'root',
	        get: function get() {
	            if (this.parent == null) return this;
	            var root = this,
	                tmp = root;
	            while (tmp) {
	                tmp = tmp.parent;
	                if (tmp) root = tmp;
	            }
	            return root;
	        }
	    }]);

	    return View;
	}(vnode.View);

	exports.View = View;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var parser_1 = __webpack_require__(33);
	var orange_1 = __webpack_require__(1);
	function compile(src, options) {
	    var str = transpile(src);
	    return new Function("return " + str)();
	}
	exports.compile = compile;
	function transpile(source) {
	    var transpiler = new Transpiler();
	    return transpiler.transpile(source);
	}
	exports.transpile = transpile;
	/**
	 * Transpile AST to Function
	 */

	var Transpiler = function () {
	    function Transpiler() {
	        _classCallCheck(this, Transpiler);

	        for (var k in this) {
	            if (k.charAt(0) === "_") {
	                //this[k] = this[k].bind(this);
	                this[k] = orange_1.bind(this[k], this);
	            }
	        }
	        this.transpile = orange_1.bind(this.transpile, this);
	    }
	    /**
	     */


	    Transpiler.prototype.transpile = function transpile(source) {
	        return this._root(parser_1.parser.parse(source));
	    };
	    /**
	     */


	    Transpiler.prototype._root = function _root(elements) {
	        var buffer = "(function(fragment, element, text, comment, dynamic, createBindingClass) {";
	        var fragment = "fragment([" + this._children(elements) + "])";
	        buffer += "'use strict';return " + fragment;
	        buffer += "})";
	        return buffer;
	    };
	    /**
	     */


	    Transpiler.prototype._expression = function _expression(expression) {
	        return this["_" + expression[0]](expression);
	    };
	    /**
	     * check for stuff like <li repeat.each={{items}}></li>
	     */


	    Transpiler.prototype._element = function _element(expression) {
	        var exprs = {};
	        var prev = expression;
	        var attrs = [];
	        expression[2].forEach(function (attr, i) {
	            var key = attr[1];
	            var value = attr[2];
	            var keyParts = key.split(".");
	            // check for things like <li repeat.each={{items}}></li>
	            if (keyParts.length > 1) {
	                if (!exprs[keyParts[0]]) {
	                    expression = exprs[keyParts[0]] = ["element", keyParts[0], [], [["element", expression[1], attrs, expression[3]]]];
	                }
	                exprs[keyParts[0]][2].push([attr[0], keyParts[1], value]);
	            } else {
	                attrs.push(attr);
	            }
	        });
	        return this._element2(expression);
	    };
	    /**
	     */


	    Transpiler.prototype._doctype = function _doctype(expression) {
	        return "text('<!DOCTYPE " + expression[1] + ">')";
	    };
	    /**
	     */


	    Transpiler.prototype._children = function _children(children) {
	        var items = [];
	        children = children.concat();
	        while (children.length) {
	            var child = children[children.length - 1];
	            if (child[0] !== "text") break;
	            child[1] = child[1].replace(/[\s\r\n\t]+$/, "");
	            if (/^[\s\r\n\t]*$/.test(child[1])) {
	                children.pop();
	            } else {
	                break;
	            }
	        }
	        return children.map(this._expression).join(", ");
	    };
	    /**
	     */


	    Transpiler.prototype._element2 = function _element2(expression) {
	        var buffer = "element('" + expression[1] + "'";
	        var dynamicAttributes = [];
	        buffer += ", {";
	        var attrs = [];
	        buffer += expression[2].map(function (attr) {
	            var key = attr[1];
	            var value = attr[2];
	            if (!value.length || value.length === 1 && value[0][0] === "string") {
	                return "'" + key + "':" + (value.length ? this._expression(value[0]) : "true");
	            } else {
	                dynamicAttributes.push(attr);
	            }
	        }.bind(this)).filter(function (str) {
	            return !!str;
	        }).join(",");
	        buffer += "}";
	        var childBuffer = this._children(expression[3]);
	        if (childBuffer.length) {
	            buffer += ", " + childBuffer;
	        }
	        buffer += ")";
	        if (dynamicAttributes.length) {
	            var dynamicAttrBuffer = "";
	            var staticAttrBuffer = "";
	            dynamicAttributes.forEach(function (expression) {
	                var type = expression[0];
	                // var key  = _dashToCamelCase(expression[1]);
	                dynamicAttrBuffer += "this";
	                if (type === "block") {
	                    dynamicAttrBuffer += ".ref.nodeValue = " + this._expression(expression[1]);
	                } else if (type === "attribute") {
	                    var value = expression[2].map(function (expr) {
	                        return "(" + this._expression(expr) + ")";
	                    }.bind(this)).join("+");
	                    dynamicAttrBuffer += ".setAttribute('" + expression[1] + "', " + value + ");";
	                } else if (type === "property") {
	                    // dynamicAttrBuffer += ".ref." + expression[1] + "=" + this._expression(expression[2]);
	                    dynamicAttrBuffer += ".setProperty('" + expression[1] + "', " + this._expression(expression[2]) + ");";
	                }
	            }.bind(this));
	            if (dynamicAttrBuffer.length) {
	                dynamicAttrBuffer = "function(context) {" + dynamicAttrBuffer + "}";
	            }
	            if (staticAttrBuffer.length) {
	                staticAttrBuffer = "function() { var self = this; " + staticAttrBuffer + "}";
	            }
	            if (dynamicAttrBuffer.length || staticAttrBuffer.length) {
	                buffer = "dynamic(" + buffer + ",";
	                buffer += "createBindingClass(" + (staticAttrBuffer.length ? staticAttrBuffer : "void 0") + ", " + (dynamicAttrBuffer ? dynamicAttrBuffer : "void 0") + ")";
	                buffer += ")";
	            }
	        }
	        return buffer;
	    };
	    /**
	     */


	    Transpiler.prototype.__addReference = function __addReference(expression) {
	        var name = "_" + ++this._refCounter;
	        this._refs[name] = expression;
	        return name;
	    };
	    /**
	     */


	    Transpiler.prototype._block = function _block(expression) {
	        // TODO - check for unbound expressions here
	        var buffer = "dynamic(text(), createBindingClass(void 0, function(context) {";
	        buffer += "this.ref.nodeValue = " + this._expression(expression[1]) + ";";
	        return buffer + "}))";
	    };
	    /**
	     */


	    Transpiler.prototype._text = function _text(expression) {
	        return "text('" + expression[1] + "')";
	    };
	    /**
	     */


	    Transpiler.prototype._comment = function _comment(expression) {
	        return "comment('" + expression[1] + "')";
	    };
	    /**
	     */


	    Transpiler.prototype._hash = function _hash(expression) {
	        var items = expression[1];
	        var buffer = [];
	        for (var key in items) {
	            buffer.push("'" + key + "':" + this._expression(items[key]));
	        }
	        return "{" + buffer.join(",") + "}";
	    };
	    /**
	     */


	    Transpiler.prototype._script = function _script(expression) {
	        return this._expression(expression[1]);
	    };
	    /**
	     */


	    Transpiler.prototype._referenceKeyPath = function _referenceKeyPath(expression) {
	        var keypath = [];
	        var isDynamic = false;
	        expression.forEach(function (part) {
	            if (typeof part !== "string") {
	                isDynamic = true;
	                // console.log(expression);
	                keypath.push(this._expression(part));
	            } else {
	                keypath.push(part);
	            }
	        }.bind(this));
	        keypath = isDynamic ? "[" + keypath.map(function (part, i) {
	            return typeof expression[i] === "string" ? "'" + part + "'" : part;
	        }).join(",") + "]" : "'" + keypath.join(".") + "'";
	        return keypath;
	    };
	    /**
	     */


	    Transpiler.prototype._reference = function _reference(expression) {
	        var keypath = this._referenceKeyPath(expression[1]);
	        if (expression[2]) {
	            var gettable = !!~expression[2].indexOf("<~");
	            var settable = !!~expression[2].indexOf("~>");
	            return "this.view.ref(" + keypath + ", " + gettable + ", " + settable + ")";
	        }
	        return "this.view.get(" + keypath + ")";
	    };
	    /**
	     */


	    Transpiler.prototype._string = function _string(expression) {
	        return "'" + expression[1] + "'";
	    };
	    /**
	     */


	    Transpiler.prototype._operator = function _operator(expression) {
	        return this._expression(expression[2]) + expression[1] + this._expression(expression[3]);
	    };
	    /**
	     */


	    Transpiler.prototype._condition = function _condition(expression) {
	        return this._expression(expression[1]) + "?" + this._expression(expression[2]) + ":" + this._expression(expression[3]);
	    };
	    /**
	     */


	    Transpiler.prototype._literal = function _literal(expression) {
	        return expression[1];
	    };
	    /**
	     */


	    Transpiler.prototype._not = function _not(expression) {
	        return "!" + this._expression(expression[1]);
	    };
	    /**
	     */


	    Transpiler.prototype._negative = function _negative(expression) {
	        return "-" + this._expression(expression[1]);
	    };
	    /**
	     */


	    Transpiler.prototype._call = function _call(expression) {
	        var buffer = "this.view.call(" + this._referenceKeyPath(expression[1][1]) + ", [";
	        buffer += expression[2].map(this._expression).join(",");
	        return buffer + "])";
	    };
	    /**
	     */


	    Transpiler.prototype._modifier = function _modifier(expression) {
	        return "this.options.modifiers." + expression[1] + "(" + expression[2].map(this._expression).join(",") + ")";
	    };

	    Transpiler.prototype._assign = function _assign(expression) {
	        return 'this.view.assign("' + expression[1][1] + '", ' + 'function () { return ' + this._expression(expression[2]) + ';})';
	    };
	    /**
	     */


	    Transpiler.prototype._group = function _group(expression) {
	        return "(" + this._expression(expression[1]) + ")";
	    };
	    /**
	     */


	    Transpiler.prototype.__findExpressions = function __findExpressions(type, expr) {
	        var exprs = [];
	        this.__traverse(expr, function (expr) {
	            if (expr[0] === type) exprs.push(expr);
	        });
	        return exprs;
	    };
	    /**
	     */


	    Transpiler.prototype.__traverse = function __traverse(expr, iterator) {
	        iterator(expr);
	        expr.forEach(function (v) {
	            if (v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === "object") {
	                this.__traverse(v, iterator);
	            }
	        }.bind(this));
	    };

	    return Transpiler;
	}();
	/**
	 */


	function _dashToCamelCase(string) {
	    return string.split("-").map(function (part, i) {
	        var p = part.toLowerCase();
	        return i > 0 ? p.charAt(0).toUpperCase() + p.substr(1) : p;
	    }).join("");
	}
	/**
	 */

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	exports.parser = function () {
	    "use strict";
	    /*
	     * Generated by PEG.js 0.9.0.
	     *
	     * http://pegjs.org/
	     */

	    function peg$subclass(child, parent) {
	        function ctor() {
	            this.constructor = child;
	        }
	        ctor.prototype = parent.prototype;
	        child.prototype = new ctor();
	    }
	    function peg$SyntaxError(message, expected, found, location) {
	        this.message = message;
	        this.expected = expected;
	        this.found = found;
	        this.location = location;
	        this.name = "SyntaxError";
	        if (typeof Error.captureStackTrace === "function") {
	            Error.captureStackTrace(this, peg$SyntaxError);
	        }
	    }
	    peg$subclass(peg$SyntaxError, Error);
	    function peg$parse(input) {
	        var options = arguments.length > 1 ? arguments[1] : {},
	            parser = this,
	            peg$FAILED = {},
	            peg$startRuleFunctions = { Start: peg$parseStart },
	            peg$startRuleFunction = peg$parseStart,
	            peg$c0 = function peg$c0(children) {
	            return children;
	        },
	            peg$c1 = "<!DOCTYPE",
	            peg$c2 = { type: "literal", value: "<!DOCTYPE", description: "\"<!DOCTYPE\"" },
	            peg$c3 = /^[^>]/,
	            peg$c4 = { type: "class", value: "[^>]", description: "[^>]" },
	            peg$c5 = ">",
	            peg$c6 = { type: "literal", value: ">", description: "\">\"" },
	            peg$c7 = function peg$c7(info) {
	            return ["doctype", info.join("")];
	        },
	            peg$c8 = function peg$c8(children) {
	            return trimTextExpressions(children);
	        },
	            peg$c9 = "<!--",
	            peg$c10 = { type: "literal", value: "<!--", description: "\"<!--\"" },
	            peg$c11 = "-->",
	            peg$c12 = { type: "literal", value: "-->", description: "\"-->\"" },
	            peg$c13 = function peg$c13(v) {
	            return v;
	        },
	            peg$c14 = function peg$c14(value) {
	            return ["comment", escapeString(trimEnds(value.join("")))];
	        },
	            peg$c15 = "<script",
	            peg$c16 = { type: "literal", value: "<script", description: "\"<script\"" },
	            peg$c17 = "</script>",
	            peg$c18 = { type: "literal", value: "</script>", description: "\"</script>\"" },
	            peg$c19 = function peg$c19(attributes, content) {
	            return ["element", "script", attributes, [["text", escapeString(content.join(""))]]];
	        },
	            peg$c20 = function peg$c20() {
	            return text();
	        },
	            peg$c21 = "<",
	            peg$c22 = { type: "literal", value: "<", description: "\"<\"" },
	            peg$c23 = "area",
	            peg$c24 = { type: "literal", value: "area", description: "\"area\"" },
	            peg$c25 = "base",
	            peg$c26 = { type: "literal", value: "base", description: "\"base\"" },
	            peg$c27 = "br",
	            peg$c28 = { type: "literal", value: "br", description: "\"br\"" },
	            peg$c29 = "col",
	            peg$c30 = { type: "literal", value: "col", description: "\"col\"" },
	            peg$c31 = "command",
	            peg$c32 = { type: "literal", value: "command", description: "\"command\"" },
	            peg$c33 = "embed",
	            peg$c34 = { type: "literal", value: "embed", description: "\"embed\"" },
	            peg$c35 = "hr",
	            peg$c36 = { type: "literal", value: "hr", description: "\"hr\"" },
	            peg$c37 = "img",
	            peg$c38 = { type: "literal", value: "img", description: "\"img\"" },
	            peg$c39 = "input",
	            peg$c40 = { type: "literal", value: "input", description: "\"input\"" },
	            peg$c41 = "keygen",
	            peg$c42 = { type: "literal", value: "keygen", description: "\"keygen\"" },
	            peg$c43 = "link",
	            peg$c44 = { type: "literal", value: "link", description: "\"link\"" },
	            peg$c45 = "meta",
	            peg$c46 = { type: "literal", value: "meta", description: "\"meta\"" },
	            peg$c47 = "param",
	            peg$c48 = { type: "literal", value: "param", description: "\"param\"" },
	            peg$c49 = "source",
	            peg$c50 = { type: "literal", value: "source", description: "\"source\"" },
	            peg$c51 = "track",
	            peg$c52 = { type: "literal", value: "track", description: "\"track\"" },
	            peg$c53 = "wbr",
	            peg$c54 = { type: "literal", value: "wbr", description: "\"wbr\"" },
	            peg$c55 = "/>",
	            peg$c56 = { type: "literal", value: "/>", description: "\"/>\"" },
	            peg$c57 = function peg$c57(nodeName, attributes, endTag) {
	            if (endTag && nodeName != endTag.name) {
	                expected("</" + nodeName + ">");
	            }
	            return ["element", nodeName, attributes, []];
	        },
	            peg$c58 = "</",
	            peg$c59 = { type: "literal", value: "</", description: "\"</\"" },
	            peg$c60 = function peg$c60(name) {
	            return {
	                name: name
	            };
	        },
	            peg$c61 = function peg$c61(startTag, children, endTag) {
	            if (startTag.name != endTag.name) {
	                expected("</" + startTag.name + ">");
	            }
	            return ["element", startTag.name, startTag.attributes, children];
	        },
	            peg$c62 = function peg$c62(value) {
	            return ["text", escapeString(trimNewLineChars(value.join("")))];
	        },
	            peg$c63 = "{{",
	            peg$c64 = { type: "literal", value: "{{", description: "\"{{\"" },
	            peg$c65 = function peg$c65(info) {
	            return info;
	        },
	            peg$c66 = function peg$c66(info) {
	            return ["element", info.name, info.attributes, []];
	        },
	            peg$c67 = function peg$c67(name, attrs) {
	            return {
	                name: name,
	                attributes: attrs
	            };
	        },
	            peg$c68 = function peg$c68(attributes) {
	            return attributes;
	        },
	            peg$c69 = /^[a-zA-Z0-9:_.\-]/,
	            peg$c70 = { type: "class", value: "[a-zA-Z0-9:_\\.\\-]", description: "[a-zA-Z0-9:_\\.\\-]" },
	            peg$c71 = function peg$c71(word) {
	            return word.join("");
	        },
	            peg$c72 = "=",
	            peg$c73 = { type: "literal", value: "=", description: "\"=\"" },
	            peg$c74 = function peg$c74(name, values) {
	            return ["attribute", name, values];
	        },
	            peg$c75 = function peg$c75(name, property) {
	            return ["property", name, property];
	        },
	            peg$c76 = function peg$c76(name) {
	            return ['attribute', name, []];
	        },
	            peg$c77 = "\"",
	            peg$c78 = { type: "literal", value: "\"", description: "\"\\\"\"" },
	            peg$c79 = /^[^"]/,
	            peg$c80 = { type: "class", value: "[^\"]", description: "[^\"]" },
	            peg$c81 = function peg$c81() {
	            return ["string", text()];
	        },
	            peg$c82 = function peg$c82(values) {
	            return attrValues(values);
	        },
	            peg$c83 = "'",
	            peg$c84 = { type: "literal", value: "'", description: "\"'\"" },
	            peg$c85 = /^[^']/,
	            peg$c86 = { type: "class", value: "[^']", description: "[^']" },
	            peg$c87 = "}}",
	            peg$c88 = { type: "literal", value: "}}", description: "\"}}\"" },
	            peg$c89 = function peg$c89(value) {
	            return ["script", value];
	        },
	            peg$c90 = function peg$c90(script) {
	            return ["block", script[1]];
	        },
	            peg$c91 = "?",
	            peg$c92 = { type: "literal", value: "?", description: "\"?\"" },
	            peg$c93 = ":",
	            peg$c94 = { type: "literal", value: ":", description: "\":\"" },
	            peg$c95 = function peg$c95(condition, left, right) {
	            return ["condition", condition, left, right];
	        },
	            peg$c96 = "(",
	            peg$c97 = { type: "literal", value: "(", description: "\"(\"" },
	            peg$c98 = ")",
	            peg$c99 = { type: "literal", value: ")", description: "\")\"" },
	            peg$c100 = function peg$c100(params) {
	            return params;
	        },
	            peg$c101 = "()",
	            peg$c102 = { type: "literal", value: "()", description: "\"()\"" },
	            peg$c103 = function peg$c103() {
	            return [];
	        },
	            peg$c104 = ",",
	            peg$c105 = { type: "literal", value: ",", description: "\",\"" },
	            peg$c106 = function peg$c106(param1, rest) {
	            return [param1].concat(rest.map(function (v) {
	                return v[1];
	            }));
	        },
	            peg$c107 = function peg$c107(left, right) {
	            return ["assign", left, right];
	        },
	            peg$c108 = "&&",
	            peg$c109 = { type: "literal", value: "&&", description: "\"&&\"" },
	            peg$c110 = "||",
	            peg$c111 = { type: "literal", value: "||", description: "\"||\"" },
	            peg$c112 = "===",
	            peg$c113 = { type: "literal", value: "===", description: "\"===\"" },
	            peg$c114 = "==",
	            peg$c115 = { type: "literal", value: "==", description: "\"==\"" },
	            peg$c116 = "!==",
	            peg$c117 = { type: "literal", value: "!==", description: "\"!==\"" },
	            peg$c118 = "!=",
	            peg$c119 = { type: "literal", value: "!=", description: "\"!=\"" },
	            peg$c120 = ">==",
	            peg$c121 = { type: "literal", value: ">==", description: "\">==\"" },
	            peg$c122 = ">=",
	            peg$c123 = { type: "literal", value: ">=", description: "\">=\"" },
	            peg$c124 = "<==",
	            peg$c125 = { type: "literal", value: "<==", description: "\"<==\"" },
	            peg$c126 = "<=",
	            peg$c127 = { type: "literal", value: "<=", description: "\"<=\"" },
	            peg$c128 = "+",
	            peg$c129 = { type: "literal", value: "+", description: "\"+\"" },
	            peg$c130 = "-",
	            peg$c131 = { type: "literal", value: "-", description: "\"-\"" },
	            peg$c132 = "%",
	            peg$c133 = { type: "literal", value: "%", description: "\"%\"" },
	            peg$c134 = "*",
	            peg$c135 = { type: "literal", value: "*", description: "\"*\"" },
	            peg$c136 = "/",
	            peg$c137 = { type: "literal", value: "/", description: "\"/\"" },
	            peg$c138 = function peg$c138(left, operator, right) {
	            return ["operator", operator, left, right];
	        },
	            peg$c139 = function peg$c139(value) {
	            return value;
	        },
	            peg$c140 = function peg$c140(expression, modifiers) {
	            for (var i = 0, n = modifiers.length; i < n; i++) {
	                expression = ["modifier", modifiers[i].name, [expression].concat(modifiers[i].parameters)];
	            }
	            return expression;
	        },
	            peg$c141 = "|",
	            peg$c142 = { type: "literal", value: "|", description: "\"|\"" },
	            peg$c143 = function peg$c143(name, parameters) {
	            return {
	                name: name,
	                parameters: parameters || []
	            };
	        },
	            peg$c144 = function peg$c144(context) {
	            return context;
	        },
	            peg$c145 = "!",
	            peg$c146 = { type: "literal", value: "!", description: "\"!\"" },
	            peg$c147 = function peg$c147(not, value) {
	            return ["not", value];
	        },
	            peg$c148 = function peg$c148(not, value) {
	            return ["negative", value];
	        },
	            peg$c149 = /^[0-9]/,
	            peg$c150 = { type: "class", value: "[0-9]", description: "[0-9]" },
	            peg$c151 = function peg$c151(value) {
	            return ["literal", parseFloat(text())];
	        },
	            peg$c152 = ".",
	            peg$c153 = { type: "literal", value: ".", description: "\".\"" },
	            peg$c154 = function peg$c154(group) {
	            return ["group", group];
	        },
	            peg$c155 = function peg$c155(expression) {
	            return expression;
	        },
	            peg$c156 = "true",
	            peg$c157 = { type: "literal", value: "true", description: "\"true\"" },
	            peg$c158 = "false",
	            peg$c159 = { type: "literal", value: "false", description: "\"false\"" },
	            peg$c160 = function peg$c160(value) {
	            return ["literal", value === "true"];
	        },
	            peg$c161 = "undefined",
	            peg$c162 = { type: "literal", value: "undefined", description: "\"undefined\"" },
	            peg$c163 = function peg$c163() {
	            return ["literal", void 0];
	        },
	            peg$c164 = "NaN",
	            peg$c165 = { type: "literal", value: "NaN", description: "\"NaN\"" },
	            peg$c166 = function peg$c166() {
	            return ["literal", NaN];
	        },
	            peg$c167 = "Infinity",
	            peg$c168 = { type: "literal", value: "Infinity", description: "\"Infinity\"" },
	            peg$c169 = function peg$c169() {
	            return ["literal", Infinity];
	        },
	            peg$c170 = "null",
	            peg$c171 = { type: "literal", value: "null", description: "\"null\"" },
	            peg$c172 = "NULL",
	            peg$c173 = { type: "literal", value: "NULL", description: "\"NULL\"" },
	            peg$c174 = function peg$c174() {
	            return ["literal", null];
	        },
	            peg$c175 = function peg$c175(reference, parameters) {
	            return ["call", reference, parameters];
	        },
	            peg$c176 = "^",
	            peg$c177 = { type: "literal", value: "^", description: "\"^\"" },
	            peg$c178 = "~>",
	            peg$c179 = { type: "literal", value: "~>", description: "\"~>\"" },
	            peg$c180 = "<~>",
	            peg$c181 = { type: "literal", value: "<~>", description: "\"<~>\"" },
	            peg$c182 = "~",
	            peg$c183 = { type: "literal", value: "~", description: "\"~\"" },
	            peg$c184 = "<~",
	            peg$c185 = { type: "literal", value: "<~", description: "\"<~\"" },
	            peg$c186 = function peg$c186(bindingType, reference, path) {
	            return ["reference", [reference].concat(path), bindingType];
	        },
	            peg$c187 = function peg$c187(name) {
	            return name;
	        },
	            peg$c188 = "[",
	            peg$c189 = { type: "literal", value: "[", description: "\"[\"" },
	            peg$c190 = "]",
	            peg$c191 = { type: "literal", value: "]", description: "\"]\"" },
	            peg$c192 = function peg$c192(key) {
	            return key;
	        },
	            peg$c193 = /^[a-zA-Z_$0-9]/,
	            peg$c194 = { type: "class", value: "[a-zA-Z_$0-9]", description: "[a-zA-Z_$0-9]" },
	            peg$c195 = function peg$c195(name) {
	            return text();
	        },
	            peg$c196 = "{",
	            peg$c197 = { type: "literal", value: "{", description: "\"{\"" },
	            peg$c198 = "}",
	            peg$c199 = { type: "literal", value: "}", description: "\"}\"" },
	            peg$c200 = function peg$c200(values) {
	            return ["hash", values];
	        },
	            peg$c201 = function peg$c201(values) {
	            var s = {};
	            for (var i = 0, n = values.length; i < n; i++) {
	                s[values[i].key] = values[i].value;
	            }
	            return s;
	        },
	            peg$c202 = function peg$c202(firstValue, additionalValues) {
	            return [firstValue].concat(additionalValues.length ? additionalValues[0][1] : []);
	        },
	            peg$c203 = function peg$c203(key, value) {
	            return {
	                key: key,
	                value: value
	            };
	        },
	            peg$c204 = function peg$c204(key) {
	            return key[1];
	        },
	            peg$c205 = function peg$c205(key) {
	            return key;
	        },
	            peg$c206 = { type: "other", description: "string" },
	            peg$c207 = function peg$c207(chars) {
	            return ["string", chars.join("")];
	        },
	            peg$c208 = "\\",
	            peg$c209 = { type: "literal", value: "\\", description: "\"\\\\\"" },
	            peg$c210 = function peg$c210() {
	            return text();
	        },
	            peg$c211 = "\\\"",
	            peg$c212 = { type: "literal", value: "\\\"", description: "\"\\\\\\\"\"" },
	            peg$c213 = "\\'",
	            peg$c214 = { type: "literal", value: "\\'", description: "\"\\\\'\"" },
	            peg$c215 = { type: "any", description: "any character" },
	            peg$c216 = /^[a-zA-Z]/,
	            peg$c217 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
	            peg$c218 = function peg$c218(chars) {
	            return chars.join("");
	        },
	            peg$c219 = /^[ \n\r\t]/,
	            peg$c220 = { type: "class", value: "[ \\n\\r\\t]", description: "[ \\n\\r\\t]" },
	            peg$currPos = 0,
	            peg$savedPos = 0,
	            peg$posDetailsCache = [{ line: 1, column: 1, seenCR: false }],
	            peg$maxFailPos = 0,
	            peg$maxFailExpected = [],
	            peg$silentFails = 0,
	            peg$result;
	        if ("startRule" in options) {
	            if (!(options.startRule in peg$startRuleFunctions)) {
	                throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	            }
	            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
	        }
	        function text() {
	            return input.substring(peg$savedPos, peg$currPos);
	        }
	        function location() {
	            return peg$computeLocation(peg$savedPos, peg$currPos);
	        }
	        function expected(description) {
	            throw peg$buildException(null, [{ type: "other", description: description }], input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
	        }
	        function error(message) {
	            throw peg$buildException(message, null, input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
	        }
	        function peg$computePosDetails(pos) {
	            var details = peg$posDetailsCache[pos],
	                p,
	                ch;
	            if (details) {
	                return details;
	            } else {
	                p = pos - 1;
	                while (!peg$posDetailsCache[p]) {
	                    p--;
	                }
	                details = peg$posDetailsCache[p];
	                details = {
	                    line: details.line,
	                    column: details.column,
	                    seenCR: details.seenCR
	                };
	                while (p < pos) {
	                    ch = input.charAt(p);
	                    if (ch === "\n") {
	                        if (!details.seenCR) {
	                            details.line++;
	                        }
	                        details.column = 1;
	                        details.seenCR = false;
	                    } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	                        details.line++;
	                        details.column = 1;
	                        details.seenCR = true;
	                    } else {
	                        details.column++;
	                        details.seenCR = false;
	                    }
	                    p++;
	                }
	                peg$posDetailsCache[pos] = details;
	                return details;
	            }
	        }
	        function peg$computeLocation(startPos, endPos) {
	            var startPosDetails = peg$computePosDetails(startPos),
	                endPosDetails = peg$computePosDetails(endPos);
	            return {
	                start: {
	                    offset: startPos,
	                    line: startPosDetails.line,
	                    column: startPosDetails.column
	                },
	                end: {
	                    offset: endPos,
	                    line: endPosDetails.line,
	                    column: endPosDetails.column
	                }
	            };
	        }
	        function peg$fail(expected) {
	            if (peg$currPos < peg$maxFailPos) {
	                return;
	            }
	            if (peg$currPos > peg$maxFailPos) {
	                peg$maxFailPos = peg$currPos;
	                peg$maxFailExpected = [];
	            }
	            peg$maxFailExpected.push(expected);
	        }
	        function peg$buildException(message, expected, found, location) {
	            function cleanupExpected(expected) {
	                var i = 1;
	                expected.sort(function (a, b) {
	                    if (a.description < b.description) {
	                        return -1;
	                    } else if (a.description > b.description) {
	                        return 1;
	                    } else {
	                        return 0;
	                    }
	                });
	                while (i < expected.length) {
	                    if (expected[i - 1] === expected[i]) {
	                        expected.splice(i, 1);
	                    } else {
	                        i++;
	                    }
	                }
	            }
	            function buildMessage(expected, found) {
	                function stringEscape(s) {
	                    function hex(ch) {
	                        return ch.charCodeAt(0).toString(16).toUpperCase();
	                    }
	                    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
	                        return '\\x0' + hex(ch);
	                    }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
	                        return '\\x' + hex(ch);
	                    }).replace(/[\u0100-\u0FFF]/g, function (ch) {
	                        return "\\u0" + hex(ch);
	                    }).replace(/[\u1000-\uFFFF]/g, function (ch) {
	                        return "\\u" + hex(ch);
	                    });
	                }
	                var expectedDescs = new Array(expected.length),
	                    expectedDesc,
	                    foundDesc,
	                    i;
	                for (i = 0; i < expected.length; i++) {
	                    expectedDescs[i] = expected[i].description;
	                }
	                expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
	                foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
	                return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	            }
	            if (expected !== null) {
	                cleanupExpected(expected);
	            }
	            return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
	        }
	        function peg$parseStart() {
	            var s0;
	            s0 = peg$parseTemplate();
	            return s0;
	        }
	        function peg$parseTemplate() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseChildNodes();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c0(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseDocType() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 9) === peg$c1) {
	                s1 = peg$c1;
	                peg$currPos += 9;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c2);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = [];
	                    if (peg$c3.test(input.charAt(peg$currPos))) {
	                        s4 = input.charAt(peg$currPos);
	                        peg$currPos++;
	                    } else {
	                        s4 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c4);
	                        }
	                    }
	                    if (s4 !== peg$FAILED) {
	                        while (s4 !== peg$FAILED) {
	                            s3.push(s4);
	                            if (peg$c3.test(input.charAt(peg$currPos))) {
	                                s4 = input.charAt(peg$currPos);
	                                peg$currPos++;
	                            } else {
	                                s4 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c4);
	                                }
	                            }
	                        }
	                    } else {
	                        s3 = peg$FAILED;
	                    }
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 62) {
	                                s5 = peg$c5;
	                                peg$currPos++;
	                            } else {
	                                s5 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c6);
	                                }
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c7(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseChildNodes() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            s2 = peg$parseVoidElement();
	            if (s2 === peg$FAILED) {
	                s2 = peg$parseScriptStart();
	                if (s2 === peg$FAILED) {
	                    s2 = peg$parseElementNode();
	                    if (s2 === peg$FAILED) {
	                        s2 = peg$parseCommentNode();
	                        if (s2 === peg$FAILED) {
	                            s2 = peg$parseTextNode();
	                            if (s2 === peg$FAILED) {
	                                s2 = peg$parseBlockBinding();
	                            }
	                        }
	                    }
	                }
	            }
	            while (s2 !== peg$FAILED) {
	                s1.push(s2);
	                s2 = peg$parseVoidElement();
	                if (s2 === peg$FAILED) {
	                    s2 = peg$parseScriptStart();
	                    if (s2 === peg$FAILED) {
	                        s2 = peg$parseElementNode();
	                        if (s2 === peg$FAILED) {
	                            s2 = peg$parseCommentNode();
	                            if (s2 === peg$FAILED) {
	                                s2 = peg$parseTextNode();
	                                if (s2 === peg$FAILED) {
	                                    s2 = peg$parseBlockBinding();
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c8(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseCommentNode() {
	            var s0, s1, s2, s3, s4, s5, s6;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 4) === peg$c9) {
	                    s2 = peg$c9;
	                    peg$currPos += 4;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c10);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = [];
	                    s4 = peg$currPos;
	                    s5 = peg$currPos;
	                    peg$silentFails++;
	                    if (input.substr(peg$currPos, 3) === peg$c11) {
	                        s6 = peg$c11;
	                        peg$currPos += 3;
	                    } else {
	                        s6 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c12);
	                        }
	                    }
	                    peg$silentFails--;
	                    if (s6 === peg$FAILED) {
	                        s5 = void 0;
	                    } else {
	                        peg$currPos = s5;
	                        s5 = peg$FAILED;
	                    }
	                    if (s5 !== peg$FAILED) {
	                        s6 = peg$parseSourceCharacter();
	                        if (s6 !== peg$FAILED) {
	                            peg$savedPos = s4;
	                            s5 = peg$c13(s6);
	                            s4 = s5;
	                        } else {
	                            peg$currPos = s4;
	                            s4 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s4;
	                        s4 = peg$FAILED;
	                    }
	                    if (s4 !== peg$FAILED) {
	                        while (s4 !== peg$FAILED) {
	                            s3.push(s4);
	                            s4 = peg$currPos;
	                            s5 = peg$currPos;
	                            peg$silentFails++;
	                            if (input.substr(peg$currPos, 3) === peg$c11) {
	                                s6 = peg$c11;
	                                peg$currPos += 3;
	                            } else {
	                                s6 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c12);
	                                }
	                            }
	                            peg$silentFails--;
	                            if (s6 === peg$FAILED) {
	                                s5 = void 0;
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                s6 = peg$parseSourceCharacter();
	                                if (s6 !== peg$FAILED) {
	                                    peg$savedPos = s4;
	                                    s5 = peg$c13(s6);
	                                    s4 = s5;
	                                } else {
	                                    peg$currPos = s4;
	                                    s4 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s4;
	                                s4 = peg$FAILED;
	                            }
	                        }
	                    } else {
	                        s3 = peg$FAILED;
	                    }
	                    if (s3 !== peg$FAILED) {
	                        if (input.substr(peg$currPos, 3) === peg$c11) {
	                            s4 = peg$c11;
	                            peg$currPos += 3;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c12);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c14(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseDocType();
	            }
	            return s0;
	        }
	        function peg$parseScriptStart() {
	            var s0, s1, s2, s3, s4, s5, s6, s7;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 7) === peg$c15) {
	                    s2 = peg$c15;
	                    peg$currPos += 7;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c16);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagAttributes();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = [];
	                            s6 = peg$parseScriptEnd();
	                            if (s6 !== peg$FAILED) {
	                                while (s6 !== peg$FAILED) {
	                                    s5.push(s6);
	                                    s6 = peg$parseScriptEnd();
	                                }
	                            } else {
	                                s5 = peg$FAILED;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                if (input.substr(peg$currPos, 9) === peg$c17) {
	                                    s6 = peg$c17;
	                                    peg$currPos += 9;
	                                } else {
	                                    s6 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c18);
	                                    }
	                                }
	                                if (s6 !== peg$FAILED) {
	                                    s7 = peg$parse_();
	                                    if (s7 !== peg$FAILED) {
	                                        peg$savedPos = s0;
	                                        s1 = peg$c19(s3, s5);
	                                        s0 = s1;
	                                    } else {
	                                        peg$currPos = s0;
	                                        s0 = peg$FAILED;
	                                    }
	                                } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseScriptEnd() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.substr(peg$currPos, 9) === peg$c17) {
	                s2 = peg$c17;
	                peg$currPos += 9;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c18);
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c20();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseVoidElement() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 60) {
	                s1 = peg$c21;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c22);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 4) === peg$c23) {
	                    s2 = peg$c23;
	                    peg$currPos += 4;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c24);
	                    }
	                }
	                if (s2 === peg$FAILED) {
	                    if (input.substr(peg$currPos, 4) === peg$c25) {
	                        s2 = peg$c25;
	                        peg$currPos += 4;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c26);
	                        }
	                    }
	                    if (s2 === peg$FAILED) {
	                        if (input.substr(peg$currPos, 2) === peg$c27) {
	                            s2 = peg$c27;
	                            peg$currPos += 2;
	                        } else {
	                            s2 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c28);
	                            }
	                        }
	                        if (s2 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 3) === peg$c29) {
	                                s2 = peg$c29;
	                                peg$currPos += 3;
	                            } else {
	                                s2 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c30);
	                                }
	                            }
	                            if (s2 === peg$FAILED) {
	                                if (input.substr(peg$currPos, 7) === peg$c31) {
	                                    s2 = peg$c31;
	                                    peg$currPos += 7;
	                                } else {
	                                    s2 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c32);
	                                    }
	                                }
	                                if (s2 === peg$FAILED) {
	                                    if (input.substr(peg$currPos, 5) === peg$c33) {
	                                        s2 = peg$c33;
	                                        peg$currPos += 5;
	                                    } else {
	                                        s2 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c34);
	                                        }
	                                    }
	                                    if (s2 === peg$FAILED) {
	                                        if (input.substr(peg$currPos, 2) === peg$c35) {
	                                            s2 = peg$c35;
	                                            peg$currPos += 2;
	                                        } else {
	                                            s2 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c36);
	                                            }
	                                        }
	                                        if (s2 === peg$FAILED) {
	                                            if (input.substr(peg$currPos, 3) === peg$c37) {
	                                                s2 = peg$c37;
	                                                peg$currPos += 3;
	                                            } else {
	                                                s2 = peg$FAILED;
	                                                if (peg$silentFails === 0) {
	                                                    peg$fail(peg$c38);
	                                                }
	                                            }
	                                            if (s2 === peg$FAILED) {
	                                                if (input.substr(peg$currPos, 5) === peg$c39) {
	                                                    s2 = peg$c39;
	                                                    peg$currPos += 5;
	                                                } else {
	                                                    s2 = peg$FAILED;
	                                                    if (peg$silentFails === 0) {
	                                                        peg$fail(peg$c40);
	                                                    }
	                                                }
	                                                if (s2 === peg$FAILED) {
	                                                    if (input.substr(peg$currPos, 6) === peg$c41) {
	                                                        s2 = peg$c41;
	                                                        peg$currPos += 6;
	                                                    } else {
	                                                        s2 = peg$FAILED;
	                                                        if (peg$silentFails === 0) {
	                                                            peg$fail(peg$c42);
	                                                        }
	                                                    }
	                                                    if (s2 === peg$FAILED) {
	                                                        if (input.substr(peg$currPos, 4) === peg$c43) {
	                                                            s2 = peg$c43;
	                                                            peg$currPos += 4;
	                                                        } else {
	                                                            s2 = peg$FAILED;
	                                                            if (peg$silentFails === 0) {
	                                                                peg$fail(peg$c44);
	                                                            }
	                                                        }
	                                                        if (s2 === peg$FAILED) {
	                                                            if (input.substr(peg$currPos, 4) === peg$c45) {
	                                                                s2 = peg$c45;
	                                                                peg$currPos += 4;
	                                                            } else {
	                                                                s2 = peg$FAILED;
	                                                                if (peg$silentFails === 0) {
	                                                                    peg$fail(peg$c46);
	                                                                }
	                                                            }
	                                                            if (s2 === peg$FAILED) {
	                                                                if (input.substr(peg$currPos, 5) === peg$c47) {
	                                                                    s2 = peg$c47;
	                                                                    peg$currPos += 5;
	                                                                } else {
	                                                                    s2 = peg$FAILED;
	                                                                    if (peg$silentFails === 0) {
	                                                                        peg$fail(peg$c48);
	                                                                    }
	                                                                }
	                                                                if (s2 === peg$FAILED) {
	                                                                    if (input.substr(peg$currPos, 6) === peg$c49) {
	                                                                        s2 = peg$c49;
	                                                                        peg$currPos += 6;
	                                                                    } else {
	                                                                        s2 = peg$FAILED;
	                                                                        if (peg$silentFails === 0) {
	                                                                            peg$fail(peg$c50);
	                                                                        }
	                                                                    }
	                                                                    if (s2 === peg$FAILED) {
	                                                                        if (input.substr(peg$currPos, 5) === peg$c51) {
	                                                                            s2 = peg$c51;
	                                                                            peg$currPos += 5;
	                                                                        } else {
	                                                                            s2 = peg$FAILED;
	                                                                            if (peg$silentFails === 0) {
	                                                                                peg$fail(peg$c52);
	                                                                            }
	                                                                        }
	                                                                        if (s2 === peg$FAILED) {
	                                                                            if (input.substr(peg$currPos, 3) === peg$c53) {
	                                                                                s2 = peg$c53;
	                                                                                peg$currPos += 3;
	                                                                            } else {
	                                                                                s2 = peg$FAILED;
	                                                                                if (peg$silentFails === 0) {
	                                                                                    peg$fail(peg$c54);
	                                                                                }
	                                                                            }
	                                                                        }
	                                                                    }
	                                                                }
	                                                            }
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagAttributes();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c55) {
	                                s4 = peg$c55;
	                                peg$currPos += 2;
	                            } else {
	                                s4 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c56);
	                                }
	                            }
	                        }
	                        if (s4 === peg$FAILED) {
	                            s4 = null;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseEndVoidTag();
	                            if (s5 === peg$FAILED) {
	                                s5 = null;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c57(s2, s3, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseEndVoidTag() {
	            var s0, s1, s2, s3, s4;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c58) {
	                    s2 = peg$c58;
	                    peg$currPos += 2;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c59);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    if (input.substr(peg$currPos, 4) === peg$c23) {
	                        s3 = peg$c23;
	                        peg$currPos += 4;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c24);
	                        }
	                    }
	                    if (s3 === peg$FAILED) {
	                        if (input.substr(peg$currPos, 4) === peg$c25) {
	                            s3 = peg$c25;
	                            peg$currPos += 4;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c26);
	                            }
	                        }
	                        if (s3 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c27) {
	                                s3 = peg$c27;
	                                peg$currPos += 2;
	                            } else {
	                                s3 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c28);
	                                }
	                            }
	                            if (s3 === peg$FAILED) {
	                                if (input.substr(peg$currPos, 3) === peg$c29) {
	                                    s3 = peg$c29;
	                                    peg$currPos += 3;
	                                } else {
	                                    s3 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c30);
	                                    }
	                                }
	                                if (s3 === peg$FAILED) {
	                                    if (input.substr(peg$currPos, 7) === peg$c31) {
	                                        s3 = peg$c31;
	                                        peg$currPos += 7;
	                                    } else {
	                                        s3 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c32);
	                                        }
	                                    }
	                                    if (s3 === peg$FAILED) {
	                                        if (input.substr(peg$currPos, 5) === peg$c33) {
	                                            s3 = peg$c33;
	                                            peg$currPos += 5;
	                                        } else {
	                                            s3 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c34);
	                                            }
	                                        }
	                                        if (s3 === peg$FAILED) {
	                                            if (input.substr(peg$currPos, 2) === peg$c35) {
	                                                s3 = peg$c35;
	                                                peg$currPos += 2;
	                                            } else {
	                                                s3 = peg$FAILED;
	                                                if (peg$silentFails === 0) {
	                                                    peg$fail(peg$c36);
	                                                }
	                                            }
	                                            if (s3 === peg$FAILED) {
	                                                if (input.substr(peg$currPos, 3) === peg$c37) {
	                                                    s3 = peg$c37;
	                                                    peg$currPos += 3;
	                                                } else {
	                                                    s3 = peg$FAILED;
	                                                    if (peg$silentFails === 0) {
	                                                        peg$fail(peg$c38);
	                                                    }
	                                                }
	                                                if (s3 === peg$FAILED) {
	                                                    if (input.substr(peg$currPos, 5) === peg$c39) {
	                                                        s3 = peg$c39;
	                                                        peg$currPos += 5;
	                                                    } else {
	                                                        s3 = peg$FAILED;
	                                                        if (peg$silentFails === 0) {
	                                                            peg$fail(peg$c40);
	                                                        }
	                                                    }
	                                                    if (s3 === peg$FAILED) {
	                                                        if (input.substr(peg$currPos, 6) === peg$c41) {
	                                                            s3 = peg$c41;
	                                                            peg$currPos += 6;
	                                                        } else {
	                                                            s3 = peg$FAILED;
	                                                            if (peg$silentFails === 0) {
	                                                                peg$fail(peg$c42);
	                                                            }
	                                                        }
	                                                        if (s3 === peg$FAILED) {
	                                                            if (input.substr(peg$currPos, 4) === peg$c43) {
	                                                                s3 = peg$c43;
	                                                                peg$currPos += 4;
	                                                            } else {
	                                                                s3 = peg$FAILED;
	                                                                if (peg$silentFails === 0) {
	                                                                    peg$fail(peg$c44);
	                                                                }
	                                                            }
	                                                            if (s3 === peg$FAILED) {
	                                                                if (input.substr(peg$currPos, 4) === peg$c45) {
	                                                                    s3 = peg$c45;
	                                                                    peg$currPos += 4;
	                                                                } else {
	                                                                    s3 = peg$FAILED;
	                                                                    if (peg$silentFails === 0) {
	                                                                        peg$fail(peg$c46);
	                                                                    }
	                                                                }
	                                                                if (s3 === peg$FAILED) {
	                                                                    if (input.substr(peg$currPos, 5) === peg$c47) {
	                                                                        s3 = peg$c47;
	                                                                        peg$currPos += 5;
	                                                                    } else {
	                                                                        s3 = peg$FAILED;
	                                                                        if (peg$silentFails === 0) {
	                                                                            peg$fail(peg$c48);
	                                                                        }
	                                                                    }
	                                                                    if (s3 === peg$FAILED) {
	                                                                        if (input.substr(peg$currPos, 6) === peg$c49) {
	                                                                            s3 = peg$c49;
	                                                                            peg$currPos += 6;
	                                                                        } else {
	                                                                            s3 = peg$FAILED;
	                                                                            if (peg$silentFails === 0) {
	                                                                                peg$fail(peg$c50);
	                                                                            }
	                                                                        }
	                                                                        if (s3 === peg$FAILED) {
	                                                                            if (input.substr(peg$currPos, 5) === peg$c51) {
	                                                                                s3 = peg$c51;
	                                                                                peg$currPos += 5;
	                                                                            } else {
	                                                                                s3 = peg$FAILED;
	                                                                                if (peg$silentFails === 0) {
	                                                                                    peg$fail(peg$c52);
	                                                                                }
	                                                                            }
	                                                                            if (s3 === peg$FAILED) {
	                                                                                if (input.substr(peg$currPos, 3) === peg$c53) {
	                                                                                    s3 = peg$c53;
	                                                                                    peg$currPos += 3;
	                                                                                } else {
	                                                                                    s3 = peg$FAILED;
	                                                                                    if (peg$silentFails === 0) {
	                                                                                        peg$fail(peg$c54);
	                                                                                    }
	                                                                                }
	                                                                            }
	                                                                        }
	                                                                    }
	                                                                }
	                                                            }
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c60(s3);
	                            s0 = s1;
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseElementNode() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseStartTag();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseChildNodes();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseEndTag();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c61(s1, s2, s3);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseStartEndTag();
	            }
	            return s0;
	        }
	        function peg$parseTextNode() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            s2 = peg$parseTextCharacter();
	            if (s2 !== peg$FAILED) {
	                while (s2 !== peg$FAILED) {
	                    s1.push(s2);
	                    s2 = peg$parseTextCharacter();
	                }
	            } else {
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c62(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseTextCharacter() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.charCodeAt(peg$currPos) === 60) {
	                s2 = peg$c21;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c22);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c63) {
	                    s2 = peg$c63;
	                    peg$currPos += 2;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c64);
	                    }
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c20();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseStartTag() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 60) {
	                    s2 = peg$c21;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c22);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagInfo();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c65(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseStartEndTag() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 60) {
	                    s2 = peg$c21;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c22);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagInfo();
	                    if (s3 !== peg$FAILED) {
	                        if (input.substr(peg$currPos, 2) === peg$c55) {
	                            s4 = peg$c55;
	                            peg$currPos += 2;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c56);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c66(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseTagInfo() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$parseTagName();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTagAttributes();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c67(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseTagAttributes() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseAttribute();
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseAttribute();
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c68(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseEndTag() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 2) === peg$c58) {
	                s1 = peg$c58;
	                peg$currPos += 2;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c59);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTagName();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 62) {
	                        s3 = peg$c5;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c6);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c60(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseTagName() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                if (peg$c69.test(input.charAt(peg$currPos))) {
	                    s3 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s3 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c70);
	                    }
	                }
	                if (s3 !== peg$FAILED) {
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        if (peg$c69.test(input.charAt(peg$currPos))) {
	                            s3 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c70);
	                            }
	                        }
	                    }
	                } else {
	                    s2 = peg$FAILED;
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c71(s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseAttribute() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseTagName();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 61) {
	                        s3 = peg$c72;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c73);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseAttributeValues();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c74(s1, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                s1 = peg$parseTagName();
	                if (s1 !== peg$FAILED) {
	                    s2 = peg$parse_();
	                    if (s2 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 61) {
	                            s3 = peg$c72;
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c73);
	                            }
	                        }
	                        if (s3 !== peg$FAILED) {
	                            s4 = peg$parse_();
	                            if (s4 !== peg$FAILED) {
	                                s5 = peg$parseTextBinding();
	                                if (s5 !== peg$FAILED) {
	                                    peg$savedPos = s0;
	                                    s1 = peg$c75(s1, s5);
	                                    s0 = s1;
	                                } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	                if (s0 === peg$FAILED) {
	                    s0 = peg$currPos;
	                    s1 = peg$parseTagName();
	                    if (s1 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c76(s1);
	                    }
	                    s0 = s1;
	                }
	            }
	            return s0;
	        }
	        function peg$parseAttributeValues() {
	            var s0, s1, s2, s3, s4, s5, s6, s7;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 34) {
	                s1 = peg$c77;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c78);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseTextBinding();
	                if (s3 === peg$FAILED) {
	                    s3 = peg$currPos;
	                    s4 = [];
	                    s5 = peg$currPos;
	                    s6 = peg$currPos;
	                    peg$silentFails++;
	                    if (input.substr(peg$currPos, 2) === peg$c63) {
	                        s7 = peg$c63;
	                        peg$currPos += 2;
	                    } else {
	                        s7 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c64);
	                        }
	                    }
	                    peg$silentFails--;
	                    if (s7 === peg$FAILED) {
	                        s6 = void 0;
	                    } else {
	                        peg$currPos = s6;
	                        s6 = peg$FAILED;
	                    }
	                    if (s6 !== peg$FAILED) {
	                        if (peg$c79.test(input.charAt(peg$currPos))) {
	                            s7 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s7 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c80);
	                            }
	                        }
	                        if (s7 !== peg$FAILED) {
	                            s6 = [s6, s7];
	                            s5 = s6;
	                        } else {
	                            peg$currPos = s5;
	                            s5 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s5;
	                        s5 = peg$FAILED;
	                    }
	                    if (s5 !== peg$FAILED) {
	                        while (s5 !== peg$FAILED) {
	                            s4.push(s5);
	                            s5 = peg$currPos;
	                            s6 = peg$currPos;
	                            peg$silentFails++;
	                            if (input.substr(peg$currPos, 2) === peg$c63) {
	                                s7 = peg$c63;
	                                peg$currPos += 2;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c64);
	                                }
	                            }
	                            peg$silentFails--;
	                            if (s7 === peg$FAILED) {
	                                s6 = void 0;
	                            } else {
	                                peg$currPos = s6;
	                                s6 = peg$FAILED;
	                            }
	                            if (s6 !== peg$FAILED) {
	                                if (peg$c79.test(input.charAt(peg$currPos))) {
	                                    s7 = input.charAt(peg$currPos);
	                                    peg$currPos++;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c80);
	                                    }
	                                }
	                                if (s7 !== peg$FAILED) {
	                                    s6 = [s6, s7];
	                                    s5 = s6;
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                        }
	                    } else {
	                        s4 = peg$FAILED;
	                    }
	                    if (s4 !== peg$FAILED) {
	                        peg$savedPos = s3;
	                        s4 = peg$c81();
	                    }
	                    s3 = s4;
	                }
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseTextBinding();
	                    if (s3 === peg$FAILED) {
	                        s3 = peg$currPos;
	                        s4 = [];
	                        s5 = peg$currPos;
	                        s6 = peg$currPos;
	                        peg$silentFails++;
	                        if (input.substr(peg$currPos, 2) === peg$c63) {
	                            s7 = peg$c63;
	                            peg$currPos += 2;
	                        } else {
	                            s7 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c64);
	                            }
	                        }
	                        peg$silentFails--;
	                        if (s7 === peg$FAILED) {
	                            s6 = void 0;
	                        } else {
	                            peg$currPos = s6;
	                            s6 = peg$FAILED;
	                        }
	                        if (s6 !== peg$FAILED) {
	                            if (peg$c79.test(input.charAt(peg$currPos))) {
	                                s7 = input.charAt(peg$currPos);
	                                peg$currPos++;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c80);
	                                }
	                            }
	                            if (s7 !== peg$FAILED) {
	                                s6 = [s6, s7];
	                                s5 = s6;
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s5;
	                            s5 = peg$FAILED;
	                        }
	                        if (s5 !== peg$FAILED) {
	                            while (s5 !== peg$FAILED) {
	                                s4.push(s5);
	                                s5 = peg$currPos;
	                                s6 = peg$currPos;
	                                peg$silentFails++;
	                                if (input.substr(peg$currPos, 2) === peg$c63) {
	                                    s7 = peg$c63;
	                                    peg$currPos += 2;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c64);
	                                    }
	                                }
	                                peg$silentFails--;
	                                if (s7 === peg$FAILED) {
	                                    s6 = void 0;
	                                } else {
	                                    peg$currPos = s6;
	                                    s6 = peg$FAILED;
	                                }
	                                if (s6 !== peg$FAILED) {
	                                    if (peg$c79.test(input.charAt(peg$currPos))) {
	                                        s7 = input.charAt(peg$currPos);
	                                        peg$currPos++;
	                                    } else {
	                                        s7 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c80);
	                                        }
	                                    }
	                                    if (s7 !== peg$FAILED) {
	                                        s6 = [s6, s7];
	                                        s5 = s6;
	                                    } else {
	                                        peg$currPos = s5;
	                                        s5 = peg$FAILED;
	                                    }
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            }
	                        } else {
	                            s4 = peg$FAILED;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            peg$savedPos = s3;
	                            s4 = peg$c81();
	                        }
	                        s3 = s4;
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 34) {
	                        s3 = peg$c77;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c78);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c82(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 39) {
	                    s1 = peg$c83;
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c84);
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    s2 = [];
	                    s3 = peg$parseTextBinding();
	                    if (s3 === peg$FAILED) {
	                        s3 = peg$currPos;
	                        s4 = [];
	                        s5 = peg$currPos;
	                        s6 = peg$currPos;
	                        peg$silentFails++;
	                        if (input.substr(peg$currPos, 2) === peg$c63) {
	                            s7 = peg$c63;
	                            peg$currPos += 2;
	                        } else {
	                            s7 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c64);
	                            }
	                        }
	                        peg$silentFails--;
	                        if (s7 === peg$FAILED) {
	                            s6 = void 0;
	                        } else {
	                            peg$currPos = s6;
	                            s6 = peg$FAILED;
	                        }
	                        if (s6 !== peg$FAILED) {
	                            if (peg$c85.test(input.charAt(peg$currPos))) {
	                                s7 = input.charAt(peg$currPos);
	                                peg$currPos++;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c86);
	                                }
	                            }
	                            if (s7 !== peg$FAILED) {
	                                s6 = [s6, s7];
	                                s5 = s6;
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s5;
	                            s5 = peg$FAILED;
	                        }
	                        if (s5 !== peg$FAILED) {
	                            while (s5 !== peg$FAILED) {
	                                s4.push(s5);
	                                s5 = peg$currPos;
	                                s6 = peg$currPos;
	                                peg$silentFails++;
	                                if (input.substr(peg$currPos, 2) === peg$c63) {
	                                    s7 = peg$c63;
	                                    peg$currPos += 2;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c64);
	                                    }
	                                }
	                                peg$silentFails--;
	                                if (s7 === peg$FAILED) {
	                                    s6 = void 0;
	                                } else {
	                                    peg$currPos = s6;
	                                    s6 = peg$FAILED;
	                                }
	                                if (s6 !== peg$FAILED) {
	                                    if (peg$c85.test(input.charAt(peg$currPos))) {
	                                        s7 = input.charAt(peg$currPos);
	                                        peg$currPos++;
	                                    } else {
	                                        s7 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c86);
	                                        }
	                                    }
	                                    if (s7 !== peg$FAILED) {
	                                        s6 = [s6, s7];
	                                        s5 = s6;
	                                    } else {
	                                        peg$currPos = s5;
	                                        s5 = peg$FAILED;
	                                    }
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            }
	                        } else {
	                            s4 = peg$FAILED;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            peg$savedPos = s3;
	                            s4 = peg$c81();
	                        }
	                        s3 = s4;
	                    }
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        s3 = peg$parseTextBinding();
	                        if (s3 === peg$FAILED) {
	                            s3 = peg$currPos;
	                            s4 = [];
	                            s5 = peg$currPos;
	                            s6 = peg$currPos;
	                            peg$silentFails++;
	                            if (input.substr(peg$currPos, 2) === peg$c63) {
	                                s7 = peg$c63;
	                                peg$currPos += 2;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c64);
	                                }
	                            }
	                            peg$silentFails--;
	                            if (s7 === peg$FAILED) {
	                                s6 = void 0;
	                            } else {
	                                peg$currPos = s6;
	                                s6 = peg$FAILED;
	                            }
	                            if (s6 !== peg$FAILED) {
	                                if (peg$c85.test(input.charAt(peg$currPos))) {
	                                    s7 = input.charAt(peg$currPos);
	                                    peg$currPos++;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c86);
	                                    }
	                                }
	                                if (s7 !== peg$FAILED) {
	                                    s6 = [s6, s7];
	                                    s5 = s6;
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                while (s5 !== peg$FAILED) {
	                                    s4.push(s5);
	                                    s5 = peg$currPos;
	                                    s6 = peg$currPos;
	                                    peg$silentFails++;
	                                    if (input.substr(peg$currPos, 2) === peg$c63) {
	                                        s7 = peg$c63;
	                                        peg$currPos += 2;
	                                    } else {
	                                        s7 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c64);
	                                        }
	                                    }
	                                    peg$silentFails--;
	                                    if (s7 === peg$FAILED) {
	                                        s6 = void 0;
	                                    } else {
	                                        peg$currPos = s6;
	                                        s6 = peg$FAILED;
	                                    }
	                                    if (s6 !== peg$FAILED) {
	                                        if (peg$c85.test(input.charAt(peg$currPos))) {
	                                            s7 = input.charAt(peg$currPos);
	                                            peg$currPos++;
	                                        } else {
	                                            s7 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c86);
	                                            }
	                                        }
	                                        if (s7 !== peg$FAILED) {
	                                            s6 = [s6, s7];
	                                            s5 = s6;
	                                        } else {
	                                            peg$currPos = s5;
	                                            s5 = peg$FAILED;
	                                        }
	                                    } else {
	                                        peg$currPos = s5;
	                                        s5 = peg$FAILED;
	                                    }
	                                }
	                            } else {
	                                s4 = peg$FAILED;
	                            }
	                            if (s4 !== peg$FAILED) {
	                                peg$savedPos = s3;
	                                s4 = peg$c81();
	                            }
	                            s3 = s4;
	                        }
	                    }
	                    if (s2 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 39) {
	                            s3 = peg$c83;
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c84);
	                            }
	                        }
	                        if (s3 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c82(s2);
	                            s0 = s1;
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            }
	            return s0;
	        }
	        function peg$parseTextBinding() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 2) === peg$c63) {
	                s1 = peg$c63;
	                peg$currPos += 2;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c64);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTernaryConditional();
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c87) {
	                                s5 = peg$c87;
	                                peg$currPos += 2;
	                            } else {
	                                s5 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c88);
	                                }
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c89(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseBlockBinding() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseTextBinding();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c90(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseTernaryConditional() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseAssignment();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 63) {
	                    s2 = peg$c91;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c92);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTernaryConditional();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 58) {
	                            s4 = peg$c93;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c94);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseTernaryConditional();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c95(s1, s3, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseAssignment();
	            }
	            return s0;
	        }
	        function peg$parseParameters() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 40) {
	                s1 = peg$c96;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c97);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseInnerParameters();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 41) {
	                        s3 = peg$c98;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c99);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c100(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.substr(peg$currPos, 2) === peg$c101) {
	                    s1 = peg$c101;
	                    peg$currPos += 2;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c102);
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c103();
	                }
	                s0 = s1;
	            }
	            return s0;
	        }
	        function peg$parseInnerParameters() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseTernaryConditional();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 44) {
	                    s4 = peg$c104;
	                    peg$currPos++;
	                } else {
	                    s4 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c105);
	                    }
	                }
	                if (s4 !== peg$FAILED) {
	                    s5 = peg$parseTernaryConditional();
	                    if (s5 !== peg$FAILED) {
	                        s4 = [s4, s5];
	                        s3 = s4;
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s3;
	                    s3 = peg$FAILED;
	                }
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$currPos;
	                    if (input.charCodeAt(peg$currPos) === 44) {
	                        s4 = peg$c104;
	                        peg$currPos++;
	                    } else {
	                        s4 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c105);
	                        }
	                    }
	                    if (s4 !== peg$FAILED) {
	                        s5 = peg$parseTernaryConditional();
	                        if (s5 !== peg$FAILED) {
	                            s4 = [s4, s5];
	                            s3 = s4;
	                        } else {
	                            peg$currPos = s3;
	                            s3 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c106(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseAssignment() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseObjectReference();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 61) {
	                    s2 = peg$c72;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c73);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseAssignment();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c107(s1, s3);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseOperation();
	            }
	            return s0;
	        }
	        function peg$parseOperation() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseOperatable();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c108) {
	                    s2 = peg$c108;
	                    peg$currPos += 2;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c109);
	                    }
	                }
	                if (s2 === peg$FAILED) {
	                    if (input.substr(peg$currPos, 2) === peg$c110) {
	                        s2 = peg$c110;
	                        peg$currPos += 2;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c111);
	                        }
	                    }
	                    if (s2 === peg$FAILED) {
	                        if (input.substr(peg$currPos, 3) === peg$c112) {
	                            s2 = peg$c112;
	                            peg$currPos += 3;
	                        } else {
	                            s2 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c113);
	                            }
	                        }
	                        if (s2 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c114) {
	                                s2 = peg$c114;
	                                peg$currPos += 2;
	                            } else {
	                                s2 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c115);
	                                }
	                            }
	                            if (s2 === peg$FAILED) {
	                                if (input.substr(peg$currPos, 3) === peg$c116) {
	                                    s2 = peg$c116;
	                                    peg$currPos += 3;
	                                } else {
	                                    s2 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c117);
	                                    }
	                                }
	                                if (s2 === peg$FAILED) {
	                                    if (input.substr(peg$currPos, 2) === peg$c118) {
	                                        s2 = peg$c118;
	                                        peg$currPos += 2;
	                                    } else {
	                                        s2 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c119);
	                                        }
	                                    }
	                                    if (s2 === peg$FAILED) {
	                                        if (input.substr(peg$currPos, 3) === peg$c120) {
	                                            s2 = peg$c120;
	                                            peg$currPos += 3;
	                                        } else {
	                                            s2 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c121);
	                                            }
	                                        }
	                                        if (s2 === peg$FAILED) {
	                                            if (input.substr(peg$currPos, 2) === peg$c122) {
	                                                s2 = peg$c122;
	                                                peg$currPos += 2;
	                                            } else {
	                                                s2 = peg$FAILED;
	                                                if (peg$silentFails === 0) {
	                                                    peg$fail(peg$c123);
	                                                }
	                                            }
	                                            if (s2 === peg$FAILED) {
	                                                if (input.charCodeAt(peg$currPos) === 62) {
	                                                    s2 = peg$c5;
	                                                    peg$currPos++;
	                                                } else {
	                                                    s2 = peg$FAILED;
	                                                    if (peg$silentFails === 0) {
	                                                        peg$fail(peg$c6);
	                                                    }
	                                                }
	                                                if (s2 === peg$FAILED) {
	                                                    if (input.substr(peg$currPos, 3) === peg$c124) {
	                                                        s2 = peg$c124;
	                                                        peg$currPos += 3;
	                                                    } else {
	                                                        s2 = peg$FAILED;
	                                                        if (peg$silentFails === 0) {
	                                                            peg$fail(peg$c125);
	                                                        }
	                                                    }
	                                                    if (s2 === peg$FAILED) {
	                                                        if (input.substr(peg$currPos, 2) === peg$c126) {
	                                                            s2 = peg$c126;
	                                                            peg$currPos += 2;
	                                                        } else {
	                                                            s2 = peg$FAILED;
	                                                            if (peg$silentFails === 0) {
	                                                                peg$fail(peg$c127);
	                                                            }
	                                                        }
	                                                        if (s2 === peg$FAILED) {
	                                                            if (input.charCodeAt(peg$currPos) === 60) {
	                                                                s2 = peg$c21;
	                                                                peg$currPos++;
	                                                            } else {
	                                                                s2 = peg$FAILED;
	                                                                if (peg$silentFails === 0) {
	                                                                    peg$fail(peg$c22);
	                                                                }
	                                                            }
	                                                            if (s2 === peg$FAILED) {
	                                                                if (input.charCodeAt(peg$currPos) === 43) {
	                                                                    s2 = peg$c128;
	                                                                    peg$currPos++;
	                                                                } else {
	                                                                    s2 = peg$FAILED;
	                                                                    if (peg$silentFails === 0) {
	                                                                        peg$fail(peg$c129);
	                                                                    }
	                                                                }
	                                                                if (s2 === peg$FAILED) {
	                                                                    if (input.charCodeAt(peg$currPos) === 45) {
	                                                                        s2 = peg$c130;
	                                                                        peg$currPos++;
	                                                                    } else {
	                                                                        s2 = peg$FAILED;
	                                                                        if (peg$silentFails === 0) {
	                                                                            peg$fail(peg$c131);
	                                                                        }
	                                                                    }
	                                                                    if (s2 === peg$FAILED) {
	                                                                        if (input.charCodeAt(peg$currPos) === 37) {
	                                                                            s2 = peg$c132;
	                                                                            peg$currPos++;
	                                                                        } else {
	                                                                            s2 = peg$FAILED;
	                                                                            if (peg$silentFails === 0) {
	                                                                                peg$fail(peg$c133);
	                                                                            }
	                                                                        }
	                                                                        if (s2 === peg$FAILED) {
	                                                                            if (input.charCodeAt(peg$currPos) === 42) {
	                                                                                s2 = peg$c134;
	                                                                                peg$currPos++;
	                                                                            } else {
	                                                                                s2 = peg$FAILED;
	                                                                                if (peg$silentFails === 0) {
	                                                                                    peg$fail(peg$c135);
	                                                                                }
	                                                                            }
	                                                                            if (s2 === peg$FAILED) {
	                                                                                if (input.charCodeAt(peg$currPos) === 47) {
	                                                                                    s2 = peg$c136;
	                                                                                    peg$currPos++;
	                                                                                } else {
	                                                                                    s2 = peg$FAILED;
	                                                                                    if (peg$silentFails === 0) {
	                                                                                        peg$fail(peg$c137);
	                                                                                    }
	                                                                                }
	                                                                            }
	                                                                        }
	                                                                    }
	                                                                }
	                                                            }
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseOperation();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c138(s1, s2, s3);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseOperatable();
	            }
	            return s0;
	        }
	        function peg$parseOperatable() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseModifiers();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c139(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseModifiers() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseNot();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseModifier();
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseModifier();
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c140(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseFunctionCall();
	                if (s0 === peg$FAILED) {
	                    s0 = peg$parseObjectReference();
	                }
	            }
	            return s0;
	        }
	        function peg$parseModifier() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 124) {
	                s1 = peg$c141;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c142);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseReferenceName();
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parseParameters();
	                        if (s4 === peg$FAILED) {
	                            s4 = null;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c143(s3, s4);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseObjectReference() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseObject();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c144(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseNot() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 33) {
	                s1 = peg$c145;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c146);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseNot();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c147(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 33) {
	                    s1 = peg$c145;
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c146);
	                    }
	                }
	                if (s1 === peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 45) {
	                        s1 = peg$c130;
	                        peg$currPos++;
	                    } else {
	                        s1 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c131);
	                        }
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    s2 = peg$parseNot();
	                    if (s2 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c148(s1, s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	                if (s0 === peg$FAILED) {
	                    s0 = peg$parseReserved();
	                    if (s0 === peg$FAILED) {
	                        s0 = peg$parseFunctionCall();
	                        if (s0 === peg$FAILED) {
	                            s0 = peg$parseObjectReference();
	                        }
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseObject() {
	            var s0;
	            s0 = peg$parseGroup();
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseHash();
	                if (s0 === peg$FAILED) {
	                    s0 = peg$parseNumber();
	                    if (s0 === peg$FAILED) {
	                        s0 = peg$parseStringLiteral();
	                        if (s0 === peg$FAILED) {
	                            s0 = peg$parseReference();
	                        }
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseNumber() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 45) {
	                s2 = peg$c130;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c131);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                s2 = null;
	            }
	            if (s2 !== peg$FAILED) {
	                s3 = peg$currPos;
	                s4 = [];
	                if (peg$c149.test(input.charAt(peg$currPos))) {
	                    s5 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c150);
	                    }
	                }
	                if (s5 !== peg$FAILED) {
	                    while (s5 !== peg$FAILED) {
	                        s4.push(s5);
	                        if (peg$c149.test(input.charAt(peg$currPos))) {
	                            s5 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s5 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c150);
	                            }
	                        }
	                    }
	                } else {
	                    s4 = peg$FAILED;
	                }
	                if (s4 !== peg$FAILED) {
	                    s5 = peg$parseDecimalNumber();
	                    if (s5 === peg$FAILED) {
	                        s5 = null;
	                    }
	                    if (s5 !== peg$FAILED) {
	                        s4 = [s4, s5];
	                        s3 = s4;
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s3;
	                    s3 = peg$FAILED;
	                }
	                if (s3 === peg$FAILED) {
	                    s3 = peg$parseDecimalNumber();
	                }
	                if (s3 !== peg$FAILED) {
	                    s2 = [s2, s3];
	                    s1 = s2;
	                } else {
	                    peg$currPos = s1;
	                    s1 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c151(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseDecimalNumber() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 46) {
	                s1 = peg$c152;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c153);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                if (peg$c149.test(input.charAt(peg$currPos))) {
	                    s3 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s3 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c150);
	                    }
	                }
	                if (s3 !== peg$FAILED) {
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        if (peg$c149.test(input.charAt(peg$currPos))) {
	                            s3 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c150);
	                            }
	                        }
	                    }
	                } else {
	                    s2 = peg$FAILED;
	                }
	                if (s2 !== peg$FAILED) {
	                    s1 = [s1, s2];
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseGroup() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 40) {
	                s1 = peg$c96;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c97);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTernaryConditional();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 41) {
	                        s3 = peg$c98;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c99);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c154(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReserved() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseBoolean();
	            if (s1 === peg$FAILED) {
	                s1 = peg$parseUndefined();
	                if (s1 === peg$FAILED) {
	                    s1 = peg$parseNull();
	                    if (s1 === peg$FAILED) {
	                        s1 = peg$parseNaN();
	                        if (s1 === peg$FAILED) {
	                            s1 = peg$parseInfinity();
	                        }
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c155(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseBoolean() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 4) === peg$c156) {
	                s1 = peg$c156;
	                peg$currPos += 4;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c157);
	                }
	            }
	            if (s1 === peg$FAILED) {
	                if (input.substr(peg$currPos, 5) === peg$c158) {
	                    s1 = peg$c158;
	                    peg$currPos += 5;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c159);
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c160(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseUndefined() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 9) === peg$c161) {
	                s1 = peg$c161;
	                peg$currPos += 9;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c162);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c163();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseNaN() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 3) === peg$c164) {
	                s1 = peg$c164;
	                peg$currPos += 3;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c165);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c166();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseInfinity() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 8) === peg$c167) {
	                s1 = peg$c167;
	                peg$currPos += 8;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c168);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c169();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseNull() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 4) === peg$c170) {
	                s1 = peg$c170;
	                peg$currPos += 4;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c171);
	                }
	            }
	            if (s1 === peg$FAILED) {
	                if (input.substr(peg$currPos, 4) === peg$c172) {
	                    s1 = peg$c172;
	                    peg$currPos += 4;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c173);
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c174();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseFunctionCall() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$parseObjectReference();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseParameters();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c175(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReference() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 94) {
	                s1 = peg$c176;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c177);
	                }
	            }
	            if (s1 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c178) {
	                    s1 = peg$c178;
	                    peg$currPos += 2;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c179);
	                    }
	                }
	                if (s1 === peg$FAILED) {
	                    if (input.substr(peg$currPos, 3) === peg$c180) {
	                        s1 = peg$c180;
	                        peg$currPos += 3;
	                    } else {
	                        s1 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c181);
	                        }
	                    }
	                    if (s1 === peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 126) {
	                            s1 = peg$c182;
	                            peg$currPos++;
	                        } else {
	                            s1 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c183);
	                            }
	                        }
	                        if (s1 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c184) {
	                                s1 = peg$c184;
	                                peg$currPos += 2;
	                            } else {
	                                s1 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c185);
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            if (s1 === peg$FAILED) {
	                s1 = null;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseReferenceName();
	                    if (s3 !== peg$FAILED) {
	                        s4 = [];
	                        s5 = peg$parseReferencePart();
	                        while (s5 !== peg$FAILED) {
	                            s4.push(s5);
	                            s5 = peg$parseReferencePart();
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c186(s1, s3, s4);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReferencePart() {
	            var s0;
	            s0 = peg$parseReferenceKeyPath();
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseReferenceBrackPath();
	            }
	            return s0;
	        }
	        function peg$parseReferenceKeyPath() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 46) {
	                s1 = peg$c152;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c153);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseReferenceName();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c187(s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReferenceBrackPath() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 91) {
	                s1 = peg$c188;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c189);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTernaryConditional();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 93) {
	                        s3 = peg$c190;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c191);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c192(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReferenceName() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            if (peg$c193.test(input.charAt(peg$currPos))) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c194);
	                }
	            }
	            if (s2 !== peg$FAILED) {
	                while (s2 !== peg$FAILED) {
	                    s1.push(s2);
	                    if (peg$c193.test(input.charAt(peg$currPos))) {
	                        s2 = input.charAt(peg$currPos);
	                        peg$currPos++;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c194);
	                        }
	                    }
	                }
	            } else {
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c195(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseHash() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 123) {
	                s1 = peg$c196;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c197);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseHashValues();
	                    if (s3 === peg$FAILED) {
	                        s3 = null;
	                    }
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 125) {
	                                s5 = peg$c198;
	                                peg$currPos++;
	                            } else {
	                                s5 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c199);
	                                }
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c200(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseHashValues() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseHashValuesArray();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c201(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseHashValuesArray() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseHashValue();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 44) {
	                    s4 = peg$c104;
	                    peg$currPos++;
	                } else {
	                    s4 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c105);
	                    }
	                }
	                if (s4 !== peg$FAILED) {
	                    s5 = peg$parseHashValuesArray();
	                    if (s5 !== peg$FAILED) {
	                        s4 = [s4, s5];
	                        s3 = s4;
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s3;
	                    s3 = peg$FAILED;
	                }
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$currPos;
	                    if (input.charCodeAt(peg$currPos) === 44) {
	                        s4 = peg$c104;
	                        peg$currPos++;
	                    } else {
	                        s4 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c105);
	                        }
	                    }
	                    if (s4 !== peg$FAILED) {
	                        s5 = peg$parseHashValuesArray();
	                        if (s5 !== peg$FAILED) {
	                            s4 = [s4, s5];
	                            s3 = s4;
	                        } else {
	                            peg$currPos = s3;
	                            s3 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c202(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseHashValue() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseHashKey();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 58) {
	                            s4 = peg$c93;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c94);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseTernaryConditional();
	                            if (s5 === peg$FAILED) {
	                                s5 = null;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c203(s2, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseHashKey() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseStringLiteral();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c204(s1);
	            }
	            s0 = s1;
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                s1 = peg$parseReferenceName();
	                if (s1 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c205(s1);
	                }
	                s0 = s1;
	            }
	            return s0;
	        }
	        function peg$parseStringLiteral() {
	            var s0, s1, s2, s3;
	            peg$silentFails++;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 34) {
	                s1 = peg$c77;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c78);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseDoubleStringCharacter();
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseDoubleStringCharacter();
	                }
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 34) {
	                        s3 = peg$c77;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c78);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c207(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 39) {
	                    s1 = peg$c83;
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c84);
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    s2 = [];
	                    s3 = peg$parseSingleStringCharacter();
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        s3 = peg$parseSingleStringCharacter();
	                    }
	                    if (s2 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 39) {
	                            s3 = peg$c83;
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c84);
	                            }
	                        }
	                        if (s3 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c207(s2);
	                            s0 = s1;
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            }
	            peg$silentFails--;
	            if (s0 === peg$FAILED) {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c206);
	                }
	            }
	            return s0;
	        }
	        function peg$parseDoubleStringCharacter() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.charCodeAt(peg$currPos) === 34) {
	                s2 = peg$c77;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c78);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 92) {
	                    s2 = peg$c208;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c209);
	                    }
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c210();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c211) {
	                    s0 = peg$c211;
	                    peg$currPos += 2;
	                } else {
	                    s0 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c212);
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseSingleStringCharacter() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.charCodeAt(peg$currPos) === 39) {
	                s2 = peg$c83;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c84);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 92) {
	                    s2 = peg$c208;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c209);
	                    }
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c210();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c213) {
	                    s0 = peg$c213;
	                    peg$currPos += 2;
	                } else {
	                    s0 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c214);
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseSourceCharacter() {
	            var s0;
	            if (input.length > peg$currPos) {
	                s0 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s0 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c215);
	                }
	            }
	            return s0;
	        }
	        function peg$parseWord() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            if (peg$c216.test(input.charAt(peg$currPos))) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c217);
	                }
	            }
	            if (s2 !== peg$FAILED) {
	                while (s2 !== peg$FAILED) {
	                    s1.push(s2);
	                    if (peg$c216.test(input.charAt(peg$currPos))) {
	                        s2 = input.charAt(peg$currPos);
	                        peg$currPos++;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c217);
	                        }
	                    }
	                }
	            } else {
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c218(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parse_() {
	            var s0, s1;
	            s0 = [];
	            if (peg$c219.test(input.charAt(peg$currPos))) {
	                s1 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c220);
	                }
	            }
	            while (s1 !== peg$FAILED) {
	                s0.push(s1);
	                if (peg$c219.test(input.charAt(peg$currPos))) {
	                    s1 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c220);
	                    }
	                }
	            }
	            return s0;
	        }
	        /*jshint laxcomma:false */
	        function trimWhitespace(ws) {
	            return trimNewLineChars(ws).replace(/(^[\r\n]+)|([\r\n]+$)/, " ");
	        }
	        function trimEnds(ws) {
	            return ws.replace(/(^\s+)|(\s+$)/, "").replace(/[\r\n]/g, "\\n");
	        }
	        function trimNewLineChars(ws) {
	            return ws.replace(/[ \r\n\t]+/g, " ");
	        }
	        function trimmedText() {
	            return trimWhitespace(text());
	        }
	        function attrValues(values) {
	            values = values.filter(function (v) {
	                return !/^[\n\t\r]+$/.test(v.value);
	            });
	            if (values.length === 1 && values[0].type === "string") {
	                return values[0];
	            } else {
	                return values;
	            }
	        }
	        function trimTextExpressions(expressions) {
	            function _trim(exprs) {
	                var expr;
	                for (var i = exprs.length; i--;) {
	                    expr = exprs[i];
	                    if (expr.type == "textNode" && !/\S/.test(expr.value) && !expr.decoded) {
	                        exprs.splice(i, 1);
	                    } else {
	                        break;
	                    }
	                }
	                return exprs;
	            }
	            return _trim(_trim(expressions.reverse()).reverse());
	        }
	        function expression(name) {
	            return Array.prototype.slice.call(arguments);
	        }
	        function escapeString(string) {
	            return string.replace(/[\n\r]+/g, "\\n").replace(/'/g, "\\'");
	        }
	        peg$result = peg$startRuleFunction();
	        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	            return peg$result;
	        } else {
	            if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	                peg$fail({ type: "end", description: "end of input" });
	            }
	            throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
	        }
	    }
	    return {
	        SyntaxError: peg$SyntaxError,
	        parse: peg$parse
	    };
	}();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var utils = __webpack_require__(30);

	var Binding = function () {
	    function Binding(ref, view) {
	        _classCallCheck(this, Binding);

	        this._attrBindings = {};
	        this.ref = ref;
	        this.view = view;
	        this.options = view.template.options;
	        this._attributeClasses = this.options.attributes;
	    }

	    Binding.prototype.setAttribute = function setAttribute(key, value) {
	        if (!this.setAsRegisteredAttribute(key, value)) {
	            if (value != void 0) {
	                this.ref.setAttribute(key, value);
	            } else {}
	        }
	    };

	    Binding.prototype.setProperty = function setProperty(key, value) {
	        if (!this.setAsRegisteredAttribute(key, value)) {
	            // no node type? It's a registered component.
	            if (!this.ref.nodeType) {
	                this.ref.setAttribute(key, value);
	            } else {
	                this.ref[key] = value;
	            }
	        }
	    };

	    Binding.prototype.setAsRegisteredAttribute = function setAsRegisteredAttribute(key, value) {
	        if (this._attrBindings[key]) {
	            this._attrBindings[key].value = value;
	        } else {
	            var attrClass = this._attributeClasses.get(key);
	            if (attrClass) {
	                this._attrBindings[key] = new attrClass(this.ref, key, value, this.view);
	            } else {
	                return false;
	            }
	        }
	        return true;
	    };

	    Binding.prototype.update = function update(context) {
	        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
	            var key;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.next = 2;
	                            return this._update();

	                        case 2:
	                            _context.t0 = regeneratorRuntime.keys(this._attrBindings);

	                        case 3:
	                            if ((_context.t1 = _context.t0()).done) {
	                                _context.next = 9;
	                                break;
	                            }

	                            key = _context.t1.value;
	                            _context.next = 7;
	                            return this._attrBindings[key].update();

	                        case 7:
	                            _context.next = 3;
	                            break;

	                        case 9:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    };

	    Binding.prototype.destroy = function destroy() {
	        for (var key in this._attrBindings) {
	            this._attrBindings[key].destroy();
	        }
	    };

	    return Binding;
	}();

	exports.Binding = Binding;
	function binding(initialize, update) {
	    return utils.extendClass(Binding, {
	        initialize: initialize || function () {},
	        _update: update || function () {
	            return Promise.resolve();
	        }
	    });
	}
	exports.binding = binding;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var rAF = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'];
	var defaultTick = function defaultTick(next) {
	    if (!rAF) {
	        rAF(next);
	    } else {
	        setTimeout(next);
	    }
	};

	var RunLoop = function () {
	    function RunLoop() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, RunLoop);

	        if (!options) options = {};
	        this._animationQueue = [];
	        this.tick = options.tick || defaultTick;
	        this._id = options._id || 2;
	    }
	    /**
	    * child runloop in-case we get into recursive loops
	    */


	    RunLoop.prototype.child = function child() {
	        return this.__child || (this.__child = new RunLoop({ tick: this.tick, _id: this._id << 2 }));
	    };
	    /**
	     * Runs animatable object on requestAnimationFrame. This gets
	     * called whenever the UI state changes.
	     *
	     * @method animate
	     * @param {Object} animatable object. Must have `update()`
	     */


	    RunLoop.prototype.deferOnce = function deferOnce(context) {
	        var _this = this;

	        if (!context.__running) context.__running = 1;
	        if (context.__running & this._id) {
	            if (this._running) {
	                this.child().deferOnce(context);
	            }
	            return;
	        }
	        context.__running |= this._id;
	        // push on the animatable object
	        this._animationQueue.push(context);
	        // if animating, don't continue
	        if (this._requestingFrame) return;
	        this._requestingFrame = true;
	        // run the animation frame, and callback all the animatable objects
	        this.tick(function () {
	            _this.runNow();
	            _this._requestingFrame = false;
	        });
	    };
	    /**
	     */


	    RunLoop.prototype.runNow = function runNow() {
	        var queue = this._animationQueue;
	        this._animationQueue = [];
	        this._running = true;
	        // queue.length is important here, because animate() can be
	        // called again immediately after an update
	        for (var i = 0; i < queue.length; i++) {
	            var item = queue[i];
	            item.update();
	            item.__running &= ~this._id;
	            // check for anymore animations - need to run
	            // them in order
	            if (this._animationQueue.length) {
	                this.runNow();
	            }
	        }
	        this._running = false;
	    };

	    return RunLoop;
	}();

	exports.RunLoop = RunLoop;

/***/ }
/******/ ])
});
;