/**
 * Composes a class with one or more mixins.
 * @param ctor - The base class to compose with mixins.
 * @param mixins - The mixins to apply to the base class.
 * @returns The composed class.
 */
declare function _compose(ctor?: {
    new (): HTMLElement;
    prototype: HTMLElement;
}, ...mixins: any[]): any;
/**
 * Interpolates a template string with CSS styles.
 * @param strings - The template strings.
 * @param values - The values to interpolate into the template.
 * @returns The interpolated CSS string.
 */
declare function _css(strings: TemplateStringsArray, ...values: any[]): string;
/**
 * Interpolates a template string with HTML content and returns a document fragment.
 * @param strings - The template strings.
 * @param values - The values to interpolate into the template.
 * @returns The document fragment containing the interpolated HTML.
 */
declare function _html(strings: TemplateStringsArray, ...values: any[]): any;
/**
 * Creates a <template> element with the specified HTML content.
 * @param html - The HTML content.
 * @returns The created <template> element.
 */
declare function _template(html: string): HTMLTemplateElement;
export declare const Effects: {
    _compose: typeof _compose;
    _css: typeof _css;
    _html: typeof _html;
    _template: typeof _template;
};
export {};
