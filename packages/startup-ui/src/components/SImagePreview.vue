<template>
    <div class="s-imagepreview" @click.prevent="isFullImgShown=true">
        <slot name="preview">
            <img :src="preview ?? src"/>
        </slot>
        <div class="s-imagepreview-icon">
            <slot name="icon">
                <FontAwesomeIcon icon="magnifying-glass-plus" />
            </slot>
        </div>
        <Teleport to="body" v-if="isFullImgShown">
            <div class="s-imagepreview-fullimg" ref="$window" :style="[style]">
                <img :src="src" />
            </div>
            <div class="s-imagepreview-closeicon" @click="handleCloseImage">
                <FontAwesomeIcon icon="xmark" />
            </div>
            <div class="s-imagepreview-background" @click="handleCloseImage" />
        </Teleport>
    </div>
</template>
<script setup>
import { useTemplateRef, watch, nextTick, ref } from 'vue';
import { useDraggable, useResizeObserver } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
    src: String,
    preview: String,
});

const isFullImgShown = ref(false);
function handleCloseImage() {
    isFullImgShown.value = false;
    modalHeight.value = 0;
}

// Элемент, позиция которого будет вычисляться во время ondrag
const $window = useTemplateRef('$window');

// Загрузилась картинка => изменился размер окна => вычисляем позицию
const modalHeight = ref(0);
useResizeObserver($window, (entries) => {
    const { height } = entries[0].contentRect;
    modalHeight.value = height;
});

const { x, y, style } = useDraggable($window, {
    preventDefault: true,
    stopPropagation: true,
});

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
    nextTick(() => {
        calcaulateDialogPosition();
    });
};
watch(modalHeight, handleNewModelState);
</script>
<style lang="scss">
.s-imagepreview {
    position: relative;
    max-width: 100%;
    cursor: pointer;
    
    &-fullimg {
        position: fixed;
        width: 50vw;
        z-index: 50;
        border-radius: var(--s-border-radius);
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    &-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        font-size: 7em;
        color: var(--s-primary);
        opacity: 0;
        transition: opacity 0.2s ease-in;
        z-index: 1000;
    }

    &:hover &-icon {
        opacity: .3;
        transition: opacity 0.2s ease-in;
    }

    &-background {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
        inset: 0;
        z-index: 10;
        width: 100vw;
        height: 100vh;
    }

    &-closeicon {
        display: flex;
        position: fixed;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        font-size: 20px;
        top: 20px;
        right: 20px;
        z-index: 20;
        background-color: var(--s-white);
        color: var(--s-grey);
        border-radius: 40px;
        cursor: pointer;
    }
}
</style>