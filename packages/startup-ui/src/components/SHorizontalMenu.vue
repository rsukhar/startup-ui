<template>
    <div class="s-horizontalmenu">
        <div class="s-horizontalmenu-item"
             v-for="link in links"
             :key="link.label"
             :class="[link.className, link.active ? 'active' : '']"
        >
            <Link class="s-horizontalmenu-label" v-if="link.url" :href="link.url">{{ link.label }}</Link>
            <div class="s-horizontalmenu-label" v-else>{{ link.label }}</div>

            <div class="s-horizontalmenu-children" v-if="link.children">
                <SHorizontalMenu :links="link.children" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    // В формате [{label: '', url: '', active: '', stat: ''}]
    links: Object,
});
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
