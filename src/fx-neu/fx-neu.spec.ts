import { html, fixture, expect } from '@open-wc/testing';
import './fx-neu';
import { FxNeu } from './fx-neu';

describe('FxNeu', () => {
    let element: HTMLElement;

    beforeEach(async () => {
        element = await fixture(html`<fx-neu></fx-neu>`);
    });

    it('should be defined', () => {
        expect(element).to.be.instanceOf(HTMLElement);
    });

    it('should apply styles on mouse enter and remove on mouse leave', () => {
        const shadowStyle = 'var(--fx-neu-shadow-light) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-dark), var(--fx-neu-shadow-dark) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-light)';
        const borderRadius = 'var(--fx-neu-radius)';

        element.dispatchEvent(new Event('mouseenter'));
        expect(element.style.boxShadow).to.equal(shadowStyle);
        expect(element.style.borderRadius).to.equal(borderRadius);

        element.dispatchEvent(new Event('mouseleave'));
        expect(element.style.boxShadow).to.equal('none');
        expect(element.style.borderRadius).to.equal(borderRadius);
    });

    it('should set styles based on attributes', async () => {
        const element = await fixture<typeof FxNeu>(html`<fx-neu fx-neu-radius="10px" fx-neu-shadow-light="1px" fx-neu-shadow-dark="2px" fx-neu-shadow-x="3px" fx-neu-shadow-y="4px" fx-neu-blur="5px"></fx-neu>`);

        expect(element.style.getPropertyValue('--fx-neu-radius')).to.equal('10px');
        expect(element.style.getPropertyValue('--fx-neu-shadow-light')).to.equal('1px');
        expect(element.style.getPropertyValue('--fx-neu-shadow-dark')).to.equal('2px');
        expect(element.style.getPropertyValue('--fx-neu-shadow-x')).to.equal('3px');
        expect(element.style.getPropertyValue('--fx-neu-shadow-y')).to.equal('4px');
        expect(element.style.getPropertyValue('--fx-neu-blur')).to.equal('5px');
        
    });
});
