<template>
<div class="s-timeline">
    <div class="s-timeline-row" v-for="(item, index) in items" :key="keyOf(item, index)">
        <div class="s-timeline-decorator">
            <div class="s-timeline-decorator-marker"></div>
            <div class="s-timeline-decorator-line"></div>
        </div>
        <div class="s-timeline-item">
            <slot name="item" :item="item" :index="index">{{ item }}</slot>
        </div>
    </div>
</div>
</template>

<script setup lang="ts" generic="T">
const props = withDefaults(defineProps<{
    items?: T[];
    keyBy?: string | ((item: T, index: number) => string | number);
}>(), {
    keyBy: 'id',
});

function keyOf(item: T, index: number): string | number {
    if (typeof props.keyBy === 'function') return props.keyBy(item, index);
    if (typeof props.keyBy === 'string' && item && typeof item === 'object' && props.keyBy in item) {
        return (item as any)[props.keyBy];
    }
    return index;
}
</script>

<style lang="scss">
.s-timeline {
    display: flex;
    flex-direction: column;
    font-family: var(--s-font-family);
    &-row {
        display: flex;
        align-items: stretch;
    }
    &-decorator {
        width: 32px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: start;
        flex-shrink: 0;
        &-marker {
            border-width: 2px;
            border-style: solid;
            border-color: var(--s-primary);
            border-radius: 50%;
            width: 12px;
            height: 12px;
            margin-top: 5px;
        }
        &-line {
            width: 2px;
            background-color: var(--s-primary);
            flex-grow: 1;
            margin-bottom: -5px;
            margin-left: 5px;
            .s-timeline-row:last-child & {
                display: none;
            }
        }
    }
    &-item {
        padding-bottom: var(--s-base-margin);
    }

    &-row:last-child &-item {
        padding-bottom: initial;
    }
}
</style>