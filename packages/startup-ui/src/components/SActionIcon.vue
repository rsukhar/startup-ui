<template>
    <component :is="componentType" class="s-actionicon" @click="handleClick" :class="{danger}">
        <component :is="iconRenderer" :icon="icon" />
    </component>
</template>
<script setup lang="ts">
import { SConfirm } from './SConfirm'
import { computed, useAttrs } from "vue";
import type { Component } from "vue";
import { getStartupUiIcon } from '../config';
export interface SActionIconProps {
    icon: string | string[];
    danger?: boolean;
    confirm?: string;
    confirmTitle?: string;
    /** Additional options passed through to SConfirm.open (acceptLabel, cancelLabel, variant, ...) */
    confirmOptions?: Record<string, any>;
    is?: string | Component;
}

const props = withDefaults(defineProps<SActionIconProps>(), {
    danger: false,
});

const emit = defineEmits<{
    (e: 'click'): void;
}>();
const attrs = useAttrs();

// Renderer for the icon prop: an injected component (e.g. FontAwesomeIcon or a custom icon set),
// falling back to a globally-registered 'FontAwesomeIcon'.
const iconRenderer = computed(() => getStartupUiIcon() ?? 'FontAwesomeIcon');

const componentType = computed(() => {
    // The element is set explicitly, use it
    if (props.is) return props.is;
    // Native anchor
    if (attrs.href) return 'a';
    return 'div';
});

function handleClick() {
    if (props.confirm) {
        const options: Record<string, any> = { ...props.confirmOptions };
        // pass confirmTitle through only if set — otherwise SConfirm substitutes the localized default
        if (props.confirmTitle) options.title = props.confirmTitle;
        options.onAccept = () => emit('click');
        SConfirm.open(props.confirm, options);
    } else {
        emit('click');
    }
}
</script>
<style lang="scss">
.s-actionicon {
    display: inline-block;
    width: 30px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    color: var(--s-primary);
    font-family: var(--s-font-family);
    
    svg {
        margin-left: 0;
        margin-right: 0 !important;
    }
    & + & {
        margin-left: calc(var(--s-base-margin) / 3);
    }
    &:hover {
        color: var(--s-primary-darkest);
    }
    &.danger {
        color: var(--s-red);
        &:hover {
            color: var(--s-red-dark);
        }
    }
}
</style>