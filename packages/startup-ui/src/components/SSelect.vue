<template>
    <div class="s-select" :class="[{disabled, inline}]" ref="selectRef">
        <div class="s-select-field" :class="{selecting: areOptionsShown}" @click="showOptions">
            <input v-model="textFilter" v-if="filterable" class="s-select-field-filter" :placeholder="selectLabel" />
            <div v-else class="s-select-field-label">
                <slot v-if="$slots.value && modelValue" name="value" :value="modelValue" />
                <template v-else>{{ selectLabel }}</template>
            </div>
            <div v-if="clearable && model" class="s-select-clear" @click.stop.prevent="handleClear">
                <FontAwesomeIcon icon="xmark" />
            </div>
            <div class="s-select-dropdown" :class="{rotated: areOptionsShown}">
                <FontAwesomeIcon class="s-select-dropdown-chevron" icon="chevron-down" />
            </div>
        </div>
        <Teleport to="body">
            <div ref="dropdownRef" :style="optionsStyles" 
                :class="['s-select-stylewrapper', attrs.class, areOptionsShown ? 'open' : 'closed']">
                <div :class="['s-select-options', openDirection]"
                    @scroll="handleScroll">
                    <ul v-if="$slots.option" class="s-select-options-list" :style="{height: totalHeight}">
                        <li v-for="[value, label] in visibleOptions" :key="value" @click.stop="selectOption(value)"
                            :class="{selected: value === model || !(value || model)}" class="s-select-options-item">
                            <slot name="option" :option="{label, value}" />
                        </li>
                    </ul>
                    <template v-else-if="visibleOptions.length">
                        <div v-if="virtual"
                            :style="{ maxHeight: itemHeight * virtualScrollSize - 20 + 'px', position: 'relative' }"
                            @scroll="handleScroll" class="s-select-scroll-container" ref="scrollContainer">
                            <div :style="{ height: totalHeight }"></div>
                            <div v-for="([value, label], index) in visibleOptions" :key="value"
                                :style="{
                                    position: 'absolute',
                                    top: (itemHeight * (startIndex + index)) + 'px',
                                    left: 0,
                                    height: itemHeight + 'px'
                                }"
                                class="s-select-options-item"
                                :class="{ selected: value == model }"
                                @click.stop="selectOption(value)"
                            >
                                <slot v-if="$slots.option" name="option" :option="{label, value}" />
                                <template v-else>{{ label }}</template>
                            </div>
                        </div>
                        <ul v-else class="s-select-options-list">
                            <li v-for="[value, label] in visibleOptions" :key="value" @click.stop="selectOption(value)"
                                :class="{selected: value === model || !(value || model)}" class="s-select-options-item">
                                {{ label }}
                            </li>
                        </ul>
                    </template>
                    <div v-else class="s-select-options-nodata">Нет данных</div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { templateRef } from '@vueuse/core';
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, useAttrs } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export interface SSelectProps {
    // В формате {value1: title1, value2: title2, ...} или [[value1, title1], [value2, title2], ...]
    options: Record<string | number, any> | any[];
    placeholder?: string;
    filterable?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    inline?: boolean;
    virtual?: boolean;
    virtualScrollSize?: number;
}

const props = withDefaults(defineProps<SSelectProps>(), {
    virtual: false,
    virtualScrollSize: 10,
});

const emits = defineEmits<{
    (e: 'change', value: any): void;
    (e: 'filter', value: string): void;
}>();

const model = defineModel<any>();
const $selectRef = templateRef<HTMLElement>('selectRef');

const attrs = useAttrs();

const toInternalOptions = (propValue: any): [any, any][] => (propValue instanceof Array) ? JSON.parse(JSON.stringify(propValue)) : Object.entries(propValue);
const internalOptions = ref<[any, any][]>(toInternalOptions(props.options ?? {}));
watch(() => props.options, (newOptions) => {
    internalOptions.value = toInternalOptions(newOptions ?? {})
}, { deep: true });

const itemHeight = ref(35); // высота одной опции в px
const startIndex = ref(0);
const totalHeight = computed(() => `${internalOptions.value.length * itemHeight.value}px`);

const visibleOptions = computed(() => {
    if (internalOptions.value.length === 0) {
        return [];
    }

    if (props.virtual) {
        return internalOptions.value.slice(startIndex.value, startIndex.value + props.virtualScrollSize);
    }
    return internalOptions.value;
});

const areOptionsShown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const openDirection = ref<string | null>(null);
const textFilter = ref<string>('');

const selectLabel = computed(() => {
    if (model.value === null || model.value === undefined) {
        return props.placeholder;
    }
    const option = internalOptions.value.find(([value, _]) => value == model.value);
    return option === undefined ? props.placeholder : option[1];
});

/**
 * Обработка виртуального скролла
 */
function handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    startIndex.value = Math.floor(scrollTop / itemHeight.value);
}

watch(textFilter, (newTextFilter) => {
    filterOptions();
    emits('filter', newTextFilter);
});

/**
 * Отфильтровать опции
 */
function filterOptions() {
    if (textFilter.value == '') {
        internalOptions.value = toInternalOptions(props.options);
        return;
    }

    internalOptions.value = toInternalOptions(props.options).filter(([_, label]) => {
        return String(label).toLowerCase().includes(textFilter.value.toLowerCase())
    });
}

function handleClickOutside(event: MouseEvent) {
    if ($selectRef.value && !$selectRef.value.contains(event.target as Node)) {
        areOptionsShown.value = false;
    }
}

function selectOption(optionValue: any) {
    textFilter.value = ''
    model.value = optionValue;
    emits('change', optionValue);
    areOptionsShown.value = false;
}

/**
 * Определить направление раскрытия выпадающего списка
 *
 * @param rect Объект с координатами прямоугольника
 */
function determineListDirection(rect: DOMRect) {
    const minOffset = Math.max(20, Math.min(6, internalOptions.value.length) * itemHeight.value);
    const listHeight = (dropdownRef.value?.offsetHeight ?? 0) + minOffset;
    const spaceBelow = document.documentElement.clientHeight - rect.bottom;

    if (spaceBelow >= listHeight) {
        // Снизу умещается
        return 'drop-down';
    } else {
        // Снизу не умещается
        if (rect.top > listHeight) {
            // Сверху умещается
            return 'drop-up';
        } else {
            // Сверху тоже не умещается, размещаем там, где больше места
            return (rect.top > spaceBelow) ? 'drop-up' : 'drop-down';
        }
    }
}

const optionsStyles = ref<Record<string, string | number>>({});

// Найти предка с position:fixed
function hasFixedParent() {
    if (!$selectRef.value) return false;
    let parent = $selectRef.value.parentElement;

    while (parent) {
        if (getComputedStyle(parent).position === 'fixed') {
            return true;
        }
        parent = parent.parentElement;
    }

    return false;
}

function updateOptionsPosition() {
    if (!$selectRef.value) return;
    const rect = $selectRef.value.getBoundingClientRect();
    openDirection.value = determineListDirection(rect);

    const fixedPosition = hasFixedParent();
    if ($selectRef.value) {
        optionsStyles.value = {
            // Если есть предок с position:fixed, то ставим fixed, иначе absolute
            position: fixedPosition ? 'fixed' : 'absolute',
            left: `${rect.left + window.scrollX}px`,
            zIndex: 9999,
            width: `${rect.width}px`,
        };

        if (openDirection.value === 'drop-up') {
            // Для drop-up
            optionsStyles.value['bottom'] = `${document.documentElement.clientHeight - rect.top - (fixedPosition ? 0 : window.scrollY)}px`;
        } else {
            // Для drop-down
            optionsStyles.value['top'] = `${rect.bottom + (fixedPosition ? 0 : window.scrollY)}px`;
        }
    }
}

watch(areOptionsShown, (shown) => {
    if (shown) {
        updateOptionsPosition();
    }
});

function showOptions() {
    areOptionsShown.value = !areOptionsShown.value;
}

function handleClear() {
    model.value = null;
    emits('change', null);
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    nextTick(() => {
        if ($selectRef.value) {
            const rect = $selectRef.value.getBoundingClientRect();
            openDirection.value = determineListDirection(rect);
        }
    })
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
<style lang="scss">
.s-select {
    position: relative;
    display: flex;
    gap: 5px;
    align-items: center;
    color: var(--s-text);
    border: 1px solid var(--s-border);
    border-radius: var(--s-border-radius);
    background-color: var(--s-white);
    cursor: pointer;
    font-family: var(--s-font-family);

    &.disabled {
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.5;
    }

    &-field {
        display: flex;
        padding: 6px 3px 6px 10px;
        width: 100%;

        .selecting > &-filter {
            &::placeholder {
                color: var(--s-text-light);
            }
        }

        &-filter {
            color: inherit;
            border: none;
            outline: none;
            cursor: text;
            border-radius: var(--s-border-radius);
            flex-grow: 1;

            &::placeholder {
                color: var(--s-text);
            }
        }

        &-label {
            user-select: auto;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    &-dropdown {
        display: flex;
        width: 30px;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        transition: transform 0.3s ease;

        &-chevron {
            pointer-events: none;
        }

        &.rotated {
            transform: rotate(-180deg);
        }
    }

    &-clear {
        cursor: pointer;
        font-weight: 300;
        width: 30px;
        text-align: center;

        &:hover {
            color: var(--s-primary);
        }
    }

    // Обертка для кастомного класса
    &-stylewrapper {
        position: absolute;

        &.open {
            overflow-y: auto;
            overflow-x: hidden;
            height: fit-content;
            transform: translateY(0);

            & .s-select-options {
                opacity: 1;
                max-height: 200px;
                pointer-events: auto;

                &.drop-down {
                    top: 100%;
                }

                &.drop-up {
                    bottom: 100%;
                }
            }
        }

        &.closed {
            max-height: 0 !important;

            & .s-select-options {
                max-height: 0 !important;
            }
        }
    }

    &-options {
        max-height: 0;
        border: 1px solid var(--s-border);
        gap: 10px;
        left: 0;
        right: 0;
        padding: 0.25rem 0.25rem;
        background-color: var(--s-white);
        margin-block: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: var(--s-border-radius);
        overflow-y: auto;
        opacity: 0;
        user-select: none;
        z-index: 1001;
        pointer-events: none;
        
        &-nodata {
            padding: 0.25rem 0.25rem;
            color: var(--s-text-light);
        }

        &-list {
            display: flex;
            flex-direction: column;
            gap: 2px;
            list-style-type: none;
            margin: 0;
            padding: 0;
            cursor: pointer;
            width: 100%;
        }

        &-item {
            box-sizing: border-box;
            margin: 0;
            padding: 0.5rem 0.75rem;
            border-radius: var(--s-border-radius);
            white-space: nowrap;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;

            &:hover {
                background-color: var(--s-gray);
            }

            &.selected {
                color: var(--s-primary);
                background-color: var(--s-primary-lightest);
            }
        }
    }

    &-scroll-container {
        cursor: pointer;
    }

    @include mobile() {
        flex-grow: 1;
    }

    &.inline {
        border: 0;

        .s-select-field {
            padding: 0;
        }

        .s-select-options {
            left: auto;
            right: 0;
            width: fit-content;
        }

        .s-select-options-list {
            width: auto;
            margin-right: 0;
        }

        .s-select-options-item {
            overflow: visible;
        }
    }
}
</style>
