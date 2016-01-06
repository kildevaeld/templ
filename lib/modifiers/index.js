"use strict";

function uppercase(value) {
    return String(value).toUpperCase();
}
exports.uppercase = uppercase;
function lowercase(value) {
    return String(value).toLowerCase();
}
exports.lowercase = lowercase;
function titlecase(value) {
    var str;
    str = String(value);
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
exports.titlecase = titlecase;
function json(value, count, delimiter) {
    return JSON.stringify.apply(JSON, arguments);
}
exports.json = json;
function isNaN(value) {
    return isNaN(value);
}
exports.isNaN = isNaN;
exports.round = Math.round;