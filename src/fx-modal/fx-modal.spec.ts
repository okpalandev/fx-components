import { html, fixture, expect } from '@open-wc/testing';
import './fx-modal';

describe('FxModal', () => {
    let element: HTMLElement;

    beforeEach(async () => {
        element = await fixture(html`<fx-modal></fx-modal>`);
    });

    it('should be defined', () => {
        expect(element).to.be.instanceOf(HTMLElement);
    });

    it('should render shadow DOM with styles and structure', () => {
        const shadowRoot = element.shadowRoot as ShadowRoot;
        const modal = shadowRoot.querySelector('.fx-modal');
        const modalContent = shadowRoot.querySelector('.fx-modal-content');
        const closeButton = shadowRoot.querySelector('.fx-close');

        expect(modal).to.exist;
        expect(modalContent).to.exist;
        expect(closeButton).to.exist;
    });

    it('should open the modal when open method is called', () => {
        const modal = (element.shadowRoot as ShadowRoot).querySelector('.fx-modal') as HTMLElement;

        (element as any).open();
        expect(modal.style.display).to.equal('block');
    });

    it('should close the modal when close method is called', () => {
        const modal = (element.shadowRoot as ShadowRoot).querySelector('.fx-modal') as HTMLElement;

        (element as any).open(); // Open first to test close
        (element as any).close();
        expect(modal.style.display).to.equal('none');
    });

    it('should close the modal when close button is clicked', () => {
        const closeButton = (element.shadowRoot as ShadowRoot).querySelector('.fx-close') as HTMLElement;
        const modal = (element.shadowRoot as ShadowRoot).querySelector('.fx-modal') as HTMLElement;

        (element as any).open(); // Open first to test close
        closeButton.click();
        expect(modal.style.display).to.equal('none');
    });
});
