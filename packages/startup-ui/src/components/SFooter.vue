<template>
    <div class="s-footer">
        <slot/>
    </div>
</template>
<script setup>
defineOptions({
    name: 'SFooter'
})
</script>
<style lang="scss">
.s-footer {
    overflow: hidden;
    padding: 2rem 0;
    background-color: var(--s-bg-header);
    font-size: 0.8rem;

    a {
        font-weight: bold;
        color: var(--s-primary-lightest);
        &:hover {
            color: var(--s-white);
        }
    }

    &-h {
        color: var(--s-white);
        display: flex;
        gap: 1rem;
        align-items: center;
        margin: 0 auto;
        max-width: 1200px;
        text-align: center;
        justify-content: center;
    }

    @include mobile() {
        padding: 20px;
        &-h {
            flex-wrap: wrap;
            & > div {
                width: 100%;
            }
            .rights {
                display: flex;
                justify-content: space-between;
            }
        }

        .logo-and-socials {
            display: flex;
            justify-content: space-between;
            margin: 10px;

            .socials {
                gap: 20px;
                a {
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
}
</style>