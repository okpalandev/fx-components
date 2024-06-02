import { Effects } from '../utils/index';
export { };

declare global {
    interface HTMLElementTagNameMap {
        'fx-parallax': FxParallax;
    }
}

export interface FxParallax {
    constructor(): void;
    prototype: {
        handleScroll: () => void;
        isScrolling: boolean;
    } | undefined;
}

export declare class FxParallax extends HTMLElement implements FxParallax {
    constructor();
    handleScroll(): void;
    isScrolling: boolean;
}

export function FxParallaxMixin<T extends new (...args: any[]) => {}>(Base: T) {
    return class extends HTMLElement {
        isScrolling: boolean;
        constructor(...args: any[]) {
            super(...args as []);
            this.handleScroll = this.handleScroll.bind(this);
            this.isScrolling = false;
            this.shadowRoot?.addEventListener('scroll', this.handleScroll);
            this.attachShadow({ mode: 'open' });
            this.shadowRoot?.appendChild(document.createElement('slot'));

        }
        static get observedAttributes() {
            return ['fx-data-speed', 'fx-data-direction', 'fx-data-offset'];
        }

        connectedCallback() {
            this.handleScroll();
            window.addEventListener('scroll', this.handleScroll);
        }

        disconnectedCallback() {
            window.removeEventListener('scroll', this.handleScroll);
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            if (oldValue !== newValue) {
                this.handleScroll();
            }
        }

        handleScroll() {
            if (!this.isScrolling) {
                window.requestAnimationFrame(() => {
                    this.style.transform = `translateY(${window.scrollY * Number(this.speed)}px)`;
                    this.isScrolling = false;
                });
            }
            this.isScrolling = true;
        }

        get speed() {
            const self = this;
            return Number(self.getAttribute('fx-data-speed')) || 0.5;
        }
        get direction() {
            const self = this;
            return self.getAttribute('fx-data-direction') || 'vertical';
        }
        get offset() {
            const self = this;
            return self.getAttribute('fx-data-offset') || 0;
        }

    }

}

export const FxParallaxElement = Effects._compose(HTMLElement, FxParallaxMixin);
customElements.define('fx-parallax', FxParallaxElement);

