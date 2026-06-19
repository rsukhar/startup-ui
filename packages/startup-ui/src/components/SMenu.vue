<template>
    <div class="s-menu">
        <div class="s-menu-item"
             :class="[{ active: item.active, has_dropdown: item.children && item.children.length }, item.class]"
             v-for="item in items" :key="item.label">
            <component :is="linkTag(item)" :href="item.url" :target="linkTarget(item)">
                <img v-if="item.avatar" :src="item.avatar" alt="" class="s-menu-item-avatar" />
                <component v-else-if="item.icon" :is="iconRenderer" :icon="item.icon" />
                <span :data-text="item.label" v-if="item.label">{{ item.label }}</span>
                <div class="s-menu-item-counter" v-if="item.counter">{{ item.counter }}</div>
                <SIconChevron v-if="item.children && item.children.length" class="s-menu-item-caret" />
                <div class="s-menu-item-triangle" v-if="item.active"></div>
            </component>
            <div class="s-menu-dropdown" v-if="item.children && item.children.length">
                <component v-for="child in item.children" :key="child.label"
                           :is="linkTag(child)" :href="child.url" :method="child.method"
                           :target="linkTarget(child)" :class="{ active: child.active }">
                    <component v-if="child.icon" :is="iconRenderer" :icon="child.icon" />
                    <span>{{ child.label }}</span>
                    <div class="s-menu-item-counter" v-if="child.counter">{{ child.counter }}</div>
                </component>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getStartupUiLink, getStartupUiIcon } from '../config';
import { SIconChevron } from './icons';

export interface SMenuItem {
    label?: string;
    url?: string;
    /** Custom icon name passed to the icon renderer (FontAwesome by default). */
    icon?: string | string[];
    /** Image URL shown instead of an icon (rendered as a round avatar). */
    avatar?: string;
    /** Small badge with a number/text (e.g. an unread count). */
    counter?: string | number;
    active?: boolean;
    /** HTTP method for SPA navigation links (e.g. 'post' for a logout link). */
    method?: string;
    /** Extra class on the menu item. */
    class?: string;
    children?: SMenuItem[];
}

export interface SMenuProps {
    // In the format [{ label, url, icon, avatar, counter, active, children: [...] }]
    items?: SMenuItem[];
}

withDefaults(defineProps<SMenuProps>(), {
    items: () => [],
});

// SPA link component (e.g. Inertia's Link) if registered, otherwise a plain <a>.
const linkComponent = computed(() => getStartupUiLink() ?? 'a');
// Renderer for the icon prop: an injected component, falling back to a global 'FontAwesomeIcon'.
const iconRenderer = computed(() => getStartupUiIcon() ?? 'FontAwesomeIcon');

// External links open in a new tab with a plain <a>; local (relative or same-origin) links use
// the SPA link component for client-side navigation.
const absoluteUrlRegex = /https?:\/\//u;
const isLocalUrl = (url?: string): boolean => {
    if (!url) return true;
    if (!absoluteUrlRegex.test(url)) return true;
    return typeof window !== 'undefined' && url.includes(window.location.protocol + '//' + window.location.host);
};
const linkTag = (item: SMenuItem) => (item.url && isLocalUrl(item.url)) ? linkComponent.value : 'a';
const linkTarget = (item: SMenuItem) => (item.url && isLocalUrl(item.url)) ? undefined : '_blank';
</script>

<style lang="scss">
.s-menu {
    display: flex;
    flex-wrap: wrap;
    line-height: 50px;
    align-items: center;
    font-family: var(--s-font-family);

    &-item {
        position: relative;
        padding: 0 15px;
        white-space: nowrap;

        &-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            object-fit: cover;
        }

        &-caret {
            font-size: 0.7em;
        }

        // Round badge with a count (e.g. number of tickets).
        &-counter {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: bold;
            line-height: 1;
            color: var(--s-white);
            background-color: var(--s-yellow);
            flex-shrink: 0;
        }

        &-triangle {
            display: block;
            position: absolute;
            bottom: 0;
            content: '';
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 10px solid var(--s-bg-subheader);
            left: 50%;
            margin-left: -15px;
        }

        & > a {
            display: flex;
            align-items: center;
            gap: 5px;
            margin: 0 -15px;
            padding: 0 15px;
            text-decoration: none;
            color: inherit;
        }

        &:hover {
            background-color: var(--s-primary-dark);
            color: var(--s-white);
            & > a {
                color: inherit;
            }
        }

        &.active > a > span {
            font-weight: bold;
        }
    }

    &-dropdown {
        position: absolute;
        display: flex;
        flex-direction: column;
        visibility: hidden;
        top: 50px;
        right: 0;
        min-width: 100%;
        line-height: 40px;
        padding-bottom: 10px;
        box-shadow: var(--s-shadow);
        background-color: var(--s-primary-dark);

        a,
        button {
            display: flex;
            padding: 0 15px;
            white-space: nowrap;
            gap: 5px;
            align-items: center;
            // A child with a `method` (e.g. "Log out") renders as a <button> in Inertia v3 —
            // reset native button styles so it looks like the surrounding links.
            border: 0;
            background: none;
            font: inherit;
            color: inherit;
            text-align: left;
            text-decoration: none;
            cursor: pointer;

            &.active {
                font-weight: bold;
            }
            &:hover {
                background-color: var(--s-primary);
                color: var(--s-white);
            }
        }
    }

    &-item:hover,
    &-item:active {
        z-index: 100;
        &.has_dropdown {
            box-shadow: var(--s-shadow);
            .s-menu-dropdown {
                visibility: visible;
            }
            .s-menu-item-triangle {
                display: none;
            }
        }
    }
}
</style>
