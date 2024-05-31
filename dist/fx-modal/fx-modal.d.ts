declare const FxModal_base: any;
declare class FxModal extends FxModal_base {
    shadow: any;
    closeButton: any;
    modal: any;
    constructor();
    attachShadow(arg0: {
        mode: string;
    }): void;
    open(): void;
    close(): void;
}
export { FxModal };
