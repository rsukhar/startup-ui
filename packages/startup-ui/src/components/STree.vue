<template>
    <div class="s-tree" @dragleave="onDragLeave">
        <template v-for="node in data" :key="node.id">
            <div class="s-tree-cell" :style="{paddingLeft: 20 * level + 'px'}"
                :class="{
                    selected: model === node.id,
                    expanded: sharedExpandedKeys.includes(node.id),
                    bordered: bordered, 
                    dropTarget: sharedDropTarget?.id === node.id && sharedDropTarget?.position === 'center',
                    dropTargetTop: sharedDropTarget?.id === node.id && sharedDropTarget?.position === 'top',
                    dropTargetBottom: sharedDropTarget?.id === node.id && sharedDropTarget?.position === 'bottom',
                }" @click.stop="clickNode(node)" @dragstart="onDrag(node, $event)" :draggable="draggable"
                 @dragover.prevent="onDragOver(node, $event)" @drop="onDrop(node, $event)">
                <FontAwesomeIcon class="s-tree-toggle" icon="caret-right" @click.stop="toggleNode(node)"
                                 v-if="node.children && node.children.length" 
                                 :style="{left: 20 * (level - 1) + 'px' }"/>
                <SCheckbox v-if="checkboxes" :model-value="isSelected(node.id)"
                    @click.stop="() => {}"
                    @change="(newValue: any) => toggle(node, newValue)">
                </SCheckbox>
                <slot v-if="$slots.node" name="node" :node="node" />
                <template v-else>
                    {{ node.label }}
                </template>
            </div>
            <STree v-if="node.children && sharedExpandedKeys.includes(node.id)" v-model="model"
                   :draggable="draggable" :data="node.children" :selectable="selectable"
                   :checkboxes="checkboxes" :selectWithChildren="selectWithChildren"
                   :bordered="bordered"
                   @dragstart="(node, event) => emit('dragstart', node, event)"
                   @drop="(targetNode, event, dropType) => emit('drop', targetNode, event, dropType)"
                   @change="(node) => emit('change', node)">
                <template #node="{ node: childNode }" v-if="$slots.node">
                    <slot name="node" :node="childNode" />
                </template>
            </STree>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref, provide, inject, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SCheckbox from './SCheckbox.vue';

export interface STreeNode {
    id: string | number;
    label?: string;
    children?: STreeNode[];
    [key: string]: any;
}

const props = withDefaults(defineProps<{
    /**
     * Массив вида [{id, label, children: [...]}, ...]
     */
    data: STreeNode[];
    expandedKeys?: (string | number)[];
    draggable?: boolean;
    selectable?: boolean;
    /**
     * Включить чекбоксы
     */
    checkboxes?: boolean;
    /**
     * При нажатии на чекбокс в родительском узле, состояние чекбоксов в потомках не меняется
     */
    selectWithChildren?: boolean;
    /**
     * Ключ, по которому раскрыте узлы хранятся в localStorage
     */
    storeExpandedKeysTo?: string;
    /**
     * Границы
     */
    bordered?: boolean;
}>(), {
    expandedKeys: () => [],
});

const emit = defineEmits<{
    (e: 'dragstart', node: STreeNode, event: DragEvent): void;
    (e: 'drop', targetNode: STreeNode, event: DragEvent, dropType: string | undefined): void;
    (e: 'change', node: STreeNode): void;
}>();

defineSlots<{
    node?(props: { node: STreeNode }): any
}>();

const model = defineModel<any>();

let level = inject<number | null>('level', null);

if (level === null) {
    level = 1;
} else {
    level += 1;
}

provide('level', level);

// Список раскрытых узлов
let sharedExpandedKeysRef = inject<import('vue').Ref<(string | number)[]> | null>('sharedExpandedKeys', null);
if (sharedExpandedKeysRef === null) {
    // Первый уровень: Создаем общие раскрытые ключи и делимся с вложенными уровнями
    const storedExpandedKeys = props.storeExpandedKeysTo ? JSON.parse(localStorage.getItem(props.storeExpandedKeysTo) || 'null') : null;
    sharedExpandedKeysRef = ref(storedExpandedKeys ?? [...props.expandedKeys]);
    provide('sharedExpandedKeys', sharedExpandedKeysRef);
}
const sharedExpandedKeys = sharedExpandedKeysRef as import('vue').Ref<(string | number)[]>;

watch(sharedExpandedKeys, (val) => {
    if (props.storeExpandedKeysTo) {
        localStorage.setItem(props.storeExpandedKeysTo, JSON.stringify(val));
    }
}, { deep: true });

// Объект с информацией об узле, на который перетягивают другой узел
// { nodeId, position, relation }
interface DropTarget {
    id: string | number;
    position?: string;
    relation?: string;
}
let sharedDropTargetRef = inject<import('vue').Ref<DropTarget | null> | null>('sharedDropTarget', null);
if (sharedDropTargetRef === null) {
    sharedDropTargetRef = ref(null);
    provide('sharedDropTarget', sharedDropTargetRef);
}
const sharedDropTarget = sharedDropTargetRef as import('vue').Ref<DropTarget | null>;

// Перетаскиваемый элемент
let draggingNodeRef = inject<import('vue').Ref<STreeNode | null> | null>('draggingNode', null);
if (draggingNodeRef === null) {
    draggingNodeRef = ref(null);
    provide('draggingNode', draggingNodeRef);
}
const draggingNode = draggingNodeRef as import('vue').Ref<STreeNode | null>;

function clickNode(node: STreeNode) {
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
function toggleNode(node: STreeNode){
    // Закрываем
    if (sharedExpandedKeys.value.includes(node.id)) {
        const nodeDescendants = getDescendants(node);
        sharedExpandedKeys.value = sharedExpandedKeys.value.filter((item: string | number) => !nodeDescendants.includes(item) && item !== node.id);
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
function onDrag(node: STreeNode, event: DragEvent) {
    draggingNode.value = node;
    // Закрываем передвигаемый узел
    sharedExpandedKeys.value = sharedExpandedKeys.value.filter((item: string | number) => item !== node.id);
    emit('dragstart', node, event);
}

/**
 * Обработчик события dragover
 * 
 * @param node 
 * @param event 
 */
function onDragOver(node: STreeNode, event: DragEvent) {
    // Навели на самого себя — не обрабатываем
    if (draggingNode.value?.id === node.id) {
        sharedDropTarget.value = null;
        return;
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
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
function onDragLeave(event: DragEvent) {
    const treeRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
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
function onDrop(targetNode: STreeNode, event: DragEvent) {
    if (draggingNode.value && draggingNode.value.id === targetNode.id) {
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
function getDescendants(node: STreeNode): (string | number)[] {
    let result: (string | number)[] = [];
    if (node.children) {
        for (let child of node.children) {
            result = result.concat(getDescendants(child));
        }
    }

    return result;
}

/**
 * Получить id узлов, которые нужно переключить
 * 
 * @param node 
 * @param newValue 
 */
function getNodesToToggle(node: STreeNode, newValue: boolean, nodesToToggle: (string | number)[] = []): (string | number)[] {
    nodesToToggle.push(node.id);

    if (props.selectWithChildren && node.children && node.children.length) {
        for (let childNode of node.children) {
            getNodesToToggle(childNode, newValue, nodesToToggle);
        }
    }

    return nodesToToggle;
}

function toggle(interest: STreeNode, newValue: boolean | string | string[]) {
    // Собираем все узлы, чтобы переключить их разом
    const nodesToToggle = getNodesToToggle(interest, !!newValue);

    model.value = newValue
        ? (Array.isArray(model.value) ? model.value.concat(nodesToToggle) : [...nodesToToggle])
        : (Array.isArray(model.value) ? model.value.filter((interestId: string | number) => !nodesToToggle.includes(interestId)) : []);
}

/**
 * Словарь предков: узел — все потомки
 * Строим в корневом узле и делимся ссылкой с потомками
 */
function buildParentMap(nodes: STreeNode[], parentId: string | number | null = null, map = new Map<string | number, string | number>()): Map<string | number, string | number> {
    for (const node of nodes) {
        if (parentId !== null) map.set(node.id, parentId)

        if (node.children?.length) buildParentMap(node.children, node.id, map)
    }

    return map;
}

let parentMap = inject<Map<string | number, string | number> | null>('parentMap', null);

if (!parentMap) {
    parentMap = buildParentMap(props.data);
    provide('parentMap', parentMap);
}

function isSelected(id: string | number): boolean {
    return Array.isArray(model.value) && model.value.includes(id);
}
</script>
<style lang="scss">
.s-tree {
    overflow: auto;
    user-select: none;
    font-family: var(--s-font-family);
    &-cell {
        box-sizing: border-box;
        display: flex;
        position: relative;
        align-items: center;
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

        &.bordered {
            border-radius: 0;
            border-bottom: 1px solid var(--s-border);
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
}
</style>
