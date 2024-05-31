import { Fx } from '../utils/fx';

export { };

declare global {
    interface HTMLElementTagNameMap {
        'fx-tooltip': typeof FxTooltip;
    }
}

export declare interface FxTooltip {
    constructor(): void;
    prototype: {
        handleMouseEnter: () => void;
        handleMouseLeave: () => void;
    } | undefined;
};

export declare class FxTooltip extends HTMLElement {
    constructor();
    handleScroll(): void;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    tooltip: HTMLDivElement;
    observedAttributes: string[];
}

export function FxTooltipMixin<T extends new (...args: any[]) => {}>(Base: T) {
    return class extends HTMLElement {
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
}

 const FxTooltipElement =  Fx._compose(HTMLElement, FxTooltipMixin);

customElements.define('fx-tooltip', FxTooltipElement);
export { FxTooltipElement };