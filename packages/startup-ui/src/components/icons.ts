import { h, mergeProps, type FunctionalComponent } from 'vue';

/**
 * Built-in inline-SVG icons used for the components' own "chrome" (carets, chevrons, close, etc.),
 * so the library carries no hard dependency on FontAwesome. Each is a tiny functional component
 * rendering an `<svg class="s-icon">` (sized via .s-icon in style.scss, color = currentColor).
 *
 * `mergeProps` merges any passed attrs onto the svg, so `class`, `:style`, `@click` work as usual
 * (e.g. STree's `s-tree-toggle` class, SColumnSettings' `reorder-btn` drag handle, close-button clicks).
 */
function make(children: () => any, fill: string = 'none'): FunctionalComponent {
    const comp: FunctionalComponent = (_props, { attrs }) =>
        h('svg', mergeProps(
            { class: 's-icon', viewBox: '0 0 16 16', fill, xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' },
            attrs,
        ), children());
    comp.inheritAttrs = false;
    return comp;
}

// stroked path with sensible defaults
const p = (d: string, extra: Record<string, any> = {}) =>
    h('path', { d, stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none', ...extra });

/** Thin chevron pointing down (rotate via CSS for other directions). */
export const SIconChevron = make(() => p('M3.5 6 8 10.5 12.5 6'));

/** Solid caret pointing down. */
export const SIconCaret = make(() => h('path', { d: 'M4 6 8 11 12 6 Z', fill: 'currentColor' }));

/** Close / xmark. */
export const SIconClose = make(() => p('M4 4 12 12 M12 4 4 12'));

/** Hamburger / bars (also the reorder handle). */
export const SIconBars = make(() => p('M2.5 4.5 H13.5 M2.5 8 H13.5 M2.5 11.5 H13.5', { 'stroke-width': 1.4 }));

/** Table columns. */
export const SIconColumns = make(() => [
    h('rect', { x: 2, y: 3, width: 12, height: 10, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.3, fill: 'none' }),
    p('M8 3 V13', { 'stroke-width': 1.3 }),
    p('M2 6.2 H14', { 'stroke-width': 1.1 }),
]);

/** Undo / rotate-left. */
export const SIconUndo = make(() => [
    p('M6 4.2 H8.7 a3.4 3.4 0 1 1 -3.4 3.4'),
    p('M6.3 2 4 4.2 6.3 6.4', { 'stroke-width': 1.4 }),
]);

/** Magnifying glass with a plus (zoom in). */
export const SIconZoomIn = make(() => [
    h('circle', { cx: 7, cy: 7, r: 4.3, stroke: 'currentColor', 'stroke-width': 1.4, fill: 'none' }),
    p('M10.2 10.2 14 14', { 'stroke-width': 1.6 }),
    p('M7 5.2 V8.8 M5.2 7 H8.8', { 'stroke-width': 1.3 }),
]);

/** Eye with a slash (hidden / not published). */
export const SIconEyeSlash = make(() => [
    p('M2 8 C3.6 5.6 5.6 4.5 8 4.5 S12.4 5.6 14 8 C12.4 10.4 10.4 11.5 8 11.5 S3.6 10.4 2 8 Z', { 'stroke-width': 1.2 }),
    h('circle', { cx: 8, cy: 8, r: 1.7, stroke: 'currentColor', 'stroke-width': 1.2, fill: 'none' }),
    p('M2.7 2.7 13.3 13.3', { 'stroke-width': 1.4 }),
]);

/** Copy (two sheets). */
export const SIconCopy = make(() => [
    h('rect', { x: 5, y: 5, width: 9, height: 9, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.3, fill: 'none' }),
    p('M2 11 V3.5 A1.5 1.5 0 0 1 3.5 2 H11', { 'stroke-width': 1.3 }),
]);

/** Checkmark. */
export const SIconCheck = make(() => p('M3.5 8.5 6.5 11.5 12.5 4.5', { 'stroke-width': 1.8 }));

/** Circle with a question mark (default tooltip trigger). */
export const SIconQuestion = make(() => [
    h('circle', { cx: 8, cy: 8, r: 6.5, stroke: 'currentColor', 'stroke-width': 1.3, fill: 'none' }),
    p('M6 6.3 A2 2 0 0 1 9.6 7.5 C9.6 8.8 8 9 8 10.2', { 'stroke-width': 1.3 }),
    h('circle', { cx: 8, cy: 12, r: 0.85, fill: 'currentColor' }),
]);
