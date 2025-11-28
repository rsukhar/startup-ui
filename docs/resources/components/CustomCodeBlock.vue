<template>
<div class="code-wrapper">
    <div class="code-buttons">
        <div class="code-buttons-item" @click="toggleFullCode" v-if="fullCode">
            <FontAwesomeIcon icon="code" />
            <div class="code-buttons-tooltip">Показать полный код</div>
        </div>
        <div class="code-buttons-item" @click="copyCode">
            <FontAwesomeIcon icon="copy" />
            <div class="code-buttons-tooltip">Скопировать</div>
        </div>
    </div>
    <div class="customcode" v-html="html"></div>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { codeToHtml } from 'shiki';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { SAlert } from '../../../packages/startup-ui/src/components/SAlert';

const props = defineProps({
    code: Object,
    fullCode: Object
});

const html = ref('');
const isFullCodeShown = ref(false);

async function toggleFullCode() {
    isFullCodeShown.value = !isFullCodeShown.value;
    const code = isFullCodeShown.value ? props.fullCode : props.code;
    html.value = await codeToHtml(code.text, {
        lang: code.lang,
        theme: 'github-dark-default',
        colorReplacements: {
            '#ffa198': '#7EE787'
        }
    });
}

async function copyCode() {
    const type = "text/plain";
    const clipboardItemData = {
        [type]: isFullCodeShown.value ? props.fullCode.text : props.code.text,
    };

    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
    SAlert.info('Код скопирован в буфер обмена');
}

onMounted(async () => {
    html.value = await codeToHtml(props.code.text, {
        lang: props.code.lang,
        theme: 'github-dark-default',
        colorReplacements: {
            '#ffa198': '#7EE787'
        }
    });
});
</script>
<style lang="scss" scoped>
.code-wrapper {
    position: relative;
    border-radius: var(--s-border-radius);
    padding: 20px;
    padding-bottom: 0;
    background-color: #0d1117;
    margin-bottom: 20px;
}

.code-wrapper:hover .code-buttons {
    position: absolute;
    top: 12px;
    right: 20px;
    cursor: pointer;
    display: flex;
    gap: 5px;
    padding: 2px;
    background-color: #1b1b1f;
    border-radius: var(--s-border-radius);
    color: var(--s-white);
    box-sizing: border-box;
    
    &-item {
        position: relative;
        padding: 5px;
        border-radius: var(--s-border-radius);
    }

    &-item:hover {
        background-color: #404047;
    }

    &-tooltip {
        position: absolute;
        top: calc(100% + 5px);
        right: 50%;
        transform: translateX(50%);
        font-size: 10px;
        white-space: nowrap;
        background-color: #404047;
        border-radius: var(--s-border-radius);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity .12s ease;
        line-height: 1;
        padding: 6px;
        z-index: 1000;
    }

    &-item:hover .code-buttons-tooltip {
        opacity: 1;
        visibility: visible;
    }
}

.code-buttons {
    display: none;
}

.customcode {
    box-sizing: border-box;
    overflow-x: auto;
    padding-bottom: 20px;
    scrollbar-color: #9f9f9f #2c2c2c;
}
</style>