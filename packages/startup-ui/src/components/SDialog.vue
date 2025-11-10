<template>
    <template>
        <Teleport to="body" v-if="model">
            <div class="s-dialog">
                <div ref="$window" :style="[{ width: props.width }, style]" class="s-dialog-window">
                    <div class="s-dialog-window-header" ref="$header">
                        <h2>{{ title }}</h2>
                        <FontAwesomeIcon icon="xmark" @click="handleHide" />
                    </div>
                    <div class="s-dialog-window-body">
                        <slot />
                    </div>
                </div>
                <div v-if="!notModal" class="s-dialog-background" @click="handleOverlayClick"></div>
            </div>
        </Teleport>
    </template>
</template>
<script setup>
import { useTemplateRef, watch, nextTick, onBeforeMount } from 'vue';
import { useDraggable } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
    title: String,
    width: String,
    notModal: Boolean
});
const emit = defineEmits(['overlay-click', 'hide']);

const model = defineModel();
// Элемент, позиция которого будет вычисляться во время ondrag
const $window = useTemplateRef('$window');
// Элемент, на котором будет тригериться событие dragstart
const $header = useTemplateRef('$header');

const { x, y, style } = useDraggable($window, { handle: $header });

const calcaulateDialogPosition = () => {
    const rect = $window.value?.getBoundingClientRect()
    if (!rect) return
    x.value = document.documentElement.clientWidth / 2 - rect.width / 2;
    y.value = document.documentElement.clientHeight / 2 - rect.height / 2;
}

const handleNewModelState = function(newValue){
    if (!newValue) {
        window.removeEventListener('resize', calcaulateDialogPosition);
        return;
    }
    window.addEventListener('resize', calcaulateDialogPosition);
    calcaulateDialogPosition();
    nextTick(() => {
        calcaulateDialogPosition();
    });
};

onBeforeMount(() => handleNewModelState(model.value));
watch(model, handleNewModelState);

function handleOverlayClick() {
    const handled = emit('overlay-click');
    // Если никто не обработал событие, закрываем диалог
    if (!handled) handleHide();
}

function handleHide() {
    model.value = false;
    emit('hide');
}
</script>
<style lang="scss">
.s-dialog {
    position: fixed;
    width: fit-content;
    height: fit-content;
    inset: 0;
    z-index: 10;
    font-family: var(--s-font-family);
    
    &-window {
        display: flex;
        flex-direction: column;
        gap: var(--s-base-padding);
        position: fixed;
        background-color: var(--s-white);
        z-index: 11;
        border: 1px solid var(--s-border);
        border-radius: var(--s-border-radius);
        max-width: 100%;

        &-header {
            display: flex;
            justify-content: space-between;
            user-select: none;
            padding: var(--s-base-padding);
            padding-bottom: 0;

            h2 {
                line-height: 1;
                margin-bottom: 0;
                font-size: 18px;
            }

            svg {
                cursor: pointer;
            }
        }

        &-body {
            display: flex;
            width: 100%;
            box-sizing: border-box;
            flex-direction: column;
            padding: var(--s-base-padding);
            padding-top: 0;
            max-height: 80vh;
            overflow-y: auto;
            img {
                max-width: 100%;
                height: auto;
                display: block;
            }
        }
    }

    &-background {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);;
        width: 100vw;
        height: 100vh;
        inset: 0;
        z-index: 10;
    }
}
</style>