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

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

## Авто-отправка при выборе

Если нужна авто-отправка, то выполняем отправку формы по событию <strong>select</strong>:

<div class="docs-container">
    <SUpload v-model="screenshot2" @select="submit" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Кастомный текст кнопки

Можно задать произвольный текст кнопки с помощью атрибута <strong>upload-button-title</strong>

<div class="docs-container">
    <SUpload v-model="screenshot3" upload-button-title="Выбрать скриншот" />
    <SButton v-if="screenshot3" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'html'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Кастомный шаблон

<div class="docs-container">
    <SUpload v-model="screenshot4">
        <template #header="{ choose, clear, files }">
            <SActionIcon v-if="!files" @click="choose()" icon="plus" />
        </template>
        <template #preview="{ files, remove }">
            <div v-if="files">
                Файл выбран <SActionIcon @click="remove(0)" icon="trash" />
            </div>
        </template>
    </SUpload>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'html'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

Слоты сразу пробрасывают методы и переменные, которые могут быть полезны в собственных шаблонах:

<ul>
    <li>В слоте кнопки выбора <strong>#header</strong>: <strong>choose()</strong> открывает окно выбора файла, <strong>clear()</strong> очищает набор выбранных файлов, <strong>files</strong> — список текущих выбранных файлов.</li>
    <li>В слоте предпросмотра выбранных файлов <strong>#preview</strong>: <strong>files</strong> — список текущих выбранных файлов, <strong>remove(index)</strong> — удаление определенного файла по индексу.</li>
</ul>

## Ограничения выбора

Для ограничения выбора по расширению добавляем атрибут <strong>accept</strong>:

<div class="docs-container">
    <SUpload accept=".txt,.csv,.xlsx" v-model="screenshot5" />
    <SButton v-if="screenshot5" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

Для ограничения выбора по размеру файла добавляем атрибут <strong>max-file-size</strong> (в байтах):

<div class="docs-container">
    <SUpload :max-file-size="512000" v-model="screenshot6" />
    <SButton v-if="screenshot6" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

## Выбор нескольких файлов

<div class="docs-container">
    <SUpload multiple v-model="screenshot7" />
    <SButton v-if="screenshot7.length" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code7, lang: 'vue'}" :fullCode="{text: fullCode7, lang: 'vue'}" />

<script setup>
import { ref } from 'vue'; 
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SUpload from '../../../../packages/startup-ui/src/components/SUpload.vue';
import SActionIcon from '../../../../packages/startup-ui/src/components/SActionIcon.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import { SAlert } from '../../../../packages/startup-ui/src/components/SAlert';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const screenshot1 = ref('');
const screenshot2 = ref('');
const screenshot3 = ref('');
const screenshot4 = ref('');
const screenshot5 = ref('');
const screenshot6 = ref('');
const screenshot7 = ref([]);

function submit(screenshot) {
    SAlert.success('Файл отправлен');
    screenshot1.value = '';
    screenshot2.value = '';
    screenshot3.value = '';
    screenshot4.value = '';
    screenshot5.value = '';
    screenshot6.value = '';
    screenshot7.value = [];
}

const showSubmitButton = ref(false);

const code1 = `<SUpload v-model="screenshot" />`;
const fullCode1 = `<template>
    <SUpload v-model="screenshot" />
    <SButton v-if="screenshot" @click="submit">Отправить</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref('');

const submit = () => {
    router.post(\`/photos\`,  { screenshot: screenshot.value }, {
        replace: false,
        preserveState: true,
        onError: (error) => console.error(error),
        onSuccess: () => SAlert.success('Файл отправлен'),
    });
}
<\/script>`;

const code2 = `<SUpload v-model="screenshot" @select="submit" />`;
const fullCode2 = `<template>
    <SUpload v-model="screenshot" @select="submit" />
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref('');

const submit = () => {
    router.post(\`/photos\`,  { screenshot: screenshot.value }, {
        replace: false,
        preserveState: true,
        onError: (error) => console.error(error),
        onSuccess: () => SAlert.success('Файл отправлен'),
    });
}
<\/script>`;

const code3 = `<SUpload v-model="screenshot" upload-button-title="Выбрать скриншот" />`;
const fullCode3 = `<template>
    <SUpload v-model="screenshot" upload-button-title="Выбрать скриншот" />
    <SButton v-if="screenshot" @click="submit">Отправить</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SActionIcon, SAlert } from 'startup-ui';

const screenshot = ref('');

const submit = () => {
    router.post(\`/photos\`,  { screenshot: screenshot.value }, {
        replace: false,
        preserveState: true,
        onError: (error) => console.error(error),
        onSuccess: () => SAlert.success('Файл отправлен'),
    });
}
<\/script>`;

const code4 = `<SUpload v-model="screenshot">
    <template \#header="{ choose, clear, files }">
        <SActionIcon v-if="!files" @click="choose()" icon="plus" />
    </template>
    <template #preview="{ files, remove }">
        <div v-if="files">
            Файл выбран <SActionIcon @click="remove(0)" icon="trash" />
        </div>
    </template>
</SUpload>`;
const fullCode4 = `<template>
    <SUpload v-model="screenshot">
        <template #header="{ choose, clear, files }">
            <SActionIcon v-if="!files" @click="choose()" icon="plus" />
        </template>
        <template #preview="{ files, remove }">
            <div v-if="files">
                Файл выбран  <SActionIcon @click="remove(0)" icon="trash" />
            </div>
        </template>
    </SUpload>
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SActionIcon, SAlert } from 'startup-ui';

const screenshot = ref('');
<\/script>`;

const code5 = `<SUpload accept=".txt,.csv,.xlsx" v-model="screenshot"/>`;
const fullCode5 = `<template>
    <SUpload accept=".txt,.csv,.xlsx" v-model="screenshot"/>
    <SButton v-if="screenshot" @click="submit">Отправить</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref('');

const submit = () => {
    router.post(\`/photos\`,  { screenshot: screenshot.value }, {
        replace: false,
        preserveState: true,
        onError: (error) => console.error(error),
        onSuccess: () => SAlert.success('Файл отправлен'),
    });
}
<//script>`;

const code6 = `<SUpload :max-file-size="512000" />`;
const fullCode6 = `<template>
    <div class="docs-container">
        <SUpload :max-file-size="512000" />
        <SButton v-if="screenshot" @click="submit">Отправить</SButton>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref('');

const submit = () => {
    router.post(\`/photos\`,  { screenshot: screenshot.value }, {
        replace: false,
        preserveState: true,
        onError: (error) => console.error(error),
        onSuccess: () => SAlert.success('Файл отправлен'),
    });
}
<//script>`;

const code7 = `<SUpload multiple v-model="screenshots" />`;
const fullCode7 = `<template>
    <SUpload multiple v-model="screenshots" />
    <SButton v-if="screenshots.length" @click="submit">Отправить</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref([]);

const submit = () => {
    router.post(\`/photos\`,  { screenshot: screenshot.value }, {
        replace: false,
        preserveState: true,
        onError: (error) => console.error(error),
        onSuccess: () => SAlert.success('Файл отправлен'),
    });
}
<\/script>`;
</script>