<template>
    <div class="s-htmleditor">
        <Editor :init="initOptions" v-model="model" @update:modelValue="onEditorChange" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';
// Следующая строчка нужна для отключения запроса API-ключая, не удалять!
import tinymce from 'tinymce/tinymce';
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import axios from "axios";
const emits = defineEmits(['changeContent']);

const props = defineProps({
    uploadUrl: String,
    placeholder: String,
});
const model = defineModel();
const initOptions = ref({
    license_key: 'mit',
    selector: 'textarea',
    height: 500,
    placeholder: props.placeholder || '',
    menubar: false,
    body_class: 'g-html',
    block_formats: `
        Обычный текст=p;
        Заголовок 1=h1;
        Заголовок 2=h2;
        Заголовок 3=h3;
        Заголовок 4=h4;
        Цитата=blockquote;
        Код=code;
        Заметка=note;
        Внимание=attention;
        Успех=success;
        Ошибка=error;`,
    // TODO Вынести в отдельный файл
    content_style: `
        .g-html {
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
        }`,
    skin_url: '/tinymce/skins/ui/oxide',
    plugins: [
        'advlist', 'lists', 'link', 'image', 'charmap',
        'fullscreen', 'insertdatetime', 'media', 'table', 'autolink', 'code'
    ],
    toolbar: 'blocks | bullist numlist | link image | media | fullscreen code ',
    branding: false, // Убираем брендинг
    promotion: false, // Убираем рекламные предложения
    // Отключаем все облачные функции
    base_url: '/tinymce', // Указываем базовый путь к локальным файлам
    suffix: '.min',
    // Блокируем любые обращения к внешним серверам
    service_worker: false,
    external_plugins: {},
    // Отключаем проверку лицензии
    license_validator: () => true,
    
    // Включаем возможность загрузки файлов
    images_upload_handler: function (blobInfo, progress) {
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
    media_url_resolver: function (data, resolve, reject) {
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
    setup(editor) {
        // Была ли картинка ранее завернута в div
        const isImgAlreadyWrapped = (img) => {
            const parent = img.parentNode;
            return !!(parent && parent.tagName && parent.tagName.toLowerCase() === 'div' && parent.firstElementChild === img && parent.children.length === 1);
        };

        // Обернуть img в div, переставив кастомные классы на обертку
        const wrapImageNode = (img) => {
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

        const wrapImagesInRoot = (root) => {
            if (!root || !root.querySelectorAll) return;
                const imgs = root.querySelectorAll('img');
                imgs.forEach(img => {
                try { wrapImageNode(img); } catch (err) {}
            });
        };

  // Всё в init, чтобы doc/body уже были доступны
  editor.on('init', () => {
    const doc = editor.getDoc();
    if (!doc) return;

    // 1) Monkey-patch insertContent: перехватываем html перед вставкой
    const origInsertContent = editor.insertContent.bind(editor);
    editor.insertContent = (content, args) => {
      if (typeof content === 'string' && content.includes('<img')) {
        const tmp = doc.createElement('div');
        tmp.innerHTML = content;
        wrapImagesInRoot(tmp);
        content = tmp.innerHTML;
      }
      return origInsertContent(content, args);
    };

    // 3) Модифицируем DOM-фрагмент перед вставкой для paste/drag&drop
    editor.on('PastePostProcess', (e) => {
      // e.node — это DocumentFragment / элемент уже в документе редактора
      wrapImagesInRoot(e.node);
    });

    // 4) Ловим добавления узлов и изменения class
    const observer = new MutationObserver((mutations) => {
      // Оборачиваем в транзакцию, чтобы правки шеллились в undo как один шаг
      editor.undoManager.transact(() => {
        for (const m of mutations) {
          if (m.type === 'childList') {
            m.addedNodes.forEach(node => {
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
            const target = m.target;
            // если класс поменяли у img — переместим класс в wrapper
            if (target && target.tagName && target.tagName.toLowerCase() === 'img') {
              if (!isImgAlreadyWrapped(target) && (target.getAttribute('class') || '').trim()) {
                wrapImageNode(target);
              } else if ((target.getAttribute('class') || '').trim()) {
                // Если картинка уже обернута в div, добавляем класс к обертке
                const wrapper = target.parentNode;
                const classes = target.getAttribute ? (target.getAttribute('class') || '') : '';
                if (classes) {
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
});

// Загрузка картинки на сервер
async function uploadImageToServer(blobInfo, progress) {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    try {
        const response = await axios.post(props.uploadUrl, formData);
        return response.data.location;
    } catch (error) {
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
    .tox-fullscreen {
        top: 60px !important;
    }
}
</style>
