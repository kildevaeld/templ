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
/*function iterateSync(list:any[], fn:(child:any) => Promise<any>): Promise<any[]> {
  return new Promise((resolve, reject) => {
    var current = 0, length = list.length;
    var out = [];
    const next = (err, value) => {
      if (current == length - 1) {
        return resolve(out);
      } else if (err != null) {
        return reject(err)
      } else if (err == null && value == null) {

      }
    };

    next(null, null);
  });
}*/

var Fragment = function () {
    function Fragment(children) {
        _classCallCheck(this, Fragment);

        this.nodeType = 11 /* Fragment */;
        this.childNodes = children;
        for (var i = 0; i < children.length; i++) {
            children[i].parentNode = this;
        }
    }

    Fragment.prototype.render = function render(options, renderers) {
        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
            var fragment, i, n, child;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            fragment = options.document.createDocumentFragment();
                            /*let r = this.childNodes.map( c => {
                              return c.render(options, renderers);
                            });
                                   return Promise.all(r)
                            .then( childs => {
                              childs.forEach( m => fragment.appendChild(<any>m));
                              return fragment;
                            });*/

                            i = 0, n = this.childNodes.length;

                        case 2:
                            if (!(i < n)) {
                                _context.next = 10;
                                break;
                            }

                            _context.next = 5;
                            return this.childNodes[i].render(options, renderers);

                        case 5:
                            child = _context.sent;

                            fragment.appendChild(child);

                        case 7:
                            i++;
                            _context.next = 2;
                            break;

                        case 10:
                            return _context.abrupt("return", fragment);

                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    };

    return Fragment;
}();

exports.Fragment = Fragment;
exports.fragment = function (children) {
    return new Fragment(children);
};