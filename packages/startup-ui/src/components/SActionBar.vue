<template>
    <Teleport to="body">
        <div class="s-actionbar">
            <slot />
        </div>
    </Teleport>
</template>
<script setup>
defineOptions({
    name: 'SActionBar'
})
</script>
<style lang="scss">
.s-actionbar {
    position: fixed;
    bottom: 0;
    gap: 20px;
    background: var(--s-bg);
    box-shadow: var(--s-shadow);
    width: 100%;
    box-sizing: border-box;
    z-index: 2000;
    padding: 1rem 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-family: var(--s-font-family);

    @include mobile_tablet() {
        justify-content: center;
        gap: 1rem;
    }
}
</style>