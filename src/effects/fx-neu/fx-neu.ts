import styles from './styles.scss' assert { type: 'scss' };
import  Fx  from '../fx-components';
declare global {
    interface HTMLElementTagNameMap {
        'fx-neumorphic': FxNeu.FxNeu;
    }
};

namespace FxNeu {
    export interface FxNeu extends HTMLElement {
        connectedCallback(): void;
        disconnectedCallback(): void;
        attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    }

    export class FxNeu extends HTMLElement implements FxNeu {
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

    customElements.define('fx-neumorphic', FxNeu);

    export const FxNeuromorphicMixin = (Base: typeof FxNeu) => class extends Base {
        static styles = Base.styles;
    };

    export const Neuromorphic = FxNeuromorphicMixin(FxNeu);
    customElements.define('fx-neumorphic', Neuromorphic);
}

export { FxNeu };