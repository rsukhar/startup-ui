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
<script setup>
import { provide, watch, computed } from 'vue';
import SRadio from './SRadio.vue';
const props = defineProps({
    options: {
        // В формате {value1: title1, value2: title2, ...} или [[value1, title1], [value2, title2], ...]
        type: [Object, Array],
        required: true
    },
    buttons: Boolean,
    vertical: Boolean,
    placeholder: String
});
const emits = defineEmits(['change']);
const model = defineModel();

// Нормализуем options в единый формат
const normalizedOptions = computed(() => {
    // Если передано массивом
    if (props.options instanceof Array){
        return props.options.map(item => ({ value: item[0], title: item[1] }));
    }
    if (!props.options || Object.values(props.options) === 0) {
        return {};
    }

    return Object.entries(props.options).map(([value, title]) => {
        // Преобразуем строковые boolean, т.к. при «распаковке» занчения становятся строковыми
        let parsedValue = value;
        if (value === 'true') parsedValue = true;
        if (value === 'false') parsedValue = false;
        if (!isNaN(value) && value !== '') parsedValue = Number(value);
        
        return { value: parsedValue, title };
    });
});

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
                display: none; /* Прячем радиокнопки */
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
                flex: 1; /* Занимаем равное пространство */
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
