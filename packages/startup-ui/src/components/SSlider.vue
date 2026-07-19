<template>
    <div class="s-slider" :class="{ disabled, 'value-left': showValue && valuePosition === 'left' }">
        <input type="range" v-model.number="model" :min="min" :max="max" :step="step" :disabled="disabled" />
        <span v-if="showValue" class="s-slider-value">
            <template v-if="editable">
                <input
                    class="s-slider-value-field"
                    type="text"
                    inputmode="decimal"
                    v-model="inputText"
                    :disabled="disabled"
                    @blur="commitInput"
                    @keydown.enter.prevent="commitInput"
                />
                <span v-if="unit" class="s-slider-value-unit">{{ unit }}</span>
            </template>
            <slot v-else :value="model">{{ model }}{{ unit }}</slot>
        </span>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

export interface SSliderProps {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Suffix appended to the displayed value, e.g. '%' */
    unit?: string;
    showValue?: boolean;
    /** Render the value as an editable input instead of static text */
    editable?: boolean;
    /** Which side of the slider the value sits on */
    valuePosition?: 'left' | 'right';
}

const props = withDefaults(defineProps<SSliderProps>(), {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    showValue: true,
    editable: false,
    valuePosition: 'right',
});

const model = defineModel<number>({ default: 0 });

// Text mirror of the model for the editable field. It's only committed to the model on blur/Enter,
// so mid-typing an out-of-range value doesn't yank the slider around.
const inputText = ref(String(model.value));
watch(model, (v) => { inputText.value = String(v); });

// Commit the typed value: snap to the nearest valid step and clamp into [min, max]; revert if it
// isn't a number.
function commitInput() {
    const parsed = parseFloat(inputText.value);
    if (Number.isNaN(parsed)) {
        inputText.value = String(model.value);
        return;
    }
    const stepped = props.step > 0
        ? props.min + Math.round((parsed - props.min) / props.step) * props.step
        : parsed;
    const clamped = Math.min(props.max, Math.max(props.min, stepped));
    // Trim floating-point noise from the step arithmetic (e.g. 0.30000000000000004)
    const normalized = Number(clamped.toFixed(6));
    model.value = normalized;
    inputText.value = String(normalized);
}
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
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        gap: 4px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        color: var(--s-primary);
    }

    // Editable value: a compact, centered input
    &-value-field {
        width: 48px;
        box-sizing: border-box;
        text-align: center;
        font: inherit;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        color: var(--s-primary);
        border: 1px solid var(--s-border);
        border-radius: var(--s-border-radius);
        padding: 2px 4px;
        background: var(--s-white);
        outline: none;

        &:focus {
            border-color: var(--s-primary);
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

    // Value on the left of the slider
    &.value-left {
        .s-slider-value {
            order: -1;
            justify-content: flex-start;
        }
    }

    &.disabled {
        opacity: 0.5;

        input[type="range"] {
            cursor: not-allowed;
        }
    }
}
</style>
