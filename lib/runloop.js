"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rAF = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'];
var defaultTick = function defaultTick(next) {
    if (!rAF) {
        rAF(next);
    } else {
        setTimeout(next);
    }
};

var RunLoop = function () {
    function RunLoop() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, RunLoop);

        if (!options) options = {};
        this._animationQueue = [];
        this.tick = options.tick || defaultTick;
        this._id = options._id || 2;
    }
    /**
    * child runloop in-case we get into recursive loops
    */


    RunLoop.prototype.child = function child() {
        return this.__child || (this.__child = new RunLoop({ tick: this.tick, _id: this._id << 2 }));
    };
    /**
     * Runs animatable object on requestAnimationFrame. This gets
     * called whenever the UI state changes.
     *
     * @method animate
     * @param {Object} animatable object. Must have `update()`
     */


    RunLoop.prototype.deferOnce = function deferOnce(context) {
        var _this = this;

        if (!context.__running) context.__running = 1;
        if (context.__running & this._id) {
            if (this._running) {
                this.child().deferOnce(context);
            }
            return;
        }
        context.__running |= this._id;
        // push on the animatable object
        this._animationQueue.push(context);
        // if animating, don't continue
        if (this._requestingFrame) return;
        this._requestingFrame = true;
        // run the animation frame, and callback all the animatable objects
        this.tick(function () {
            _this.runNow();
            _this._requestingFrame = false;
        });
    };
    /**
     */


    RunLoop.prototype.runNow = function runNow() {
        var queue = this._animationQueue;
        this._animationQueue = [];
        this._running = true;
        // queue.length is important here, because animate() can be
        // called again immediately after an update
        for (var i = 0; i < queue.length; i++) {
            var item = queue[i];
            item.update();
            item.__running &= ~this._id;
            // check for anymore animations - need to run
            // them in order
            if (this._animationQueue.length) {
                this.runNow();
            }
        }
        this._running = false;
    };

    return RunLoop;
}();

exports.RunLoop = RunLoop;