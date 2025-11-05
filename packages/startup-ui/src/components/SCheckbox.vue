<template>
    <div class="s-checkbox" @click="handleCheck" :class="{'disabled': disabled}">
        <div class="s-checkbox-box" :class="{'checked': isChecked}">
            <input class="s-checkbox-box-input" type="checkbox" :value="isChecked" :disabled="disabled"/>
            <FontAwesomeIcon icon="check" class="checked-icon"/>
        </div>
        <div class="s-checkbox-label">
            <slot />
        </div>
    </div>
</template>
<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { inject, computed } from "vue";

const props = defineProps({
    value: [String, Number],
    disabled: Boolean
});

const model = defineModel();
const groupValue = inject('groupValue', null);

// Устанавливаем значение как computed-свойство, чтобы связать чекбосы, переданные через слоты, с внутренней моделью
const isChecked = computed({
    get() {
        // Если передана группа галочек, берем оттуда
        if (groupValue != null && props.value != null) {
            return groupValue.value.includes(props.value) ?? false;
        } else {
            // Передано значение напрямую
            return model.value;
        }
    },
    set(val) {
        if (groupValue && props.value != null) {
            groupValue.value.includes(props.value) 
                ? groupValue.value.splice(groupValue.value.indexOf(props.value), 1)
                : groupValue.value.push(props.value);
        }
        model.value = val;
    }
});
const emits = defineEmits(['change']);

function handleCheck() {
    if (props.disabled) return;
    isChecked.value = !isChecked.value;
    emits('change', isChecked.value);
}
</script>
<style lang="scss">
.s-checkbox {
    display: inline-flex;
    align-items: center ;
    gap: 10px;
    user-select: none;
    
    &-box {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
        box-sizing: border-box;
        border: 1px solid var(--s-border);
        border-radius: 4px;
        cursor: pointer;
        user-select: none;

        &:hover {
            border: 1px solid var(--s-border-light);
        }

        &-input {
            cursor: pointer;
            appearance: none;
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            opacity: 0;
            z-index: 1;
            outline: 0 none;
            border: 1px solid transparent;
        }

        &.checked {
            background-color: var(--s-primary);
            border: 1px solid var(--s-primary-darkest);
            transition: background-color 0.2s ease;
            &:hover {
                background-color: var(--s-primary-darkest);
            }
            .checked-icon {
                color: var(--s-white);
            }
        }

        .checked-icon {
            color: transparent;
        }
    }

    &.disabled {
        pointer-events: none;
        .s-checkbox-box {
            background-color: var(--s-text-light);
            border: 1px solid var(--s-text-light);

            .checked-icon {
                color: var(--s-text-light);
            }
           
            &.checked {
                border: 1px solid var(--s-text-light);

                .checked-icon {
                    color: var(--s-white);
                }
            }
        }

        .s-checkbox-label {
            color: var(--s-text-light);
        }
    }

    &-label {
        cursor: pointer;
        &:empty {
            display: none;
        }
    }
}
</style>
