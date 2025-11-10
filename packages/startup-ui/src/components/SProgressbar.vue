<template>
    <div class="s-progressbar">
        <div class="s-progressbar-title">
            <slot />
        </div>
        <div class="s-progressbar-bar">
            <div class="s-progressbar-completed" :style="{ width: percentage + '%' }">
                <div :class="`at_${percentPosition}`">{{ parseInt(percentage) }}%</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
    label: String,
    percentage: Number,
});
const percentPosition = computed(() => ((props.percentage < 5) ? 'right' : 'left'));
</script>
<style lang="scss">
.s-progressbar {
    display: flex;
    gap: 10px;
    padding: 10px 20px;
    border-radius: var(--s-border-radius);
    background-color: var(--s-primary-lightest);
    margin-bottom: var(--s-base-margin);
    align-items: center;
    font-family: var(--s-font-family);
    &-title {
        position: relative;
        top: 1px;
    }
    &-bar {
        flex-grow: 1;
        height: 18px;
        position: relative;
        background-color: var(--s-bg);
        border-radius: var(--s-border-radius);
    }
    &-completed {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        background-color: var(--s-primary);
        border-radius: var(--s-border-radius);
        max-width: 100%;
        & > div {
            position: absolute;
            width: 40px;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            font-weight: bold;
            &.at_right {
                left: 100%;
                color: var(--s-primary);
            }
            &.at_left {
                right: 0;
                color: var(--s-white);
                left: 50%;
                margin-left: -20px;
            }
        }
    }
    @include mobile() {
        flex-wrap: wrap;
        & > div {
            width: 100%;
        }
    }
}
</style>