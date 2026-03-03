<template>
    <div class="s-upload">
        <div class="s-upload-header" @dragenter.stop="onDragEnter"
            @dragleave.stop="onDragLeave" @dragover.prevent @drop.prevent="onDrop">
            <div v-if="$slots.header" :class="{'dragging': isDragging}">
                <slot name="header" :choose="openFileDialog" :clear="clear" :files="model" :isDragging="isDragging" />
            </div>
            <SButton v-else class="s-upload-button" outlined @click.prevent="openFileDialog">
                <FontAwesomeIcon class="s-upload-button-icon" icon="plus" />{{ finalUploadButtonTitle }}
            </SButton>
        </div>

        <input ref="fileInput" class="s-upload-hiddeninput" type="file"
                :multiple="multiple" :accept="accept" @change="select"/>

        <div v-if="fileTitles.length" class="s-upload-content">
            <slot v-if="$slots.preview" name="preview" :files="fileTitles" :remove="remove"/>
            <div v-else v-for="(title, key) in fileTitles" :key="`${title}-${key}`" class="s-upload-content-item">
                <span>{{ title }}</span>
                <FontAwesomeIcon icon="xmark" class="delete" @click="remove(title)" />
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SButton from './SButton.vue';

export interface SUploadProps {
    url?: string;
    accept?: string;
    maxFileSize?: number;
    multiple?: boolean;
    uploadButtonTitle?: string;
}

const props = defineProps<SUploadProps>();

const model = defineModel<any | any[]>();
const emit = defineEmits<{
    (e: 'select', value: any): void;
    (e: 'clear'): void;
}>();
const fileInput = useTemplateRef<HTMLInputElement>('fileInput');

// Текст, который выводится на кнопке выбора. Если явно не задан, зависит от того, выбираем один файл или несколько
const finalUploadButtonTitle = computed(() => props.uploadButtonTitle ?? (props.multiple ? 'Выбрать файлы' : 'Выбрать файл'));

const openFileDialog = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const fileTitles = computed(() => {
    if (!model.value) return [];
    const arr = Array.isArray(model.value) ? model.value : [model.value];
    return arr.map((item) => (item instanceof File ? item.name : item));
});

/**
 * Обработчик события выбора файла
 * 
 * @param event 
 */
function select(event: Event | DragEvent) {
    const target = event.target as HTMLInputElement;
    const dataTransfer = (event as DragEvent).dataTransfer;
    const files = target?.files || dataTransfer?.files || [];
    const selected = Array.from(files).filter(isFileValid);

    if (!selected.length) return;
    if (fileTitles.value.includes(selected[0]?.name)) return;

    if (props.multiple) {
        const current = Array.isArray(model.value) ? [...model.value] : [];
        model.value = [...current, ...selected];
    } else {
        model.value = selected[0];
    }

    emit('select', model.value);
}

function isFileValid(file: File) {
    if (props.accept && !isFileTypeValid(file)) return false;
    if (props.maxFileSize && file.size > props.maxFileSize) return false;
    return true;
}

function isFileTypeValid(file: File) {
    const acceptableTypes = (props.accept || '').split(',').map((type) => type.trim());
    const parts = file.name.split('.');
    const fileExtension = '.' + parts[parts.length - 1];
    return acceptableTypes.includes(fileExtension);
}

/**
 * Удаление файла по имени (т.к. могут храниться и строки, и файлы)
 * 
 * @param title 
 */
function remove(title: string) {
    if (Array.isArray(model.value)) {
        model.value = model.value.filter(item => (item instanceof File ? item.name !== title : item !== title));
    } else {
        model.value = null;
    }

    if (fileInput.value) {
        fileInput.value.value = '';
    }
}

function clear() {
    model.value = props.multiple ? [] : null;
    emit('clear');
}

const isDragging = ref(false);
let dragCounter = 0;

function onDragEnter(event: DragEvent) {
    dragCounter++;
    isDragging.value = true;
}

function onDragLeave(event: DragEvent) {
    dragCounter--;
    if (dragCounter === 0) {
        isDragging.value = false;
    }
}

function onDrop(event: DragEvent) {
    dragCounter = 0;
    isDragging.value = false;
    select(event);
}

defineExpose({ clear, remove });
</script>
<style lang="scss">
.s-upload {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: var(--s-font-family);
    padding: var(--base-margin);
    padding-left: 0;
    
    &-header {
        position: relative;

        &.dragging {
            border-radius: 6px;
            outline-style: dashed;
            outline-width: 1px;
            outline-color: var(--primary);
            outline-offset: 5px;
        }
    }

    &-header:empty {
        display: none;
    }

    &-button {
        display: flex;
        width: auto !important;
        justify-content: center;
        align-items: center;
        gap: 5px;
        & > svg:first-child {
            margin-left: -10px;
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &-item {
            display: flex;
            gap: 5px;
            align-items: center;

            .delete {
                cursor: pointer;
            }
        }

        img {
            margin: 0;
        }
    }

    &-customcontrols {
        display: flex;
        gap: 10px;
    }

    &-hiddeninput {
        position: absolute;
        display: none;
        pointer-events: none;
    }
}
</style>
