<template>
    <div class="s-formrow" :class="{error: error !== ''}">
        <div v-if="$slots.title" class="s-formrow-title" :style="{width: titlesWidth ? titlesWidth + 'px' : null}">
            <slot name="title" />
        </div>
        <div v-else class="s-formrow-title" @click="focus" :style="{width: titlesWidth ? titlesWidth + 'px' : null}">
            {{ title ?? '' }}
        </div>

        <div class="s-formrow-input-wrapper">
            <div class="s-formrow-input" ref="input">
                <template v-if="name">
                    <component v-for="(node, index) in nestedNodes" :is="node" :key="index" />
                </template>
                <slot v-else />
                <div v-if="$slots.hint" class="s-formrow-hint"><slot name="hint" /></div>
                <div v-if="hint" class="s-formrow-hint">{{ hint }}</div>
            </div>
            <div class="s-formrow-error" v-if="error">
                {{ Array.isArray(error) ? error.join("") : error }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTemplateRef, computed, inject, cloneVNode, useSlots } from 'vue';

const props = defineProps({
    class: String,
    name: String,
    title: String,
    hint: String,
});

const form = inject('formModel');
const modelValue = computed({
    get: () => form?.[props.name],
    set: (field) => {
        if (form) form[props.name] = field
    }
})

const errors = inject('formErrors');
const error = computed(() => errors.value[props.name] ?? '');

const titlesWidth = inject('titlesWidth');

const slots = useSlots();

const nestedNodes = computed(() => {
    const vnodes = slots.default?.() || [];
    return vnodes.map((vnode) => {
        // Текстовые узлы и div'ы выводим как есть
        if (typeof vnode.type !== 'object') return vnode;
        const inputType = vnode.props?.type;

        // Копируем vnodes с инпутами и добавляем к ним modelValue
        return cloneVNode(vnode, {
            modelValue: modelValue.value,
            'onUpdate:modelValue': (val) => {
                if (inputType === 'number') {
                    modelValue.value = val === '' ? null : Number(val);
                } else {
                    modelValue.value = val;
                }
            }
        });
    });
});

const input = useTemplateRef('input');

function focus() {
    const $input = input.value.querySelector('input, textarea');
    if ($input) {
        $input.focus();
    }
}

defineExpose({ focus });
</script>

<style lang="scss">
.s-formrow {
    display: flex;
    flex-direction: column;
    font-family: var(--s-font-family);
    
    &-title {
        line-height: var(--s-field-height);
        text-align: left;
        flex-shrink: 0;
    }
    &-input-wrapper {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
    }

    &-input {
        text-align: left;
        input, textarea, button, a {
            width: 100%;
        }
        flex-grow: 1;
    }
    &-hint {
        font-size: 0.9rem;
        color: var(--s-text-light);
        margin-top: 5px;
    }
    &-error {
        color: var(--s-red);
    }
    div:not(&-description) + &-error {
        margin-top: 5px;
    }
    &.type_switch {
        .s-formrow-title {
            font-size: 0;
        }
    }
    // Лейблы сверху
    .s-form:not(.titles_at_left) & {
        flex-direction: column;
        .s-formrow-input .s-button {
            width: 100%;
        }
    }
    // Если лейблы слева
    .s-form.titles_at_left & {
        flex-direction: row;
        justify-content: space-between;
        &-input {
            display: flex;
            flex-direction: column;
        }
    }
    .s-form-grouptitle {
        margin: calc(var(--s-base-margin) * 2) 0 var(--s-base-margin) 250px;
    }

    .s-form-tooltip {
        display: inline-block;
        margin-left: calc(var(--s-base-margin) / 4);
        cursor: help;

        svg {
            color: var(--s-text-light);
            vertical-align: middle;
        }
    }

    .p-password {
        display: block;
    }
}
</style>
