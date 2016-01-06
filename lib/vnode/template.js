"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var section_1 = require('./section');
var view_1 = require('./view');

var Template = function () {
    function Template(vnode, options) {
        _classCallCheck(this, Template);

        this._renderers = [];
        this.vnode = vnode;
        var node = vnode.render(options, this._renderers);
        this.section = section_1.section(options.document, node);
        this.options = options;
    }

    Template.prototype.view = function view(context, options) {
        var sec = this.section.clone();
        var DestView = this.options.viewClass || view_1.View;
        var view = new DestView(sec, this, context, options);
        for (var _iterator = this._renderers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var renderer = _ref;

            renderer.generate(sec.node || sec.start.parentNode, view);
        }
        return view;
    };

    return Template;
}();

exports.Template = Template;
function template(vnode, options) {
    return new Template(vnode, options);
}
exports.template = template;