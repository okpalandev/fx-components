import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import './fx-tooltip';

describe('FxTooltip', () => {
    let element: HTMLElement & { handleMouseEnter(): void; handleMouseLeave(): void; tooltip: HTMLDivElement; };

    beforeEach(async () => {
        element = await fixture(html`<fx-tooltip fx-data-tooltip="Tooltip content"></fx-tooltip>`) as HTMLElement & { handleMouseEnter(): void; handleMouseLeave(): void; tooltip: HTMLDivElement; };
    });

    it('should be defined', () => {
        expect(customElements.get('fx-tooltip')).to.be.instanceOf(Function);
    });

    it('should have a tooltip element', () => {
        const tooltip = element.querySelector('.fx-data-tooltip') as HTMLElement;
        expect(tooltip).to.exist;
        expect(tooltip.textContent).to.equal('Tooltip content');
    });

    it('should display the tooltip on mouse enter and hide on mouse leave', () => {
        const tooltip = element.querySelector('.fx-data-tooltip') as HTMLElement;

        element.handleMouseEnter();
        expect(tooltip.style.display).to.equal('block');

        element.handleMouseLeave();
        expect(tooltip.style.display).to.equal('none');
    });

    it('should add and remove event listeners on connect and disconnect', () => {
        const addEventListenerSpy = sinon.spy(element, 'addEventListener');
        const removeEventListenerSpy = sinon.spy(element, 'removeEventListener');

        (element as any).connectedCallback();
        expect(addEventListenerSpy.calledWith('mouseenter', element.handleMouseEnter)).to.be.true;
        expect(addEventListenerSpy.calledWith('mouseleave', element.handleMouseLeave)).to.be.true;

        (element as any).disconnectedCallback();
        expect(removeEventListenerSpy.calledWith('mouseenter', element.handleMouseEnter)).to.be.true;
        expect(removeEventListenerSpy.calledWith('mouseleave', element.handleMouseLeave)).to.be.true;

        addEventListenerSpy.restore();
        removeEventListenerSpy.restore();
    });

    it('should update tooltip content when fx-data-tooltip attribute changes', async () => {
        element.setAttribute('fx-data-tooltip', 'New tooltip content');

        // Use requestAnimationFrame to wait for the next animation frame
        await new Promise(resolve => requestAnimationFrame(resolve));

        const tooltip = element.querySelector('.fx-data-tooltip') as HTMLElement;
        expect(tooltip.textContent).to.equal('New tooltip content');
    });
});
