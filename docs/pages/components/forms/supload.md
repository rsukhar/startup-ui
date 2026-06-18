# SUpload

Загрузка файла. Всегда вставляется внутри некой формы, не используется в отрыве от неё.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>В других библиотеках Upload работает как поле, которое по дефолту сразу отправляет файл после выбора (что удобно, например, при импорте таблиц). На практике же гораздо чаще встречается кейс, когда файл/картинка — это атрибут некой модели, и этот файл нужно добавлять-редактировать в форме редактирования модели. SUpload в первую очередь заточен под этот, более частый кейс.</li>
            <li>SUpload сразу работает в связке с SForm, что позволяет использовать его так же просто, как простые текстовые SInput, не задумываясь о том, как связывать данные с формой.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

Если нужно вставить полем в форму. Сама отправка идёт через Inertia, поэтому базовый пример показан кодом (вживую не запускается):

:::example
```vue
<template>
    <SUpload v-model="screenshot" />
    <SButton v-if="screenshot" @click="submit">Отправить</SButton>
</template>

<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref(null);

function submit() {
    router.post('/photos', { screenshot: screenshot.value }, {
        preserveState: true,
        onError: (errors) => console.error(errors),
        onSuccess: () => SAlert.success('Файл отправлен'),
    });
}
</script>
```
```vue
<SUpload v-model="screenshot" />
<SButton v-if="screenshot" @click="submit">Отправить</SButton>
```
:::

## Авто-отправка при выборе

Если нужна авто-отправка, то выполняем отправку формы по событию <strong>select</strong>:

:::demo
```vue
<template>
    <SUpload v-model="screenshot" @select="submit" />
</template>
<script setup>
import { ref } from 'vue'
import { SAlert } from 'startup-ui'
const screenshot = ref(null)
// в реальном приложении здесь router.post(...) (Inertia)
function submit() {
    SAlert.success('Файл отправлен')
}
</script>
```
```vue
<SUpload v-model="screenshot" @select="submit" />
```
:::

## Кастомный текст кнопки

Можно задать произвольный текст кнопки с помощью атрибута <strong>upload-button-title</strong>

:::demo
```vue
<template>
    <SUpload v-model="screenshot" upload-button-title="Выбрать скриншот" />
</template>
<script setup>
import { ref } from 'vue'
const screenshot = ref(null)
</script>
```
```vue
<SUpload v-model="screenshot" upload-button-title="Выбрать скриншот" />
```
:::

## Кастомный шаблон

:::demo
```vue
<template>
    <SUpload v-model="screenshot">
        <template #header="{ choose, clear, files, isDragging }">
            <div class="s-upload-area" :class="{ dragging: isDragging }">
                <FontAwesomeIcon icon="cloud-arrow-up" class="s-upload-area-icon" />
                <p>Перетащите файл сюда или <a href="javascript:void(0)" @click="choose">нажмите</a> для загрузки</p>
            </div>
        </template>
        <template #preview="{ files, remove }">
            <div v-if="files && files.length">
                Файл выбран <SActionIcon @click="remove(files[0])" icon="trash" />
            </div>
        </template>
    </SUpload>
</template>
<script setup>
import { ref } from 'vue'
const screenshot = ref(null)
</script>
```
```vue
<SUpload v-model="screenshot">
    <template #header="{ choose, clear, files, isDragging }">
        <div class="s-upload-area" :class="{ dragging: isDragging }">
            <FontAwesomeIcon icon="cloud-arrow-up" class="s-upload-area-icon" />
            <p>Перетащите файл сюда или <a href="javascript:void(0)" @click="choose">нажмите</a> для загрузки</p>
        </div>
    </template>
    <template #preview="{ files, remove }">
        <div v-if="files && files.length">
            Файл выбран <SActionIcon @click="remove(files[0])" icon="trash" />
        </div>
    </template>
</SUpload>
```
:::

Слоты сразу пробрасывают методы и переменные, которые могут быть полезны в собственных шаблонах:

<ul>
    <li>В слоте кнопки выбора <strong>#header</strong>: <strong>choose()</strong> открывает окно выбора файла, <strong>clear()</strong> очищает набор выбранных файлов, <strong>files</strong> — список текущих выбранных файлов, <strong>isDragging</strong> — булево значение, равное true, когда над компонентом перемещают файл.</li>
    <li>В слоте предпросмотра выбранных файлов <strong>#preview</strong>: <strong>files</strong> — список текущих выбранных файлов, <strong>remove(file)</strong> — удаление конкретного файла из набора (передаётся элемент массива files).</li>
</ul>

## Ограничения выбора

Для ограничения выбора по расширению добавляем атрибут <strong>accept</strong>:

:::demo
```vue
<template>
    <SUpload v-model="screenshot" accept=".txt,.csv,.xlsx" />
</template>
<script setup>
import { ref } from 'vue'
const screenshot = ref(null)
</script>
```
```vue
<SUpload v-model="screenshot" accept=".txt,.csv,.xlsx" />
```
:::

Для ограничения выбора по размеру файла добавляем атрибут <strong>max-file-size</strong>. Можно указывать человекочитаемо (`2M`, `512K`, `1.5GB` — единицы 1024-кратные, как в php.ini) или числом в байтах:

:::demo
```vue
<template>
    <SUpload v-model="screenshot" max-file-size="500K" />
</template>
<script setup>
import { ref } from 'vue'
const screenshot = ref(null)
</script>
```
```vue
<SUpload v-model="screenshot" max-file-size="500K" />
```
:::

## Выбор нескольких файлов

:::demo
```vue
<template>
    <SUpload v-model="screenshots" multiple />
</template>
<script setup>
import { ref } from 'vue'
const screenshots = ref([])
</script>
```
```vue
<SUpload v-model="screenshots" multiple />
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `any \| any[]` | `null` | Выбранный файл (объект File или строка) или массив файлов. |
| accept | `string` | `undefined` | Допустимые типы файлов (напр. `.jpg,.png`). |
| max-file-size | `number \| string` | `undefined` | Максимальный размер файла: в байтах (число) или человекочитаемо (`2M`, `512K`, `1.5GB`). |
| multiple | `boolean` | `false` | Позволяет выбирать несколько файлов. |
| upload-button-title | `string` | `'Выбрать файл(ы)'` | Текст на кнопке выбора (если не используется слот `header`). |

### Слоты (Slots)

| Название | Параметры | Описание |
|----------|-----------|----------|
| header | `{ choose, clear, files, isDragging }` | Кастомная область выбора (триггер). |
| preview | `{ files, remove }` | Кастомная область предпросмотра выбранных файлов. |
| default | - | Содержимое под списком файлов. |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| select | `value` | Вызывается при выборе файлов. |
| clear | - | Вызывается при полной очистке списка. |

<style lang="scss">
.s-upload-area {
    border: 1px dashed var(--s-border);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--s-border-radius);
    padding: var(--s-base-margin);
    gap: var(--s-base-margin);
    cursor: pointer;

    &-icon {
        font-size: 56px;
        color: var(--s-primary);
    }

    &:hover, &.dragging {
        border-color: var(--s-primary);
    }
}
</style>
