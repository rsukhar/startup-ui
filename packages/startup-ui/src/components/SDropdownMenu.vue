<template>
    <div class="s-dropdownmenu" @pointerenter="placeList" ref="$container">
        <component :is="labelComponent" class="s-dropdownmenu-label" :href="labelLink ?? ''">
            <slot v-if="$slots.label" name="label" />
            <span v-else>{{ labelText }}</span>
            <FontAwesomeIcon icon="caret-down" />
        </component>
        <div class="s-dropdownmenu-list" ref="$list" :class="[direction]">
            <component :is="linkComponent" v-if="links" v-for="link in links" :key="link.label" :href="link.url ?? ''" :class="{ active: link.active }">
                {{ link.label }}
            </component>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, computed, nextTick } from 'vue';
import { getStartupUiLink } from '../config';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { t } from '../locale';

export interface SDropdownMenuLink {
    label: string;
    url?: string;
    active?: boolean;
}

export interface SDropdownMenuProps {
    // In the format [{label: '', url: '', active: ''}]
    links?: SDropdownMenuLink[];
    // Used when no item is selected and no label is set
    placeholder?: string;
    // If set, always displayed regardless of the selected item
    label?: string;
    // If set, always used regardless of the selected item
    labelLink?: string;
}

const props = withDefaults(defineProps<SDropdownMenuProps>(), {
    links: () => [],
});

// The active selected link among the provided links
const activeLink = computed(() => {
    for (let link of props.links) {
        if (link.active) return JSON.parse(JSON.stringify(link)) as SDropdownMenuLink;
    }
    return null;
});

// Which text to show on the label (placeholder takes priority over the localized default)
const labelText = computed(() => props.label ?? (activeLink.value ? activeLink.value.label : (props.placeholder ?? t('dropdownMenu.placeholder'))));

// Which URL to show on the label
const labelUrl = computed(() => props.labelLink ?? activeLink.value?.url);

// SPA link component (e.g. Inertia's Link) if registered, otherwise a plain <a>
const linkComponent = computed(() => getStartupUiLink() ?? 'a');

// Which component to render the label with
const labelComponent = computed(() => labelUrl.value ? linkComponent.value : 'span');

const $container = useTemplateRef<HTMLElement>('$container');
const $list = useTemplateRef<HTMLElement>('$list');
const direction = ref('right');

const placeList = async () => {
    await nextTick();
    if (!$container.value || !$list.value) return;
    const labelX = $container.value.getBoundingClientRect().x;
    const menuWidth = $list.value.getBoundingClientRect().width;
    direction.value = menuWidth + 10 > labelX ? 'left' : 'right';
}
</script>

<style lang="scss">
.s-dropdownmenu {
    flex-shrink: 0;
    position: relative;
    border-radius: var(--s-border-radius);
    font-family: var(--s-font-family);
    
    a {
        display: flex;
        flex-wrap: nowrap;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
            color: var(--s-white) !important;
            background-color: var(--s-primary-light);
        }
    }
    
    &-label {
        display: flex;
        padding: 0 20px;
        gap: 20px;
        align-items: center;
        vertical-align: top;
        border-radius: var(--s-border-radius) var(--s-border-radius) 0 0;
        & > a {
            @include mobile() {
                padding: 0 10px;
            }
            svg {
                margin-left: 20px;

                @include mobile() {
                    margin-left: 10px;
                }
            }
        }
    }

    &-list {
        display: none;
        position: absolute;
        overflow: hidden;
        min-width: 100%;
        border-radius: 0 0 var(--s-border-radius) var(--s-border-radius);
        background-color: var(--s-primary-lightest);
        box-shadow: var(--s-shadow);

        & > a {
            padding: 0 20px;
            line-height: 3rem;
        }
    }

    &:hover {
        background-color: var(--s-primary-lightest);
        color: var(--s-primary);
        border-radius: var(--s-border-radius) var(--s-border-radius) 0 0;
        .s-dropdown-label {
            z-index: 4;
        }
        .s-dropdownmenu-list {
            display: block;
            z-index: 3;
        }
    }

    &.right &-list {
        right: 0;
    }

    @include mobile(){
        &-list.right {
            right: 0;
        }
        &-list.left {
            left: 0;
        }
        &.right &-list {
            right: unset;
        }
    }
}
</style>
