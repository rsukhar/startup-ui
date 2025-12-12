<template>
    <div v-if="layout === 'inline'" class="s-copytext layout_inline" title="Скопировать"
         @click="copy(copytext ?? innerText)" :class="{success: copied}">
        <div class="s-copytext-text">
            <slot />
        </div>
        <FontAwesomeIcon :icon="copied ? 'check' : 'copy'" v-if="isSupported" />
    </div>
    <div v-else class="s-copytext layout_input">
        <div class="s-copytext-text">
            <slot />
        </div>
        <FontAwesomeIcon :icon="copied ? 'check' : 'copy'" v-if="isSupported"
                         :class="{success: copied}" title="Скопировать" @click="copy(copytext ?? innerText)" />
    </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import { useClipboard } from '@vueuse/core';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    href: String,
    size: {
        type: String,
        default: 'normal'
    },
    layout: {
        type: String,
        default: 'input' // input / inline
    },
    // Текст, который на самом деле будет копироваться
    copytext: String,
});
let slots = useSlots();
const { copy, copied, isSupported } = useClipboard();
const innerText = computed(() => {
    return slots.default()[0].children;
});
</script>

<style lang="scss">
.s-copytext {
    display: flex;
    justify-content: space-between;
    font-family: var(--s-font-family);
    
    &-text {
        & + svg {
            cursor: pointer;
            &:hover {
                color: var(--s-primary-darkest);
            }
        }
    }
    &.layout_input {
        display: flex;
        align-items: center;
        border: 1px var(--s-border) solid;
        font-size: 1rem;
        border-radius: var(--s-border-radius);
        .s-copytext-text {
            padding: 0.5em 1em 0.5em 1.5em;
            max-height: 100px;
            overflow-y: auto;
            font-weight: bold;
            overflow-wrap: break-word;
            word-break: break-all;
            & + svg {
                color: var(--s-primary);
                font-size: 1.2em;
                margin-right: 1rem;
            }
        }
    }
    &.layout_inline {
        display: inline-flex;
        align-items: center;
        color: var(--s-primary);
        cursor: pointer;
        &.success {
            color: var(--s-green) !important;
        }
        &:hover {
            color: var(--s-primary-darkest);
        }
        .s-copytext-text {
            line-height: 1;
            border-bottom: 1px currentColor dashed;
            & + svg {
                font-size: 0.8em;
                margin-left: 0.2em;
                margin-right: 0.2rem;
            }
        }
    }
}
</style>