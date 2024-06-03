declare interface FxObserver {
    observe(target: Node, options: MutationObserverInit, callback: MutationCallback): void;
    disconnect(): void;
    unobserve(target: Node): void;
    observeAttributes(): void;
}


class FxObserver extends HTMLElement  {
    observers: Map<Node, MutationObserver> = new Map();
    constructor(...args: any[]) {
        super(...args as []);
        this.observeAttributes = this.observeAttributes.bind(this);

    }

    connectedCallback() {
        this.observeAttributes();
    }

    observe(target: Node, options: MutationObserverInit, callback: MutationCallback) {
        const observer = new MutationObserver(callback);
        observer.observe(target, options);
        this.observers.set(target, observer);
    }

    unobserve(target: Node) {
        const observer = this.observers.get(target);
        if (observer) {
            observer.disconnect();
            this.observers.delete(target);
        }
    }
   
    disconnect() {
        this.observers.forEach((observer) => observer.disconnect());
    }

    getRecords() {
        return Array.from(this.observers.values()).flatMap((observer: MutationObserver) => observer.takeRecords());
    }

    observeAttributes() {
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    this.attributeChangedCallback(mutation.attributeName!, mutation.oldValue, mutation.target.nodeValue);            
                }
            });
        });
        if (this.shadowRoot !== null) {
            observer.observe(this.shadowRoot, { attributes: true });
        }
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log('attributeChangedCallback', name, oldValue, newValue);
    }

    disconnectedCallback() {
        this.disconnect();
    }

    

}



export { FxObserver };
