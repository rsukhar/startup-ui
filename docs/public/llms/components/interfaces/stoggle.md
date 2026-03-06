# SToggleGroup & SToggle

Expandable blocks (accordions). Allow showing and hiding content. `SToggle` can be used individually or inside an `SToggleGroup`.

## Import

```javascript
import { SToggleGroup, SToggle } from 'startup-ui';
```

## Basic Example

```vue
<SToggle title="What guarantees do you provide?">
    <p><strong>Results before payment.</strong> After registration, you receive a starting balance to run a quick test and get your first results.</p>
</SToggle>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SToggle title="What guarantees do you provide?">
        <p><strong>Results before payment.</strong> After registration, you receive a starting balance to run a quick test and get your first results.</p>
    </SToggle>
</template>

<script setup>
import { SToggle } from 'startup-ui';
<\/script>
```
</details>

## Opened by Default

To render a toggle opened initially, add the `opened` attribute:

```vue
<SToggle title="What guarantees do you provide?" opened>
    <p>Detailed answer...</p>
</SToggle>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SToggle title="What guarantees do you provide?" opened>
        <p><strong>Results before payment.</strong> After registration, you receive a starting balance to run a quick test and get your first results.</p>
    </SToggle>
</template>

<script setup>
import { SToggle } from 'startup-ui';
<\/script>
```
</details>

## Custom Title Content

If simple text is not enough for the title, use the `#title` slot:

```vue
<SToggle>
    <template #title>Pay attention <span class="badge">1</span></template>
    When funding your account via credit card, you get a bonus.  
</SToggle>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SToggle>
        <template #title>Pay attention <STag color="primary-darkest">1</STag></template>
        When funding your account via credit card, you get a 10,000 ruble bonus.  
    </SToggle>
</template>

<script setup>
import { SToggle, STag } from 'startup-ui';
<\/script>
```
</details>

## Group of Blocks (Accordion)

When multiple `SToggle` components are wrapped in an `SToggleGroup`, by default only **one** block can be opened at a time (opening one closes the others).

```vue
<SToggleGroup>
    <SToggle title="How long will it take?">5 minutes a day. Setup usually takes 5-30 minutes.</SToggle>
    <SToggle title="Guarantees">Results before payment!</SToggle>
</SToggleGroup>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SToggleGroup>
        <SToggle title="How long will it take?">5 minutes a day. Setup usually takes 5-30 minutes.</SToggle>
        <SToggle title="Guarantees">Results before payment. After registration, you receive a starting balance to run a quick test and get your first results.</SToggle>
    </SToggleGroup>
</template>

<script setup>
import { SToggleGroup, SToggle } from 'startup-ui';
<\/script>
```
</details>

## Allow Multiple Open Blocks

To allow multiple blocks to be opened simultaneously within a group, add the `multiple` attribute to `SToggleGroup`:

```vue
<SToggleGroup multiple>
    <SToggle title="How long will it take?">5 minutes a day.</SToggle>
    <SToggle title="Guarantees">Results before payment.</SToggle>
</SToggleGroup>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SToggleGroup multiple>
        <SToggle title="How long will it take?">5 minutes a day. Setup usually takes 5-30 minutes.</SToggle>
        <SToggle title="Guarantees">Results before payment. After registration, you receive a starting balance to run a quick test and get your first results.</SToggle>
    </SToggleGroup>
</template>

<script setup>
import { SToggleGroup, SToggle } from 'startup-ui';
<\/script>
```
</details>

## Colors

The `color` attribute applies different background styles to the `SToggle` header block.

```vue
<SToggle title="Default (bg) color" color="bg">...</SToggle>
<SToggle title="Primary color" color="primary">...</SToggle>
<SToggle title="Green color" color="green">...</SToggle>
<SToggle title="Red color" color="red">...</SToggle>
```

## SToggleGroup Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| multiple | boolean | false | If `true`, allows multiple SToggles inside the group to be opened simultaneously |

## SToggle Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | undefined | The text displayed in the toggle header |
| opened | boolean | false | If `true`, the content block is open by default |
| color | `'bg'` \| `'primary'` \| `'red'` \| `'green'` | `'bg'` | Background color scheme for the SToggle component |

## SToggle Slots

| Name | Description |
|------|-------------|
| title | Custom content for the toggle header (overrides `title` prop) |
| default | Hidden content body that expands when toggled |
