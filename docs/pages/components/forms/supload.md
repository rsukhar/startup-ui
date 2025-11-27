# SUpload

Загрузка файла. Всегда вставляется внутри некой формы, не используется в отрыве от неё.

## Базовый пример

Если нужно вставить полем в форму.

<div class="docs-container">
    <SUpload v-model="screenshotFirst"/>
    <SButton v-if="screenshotFirst" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

## Авто-отправка при выборе

Если нужна авто-отправка, то выполняем отправку формы по select-событию:

<div class="docs-container">
    <SUpload v-model="screenshotSecond" @select="submit" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Кастомный шаблон

<div class="docs-container">
    <SUpload v-model="screenshotThird">
        <template #header="{ choose, clear, files }">
            <SButton v-if="!files" @click="choose()">Выбрать файл</SButton>
        </template>
        <template #preview="{ files, remove }">
            <div v-if="files">
                Файл выбран (<a @click="remove(0)" href="javascript:void(0)">сбросить</a>)
            </div>
        </template>
    </SUpload>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'html'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Ограничения выбора

По расширению файлов:

<div class="docs-container">
    <SUpload accept=".txt,.csv,.xlsx" v-model="screenshotFourth"/>
    <SButton v-if="screenshotFourth" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

По размеру файла:

<div class="docs-container">
    <SUpload :maxFileSize="300" />
    <SButton v-if="screenshotFifth" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

## Выбор нескольких файлов

<div class="docs-container">
    <SUpload multiple v-model="screenshotSixth" />
    <SButton v-if="screenshotSixth.length" @click="submit">Отправить</SButton>
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

<script setup>
import { ref } from 'vue'; 
import SUpload from '../../../../packages/startup-ui/src/components/SUpload.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import { SAlert } from '../../../../packages/startup-ui/src/components/SAlert';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const screenshotFirst = ref('');
const screenshotSecond = ref('');
const screenshotThird = ref('');
const screenshotFourth = ref('');
const screenshotFifth = ref('');
const screenshotSixth = ref([]);

function submit(screenshot) {
    SAlert.success('Файл отправлен');
    screenshotFirst.value = '';
    screenshotSecond.value = '';
    screenshotThird.value = '';
    screenshotFourth.value = '';
    screenshotSixth.value = [];
}

const showSubmitButton = ref(false);

const code1 = `<SUpload v-model="screenshot"/>
`;
const fullCode1 = `<template>
    <SUpload v-model="screenshot"/>
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
<\/script>
`;

const code2 = `<SUpload v-model="screenshot" @select="submit" />
`;
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
<\/script>
`;

const code3 = `<SUpload v-model="screenshot">
    <template \#header="{ choose, clear, files }">
        <SButton v-if="!files" @click="choose()">Выбрать файл</SButton>
    </template>
    <template #preview="{ files, remove }">
        <div v-if="files">
            Файл выбран (<a @click="remove(0)" href="javascript:void(0)">сбросить</a>)
        </div>
    </template>
</SUpload>
`;
const fullCode3 = `<template>
    <SUpload v-model="screenshot">
        <template #header="{ choose, clear, files }">
            <SButton v-if="!files" @click="choose()">Выбрать файл</SButton>
        </template>
        <template #preview="{ files, remove }">
            <div v-if="files">
                Файл выбран (<a @click="remove(0)" href="javascript:void(0)">сбросить</a>)
            </div>
        </template>
    </SUpload>
</template>
<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import { SUpload, SButton, SAlert } from 'startup-ui';

const screenshot = ref('');
<\/script>
`;

const code4 = `<SUpload accept=".txt,.csv,.xlsx" v-model="screenshot"/>
`;
const fullCode4 = `<template>
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
<//script>
`;

const code5 = `<SUpload :maxFileSize="300" />
`;
const fullCode5 = `<template>
    <div class="docs-container">
        <SUpload :maxFileSize="300" />
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
<//script>
`;

const code6 = `<SUpload multiple v-model="screenshotSixth" />
`;
const fullCode6 = `<template>
    <SUpload multiple v-model="screenshotSixth" />
    <SButton v-if="screenshotSixth.length" @click="submit">Отправить</SButton>
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
<\/script>
`;
</script>