import { Fx } from '../helpers';
export {};

declare global {
    interface HTMLElementTagNameMap {
        'fx-parallax': FxParallax.FxParallax;
    }
}

namespace FxParallax {
   export  interface FxParallax {
        constructor(): void;
        prototype: {
            handleScroll: () => void;
            isScrolling: boolean;
        } | undefined;
    }    
   
    export declare class FxParallax {
        constructor();
        handleScroll(): void;
        isScrolling: boolean;
    }

    export function ParallaxMixin<T extends new (...args: any[]) => {}>(Base: T) {
        return class extends Base {
            handleScroll: any;
            isScrolling: boolean;
            constructor(...args: any[]) {
                super(...args);
                this.handleScroll = this.handleScroll.bind(this);
                this.isScrolling = false;
            }
        }
    }

}

export { FxParallax as default };
