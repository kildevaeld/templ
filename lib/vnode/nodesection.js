"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vnode_1 = require('./vnode');

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