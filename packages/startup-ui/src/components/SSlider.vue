<template>
    <div class="s-slider" :class="{ disabled }">
        <input type="range" v-model.number="model" :min="min" :max="max" :step="step" :disabled="disabled" />
        <span v-if="showValue" class="s-slider-value">
            <slot :value="model">{{ model }}{{ unit }}</slot>
        </span>
    </div>
</template>
<script setup lang="ts">
export interface SSliderProps {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Suffix appended to the displayed value, e.g. '%' */
    unit?: string;
    showValue?: boolean;
}

withDefaults(defineProps<SSliderProps>(), {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    showValue: true,
});

const model = defineModel<number>({ default: 0 });
</script>
<style lang="scss">
.s-slider {
    display: flex;
    align-items: center;
    gap: 12px;
    // Aligned with the other form fields so grid layouts don't shift
    height: var(--s-field-height);
    font-family: var(--s-font-family);

    input[type="range"] {
        flex: 1 1 auto;
        min-width: 0;
        margin: 0;
        accent-color: var(--s-primary);
        cursor: pointer;
    }

    &-value {
        flex: 0 0 auto;
        min-width: 48px;
        text-align: right;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        color: var(--s-primary);
    }

    &.disabled {
        opacity: 0.5;

        input[type="range"] {
            cursor: not-allowed;
        }
    }
}
</style>
