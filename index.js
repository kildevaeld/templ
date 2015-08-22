'use strict';
const template = `<!-- speed demo for rendering a dynamic list of items -->

Generate <input type="text" class="form-control" style="width:60px;display:inline-block;" value="{{<~>numItems}}"></input> items: <br />

<repeat each="{{ range(numItems) }}" as='number'>
  {{~number}} <br />
</repeat>`

const templ = require('./dist/templ');
const dom = require('jsdom').jsdom()
const _ = require('underscore')

function _stringifyNode(node) {

  var buffer = "";

  if (node.nodeType === 11) {
    for (var i = 0, n = node.childNodes.length; i < n; i++) {
      buffer += _stringifyNode(node.childNodes[i]);
    }
    return buffer;
  }

  buffer = node.nodeValue || node.outerHTML || "";

  if (node.nodeType === 8) {
    buffer = "<!--" + buffer + "-->";
  }

  return buffer;
}

let t = templ.compile(template);

console.log(_stringifyNode(t), {
  numItems: 10,
  range: function (count) {
    return _.range(Math.min(count, 20000)).reverse();
  }
 
});

let rendered = t.render({
  document: dom.defaultView.document
});

