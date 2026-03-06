<template>
    <label class="s-radio" :class="[labelClass, {'disabled': disabled}]">
        <input type="radio" :value="value" v-model="model" @change="emits('change', value)" />
        <span class="s-radio-text"><slot /></span>
    </label>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
import type { Ref } from 'vue';

export interface SRadioProps {
    value: number | string | boolean;
    disabled?: boolean;
    labelClass?: string;
}

const props = defineProps<SRadioProps>();

const emits = defineEmits<{
    (e: 'change', value: any): void;
}>();

const radioGroupModel = inject<Ref<any> | null>('sRadioGroupModel', null);

const model = computed({
    // Значение находится в состоянии «выбрано», если radioGroupModel.value === props.value
    // Или если значение кнопки — пустота и model пустой ('', null или undefined)
    get: () => {
        if (!radioGroupModel) return props.value;

        const empties = ['', null, undefined] as any[];
        if (empties.includes(props.value) && empties.includes(radioGroupModel.value)) {
            return props.value;
        }

        return radioGroupModel.value;
    },
    set: (newValue) => { 
        if (!props.disabled && radioGroupModel) {
            radioGroupModel.value = newValue;
        }
    }
});
</script>
<style lang="scss">
.s-radio {
    display: flex;
    width: fit-content;
    gap: 0.5rem;
    cursor: pointer;
    font-family: var(--s-font-family);
    
    &-text {
        white-space: nowrap;
    }

    &.disabled {
        color: var(--s-text-light);
        pointer-events: none;
    }

    .buttons > & {
        &.disabled {
            color: var(--s-text-lightest);
            background-color: var(--s-gray);
        }
    }
}
</style>
