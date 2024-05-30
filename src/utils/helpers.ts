export {};
export default Fx;
export namespace Fx {
    export  function _compose(ctor = HTMLElement, ...mixins: any[]) {
        return mixins.reduce((BaseClass, mixin) => mixin(BaseClass), ctor);
    }; 

    export function _css(strings: TemplateStringsArray, ...values: any[]) {
        return strings.reduce((acc, str, i) => {
            return acc + str + (values[i] || '');
        }, '');
    };

    export function _html(strings: TemplateStringsArray, ...values: any[]) {
        return new Function('return `' + strings.reduce((acc, str, i) => {
            return acc + str + (values[i] || '');
        }, '') + '`')();
    };

    export function _style(styles: string) {
        const style = document.createElement('style');
        style.textContent = styles;
        return style;
    };
    
}
