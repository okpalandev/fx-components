/// <reference path="../../src/fx-components.d.ts" />
export {};
declare class FxCard extends HTMLElement {
    static styles: string;
    constructor();
    connectedCallback(): void;
    render(): void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    setInitialContent(): void;
}
export declare const FxCardElement: any;
export { FxCard };
