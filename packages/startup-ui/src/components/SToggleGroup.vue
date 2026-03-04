<template>
    <div class="s-togglegroup">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import type { Ref } from 'vue';

export interface SToggleGroupProps {
    multiple?: boolean;
}

const props = defineProps<SToggleGroupProps>();

const openedItem = ref<number | null>(null);
const isMultiple = computed(() => props.multiple)

provide('openedItem', openedItem as Ref<number | null>)
provide('isMultiple', isMultiple as Ref<boolean>)
</script>
<style lang="scss">
.s-togglegroup {
    display: flex;
    flex-direction: column;
    border-radius: var(--s-border-radius);
    overflow: hidden;
    font-family: var(--s-font-family);
    .s-toggle + .s-toggle {
        margin-top: 1px;
    }
}
</style>
