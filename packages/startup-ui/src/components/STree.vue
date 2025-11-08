<template>
    <div class="s-tree" @dragleave="onDragLeave">
        <template v-for="node in data" :key="node.id">
            <div class="s-tree-cell" :class="{
                selected: model === node.id,
                expanded: sharedExpandedKeys.includes(node.id),
                dropTarget: sharedDropTarget?.id === node.id && sharedDropTarget?.position === 'center',
                dropTargetTop: sharedDropTarget?.id === node.id && sharedDropTarget?.position === 'top',
                dropTargetBottom: sharedDropTarget?.id === node.id && sharedDropTarget?.position === 'bottom',
            }" @click.stop="clickNode(node)" @dragstart="onDrag(node, $event)" :draggable="draggable"
                 @dragover.prevent="onDragOver(node, $event)" @drop="onDrop(node, $event)">
                <FontAwesomeIcon class="s-tree-toggle" icon="caret-right" @click.stop="toggleNode(node)"
                                 v-if="node.children && node.children.length" />
                <slot v-if="$slots.node" name="node" :node="node" />
                <template v-else>
                    {{ node.label }}
                </template>
            </div>
            <STree v-if="node.children && sharedExpandedKeys.includes(node.id)" v-model="model"
                   :draggable="draggable"
                   :data="node.children" @dragstart="(node, event) => emit('dragstart', node, event)"
                   @drop="(targetNode, event, dropType) => emit('drop', targetNode, event, dropType)"
                   :selectable="selectable" @change="(node) => emit('change', node)">
                <template #node="{ node: childNode }" v-if="$slots.node">
                    <slot name="node" :node="childNode" />
                </template>
            </STree>
        </template>
    </div>
</template>
<script setup>
import { ref, provide, inject, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
    /**
     * Массив вида [{id, label, children: [...]}, ...]
     */
    data: {
        type: Array,
        required: true
    },
    expandedKeys: {
        type: Array,
        default: [],
    },
    draggable: Boolean,
    selectable: Boolean,
    /**
     * Ключ, по которому раскрыте узлы хранятся в localStorage
     */
    storeExpandedKeysTo: String,
});
const emit = defineEmits(['dragstart', 'drop', 'change']);

const model = defineModel();

// Список раскрытых узлов
let sharedExpandedKeys = inject('sharedExpandedKeys', null);
if (sharedExpandedKeys === null) {
    // Первый уровень: Создаем общие раскрытые ключи и делимся с вложенными уровнями
    const storedExpandedKeys = props.storeExpandedKeysTo ? JSON.parse(localStorage.getItem(props.storeExpandedKeysTo)) : null;
    sharedExpandedKeys = ref(storedExpandedKeys ?? [...props.expandedKeys]);
    provide('sharedExpandedKeys', sharedExpandedKeys);
}

watch(sharedExpandedKeys, (val) => {
    if (props.storeExpandedKeysTo) {
        localStorage.setItem(props.storeExpandedKeysTo, JSON.stringify(val));
    }
}, { deep: true });

// Объект с информацией об узле, на который перетягивают другой узел
// { nodeId, position, relation }
const sharedDropTarget = inject('sharedDropTarget', ref(null));
if (!sharedDropTarget.value) {
    provide('sharedDropTarget', sharedDropTarget);
}

// Перетаскиваемый элемент
const draggingNode = inject('draggingNode', ref(null));
if (!draggingNode.value) {
    provide('draggingNode', draggingNode);
}

function clickNode(node) {
    if (props.selectable && model.value !== node.id) {
        model.value = node.id;
        emit('change', node);
    } else {
        toggleNode(node);
    }
}

/**
 * Раскрыть/скрыть узел
 *
 * @param node
 */
function toggleNode(node){
    // Закрываем
    if (sharedExpandedKeys.value.includes(node.id)) {
        const nodeDescendants = getDescendants(node);
        sharedExpandedKeys.value = sharedExpandedKeys.value.filter(item => !nodeDescendants.includes(item) && item !== node.id);
    } else {
        // Раскрываем
        sharedExpandedKeys.value.push(node.id);
    }
}

/**
 * Обработчик события dragstart
 * 
 * @param node 
 * @param event 
 */
function onDrag(node, event) {
    draggingNode.value = node;
    // Закрываем передвигаемый узел
    sharedExpandedKeys.value = sharedExpandedKeys.value.filter(item => item !== node.id);
    emit('dragstart', node, event);
}

/**
 * Обработчик события dragover
 * 
 * @param node 
 * @param event 
 */
function onDragOver(node, event) {
    // Навели на самого себя — не обрабатываем
    if (draggingNode.value?.id === node.id) {
        sharedDropTarget.value = null;
        return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const offset = event.clientY - rect.top;

    // Подсвечиваем узел, на который навели курсор
    // Три варианта: верхняя, нижняя граница, вся строка
    if (offset >= rect.height * 0.35 && offset <= rect.height * 0.65) {
        sharedDropTarget.value = { id: node.id, position: 'center', relation: 'inner'};
    } else if (offset < rect.height * 0.35) {
        sharedDropTarget.value = { id: node.id, position: 'top', relation: 'before'};
    } else {
        sharedDropTarget.value = { id: node.id, position: 'bottom', relation: 'after'};
    }
}

/**
 * Обработчик события dragleave (перетягивание за пределы компонента)
 * 
 * @param event 
 */
function onDragLeave(event) {
    const treeRect = event.currentTarget.getBoundingClientRect();
    // курсор выше верхней границы
    if (event.clientY < treeRect.top) {
        if (props.data.length > 0) {
            const firstNode = props.data[0];
            sharedDropTarget.value = { id: firstNode.id, relation: "before" };
        }
        return;
    }

    // курсор ниже нижней границы
    if (event.clientY > treeRect.bottom) {
        if (props.data.length > 0) {
            const lastNode = props.data[props.data.length - 1];
            sharedDropTarget.value = { id: lastNode.id, relation: "after" };
        }
        return;
    }

  // курсор ушёл вбок или вообще вне компонента
  sharedDropTarget.value = null;
}

/**
 * Обработчик события drop
 * 
 * @param targetNode Узел, на который навели курсор
 * @param event 
 */
function onDrop(targetNode, event) {
    if (draggingNode.value.id === targetNode.id) {
        return;
    }
    const dropType = sharedDropTarget.value?.relation;
    emit('drop', targetNode, event, dropType);

    draggingNode.value = null;
    sharedDropTarget.value = null;
}

/**
 * Получить плоский массив id потомков узла
 * 
 * @return array
 */
function getDescendants(node) {
    let result = [];
    if (node.children) {
        for (let child of node.children) {
            result = result.concat(getDescendants(child));
        }
    }

    return result;
}
</script>
<style lang="scss">
.s-tree {
    overflow: auto;
    user-select: none;
    &-cell {
        box-sizing: border-box;
        display: flex;
        position: relative;
        align-items: start;
        cursor: pointer;
        gap: 5px;
        line-height: 1.3rem;
        min-width: 100%;
        width: fit-content;
        border: 2px solid transparent;
        border-radius: var(--s-border-radius);

        & svg:not(.s-tree-toggle){
            margin-top: 2px;
        }

        &.selected {
            font-weight: bold;
        }
        &.dropTarget {
            background-color: var(--s-primary-lightest);
        }
        &.dropTargetTop {
            border-top: 2px solid var(--s-primary-light);
        }
        &.dropTargetBottom {
            border-bottom: 2px solid var(--s-primary-light);
        }
        &:hover {
            background-color: var(--s-bg);
        }

        &.expanded > .s-tree-toggle {
            transform: rotate(90deg);
        }
    }

    & > &-cell {
        padding: 2px 2px 2px 24px;
    }

    &-toggle {
        position: absolute;
        align-self: center;
        left: 2px;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        color: var(--s-border-light);
        transform-origin: center center;
        transition: transform 0.3s ease;
    }

    & > & {
        padding-left: 18px;
    }
}
</style>
