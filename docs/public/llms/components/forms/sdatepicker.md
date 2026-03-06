# SDatePicker

A date picking component that supports single dates, date ranges, and time selection.

## Import

```javascript
import { SDatePicker } from 'startup-ui';
```

## Single Date Selection

By default, the component allows selecting a single date. The `v-model` receives a string string based on the `valueFormat` (defaults to `YYYY-MM-DD`).

```vue
<template>
    <SDatePicker v-model="birthDate" />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const birthDate = ref('1990-05-15');
<\/script>
```

## Date Range Selection

By adding the `range` prop, the component switches to date range mode. It will automatically display 2 calendar months side-by-side, and the `v-model` will expect and update an array of two date strings: `['start-date', 'end-date']`.

```vue
<template>
    <SDatePicker v-model="period" range />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const period = ref(['2025-01-01', '2025-01-31']);
<\/script>
```

## With Time

To allow users to select both a date and a time (hours and minutes), use the `withTime` prop. This will append a time selector at the bottom of the calendar popup and change the default values for the formats.

```vue
<SDatePicker v-model="appointment" withTime />
```

## Formatting

You can control two different formats:
1. `valueFormat`: The format of the string bound to your `v-model` and sent to your backend.
2. `inputFormat`: The format displayed to the user inside the visual text input field component.

Both use `dayjs` formatting tokens.

```vue
<SDatePicker 
    v-model="customDate" 
    valueFormat="DD-MM-YYYY" 
    inputFormat="D MMMM, YYYY" 
/>
```

*Default Formats:*
- Regular: `valueFormat`: `'YYYY-MM-DD'`, `inputFormat`: `'DD.MM.YYYY'`
- With `withTime`: `valueFormat`: `'YYYY-MM-DD HH:mm'`, `inputFormat`: `'DD.MM.YYYY HH:mm'`

## Min/Max Constraints

You can restrict the selectable dates using the `min` and `max` props. Passed values must be formatted as `'YYYY-MM-DD'` strings.

```vue
<SDatePicker 
    v-model="date" 
    min="2025-01-01" 
    max="2025-12-31" 
/>
```

## Quick Select Buttons

You can provide quick-select buttons above the calendar by passing a `buttons` object. The keys are standard labels, and the values are hyphen-separated date ranges. It internally uses `SRadioGroup`.

```vue
<template>
    <SDatePicker v-model="range" range :buttons="quickDates" />
</template>

<script setup>
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');
const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

const quickDates = {
    'Today': `${today}-${today}`,
    'Next 2 Days': `${today}-${tomorrow}`
};
<\/script>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `string \| string[] \| null` | `null` | The selected date string or array of two strings if `range` is `true`. |
| range | boolean | `false` | Enables date range selection. Modifies `v-model` to be an array. |
| withTime | boolean | `false` | Enables time selection (hours/minutes). |
| valueFormat | string | `'YYYY-MM-DD'` (or appended `HH:mm`) | The internal format for your `v-model` data. |
| inputFormat | string | `'DD.MM.YYYY'` (or appended `HH:mm`) | The visual format shown in the read-only input box. |
| min | string | `undefined` | Minimum allowed date (`YYYY-MM-DD`). |
| max | string | `undefined` | Maximum allowed date (`YYYY-MM-DD`). |
| numberOfMonths | number | `1` (or `2` if `range`) | The number of consecutive calendar months to display at once in the dropdown window. |
| weekDayNames | `string[]` | `['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']` | Labels for days of the week. |
| monthNames | `string[]` | `['Январь', ...]` | Labels for month names in the header. |
| buttons | `Record<string, string>` | `undefined` | Quick-select buttons. Values are hyphenated ranges: `'YYYY-MM-DD-YYYY-MM-DD'`. |

## Slots

This component does not currently use any slots.
