/// <reference types="jest" />
import { html, fixture, expect } from '@open-wc/testing';
import './fx-card';

describe('FxCard', () => {
    let element: HTMLElement;

    beforeEach(async () => {
        element = await fixture(html`<fx-card fx-title="Test Title" fx-description="Test Description"></fx-card>`);
    });

    it('should have role attribute set to card', () => {
        expect(element.getAttribute('role')).to.equal('card');
    });

    it('should set initial content based on attributes', () => {
        const shadowRoot = element.shadowRoot as ShadowRoot;
        const title = shadowRoot.getElementById('fx-title') as HTMLElement;
        const description = shadowRoot.getElementById('fx-description') as HTMLElement;

        expect(title.textContent).to.equal('Test Title');
        expect(description.textContent).to.equal('Test Description');
    });

    it('should reflect attribute changes in the shadow DOM', async () => {
        element.setAttribute('fx-title', 'New Title');
        element.setAttribute('fx-description', 'New Description');

        await element.updateComplete;

        const shadowRoot = element.shadowRoot as ShadowRoot;
        const title = shadowRoot.getElementById('fx-title') as HTMLElement;
        const description = shadowRoot.getElementById('fx-description') as HTMLElement;

        expect(title.textContent).to.equal('New Title');
        expect(description.textContent).to.equal('New Description');
    });

    it('should render the slots', () => {
        const shadowRoot = element.shadowRoot as ShadowRoot;
        const slots = shadowRoot.querySelectorAll('slot');

        expect(slots).to.have.lengthOf(3);
        expect(slots[0].getAttribute('name')).to.equal('fx-title');
        expect(slots[1].getAttribute('name')).to.equal('fx-description');
        expect(slots[2].getAttribute('name')).to.be.null;
    });

});
