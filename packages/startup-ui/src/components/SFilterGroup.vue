<template>
    <div class="s-filtergroup">
        <slot />
    </div>
</template>
<script setup>
import { provide, watch, ref, onMounted, onBeforeUnmount } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    bindToGet: Boolean
});

const providedParams = ref({});
const model = defineModel();

/**
 * Получить объект GET-параметров
 */
function syncWithUrl() {
    const paramsObj = new URLSearchParams(window.location.search);
    return Object.fromEntries(paramsObj.entries());
}


// Если включен bindToGet, получаем фильтр из адресной строки
provide('params', providedParams);

onMounted(() => {
    if (props.bindToGet) {
        providedParams.value = { ...syncWithUrl() };
    } else {
        providedParams.value = model.value;
    }
});

// Обновление URL
const applyParamsToUrl = (params) => {
    router.get(window.location.pathname, new URLSearchParams(params), {
        preserveScroll: true,
        preserveState: true,
        replace: true,
    });
};

// Если нужно реагировать на изменения params
watch(providedParams, (newParams) => {
    // Убираем пустые значения и сбрасываем page
    const newFilteredParams = Object.fromEntries(Object.entries(newParams).filter(([key, value]) =>
        !['', null, undefined, false].includes(value) && key !== 'page'
    ));

    if (props.bindToGet) {
        applyParamsToUrl(newFilteredParams);
    }
    
    model.value = { ...newFilteredParams };

}, { deep: true });

// Следим за изменением query и синхронизируемся
const handleUrlChange = () => {
    providedParams.value = { ...syncWithUrl() };
};

if (props.bindToGet) {
    onMounted(() => window.addEventListener('popstate', handleUrlChange));
    onBeforeUnmount(() => window.removeEventListener('popstate', handleUrlChange));
}
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
