export {};
export default Effects;
/**
 * Namespace containing utility functions for Effects components.
 */
export declare namespace Effects {
    /**
     * Composes a class with one or more mixins.
     * @param ctor - The base class to compose with mixins.
     * @param mixins - The mixins to apply to the base class.
     * @returns The composed class.
     */
    function _compose(ctor?: {
        new (): HTMLElement;
        prototype: HTMLElement;
    }, ...mixins: any[]): any;
    /**
     * Interpolates a template string with CSS styles.
     * @param strings - The template strings.
     * @param values - The values to interpolate into the template.
     * @returns The interpolated CSS string.
     */
    function _css(strings: TemplateStringsArray, ...values: any[]): string;
    /**
     * Interpolates a template string with HTML content and returns a document fragment.
     * @param strings - The template strings.
     * @param values - The values to interpolate into the template.
     * @returns The document fragment containing the interpolated HTML.
     */
    function _html(strings: TemplateStringsArray, ...values: any[]): any;
    /**
     * Creates a <style> element with the specified styles.
     * @param styles - The CSS styles.
     * @returns The created <style> element.
     */
    function _style(styles: string): HTMLStyleElement;
    /**
     * Creates a <template> element with the specified HTML content.
     * @param html - The HTML content.
     * @returns The created <template> element.
     */
    function _template(html: string): HTMLTemplateElement;
}
