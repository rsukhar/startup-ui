<template>
    <template>
        <Teleport to="body" v-if="model">
            <div ref="$root" class="s-dialog" @mousedown.capture="handleRootMousedown">
                <div ref="$window" :style="[{ width: props.width }, style]" class="s-dialog-window" :class="{ 'fixed-footer': fixedFooter }">
                    <div class="s-dialog-window-header" ref="$header">
                        <slot name="header"><h2>{{ title }}</h2></slot>
                        <SIconClose @click="handleHide" />
                    </div>
                    <div class="s-dialog-window-body">
                        <slot />
                        <!-- Default: footer flows with the body content (scrolls together). -->
                        <div v-if="$slots.footer && !fixedFooter" class="s-dialog-window-footer">
                            <slot name="footer" />
                        </div>
                    </div>
                    <!-- Fixed: footer is pinned outside the scroll area (only the body scrolls). -->
                    <div v-if="$slots.footer && fixedFooter" class="s-dialog-window-footer">
                        <slot name="footer" />
                    </div>
                </div>
                <div v-if="!notModal" class="s-dialog-background" @click="handleOverlayClick"></div>
            </div>
        </Teleport>
    </template>
</template>
<script lang="ts">
// Shared across ALL SDialog instances (module scope — evaluated once, not per instance): the
// highest z-index currently handed out to a raised dialog. 1000 matches the base `.s-dialog`
// z-index in the stylesheet below.
let topZIndex = 1000;
</script>
<script setup lang="ts">
import { useTemplateRef, watch, nextTick, onBeforeMount } from 'vue';
import { useDraggable, useResizeObserver } from '@vueuse/core';
import { SIconClose } from './icons';

export interface SDialogProps {
    title?: string;
    width?: string;
    notModal?: boolean;
    /**
     * Pin the footer outside the scroll area: the header and footer stay put and only the body
     * scrolls. Without it, the footer scrolls together with the body content.
     */
    fixedFooter?: boolean;
}

const props = defineProps<SDialogProps>();

const emit = defineEmits<{
    (e: 'overlay-click'): void;
    (e: 'hide'): void;
}>();

const model = defineModel<boolean>();
// Element whose position will be calculated during ondrag
const $window = useTemplateRef<HTMLElement>('$window');
// Element on which the dragstart event will be triggered
const $header = useTemplateRef<HTMLElement>('$header');
// Teleport root (.s-dialog) — the element whose z-index we bump to restack windows
const $root = useTemplateRef<HTMLElement>('$root');

const { x, y, style } = useDraggable($window, { handle: $header });

useResizeObserver($window, () => { calcaulateDialogPosition() });

const calcaulateDialogPosition = () => {
    const rect = $window.value?.getBoundingClientRect()
    if (!rect) return
    x.value = document.documentElement.clientWidth / 2 - rect.width / 2;
    y.value = document.documentElement.clientHeight / 2 - rect.height / 2;
}

const handleNewModelState = function(newValue?: boolean){
    if (!newValue) {
        window.removeEventListener('resize', calcaulateDialogPosition);
        return;
    }
    window.addEventListener('resize', calcaulateDialogPosition);
    calcaulateDialogPosition();
    nextTick(() => {
        calcaulateDialogPosition();
        // A freshly opened modal must sit above any non-modal dialogs raised earlier — otherwise a
        // raised non-modal (higher z-index) would cover the modal and its backdrop.
        if (!props.notModal) bringToFront();
    });
};

onBeforeMount(() => handleNewModelState(model.value));
watch(model, handleNewModelState);

function handleOverlayClick() {
    emit('overlay-click');
    //If no one handled the event, close the dialog
    handleHide();
}

function handleHide() {
    model.value = false;
    emit('hide');
}

// Raise this dialog above the others by bumping the shared counter. The z-index lives on the
// teleport root `.s-dialog` (its own stacking context), NOT on `.s-dialog-window`.
function bringToFront() {
    const root = $root.value;
    if (!root) return;
    const current = Number(root.style.zIndex) || 0;
    // Already the top-most dialog — skip so the shared counter doesn't grow on every click.
    if (current === topZIndex) return;
    topZIndex += 1;
    root.style.zIndex = String(topZIndex);
}

// A mousedown anywhere in a non-modal window raises it above the others. Runs in the capture
// phase (before content handlers), with no preventDefault/stopPropagation, so clicks on content
// (links, the close ✕) keep working. Modal dialogs block everything beneath them, so they aren't
// restacked on click.
function handleRootMousedown() {
    if (!props.notModal) return;
    bringToFront();
}
</script>
<style lang="scss">
.s-dialog {
    position: fixed;
    width: fit-content;
    height: fit-content;
    inset: 0;
    z-index: 1000;
    font-family: var(--s-font-family);
    
    &-window {
        display: flex;
        flex-direction: column;
        gap: var(--s-base-padding);
        position: fixed;
        background-color: var(--s-white);
        z-index: 1001;
        border: 1px solid var(--s-border);
        border-radius: var(--s-border-radius);
        max-width: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        &-header {
            display: flex;
            flex: none;
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

        &-footer {
            display: flex;
            flex: none;
            justify-content: flex-end;
            gap: var(--s-base-padding);
        }
        // Default: the footer flows inside the scrollable body — space it from the content above.
        &-body > &-footer {
            margin-top: var(--s-base-padding);
        }

        // Fixed footer: cap the window to the viewport so the header and footer stay put and only
        // the body scrolls between them.
        &.fixed-footer {
            max-height: 90vh;

            .s-dialog-window-body {
                max-height: none;
                flex: 1 1 auto;
                min-height: 0;
                // The footer's border-top is the divider; drop the body's bottom padding so the
                // space above the line matches the padding below it.
                padding-bottom: 0;
            }
            .s-dialog-window-footer {
                // Now a direct child of the window, so it needs its own horizontal padding.
                padding: var(--s-base-padding);
                // Divider between the scrolling body and the pinned footer.
                border-top: 1px solid var(--s-border);
            }
        }
    }

    &-background {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);;
        width: 100vw;
        height: 100vh;
        inset: 0;
        z-index: 999;
    }
}
</style>