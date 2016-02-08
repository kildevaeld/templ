"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser_1 = require('./parser');
function compile(src, options) {
    var str = transpile(src);
    return new Function("return " + str)();
}
exports.compile = compile;
function transpile(source) {
    var transpiler = new Transpiler();
    return transpiler.transpile(source);
}
exports.transpile = transpile;
/**
 * Transpile AST to Function
 */

var Transpiler = function () {
    function Transpiler() {
        _classCallCheck(this, Transpiler);

        for (var k in this) {
            if (k.charAt(0) === "_") {
                this[k] = this[k].bind(this);
            }
        }
        this.transpile = this.transpile.bind(this);
    }
    /**
     */


    Transpiler.prototype.transpile = function transpile(source) {
        return this._root(parser_1.parser.parse(source));
    };
    /**
     */


    Transpiler.prototype._root = function _root(elements) {
        var buffer = "(function(fragment, element, text, comment, dynamic, createBindingClass) {";
        var fragment = "fragment([" + this._children(elements) + "])";
        buffer += "'use strict';return " + fragment;
        buffer += "})";
        return buffer;
    };
    /**
     */


    Transpiler.prototype._expression = function _expression(expression) {
        return this["_" + expression[0]](expression);
    };
    /**
     * check for stuff like <li repeat.each={{items}}></li>
     */


    Transpiler.prototype._element = function _element(expression) {
        var exprs = {};
        var prev = expression;
        var attrs = [];
        expression[2].forEach(function (attr, i) {
            var key = attr[1];
            var value = attr[2];
            var keyParts = key.split(".");
            // check for things like <li repeat.each={{items}}></li>
            if (keyParts.length > 1) {
                if (!exprs[keyParts[0]]) {
                    expression = exprs[keyParts[0]] = ["element", keyParts[0], [], [["element", expression[1], attrs, expression[3]]]];
                }
                exprs[keyParts[0]][2].push([attr[0], keyParts[1], value]);
            } else {
                attrs.push(attr);
            }
        });
        return this._element2(expression);
    };
    /**
     */


    Transpiler.prototype._doctype = function _doctype(expression) {
        return "text('<!DOCTYPE " + expression[1] + ">')";
    };
    /**
     */


    Transpiler.prototype._children = function _children(children) {
        var items = [];
        children = children.concat();
        while (children.length) {
            var child = children[children.length - 1];
            if (child[0] !== "text") break;
            child[1] = child[1].replace(/[\s\r\n\t]+$/, "");
            if (/^[\s\r\n\t]*$/.test(child[1])) {
                children.pop();
            } else {
                break;
            }
        }
        return children.map(this._expression).join(", ");
    };
    /**
     */


    Transpiler.prototype._element2 = function _element2(expression) {
        var buffer = "element('" + expression[1] + "'";
        var dynamicAttributes = [];
        buffer += ", {";
        var attrs = [];
        buffer += expression[2].map(function (attr) {
            var key = attr[1];
            var value = attr[2];
            if (!value.length || value.length === 1 && value[0][0] === "string") {
                return "'" + key + "':" + (value.length ? this._expression(value[0]) : "true");
            } else {
                dynamicAttributes.push(attr);
            }
        }.bind(this)).filter(function (str) {
            return !!str;
        }).join(",");
        buffer += "}";
        var childBuffer = this._children(expression[3]);
        if (childBuffer.length) {
            buffer += ", " + childBuffer;
        }
        buffer += ")";
        if (dynamicAttributes.length) {
            var dynamicAttrBuffer = "";
            var staticAttrBuffer = "";
            dynamicAttributes.forEach(function (expression) {
                var type = expression[0];
                // var key  = _dashToCamelCase(expression[1]);
                dynamicAttrBuffer += "this";
                if (type === "block") {
                    dynamicAttrBuffer += ".ref.nodeValue = " + this._expression(expression[1]);
                } else if (type === "attribute") {
                    var value = expression[2].map(function (expr) {
                        return "(" + this._expression(expr) + ")";
                    }.bind(this)).join("+");
                    dynamicAttrBuffer += ".setAttribute('" + expression[1] + "', " + value + ");";
                } else if (type === "property") {
                    // dynamicAttrBuffer += ".ref." + expression[1] + "=" + this._expression(expression[2]);
                    dynamicAttrBuffer += ".setProperty('" + expression[1] + "', " + this._expression(expression[2]) + ");";
                }
            }.bind(this));
            if (dynamicAttrBuffer.length) {
                dynamicAttrBuffer = "function(context) {" + dynamicAttrBuffer + "}";
            }
            if (staticAttrBuffer.length) {
                staticAttrBuffer = "function() { var self = this; " + staticAttrBuffer + "}";
            }
            if (dynamicAttrBuffer.length || staticAttrBuffer.length) {
                buffer = "dynamic(" + buffer + ",";
                buffer += "createBindingClass(" + (staticAttrBuffer.length ? staticAttrBuffer : "void 0") + ", " + (dynamicAttrBuffer ? dynamicAttrBuffer : "void 0") + ")";
                buffer += ")";
            }
        }
        return buffer;
    };
    /**
     */


    Transpiler.prototype.__addReference = function __addReference(expression) {
        var name = "_" + ++this._refCounter;
        this._refs[name] = expression;
        return name;
    };
    /**
     */


    Transpiler.prototype._block = function _block(expression) {
        // TODO - check for unbound expressions here
        var buffer = "dynamic(text(), createBindingClass(void 0, function(context) {";
        buffer += "this.ref.nodeValue = " + this._expression(expression[1]) + ";";
        return buffer + "}))";
    };
    /**
     */


    Transpiler.prototype._text = function _text(expression) {
        return "text('" + expression[1] + "')";
    };
    /**
     */


    Transpiler.prototype._comment = function _comment(expression) {
        return "comment('" + expression[1] + "')";
    };
    /**
     */


    Transpiler.prototype._hash = function _hash(expression) {
        var items = expression[1];
        var buffer = [];
        for (var key in items) {
            buffer.push("'" + key + "':" + this._expression(items[key]));
        }
        return "{" + buffer.join(",") + "}";
    };
    /**
     */


    Transpiler.prototype._script = function _script(expression) {
        return this._expression(expression[1]);
    };
    /**
     */


    Transpiler.prototype._referenceKeyPath = function _referenceKeyPath(expression) {
        var keypath = [];
        var isDynamic = false;
        expression.forEach(function (part) {
            if (typeof part !== "string") {
                isDynamic = true;
                // console.log(expression);
                keypath.push(this._expression(part));
            } else {
                keypath.push(part);
            }
        }.bind(this));
        keypath = isDynamic ? "[" + keypath.map(function (part, i) {
            return typeof expression[i] === "string" ? "'" + part + "'" : part;
        }).join(",") + "]" : "'" + keypath.join(".") + "'";
        return keypath;
    };
    /**
     */


    Transpiler.prototype._reference = function _reference(expression) {
        var keypath = this._referenceKeyPath(expression[1]);
        if (expression[2]) {
            var gettable = !! ~expression[2].indexOf("<~");
            var settable = !! ~expression[2].indexOf("~>");
            return "this.view.ref(" + keypath + ", " + gettable + ", " + settable + ")";
        }
        return "this.view.get(" + keypath + ")";
    };
    /**
     */


    Transpiler.prototype._string = function _string(expression) {
        return "'" + expression[1] + "'";
    };
    /**
     */


    Transpiler.prototype._operator = function _operator(expression) {
        return this._expression(expression[2]) + expression[1] + this._expression(expression[3]);
    };
    /**
     */


    Transpiler.prototype._condition = function _condition(expression) {
        return this._expression(expression[1]) + "?" + this._expression(expression[2]) + ":" + this._expression(expression[3]);
    };
    /**
     */


    Transpiler.prototype._literal = function _literal(expression) {
        return expression[1];
    };
    /**
     */


    Transpiler.prototype._not = function _not(expression) {
        return "!" + this._expression(expression[1]);
    };
    /**
     */


    Transpiler.prototype._negative = function _negative(expression) {
        return "-" + this._expression(expression[1]);
    };
    /**
     */


    Transpiler.prototype._call = function _call(expression) {
        var buffer = "this.view.call(" + this._referenceKeyPath(expression[1][1]) + ", [";
        buffer += expression[2].map(this._expression).join(",");
        return buffer + "])";
    };
    /**
     */


    Transpiler.prototype._modifier = function _modifier(expression) {
        return "this.options.modifiers." + expression[1] + "(" + expression[2].map(this._expression).join(",") + ")";
    };

    Transpiler.prototype._assign = function _assign(expression) {
        return 'this.view.assign("' + expression[1][1] + '", ' + 'function () { return ' + this._expression(expression[2]) + ';})';
    };
    /**
     */


    Transpiler.prototype._group = function _group(expression) {
        return "(" + this._expression(expression[1]) + ")";
    };
    /**
     */


    Transpiler.prototype.__findExpressions = function __findExpressions(type, expr) {
        var exprs = [];
        this.__traverse(expr, function (expr) {
            if (expr[0] === type) exprs.push(expr);
        });
        return exprs;
    };
    /**
     */


    Transpiler.prototype.__traverse = function __traverse(expr, iterator) {
        iterator(expr);
        expr.forEach(function (v) {
            if (v && (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object") {
                this.__traverse(v, iterator);
            }
        }.bind(this));
    };

    return Transpiler;
}();
/**
 */


function _dashToCamelCase(string) {
    return string.split("-").map(function (part, i) {
        var p = part.toLowerCase();
        return i > 0 ? p.charAt(0).toUpperCase() + p.substr(1) : p;
    }).join("");
}
/**
 */