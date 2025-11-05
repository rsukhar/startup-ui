<template>
    <div class="s-filtergroup">
        <slot />
    </div>
</template>
<script setup>
import { provide, watch, ref, onMounted, onBeforeUnmount } from 'vue';
import { router } from '@inertiajs/vue3';

/**
 * Получить объект GET-параметров
 */
function syncWithUrl() {
    const paramsObj = new URLSearchParams(window.location.search);
    return Object.fromEntries(paramsObj.entries());
}
const urlParams = ref({...syncWithUrl()});
provide('params', urlParams);

// Обновление URL
const applyParamsToUrl = (params) => {
    // Убираем пустые значения и сбрасываем page
    const newParams = Object.fromEntries(Object.entries(params).filter(([key, value]) =>
        !['', null, undefined, false].includes(value) && key !== 'page'
    ));
    router.get(window.location.pathname, new URLSearchParams(newParams), {
        preserveScroll: true,
        preserveState: true,
        replace: true,
    });
};

// Если нужно реагировать на изменения params
watch(urlParams, (newParams) => {
    applyParamsToUrl(newParams);
}, { deep: true });

// Следим за изменением query и синхронизируемся
const handleUrlChange = () => {
    urlParams.value = { ...syncWithUrl() };
};
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
    & > .s-button {
        display: flex;
        align-items: center;
    }
}
</style>
