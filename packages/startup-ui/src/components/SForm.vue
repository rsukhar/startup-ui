<template>
    <form class="s-form" :class="{'titles_at_left': titlesAtLeft, loading: isLoading || loading}"
          @submit.prevent="handleSubmit">
        <slot />
    </form>
</template>
<script setup lang="ts">
import { ref, provide, watch, computed, getCurrentInstance } from 'vue'
import { getStartupUiRouter } from '../config';

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
        return;
    }
    if (!props.action) return;

    const router = getStartupUiRouter();
    if (router?.visit) {
        // A router was registered (e.g. Inertia via app.use(StartupUI, { router })) — submit via it
        isLoading.value = true;
        router.visit(props.action, {
            method: (props.method as any) ?? 'post',
            data: model.value,
            preserveScroll: true,
            preserveState: true,
            onError: (response: any) => localErrors.value = formatErrors(response),
            onFinish: () => isLoading.value = false
        });
    } else {
        // No router registered — declarative submit isn't possible (the data lives in the JS model,
        // not native form fields). Use the @submit event to handle submission without a router.
        console.warn('[StartupUI] SForm: submit via `action`/`method` requires a registered router (app.use(StartupUI, { router })) or an @submit handler.');
    }
}

/**
 * Normalizes error keys, ensuring values without nested indexes
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
provide('titlesWidth', props.titlesWidth);
provide('titlesAtLeft', props.titlesAtLeft);
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

@keyframes button-spinner {
    to {
        transform: rotate(360deg);
    }
}
</style>
