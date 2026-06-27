<template>
    <div class="s-table" :class="{hoverable, striped, bordered, compact, topscroll: topScroll, fixedheader: height}" :style="containerStyle">
        <table>
            <thead ref="theadRef" v-if="$slots.header || $slots.headers">
                <tr v-if="$slots.header">
                    <slot name="header" />
                </tr>
                <slot v-else-if="$slots.headers" name="headers" />
            </thead>
            <tbody>
                <template v-if="$slots.row">
                    <tr class="s-table-nodata" v-if="showNoDataMessage">
                        <td colspan="100">
                            <slot name="nodata">{{ nodataText }}</slot>
                        </td>
                    </tr>
                    <tr v-for="(row, index) in data" :key="`${index}-stable`">
                        <slot name="row" :row="row" :index="index" />
                    </tr>
                </template>
                <slot v-else />
            </tbody>
            <tfoot v-if="$slots.footer || $slots.footers">
                <tr v-if="$slots.footer">
                    <slot name="footer" />
                </tr>
                <slot v-if="$slots.footers" name="footers" />
            </tfoot>
        </table>
    </div>
</template>
<script setup lang="ts" generic="T">
import { computed } from "vue";
import { t } from '../locale';

const props = defineProps<{
    data?: T[] | Record<string | number, T>;
    hoverable?: boolean;
    striped?: boolean;
    bordered?: boolean;
    /**
     * Tighter cell padding for dense / data-heavy tables
     */
    compact?: boolean;
    nodata?: string;
    fixedHeader?: boolean;
    height?: string;
    topScroll?: boolean;
}>();

// Empty state text: the prop takes priority over the localized default
const nodataText = computed(() => props.nodata ?? t('table.noData'));

// Should the "no data" message be shown?
const showNoDataMessage = computed(() => {
    // When no data is passed at all, don't show it — means data is inserted directly into the slot
    if ( ! props.data) return false;
    if (props.data instanceof Array) return props.data.length === 0;
    return Object.values(props.data).length === 0;
});

const containerStyle = computed(() => {
    const result: Record<string, string> = {};
    if (props.height) {
        result.height = props.height;
    }
    return result;
});
</script>
<style lang="scss">
.s-table {
    width: 100%;
    max-width: 100vw;
    overflow-x: auto;
    margin-bottom: var(--s-base-margin);
    font-family: var(--s-font-family);
    & > table {
        border-collapse: collapse;
        width: 100%;
        max-width: 100vw;
    }
    &.topscroll {
        &, & > table {
            transform: rotateX(180deg);
        }
        & > table {
            margin-bottom: 0;
        }
    }
    &.fixedheader {
        thead,
        tfoot {
            position: sticky;
            z-index: 1;
            box-shadow: inset 0 -1px var(--s-border);
            border-bottom: 0 !important;
            background-color: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px); /* Safari support */
        }
        thead {
            top: 0;
        }
        tfoot {
            bottom: 0;
        }
    }

    td,
    th {
        padding: 0.8rem;
        border-bottom: 1px solid var(--s-border);
        // Default alignment by column position: first — left, last — right, the rest — center.
        // Applies to both td and th so header cells follow the same per-column alignment.
        text-align: center;
        a {
            vertical-align: middle;
        }
        p:last-child {
            margin: 0;
        }
        &:first-child {
            text-align: left;
        }
        &:last-child {
            text-align: right;
        }
        // Utility classes override the positional defaults (declared after them on purpose)
        &.left {
            text-align: left;
        }
        &.center {
            text-align: center;
        }
        &.right {
            text-align: right;
        }
        &.nowrap {
            white-space: nowrap;
        }
    }
    thead {
        td,
        th {
            font-size: 0.9em;
            font-weight: bold;
            & a {
                color: inherit;
            }
            & a:hover {
                color: var(--s-primary);
            }
            &.asc a,
            &.desc a {
                color: var(--s-primary);
                &:after {
                    display: inline-block;
                    vertical-align: top;
                    content: "↓";
                    margin-left: 0.3rem;
                    font-size: 18px;
                }
            }
            &.desc a:after {
                content: "↑";
            }
        }
    }
    tfoot {
        td,
        th {
            background-color: var(--s-bg);
            font-weight: bold;
            border-bottom: 0;
        }
    }
    &.bordered {
        th, td {
            border: 1px solid var(--s-border);
        }
    }
    &:not(.bordered) td:first-child,
    &:not(.bordered) th:first-child {
        padding-left: 0;
    }
    &:not(.bordered) td:last-child,
    &:not(.bordered) th:last-child {
        padding-right: 0;
    }
    // Denser cells for data-heavy tables; first/last-child side padding rules above still win
    &.compact td,
    &.compact th {
        padding: 0.5rem;
    }
    &.striped {
        tbody tr:nth-of-type(even) {
            background-color: var(--s-primary-lightest);
        }
    }
    &.hoverable {
        tbody tr:hover,
        tbody tr.hover {
            background-color: var(--s-primary-lightest);
        }
    }

    &-nodata {
        color: var(--s-text-light);
        text-align: center !important;
        & > td > *:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
