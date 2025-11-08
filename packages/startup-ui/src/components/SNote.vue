<template>
<div class="s-note" :class="{gray, attention, success, error, has_icon: icon}">
    <FontAwesomeIcon :icon="icon" v-if="icon" />
    <div class="s-note-title" v-if="title">
        {{ title }}
    </div>
    <slot />
</div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    icon: String,
    title: String,
    gray: Boolean,
    attention: Boolean,
    success: Boolean,
    error: Boolean,
});
</script>

<style lang="scss">
.s-note {
    border-radius: var(--s-border-radius);
    margin-bottom: 2rem;
    padding: 1rem 1.5rem;
    gap: 1rem;
    background-color: var(--s-primary-lightest);
    color: var(--s-black);
    &-title {
        font-size: var(--s-h4-font-size);
        margin-bottom: var(--s-base-margin);
        @include mobile(){
            font-size: 1rem;
            font-weight: bold;
        }
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