export { };

/**
 * Composes a class with one or more mixins.
 * @param ctor - The base class to compose with mixins.
 * @param mixins - The mixins to apply to the base class.
 * @returns The composed class.
 */
export function _compose(ctor = HTMLElement, ...mixins: any[]) {
    return mixins.reduce((BaseClass, mixin) => mixin(BaseClass), ctor);
};

/**
 * Interpolates a template string with CSS styles.
 * @param strings - The template strings.
 * @param values - The values to interpolate into the template.
 * @returns The interpolated CSS string.
 */
export function _css(strings: TemplateStringsArray, ...values: any[]) {
    return strings.reduce((acc, str, i) => {
        return acc + str + (values[i] || '');
    }, '');
};

/**
 * Interpolates a template string with HTML content and returns a document fragment.
 * @param strings - The template strings.
 * @param values - The values to interpolate into the template.
 * @returns The document fragment containing the interpolated HTML.
 */
export function _html(strings: TemplateStringsArray, ...values: any[]) {
    return new Function('return `' + strings.reduce((acc, str, i) => {
        return acc + str + (values[i] || '');
    }, '') + '`')();
};



/**
 * Creates a <template> element with the specified HTML content.
 * @param html - The HTML content.
 * @returns The created <template> element.
 */
export function _template(html: string) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
};

