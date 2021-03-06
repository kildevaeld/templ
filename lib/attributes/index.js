"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
var value_1 = require('./value');
var event_1 = require('./event');
var style_1 = require('./style');
var focus_1 = require('./focus');
__export(require('./base'));
exports.value = value_1.ValueAttribute;
exports.onclick = event_1.ClickAttribute;
exports.onenter = event_1.OnEnterAttribute;
exports.onescape = event_1.OnEscapeAttribute;
exports.onchange = event_1.ChangeAttribute;
exports.onscroll = event_1.ScrollAttribute;
exports.onfocus = event_1.OnFocusAttribute;
exports.onblur = event_1.BlurAttribute;
exports.checked = value_1.ValueAttribute;
exports.style = style_1.StyleAttribute;
exports.focus = focus_1.FocusAttribute;