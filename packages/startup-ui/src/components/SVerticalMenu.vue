<template>
    <div class="s-verticalmenu">
        <div class="s-verticalmenu-item"
             v-for="link in links"
             :key="link.label"
             :class="[link.className, link.active ? 'active' : '', link.type ? 'type_' + link.type : '']"
        >
            <template v-if="link.url">
                <div class="s-verticalmenu-toggler" v-if="link.children" @click="toggleItem(link.id)"
                     :class="{'is-opened' : openedItems.includes(link.id)}">
                    <FontAwesomeIcon icon="fa-angle-right" />
                </div>
                <Link class="s-verticalmenu-label"
                      :class="{'not-published': link.isPublished !== undefined && !link.isPublished}" :href="link.url">
                    {{ link.label }}
                    <FontAwesomeIcon icon="eye-slash" v-if="link.isPublished !== undefined && !link.isPublished" />
                </Link>
            </template>
            <div class="s-verticalmenu-label"
                 :class="{'not-published': link.isPublished !== undefined && !link.isPublished}"
                 @click="toggleItem(link.id)" v-else>
                <div class="s-verticalmenu-toggler" v-if="link.children"
                     :class="{'is-opened' : openedItems.includes(link.id)}">
                    <FontAwesomeIcon icon="fa-angle-right" />
                </div>
                {{ link.label }}
                <FontAwesomeIcon icon="eye-slash" v-if="link.isPublished !== undefined && !link.isPublished" />
            </div>
            <div class="s-verticalmenu-children" v-if="link.children"
                 :class="{'is-opened' : openedItems.includes(link.id)}">
                <SVerticalMenu :links="link.children" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRemember, Link } from "@inertiajs/vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    // В формате [{label: '', url: '', active: ''}]
    links: Object,
});

// Метод для расчета активных элементов. Реактивность не нужна, т.к. это только для стартового состояния - дальше useRemember
const getExpandedKeys = function(links) {
    let result = [];
    for (let link of links) {
        const expandedChildren = link.children ? getExpandedKeys(link.children) : [];
        // Собираем активные вложенные элементы и рекурсией передаём наверх
        if (expandedChildren.length) result = result.concat(expandedChildren);
        // Если есть раскрыте вложенные элменты, то текущий элемент тоже считаем раскрытым
        if (link.active || expandedChildren.length) result.push(link.id);
    }
    return result;
};

// Все предки текущего активного элемента и он сам на старте на старте должны быть раскрыты
const openedItems = useRemember(getExpandedKeys(props.links), 'OpenedSidebarItems');

const toggleItem = function(id) {
    openedItems.value = openedItems.value.includes(id) ? openedItems.value.filter(i => i !== id) : [...openedItems.value, id];
}
</script>

<style lang="scss">
.s-verticalmenu {
    &-item {
        position: relative;
        padding: 4px 0;
        padding-left: 20px;
        font-family: var(--s-font-family);
        & > .s-verticalmenu-label {
            font-size: 16px;
        }

        &.active {
            & > .s-verticalmenu-label {
                color: var(--s-primary);
                font-weight: bold;
            }
        }

        &.type_section {
            margin-top: 8px;
            margin-bottom: 8px;

            & > .s-verticalmenu-label {
                font-weight: bold;
            }
        }
    }

    &-label {
        .s-verticalmenu-item.type_section > &:hover {
            cursor: pointer;
            color: var(--s-primary-darkest);
        }

        &.not-published {
            opacity: 0.5;

            svg.fa-eye-slash {
                font-size: 10px;
                margin-left: 2px;
            }
        }
    }

    &-toggler {
        position: absolute;
        width: 22px;
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        left: -6px;
        top: 5px;
        text-align: center;
        cursor: pointer;

        & > svg {
            transform: rotate(90deg);
            transition-property: transform;
            transition-duration: 0.3s;
            transition-timing-function: ease;
        }

        &:not(.is-opened) > svg {
            transform: rotate(0deg);
        }

        .s-verticalmenu-item:not(.type_section) > &:hover {
            color: var(--s-primary-darkest);
        }
    }

    &-children {
        padding-top: 4px;

        &:not(.is-opened) {
            display: none;
        }
    }
}
</style>
