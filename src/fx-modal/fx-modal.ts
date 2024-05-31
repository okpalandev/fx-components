import { Fx } from '../utils/fx';
import  styles  from './fx-modal.css' assert { type: 'css' };

class FxModal extends HTMLElement {
    shadow: any;
    closeButton: any;
    modal: any;
    constructor() {
        super();
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


const FxModalElement = Fx._compose(HTMLElement,FxModal);
customElements.define('fx-modal', FxModalElement);
export { FxModal , FxModalElement as default};
