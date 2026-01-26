<template>
    <div class="s-columnsettings">
        <div class="s-custom-dropdown-wrapper">
            <div class="s-custom-dropdown-container" :class="{ 'open': isOpen }" ref="dropdown">
                <div @click="toggleDropdown" class="s-custom-dropdown-container-btn">
                    <FontAwesomeIcon icon="table-columns" />
                    <span>Настроить колонки</span>
                    <FontAwesomeIcon  :icon="'fa-chevron-' + (isOpen ? 'up' : 'down')" />
                </div>
                <ul class="s-custom-dropdown-container-items" ref="$list">
                    <li class="s-custom-dropdown-container-item" v-for="item in list" :key="item.id">
                        <FontAwesomeIcon icon="bars" class="reorder-btn"/>
                        <div class="checkbox-wrapper">
                            <SCheckbox v-model="item.isActive" :disabled="permanentColumns.includes(item.id)">
                                {{ item.title }}
                            </SCheckbox>
                        </div>
                    </li>
                </ul>
                <div v-if="columnPresets && columnPresets.length" class="s-custom-dropdown-container-footer" ref="footer">
                    <a v-for="columnPreset in columnPresets" :key="columnPreset.title"
                       @click="resetValue(columnPreset.columns)">
                        <FontAwesomeIcon icon="rotate-left" />
                        Сбросить {{ columnPresets.length > 1 ? `на ${ columnPreset.title }` : 'изменения' }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, useTemplateRef, nextTick } from "vue";
import { useSortable } from "@vueuse/integrations/useSortable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useEventListener } from "@vueuse/core";
import SCheckbox from "./SCheckbox.vue";

const props = defineProps({
    /**
     * Набор показанных колонок в формате: ['id1', 'id2', ...]
     */
    modelValue: Array,
    /**
     * Набор доступных колонок: {id1: 'Название колонки 1', ...}
     */
    options: Object,
    /**
     * Значение по умолчанию для сброса
     */
    columnPresets: Array,
    /**
     * Эти колонки нельзя отключить
     */
    permanentColumns: {
        type: Array,
        default: []
    },
});
const emit = defineEmits(['update:modelValue'])

const $footer = useTemplateRef('footer');

// Сортируемый список в HTML
const $list = ref();
const isOpen = ref(false);
const dropdown = ref();
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

useEventListener(document, 'click', (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        isOpen.value = false;
    }
});

watch(isOpen, async (open) => {
    if (!open) return;

    await nextTick();
    const listHeight = $list.value.getBoundingClientRect().height;
    const btnHeight = dropdown.value.getBoundingClientRect().height;
    
    $footer.value.style.top = (listHeight + btnHeight) + 'px';
});

// Собирает список для отображения из известных колонок и текущего значения модели
const buildList = function(modelValue) {
    const result = [],
        addedIds = [];
    // Добавляем включенные колонки в их порядке
    modelValue.filter(id => props.options[id]).forEach((id) => {
        result.push({ id: id, title: props.options[id], isActive: modelValue.includes(id) });
        addedIds.push(id);
    });
    // Дособираем другие доступные варианты
    Object.entries(props.options).filter(([id, title]) => !addedIds.includes(id)).forEach(([id, title]) => {
        result.push({ id: id, title: title, isActive: false });
        addedIds.push(id);
    });
    return result;
}

/**
 * Отображаемый список в формате [{id: 'colname1', title: 'Название колонки 1', isActive: true], ...]
 */
const list = ref(buildList(props.modelValue));

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

// Сброс изменений
const resetValue = function(columns) {
    console.log(columns);
    list.value = buildList(columns);
};
</script>

<style lang="scss">
.s-columnsettings {
    @include desktop() {
        margin-left: auto !important;
    }
    @include mobile() {
        margin-left: 0 !important;
    }
    .s-custom-dropdown-wrapper {
        min-width: 230px;

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

                a {
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
</style>