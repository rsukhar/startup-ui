# SFooter

A simple container component used to display the page footer.

## Import

```javascript
import { SFooter } from 'startup-ui';
```

## Basic Example

The footer accepts content via its default slot and provides base styling with a dark header background (`var(--s-bg-header)`). Links inside the footer are automatically styled to contrast with the dark background.

```vue
<SFooter>
    <div class="s-footer-h">
        <div class="logo-and-socials">
            <span>Startup UI © 2026</span>
        </div>
        <div class="rights">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
        </div>
    </div>
</SFooter>
```

<details>
<summary>Composition API Layout Example</summary>

```vue
<template>
    <!-- Typically placed inside SCanvas default slot -->
    <SCanvas>
        <template #content>
            <p>Main page content...</p>
        </template>

        <SFooter>
            <div class="s-footer-h">
                <a href="/about">About Us</a>
                <a href="/contacts">Contact</a>
            </div>
        </SFooter>
    </SCanvas>
</template>

<script setup>
import { SCanvas, SFooter } from 'startup-ui';
<\/script>
```
</details>

## Utility Classes

While `SFooter` has no props of its own, its CSS includes an `.s-footer-h` class specifically designed to center the content with a maximum width (`1200px`), making layout easier:

```vue
<SFooter>
    <div class="s-footer-h">
        <!-- Content will be centered with a max-width and flex gap -->
        <div>Column 1</div>
        <div>Column 2</div>
    </div>
</SFooter>
```

## Slots

| Name | Description |
|------|-------------|
| default | The content of the footer block. |
