<template>
    <form class="s-form" :class="{'titles_at_left': titlesAtLeft, loading: isLoading || loading}"
          @submit.prevent="handleSubmit">
        <slot />
    </form>
</template>
<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref, provide, watch, computed, getCurrentInstance } from 'vue'

export interface SFormProps {
    method?: string;
    action?: string;
    titlesAtLeft?: boolean;
    loading?: boolean;
    titlesWidth?: number | string;
    errors?: Record<string, any>;
}

const props = withDefaults(defineProps<SFormProps>(), {
    method: 'post',
    titlesAtLeft: false,
    loading: false,
    titlesWidth: 220,
    errors: () => ({})
})

const emit = defineEmits<{
    (e: 'submit', event: Event): void;
    (e: 'update:modelValue', value: any): void;
}>();

const instance = getCurrentInstance();
const hasSubmitListener = computed(() =>
    !!instance?.vnode.props?.onSubmit
)

const model = defineModel<Record<string, any>>();
const localErrors = ref<Record<string, any>>({ ...props.errors })

watch(
    () => props.errors,
    (newErrors) => {
        localErrors.value = { ...newErrors }
    },
    { deep: true }
)

const isLoading = ref(props.loading);

function handleSubmit(event: Event) {
    if (hasSubmitListener.value) {
        emit('submit', event);
    } else if (props.action) {
        isLoading.value = true;
        router.visit(props.action, {
            method: (props.method as any) ?? 'post',
            data: model.value,
            preserveScroll: true,
            preserveState: true,
            onError: response => localErrors.value = formatErrors(response),
            onFinish: () => isLoading.value = false
        });
    }
}

/**
 * Приводит ключи ошибок в порядок, обеспечивая значения без вложенных индексов
 */
const formatErrors = function(errors: Record<string, any>) {
    const result = JSON.parse(JSON.stringify(errors));
    Object.keys(result).forEach(key => {
        const rootKey = key.split('.')[0];
        if (rootKey && key.includes('.') && !result[rootKey]) {
            result[rootKey] = result[key];
        }
    });
    return result;
}

provide('formModel', model.value);
provide('formErrors', localErrors);
provide('titlesWidth', computed(() => props.titlesWidth));
</script>
<style lang="scss">
.s-form {
    display: flex;
    flex-direction: column;
    gap: var(--s-base-margin);
    font-family: var(--s-font-family);
    &:not(.titles_left) {
        margin: auto;
        width: 100%;
        .s-horselect {
            width: 100%;
        }
    }
    &.centered {
        max-width: 700px;
        margin: 0 auto;
    }
    &.loading {
        .s-button {
            position: relative;
            pointer-events: none;
            opacity: 0.5;
            color: var(--s-white);
            &::after {
                content: "";
                position: absolute;
                width: 16px;
                height: 16px;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                border: 4px solid transparent;
                border-top-color: #ffffff;
                border-radius: 50%;
                animation: button-spinner 1s ease infinite;
            }
        }
    }
}
</style>
