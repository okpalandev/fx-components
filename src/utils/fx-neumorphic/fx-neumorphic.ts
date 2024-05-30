import './fx-neumorphic.scss';
import  Fx  from '../helpers';
declare global {
    interface HTMLElementTagNameMap {
        'fx-neumorphic': FxNeumorphic.FxNeumorphic;
    }
};

namespace FxNeumorphic {
    export  interface FxNeumorphic extends HTMLElement {
        connectedCallback(): void;
        disconnectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    }

    export class FxNeumorphic extends HTMLElement implements FxNeumorphic {
        static get observedAttributes() {
            return ['fx-neu-radius', 'fx-neu-shadow-light', 'fx-neu-shadow-dark', 'fx-neu-shadow-x', 'fx-neu-shadow-y', 'fx-neu-blur'];
        }
        static get styles() {
            return `
            :host {
                --fx-neu-shadow-light: #fff;
                --fx-neu-shadow-dark: #000;
                --fx-neu-shadow-x: 10px;
                --fx-neu-shadow-y: 10px;
                --fx-neu-blur: 30px;
                --fx-neu-radius: 15px;
                display: inline-block;
                border-radius: var(--fx-neu-radius);
                overflow: hidden;
                will-change: box-shadow;
                transition: box-shadow 0.3s ease, border-radius 0.3s ease;
            }
        `;
        };

        constructor() {
            super();
            this.handleMouseEnter = this.handleMouseEnter.bind(this);
            this.handleMouseLeave = this.handleMouseLeave.bind(this);
        }

        connectedCallback(): void {
            this.addEventListener('mouseenter', this.handleMouseEnter);
            this.addEventListener('mouseleave', this.handleMouseLeave);
        }

        disconnectedCallback(): void {
            this.removeEventListener('mouseenter', this.handleMouseEnter);
            this.removeEventListener('mouseleave', this.handleMouseLeave);
        }

        handleMouseEnter(): void {
            this.style.boxShadow = 'var(--fx-neu-shadow-light) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-dark), var(--fx-neu-shadow-dark) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-light)';
            this.style.borderRadius = 'var(--fx-neu-radius)';
        }

        handleMouseLeave(): void {
            this.style.boxShadow = 'none';
            this.style.borderRadius = 'var(--fx-neu-radius)';
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
            if (oldValue !== newValue) {
                this.style.setProperty(`--${name}`, newValue);
            }
        }
    }

    customElements.define('fx-neumorphic', FxNeumorphic);

    export const FxNeuromorphicMixin = (Base: typeof FxNeumorphic) => class extends Base {
        static styles = Base.styles;
    };

    export const Neuromorphic = FxNeuromorphicMixin(FxNeumorphic);
    customElements.define('fx-neumorphic', Neuromorphic);
}

export default FxNeumorphic;