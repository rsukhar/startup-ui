<template>
    <div class="s-upload">
        <div class="s-upload-header">
            <template v-if="$slots.header">
                <slot name="header" :choose="openFileDialog" :clear="clear" :files="model" />
            </template>
            <template v-else>
                <SButton class="s-upload-button" outlined @click.prevent="openFileDialog">
                    <FontAwesomeIcon class="s-upload-button-icon" icon="plus" />Выберите файл
                </SButton>
            </template>
            <input ref="fileInput" class="s-upload-hiddeninput" type="file"
                :multiple="multiple" :accept="accept" @change="select"/>
        </div>
  
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
  
<script setup>
import { computed, useTemplateRef } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SButton from './SButton.vue';
  
const props = defineProps({
    url: String,
    accept: String,
    maxFileSize: Number,
    multiple: Boolean,
});

const model = defineModel();
const emit = defineEmits(['select', 'clear']);
const fileInput = useTemplateRef('fileInput');

const openFileDialog = () => {
    fileInput.value.click();
};

const fileTitles = computed(() => {
    if (!model.value) return [];
    const arr = Array.isArray(model.value) ? model.value : [model.value];
    return arr.map((item) => (item instanceof File ? item.name : item));
});

/**
 * Обработчик события select
 * 
 * @param event 
 */
function select(event) {
    const selected = Array.from(event.target.files || []).filter(isFileValid);
    if (!selected.length) return;

    if (fileTitles.value.includes(event.target.files[0].name)) return;
  
    if (props.multiple) {
        const current = Array.isArray(model.value) ? [...model.value] : [];
        model.value = [...current, ...selected];
    } else {
        model.value = selected[0];
    }

    emit('select', model.value);
}
  
function isFileValid(file) {
    if (props.accept && !isFileTypeValid(file)) return false;
    if (props.maxFileSize && file.size > props.maxFileSize) return false;
    return true;
}
  
function isFileTypeValid(file) {
    const acceptableTypes = props.accept.split(',').map((type) => type.trim());
    const fileExtension = '.' + file.name.split('.').pop();
    return acceptableTypes.includes(fileExtension);
}

/**
 * Удаление файла по имени (т.к. могут храниться и строки, и файлы)
 * 
 * @param title 
 */
function remove(title) {
    if (Array.isArray(model.value)) {
        model.value = model.value.filter(item => (item instanceof File ? item.name !== title : item !== title));
    } else {
        model.value = null;
    }
}

function clear() {
    model.value = props.multiple ? [] : null;
    emit('clear');
}

defineExpose({ clear, remove });
</script>
<style lang="scss">
.s-upload {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-header {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    &-button {
        display: flex;
        width: auto !important;
        justify-content: center;
        align-items: center;
        gap: 5px;
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
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
    }
}
</style>
