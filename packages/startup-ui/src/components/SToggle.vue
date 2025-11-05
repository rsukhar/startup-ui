<template>
    <div class="s-toggle" :class="[{ opened: isOpened }, color]">
        <div class="s-toggle-title" @click="handleClick">
            <slot name="title">{{ title }}</slot>
            <FontAwesomeIcon :icon="isOpened ?  'chevron-up' : 'chevron-down'" />
        </div>

        <div class="s-toggle-body">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, getCurrentInstance, watch, onMounted, PropType } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const props = defineProps({
    title: String,
    opened: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String as PropType<'primary' | 'red' | 'green'>,
        default: 'bg',
    },
})

const { uid } = getCurrentInstance()
const isOpened = ref(!!props.opened)
const openedItem = inject('openedItem', null);
const isMultiple = inject('isMultiple', ref(false));

function handleClick() {
    if (!isMultiple.value && openedItem) {
        if (openedItem.value === uid) {
            isOpened.value = false;
            openedItem.value = null;
            return;
        }
        
        openedItem.value = uid;
    }

    isOpened.value = !isOpened.value
}

onMounted(() => {
    if (props.opened && openedItem) {
        openedItem.value = uid;
    }
});

// Запускаем watcher только если inject найден
if (openedItem) {
    watch(openedItem, (newVal, oldVal) => {
        isOpened.value = (newVal === uid) && (newVal !== oldVal)
    })
}
</script>
<style lang="scss">
.s-toggle {
    border-radius: var(--s-border-radius);

    &-title {
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: var(--s-border-radius);
        font-weight: bold;
        user-select: none;
        &:hover {
            color: var(--s-primary);
        }

        svg {
            margin-left: auto;
            font-size: 16px;
        }
    }

    &-body {
        display: none;
        padding: 1rem 1.5rem;

        > *:last-child {
            margin-bottom: 0;
        }
    }

    &.opened &-body {
        display: block;
    }

    &.bg {
        background-color: var(--s-bg);
    }

    &.primary {
        background-color: var(--s-primary-lightest);
    }

    &.green {
        background-color: var(--s-green-lightest);
    }

    &.red {
        background-color: var(--s-red-lightest);
    }
}
</style>