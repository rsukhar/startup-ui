# STooltip

Question icon with a tooltip hover. The tooltip text is rendered through a default slot, so it can include HTML and links. 
The event logic allows moving the mouse from the icon to the tooltip to interact with its content (e.g., clicking links inside it).

## Import

```javascript
import { STooltip } from 'startup-ui';
```

## Basic Example

```vue
<STooltip>Search snippet impressions count from the last day</STooltip>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <p>
        Impressions 
        <STooltip>Search snippet impressions count from the last day</STooltip>
    </p>
</template>

<script setup>
import { STooltip } from 'startup-ui';
<\/script>
```
</details>

## Fixed Positioning

By default, the tooltip position is calculated dynamically based on available screen space. If you want to force a specific position, use the `at` attribute:

```vue
<STooltip at="top">Tooltip on Top</STooltip>
<STooltip at="right">Tooltip on Right</STooltip>
<STooltip at="bottom">Tooltip on Bottom</STooltip>
<STooltip at="left">Tooltip on Left</STooltip>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-row">
        <div>Top <STooltip at="top">Tooltip on Top</STooltip></div>
        <div>Right <STooltip at="right">Tooltip on Right</STooltip></div>
        <div>Bottom <STooltip at="bottom">Tooltip on Bottom</STooltip></div>
        <div>Left <STooltip at="left">Tooltip on Left</STooltip></div>
    </div>
</template>

<script setup>
import { STooltip } from 'startup-ui';
<\/script>
```
</details>

## Custom Icon

Replace the default "circle-question" icon with any other FontAwesome icon using the `icon` attribute:

```vue
<STooltip icon="circle-info">Custom Icon Tooltip</STooltip>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div>
        Alternative Icon Info <STooltip icon="circle-info">Custom Icon Tooltip</STooltip>
    </div>
</template>

<script setup>
import { STooltip } from 'startup-ui';
<\/script>
```
</details>

## Custom Icon Slot

If you need a completely custom trigger element (like an emoji, regular text, or a specific Vue component) instead of the FontAwesome icon, use the `#icon` slot:

```vue
<STooltip>
    <template #icon>❓</template>
    Using emoji as a trigger element
</STooltip>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div>
        Custom Trigger 
        <STooltip>
            <template #icon><span class="badge">HELP</span></template>
            Using a custom badge element instead of FontAwesome icon
        </STooltip>
    </div>
</template>

<script setup>
import { STooltip } from 'startup-ui';
<\/script>
```
</details>

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| at | `'top'` \| `'bottom'` \| `'right'` \| `'left'` \| `null` | `null` | Forces the tooltip position. By default calculates automatically |
| icon | string \| string[] | `'circle-question'` | FontAwesome icon name to trigger the tooltip |

## Slots

| Name | Description |
|------|-------------|
| default | Content inside the tooltip text bubble. Supports HTML. |
| icon | Overrides the default FontAwesome icon trigger. Use to place emojis, texts or custom elements. |
