<template>
    <div class="s-tag" :class="color">
        <slot />
    </div>
</template>
<script setup lang="ts">
type Color = 'gray' | 'primary' | 'primary-dark' | 'primary-darkest' | 'primary-light' | 'primary-lightest' | 'red' | 'red-dark' | 'red-light' | 'red-lightest' | 'yellow' | 'yellow-dark' | 'yellow-light' | 'yellow-lightest' | 'green' | 'green-dark' | 'green-light' | 'green-lightest';
const props = defineProps<{
    color?: Color
}>();
</script>
<style lang="scss">
.s-tag {
    display: inline-block;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-family: var(--s-font-family);
    font-size: 8px;
    font-weight: bold;
    background-color: var(--s-bg);
    color: var(--s-black);
    border-radius: 6px;
    line-height: 18px;
    padding: 0 10px;
    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
    &.gray {
        background-color: var(--s-gray);
    }
    &.primary {
        background-color: var(--s-primary);
        color: var(--s-white);
    }
    &.primary-dark {
        background-color: var(--s-primary-dark);
        color: var(--s-white);
    }
    &.primary-darkest {
        background-color: var(--s-primary-darkest);
        color: var(--s-white);
    }
    &.primary-light {
        background-color: var(--s-primary-light);
    }
    &.primary-lightest {
        background-color: var(--s-primary-lightest);
        color: var(--s-primary-darkest);
    }
    &.red {
        background-color: var(--s-red);
        color: var(--s-white);
    }
    &.red-dark {
        background-color: var(--s-red-dark);
        color: var(--s-white);
    }
    &.red-light {
        background-color: var(--s-red-light);
    }
    &.red-lightest {
        background-color: var(--s-red-lightest);
        color: var(--s-red-dark);
    }
    &.yellow {
        background-color: var(--s-yellow);
        color: var(--s-white);
    }
    &.yellow-dark {
        background-color: var(--s-yellow-dark);
        color: var(--s-white);
    }
    &.yellow-light {
        background-color: var(--s-yellow-light);
    }
    &.yellow-lightest {
        background-color: var(--s-yellow-lightest);
        color: var(--s-yellow-dark);
    }
    &.green {
        background-color: var(--s-green);
        color: var(--s-white);
    }
    &.green-dark {
        background-color: var(--s-green-dark);
        color: var(--s-white);
    }
    &.green-light {
        background-color: var(--s-green-light);
    }
    &.green-lightest {
        background-color: var(--s-green-lightest);
        color: var(--s-green-dark);
    }
}
</style>