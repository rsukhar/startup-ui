# SForm & SFormRow

A powerful form building system. `SForm` manages the form's state (data, submission, errors, loading state) while `SFormRow` acts as an intelligent wrapper for individual fields, automatically binding data, tracking errors, and displaying labels and hints.

## Import

```javascript
import { SForm, SFormRow } from 'startup-ui';
```

## Basic Example

`SForm` uses `v-model` to track all form data. By providing an `action` prop, the form will automatically submit via Inertia.js when the user presses Enter or clicks a submit button.

Inside, `SFormRow` wraps your actual input components (like `SInput`). By assigning the `name` prop to `SFormRow`, it automatically binds the inner input to `v-model="formModel[name]"` and displays relevant validation errors returned by the server.

```vue
<template>
    <SForm 
        v-model="form" 
        :errors="errors" 
        action="/settings/profile" 
        method="put"
    >
        <SFormRow title="Your Name" name="name" hint="This is your public display name.">
            <SInput placeholder="John Doe" />
        </SFormRow>

        <SFormRow title="Email Context" name="email">
            <SInput type="email" placeholder="john@example.com" />
        </SFormRow>

        <SButton type="submit">Save Changes</SButton>
    </SForm>
</template>

<script setup>
import { ref } from 'vue';
import { SForm, SFormRow, SInput, SButton } from 'startup-ui';

// Inertia automatically passes page props like 'errors' down
defineProps({
    errors: Object
});

const form = ref({
    name: 'Mihail',
    email: 'hello@startup.com'
});
<\/script>
```

## Advanced Error Handling (Wildcards)

Sometimes a backend error is returned as an array or with dynamic keys (e.g., `contacts.0.phone`). `SFormRow` allows you to target these specific errors using the `errorKey` prop, which supports arrays and wildcard `*` matching.

```vue
<!-- Will catch errors for 'phones.0', 'phones.1', 'phones.14', etc. -->
<SFormRow title="Phone Array" name="phoneList" errorKey="phones.*">
    <!-- input array UI -->
</SFormRow>

<!-- Will check both 'email' and 'backup_email' keys for errors -->
<SFormRow title="Emails" name="email" :errorKey="['email', 'backup_email']">
    <SInput />
</SFormRow>
```

## Custom Submit Handling

If you don't want `SForm` to trigger an Inertia visit automatically, you can omit the `action` prop and act on the `@submit` event yourself.

```vue
<template>
    <SForm v-model="form" @submit="myCustomApiCall">
        <!-- fields -->
    </SForm>
</template>
```

## Form Layout

By default, labels (`title`) appear above inputs. You can place titles to the left of the inputs by setting `titlesAtLeft="true"` on the `SForm`. You can control the width of the left-aligned titles via the `titlesWidth` prop.

```vue
<SForm v-model="form" titlesAtLeft :titlesWidth="250">
    <SFormRow title="Aligned Label" name="field">
        <SInput />
    </SFormRow>
</SForm>
```

## Loading State

When an Inertia request is triggered via the `action` prop, `SForm` automatically enters a loading state. Any `<SButton>` inside the form gets a spinner and becomes unclickable until the request responses.
You can also force this state programmatically via the `loading` prop.

```vue
<SForm loading>
    <!-- Buttons appear loading -->
</SForm>
```

## SForm Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `Record<string, any>` | `{}` | The central object holding all input values. |
| errors | `Record<string, any>` | `{}` | Object containing field validation errors (e.g., from Laravel backend). |
| action | string | `undefined` | URL for the automatic Inertia form submission. |
| method | string | `'post'` | The HTTP method (`post`, `put`, `patch`, `delete`). |
| titlesAtLeft | boolean | `false` | Positions row titles horizontally next to the inputs instead of above. |
| titlesWidth | number \| string | `220` | Width (in pixels) for the row titles when `titlesAtLeft` is true. |
| loading | boolean | `false` | Manually toggles the form's global loading/saving state. |

## SForm Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| submit | `(event: Event)` | Fired when the form is submitted. (Will prevent the default Inertia `router.visit` if defined). |

## SFormRow Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | `undefined` | The key mapping to a property in the parent `SForm`'s `v-model`. Also acts as the default `errorKey` if not provided. |
| title | string | `undefined` | The label text displayed for the row. |
| hint | string | `undefined` | Helpful subtext displayed underneath the input. |
| errorKey | string \| string[] | `undefined` | Specific error key(s) to watch for in the `SForm`'s error list. Supports `*` wildcards. |

## SFormRow Slots

| Name | Description |
|------|-------------|
| default | The input component(s) to wrap. If `name` is provided on `SFormRow`, nested components must support `v-model`. |
| title | Replaces the standard `title` text. |
| hint | Replaces the standard `hint` text. |
