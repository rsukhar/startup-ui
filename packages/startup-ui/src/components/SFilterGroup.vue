<template>
    <div class="s-filtergroup">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { provide, onBeforeMount, onMounted, onBeforeUnmount, useSlots, ref } from 'vue';
import { router } from '@inertiajs/vue3';

const props = withDefaults(defineProps<{
    /**
     * Если установлено, то получает значение модели из query-параметров при загрузке и изменяет их при изменении значений фильтров
     */
    bindToQuery?: boolean;
    /**
     * Query-параметры, которые не учитываем в модели
     */
    ignoreQueryNames?: string[];
    /**
     * Значения модели, которые не проставляем в query-параметры (пропускаем такие параметры)
     */
    ignoreQueryValues?: any[];
}>(), {
    bindToQuery: false,
    ignoreQueryNames: () => ['page'],
    ignoreQueryValues: () => ['', null, undefined, false],
});

/**
 * Определяем наличие debounce на дочернем компоненте (чтобы подставить reserveState)
 */
const slots = useSlots();
const hasDebouncedFilter = ref(false);
onMounted(() => {
    const children = slots.default?.({}) || [];
    hasDebouncedFilter.value = children.some((child: any) => child.props?.debounce);
});

const model = defineModel<Record<string, any>>({
    type: Object,
    default: () => ({})
});
provide('sFilterGroup-model', model);

const updateValue = (name: string, value: any) => {
    if (props.ignoreQueryValues.includes(value)) {
        if (model.value) delete model.value[name];
    } else {
        if (model.value) model.value[name] = value;
    }
    if (props.bindToQuery && model.value) setQueryParams(model.value);
}
provide('sFilterGroup-updateValue', updateValue);

const getQueryParams = () => {
    const result: Record<string, string> = {};
    for (const [name, value] of (new URLSearchParams(window.location.search)).entries()){
        if ( ! props.ignoreQueryNames.includes(name)) result[name] = value;
    }

    return result;
}
const setQueryParams = (params: Record<string, any>) => {
    const filteredParams: Record<string, string> = Object.fromEntries(Object.entries(params)
        .filter(([name, value]) => ! props.ignoreQueryNames.includes(name) && !props.ignoreQueryValues.includes(value))
        .map(([name, value]) => [name, String(value)])
    );
    router.get(window.location.pathname, filteredParams, {
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