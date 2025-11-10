<template>
    <div class="s-togglegroup">
        <slot />
    </div>
</template>
<script setup>
import { ref, provide, computed } from 'vue';
const props = defineProps({
    multiple: Boolean
});

const openedItem = ref(null);
const isMultiple = computed(() => props.multiple)

provide('openedItem', openedItem)
provide('isMultiple', isMultiple)
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
