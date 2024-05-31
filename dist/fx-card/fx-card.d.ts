export {};
declare const FxCard_base: any;
declare class FxCard extends FxCard_base {
    static styles: string;
    constructor();
    connectedCallback(): void;
    render(): void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    observeAttributes(): void;
    setInitialContent(): void;
}
export { FxCard };
