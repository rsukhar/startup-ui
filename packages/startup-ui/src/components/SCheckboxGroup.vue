<template>
    <div class="s-checkboxgroup" :class="{'vertical': vertical}">
        <slot />
        <SCheckbox v-for="[value, title] in Object.entries(internalOptions)" :key="value" :value="value">
            {{ title }}
        </SCheckbox>
    </div>
</template>
<script setup>
import { provide, computed } from 'vue';
import SCheckbox from './SCheckbox.vue';

const props = defineProps({
    modelValue: Object,
    options: Object,
    vertical: Boolean
});
const model = defineModel();
provide('groupValue', model);

const internalOptions = computed(() => props.options ?? {});
</script>
<style lang="scss">
.s-checkboxgroup {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--s-base-margin);
    user-select: none;

    &.vertical {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
