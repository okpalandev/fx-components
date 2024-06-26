import styles from '../styles/neumorphix.scss' assert { type: 'scss' };

declare global {
    interface HTMLElementTagNameMap {
        'fx-neu': FxNeu;
    }
};


export interface FxNeu extends HTMLElement {
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
};

export class FxNeu extends HTMLElement implements FxNeu {
    static get observedAttributes() {
        return ['fx-neu-radius', 'fx-neu-shadow-light', 'fx-neu-shadow-dark', 'fx-neu-shadow-x', 'fx-neu-shadow-y', 'fx-neu-blur'];
    }

    static get styles() {
        return `
          ${styles}
        `;
    };

    constructor(...args: any[]) {
        super(...args as []);
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

customElements.define('fx-neu', FxNeu);
export { FxNeu as default };