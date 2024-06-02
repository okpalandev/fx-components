import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon'; 
import './fx-parallax';

describe('FxParallax', () => {
    let element: HTMLElement & { handleScroll(): void; isScrolling: boolean; };

    beforeEach(async () => {
        element = await fixture(html`<fx-parallax fx-data-speed="0.5" fx-data-direction="vertical" fx-data-offset="0"></fx-parallax>`) as HTMLElement & { handleScroll(): void; isScrolling: boolean; };
    });

    it('should be defined', () => {
        expect(customElements.get('fx-parallax')).to.be.instanceOf(Function);
    });

    it('should have default attributes', () => {
        expect(element.getAttribute('fx-data-speed')).to.equal('0.5');
        expect(element.getAttribute('fx-data-direction')).to.equal('vertical');
        expect(element.getAttribute('fx-data-offset')).to.equal('0');
    });

    it('should apply styles on scroll', async () => {
        const originalRequestAnimationFrame = window.requestAnimationFrame;
        window.requestAnimationFrame = (callback: FrameRequestCallback) => {
            callback(0);
            return 0;
        };

        window.dispatchEvent(new Event('scroll'));

        const expectedTransform = `translateY(${window.scrollY * 0.5}px)`;
        expect(element.style.transform).to.equal(expectedTransform);

        window.requestAnimationFrame = originalRequestAnimationFrame;
    });

    it('should update styles when attribute changes', async () => {
        element.setAttribute('fx-data-speed', '1');
        window.dispatchEvent(new Event('scroll'));

        const expectedTransform = `translateY(${window.scrollY}px)`;
        expect(element.style.transform).to.equal(expectedTransform);
    });

    it('should handle attribute changes', async () => {
        element.setAttribute('fx-data-speed', '0.75');
        expect(element.getAttribute('fx-data-speed')).to.equal('0.75');

        element.setAttribute('fx-data-direction', 'horizontal');
        expect(element.getAttribute('fx-data-direction')).to.equal('horizontal');

        element.setAttribute('fx-data-offset', '10');
        expect(element.getAttribute('fx-data-offset')).to.equal('10');
    });

    it('should add and remove scroll event listeners on connect and disconnect', () => {
        const addEventListenerSpy = sinon.spy(window, 'addEventListener');
        const removeEventListenerSpy = sinon.spy(window, 'removeEventListener');

        (element as any).connectedCallback();
        expect(addEventListenerSpy.calledWith('scroll', element.handleScroll)).to.be.true;

        (element as any).disconnectedCallback();
        expect(removeEventListenerSpy.calledWith('scroll', element.handleScroll)).to.be.true;

        addEventListenerSpy.restore();
        removeEventListenerSpy.restore();
    });
});
