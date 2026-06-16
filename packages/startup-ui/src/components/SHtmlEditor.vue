<template>
    <div class="s-htmleditor" :style="rootStyle">
        <component v-if="Editor" :is="Editor" :init="initOptions" v-model="model" @update:modelValue="onEditorChange" />
    </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, computed, onMounted } from 'vue';
import axios from "axios";
import { tRaw } from '../locale';
import { deepMerge } from '../utils/deepMerge';
import { htmlEditorContentStyle, HTML_EDITOR_BLOCK_ORDER } from './htmlEditor/contentStyle';

const Editor = shallowRef<any>(null);

export interface SHtmlEditorProps {
    uploadUrl?: string;
    placeholder?: string;
    media?: boolean;
    height?: number;
    /** Additional TinyMCE plugins (merged with the base ones) */
    plugins?: string[];
    /** Toolbar override */
    toolbar?: string;
    /** TinyMCE menu bar (disabled by default) */
    menubar?: string | boolean;
    /** Additional content CSS — appended to the base content_style */
    contentStyle?: string;
    /** External content CSS (content_css) */
    contentCss?: string | string[];
    /** Header offset for fullscreen, px. Alternative — the --s-header-height CSS variable */
    headerOffset?: number;
    /**
     * Deep merge into the default TinyMCE configuration (highest priority).
     * The `setup` field is composed with the library one (called after it),
     * `plugins` are merged with the base ones.
     */
    init?: Record<string, any>;
}

const props = defineProps<SHtmlEditorProps>();

const emits = defineEmits<{
    (e: 'changeContent'): void;
    (e: 'init', editor: any): void;
}>();

const model = defineModel<string>();

// Header offset for correct fullscreen
const rootStyle = computed(() =>
    props.headerOffset != null ? { '--s-header-height': `${props.headerOffset}px` } as Record<string, string> : undefined
);

onMounted(async () => {
    // tinymce — a consumer's peer dependency, @ts-ignore suppresses missing-types errors
    // The next line is needed to disable the API-key request, do not remove!
    // @ts-ignore
    await import('tinymce/tinymce');
    // @ts-ignore
    await import('tinymce/icons/default');
    // @ts-ignore
    await import('tinymce/themes/silver/theme');
    // @ts-ignore
    await import('tinymce/models/dom/model');
    // @ts-ignore
    await import('tinymce/plugins/advlist');
    // @ts-ignore
    await import('tinymce/plugins/lists');
    // @ts-ignore
    await import('tinymce/plugins/link');
    // @ts-ignore
    await import('tinymce/plugins/image');
    // @ts-ignore
    await import('tinymce/plugins/charmap');
    // @ts-ignore
    await import('tinymce/plugins/fullscreen');
    // @ts-ignore
    await import('tinymce/plugins/insertdatetime');
    // @ts-ignore
    await import('tinymce/plugins/table');
    // @ts-ignore
    await import('tinymce/plugins/autolink');
    // @ts-ignore
    await import('tinymce/plugins/code');
    // @ts-ignore
    if (props.media) await import('tinymce/plugins/media');
    // @ts-ignore
    await import('tinymce/skins/ui/oxide/skin.min.css');
    // @ts-ignore
    await import('tinymce/skins/ui/oxide/content.min.css');
    // @ts-ignore
    Editor.value = (await import('@tinymce/tinymce-vue')).default;
});

// Localized block labels → TinyMCE block_formats string
function buildBlockFormats(): string {
    const blocks = tRaw<Record<string, string>>('htmlEditor.blocks');
    return HTML_EDITOR_BLOCK_ORDER.map(([key, tag]) => `${blocks[key]}=${tag}`).join('; ');
}

// Content font is taken from the host (--s-font-family) — the editor's iframe is a separate document,
// CSS variables do not cascade there, so we set the value explicitly.
function hostFontFamily(): string {
    if (typeof document === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue('--s-font-family').trim();
}

// Library setup logic: wrapping images in a div + emitting the editor instance
function librarySetup(editor: any) {
    // Expose the editor instance for custom logic (registering plugins/buttons, etc.)
    editor.on('init', () => emits('init', editor));

    // Whether the image was previously wrapped in a div
    const isImgAlreadyWrapped = (img: any) => {
        const parent = img.parentNode;
        return !!(parent && parent.tagName && parent.tagName.toLowerCase() === 'div' && parent.firstElementChild === img && parent.children.length === 1);
    };

    // Wrap img in a div, moving custom classes onto the wrapper
    const wrapImageNode = (img: any) => {
        if (!img || !img.parentNode) return;
        if (isImgAlreadyWrapped(img)) return;

        const doc = editor.getDoc();
        const parent = img.parentNode;
        const classes = img.getAttribute ? (img.getAttribute('class') || '') : '';

        editor.undoManager.transact(() => {
            const wrapper = doc.createElement('div');
            if (classes) {
                wrapper.className = classes;
                img.removeAttribute('class');
            }

            parent.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        });

        // Update the editor state (toolbar, selection, etc.), otherwise the wrapper appears only after saving
        try { editor.nodeChanged(); } catch (err) {}
    };

    const wrapImagesInRoot = (root: any) => {
        if (!root || !root.querySelectorAll) return;
            const imgs = root.querySelectorAll('img');
            imgs.forEach((img: any) => {
            try { wrapImageNode(img); } catch (err) {}
        });
    };

  // Everything inside init so that doc/body are already available
  editor.on('init', () => {
    const doc = editor.getDoc();
    if (!doc) return;

    // 1) Monkey-patch insertContent: intercept the html before insertion
    const origInsertContent = editor.insertContent.bind(editor);
    editor.insertContent = (content: any, args: any) => {
      if (typeof content === 'string' && content.includes('<img')) {
        const tmp = doc.createElement('div');
        tmp.innerHTML = content;
        wrapImagesInRoot(tmp);
        content = tmp.innerHTML;
      }
      return origInsertContent(content, args);
    };

    // 3) Modify the DOM fragment before insertion for paste/drag&drop
    editor.on('PastePostProcess', (e: any) => {
      // e.node — a DocumentFragment / element already in the editor's document
      wrapImagesInRoot(e.node);
    });

    // 4) Catch node additions and class changes
    const observer = new MutationObserver((mutations) => {
      // Wrap in a transaction so the edits collapse into undo as a single step
      editor.undoManager.transact(() => {
        for (const m of mutations) {
          if (m.type === 'childList') {
            m.addedNodes.forEach((node: any) => {
              if (node.nodeType !== 1) return;
              const tag = node.tagName && node.tagName.toLowerCase();
              if (tag === 'img') {
                wrapImageNode(node);
              } else {
                // if a container was inserted, look for nested img
                wrapImagesInRoot(node);
              }
            });
          } else if (m.type === 'attributes' && m.attributeName === 'class') {
            const target = m.target as HTMLElement;
            // if the class was changed on an img — move the class to the wrapper
            if (target && target.tagName && target.tagName.toLowerCase() === 'img') {
              if (!isImgAlreadyWrapped(target) && (target.getAttribute('class') || '').trim()) {
                wrapImageNode(target);
              } else if ((target.getAttribute('class') || '').trim()) {
                // If the image is already wrapped in a div, add the class to the wrapper
                const wrapper = target.parentNode as HTMLElement;
                const classes = target.getAttribute ? (target.getAttribute('class') || '') : '';
                if (classes && wrapper) {
                    wrapper.className = classes;
                    target.removeAttribute('class');
                }
              }
            }
          }
        }
      });

      try { editor.nodeChanged(); } catch (err) {}
    });

    observer.observe(editor.getBody(), {
      childList: true,
      subtree: true,
      attributes: true,        // needed to catch class assignment by a plugin
      attributeFilter: ['class']
    });

    // Disconnect the observer when the editor is destroyed
    editor.on('remove', () => observer.disconnect());
  });
}

// Destructure the user configuration: setup and plugins are handled specially
const userInit = props.init ?? {};
const { setup: userSetup, plugins: userPlugins, ...restInit } = userInit;

// Setup composition: first the library one, then the user one
function composedSetup(editor: any) {
    librarySetup(editor);
    if (typeof userSetup === 'function') userSetup(editor);
}

// Base plugins + the consumer's additional plugins (via the prop and via init.plugins)
const basePlugins = [
    'advlist', 'lists', 'link', 'image', 'charmap',
    'fullscreen', 'insertdatetime', 'table', 'autolink', 'code',
    ...(props.media ? ['media'] : []),
];
const allPlugins = Array.from(new Set([
    ...basePlugins,
    ...(props.plugins ?? []),
    ...(Array.isArray(userPlugins) ? userPlugins : []),
]));

function buildInitOptions(): Record<string, any> {
    const contentFont = hostFontFamily();
    const baseConfig: Record<string, any> = {
        license_key: 'mit',
        selector: 'textarea',
        height: props.height ?? 500,
        placeholder: props.placeholder || '',
        menubar: props.menubar ?? false,
        body_class: 'g-html',
        block_formats: buildBlockFormats(),
        content_style: [
            contentFont ? `body { font-family: ${contentFont}; }` : '',
            htmlEditorContentStyle,
            props.contentStyle || '',
        ].filter(Boolean).join('\n'),
        // Inline skins (skin.min.css/content.min.css are imported above) — without depending on /tinymce files on the host
        skin: false,
        content_css: props.contentCss ?? false,
        toolbar: props.toolbar ?? `blocks | bullist numlist | link image | ${props.media ? 'media | ' : ''}fullscreen code `,
        branding: false, // Remove branding
        promotion: false, // Remove promotional offers
        // Block any requests to external servers
        service_worker: false,
        external_plugins: {},
        // Disable the license check
        license_validator: () => true,

        // Enable file upload capability
        images_upload_handler: function (blobInfo: any, progress: any) {
            return uploadImageToServer(blobInfo, progress);
        },
        convert_urls: false,
        // Image upload settings
        images_reuse_filename: true,
        images_upload_url: props.uploadUrl, // Path for temporary image storage
        automatic_uploads: true,
        resize_img_proportional: true, // Keep aspect ratio when resizing
        image_dimensions: true,
        image_class_list: [
            {title: 'None', value: ''},
            {title: 'Background', value: 's-img-bg'},
            {title: 'Border', value: 's-img-bg s-img-border'},
            {title: 'Stretched', value: 's-img-bg s-img-fullwidth'},
        ],

        // Configuration for the media plugin
        media_live_embeds: true, // Show the preview immediately
        media_filter_html: false, // Do not filter iframe and other tags
        // Add Kinescope to the list of providers
        media_url_resolver: function (data: any, resolve: any, reject: any) {
            const kinescopeRegex = /https:\/\/kinescope\.io\/embed\/([a-zA-Z0-9]+)/;
            const match = data.url.match(kinescopeRegex);
            if (match) {
                const videoId = match[1];
                const embedHtml = `<iframe
                    src="https://kinescope.io/embed/${videoId}"
                    width="1280"
                    height="720"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer"
                    allowfullscreen>
                    </iframe>`;
                resolve({html: embedHtml});
            } else {
                // For other URLs use the standard handling
                resolve({html: ''});
            }
        },
        formats: {
            note: {
                block: 'div',
                classes: ['s-note', 'note'],
            },
            attention: {
                block: 'div',
                classes: ['s-note', 'attention'],
            },
            success: {
                block: 'div',
                classes: ['s-note', 'success'],
            },
            error: {
                block: 'div',
                classes: ['s-note', 'error'],
            }
        },
    };

    // Deep merge of the user configuration (without setup/plugins — we set them explicitly)
    const config = deepMerge(baseConfig, restInit);
    config.plugins = allPlugins;
    config.setup = composedSetup;

    // Interface locale: from the dictionary, unless set explicitly via init
    const i18nLanguage = tRaw<string | null>('htmlEditor.language');
    if (config.language == null && i18nLanguage) config.language = i18nLanguage;

    return config;
}

const initOptions = ref(buildInitOptions());

// Upload the image to the server
async function uploadImageToServer(blobInfo: any, progress: any) {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    try {
        const response = await axios.post(props.uploadUrl || '', formData);
        return response.data.location;
    } catch (error: any) {
        console.error('Upload error:', error);
        throw new Error('Image upload failed: ' + error.message);
    }
}
function onEditorChange() {
    emits('changeContent');
}
</script>
<style lang="scss">
.s-htmleditor {
    font-family: var(--s-font-family);
    .tox.tox-fullscreen {
        top: var(--s-header-height, 0) !important;
        height: calc(100vh - var(--s-header-height, 0)) !important;
    }
}
</style>
