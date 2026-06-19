<template>
    <Teleport to="body">
        <div class="s-confirm" v-if="isOpened">
            <div class="s-confirm-dialog" :style="style" ref="$dialog">
                <div class="s-confirm-dialog-header" ref="$header">
                    <h2>{{ dialogData.title }}</h2>
                    <SIconClose @click="isOpened=false"/>
                </div>
                <div class="s-confirm-dialog-body">
                    <p v-html="confirmationText" />
                    <div class="s-confirm-buttons">
                        <SButton outlined @click="handleCancel">{{ dialogData.cancelLabel }}</SButton>
                        <SButton :color="dialogData.variant === 'danger' ? 'red' : undefined" @click="handleAccept">{{ dialogData.acceptLabel }}</SButton>
                    </div>
                </div>
            </div>
            <div class="s-confirm-background" @click="handleCancel"></div>
        </div>
    </Teleport>
</template>
<script setup lang="ts">
import { ref, useTemplateRef, nextTick } from 'vue';
import { useDraggable } from '@vueuse/core'
import { SIconClose } from '../icons';
import SButton from '../SButton.vue';
import { t } from '../../locale';

interface TemplateData {
    title?: string;
    cancelLabel?: string;
    acceptLabel?: string;
    /** Color of the accept button: 'danger' (red, default) for destructive actions, 'primary' for non-destructive ones */
    variant?: 'primary' | 'danger';
    onAccept?: () => void;
    onCancel?: () => void;
}

const isOpened = ref(false);
const confirmationText = ref('');

const dialogData = ref<TemplateData>({});
// The element whose position will be computed during ondrag
const $dialog = useTemplateRef<HTMLElement>('$dialog');
// The element on which the dragstart event will be triggered
const $header = useTemplateRef<HTMLElement>('$header')

const { x, y, style } = useDraggable($dialog, { handle: $header })

function open(msg: string, templateData: TemplateData = {}) {
    confirmationText.value = msg;
    dialogData.value = {
        title: t('confirm.title'),
        cancelLabel: t('confirm.cancel'),
        acceptLabel: t('confirm.accept'),
        variant: 'danger',
        onAccept: () => {},
        onCancel: () => {},
        ...templateData,
    };
    isOpened.value = true;
    // Wait until the DOM is mounted
    nextTick(() => {
        const rect = $dialog.value?.getBoundingClientRect()
        if (!rect) return
        x.value = window.innerWidth / 2 - rect.width / 2
        y.value = window.innerHeight / 2 - rect.height / 2
    });
}

function handleAccept() {
    dialogData.value.onAccept?.();
    dialogData.value = {};
    isOpened.value = false;
}

function handleCancel() {
    dialogData.value.onCancel?.();
    dialogData.value = {};
    isOpened.value = false;
}

defineExpose({ open });
</script>
<style lang="scss">
.s-confirm {
    position: fixed;
    height: 100%;
    width: 100%;
    inset: 0;
    z-index: 9900;
    font-family: var(--s-font-family);

    &-background {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);;
        width: 100vw;
        height: 100%;
        inset: 0;
        z-index: 9990;
    }

    &-dialog {
        display: flex;
        flex-direction: column;
        gap: var(--s-base-padding);
        position: fixed;
        background-color: var(--s-white);
        z-index: 9999;
        border-radius: var(--s-border-radius);
        max-width: calc(min(450px, 100vw));

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
            flex-direction: column;
            gap: var(--s-base-padding);
            padding: var(--s-base-padding);
            padding-top: 0;
            p {
                color: var(--s-border-light);
                margin-bottom: 0;
            }
        }
    }

    &-buttons {
        display: flex;
        gap: 10px;
        justify-content: end;
        align-items: center;

        .s-button {
            min-width: 80px;
            flex-grow: 1;
        }
    }
}
</style>
