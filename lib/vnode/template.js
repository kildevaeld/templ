"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var section_1 = require('./section');
var view_1 = require('./view');

var Template = function () {
    function Template(vnode, options) {
        _classCallCheck(this, Template);

        this._renderers = [];
        this.vnode = vnode;
        /*let node = vnode.render(<any>options, this._renderers);
        
        this.section = section(options.document, node)*/
        this.options = options;
    }

    Template.prototype.render = function render(context, options) {
        var _this = this;

        return this.vnode.render(this.options, this._renderers).then(function (node) {
            _this.section = section_1.section(_this.options.document, node);
            return _this.view(context, options);
        });
    };

    Template.prototype.view = function view(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
            var sec, DestView, k, view, i, ii;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(this.section == null)) {
                                _context.next = 2;
                                break;
                            }

                            throw new Error('must call render before view');

                        case 2:
                            sec = this.section.clone();
                            DestView = this.options.viewClass || view_1.View;

                            for (k in this.options) {
                                if (!options[k]) options[k] = this.options[k];
                            }
                            view = new DestView(sec, this, context, options);
                            /*let all = this._renderers.map( r => {
                                return r.generate(sec.node||sec.start.parentNode,view);
                            });
                            
                            return Promise.all(all)
                            .then( () => {
                                return view;
                            });*/

                            i = 0, ii = this._renderers.length;

                        case 7:
                            if (!(i < ii)) {
                                _context.next = 13;
                                break;
                            }

                            _context.next = 10;
                            return this._renderers[i].generate(sec.node || sec.start.parentNode, view);

                        case 10:
                            i++;
                            _context.next = 7;
                            break;

                        case 13:
                            return _context.abrupt('return', view);

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    };

    return Template;
}();

exports.Template = Template;
function template(vnode, options) {
    return new Template(vnode, options);
}
exports.template = template;