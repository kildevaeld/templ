import {BaseAttribute} from './base';

export class FocusAttribute extends BaseAttribute {

        initialize() {

        }
        update(): Promise<void> {
            if (!this.value) return Promise.resolve();
            if ((<any>this.ref).focus) {
                var self = this;

                //if (!process.browser) return this.node.focus();

                // focus after being on screen. Need to break out
                // of animation, so setTimeout is the best option
                setTimeout(function() {
                    (<any>self.ref).focus();
                }, 1);
            }
            return Promise.resolve();
        }
    }