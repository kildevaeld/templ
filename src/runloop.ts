

var rAF = (window.requestAnimationFrame      ||
          window['webkitRequestAnimationFrame'] ||
          window['mozRequestAnimationFrame']);
    
const defaultTick = function (next) {
    if (!rAF) {
        rAF(next);
    } else {
        setTimeout(next);
    }
}

export class RunLoop {
    tick: any;
    private _id: number;
    private _animationQueue: any[];
    private __child: RunLoop;
    private _running: boolean;
    private _requestingFrame: boolean;
    
    constructor (options:any={}) {
        if (!options) options = {};
        this._animationQueue = [];
        this.tick = options.tick || defaultTick;
        this._id = options._id || 2;
    }
    
    /**
   * child runloop in-case we get into recursive loops
   */

  child () {
    return this.__child || (this.__child = new RunLoop({ tick: this.tick, _id: this._id << 2 }));
  }

  /**
   * Runs animatable object on requestAnimationFrame. This gets
   * called whenever the UI state changes.
   *
   * @method animate
   * @param {Object} animatable object. Must have `update()`
   */

  deferOnce (context) {

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
    this.tick(() => {
      this.runNow();
      this._requestingFrame = false;
    });
  }

  /**
   */

  runNow () {
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
  }
}