<template>
<div class="s-note" :class="{gray, attention, success, error, has_icon: icon}">
    <component v-if="icon" :is="iconRenderer" :icon="icon" />
    <div class="s-note-title" v-if="title">
        {{ title }}
    </div>
    <div class="s-note-content">
        <slot />
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getStartupUiIcon } from '../config';

export interface SNoteProps {
    icon?: string | string[];
    title?: string;
    gray?: boolean;
    attention?: boolean;
    success?: boolean;
    error?: boolean;
}

const props = defineProps<SNoteProps>();

// Renderer for the icon prop: an injected component, falling back to a global 'FontAwesomeIcon'.
const iconRenderer = computed(() => getStartupUiIcon() ?? 'FontAwesomeIcon');
</script>

<style lang="scss">
.s-note {
    border-radius: var(--s-border-radius);
    margin-bottom: 2rem;
    padding: 1rem 1.5rem;
    gap: 1rem;
    background-color: var(--s-primary-lightest);
    color: var(--s-black);
    font-family: var(--s-font-family);
    &-title {
        font-size: var(--s-h4-font-size);
        @include mobile(){
            font-size: 1rem;
            font-weight: bold;
        }
    }
    &-title + .s-note-content {
        margin-top: var(--s-base-margin);
    }
    & > p:last-child {
        margin-bottom: 0;
    }
    &.has_icon {
        position: relative;
        padding-left: 50px;
        & > svg {
            position: absolute;
            left: 16px;
            top: 18px;
            align-self: flex-start;
            font-size: 20px;
            color: var(--s-primary);
        }
    }
    &.gray {
        background-color: var(--s-bg);
        color: var(--s-border-light);
        & > svg {
            color: var(--s-black);
        }
    }
    &.attention {
        background-color: var(--s-yellow-lightest);
        & > svg {
            color: var(--s-yellow);
        }
    }
    &.success {
        background-color: var(--s-green-lightest);
        color: var(--s-green-dark);
    }
    &.error {
        background-color: var(--s-red-lightest);
        border-color: var(--s-red);
        color: var(--s-red);
    }
}
</style>