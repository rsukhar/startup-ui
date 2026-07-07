<template>
    <div class="s-stepper">
        <template v-for="(step, index) in normalized" :key="index">
            <div v-if="index > 0" class="s-stepper-sep" />
            <div class="s-stepper-item"
                 :class="{ done: index < activeIndex, active: index === activeIndex }"
                 @click="select(step, index)">
                <span class="s-stepper-dot">
                    <template v-if="index < activeIndex">✓</template>
                    <template v-else>{{ index + 1 }}</template>
                </span>
                <span class="s-stepper-label">{{ step.label }}</span>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { normalizeOptions, type NormalizedOption } from '../utils/options';

export interface SStepperProps {
    /** Шаги в форматах options: map, массив пар, массив объектов или строк */
    options?: Record<string | number, any> | any[];
    /** Значение текущего шага (для массива строк — сама строка) */
    modelValue?: any;
}

const props = defineProps<SStepperProps>();

const emit = defineEmits<{
    'update:modelValue': [value: any];
}>();

const normalized = computed(() => normalizeOptions(props.options, { coerceKeys: true }));

// Текущий шаг: по значению модели, по умолчанию — первый
const activeIndex = computed(() => {
    const index = normalized.value.findIndex((step) => step.value === props.modelValue);
    return index === -1 ? 0 : index;
});

// Кликом можно вернуться только на пройденный шаг — будущие открываются самим сценарием
const select = (step: NormalizedOption, index: number) => {
    if (index >= activeIndex.value) return;
    emit('update:modelValue', step.value);
};
</script>

<style lang="scss">
.s-stepper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-family: var(--s-font-family);

    &-item {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--s-text-light);

        &.active {
            color: var(--s-text);
            font-weight: bold;

            .s-stepper-dot {
                background-color: var(--s-primary);
                color: var(--s-white);
            }
        }

        &.done {
            color: var(--s-text);
            cursor: pointer;

            .s-stepper-dot {
                background-color: var(--s-green);
                color: var(--s-white);
            }

            &:hover {
                color: var(--s-primary);
            }
        }
    }

    &-dot {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: var(--s-gray);
        font-size: 12px;
        font-weight: bold;
        flex-shrink: 0;
    }

    &-sep {
        &:before {
            content: '→';
            color: var(--s-border);
        }
    }
}
</style>
