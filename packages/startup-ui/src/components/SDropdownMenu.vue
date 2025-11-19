<template>
    <div class="s-dropdownmenu" @pointerenter="placeList" ref="$container">
        <component :is="labelComponent" class="s-dropdownmenu-label" :href="labelLink ?? ''">
            <slot v-if="$slots.label" name="label" />
            <span v-else>{{ labelText }}</span>
            <FontAwesomeIcon icon="caret-down" />
        </component>
        <div class="s-dropdownmenu-list" ref="$list" :class="[direction]">
            <Link v-if="links" v-for="link in links" :key="link.label" :href="link.url" :class="{ active: link.active }">
                {{ link.label }}
            </Link>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, useTemplateRef, computed, nextTick } from 'vue';
import { Link } from '@inertiajs/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
    // В формате [{label: '', url: '', active: ''}]
    links: {
        type: Array,
        default: () => ([]),
    },
    // Используется, когда ни один элемент не выбран, и нет заданного лейбла
    placeholder: {
        type: String,
        default: 'Перейти к',
    },
    // Если задан, выводится всегда, не зависимо от выбранного элемента
    label: String,
    // Если задана, используется всегда, независимо от выбранного элемента
    labelLink: String,
});

// Активная выбранная ссылка из числа переданных ссылок
const activeLink = computed(() => {
    for (let link of props.links) {
        if (link.active) return JSON.parse(JSON.stringify(link));
    }
    return null;
});

// Какой текст выводим на лейбле
const labelText = computed(() => props.label ?? (activeLink.value ? activeLink.value.label : props.placeholder));

// Какой URL выводим на лейбле
const labelUrl = computed(() => props.labelLink ?? activeLink.value?.url);

// Каким компонентом выводим
const labelComponent = computed(() => labelUrl.value ? Link : 'span');

const $container = useTemplateRef('$container');
const $list = useTemplateRef('$list');
const direction = ref('right');

const placeList = async () => {
    await nextTick();
    const labelX = $container.value.getBoundingClientRect().x;
    const menuWidth = $list.value.getBoundingClientRect().width;
    direction.value = menuWidth + 10 > labelX ? 'left' : 'right';
}
</script>

<style lang="scss">
.s-dropdownmenu {
    flex-shrink: 0;
    position: relative;
    border-radius: var(--s-border-radius);
    font-family: var(--s-font-family);
    
    a {
        display: flex;
        flex-wrap: nowrap;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
            color: var(--s-white) !important;
            background-color: var(--s-primary-light);
        }
    }
    
    &-label {
        display: flex;
        padding: 0 20px;
        gap: 20px;
        align-items: center;
        vertical-align: top;
        border-radius: var(--s-border-radius) var(--s-border-radius) 0 0;
        & > a {
            @include mobile() {
                padding: 0 10px;
            }
            svg {
                margin-left: 20px;

                @include mobile() {
                    margin-left: 10px;
                }
            }
        }
    }

    &-list {
        display: none;
        position: absolute;
        overflow: hidden;
        min-width: 100%;
        border-radius: 0 0 var(--s-border-radius) var(--s-border-radius);
        background-color: var(--s-primary-lightest);
        box-shadow: var(--s-shadow);

        & > a {
            padding: 0 20px;
            line-height: 3rem;
        }
    }

    &:hover {
        background-color: var(--s-primary-lightest);
        color: var(--s-primary);
        border-radius: var(--s-border-radius) var(--s-border-radius) 0 0;
        .s-dropdown-label {
            z-index: 4;
        }
        .s-dropdownmenu-list {
            display: block;
            z-index: 3;
        }
    }

    &.right &-list {
        right: 0;
    }

    @include mobile(){
        &-list.right {
            right: 0;
        }
        &-list.left {
            left: 0;
        }
        &.right &-list {
            right: unset;
        }
    }
}
</style>
