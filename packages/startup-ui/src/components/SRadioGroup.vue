<template>
    <div class="s-radiogroup">
        <div class="s-radiogroup-container" :class="{'buttons': buttons, 'vertical': vertical}">
            <SRadio v-if="placeholder" value="">{{ placeholder }}</SRadio>
            <template v-if="Object.values($slots).length" >
                <slot />
            </template>
            <SRadio v-for="{value, title} in normalizedOptions" :key="value" :value="value">
                <span v-html="title"></span>
            </SRadio>
        </div>
    </div>
</template>
<script setup lang="ts">
import { provide, watch, computed } from 'vue';
import SRadio from './SRadio.vue';
import { normalizeOptions } from '../utils/options';

export interface SRadioGroupProps {
    // Map {value: label}, array of pairs [[value, label]], or array of objects [{value, label}]
    options?: Record<string | number, any> | any[];
    buttons?: boolean;
    vertical?: boolean;
    placeholder?: string;
    /** Value key for an array of objects (default 'value') */
    optionValue?: string;
    /** Label key for an array of objects (default 'label') */
    optionLabel?: string;
}

const props = defineProps<SRadioGroupProps>();

const emits = defineEmits<{
    (e: 'change', value: any): void;
}>();

const model = defineModel<any>();

// Normalize options to a single format [{ value, title }]
const normalizedOptions = computed(() =>
    normalizeOptions(props.options, {
        optionLabel: props.optionLabel,
        optionValue: props.optionValue,
        // Coerce the map object keys to boolean/number (as it was historically)
        coerceKeys: true,
    }).map(o => ({ value: o.value, title: o.label }))
);

provide('sRadioGroupModel', model);

watch(model, newValue => {
    emits('change', newValue);
});
</script>
<style lang="scss">
.s-radiogroup {
    display: flex;
    font-family: var(--s-font-family);
    
    &.fullwidth {
        width: 100%;
    }
    
    &-container {
        display: flex;
        gap: 20px;
        width: 100%;
        box-sizing: border-box;

        &.buttons {
            gap: 0;
            display: inline-flex;
            overflow: hidden;
            min-height: 32px;
            flex-wrap: wrap;
            padding: 1px 0 0 1px;

            input[type="radio"] {
                display: none; /* Hide the radio buttons */
            }

            label {
                display: flex;
                padding: 5px 16px;
                text-align: center;
                align-content: center;
                justify-content: center;
                cursor: pointer;
                background-color: var(--s-white);
                color: var(--s-text-light);
                font-size: 14px;
                transition: background-color 0.2s, color 0.2s;
                margin: -1px 0 0 -1px;
                box-sizing: border-box;
                flex: 1; /* Take up equal space */
                white-space: nowrap;
                border: 1px var(--s-border) solid;
                border-right: 1px solid var(--s-border);
                align-items: center;

                &:hover {
                    color: var(--s-primary)
                }

                &:has(input[type="radio"]:checked) {
                    position: relative;
                    z-index: 10;
                    background-color: var(--s-primary);
                    border-color: var(--s-primary);
                    color: var(--s-white);
                }

                &:last-of-type {
                    border-radius: 0 5px 5px 0;
                }

                &:first-of-type {
                    border-radius: 5px 0 0 5px;
                }

                &.shift {
                    font-size: 0.8em;
                    line-height: 1.1
                }
            }

            &.vertical {
                flex-direction: column;
                border-radius: 5px;
                label {
                    width: 100%;
                    border-top: 1px solid var(--s-border);
                    &:first-of-type {
                        border-top: none;
                        border-radius: 5px 5px 0 0;
                    }

                    &:last-of-type {
                        border-radius: 0 0 5px 5px;
                    }
                }
            }
        }

        &.vertical {
            flex-direction: column;
        }
    }
}
</style>
