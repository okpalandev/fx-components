import { Effects } from '../utils/effects';

export { };

declare global {
    interface HTMLElementTagNameMap {
        'fx-tooltip':  FxTooltip;
    }
}




 class FxTooltip extends HTMLElement {
        tooltip!: HTMLDivElement;
        constructor(...args: any[]) {
            super(...args as []);
            this.handleMouseEnter = this.handleMouseEnter.bind(this);
            this.handleMouseLeave = this.handleMouseLeave.bind(this);
        }

        connectedCallback() {
            this.tooltip = document.createElement('div');
            this.tooltip.className = 'fx-data-tooltip';
            this.tooltip.textContent = this.getAttribute('fx-data-tooltip');
            this.tooltip.style.position = 'absolute';
            this.tooltip.style.zIndex = '1';
            this.tooltip.style.display = 'none';
            this.appendChild(this.tooltip);
            this.addEventListener('mouseenter', this.handleMouseEnter);
            this.addEventListener('mouseleave', this.handleMouseLeave);
        }

        disconnectedCallback() {
            this.removeChild(this.tooltip);
            this.removeEventListener('mouseenter', this.handleMouseEnter);
            this.removeEventListener('mouseleave', this.handleMouseLeave);
        }

        handleMouseEnter() {
            this.tooltip.style.display = 'block';
        }

        handleMouseLeave() {
            this.tooltip.style.display = 'none';
        }

        static get observedAttributes() {
            return ['fx-data-tooltip'];
        }
    }
    
customElements.define('fx-tooltip', FxTooltip);
 export { FxTooltip as default};
