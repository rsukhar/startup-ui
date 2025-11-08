<template>
    <label class="s-radio" :class="[labelClass, {'disabled': disabled}]">
        <input type="radio" :value="value" v-model="model" @change="emits('change', value)" />
        <span class="s-radio-text"><slot /></span>
    </label>
</template>
<script setup>
import { inject, computed } from 'vue';
const props = defineProps({
    value: {
        type: [Number, String, Boolean],
        required: true
    },
    disabled: Boolean,
    labelClass: String,
});
const emits = defineEmits(['change']);

const radioGroupModel = inject('sRadioGroupModel');

const model = computed({
    // Значение находится в состоянии «выбрано», если radioGroupModel.value === props.value
    // Или если значение кнопки — пустота и model пустой ('', null или undefined)
    get: () => {
        const empties = ['', null, undefined];
        if (empties.includes(props.value) && empties.includes(radioGroupModel.value)) {
            return props.value
        }

        return radioGroupModel.value
    },
    set: (newValue) => { 
        if (!props.disabled) radioGroupModel.value = newValue
    }
});
</script>
<style lang="scss">
.s-radio {
    display: flex;
    width: fit-content;
    gap: 0.5rem;
    cursor: pointer;

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
