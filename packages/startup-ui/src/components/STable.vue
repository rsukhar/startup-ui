<template>
    <div class="s-table" :class="{hoverable, striped, bordered, topscroll: topScroll, fixedheader: height}" :style="containerStyle">
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
                            <slot name="nodata">{{ nodata }}</slot>
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
<script setup>
import { computed } from "vue";

const props = defineProps({
    data: [Array, Object],
    hoverable: Boolean,
    striped: Boolean,
    bordered: Boolean,
    nodata: {
        type: String,
        default: 'Ничего не найдено',
    },
    fixedHeader: Boolean,
    height: String,
    topScroll: Boolean
});

// Нужно ли показывать сообщение о том, что нет данных?
const showNoDataMessage = computed(() => {
    // Когда данные вообще не переданы, не показываем — значит данные подставляются напрямую в слот
    if ( ! props.data) return false;
    if (props.data instanceof Array) return props.data.length === 0;
    return Object.values(props.data).length === 0;
});

const containerStyle = computed(() => {
    const result = {};
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
        thead td {
            position: sticky;
            top: 0;
            box-shadow: inset 0 -1px var(--s-border);
            border-bottom: 0 !important;
            background-color: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px); /* Safari support */
        }
    }

    td {
        padding: 0.8rem;
        border-bottom: 1px solid var(--s-border);
        a {
            vertical-align: middle;
        }
        p:last-child {
            margin: 0;
        }
        &.nowrap {
            white-space: nowrap;
        }
        &.right {
            text-align: right;
        }
        &.center {
            text-align: center;
        }
    }
    thead {
        td {
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
        td {
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
    &:not(.bordered) td:first-child { 
        padding-left: 0; 
    }
    &:not(.bordered) td:last-child { 
        padding-right: 0; 
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
