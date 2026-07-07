<template>
    <component :is="componentType" :class="classes">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed, useAttrs, inject } from "vue";
import type { Component } from "vue";
export interface SButtonProps {
    outlined?: boolean;
    transparent?: boolean;
    fullwidth?: boolean;
    small?: boolean;
    disabled?: boolean;
    loading?: boolean;
    color?: "red" | "green" | "yellow" | "gold" | string;
    is?: string | Component;
}

const props = withDefaults(defineProps<SButtonProps>(), {
    outlined: false,
    transparent: false,
    fullwidth: false,
    small: false,
    disabled: false,
    loading: false,
});

const form = inject('formModel', null);
const attrs = useAttrs();

const componentType = computed(() => {
    // The element is set explicitly, use it
    if (props.is) return props.is;
    // Native anchor
    if (attrs.href) return 'a';
    // A button that also submits the form
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // Spacing between an icon and the label. `gap` applies ONLY between children, so an
    // icon-only button has no trailing space, while "icon + text" keeps an 8px gap. A margin
    // on the icon can't tell the cases apart: the label is a bare text node, invisible to
    // structural selectors like :only-child / :last-child.
    gap: 8px;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    font-family: var(--s-font-family);
    font-size: 1rem;
    font-weight: normal;
    line-height: var(--s-field-height);
    // Keep the control height when the button holds only an icon (no text line-box to set it).
    // +2px accounts for the top/bottom 1px border (box-sizing: border-box).
    min-height: calc(var(--s-field-height) + 2px);
    padding: 0 1.5em;
    border-radius: var(--s-border-radius);
    background-color: var(--s-primary);
    color: var(--s-white);
    // No underline when the button is rendered as a link (href / :is="Link").
    text-decoration: none;
    border: 1px var(--s-primary) solid;
    /* inline-flex already shrinks the button to its content; width can be set via style/class or the fullwidth prop */

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
        --s-primary-light: var(--s-red-light);
        --s-primary-lightest: var(--s-red-lightest);
    }
    &.color_green {
        --s-primary: var(--s-green);
        --s-primary-dark: var(--s-green-dark);
        --s-primary-light: var(--s-green-light);
        --s-primary-lightest: var(--s-green-lightest);
    }
    &.color_yellow {
        --s-primary: var(--s-yellow);
        --s-primary-dark: var(--s-yellow-dark);
        --s-primary-light: var(--s-yellow-light);
        --s-primary-lightest: var(--s-yellow-lightest);
    }
    // Gold is a gradient with dark text — a standalone money/CTA accent, not a remap of
    // the --s-primary scale like the flat colors above. Border keeps the 1px geometry of
    // other buttons; a darker gold stroke reads as part of the gradient.
    &.color_gold {
        background: linear-gradient(180deg, var(--s-gold), var(--s-gold-dark));
        border-color: var(--s-gold-dark);
        color: var(--s-black);
        font-weight: 600;
        &:hover {
            background: linear-gradient(180deg, var(--s-gold), var(--s-gold-dark));
            border-color: var(--s-gold-dark);
            color: var(--s-black);
            filter: brightness(1.05);
        }
        &.outlined {
            background: transparent;
            color: var(--s-gold-dark);
            border-color: var(--s-gold-dark);
            &:hover {
                background: var(--s-gold-lightest);
                color: var(--s-gold-dark);
            }
        }
        &.transparent {
            background: transparent;
            border: 0;
            color: var(--s-gold-dark);
            &:hover {
                background-color: var(--s-gold-lightest);
                filter: none;
            }
        }
    }
    &.disabled,
    &[disabled="true"] {
        opacity: 0.3;
        pointer-events: none;
    }
    &.fullwidth {
        max-width: none;
        width: 100%;
    }
    &.small {
        font-size: 12px;
        line-height: 20px;
        // Override the base min-height so small icon-only buttons match small text buttons.
        // 20px line-height + 6px vertical padding + 2px border (box-sizing: border-box).
        min-height: calc(20px + 6px + 2px);
        padding: 3px 10px;
    }
    &.loading {
        opacity: 0.5;
        cursor: wait;
        pointer-events: none;
    }
}
</style>