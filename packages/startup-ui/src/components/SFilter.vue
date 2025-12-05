<template>
    <div class="s-filter">
        <template v-if="name">
            <component v-for="(node, index) in nestedNodes" :is="node" :key="index" />
        </template>
    </div>
</template>
<script setup>
import { computed, inject, useSlots, cloneVNode, ref, watch } from 'vue';
import debounce from "lodash/debounce";
const props = defineProps({
    name: String,
    debounce: Number,
});
const groupModel = inject('sFilterGroup-model', {});
const slots = useSlots();
const groupUpdateValue = inject('sFilterGroup-updateValue', (name, value) => ({}));
const updateParam = ref(() => {});

/**
 * Пересоздаем функцию обновления url-параметров при изменении debounce или name
 */
watch(
    () => [props.debounce, props.name],
    ([debounceValue, name]) => {
        updateParam.value = debounce((val) => {
            groupUpdateValue(name, val);
        }, debounceValue ?? 0);
    },
    { immediate: true }
);

// Для генерируемого поля делаем отдельную переменную, чтобы гибче управлять состоянием фильтра
const nestedModel = ref(null);

const nestedNodes = computed(() => {
    const vnodes = slots.default?.() || [];
    return vnodes.map((vnode) => {
        if (typeof vnode.type !== 'object') return vnode;
        nestedModel.value = groupModel?.value[props.name] ?? null;
        // Если элемент SDatePicker с атрибутом range — превращаем в массив
        if (nestedModel.value && vnode.type.__name === 'SDatePicker' && vnode.props.range !== null) {
            nestedModel.value = nestedModel.value.split('-');
        }
        // Копируем vnodes с инпутами и добавляем к ним modelValue
        return cloneVNode(vnode, {
            modelValue: nestedModel.value,
            'onUpdate:modelValue': (val) => {
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
