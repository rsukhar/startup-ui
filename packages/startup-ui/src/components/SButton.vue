<template>
    <component :is="componentType" :class="classes">
        <slot />
    </component>
</template>

<script setup>
import { computed, useAttrs, inject } from "vue";

const props = defineProps({
    outlined: Boolean,
    transparent: Boolean,
    fullwidth: Boolean,
    small: Boolean,
    disabled: Boolean,
    loading: Boolean,
    color: String,
    // Строка для тега, объект/функция для компонента
    is: [String, Object, Function],
});

const form = inject('formModel', null);
const attrs = useAttrs();

const componentType = computed(() => {
    // Элемент задан явно, используем его
    if (props.is) return props.is;
    // Нативный анкор
    if (attrs.href) return 'a';
    // Кнопка, которая также засабмитит форму
    if (form) return 'button';
    return 'div';
});

const classes = computed(() => [
    's-button',
    props.outlined && 'outlined',
    props.transparent && 'transparent',
    props.disabled && 'disabled',
    props.fullwidth && 'fullwidth',
    props.small && 'small',
    props.loading && 'loading',
    props.color && `color_${props.color}`,
]);
</script>

<style lang="scss">
.s-button {
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    font-family: var(--s-font-family);
    font-size: 1rem;
    font-weight: normal;
    line-height: var(--s-field-height);
    padding: 0 1.5em;
    border-radius: var(--s-border-radius);
    background-color: var(--s-primary);
    color: var(--s-white);
    border: 1px var(--s-primary) solid;
    &:hover {
        background-color: var(--s-primary-light);
        border-color: var(--s-primary-light);
        color: var(--s-white);
    }
    &.outlined {
        background-color: transparent;
        color: var(--s-primary);
        &:hover {
            background-color: var(--s-primary);
            border-color: var(--s-primary);
            color: var(--s-white);
        }
    }
    &.transparent {
        background-color: rgba(0, 0, 0, 0);
        color: var(--s-primary);
        border: 0;
        &:hover {
            background-color: var(--s-primary-lightest);
            color: var(--s-primary-darkest);
        }
    }
    &.color_red {
        --s-primary: var(--s-red);
        --s-primary-dark: var(--s-red-dark);
        --s-primary-lightest: var(--s-red-lightest);
    }
    &.color_green {
        --s-primary: var(--s-green);
        --s-primary-dark: var(--s-green-dark);
        --s-primary-lightest: var(--s-green-lightest);
    }
    &.color_yellow {
        --s-primary: var(--s-yellow);
        --s-primary-dark: var(--s-yellow-dark);
        --s-primary-lightest: var(--s-yellow-lightest);
    }
    &.disabled,
    &[disabled="true"] {
        opacity: 0.3;
        pointer-events: none;
    }
    &.fullwidth {
        width: 100%;
    }
    &.small {
        font-size: 12px;
        line-height: 20px;
        padding: 3px 10px;
    }
    &.loading {
        opacity: 0.5;
        cursor: wait;
        pointer-events: none;
    }
    & > svg:first-child {
        display: inline-block;
        margin-right: 8px;
    }
}
</style>