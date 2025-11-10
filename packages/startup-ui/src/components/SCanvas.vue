<template>
    <div class="s-canvas">
        <header class="s-canvas-header" v-if="$slots.header">
            <slot name="header" />
        </header>
        <div class="s-canvas-subheader" v-if="$slots.subheader">
            <slot name="subheader" />
        </div>
        <slot/>
        <div class="s-main">
            <section class="s-section">
                <div class="s-section-h">
                    <div v-if="$slots.sidebar" class="s-canvas-subheader-mobile" :class="{'opened' : isSidebarMenuOpened}">
                        <div class="s-canvas-subheader-mobile-burger" @click="isSidebarMenuOpened = ! isSidebarMenuOpened">
                            <FontAwesomeIcon icon="bars" />
                            {{ sidebarMobileTitle }}
                        </div>
                    </div>
                    <aside class="s-canvas-sidebar" v-if="$slots.sidebar" :class="{'mobile-opened': isSidebarMenuOpened}">
                        <div v-if="hasStickySidebar" class="affix-wrapper" :style="`top: 20px`">
                            <slot name="sidebar"/>
                        </div>
                        <slot v-else name="sidebar"/>
                    </aside>
                    <div class="s-canvas-content">
                        <slot name="content"/>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    hasStickySidebar: {
        type: Boolean,
        default: false,
    },
    sidebarMobileTitle: {
        type: String,
        default: 'Содержание',
    }
});

const isSidebarMenuOpened = ref(false);

</script>
<style lang="scss">
.s-canvas {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 100%;
    font-family: var(--s-font-family);
    
    &-header {
        display: flex;
        flex-wrap: wrap;
        z-index: 1;
        align-items: center;
        justify-content: start;
        line-height: 60px;
        min-height: 60px;
        background-color: var(--s-bg-header);
        color: var(--s-black);
        width: 100%;
        margin: 0 auto;
        padding: 0 2rem;
        box-sizing: border-box;
        box-shadow: var(--s-shadow);

        a {
            color: var(--s-white);
        }

        @include tablet_desktop() {
            & > *:not(.right) + .right {
                margin-left: auto;
            }
        }
        @include mobile() {
            justify-content: space-between;
        }

        &:hover {
            z-index: 2;
        }

        @include mobile() {
            line-height: 40px;
            gap: 0.5rem;
        }
    }

    &-subheader-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0 1rem;
        gap: 1rem;
        flex-wrap: wrap;
        font-size: var(--s-h2-font-size);
        & > a {
            font-size: 1rem;
            color: var(--s-white);
            opacity: .5;
            &:hover {
                opacity: 1;
                color: var(--s-white);
            }
        }
    }

    &-subheader {
        background-color: var(--s-bg-subheader);
        color: var(--s-white);
        width: 100%;
        padding: 0 2rem;
        box-sizing: border-box;

        // блок с кнопкой содержание
        &-mobile {
            position: relative;
            display: none;
            margin: -28px -28px var(--s-base-margin) -28px;
            padding: 28px 28px 0 28px;

            @include mobile {
                display: flex;
                padding: 28px 28px 0;
                border-top-left-radius: var(--s-border-radius);
                border-top-right-radius: var(--s-border-radius);
                gap: 26px;
                align-items: end;

                &-burger {
                    display: flex;
                    gap: 15px;
                    padding: 8px 17px 8px 10px;
                    color: var(--s-primary);
                    line-height: 1;
                    border: 1px solid var(--s-primary);
                    border-radius: var(--s-border-radius);
                    cursor: pointer;
                }

                &.opened {
                    background-color: var(--s-primary-lightest);
                    .s-subheader-mobile-burger {
                        color: var(--s-white);
                        background-color: var(--s-primary);
                    }
                }

                &:empty {
                    display: none;
                }
            }
        }

        &-menu {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: start;
            margin: 0 -2rem;
            padding: 0 0.5rem;
            overflow-x: auto;
            // прибить меню к низу, когда меню становится flex-элементом
            align-self: end;
        }
    }

    &-sidebar {
        width: 200px;
        margin-right: 4rem;
        box-sizing: border-box;
        flex-shrink: 0;

        @include mobile {
            display: none;
            width: calc(100% + 56px);
            padding: 28px;
            margin: -28px 0 42px -28px;
            border-bottom-left-radius: var(--s-border-radius);
            border-bottom-right-radius: var(--s-border-radius);
            background-color: var(--s-primary-lightest);
            &.mobile-opened {
                display: block;
            }
        }

        &:empty {
            display: none;
        }
    }

    .s-section {
        position: relative;
        margin: 0 auto;
        padding: 0 2rem;
        max-width: 100%;
        &-h {
            position: relative;
            z-index: 1;
            margin: 0 auto;
            padding: 2rem 0 0;
            display: flex;
            flex-direction: column;
            &::after {
                content: "";
                display: block;
                clear: both;
            }
        }

        &-h:has(.s-canvas-sidebar) {
            flex-direction: row;

            @include mobile() {
                flex-direction: column;
            }
        }
    }

    &-content {
        flex-grow: 1;
    }

    .affix-wrapper {
        position: sticky;
    }
}
</style>