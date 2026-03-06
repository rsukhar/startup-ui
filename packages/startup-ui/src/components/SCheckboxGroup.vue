<template>
    <div class="s-checkboxgroup" :class="{'vertical': vertical}">
        <slot />
        <SCheckbox v-for="[value, title] in Object.entries(internalOptions)" :key="value" :value="value">
            {{ title }}
        </SCheckbox>
    </div>
</template>
<script setup lang="ts">
import { provide, computed } from 'vue';
import SCheckbox from './SCheckbox.vue';

export interface SCheckboxGroupProps {
    modelValue?: any[];
    // В формате {value1: title1, value2: title2, ...} или [[value1, title1], [value2, title2], ...]
    options?: Record<string | number, any> | any[];
    vertical?: boolean;
}

const props = defineProps<SCheckboxGroupProps>();
const model = defineModel<any[]>({ default: () => [] });

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
    font-family: var(--s-font-family);
    
    &.vertical {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
