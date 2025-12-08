<template>
    <div class="s-tooltip">
        <div ref="$icon" @mouseenter="maybeShow" @touchstart="maybeShow">
            <slot name="icon">
                <FontAwesomeIcon :icon="icon" class="s-tooltip-icon"/>
            </slot>
            <div class="s-tooltip-hoverarea"></div>
        </div>
        <Teleport to="body" v-if="isShown">
            <div class="s-tooltip-container" :style="positionStyle">
                <div class="s-tooltip-text" ref="$tooltip" :class="[positionClass]">
                    <slot />
                </div>
            </div>
        </Teleport>
    </div>
</template>
<script setup>
import { ref, useTemplateRef, nextTick } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    at: {
        type: String,
        // Положение подсказки определяется автоматически
        default: null,
        validator: (value) => ['top', 'bottom', 'right', 'left'].includes(value)
    },
    icon: {
        type: [String, Array],
        default: 'circle-question',
    },
})

const isShown = ref(false);
const $tooltip = useTemplateRef('$tooltip');
const $icon = useTemplateRef('$icon');
const positionStyle = ref({});
const positionClass = ref(null);

function maybeShow() {
    if (isShown.value) return;
    isShown.value = true;
    nextTick(() => calculatePosition());
    document.addEventListener('mousemove', onBodyMove);
    document.addEventListener('touchstart', onBodyMove);
}

function hide(){
    document.removeEventListener('mousemove', onBodyMove);
    document.removeEventListener('touchstart', onBodyMove);
    isShown.value = false;
}

function onBodyMove(event) {
    if (!$icon.value.contains(event.target) && !$tooltip.value.contains(event.target)) {
        hide();
    }
}

function calculatePosition() {
    const iconRect = $icon.value.getBoundingClientRect();
    const tooltipRect = $tooltip.value.getBoundingClientRect();
    const tooltipPositions = {
        top: () => ({
            top: `${iconRect.top - tooltipRect.height + window.scrollY - 5}px`,
            left: `${(iconRect.left) + (iconRect.width / 2) - tooltipRect.width / 2}px`
        }),
        right: () => ({
            top: `${iconRect.top + iconRect.height / 2 + window.scrollY}px`,
            transform: 'translateY(-50%)',
            left: `${iconRect.right + 8}px`
        }),
        bottom: () => ({
            top: `${iconRect.bottom + window.scrollY + 5}px`,
            left: `${(iconRect.left) + (iconRect.width / 2) - tooltipRect.width / 2}px`
        }),
        left: () => ({
            top: `${iconRect.top + iconRect.height / 2 + window.scrollY}px`,
            transform: 'translateY(-50%)',
            left: `${iconRect.left - tooltipRect.width - 8}px` 
        })
    };

    if (props.at) {
        positionStyle.value = tooltipPositions[props.at]();
        positionClass.value = props.at;
        return;
    }

    const isEnoughPlaceAround = ((window.innerWidth - iconRect.right) > tooltipRect.width / 2) && (iconRect.left > tooltipRect.width / 2);
    // Автоматический рассчет позиции подскази
    // Снизу (есть место снизу и width/2 слева и справа)
    if (((window.innerHeight - iconRect.top) > tooltipRect.height + 10) && isEnoughPlaceAround) {
        positionStyle.value = tooltipPositions.bottom();
        positionClass.value = 'bottom';
    } else if ((iconRect.top > tooltipRect.height + 10) && isEnoughPlaceAround) {
        // Сверху (есть место сверху и width/2 слева и справа)
        positionStyle.value = tooltipPositions.top();
        positionClass.value = 'top';
    } else if ((window.innerWidth - iconRect.right) > (tooltipRect.width + 10)) {
        // Справа
        positionStyle.value = tooltipPositions.right();
        positionClass.value = 'right';
    } else if (iconRect.left > (tooltipRect.width + 10)) {
        // Слева
        positionStyle.value = tooltipPositions.left();
        positionClass.value = 'left';
    } else {
        positionStyle.value = tooltipPositions.bottom();
        positionClass.value = 'bottom';
    }
}
</script>
<style lang="scss">
:root {
    --s-tooltip-background: rgba(26, 49, 88, 0.9);
}
.s-tooltip {
    display: inline-block;
    position: relative;
    font-family: var(--s-font-family);
    &:not(:first-child) {
        margin-left: 10px;
    }
    
    svg.s-tooltip-icon {
        font-size: 12px;
        color: var(--s-primary);
        cursor: help;
    }

    &-container {
        position: absolute;
        max-width: 300px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    &-text {
        position: relative;
        font-size: 12px;
        font-weight: 100;
        padding: 6px 10px;
        color: var(--s-white);
        border-radius: var(--s-border-radius);
        background-color: var(--s-tooltip-background);
        text-align: start;
        font-family: var(--s-font-family);
        
        a {
            color: var(--s-primary-lightest);
        }

        /* Позиционирование хвостика подсказки */
        &::before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            transform-origin: 50% 50%;
            z-index: -1;
        }

        /* Позиционирование невидимой hover-области */
        &::after {
            content: "";
            position: absolute;
            transform-origin: 50% 50%;
            border-left: inherit;
            border-top: inherit;
            z-index: 9999;
        }

        p,
        ol,
        ul,
        li {
            margin-bottom: 5px;
        }
        & > *:last-child {
            margin-bottom: 0;
        }

        // Подсказка снизу, стрелка наверх
        &.bottom {
            &:before {
                top: -6px;
                left: 50%;
                transform: translateX(-50%);
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 6px solid var(--s-tooltip-background);
            }
            &:after {
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: calc(min(30%, 50px));
                height: 20px;
            }
        }

        // Подсказка справа, стрелка слева
        &.right {
            &:before {
                left: -6px;
                top: 50%;
                transform: translateY(-50%);
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-right: 6px solid var(--s-tooltip-background);
            }
            &:after {
                left: -20px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: calc(min(30%, 50px));
            }
        }

        // Подсказка сверху, стрелка снизу
        &.top {
            &:before {
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid var(--s-tooltip-background);
            }
            &:after {
                bottom: -20px;
                left: 50%;
                transform: translate(-50%);
                width: calc(min(30%, 50px));
                height: 20px;
            }
        }

        // Подсказка слева, стрелка справа
        &.left {
            &:before {
                right: -6px;
                top: 50%;
                transform: translateY(-50%);
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 6px solid var(--s-tooltip-background);
            }
            &:after {
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: calc(min(30%, 50px));
            }
        }

    }
}
</style>