"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vnode_1 = require('./vnode');

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
        }
    }

    FragmentSection.prototype.appendChild = function appendChild(node) {
        //console.log(document.body.appendChild(node))
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