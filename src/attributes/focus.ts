import {BaseAttribute} from './base';

export class FocusAttribute extends BaseAttribute {

        initialize() {

        }
        update() {
            if (!this.value) return;
            if ((<any>this.ref).focus) {
                var self = this;

                //if (!process.browser) return this.node.focus();

                // focus after being on screen. Need to break out
                // of animation, so setTimeout is the best option
                setTimeout(function() {
                    (<any>self.ref).focus();
                }, 1);
            }
        }
    }