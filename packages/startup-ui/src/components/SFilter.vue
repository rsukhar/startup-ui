<template>
    <div class="s-filter">
        <template v-if="name">
            <component v-for="(node, index) in nestedNodes" :is="node" :key="index" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { computed, inject, useSlots, cloneVNode, ref, watch } from 'vue';
// @ts-ignore
import debounce from "lodash/debounce";
const props = defineProps<{
    name?: string;
    debounce?: number;
}>();
const groupModel = inject<import('vue').Ref<Record<string, any>>>('sFilterGroup-model');
const slots = useSlots();
const groupUpdateValue = inject<(name: string, value: any) => void>('sFilterGroup-updateValue', (name: string, value: any) => ({}));
const updateParam = ref<(val: any) => void>(() => {});

/**
 * Пересоздаем функцию обновления url-параметров при изменении debounce или name
 */
watch(
    () => [props.debounce, props.name],
    ([debounceValue, name]) => {
        updateParam.value = debounce((val: any) => {
            if (name && typeof name === 'string') groupUpdateValue(name, val);
        }, (debounceValue as number) ?? 0);
    },
    { immediate: true }
);

// Для генерируемого поля делаем отдельную переменную, чтобы гибче управлять состоянием фильтра
const nestedModel = ref<any>(null);

const nestedNodes = computed(() => {
    const vnodes = (slots as any).default?.() || [];
    return vnodes.map((vnode: any) => {
        if (typeof vnode.type !== 'object') return vnode;
        nestedModel.value = (groupModel && groupModel.value && props.name) ? groupModel.value[props.name] : null;
        // Если элемент SDatePicker с атрибутом range — превращаем в массив
        if (nestedModel.value && vnode.type.__name === 'SDatePicker' && vnode.props?.range !== null) {
            nestedModel.value = String(nestedModel.value).split('-');
        }
        // Копируем vnodes с инпутами и добавляем к ним modelValue
        return cloneVNode(vnode, {
            modelValue: nestedModel.value,
            'onUpdate:modelValue': (val: any) => {
                const finalValue = Array.isArray(val) ? val.join('-') : val;
                updateParam.value(finalValue);
            },
        });
    });
});
</script>
<style lang="scss">
.s-filter {
    display: flex;
    flex-wrap: wrap;
    font-family: var(--s-font-family);
    & > div {
        flex-grow: 1;
    }
    @include mobile() {
        flex-grow: 1;
    }
}
</style>
