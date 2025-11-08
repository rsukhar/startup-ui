<template>
    <div class="s-input" :class="{'has-prefix': hasPrefix, 'has-suffix': hasSuffix}">
        <span v-if="hasPrefix" class="s-input-prefix">
            <template v-if="prefix">{{ prefix }}</template>
            <slot v-else name="prefix" />
        </span>
        <textarea class="s-input-field" v-if="type === 'textarea'" v-model="model" :rows="rows" :disabled="disabled"
                  :placeholder="placeholder" @input="(event) => $emit('change', event.target.value)" :style="inputStyle" />
        <input class="s-input-field" v-else :type="type" v-model="model" :placeholder="placeholder"
               :disabled="disabled" @input="(event) => $emit('change', event.target.value)" :style="inputStyle" />
        <span v-if="hasSuffix" class="s-input-suffix">
            <template v-if="suffix">{{ suffix }}</template>
            <slot v-else name="suffix" />
        </span>
    </div>
</template>
<script setup>
import { computed, useSlots } from "vue";

const props = defineProps({
    modelValue: {
        type: [Number, String]
    },
    type: {
        type: String,
        default: 'text',
        validator: propValue => {
            return ['text', 'string', 'number', 'email', 'password', 'textarea', 'search'].includes(propValue);
        }
    },
    placeholder: String,
    prefix: String,
    suffix: String,
    disabled: {
        type: Boolean,
        default: false
    },
    rows: {
        type: Number,
        default: 3
    },
    inputStyle: [String, Object, Array],
});

const model = defineModel();
const emits = defineEmits(['change']);
const $slots = useSlots();

const hasPrefix = computed(() => props.prefix || $slots.prefix);
const hasSuffix = computed(() => props.suffix || $slots.suffix);
</script>
<style lang="scss">
.s-input {
    display: flex;
    box-sizing: border-box;
    border: 1px solid var(--s-border);
    border-radius: var(--s-border-radius);
    background-color: var(--s-white);
    align-items: center;
    &:focus-within {
        border-color: var(--s-primary);
        box-shadow: none;
    }
    &-field {
        outline: none;
        line-height: 1.3;
        padding: 0.5rem 0.75rem;
        border: 0;
        background-color: transparent;
        &::placeholder {
            color: var(--s-text-lightest);
        }
        &[disabled] {
            color: var(--s-text-light);
        }
        &[type="search"]::-webkit-search-cancel-button {
            cursor: pointer;
        }
    }
    textarea {
        resize: vertical;
    }
    &.has-prefix .s-input-field {
        text-align: center;
        padding: 0.5rem 0.5rem 0.5rem 0.1rem;
    }
    &.has-suffix .s-input-field {
        text-align: center;
        padding: 0.5rem 0.1rem 0.5rem 0.5rem;
    }
    .s-input-prefix {
        padding-left: 0.5rem;
        color: var(--s-text-light);
    }
    .s-input-suffix {
        padding-right: 0.5rem;
        color: var(--s-text-light);
    }
}
</style>
