<template>
    <teleport to="body">
        <Transition name="fade">
            <div class="s-alert" :class="[alertClass]" v-html="alertText" v-if="isShown" @click="isShown = false"></div>
        </Transition>
    </teleport>
</template>
<script setup>
import { ref } from 'vue';

const alertText = ref(null);
const isShown = ref(false);
const alertClass = ref('type_info');

let timeoutId;

const open = (text, options = {}) => {
    alertText.value = text;
    isShown.value = true;
    if (options.type) {
        alertClass.value = 'type_' + options.type;
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        isShown.value = false;
    }, options.closeAfter ?? 3000);
}

const success = (text, options) => open(text, {...options, type: 'success'});
const info = (text, options) => open(text, {...options, type: 'info'});
const error = (text, options) => open(text, {...options, type: 'error'});

defineExpose({ success, info, error, open });
</script>
<style lang="scss">
.s-alert {
    position: fixed;
    top: 30px;
    left: 50%;
    width: 350px;
    background-color: var(--s-bg);
    color: var(--s-black);
    padding: calc(var(--s-base-padding) * 0.6) var(--s-base-padding);
    z-index: 9999;
    transform: translateX(-50%);
    border-radius: var(--s-border-radius);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    cursor: pointer;
    font-family: var(--s-font-family);

    &.type_success {
        color: var(--s-green-dark);
        background-color: var(--s-green-lightest);
    }

    &.type_info {
        color: var(--s-primary-dark);
        background-color: var(--s-primary-lightest);
    }

    &.type_error {
        color: var(--s-red-dark);
        background-color: var(--s-red-lightest);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease, translate 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    translate: 0 20px;
}
</style>
