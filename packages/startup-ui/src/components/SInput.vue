<template>
    <div class="s-input" :class="{'has-prefix': hasPrefix, 'has-suffix': hasSuffix, 'clearable': clearable}">
        <span v-if="hasPrefix" class="s-input-prefix">
            <template v-if="prefix">{{ prefix }}</template>
            <slot v-else name="prefix" />
        </span>
        <textarea class="s-input-field" v-if="type === 'textarea'" v-model="model" :rows="rows" :disabled="disabled"
                  :placeholder="placeholder" @input="(event) => $emit('change', (event.target as HTMLTextAreaElement).value)" :style="inputStyle" />
        <input class="s-input-field" v-else :type="type" v-model="model" :placeholder="placeholder"
               :disabled="disabled" @input="(event) => $emit('change', (event.target as HTMLInputElement).value)" :style="inputStyle" />
        <span v-if="hasSuffix" class="s-input-suffix">
            <template v-if="suffix">{{ suffix }}</template>
            <slot v-else name="suffix" />
        </span>
        <span v-if="clearable && hasValue && !disabled" class="s-input-clear" @click="handleClear">
            <FontAwesomeIcon icon="xmark" />
        </span>
    </div>
</template>
<script setup lang="ts">
import { computed, useSlots, watch } from "vue";
import type { StyleValue } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export interface SInputProps {
    modelValue?: number | string | null;
    type?: 'text' | 'string' | 'number' | 'email' | 'password' | 'textarea';
    placeholder?: string;
    prefix?: string;
    suffix?: string;
    clearable?: boolean;
    disabled?: boolean;
    rows?: number;
    inputStyle?: StyleValue;
    /**
     * What to represent an empty value with: '' or null.
     * By default (undefined) the behavior is unchanged. For example, emptyValue="" guarantees
     * an empty string instead of null (useful for NOT NULL fields).
     */
    emptyValue?: '' | null;
}

const props = withDefaults(defineProps<SInputProps>(), {
    type: 'text',
    disabled: false,
    rows: 3,
});

const model = defineModel<number | string | null>();

// Normalize an empty value to emptyValue, if it is set
watch(model, (val) => {
    if (props.emptyValue === undefined) return;
    if ((val === '' || val === null || val === undefined) && val !== props.emptyValue) {
        model.value = props.emptyValue;
    }
}, { immediate: true });
const emits = defineEmits<{
    (e: 'change', value: string): void;
}>();
const $slots = useSlots();

const hasPrefix = computed(() => props.prefix || $slots.prefix);
const hasSuffix = computed(() => props.suffix || $slots.suffix);
const hasValue = computed(() => model.value !== '' && model.value != null);

// Clear button (clearable): reset to emptyValue if set, otherwise an empty string
function handleClear() {
    model.value = props.emptyValue !== undefined ? props.emptyValue : '';
    emits('change', '');
}
</script>
<style lang="scss">
.s-input {
    position: relative;
    display: flex;
    box-sizing: border-box;
    border: 1px solid var(--s-border);
    border-radius: var(--s-border-radius);
    background-color: var(--s-white);
    align-items:center;
    font-family: var(--s-font-family);
    gap: 5px;
    &:focus-within {
        border-color: var(--s-primary);
        box-shadow: none;
    }
    &-field {
        width: 100%;
        outline: none;
        padding: 0.5rem 0.75rem;
        border: 0;
        background-color: transparent;
        &::placeholder {
            color: var(--s-text-lightest);
        }
        &[disabled] {
            color: var(--s-text-light);
        }
    }
    textarea {
        resize: vertical;
    }
    &.has-prefix .s-input-field {
        padding: 0.5rem 0.5rem 0.5rem 0.1rem;
    }
    &.has-suffix .s-input-field {
        padding: 0.5rem 0.1rem 0.5rem 0.5rem;
    }
    .s-input-prefix {
        display: flex;
        align-items: center;
        gap: 5px;
        padding-left: 0.5rem;
        color: var(--s-text-light);
        flex-shrink: 0;
        text-align: center;
        line-height: 1;
    }
    .s-input-suffix {
        display: flex;
        align-items: center;
        gap: 5px;
        padding-right: 0.5rem;
        color: var(--s-text-light);
        flex-shrink: 0;
        text-align: center;
        line-height: 1;
    }
    .s-input-clear {
        position: absolute;
        right: 0.5rem;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        color: var(--s-text-light);
        cursor: pointer;
        &:hover {
            color: var(--s-primary);
        }
    }
    // Reserve room for the absolutely-positioned clear button so the field width
    // stays fixed whether or not the button is currently shown.
    &.clearable .s-input-field {
        padding-right: 1.75rem;
    }
}
</style>
