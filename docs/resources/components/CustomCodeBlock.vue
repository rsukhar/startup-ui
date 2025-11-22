<template>
<div class="code-wrapper">
    <div class="code-buttons">
        <div class="code-buttons-item" @click="toggleFullCode">
            <FontAwesomeIcon icon="eye" />
        </div>
        <div class="code-buttons-item" @click="copyCode">
            <FontAwesomeIcon icon="copy" />
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
    code: String,
    fullCode: String
});

const html = ref('');
const showButtons = ref(false);
const isFullCodeShown = ref(false);

async function toggleFullCode() {
    isFullCodeShown.value = !isFullCodeShown.value;
    const code = isFullCodeShown.value ? props.fullCode : props.code;
    html.value = await codeToHtml(code, {
        lang: 'javascript',
        theme: 'github-dark-default'
    });
}

async function copyCode() {
    const type = "text/plain";
    const clipboardItemData = {
        [type]: isFullCodeShown.value ? props.fullCode : props.code,
    };

    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
    SAlert.info('Код скопирован в буфер обмена');
}

onMounted(async () => {
    html.value = await codeToHtml(props.code, {
        lang: 'javascript',
        theme: 'github-dark-default'
    });
});
</script>
<style lang="scss" scoped>
.code-wrapper {
    position: relative;
}

.code-wrapper:hover .code-buttons {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    display: flex;
    gap: 5px;
    padding: 2px;
    background-color: #1b1b1f;
    border-radius: var(--s-border-radius);
    &-item {
        padding: 5px;
        border-radius: var(--s-border-radius);
    }

    &-item:hover {
        background-color: #404047;
    }
}



.code-buttons {
    display: none;
}




.customcode {
    padding: 0 20px 20px 20px;
    background-color: #0d1117;
    margin-bottom: 20px;
}

.hidden {
    display: none;
}

.custom-code-wrapper {
    position: relative;
}

.code-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 6px;

    opacity: 0;
    transition: opacity 0.2s ease;
}

.code-actions.visible {
    opacity: 1;
}

.code-actions button {
    font-size: 12px;
    padding: 4px 8px;
    background: #ffffffdd;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}

.code-actions button:hover {
    background: white;
}
</style>