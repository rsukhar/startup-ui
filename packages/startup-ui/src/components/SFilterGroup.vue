<template>
    <div class="s-filtergroup">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { provide, onBeforeMount, onMounted, onBeforeUnmount, useSlots, ref } from 'vue';
import { getStartupUiRouter } from '../config';

const props = withDefaults(defineProps<{
    /**
     * If set, reads the model value from query parameters on load and updates them when filter values change
     */
    bindToQuery?: boolean;
    /**
     * Query parameters that are not included in the model
     */
    ignoreQueryNames?: string[];
    /**
     * Model values that are not written to query parameters (such parameters are skipped)
     */
    ignoreQueryValues?: any[];
}>(), {
    bindToQuery: false,
    ignoreQueryNames: () => ['page'],
    ignoreQueryValues: () => ['', null, undefined, false],
});

/**
 * Detect whether a child component has debounce (in order to set reserveState)
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

    const router = getStartupUiRouter();
    if (router) {
        // A router was registered (e.g. Inertia via app.use(StartupUI, { router })) — do a full
        // visit so the server re-queries with the new params
        router.get(window.location.pathname, filteredParams, {
            preserveScroll: true,
            replace: true,
            ...(hasDebouncedFilter.value && { preserveState: true }),
        });
    } else {
        // No router registered — keep the URL in sync via the History API (no SPA refetch)
        const queryString = new URLSearchParams(filteredParams).toString();
        window.history.replaceState(window.history.state, '', window.location.pathname + (queryString ? `?${queryString}` : ''));
    }
}

// Watch for query changes and synchronize
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