<template>
    <div class="s-upload">
        <div class="s-upload-header" @dragenter.stop="onDragEnter"
            @dragleave.stop="onDragLeave" @dragover.prevent @drop.prevent="onDrop">
            <div v-if="$slots.header" :class="{'dragging': isDragging}">
                <slot name="header" :choose="openFileDialog" :clear="clear" :files="model" :isDragging="isDragging" />
            </div>
            <SButton v-else class="s-upload-button" outlined @click.prevent="openFileDialog">
                <svg class="s-upload-button-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 3 V13 M3 8 H13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>{{ finalUploadButtonTitle }}
            </SButton>
        </div>

        <input ref="fileInput" class="s-upload-hiddeninput" type="file"
                :multiple="multiple" :accept="accept" @change="select"/>

        <div v-if="fileTitles.length" class="s-upload-content">
            <slot v-if="$slots.preview" name="preview" :files="fileTitles" :remove="remove"/>
            <div v-else v-for="(title, key) in fileTitles" :key="`${title}-${key}`" class="s-upload-content-item">
                <span>{{ title }}</span>
                <svg class="delete" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" @click="remove(title)">
                    <path d="M4 4 12 12 M12 4 4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import SButton from './SButton.vue';
import { t } from '../locale';

export interface SUploadProps {
    url?: string;
    accept?: string;
    /** Maximum file size: bytes (number) or a human-readable string like '2M', '512K', '1.5GB' */
    maxFileSize?: number | string;
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

// Text shown on the select button. If not explicitly set, depends on whether we select a single file or multiple
const finalUploadButtonTitle = computed(() => props.uploadButtonTitle ?? (props.multiple ? t('upload.selectFiles') : t('upload.selectFile')));

// Parse the max file size into bytes. A number is taken as-is (bytes); a string supports
// human-readable units K/M/G/T (1024-based, like PHP ini), with an optional trailing 'B' —
// e.g. '2M', '512K', '1.5GB', '2 MB'. Unrecognized strings disable the limit.
function parseFileSize(size: number | string | undefined): number | undefined {
    if (size == null || size === '') return undefined;
    if (typeof size === 'number') return size;
    const match = String(size).trim().match(/^([\d.]+)\s*([KMGT]?)B?$/i);
    if (!match) return undefined;
    const factor: Record<string, number> = { '': 1, K: 1024, M: 1024 ** 2, G: 1024 ** 3, T: 1024 ** 4 };
    return parseFloat(match[1]) * (factor[match[2].toUpperCase()] ?? 1);
}
const maxFileSizeBytes = computed(() => parseFileSize(props.maxFileSize));

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
 * File selection event handler
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
    if (maxFileSizeBytes.value && file.size > maxFileSizeBytes.value) return false;
    return true;
}

function isFileTypeValid(file: File) {
    const acceptableTypes = (props.accept || '').split(',').map((type) => type.trim());
    const parts = file.name.split('.');
    const fileExtension = '.' + parts[parts.length - 1];
    return acceptableTypes.includes(fileExtension);
}

/**
 * Remove a file by name (since both strings and files can be stored)
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
        .s-upload-button-icon {
            width: 14px;
            height: 14px;
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
                width: 13px;
                height: 13px;
                color: var(--s-text-light);
                cursor: pointer;

                &:hover {
                    color: var(--s-primary);
                }
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
