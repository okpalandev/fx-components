import { Fx } from '../utils/fx.js';
import { FxObserver } from '../utils/fx-observer.ts';
import styles from './fx-card.css';

class FxCard extends HTMLElement {
    static styles = `
        ${styles}
    `;

    constructor() {
        super();
        (this as HTMLElement).attachShadow({ mode: 'open' });
        (this as HTMLElement).setAttribute('role', 'card');
        this.setInitialContent();
    }

    connectedCallback() {
        this.render();
        this.observeAttributes();
        this.setInitialContent();
    }

    render() {
        const self = this;
        const shadowRoot = (self as HTMLElement).shadowRoot;
        if (shadowRoot) {
            shadowRoot.innerHTML = `
                <style>${FxCard.styles}</style>
                <div>
                    <slot name="fx-title" id="fx-title"></slot>
                    <slot name="fx-description" id="fx-description"></slot>
                    <slot name="actions"></slot>
                </div>
            `;
        }
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        const shadowRoot = (this as HTMLElement).shadowRoot;
        if (shadowRoot) {
            const observer = new MutationObserver(() => {});
            observer.observe(shadowRoot, { attributes: true });

            if (oldValue !== newValue) {
                switch (name) {
                    case 'fx-title':
                        shadowRoot.getElementById('fx-title')!.textContent = newValue;
                        break;
                    case 'fx-description':
                        shadowRoot.getElementById('fx-description')!.textContent = newValue;
                        break;
                }
            }
        }
    }

    observeAttributes() {
        // Implement the observeAttributes method here
    }

    setInitialContent() {
        if (!(this as HTMLElement).hasAttribute('role')) {
            (this as HTMLElement).setAttribute('role', 'card');
        }
        if (!(this as HTMLElement).hasAttribute('fx-title')) {
            (this as HTMLElement).setAttribute('fx-title', 'fx-title');
        }
        if (!(this as HTMLElement).hasAttribute('fx-description')) {
            (this as HTMLElement).setAttribute('fx-description', 'fx-description');
        }

        const titleElement = (this as HTMLElement)?.shadowRoot?.getElementById('fx-title');
        const descriptionElement = (this as HTMLElement)?.shadowRoot?.getElementById('fx-description');
        if (titleElement) {
            titleElement.textContent = (this as HTMLElement).getAttribute('fx-title');
        }
        if (descriptionElement) {
            descriptionElement.textContent = (this as HTMLElement).getAttribute('fx-description');
        }
    }
}

customElements.define('fx-card', FxCard as CustomElementConstructor);
export { FxCard };
