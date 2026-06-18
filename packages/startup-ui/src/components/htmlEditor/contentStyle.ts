/**
 * Base editor content styles (content_style TinyMCE).
 * Must match how content is rendered on the site (the .g-html class).
 * The consumer can extend them via the `contentStyle` prop of SHtmlEditor.
 */
export const htmlEditorContentStyle = `        .g-html {
            line-height: 1.8;
        }
        .g-html img,
        .g-html > div,
        .g-html iframe {
            max-width: 100%;
        }
        .g-html iframe {
            max-width: 100%;
            height: auto !important;
            aspect-ratio: attr(width) / attr(height);
        }
        .g-html {
            font-weight: normal;
        }
        .g-html h2:not(:first-child) {
            margin-top: 30px;
        }
        .g-html li {
            margin-bottom: 10px;
        }
        .g-html ul, ol li > p:last-child {
            margin-bottom: 0;
        }
        .g-html blockquote {
            margin-top: 0;
            margin-left: 0;
            margin-right: 0;
            padding-left: 2rem;
            border-left: 10px #d1d1d1 solid;
        }
        .g-html .s-note {
            display: flex;
            align-items: center;
            border-radius: 6px;
            margin-bottom: 2rem;
            padding: 1rem 1.5rem;
            gap: 1rem;
            background-color: #d7ddf3;
            color: #000;
        }
        .g-html .s-note p {
            margin: 0;
        }
        .g-html .s-note > svg {
            align-self: flex-start;
            font-size: 24px;
            color: #143B74;
        }
        .g-html .s-note.attention {
            background-color: #faecd8;
        }
        .g-html .s-note.attention > svg {
            color: #e6a23c;
        }
        .g-html .s-note.success {
            background-color: #b8e5b8;
            color: #3f983f;
        }
        .g-html .s-note.error {
            background-color: #ffece8;
            border-color: #ea524a;
            color: #ea524a;
        }
        .s-img-bg {
            padding: 15px;
            display: flex;
            background-color: #f2f3f4;
            border-radius: 20px;
            margin-bottom: 6px;
        }
        .s-img-bg img {
            height: auto;
            max-width: 50%;
            margin: 0 auto;
            border-radius: 6px;
        }

        .s-img-bg.s-img-fullwidth img {
            max-width: 100%;
        }

        .s-img-bg.s-img-border img {
            border: 1px solid #d1d1d1;
        }

        /* Placeholder for the empty editor: TinyMCE sets data-mce-placeholder on the body,
           but the Oxide content CSS that renders it isn't injected into the iframe (content_css
           is disabled), so the rule is provided here, inside the injected content_style.
           The ::before inherits the body font/line-height, so it lines up with the first row. */
        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            content: attr(data-mce-placeholder);
            color: #ccc;
            position: absolute;
            cursor: text;
        }`;

/** Order and mapping of block labels to TinyMCE formats (block_formats) */
export const HTML_EDITOR_BLOCK_ORDER: Array<[string, string]> = [
    ['paragraph', 'p'],
    ['h1', 'h1'],
    ['h2', 'h2'],
    ['h3', 'h3'],
    ['h4', 'h4'],
    ['blockquote', 'blockquote'],
    ['code', 'code'],
    ['note', 'note'],
    ['attention', 'attention'],
    ['success', 'success'],
    ['error', 'error'],
];
