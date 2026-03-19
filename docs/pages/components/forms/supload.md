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
    <SToggle title="Что будет ценно улучшить">
        <ol>
            <li>В max-file-size добавить возможность поддержки человекочитаемых форматов типа 2M, а не в байтах.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

Если нужно вставить полем в форму.

<div class="docs-container">
    <SUpload v-model="screenshot1"/>
    <SButton v-if="screenshot1" @click="submit">Отправить</SButton>
</div>

```vue
<template>
    <SUpload v-model="screenshot" />
    <SButton v-if="screenshot" @click="submit">Отправить</SButton>
</template>

<script setup>
import { ref } from 'vue';
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref(null);

const submit = () => {
    // Логика отправки
    SAlert.success('Файл отправлен');
}
</script>
```

## Авто-отправка при выборе

Если нужна авто-отправка, то выполняем отправку формы по событию <strong>select</strong>:

<div class="docs-container">
    <SUpload v-model="screenshot2" @select="submit" />
</div>

```vue
<template>
    <SUpload v-model="screenshot" @select="submit" />
</template>

<script setup>
import { ref } from 'vue';
import { SUpload, SAlert } from 'startup-ui';

const screenshot = ref(null);

const submit = () => {
    SAlert.success('Файл отправлен');
}
</script>
```

## Кастомный текст кнопки

Можно задать произвольный текст кнопки с помощью атрибута <strong>upload-button-title</strong>

<div class="docs-container">
    <SUpload v-model="screenshot3" upload-button-title="Выбрать скриншот" />
    <SButton v-if="screenshot3" @click="submit">Отправить</SButton>
</div>

```vue
<template>
    <SUpload v-model="screenshot" upload-button-title="Выбрать скриншот" />
</template>
```

## Кастомный шаблон

<div class="docs-container">
    <SUpload v-model="screenshot4">
        <template #header="{ choose, clear, files, isDragging }">
            <div class="s-upload-area" :class="{'dragging': isDragging}">
                <FontAwesomeIcon icon="cloud-arrow-up" class="s-upload-area-icon"/>
                <p>Перетащите файл сюда или <a href="javascript:void(0)" @click="choose">нажмите</a> для загрузки</p>
            </div>
        </template>
        <template #preview="{ files, remove }">
            <div v-if="files && files.length">
                Файл выбран <SActionIcon @click="remove(files[0])" icon="trash" />
            </div>
        </template>
    </SUpload>
</div>

```vue
<template>
    <SUpload v-model="screenshot">
        <template #header="{ choose, clear, files, isDragging }">
            <div class="s-upload-area" :class="{'dragging': isDragging}">
                <FontAwesomeIcon icon="cloud-arrow-up" class="s-upload-area-icon"/>
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
```

Слоты сразу пробрасывают методы и переменные, которые могут быть полезны в собственных шаблонах:

<ul>
    <li>В слоте кнопки выбора <strong>#header</strong>: <strong>choose()</strong> открывает окно выбора файла, <strong>clear()</strong> очищает набор выбранных файлов, <strong>files</strong> — список текущих выбранных файлов, <strong>isDragging</strong> — булево значение, равное true, когда над компонентом перемещают файл.</li>
    <li>В слоте предпросмотра выбранных файлов <strong>#preview</strong>: <strong>files</strong> — список текущих выбранных файлов, <strong>remove(index)</strong> — удаление определенного файла по индексу.</li>
</ul>

## Ограничения выбора

Для ограничения выбора по расширению добавляем атрибут <strong>accept</strong>:

<div class="docs-container">
    <SUpload accept=".txt,.csv,.xlsx" v-model="screenshot5" />
    <SButton v-if="screenshot5" @click="submit">Отправить</SButton>
</div>

```vue
<SUpload accept=".txt,.csv,.xlsx" v-model="screenshot" />
```

Для ограничения выбора по размеру файла добавляем атрибут <strong>max-file-size</strong> (в байтах):

<div class="docs-container">
    <SUpload :max-file-size="512000" v-model="screenshot6" />
    <SButton v-if="screenshot6" @click="submit">Отправить</SButton>
</div>

```vue
<SUpload :max-file-size="512000" v-model="screenshot" />
```

## Выбор нескольких файлов

<div class="docs-container">
    <SUpload multiple v-model="screenshot7" />
    <SButton v-if="screenshot7 && screenshot7.length" @click="submit">Отправить</SButton>
</div>

```vue
<template>
    <SUpload multiple v-model="screenshots" />
</template>

<script setup>
import { ref } from 'vue';
const screenshots = ref([]);
</script>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `any \| any[]` | `null` | Выбранный файл (объект File или строка) или массив файлов. |
| accept | `string` | `undefined` | Допустимые типы файлов (напр. `.jpg,.png`). |
| max-file-size | `number` | `undefined` | Максимальный размер файла в байтах. |
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

<script setup>
import { ref } from 'vue'; 
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SUpload from '../../../../packages/startup-ui/src/components/SUpload.vue';
import SActionIcon from '../../../../packages/startup-ui/src/components/SActionIcon.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import { SAlert } from '../../../../packages/startup-ui/src/components/SAlert';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const screenshot1 = ref(null);
const screenshot2 = ref(null);
const screenshot3 = ref(null);
const screenshot4 = ref(null);
const screenshot5 = ref(null);
const screenshot6 = ref(null);
const screenshot7 = ref([]);

function submit() {
    SAlert.success('Файл отправлен');
    screenshot1.value = null;
    screenshot2.value = null;
    screenshot3.value = null;
    screenshot4.value = null;
    screenshot5.value = null;
    screenshot6.value = null;
    screenshot7.value = [];
}
</script>

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