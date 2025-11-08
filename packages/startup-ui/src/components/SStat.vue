<template>
    <div class="s-stat" :class="{nowrap, large, wide}">
        <div class="s-stat-title">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="s-stat-value">
            <slot>{{ value }}</slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    value: [String, Number],
    nowrap: Boolean,
    large: Boolean,
    wide: Boolean,
});
</script>

<style lang="scss">
.s-stat {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 1.5rem;
    align-items: center;

    &-title {
        width: var(--s-stat-title-width, 170px);
        display: flex;
        align-items: center;
        gap: 5px;
    }

    &-value {
        font-weight: bold;
        flex-grow: 1;
    }

    &.large {
        .s-stat-value {
            font-size: var(--s-h2-font-size);
            font-weight: bold;
            line-height: 32px;
        }
    }

    &.nowrap {
        flex-wrap: nowrap;
        .s-stat-value {
            text-overflow: ellipsis;
        }
    }

    &.wide {
        justify-content: space-between;

        .s-stat-title {
            width: calc(100% - 70px)
        }

        .s-stat-value {
            text-align: right;
            width: 50px;
        }
    }
}
</style>