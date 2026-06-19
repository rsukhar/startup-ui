<template>
    <div class="s-verticalmenu">
        <div class="s-verticalmenu-item"
             v-for="link in links"
             :key="link.label"
             :class="[link.className, link.active ? 'active' : '', link.type ? 'type_' + link.type : '']"
        >
            <template v-if="link.url">
                <div class="s-verticalmenu-toggler" v-if="link.children" @click="toggleItem(link.id)"
                     :class="{'is-opened' : openedItems.includes(link.id)}">
                    <SIconChevron />
                </div>
                <component :is="linkComponent" class="s-verticalmenu-label"
                      :class="{'not-published': link.isPublished !== undefined && !link.isPublished}" :href="link.url">
                    {{ link.label }}
                    <SIconEyeSlash v-if="link.isPublished !== undefined && !link.isPublished" />
                </component>
            </template>
            <div class="s-verticalmenu-label"
                 :class="{'not-published': link.isPublished !== undefined && !link.isPublished}"
                 @click="toggleItem(link.id)" v-else>
                <div class="s-verticalmenu-toggler" v-if="link.children"
                     :class="{'is-opened' : openedItems.includes(link.id)}">
                    <SIconChevron />
                </div>
                {{ link.label }}
                <SIconEyeSlash v-if="link.isPublished !== undefined && !link.isPublished" />
            </div>
            <div class="s-verticalmenu-children" v-if="link.children"
                 :class="{'is-opened' : openedItems.includes(link.id)}">
                 <SVerticalMenu :links="link.children" :expandedKeys="expandedKeys" :storeExpandedKeysTo="storeExpandedKeysTo"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SIconChevron, SIconEyeSlash } from './icons';
import { useStorage } from "@vueuse/core";
import { getStartupUiLink } from '../config';

export interface SVerticalMenuLink {
    id: string | number;
    label: string;
    url?: string;
    active?: boolean;
    className?: string;
    type?: string;
    isPublished?: boolean;
    children?: SVerticalMenuLink[];
}

export interface SVerticalMenuProps {
    // In the format [{label: '', url: '', active: ''}]
    links?: SVerticalMenuLink[];
    // Nodes opened on start
    expandedKeys?: (string | number)[];
    // Store expanded nodes in localStorage?
    storeExpandedKeysTo?: string;
}

const props = withDefaults(defineProps<SVerticalMenuProps>(), {
    links: () => [],
    expandedKeys: () => [],
});

// SPA link component (e.g. Inertia's Link) if registered, otherwise a plain <a>
const linkComponent = computed(() => getStartupUiLink() ?? 'a');

const getExpandedKeys = function(links: SVerticalMenuLink[]): (string | number)[] {
    let result: (string | number)[] = [];
    for (let link of links) {
        const expandedChildren = link.children ? getExpandedKeys(link.children) : [];
        // Collect active nested items and pass them upward recursively
        if (expandedChildren.length) result = result.concat(expandedChildren);
        // If there are expanded nested items, consider the current item expanded too
        if (link.active || expandedChildren.length) result.push(link.id);
    }
    return result;
};

// On start, all ancestors of the active page are open, along with those whose keys were passed in expandedKeys
const initialOpened = computed(() => [
    ...getExpandedKeys(props.links),
    ...props.expandedKeys
]);

// Whether to store the state in localStorage or not
const openedItems = props.storeExpandedKeysTo
    ? useStorage<(string | number)[]>(props.storeExpandedKeysTo, initialOpened.value)
    : ref<(string | number)[]>(initialOpened.value);

const toggleItem = function(id: string | number) {
    openedItems.value = openedItems.value.includes(id) 
        ? openedItems.value.filter(i => i !== id) 
        : [...openedItems.value, id];
}
</script>

<style lang="scss">
.s-verticalmenu {
    &-item {
        position: relative;
        padding: 4px 0;
        padding-left: 20px;
        font-family: var(--s-font-family);
        & > .s-verticalmenu-label {
            font-size: 16px;
        }

        &.active {
            & > .s-verticalmenu-label {
                color: var(--s-primary);
                font-weight: bold;
            }
        }

        &.type_section {
            margin-top: 8px;
            margin-bottom: 8px;

            & > .s-verticalmenu-label {
                font-weight: bold;
            }
        }
    }

    &-label {
        .s-verticalmenu-item.type_section > &:hover {
            cursor: pointer;
            color: var(--s-primary-darkest);
        }

        &.not-published {
            opacity: 0.5;

            & > svg {
                font-size: 10px;
                margin-left: 2px;
            }
        }
    }

    &-toggler {
        position: absolute;
        width: 22px;
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        left: -6px;
        top: 5px;
        text-align: center;
        cursor: pointer;

        & > svg {
            transform: rotate(0deg);
            transition-property: transform;
            transition-duration: 0.3s;
            transition-timing-function: ease;
        }

        &:not(.is-opened) > svg {
            transform: rotate(-90deg);
        }

        .s-verticalmenu-item:not(.type_section) > &:hover {
            color: var(--s-primary-darkest);
        }
    }

    &-children {
        padding-top: 4px;

        &:not(.is-opened) {
            display: none;
        }
    }
}
</style>
