/// <reference path="../fx-components.d.ts" />
import { FxObserver } from '../fx-observer/fx-observer';
import {Effects} from '../utils/effects';

import styles from './fx-card.css';

export { };

class FxCard extends Effects._compose(HTMLElement,FxObserver) {
    static styles = `
        ${styles}
    `;

    constructor() {
        super();
        (this as unknown as HTMLElement).attachShadow({ mode: 'open' });
        (this as unknown as HTMLElement).setAttribute('role', 'card');
        this.setInitialContent();
    }
    
    connectedCallback() {
        this.render();
        this.observeAttributes();
        this.setInitialContent();
    }

    render() {
        const self = this;
        const shadowRoot = (self as unknown as HTMLElement).shadowRoot;
        if (shadowRoot) {
            shadowRoot.innerHTML = `
                <style>${FxCard.styles}</style>
                <div>
                    <slot name="fx-title" id="fx-title"></slot>
                    <slot name="fx-description" id="fx-description"></slot>
                    <slot name="fx-actions"></slot>
                </div>
            `;
        }
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        const shadowRoot = (this as unknown as HTMLElement).shadowRoot;
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

   
    setInitialContent() {
        if (!(this as unknown as HTMLElement).hasAttribute('role')) {
            (this as unknown as HTMLElement).setAttribute('role', 'card');
        }
        if (!(this as unknown as HTMLElement).hasAttribute('fx-title')) {
            (this as unknown as HTMLElement).setAttribute('fx-title', 'fx-title');
        }
        if (!(this as unknown as HTMLElement).hasAttribute('fx-description')) {
            (this as unknown as HTMLElement).setAttribute('fx-description', 'fx-description');
        }

        const titleElement = (this as unknown as HTMLElement)?.shadowRoot?.getElementById('fx-title');
        const descriptionElement = (this as unknown as HTMLElement)?.shadowRoot?.getElementById('fx-description');
        if (titleElement) {
            titleElement.textContent = (this as unknown as HTMLElement).getAttribute('fx-title');
        }
        if (descriptionElement) {
            descriptionElement.textContent = (this as unknown as HTMLElement).getAttribute('fx-description');
        }
    }
}

customElements.define('fx-card', FxCard as unknown as CustomElementConstructor);
export { FxCard };
