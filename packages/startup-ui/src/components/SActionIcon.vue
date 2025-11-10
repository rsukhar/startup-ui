<template>
    <component :is="componentType" class="s-actionicon" @click="handleClick" :class="{danger}">
        <FontAwesomeIcon :icon="icon" />
    </component>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SConfirm } from './SConfirm'
import { computed, useAttrs } from "vue";
const props = defineProps({
    icon: {
        type: [String, Array],
        required: true,
    },
    danger: Boolean,
    confirm: String,
    confirmTitle: {
        type: String,
        default: 'Необходимо подтверждение',
    },
    // Строка для тега, объект/функция для компонента
    is: [String, Object, Function],
});

const emit = defineEmits(['click']);
const attrs = useAttrs();

const componentType = computed(() => {
    // Элемент задан явно, используем его
    if (props.is) return props.is;
    // Нативный анкор
    if (attrs.href) return 'a';
    return 'div';
});

function handleClick() {
    if (props.confirm) {
        SConfirm.open(props.confirm, {
            title: props.confirmTitle,
            onAccept: () => emit('click'),
        });
    } else {
        emit('click');
    }
}
</script>
<style lang="scss">
.s-actionicon {
    display: inline-block;
    width: 30px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    color: var(--s-primary);
    font-family: var(--s-font-family);
    
    svg {
        margin-left: 0;
        margin-right: 0 !important;
    }
    & + & {
        margin-left: calc(var(--s-base-margin) / 3);
    }
    &:hover {
        color: var(--s-primary-darkest);
    }
    &.danger {
        color: var(--s-red);
        &:hover {
            color: var(--s-red-dark);
        }
    }
}
</style>