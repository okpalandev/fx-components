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
        if ((self as HTMLElement)?.shadowRoot) {
            (self as HTMLElement)?.shadowRoot.innerHTML = `
                <style>${FxCard.styles}</style>
                <div>
                    <slot name="title" id="title"></slot>
                    <slot name="description" id="description"></slot>
                    <slot name="actions"></slot>
                </div>
            `;
        }
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        const observer = new MutationObserver(() => {});
        observer.observe((this as HTMLElement).shadowRoot, { attributes: true });

        if (oldValue !== newValue) {
            switch (name) {
                case 'title':
                    (this as HTMLElement).shadowRoot.getElementById('title')!.textContent = newValue;
                    break;
                case 'description':
                    (this as HTMLElement).shadowRoot.getElementById('description')!.textContent = newValue;
                    break;
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
        if (!(this as HTMLElement).hasAttribute('title')) {
            (this as HTMLElement).setAttribute('title', 'Title');
        }
        if (!(this as HTMLElement).hasAttribute('description')) {
            (this as HTMLElement).setAttribute('description', 'Description');
        }

        const titleElement = (this as HTMLElement)?.shadowRoot?.getElementById('title');
        const descriptionElement = (this as HTMLElement)?.shadowRoot?.getElementById('description');
        if (titleElement) {
            titleElement.textContent = (this as HTMLElement).getAttribute('title');
        }
        if (descriptionElement) {
            descriptionElement.textContent = (this as HTMLElement).getAttribute('description');
        }
    }
}

customElements.define('fx-card', FxCard as CustomElementConstructor);
export { FxCard };
