export {};
export default Fx;
export namespace Fx {

    export  function _compose(ctor = HTMLElement, ...mixins: any[]) {
        return mixins.reduce((BaseClass, mixin) => mixin(BaseClass), ctor);
    }; 
}
