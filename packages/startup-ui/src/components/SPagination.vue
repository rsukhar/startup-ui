<template>
    <div class="s-pagination" :class="{ 's-pagination-right' : links.length <= 3 }">
        <div class="s-pagination-links" v-if="links.length > 3">
            <template v-for="(link, index) in links" :key="index">
                <Link v-if="link.url && !link.active" :class="{ active: link.active }" v-html="link.label"
                        :href="link.url ? link.url.replace(/[\?\&]page\=1$/, '') : ''"
                        :preserve-scroll="preserveScroll"
                        :preserve-state="preserveState" />
                <span v-else :class="{ active: link.active }" v-html="link.label" />
            </template>
        </div>
        <div class="s-pagination-options">
            <div class="s-options-pagination-perPage" v-if="perPageOptions">
                <SSelect v-model="currentPerPage" :options="perPageOptionsFormatted" @change="handleSelectedChange"/>
            </div>
            <div class="s-options-pagination-shown-counter" v-if="from && to && total">
                Показаны: <span class="s-pagination-options-shown-counter-range">{{ from }} - {{ to }}</span> из {{ total }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import SSelect from './SSelect.vue';

const props = defineProps({
    url: {
        type: String,
        default() {
            return location.pathname;
        },
    },
    links: Object,
    total: Number,
    preserveScroll: {
        type: Boolean,
        default: true,
    },
    preserveState: {
        type: Boolean,
        default: false,
    },
    perPageOptions: Array,
    per_page: Number,
    from: Number,
    to: Number,
});
const currentPerPage = ref(props.per_page);

/**
 * Обновление страницы после выбора пагинации
 */
function handleSelectedChange() {
    // Преобразуем GET-параметры в объект
    const search = location.search.substring(1);
    const query = search ? JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : {};
    // удаляем параметр page, чтобы при переключении пагинации страница сбрасывалась на первую
    delete query['page'];
    query.perpage = currentPerPage.value;
    router.get(props.url, query, {
        preserveScroll: props.preserveScroll
    });
}

const perPageOptionsFormatted = props.perPageOptions ? Object.entries(props.perPageOptions).reduce((acc, [key, value]) => {
    acc[parseInt(value)] = `По ${value}`;
    return acc;
}, {}) : null
</script>

<style lang="scss">
/* Постраничная навигация */
.s-pagination {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: var(--s-base-margin) !important;
    font-weight: 400;
    font-family: var(--s-font-family);
    
    &-right {
        justify-content: end;
    }

    &-links {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        & > span,
        & > a {
            box-sizing: border-box;
            display: flex;
            padding: 0 5px;
            min-width: 32px;
            min-height: 32px;
            justify-content: center;
            border-radius: var(--s-border-radius);
            align-items: center;
            
            &.active {
                background-color: var(--s-primary-lightest);
                color: var(--s-primary);
                font-weight: 700;
            }

            & > svg {
                margin: 0;
            }
        }

        & > a {
            &:hover {
                background-color: var(--s-bg);
            }
        }

        &-total {
            margin-left: auto;
        }
    }

    &-options {
        display: flex;
        gap: 21px;
        align-items: center;
        
        &-pagination-perPage {
            color: var(--s-black);
        }

        &-shown-counter-range {
            font-weight: 700;
        }
        
    }

    .el-select {
        width: 100px;
    }
}
</style>
