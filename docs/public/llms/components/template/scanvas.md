# SCanvas

The main layout wrapper component for the application. It structures the page into a header, subheader, sidebar, and main content area, while handling mobile responsiveness automatically (like hiding the sidebar behind a burger menu on mobile).

## Import

```javascript
import { SCanvas } from 'startup-ui';
```

## Basic Layout Example

Use the provided slots to assemble your page architecture.

```vue
<SCanvas>
    <!-- Top navigation bar -->
    <template #header>
        <div class="logo">My App</div>
        <nav>
            <a href="/">Home</a>
            <a href="/settings">Settings</a>
        </nav>
    </template>

    <!-- Secondary header (optional) -->
    <template #subheader>
        <div class="s-canvas-subheader-title">
            Page Title
        </div>
    </template>

    <!-- Left sidebar navigation -->
    <template #sidebar>
        <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
        </ul>
    </template>

    <!-- Main page content -->
    <template #content>
        <p>This is the main area where the router view or page content goes.</p>
    </template>

    <!-- Any content outside the main layout grid (e.g., SFooter) can be put in the default slot -->
    <SFooter>
        <p>Copyright 2026</p>
    </SFooter>
</SCanvas>
```

<details>
<summary>Composition API Layout Example</summary>

```vue
<template>
    <SCanvas :has-sticky-sidebar="true" sidebar-mobile-title="Menu">
        <template #header>
            <a href="/">Logotype</a>
            <div class="right">
                <span>User Profile</span>
            </div>
        </template>
        
        <template #subheader>
            <div class="s-canvas-subheader-title">
                Dashboard
            </div>
            <div class="s-canvas-subheader-menu">
                <a href="#stats">Statistics</a>
            </div>
        </template>
        
        <template #sidebar>
            <nav class="sidebar-nav">
                <!-- Sidebar links -->
            </nav>
        </template>
        
        <template #content>
            <div class="page-dashboard">
                <!-- Page body -->
            </div>
        </template>
    </SCanvas>
</template>

<script setup>
import { SCanvas } from 'startup-ui';
<\/script>
```
</details>

## Modifying the Sidebar

You can make the sidebar sticky (so it scrolls with the page) using the `hasStickySidebar` prop. You can also rename the button that opens the sidebar on mobile devices using `sidebarMobileTitle`.

```vue
<SCanvas :hasStickySidebar="true" sidebarMobileTitle="Navigation">
    <!-- ... slots ... -->
</SCanvas>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| hasStickySidebar | boolean | `false` | If true, applies `position: sticky` to the sidebar so it remains visible while scrolling the main content. |
| sidebarMobileTitle | string | `'Содержание'` | The text displayed next to the burger icon to toggle the sidebar on mobile screens. |

## Slots

| Name | Description |
|------|-------------|
| header | The top-most navigation bar. Items with the class `.right` will be pushed to the right side on desktop. |
| subheader | A secondary header below the main header, often used for page titles or secondary tabs. |
| sidebar | The left-hand navigation sidebar. On mobile, this is hidden by default and accessible via a burger menu. |
| content | The main area for the page content. Takes up the remaining space next to the sidebar. |
| default | Renders between the subheader and the main `sidebar`/`content` section. Commonly used for page-wide alerts or appending `SFooter` at the end of the canvas. |
---

# SFooter

A simple container component used to display the page footer. It is typically placed inside the default slot of `SCanvas`.

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

## Placement inside SCanvas

```vue
<template>
    <SCanvas>
        <template #content>
            <p>Main page content...</p>
        </template>

        <!-- SFooter is usually placed here -->
        <SFooter>
            <div class="s-footer-h">
                <a href="/about">About Us</a>
                <a href="/contacts">Contact</a>
            </div>
        </SFooter>
    </SCanvas>
</template>
```

## Utility Classes

While `SFooter` has no props of its own, its CSS includes an `.s-footer-h` class specifically designed to center the content with a maximum width (`1200px`):

```vue
<SFooter>
    <div class="s-footer-h">
        <!-- Content will be centered with a max-width and flex gap -->
        <div>Column 1</div>
        <div>Column 2</div>
    </div>
</SFooter>
```

## SFooter Slots

| Name | Description |
|------|-------------|
| default | The content of the footer block. |
