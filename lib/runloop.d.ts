export declare class RunLoop {
    tick: any;
    private _id;
    private _animationQueue;
    private __child;
    private _running;
    private _requestingFrame;
    constructor(options?: any);
    /**
   * child runloop in-case we get into recursive loops
   */
    child(): RunLoop;
    /**
     * Runs animatable object on requestAnimationFrame. This gets
     * called whenever the UI state changes.
     *
     * @method animate
     * @param {Object} animatable object. Must have `update()`
     */
    deferOnce(context: any): void;
    /**
     */
    runNow(): void;
}
