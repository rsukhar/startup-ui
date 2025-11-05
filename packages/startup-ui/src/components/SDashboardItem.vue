<template>
    <div class="s-dashboard-item" :class="{gray, green, red}">
        <div class="s-dashboard-item-header" v-if="title || $slots.title || $slots.extra">
            <div class="s-dashboard-item-title">
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="s-dashboard-item-extra" v-if="$slots.extra">
                <slot name="extra" />
            </div>
        </div>
        <div class="s-dashboard-item-content" :class="[maxContentHeight && 'has_scroll']" :style="contentStyle">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    title: String,
    maxContentHeight: [String, Number],
    gray: Boolean,
    green: Boolean,
    red: Boolean,
});
const contentStyle = computed(() => {
    return props.maxContentHeight ? ('max-height: ' + parseInt(props.maxContentHeight) + 'px') : '';
})
</script>

<style lang="scss">
.s-dashboard-item {
    display: block;
    width: 100%;
    margin-bottom: 30px;
    background-color: var(--s-primary-lightest);
    border-radius: var(--s-border-radius);
    padding: 1.5rem;
    box-sizing: border-box;
    break-inside: avoid;

    &-header {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: space-between;
        margin-bottom: calc(1.4 * var(--s-base-margin));
    }

    &-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    }

    &-extra {
        display: flex;
        align-items: center;
    }

    &-content {
        &.has_scroll {
            overflow-y: auto;
        }
    }

    &.gray {
        background-color: var(--s-bg);
    }
    &.green {
        background-color: var(--s-green-lightest);
    }
    &.red {
        background-color: var(--s-red-lightest);
    }
}
</style>