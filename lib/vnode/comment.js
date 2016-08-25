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