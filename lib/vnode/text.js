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