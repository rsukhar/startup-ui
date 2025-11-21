# SHtmlEditor

Визуальный HTML-редактор.

## Базовый пример

<div class="docs-container">
    <SHtmlEditor v-model="content" upload-url="/image/upload" />
</div>

::: details Показать код
```js
<template>
    <SHtmlEditor v-model="content" upload-url="/image/upload" />
</template>
<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref(false);
</script>
```
:::

## Плейсхолдер

```js
<template>
    <SHtmlEditor v-model="content" upload-url="/image/upload" placeholder="Введите контент" />
</template>
<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref(false);
</script>
```

<script setup>
import { ref } from 'vue';
import SHtmlEditor from '../../resources/components/SHtmlEditor.vue';

const content = ref('');
</script>