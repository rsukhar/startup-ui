<template>
    <div class="s-pagination" :class="{ 's-pagination-right' : linksInternal.length <= 3 }">
        <div class="s-pagination-links" v-if="linksInternal.length > 3">
            <template v-for="(link, index) in linksInternal" :key="index">
                <div v-if="link.has_url && !link.active" :class="{ active: link.active }" v-html="link.label"
                        :preserve-scroll="preserveScroll"
                        @click="choosePage(link.label)"
                />
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
import SSelect from '../../../packages/startup-ui/src/components/SSelect.vue';

const props = defineProps({
    url: String,
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
const linksInternal = ref([...props.links]);


/**
 * Выбор страницы
 */
function choosePage(label) {
    const current = linksInternal.value.find(l => l.active);
    const maxPage = Math.ceil(props.total / props.per_page);

    let next;
    // Стрелки: ← и →
    if (label === '&#8594;' || label === '&#8592;') {
        if (!current) return;

        const n = Number(current.label);
        next = label === '&#8594;' 
            ? Math.min(n + 1, maxPage)
            : Math.max(n - 1, 1);
    } 
    else {
        next = Number(label);
    }

    // Обновляем активную ссылку
    linksInternal.value = linksInternal.value.map(link => ({
        ...link,
        active: Number(link.label) === next
    }));

    // Делаем стрелки неактивными (has_url)
    linksInternal.value.at(-1).has_url = next !== maxPage;
    linksInternal.value[0].has_url = next !== 1;
}


/**
 * Обновление страницы после выбора пагинации
 */
function handleSelectedChange(count) {
    const pageCount = Math.ceil(props.total / count);
    
    linksInternal.value = [
        ...props.links.slice(0, pageCount + 1),
        linksInternal.value.at(-1),
    ];
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
        & > div {
            box-sizing: border-box;
            display: flex;
            padding: 0 5px;
            min-width: 32px;
            min-height: 32px;
            justify-content: center;
            border-radius: var(--s-border-radius);
            align-items: center;
            cursor: pointer;
            
            &.active {
                background-color: var(--s-primary-lightest);
                color: var(--s-primary);
                font-weight: 700;
            }

            & > svg {
                margin: 0;
            }
        }

        & > div {
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
