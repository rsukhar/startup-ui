# SSlider

Ползунок для выбора числового значения из диапазона. Рядом с ползунком отображается текущее значение.

## Базовый пример

```vue
<template>
    <SSlider v-model="value" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(50)
</script>
```

## Диапазон и шаг

Границы диапазона и шаг задаются свойствами `min`, `max` и `step`:

```vue
<template>
    <SSlider v-model="limit" :min="5" :max="50" :step="5" />
</template>
<script setup>
import { ref } from 'vue'
const limit = ref(20)
</script>
```

## Единица измерения

Свойство `unit` добавляет суффикс к отображаемому значению:

```vue
<template>
    <SSlider v-model="percent" :min="1" :max="50" unit="%" />
</template>
<script setup>
import { ref } from 'vue'
const percent = ref(10)
</script>
```

## Кастомное отображение значения

Через слот по умолчанию значение можно отформатировать произвольно. Слот получает текущее значение через параметр `value`:

```vue
<template>
    <SSlider v-model="budget" :min="1000" :max="50000" :step="1000">
        <template #default="{ value }">{{ value.toLocaleString('ru-RU') }} ₽</template>
    </SSlider>
</template>
<script setup>
import { ref } from 'vue'
const budget = ref(10000)
</script>
```

Если значение показывать не нужно, отключите его свойством `:show-value="false"`.

## Редактируемое значение

Свойство `editable` заменяет число полем ввода — значение можно ввести вручную (текст центрируется). При потере фокуса (или по Enter) введённое значение приводится к ближайшему допустимому: привязывается к шагу и обрезается по границам `min` / `max`. Попробуйте ввести, например, `999` или `-5`:

```vue
<template>
    <SSlider v-model="volume" :min="0" :max="100" :step="5" unit="%" editable />
</template>
<script setup>
import { ref } from 'vue'
const volume = ref(40)
</script>
```

## Положение значения

Свойством `value-position` значение можно вывести слева от ползунка (по умолчанию — справа):

```vue
<template>
    <SSlider v-model="value" value-position="left" editable unit="%" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(60)
</script>
```

## Недоступное состояние

```vue
<template>
    <SSlider v-model="value" disabled />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(30)
</script>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `number` | `0` | Текущее значение. |
| min | `number` | `0` | Минимальное значение. |
| max | `number` | `100` | Максимальное значение. |
| step | `number` | `1` | Шаг изменения значения. |
| unit | `string` | `''` | Суффикс к отображаемому значению (например, `%`). |
| show-value | `boolean` | `true` | Показывать ли текущее значение рядом с ползунком. |
| editable | `boolean` | `false` | Показывать значение редактируемым полем ввода (текст центрируется). При потере фокуса значение привязывается к шагу и обрезается по `min` / `max`. |
| value-position | `'left' \| 'right'` | `'right'` | Сторона ползунка, где выводится значение. |
| disabled | `boolean` | `false` | Отключает возможность изменения. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Кастомное отображение значения. Получает параметр `value` — текущее значение. |
