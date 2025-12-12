<template>
    <div class="s-status" :class="color">
        <FontAwesomeIcon v-if="icon" :icon="icon" />
        <slot />
    </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
type Color = 'gray' | 'primary' | 'primary-dark' | 'primary-darkest' | 'primary-light' | 'primary-lightest' | 'red' | 'red-dark' | 'red-light' | 'red-lightest' | 'yellow' | 'yellow-dark' | 'yellow-light' | 'yellow-lightest' | 'green' | 'green-dark' | 'green-light' | 'green-lightest';
const props = defineProps<{
    color?: Color,
    icon: String,
}>();
</script>
<style lang="scss">
.s-status {
    display: inline-flex;
    align-items: center;
    position: relative;
    gap: 4px;
    font-family: var(--s-font-family);
    svg {
        font-size: 12px;
        width: 16px;
    }
    
    &.text-light {
        color: var(--s-text-light);
    }
    &.gray {
        color: var(--s-gray);
    }
    &.primary {
        color: var(--s-primary);
    }
    &.primary-dark {
        color: var(--s-primary-dark);
    }
    &.primary-darkest {
        color: var(--s-primary-darkest);
    }
    &.primary-light {
        color: var(--s-primary-light);
    }
    &.primary-lightest {
        color: var(--s-primary-lightest);
    }
    &.red {
        color: var(--s-red);
    }
    &.red-dark {
        color: var(--s-red-dark);
    }
    &.red-light {
        color: var(--s-red-light);
    }
    &.red-lightest {
        color: var(--s-red-lightest);
    }
    &.yellow {
        color: var(--s-yellow);
    }
    &.yellow-dark {
        color: var(--s-yellow-dark);
    }
    &.yellow-light {
        color: var(--s-yellow-light);
    }
    &.yellow-lightest {
        color: var(--s-yellow-lightest);
    }
    &.green {
        color: var(--s-green);
    }
    &.green-dark {
        color: var(--s-green-dark);
    }
    &.green-light {
        color: var(--s-green-light);
    }
    &.green-lightest {
        color: var(--s-green-lightest);
    }
}
</style>