<template>
    <div class="s-checkboxgroup" :class="{'vertical': vertical}">
        <slot />
        <SCheckbox v-for="option in normalizedOptions" :key="option.value" :value="option.value">
            {{ option.label }}
        </SCheckbox>
    </div>
</template>
<script setup lang="ts">
import { provide, computed } from 'vue';
import SCheckbox from './SCheckbox.vue';
import { normalizeOptions } from '../utils/options';

export interface SCheckboxGroupProps {
    modelValue?: any[];
    // Карта {value: label}, массив пар [[value, label]] или массив объектов [{value, label}]
    options?: Record<string | number, any> | any[];
    vertical?: boolean;
    /** Ключ значения для массива объектов (по умолчанию 'value') */
    optionValue?: string;
    /** Ключ подписи для массива объектов (по умолчанию 'label') */
    optionLabel?: string;
}

const props = defineProps<SCheckboxGroupProps>();
const model = defineModel<any[]>({ default: () => [] });

provide('groupValue', model);

const normalizedOptions = computed(() => normalizeOptions(props.options, {
    optionLabel: props.optionLabel,
    optionValue: props.optionValue,
}));
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
