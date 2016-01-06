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