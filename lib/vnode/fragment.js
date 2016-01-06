"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        var fragment = options.document.createDocumentFragment();
        for (var i = 0, n = this.childNodes.length; i < n; i++) {
            fragment.appendChild(this.childNodes[i].render(options, renderers));
        }
        return fragment;
    };

    return Fragment;
}();

exports.Fragment = Fragment;
exports.fragment = function (children) {
    return new Fragment(children);
};