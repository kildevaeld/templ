'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vnode = require('./vnode/index');
var action_1 = require('./action');
//import {RunLoop} from './runloop';
var Debug = require('debug');
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