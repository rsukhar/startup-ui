<template>
    <div class="s-columnsettings">
        <div class="s-custom-dropdown-wrapper">
            <div class="s-custom-dropdown-container" :class="{ 'open': isOpen }" ref="dropdown">
                <div @click="toggleDropdown" class="s-custom-dropdown-container-btn">
                    <slot v-if="$slots.label" name="label" />
                    <template v-else>
                        <FontAwesomeIcon icon="table-columns" />
                        <span>Настроить колонки</span>
                        <FontAwesomeIcon  :icon="'fa-chevron-' + (isOpen ? 'up' : 'down')" />
                    </template>
                </div>
                <Teleport to="body">
                    <div v-if="isOpen" ref="portal" class="s-columnsettings-dropdown-portal" :style="portalStyle">
                        <ul class="s-columnsettings-dropdown-container-items" ref="$list">
                            <li v-for="item in list" :key="item.id" class="s-columnsettings-dropdown-container-item">
                                <FontAwesomeIcon icon="bars" class="reorder-btn" />
                                <div class="checkbox-wrapper">
                                    <SCheckbox v-model="item.isActive" :disabled="permanentColumns.includes(item.id)">
                                        {{ item.title }}
                                    </SCheckbox>
                                </div>
                            </li>
                        </ul>

                        <div v-if="columnPresets.length" class="s-columnsettings-dropdown-container-footer">
                            <a v-for="preset in columnPresets" :key="preset.title" @click="resetValue(preset.columns)">
                                <slot name="setpreset" :preset="preset">
                                    <FontAwesomeIcon icon="rotate-left" />
                                    Сбросить
                                    {{ columnPresets.length > 1 ? `на ${preset.title}` : 'изменения' }}
                                </slot>
                            </a>
                        </div>
                    </div>
                </Teleport>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef, nextTick } from "vue";
import { useSortable } from "@vueuse/integrations/useSortable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useEventListener } from "@vueuse/core";
import SCheckbox from "./SCheckbox.vue";

export interface SColumnSettingsPreset {
    title: string;
    columns: string[];
}

export interface SColumnSettingsProps {
    /**
     * Набор показанных колонок в формате: ['id1', 'id2', ...]
     */
    modelValue?: string[];
    /**
     * Набор доступных колонок: {id1: 'Название колонки 1', ...}
     */
    options?: Record<string, string>;
    /**
     * Значение по умолчанию для сброса
     */
    columnPresets?: SColumnSettingsPreset[];
    /**
     * Эти колонки нельзя отключить
     */
    permanentColumns?: string[];
}

const props = withDefaults(defineProps<SColumnSettingsProps>(), {
    modelValue: () => [],
    options: () => ({}),
    columnPresets: () => [],
    permanentColumns: () => [],
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
}>();

const $dropdown = useTemplateRef<HTMLElement>('dropdown');
const $portal = useTemplateRef<HTMLElement>('portal');
const $list = ref<HTMLElement | null>(null);

const isOpen = ref(false);
const portalStyle = ref<Record<string, string>>({});

interface ColumnItem {
    id: string;
    title: string;
    isActive: boolean;
}

// Собирает список для отображения из известных колонок и текущего значения модели
const buildList = (modelValue: string[]): ColumnItem[] => {
    const result: ColumnItem[] = [];
    const used = new Set<string>();

    modelValue.filter(id => props.options[id])
        .forEach(id => {
            result.push({ id, title: props.options[id], isActive: true });
            used.add(id);
        });

    Object.entries(props.options).filter(([id]) => !used.has(id))
        .forEach(([id, title]) => {
            result.push({ id, title, isActive: false });
        });

    return result;
};

const list = ref<ColumnItem[]>(buildList(props.modelValue));

// Позионирование выпадающего списка
const updatePosition = () => {
    if (!$dropdown.value) return;
    const rect = $dropdown.value.getBoundingClientRect();

    portalStyle.value = {
        position: 'fixed',
        top: `${rect.bottom + 4}px`,
        right: `${document.documentElement.clientWidth - rect.right}px`,
        minWidth: `${rect.width}px`,
        zIndex: '10000',
    };
};

const toggleDropdown = async () => {
    isOpen.value = !isOpen.value;

    if (isOpen.value) {
        await nextTick();
        updatePosition();
    }
};

// При обновлении списка доступных вариантов — пересобираем список
watch(() => props.options, (newValue, oldValue) => {
    list.value = buildList(props.modelValue);
});
// При обновлении списка, если нужно, обновляем модель
watch(list, (newValue) => {
    const newModelValue = newValue.filter(item => item.isActive).map(item => item.id);
    if (JSON.stringify(newModelValue) !== JSON.stringify(props.modelValue)) {
        emit('update:modelValue', newModelValue);
    }
}, { deep: true });

useSortable($list, list, {
    handle: '.reorder-btn',
    animation: 150,
});

// Закрытие по клику вне компонента
useEventListener(document, 'click', (event: Event) => {
    const target = event.target as Node;
    if (
        $dropdown.value && $portal.value  
        && !($dropdown.value.contains(target) 
        || $portal.value.contains(target))
    ) {
        isOpen.value = false;
    }
});


// Подстройка позиции при скролле и изменении размера экрана
useEventListener(window, 'scroll', () => {
    if (isOpen.value) updatePosition();
});

useEventListener(window, 'resize', () => {
    if (isOpen.value) updatePosition();
});

// Сброс изменений
const resetValue = (columns: string[]) => {
    list.value = buildList(columns);
};
</script>

<style lang="scss">
.s-columnsettings {
    display: inline-block;
    @include desktop() {
        margin-left: auto !important;
    }
    @include mobile() {
        margin-left: 0 !important;
    }
    .s-custom-dropdown-wrapper {
        width: fit-content;

        .s-custom-dropdown-container {
            position: relative;
            width: 100%;
            font-family: sans-serif;

            * {
                cursor: pointer;
            }

            &-btn {
                display: flex;
                gap: 10px;
                align-items: center;
                padding: 0 1.5em;
                line-height: 34px;
                border: 1px solid var(--s-border);
                border-radius: var(--s-border-radius);
                transition: all .2s;
                svg {
                    vertical-align: sub;
                    font-size: 16px;

                    &:last-child {
                        margin-left: auto;
                    }
                }

                &:hover {
                    color: var(--s-primary);
                    border: 1px solid var(--s-primary);
                }
            }

            &-items {
                max-height: 300px;
                position: absolute;
                top: 100%;
                right: 0;
                min-width: 100%;
                margin: 0;
                padding: 0;
                list-style: none;
                background-color: var(--s-white);
                border: 1px solid var(--s-border);
                border-top: none;
                border-radius: var(--s-border-radius);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                z-index: 10; /* Ensure it's above other content */
                display: none; /* Initially hidden */
                overflow-y: auto;
            }

            &-item {
                margin-bottom: 0;
                padding: 10px 15px;
                transition: background-color 0.2s;
                display: flex;
                align-items: center;
                gap: 10px;
                white-space: nowrap;
                
                &:not(:last-child) {
                    border-bottom: 1px solid var(--s-border);
                }

                .checkbox-wrapper {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                &:hover {
                    background-color: var(--s-gray);
                }

                a {
                    text-align: center;
                    width: 100%;
                }
            }

            &-footer {
                display: none;
                flex-direction: column;
                gap: 5px;
                position: absolute;
                top: 326px;
                right: 0;
                min-width: 100%;
                margin: 0;
                padding: 20px 15px 10px 15px;
                list-style: none;
                background-color: var(--s-primary-lightest);
                z-index: 9;
                border-radius: var(--s-border-radius);
                cursor: default;
                box-sizing: border-box;
                white-space: nowrap;

                a {
                    text-align: center;
                    display: block;
                }
            }

            &.open {
                .s-custom-dropdown-container-items {
                    display: block;
                }

                .s-custom-dropdown-container-footer {
                    display: flex;
                }

                .s-custom-dropdown-container-btn {
                    color: var(--s-primary);
                    border: 1px solid var(--s-primary);
                }
            }
        }

        @include mobile() {
            min-width: 60px;
            .s-custom-dropdown-container-btn {
                line-height: 32px;
                padding: 0 1rem;
                height: 36px;

                span {
                    display: none;
                }
            }
        }
    }
}

.s-columnsettings-dropdown {
    &-portal {
        display: flex;
        flex-direction: column;
        background: var(--s-white);
        border-radius: var(--s-border-radius);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        overflow: hidden;
    }

    &-container {
        &-items {
            max-height: 300px;
            overflow-y: auto;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        &-item {
            padding: 10px 15px;
            margin: 0;
            display: flex;
            gap: 10px;
            align-items: center;
            white-space: nowrap;

            &:hover {
                background: var(--s-gray);
            }
        }

        &-item:not(:last-child) {
            border-bottom: 1px solid var(--s-border);
        }

        &-footer {
            padding: 12px 15px;
            background: var(--s-primary-lightest);
            border-top: 1px solid var(--s-border);

            a {
                display: block;
                text-align: center;
                cursor: pointer;
            }
        }
    }
}
</style>