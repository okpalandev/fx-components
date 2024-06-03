import { Effects } from '../utils/';
import styles from './fx-modal.css';
export { };

declare global {
    interface HTMLElementTagNameMap {
        'fx-modal': typeof FxModal;
    }
}

export interface FxModal extends HTMLElement {
    open(): void;
    close(): void;
}



export  class FxModal extends HTMLElement {
    shadow: any;
    closeButton: any;
    modal: any;
    constructor(...args: any[]) {
        super(...args as []);
        this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `
            <style>
                ${styles}    
            </style>
            <div class="fx-modal">
                <div class="fx-modal-content">
                    <span class="fx-close">&times;</span>
                    <slot></slot>
                </div>
            </div>
        `;
        this.closeButton = this.shadow.querySelector('.fx-close');
        this.modal = this.shadow.querySelector('.fx-modal');
        this.closeButton.addEventListener('click', this.close.bind(this));
    }
    
    open() {
        this.modal.style.display = "block";
    }

    close() {
        this.modal.style.display = "none";
    }
}

customElements.define('fx-modal', FxModal);
export { FxModal as default};
