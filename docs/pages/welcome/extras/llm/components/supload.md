# SUpload

A component for uploading files. Supports single/multiple file selection, drag-and-drop, file type validation, and extensive slot customization.

## Import

```javascript
import { SUpload } from 'startup-ui';
```

## Basic Usage

By default, the component renders a button that opens a native file dialog. The selected `File` object (or an array of `File` objects if `multiple` is true) is bound to `v-model`. 

```vue
<template>
    <SUpload v-model="avatar" accept=".jpg,.png" />
</template>

<script setup>
import { ref } from 'vue';
import { SUpload } from 'startup-ui';

const avatar = ref(null);
<\/script>
```

When a file is selected, it immediately appears in the default file list beneath the button, accompanied by a removal (X) icon.

## Multiple Files and Limits

You can allow selecting multiple files at once. You can also restrict the maximum file size using the `maxFileSize` prop (in bytes).

```vue
<template>
    <SUpload 
        v-model="documents" 
        multiple 
        :maxFileSize="5000000" <!-- 5 MB -->
    />
</template>

<script setup>
import { ref } from 'vue';

const documents = ref([]);
<\/script>
```

## Custom Layout & Drag-and-Drop Area

Instead of the standard button, you can build a massive drag-and-drop zone using the `header` slot.
The component exposes useful scope variables like `isDragging` (to react visually when a file hovers over), `choose` (to manually open the file browser dialog window), and `clear`.

```vue
<template>
    <SUpload v-model="file">
        <template #header="{ isDragging, choose }">
            <div 
                class="custom-dropzone" 
                :class="{ 'active-drag': isDragging }"
                @click="choose"
            >
                <p v-if="isDragging">Drop your file here!</p>
                <p v-else>Click to browse or drag and drop a file.</p>
            </div>
        </template>
    </SUpload>
</template>
```

## Custom File List Preview

By default, the component renders a textual list of names for all selected files. You can completely replace this list UI using the `preview` slot. This is particularly useful for showing image thumbnails instead of standard text.
The slot provides `files` (array of file names/strings) and a `remove(title)` function.

```vue
<template>
    <SUpload v-model="gallery" multiple>
        <template #preview="{ files, remove }">
            <div class="gallery-grid">
                <div v-for="fileTitle in files" :key="fileTitle" class="gallery-item">
                    <span>{{ fileTitle }}</span>
                    <button @click.prevent="remove(fileTitle)">Delete</button>
                </div>
            </div>
        </template>
    </SUpload>
</template>

<script setup>
import { ref } from 'vue';
const gallery = ref([]);
<\/script>
```

## Exposed Methods

If you have a `ref` on the `<SUpload>` component, you can programmatically interact with it:
- `clear()`: Wipes the `v-model` (sets to null or empty array) and emits the `@clear` event.
- `remove(title: string)`: Removes a specific file by its name from the selection.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `File \| File[] \| string \| null` | `null` | Bound file(s). Usually `File` instances coming from the OS. |
| accept | string | `undefined` | Comma-separated list of allowed file extensions (e.g. `'.jpg,.png,.pdf'`). |
| maxFileSize | number | `undefined` | Maximum allowed individual file size in bytes. |
| multiple | boolean | `false` | Allows selecting multiple files. The `v-model` becomes an array. |
| uploadButtonTitle | string | `'Выбрать файл(ы)'` | Custom text for the default upload button. |
| url | string | `undefined` | Currently unused internally. Kept for extending or custom upload logic. |

## Slots

| Name | Description |
|------|-------------|
| header | Replaces the default `<SButton>`. Scope includes `{ choose: function, clear: function, files: array, isDragging: boolean }`. The area inside this slot will automatically act as a drag-and-drop zone. |
| preview | Replaces the list of selected files shown below the input area. Scope includes `{ files: array, remove: function }`. |
| default | Any miscellaneous content to append to the very bottom of the component structure. |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| select | `(value: any)` | Fired immediately after the user selects a new valid file(s). |
| clear | `()` | Fired when the `clear` exposed method is called. |
