declare interface FxObserver {
    observe(target: Node, options: MutationObserverInit, callback: MutationCallback): void;
    disconnect(): void;
    unobserve(target: Node): void;
    observeAttributes(): void;
}
declare class FxObserver extends HTMLElement {
    observers: Map<Node, MutationObserver>;
    constructor();
    connectedCallback(): void;
    getRecords(): MutationRecord[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
export { FxObserver };
