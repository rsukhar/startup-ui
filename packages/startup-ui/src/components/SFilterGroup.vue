<template>
    <div class="s-filtergroup">
        <slot />
    </div>
</template>
<script setup>
import { provide, onBeforeMount, onMounted, onBeforeUnmount, useSlots, ref } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    /**
     * Если установлено, то получает значение модели из query-параметров при загрузке и изменяет их при изменении значений фильтров
     */
    bindToQuery: {
        type: Boolean,
        default: false,
    },
    /**
     * Query-параметры, которые не учитываем в модели
     */
    ignoreQueryNames: {
        type: Array,
        default: () => (['page']),
    },
    /**
     * Значения модели, которые не проставляем в query-параметры (пропускаем такие параметры)
     */
    ignoreQueryValues: {
        type: Array,
        default: () => (['', null, undefined, false]),
    },
});

/**
 * Определяем наличие debounce на дочернем компоненте (чтобы подставить reserveState)
 */
const slots = useSlots();
const hasDebouncedFilter = ref(false);
onMounted(() => {
    const children = slots.default?.() || [];
    hasDebouncedFilter.value = children.some(child => child.props?.debounce);
});

const model = defineModel({
    type: Object,
    default: () => ({})
});
provide('sFilterGroup-model', model);

const updateValue = (name, value) => {
    if (props.ignoreQueryValues.includes(value)) {
        delete model.value[name];
    } else {
        model.value[name] = value;
    }
    if (props.bindToQuery) setQueryParams(model.value);
}
provide('sFilterGroup-updateValue', updateValue);

const getQueryParams = () => {
    const result = {};
    for (const [name, value] of (new URLSearchParams(window.location.search)).entries()){
        if ( ! props.ignoreQueryNames.includes(name)) result[name] = value;
    }

    return result;
}
const setQueryParams = (params) => {
    const filteredParams = Object.fromEntries(Object.entries(params)
        .filter(([name, value]) => ! props.ignoreQueryNames.includes(name) && !props.ignoreQueryValues.includes(value)));
    router.get(window.location.pathname, new URLSearchParams(filteredParams), {
        preserveScroll: true,
        replace: true,
        ...(hasDebouncedFilter.value && { preserveState: true }),
    });
}

// Следим за изменением query и синхронизируемся
const handleUrlChange = () => {
    if (props.bindToQuery) model.value = getQueryParams();
};
onBeforeMount(() => handleUrlChange());
onMounted(() => window.addEventListener('popstate', handleUrlChange));
onBeforeUnmount(() => window.removeEventListener('popstate', handleUrlChange));
</script>
<style lang="scss">
.s-filtergroup {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: var(--s-base-margin);
    align-items: stretch;
    margin-bottom: var(--s-base-margin);
    font-family: var(--s-font-family);
    & > .s-button {
        display: flex;
        align-items: center;
    }
}
</style>