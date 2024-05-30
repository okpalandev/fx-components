interface FxObserver {
    observe(target: Node, options: MutationObserverInit, callback: MutationCallback): void;
    disconnect(): void;
    unobserve(target: Node): void;
    observeAttributes(): void;
}

class FxObserver extends HTMLElement  {
    observers: MutationObserver[] = [];

    constructor() {
        super();
        this.observers = [];
    }

    observe(target: Node, options: MutationObserverInit, callback: MutationCallback) {
        const observer = new MutationObserver(callback);
        observer.observe(target, options);
        this.observers.push(observer);
    }

    disconnect() {
        this.observers.forEach((observer) => observer.disconnect());
    }

    getRecords() {
        return this.observers.flatMap((observer: MutationObserver) => observer.takeRecords());
    }

    unobserve(target: Node) {
        this.observers = this.observers.filter((observer) => {
            if (observer.target === target) {
                observer.disconnect();
                return false;
            }
            return true;
        });
    }

    observeAttributes() {
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    const { attributeName } = mutation;
                    const newValue = mutation.target.getAttribute(attributeName);
                    // Do something with attributeName and newValue
                }
            });
        });
        if (this.shadowRoot !== null) {
            observer.observe(this.shadowRoot, { attributes: true });
        }
    }
}

export { FxObserver };