# SHtmlEditor

Визуальный HTML-редактор.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Сразу используем самый удобный TinyMCE. Все остальные редакторы по юзабилити сильно хуже.</li>
            <li>Поддержка ембеддинга видео из сервиса <a href="https://www.kinescope.com/" target="_blank">Kinescope</a>, который в моменте является наиболее удобной заменой блокируемого YouTube</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

<div class="docs-container">
    <SHtmlEditor v-model="content1" upload-url="/image/upload" />
</div>

```vue
<template>
    <SHtmlEditor v-model="content" upload-url="/image/upload" />
</template>

<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref('');
</script>
```

## Плейсхолдер

<div class="docs-container">
    <SHtmlEditor v-model="content2" upload-url="/image/upload" placeholder="Введите контент" />
</div>

```vue
<template>
    <SHtmlEditor v-model="content" upload-url="/image/upload" placeholder="Введите контент" />
</template>

<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref('');
</script>
```

## Высота редактора

По умолчанию высота равна 500px. Можно изменить через проп `height`.

<div class="docs-container">
    <SHtmlEditor v-model="content3" upload-url="/image/upload" :height="300" />
</div>

```vue
<template>
    <SHtmlEditor v-model="content" upload-url="/image/upload" :height="300" />
</template>

<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref('');
</script>
```

## Расширяемость

Конфигурацию TinyMCE можно глубоко переопределить пропом `init` (глубокий merge в дефолты). Поле `setup` композируется с библиотечным (вызывается после него и не затирает обёртку картинок), а `plugins` объединяются с базовыми.

```vue
<template>
    <SHtmlEditor
        v-model="content"
        upload-url="/image/upload"
        :plugins="['wordcount']"
        toolbar="blocks | bold italic | link image | fullscreen code"
        :header-offset="60"
        :init="{
            setup(editor) {
                // напр. кастомная кнопка «вставить шаблон ответа техподдержки»
                editor.ui.registry.addButton('reply', {
                    text: 'Шаблон',
                    onAction: () => editor.insertContent('<p>Здравствуйте! </p>'),
                });
            },
        }"
        @init="onEditorInit"
    />
</template>
```

- `header-offset` (или CSS-переменная `--s-header-height`) задаёт смещение шапки для корректного fullscreen.
- `content-style` добавляется к базовым стилям контента, `content-css` подключает внешние стили.
- Локаль интерфейса берётся из словаря (`htmlEditor.language`); язык можно задать и явно через `:init="{ language, language_url }"`.

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `string` | `undefined` | HTML-содержимое редактора. |
| upload-url | `string` | `undefined` | URL для загрузки изображений на сервер. |
| placeholder | `string` | `''` | Текст-заполнитель, когда редактор пуст. |
| height | `number` | `500` | Высота редактора, px. |
| media | `boolean` | `false` | Включить плагин медиа (видео-эмбеды). |
| plugins | `string[]` | `[]` | Доп. плагины TinyMCE (объединяются с базовыми). |
| toolbar | `string` | (дефолтный) | Переопределение тулбара. |
| menubar | `string \| boolean` | `false` | Меню-бар TinyMCE. |
| content-style | `string` | `undefined` | Доп. CSS контента (добавляется к базовому). |
| content-css | `string \| string[]` | `undefined` | Внешние CSS контента (`content_css`). |
| header-offset | `number` | `undefined` | Смещение шапки для fullscreen, px. |
| init | `object` | `undefined` | Глубокий merge в конфигурацию TinyMCE (наивысший приоритет). |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| changeContent | - | Вызывается при любом изменении содержимого редактора. |
| init | `editor` | Инстанс TinyMCE готов — для регистрации кастомных плагинов/кнопок. |

<script setup>
import { ref } from 'vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SHtmlEditor from '../../../resources/components/SHtmlEditor.client.vue';

const content1 = ref('');
const content2 = ref('');
const content3 = ref('');
const content = ref('');
</script>
<style lang="scss">
.s-htmleditor {
    font-family: var(--s-font-family);
}
</style>
