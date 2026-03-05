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
