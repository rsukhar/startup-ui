<template>
    <div class="s-formrow" :class="{error: error !== ''}">
        <div v-if="$slots.title" class="s-formrow-title" :style="titleStyle">
            <slot name="title" />
        </div>
        <div v-else class="s-formrow-title" @click="focus" :style="titleStyle">
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

<script setup lang="ts">
import { useTemplateRef, computed, inject, cloneVNode, h, useSlots } from 'vue';
import type { Ref } from 'vue';

export interface SFormRowProps {
    class?: string;
    name?: string;
    title?: string;
    hint?: string;
    errorKey?: string | string[];
}

const props = defineProps<SFormRowProps>();

const form = inject<Record<string, any>>('formModel');
const modelValue = computed({
    get: () => props.name && form ? form[props.name] : undefined,
    set: (field) => {
        if (form && props.name) form[props.name] = field
    }
})

const errors = inject<Ref<Record<string, any>>>('formErrors');

/**
 * Convert the key into a regexp pattern
 *
 * @param pattern
 */
function wildcardToRegExp(pattern: string) {
    const escaped = pattern
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // escape special characters
        .replace(/\*/g, '[^.]+'); // * = a single segment between dots

    return new RegExp(`^${escaped}$`);
}

const error = computed(() => {
    const allErrors = errors?.value;
    // No errors
    if (!allErrors || Object.keys(allErrors).length === 0) return null;
    // No custom keys specified
    if (!props.errorKey) return props.name ? (allErrors[props.name] ?? null) : null;

    const keys = Array.isArray(props.errorKey) ? [...props.errorKey] : [props.errorKey];
    // iterate over the keys
    return keys
        .flatMap(key => {
        if (key.includes('*')) {
            const reg = wildcardToRegExp(key);
            return Object.entries(allErrors)
            .filter(([k]) => reg.test(k))
            .map(([, v]) => v);
        }

        return allErrors[key] ? [allErrors[key]] : [];
    }).join('\n') || null;
});

const titlesWidth = inject<number | string | undefined>('titlesWidth', undefined);
const titlesAtLeft = inject<boolean>('titlesAtLeft', false);

// Enforce the title width only when titles are on the left — with titles on top it causes line breaks
const titleStyle = computed(() => {
    if (!titlesAtLeft || !titlesWidth) return undefined;
    return { width: typeof titlesWidth === 'number' ? `${titlesWidth}px` : String(titlesWidth) };
});

const slots = useSlots();

// Binds modelValue to the field component at any nesting depth
// (the field may be wrapped in a <div> etc. — binding by name is not lost)
function bindFieldNodes(vnodes: any[]): any[] {
    return vnodes.map((vnode: any) => {
        if (!vnode || typeof vnode !== 'object') return vnode;
        const type = vnode.type;

        // Component (form field) — add modelValue/onUpdate
        if (typeof type === 'object' || typeof type === 'function') {
            const inputType = vnode.props?.type;
            return cloneVNode(vnode, {
                modelValue: modelValue.value,
                'onUpdate:modelValue': (val: any) => {
                    if (inputType === 'number') {
                        modelValue.value = val === '' ? null : Number(val);
                    } else {
                        modelValue.value = val;
                    }
                }
            });
        }

        // HTML wrapper element (div etc.) — recursively process children
        if (typeof type === 'string' && Array.isArray(vnode.children) && vnode.children.length) {
            return h(type, { ...(vnode.props || {}), key: vnode.key }, bindFieldNodes(vnode.children));
        }

        return vnode;
    });
}

const nestedNodes = computed(() => bindFieldNodes((slots as any).default?.() || []));

const input = useTemplateRef<HTMLElement>('input');

function focus() {
    if (!input.value) return;
    const $input = input.value.querySelector<HTMLElement>('input, textarea');
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
        white-space: pre-line;
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
    // Labels on top
    .s-form:not(.titles_at_left) & {
        flex-direction: column;
        .s-formrow-input .s-button {
            width: 100%;
        }
    }
    // If labels are on the left
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
