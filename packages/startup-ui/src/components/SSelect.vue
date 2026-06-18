<template>
    <div class="s-select" :class="[{disabled, inline}]" ref="selectRef" @keydown="handleKeydown">
        <div class="s-select-field" ref="fieldRef" :class="{selecting: areOptionsShown}" :tabindex="!filterable && !disabled ? 0 : undefined" @click="showOptions">
            <input v-model="textFilter" v-if="filterable" class="s-select-field-filter" :placeholder="selectLabel" />
            <div v-else class="s-select-field-label">
                <slot v-if="$slots.value && modelValue" name="value" :value="modelValue" />
                <template v-else>{{ selectLabel }}</template>
            </div>
            <div v-if="clearable && model" class="s-select-clear" @click.stop.prevent="handleClear">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 4 12 12 M12 4 4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            </div>
            <div class="s-select-dropdown" :class="{rotated: areOptionsShown}">
                <svg class="s-select-dropdown-chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 6 8 10 12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
        <Teleport to="body">
            <div v-if="areOptionsShown" ref="dropdownRef" :style="optionsStyles" 
                :class="['s-select-stylewrapper', attrs.class, areOptionsShown ? 'open' : 'closed']">
                <div :class="['s-select-options', openDirection]"
                    @scroll="handleScroll">
                    <ul v-if="$slots.option" class="s-select-options-list" :style="{height: totalHeight}">
                        <li v-for="[value, label] in visibleOptions" :key="value" @click.stop="selectOption(value)"
                            :class="{selected: value === model || !(value || model), active: value === activeValue}" class="s-select-options-item">
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
                                :class="{ selected: value == model, active: value === activeValue }"
                                @click.stop="selectOption(value)"
                            >
                                <slot v-if="$slots.option" name="option" :option="{label, value}" />
                                <template v-else>{{ label }}</template>
                            </div>
                        </div>
                        <ul v-else class="s-select-options-list">
                            <li v-for="[value, label] in visibleOptions" :key="value" @click.stop="selectOption(value)"
                                :class="{selected: value === model || !(value || model), active: value === activeValue}" class="s-select-options-item">
                                {{ label }}
                            </li>
                        </ul>
                    </template>
                    <div v-else class="s-select-options-nodata">{{ t('select.noData') }}</div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { templateRef } from '@vueuse/core';
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, useAttrs } from 'vue';
import { t } from '../locale';
import { normalizeOptions } from '../utils/options';

export interface SSelectProps {
    // Map {value: label}, array of pairs [[value, label]] or array of objects [{value, label}]
    options: Record<string | number, any> | any[];
    placeholder?: string;
    filterable?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    inline?: boolean;
    virtual?: boolean;
    virtualScrollSize?: number;
    /** Value key for an array of objects (default 'value') */
    optionValue?: string;
    /** Label key for an array of objects (default 'label') */
    optionLabel?: string;
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

const toInternalOptions = (propValue: any): [any, any][] =>
    normalizeOptions(propValue, { optionLabel: props.optionLabel, optionValue: props.optionValue }).map(o => [o.value, o.label]);
const internalOptions = ref<[any, any][]>(toInternalOptions(props.options ?? {}));
watch(() => props.options, (newOptions) => {
    internalOptions.value = toInternalOptions(newOptions ?? {})
}, { deep: true });

const itemHeight = ref(35); // height of a single option in px
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
const scrollContainer = ref<HTMLElement | null>(null);
const fieldRef = ref<HTMLElement | null>(null);
const openDirection = ref<string | null>(null);
const textFilter = ref<string>('');

// Index of the keyboard-highlighted option (into internalOptions)
const activeIndex = ref(-1);
const activeValue = computed(() => internalOptions.value[activeIndex.value]?.[0]);

const selectLabel = computed(() => {
    if (model.value === null || model.value === undefined) {
        return props.placeholder;
    }
    const option = internalOptions.value.find(([value, _]) => value == model.value);
    return option === undefined ? props.placeholder : option[1];
});

/**
 * Handle virtual scrolling
 */
function handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    startIndex.value = Math.floor(scrollTop / itemHeight.value);
}

watch(textFilter, (newTextFilter) => {
    filterOptions();
    emits('filter', newTextFilter);
    // Reset the keyboard highlight to the first match and reveal the list while typing
    activeIndex.value = internalOptions.value.length ? 0 : -1;
    if (newTextFilter && !areOptionsShown.value) openOptions();
});

/**
 * Filter the options
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
    activeIndex.value = -1;
}

/**
 * Determine the opening direction of the dropdown list
 *
 * @param rect Object with the rectangle coordinates
 */
function determineListDirection(rect: DOMRect) {
    const minOffset = Math.max(20, Math.min(6, internalOptions.value.length) * itemHeight.value);
    const listHeight = (dropdownRef.value?.offsetHeight ?? 0) + minOffset;
    const spaceBelow = document.documentElement.clientHeight - rect.bottom;

    if (spaceBelow >= listHeight) {
        // Fits below
        return 'drop-down';
    } else {
        // Does not fit below
        if (rect.top > listHeight) {
            // Fits above
            return 'drop-up';
        } else {
            // Does not fit above either, place it where there is more room
            return (rect.top > spaceBelow) ? 'drop-up' : 'drop-down';
        }
    }
}

const optionsStyles = ref<Record<string, string | number>>({});

// Find an ancestor with position:fixed
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
    const scrollX = fixedPosition ? 0 : window.scrollX;
    const scrollY = fixedPosition ? 0 : window.scrollY;

    let left = rect.left + scrollX;
    const width = rect.width;

    // Prevent horizontal scrolling
    if (left + width > window.innerWidth) {
        left = window.innerWidth - width - 10;
    }

    optionsStyles.value = {
        // If there is an ancestor with position:fixed, use fixed, otherwise absolute
        position: fixedPosition ? 'fixed' : 'absolute',
        left: `${left}px`,
        zIndex: 9999,
        width: `${width}px`,
    };

    if (openDirection.value === 'drop-up') {
        // For drop-up
        optionsStyles.value['bottom'] = `${document.documentElement.clientHeight - rect.top - scrollY}px`;
    } else {
        // For drop-down
        optionsStyles.value['top'] = `${rect.bottom + scrollY}px`;
    }
}

watch(areOptionsShown, async (shown) => {
    if (shown) {
        await nextTick();
        updateOptionsPosition();
    }
});

function openOptions() {
    if (props.disabled || areOptionsShown.value) return;
    areOptionsShown.value = true;
    // The dropdown is re-created on each open with scrollTop:0, so reset the virtual
    // window to match — otherwise a stale startIndex renders rows below the viewport
    // (blank space on top). scrollActiveIntoView() then scrolls to the active row.
    startIndex.value = 0;
    // Focus the control so keyboard navigation works even when opened via the chevron
    focusControl();
    // Highlight the currently-selected option (or the first one)
    const selIdx = internalOptions.value.findIndex(([value]) => value == model.value);
    activeIndex.value = selIdx >= 0 ? selIdx : (internalOptions.value.length ? 0 : -1);
    scrollActiveIntoView();
}

// Move focus to the filter input (filterable) or the field itself, so the keydown
// handler on the root receives arrow/Enter events regardless of where the user clicked.
function focusControl() {
    nextTick(() => {
        const input = fieldRef.value?.querySelector('.s-select-field-filter') as HTMLInputElement | null;
        (input ?? fieldRef.value)?.focus();
    });
}

function showOptions() {
    if (areOptionsShown.value) {
        areOptionsShown.value = false;
    } else {
        openOptions();
    }
}

function moveActive(delta: number) {
    const len = internalOptions.value.length;
    if (len === 0) return;
    activeIndex.value = Math.min(Math.max(activeIndex.value + delta, 0), len - 1);
    scrollActiveIntoView();
}

function scrollActiveIntoView() {
    nextTick(() => {
        if (props.virtual) {
            // The actual scroller is the outer .s-select-options (the inner container has
            // overflow:visible). Scroll it so the highlighted row stays in the visible
            // window — setting scrollTop also fires handleScroll, which slides the window.
            const c = dropdownRef.value?.querySelector('.s-select-options') as HTMLElement | null;
            if (!c) return;
            // Rough scroll first, to bring the highlighted index into the rendered window
            const top = activeIndex.value * itemHeight.value;
            const bottom = top + itemHeight.value;
            if (top < c.scrollTop) c.scrollTop = top;
            else if (bottom > c.scrollTop + c.clientHeight) c.scrollTop = bottom - c.clientHeight;
            // Then fine-adjust against the real rendered row (accounts for padding/borders)
            nextTick(() => {
                const el = c.querySelector('.s-select-options-item.active') as HTMLElement | null;
                if (!el) return;
                const viewTop = c.getBoundingClientRect().top;
                const er = el.getBoundingClientRect();
                if (er.top < viewTop) c.scrollTop -= viewTop - er.top;
                else if (er.bottom > viewTop + c.clientHeight) c.scrollTop += er.bottom - (viewTop + c.clientHeight);
            });
            return;
        }
        const el = dropdownRef.value?.querySelector('.s-select-options-item.active') as HTMLElement | null;
        if (!el) return;
        // Scroll ONLY the dropdown's own scrollable area — never the page. (Using
        // el.scrollIntoView() would scroll the window to the teleported list, which
        // before positioning sits at the end of <body> → the viewport jumps down.)
        const container = (el.closest('.s-select-options') ?? dropdownRef.value) as HTMLElement;
        const cRect = container.getBoundingClientRect();
        const eRect = el.getBoundingClientRect();
        if (eRect.top < cRect.top) container.scrollTop -= cRect.top - eRect.top;
        else if (eRect.bottom > cRect.bottom) container.scrollTop += eRect.bottom - cRect.bottom;
    });
}

// Keyboard control: ↓ opens / moves down, ↑ moves up, Enter selects, Esc closes
function handleKeydown(e: KeyboardEvent) {
    if (props.disabled) return;
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            areOptionsShown.value ? moveActive(1) : openOptions();
            break;
        case 'ArrowUp':
            if (areOptionsShown.value) { e.preventDefault(); moveActive(-1); }
            break;
        case 'Enter': {
            if (!areOptionsShown.value) return;
            const opt = internalOptions.value[activeIndex.value];
            if (opt) { e.preventDefault(); selectOption(opt[0]); }
            break;
        }
        case 'Escape':
            areOptionsShown.value = false;
            break;
    }
}

function handleClear() {
    model.value = null;
    emits('change', null);
    activeIndex.value = -1;
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
    box-sizing: border-box;
    // Total outer height (incl. border + padding) is bound to --s-field-height
    height: var(--s-field-height);
    gap: 5px;
    align-items: center;
    color: var(--s-text);
    border: 1px solid var(--s-border);
    border-radius: var(--s-border-radius);
    background-color: var(--s-white);
    cursor: pointer;
    font-family: var(--s-font-family);

    &:focus-within {
        border-color: var(--s-primary);
    }

    &-field:focus {
        outline: none;
    }

    &.disabled {
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.5;
    }

    &-field {
        display: flex;
        align-items: center;
        // No vertical padding: the wrapper's fixed height + flex centering position the content
        padding: 0 3px 0 10px;
        width: 100%;
        // Allow the field to shrink inside a narrow container (e.g. the time selects in
        // SDatePicker) so the chevron stays inside the box instead of overflowing
        min-width: 0;

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
            // Override the input's intrinsic min-width so it shrinks to fit a narrow select
            min-width: 0;
            width: 0;

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
            width: 18px;
            height: 18px;
            pointer-events: none;
        }

        &.rotated {
            transform: rotate(-180deg);
        }
    }

    &-clear {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        cursor: pointer;
        color: var(--s-text-light);

        svg {
            width: 13px;
            height: 13px;
        }

        &:hover {
            color: var(--s-primary);
        }
    }

    // Wrapper for the custom class
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

            &:hover,
            &.active {
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
        // Inline mode is a borderless trigger (menus/tables) — let it size to content
        height: auto;

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
