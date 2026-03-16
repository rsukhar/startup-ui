<template>
    <div class="s-horizontalmenu">
        <template v-for="link in links" :key="link.label">
            <slot v-if="$slots['item-' + slotKey(link.label)]" :name="'item-' + slotKey(link.label)" :link="link" />
            <div v-else class="s-horizontalmenu-item" :class="[link.className, link.active ? 'active' : '']">
                <Link class="s-horizontalmenu-label" v-if="link.url" :href="link.url">{{ link.label }}</Link>
                <div class="s-horizontalmenu-label" v-else>{{ link.label }}</div>

                <div class="s-horizontalmenu-children" v-if="link.children">
                    <SHorizontalMenu :links="link.children" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

export interface SHorizontalMenuLink {
    label: string;
    url?: string;
    active?: boolean;
    stat?: string | number;
    className?: string;
    children?: SHorizontalMenuLink[];
}

export interface SHorizontalMenuProps {
    // В формате [{label: '', url: '', active: '', stat: ''}]
    links?: SHorizontalMenuLink[];
}

withDefaults(defineProps<SHorizontalMenuProps>(), {
    links: () => [],
});

function slotKey(label: string): string {
    return label.toLowerCase().replace(/\s+/g, '-');
}
</script>

<style lang="scss">
.s-horizontalmenu {
    display: flex;
    align-items: center;
    justify-content: start;
    font-family: var(--s-font-family);
    &-label {
        display: block;
    }

    &-item {
        &.active {
            > .s-horizontalmenu-label {
                &:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -15px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 15px 10px 15px;
                    border-color: transparent transparent var(--s-white) transparent;
                    transform: rotate(0deg);
                }

                @include mobile() {
                    font-weight: 700;
                }
            }
        }
    }

    &-label {
        height: 60px;
        line-height: 60px;
        position: relative;
        color: var(--s-white);
        padding: 0 1.5rem;
        white-space: nowrap;
        border-radius: 6px 6px 0 0;
        &:hover {
            background: var(--s-primary-light);
            color: var(--s-white);
        }
    }

    &-children {
        display: none;
    }
}
</style>
