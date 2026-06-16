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
    /** Доп. плагины TinyMCE (объединяются с базовыми) */
    plugins?: string[];
    /** Переопределение тулбара */
    toolbar?: string;
    /** Меню-бар TinyMCE (по умолчанию выключен) */
    menubar?: string | boolean;
    /** Доп. CSS контента — добавляется к базовому content_style */
    contentStyle?: string;
    /** Внешние CSS контента (content_css) */
    contentCss?: string | string[];
    /** Смещение шапки для fullscreen, px. Альтернатива — CSS-переменная --s-header-height */
    headerOffset?: number;
    /**
     * Глубокий merge в дефолтную конфигурацию TinyMCE (наивысший приоритет).
     * Поле `setup` композируется с библиотечным (вызывается после него),
     * `plugins` объединяются с базовыми.
     */
    init?: Record<string, any>;
}

const props = defineProps<SHtmlEditorProps>();

const emits = defineEmits<{
    (e: 'changeContent'): void;
    (e: 'init', editor: any): void;
}>();

const model = defineModel<string>();

// Смещение шапки для корректного fullscreen
const rootStyle = computed(() =>
    props.headerOffset != null ? { '--s-header-height': `${props.headerOffset}px` } as Record<string, string> : undefined
);

onMounted(async () => {
    // tinymce — peer dependency потребителя, @ts-ignore подавляет ошибки отсутствия типов
    // Следующая строчка нужна для отключения запроса API-ключа, не удалять!
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

// Локализованные подписи блоков → строка block_formats TinyMCE
function buildBlockFormats(): string {
    const blocks = tRaw<Record<string, string>>('htmlEditor.blocks');
    return HTML_EDITOR_BLOCK_ORDER.map(([key, tag]) => `${blocks[key]}=${tag}`).join('; ');
}

// Библиотечная setup-логика: оборачивание картинок в div + эмит инстанса редактора
function librarySetup(editor: any) {
    // Отдаём наружу инстанс редактора для кастомной логики (регистрация плагинов/кнопок и т.п.)
    editor.on('init', () => emits('init', editor));

    // Была ли картинка ранее завернута в div
    const isImgAlreadyWrapped = (img: any) => {
        const parent = img.parentNode;
        return !!(parent && parent.tagName && parent.tagName.toLowerCase() === 'div' && parent.firstElementChild === img && parent.children.length === 1);
    };

    // Обернуть img в div, переставив кастомные классы на обертку
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

        // Обновляем состояние редактора (toolbar, selection и т.д.), иначе обертка появится только после сохранения
        try { editor.nodeChanged(); } catch (err) {}
    };

    const wrapImagesInRoot = (root: any) => {
        if (!root || !root.querySelectorAll) return;
            const imgs = root.querySelectorAll('img');
            imgs.forEach((img: any) => {
            try { wrapImageNode(img); } catch (err) {}
        });
    };

  // Всё в init, чтобы doc/body уже были доступны
  editor.on('init', () => {
    const doc = editor.getDoc();
    if (!doc) return;

    // 1) Monkey-patch insertContent: перехватываем html перед вставкой
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

    // 3) Модифицируем DOM-фрагмент перед вставкой для paste/drag&drop
    editor.on('PastePostProcess', (e: any) => {
      // e.node — это DocumentFragment / элемент уже в документе редактора
      wrapImagesInRoot(e.node);
    });

    // 4) Ловим добавления узлов и изменения class
    const observer = new MutationObserver((mutations) => {
      // Оборачиваем в транзакцию, чтобы правки шеллились в undo как один шаг
      editor.undoManager.transact(() => {
        for (const m of mutations) {
          if (m.type === 'childList') {
            m.addedNodes.forEach((node: any) => {
              if (node.nodeType !== 1) return;
              const tag = node.tagName && node.tagName.toLowerCase();
              if (tag === 'img') {
                wrapImageNode(node);
              } else {
                // если вставлен контейнер, ищем вложенные img
                wrapImagesInRoot(node);
              }
            });
          } else if (m.type === 'attributes' && m.attributeName === 'class') {
            const target = m.target as HTMLElement;
            // если класс поменяли у img — переместим класс в wrapper
            if (target && target.tagName && target.tagName.toLowerCase() === 'img') {
              if (!isImgAlreadyWrapped(target) && (target.getAttribute('class') || '').trim()) {
                wrapImageNode(target);
              } else if ((target.getAttribute('class') || '').trim()) {
                // Если картинка уже обернута в div, добавляем класс к обертке
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
      attributes: true,        // нужно чтобы ловить присвоение class плагином
      attributeFilter: ['class']
    });

    // Отключаем observer при уничтожении редактора
    editor.on('remove', () => observer.disconnect());
  });
}

// Деструктурируем пользовательскую конфигурацию: setup и plugins обрабатываем особо
const userInit = props.init ?? {};
const { setup: userSetup, plugins: userPlugins, ...restInit } = userInit;

// Композиция setup: сначала библиотечный, потом пользовательский
function composedSetup(editor: any) {
    librarySetup(editor);
    if (typeof userSetup === 'function') userSetup(editor);
}

// Базовые плагины + доп. плагины потребителя (через проп и через init.plugins)
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
    const baseConfig: Record<string, any> = {
        license_key: 'mit',
        selector: 'textarea',
        height: props.height ?? 500,
        placeholder: props.placeholder || '',
        menubar: props.menubar ?? false,
        body_class: 'g-html',
        block_formats: buildBlockFormats(),
        content_style: props.contentStyle ? `${htmlEditorContentStyle}\n${props.contentStyle}` : htmlEditorContentStyle,
        // Инлайн-скины (skin.min.css/content.min.css импортируются выше) — без зависимости от файлов /tinymce на хосте
        skin: false,
        content_css: props.contentCss ?? false,
        toolbar: props.toolbar ?? `blocks | bullist numlist | link image | ${props.media ? 'media | ' : ''}fullscreen code `,
        branding: false, // Убираем брендинг
        promotion: false, // Убираем рекламные предложения
        // Блокируем любые обращения к внешним серверам
        service_worker: false,
        external_plugins: {},
        // Отключаем проверку лицензии
        license_validator: () => true,

        // Включаем возможность загрузки файлов
        images_upload_handler: function (blobInfo: any, progress: any) {
            return uploadImageToServer(blobInfo, progress);
        },
        convert_urls: false,
        // Настройки загрузки изображений
        images_reuse_filename: true,
        images_upload_url: props.uploadUrl, // Путь временного сохранения картинки
        automatic_uploads: true,
        resize_img_proportional: true, // Сохранять пропорции при изменении размера
        image_dimensions: true,
        image_class_list: [
            {title: 'None', value: ''},
            {title: 'Background', value: 's-img-bg'},
            {title: 'Border', value: 's-img-bg s-img-border'},
            {title: 'Stretched', value: 's-img-bg s-img-fullwidth'},
        ],

        // Настройка для медиа-плагина
        media_live_embeds: true, // Показывать превью сразу
        media_filter_html: false, // Не фильтровать iframe и другие теги
        // Добавляем Kinescope в список провайдеров
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
                // Для других URL используем стандартную обработку
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

    // Глубокий merge пользовательской конфигурации (без setup/plugins — их ставим явно)
    const config = deepMerge(baseConfig, restInit);
    config.plugins = allPlugins;
    config.setup = composedSetup;

    // Локаль интерфейса: из словаря, если не задана явно через init
    const i18nLanguage = tRaw<string | null>('htmlEditor.language');
    if (config.language == null && i18nLanguage) config.language = i18nLanguage;

    return config;
}

const initOptions = ref(buildInitOptions());

// Загрузка картинки на сервер
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
