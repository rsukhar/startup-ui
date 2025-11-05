<template>
    <form class="s-form" :class="{'titles_at_left': titlesAtLeft, loading: isLoading || loading}"
          @submit.prevent="handleSubmit">
        <slot />
    </form>
</template>
<script setup>
import { router } from '@inertiajs/vue3';
import { ref, provide, watch, computed, getCurrentInstance } from 'vue'

const props = defineProps({
    method: {
        type: String,
        default: 'post',
    },
    action: String,
    titlesAtLeft: Boolean,
    loading: Boolean,
    titlesWidth: {
        type: [Number, String],
        default: 220
    },
    errors: {
        type: Object,
        required: false
    }
})
const emit = defineEmits(['submit', 'update:modelValue']);
const instance = getCurrentInstance();
const hasSubmitListener = computed(() =>
  !!instance?.vnode.props?.onSubmit
)

const model = defineModel();
const localErrors = ref({ ...props.errors })
watch(
  () => props.errors,
  (newErrors) => {
    localErrors.value = { ...newErrors }
  }
)

const isLoading = ref(props.loading);
function handleSubmit(event) {
    if (hasSubmitListener.value) {
        emit('submit', event);
    } else {
        isLoading.value = true;
        router.visit(props.action, {
            method: props.method ?? 'post',
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
const formatErrors = function(errors){
    const result = JSON.parse(JSON.stringify(errors));
    Object.keys(result).forEach(key => {
        if (key.includes('.') && !result[key.split('.')[0]]) result[key.split('.')[0]] = result[key];
    });
    return result;
}

provide('formModel', model.value);
provide('formErrors', localErrors);
provide('titlesWidth', props.titlesWidth)
</script>
<style lang="scss">
.s-form {
    display: flex;
    flex-direction: column;
    gap: var(--s-base-margin);
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
