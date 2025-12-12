# SAlert

Оповещение о произошедшем событии.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Упрощено до одного метода, не требует добавлять элемент в шаблон.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
    <ol>
        <li>Добавить возможность собирать серию оповещений друг под другом.</li>
    </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

Информационное оповещение:

<div class="docs-container">
    <SButton @click="SAlert.info('Информация')">Информация</SButton>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

Оповещение об успешном действии:
<div class="docs-container">
    <SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

Оповещение об ошибке:
<div class="docs-container">
    <SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

## Увеличенное время до закрытия

По умолчанию оповещения закрываются через 5 секунд. Другое время закрытия можно задать параметром closeAfter:
<div class="docs-container">
    <SButton @click="closeWithDelay">Информация</SButton>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

<script setup>
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import { SAlert } from '../../../../packages/startup-ui/src/components/SAlert';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

function closeWithDelay() {
    SAlert.info('Закроется через 5 секунд', {
        closeAfter: 5000,
    });
}

const code1 = `<SButton @click="SAlert.info('Информация')">Информация</SButton>
`;
const fullCode1 = `<template>
<SButton @click="SAlert.info('Информация')">Информация</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';
<\/script>
`;

const code2 = `<SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
`;
const fullCode2 = `<template>
<SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';
<\/script>
`;

const code3 = `<SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
`;
const fullCode3 = `<template>
<SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';
<\/script>
`;

const code4 = `SAlert.info('Закроется через 5 секунд', {
    closeAfter: 5000,
});
`;
const fullCode4 = `<template>
    <SButton @click="closeWithDelay">Информация</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';

function closeWithDelay() {
    SAlert.info('Закроется через 5 секунд', {
        closeAfter: 5000,
    });
}
<\/script>
`;
</script>