"use strict";

var fragmentsection_1 = require('./fragmentsection');
var nodesection_1 = require('./nodesection');
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