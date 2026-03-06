# SHtmlEditor

A rich text WYSIWYG editor component. Internally, it is a highly customized wrapper around **TinyMCE** designed to produce clean HTML that matches the design system.

## Import

```javascript
import { SHtmlEditor } from 'startup-ui';
```

## Basic Usage

The component binds its raw HTML output via `v-model`. 

```vue
<template>
    <SHtmlEditor 
        v-model="content" 
        placeholder="Start typing your article here..." 
    />
</template>

<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref('<p>Initial content...</p>');
<\/script>
```

## Image Uploads

To enable users to upload images directly into the editor, provide an API endpoint URL to the `uploadUrl` prop. 
The editor expects the server to return a JSON object with a `location` property containing the uploaded image URL: `{ location: "https://example.com/image.jpg" }`.

```vue
<SHtmlEditor 
    v-model="articleHtml" 
    uploadUrl="/api/storage/upload-image" 
/>
```

When images are inserted (either via upload, paste, or drag & drop), the editor automatically wraps `<img>` tags in standard `<div>` containers. Users can then apply custom alignments and styles using the editor's image toolbar (e.g., Background, Border, Stretched).

## Custom Formats & Blocks

The editor's standard "Formats" dropdown provides access to custom `startup-ui` specific blocks:
- **Заметка (Note):** Standard blue note block.
- **Внимание (Attention):** Orange warning block.
- **Успех (Success):** Green success block.
- **Ошибка (Error):** Red error block.

Under the hood, these apply the `.s-note` classes (e.g., `<div class="s-note attention">...</div>`).

## Media Embeds (Kinescope)

The built-in media plugin natively supports inserting and live-previewing videos. It includes custom regex resolution specifically for **Kinescope** video links (`https://kinescope.io/embed/...`), automatically converting them into responsive `<iframe>` tags.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | string | `undefined` | The bound HTML content of the editor. |
| uploadUrl | string | `undefined` | The API endpoint URL where dragged/pasted images will be sent via POST (`multipart/form-data`, passing the file in the `file` field). |
| placeholder | string | `''` | Text to display when the editor is completely empty. |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| changeContent | `()` | Fired when the internal TinyMCE `update:modelValue` triggers. |

## Slots

This component does not use generic layout slots.
