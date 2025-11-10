<template>
    <div class="s-switch" @click="handleSwitch" :class="{active: model === trueValue, disabled}">
            <div class="s-switch-control" id="s-switch">
                <div class="s-switch-control-activearea">
                    <div class="s-switch-control-activearea-button" />
                </div>
                <input type="checkbox" v-model="model" />
            </div>
            <label class="s-switch-label">
                <slot />
            </label>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
const props = defineProps({
    disabled: Boolean,
    trueValue: {
        type: [Boolean, String, Number],
        default: true
    },
    falseValue: {
        type: [Boolean, String, Number],
        default: false
    }
});
const model = defineModel();

onMounted(() => {
    model.value = model.value === props.trueValue ? props.trueValue : props.falseValue;
});

function handleSwitch() {
    if (props.disabled) return;
    model.value = model.value === props.trueValue ? props.falseValue : props.trueValue;
}
</script>
<style lang="scss">
.s-switch {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    height: 100%;
    cursor: pointer;
    font-family: var(--s-font-family);
    
    &.active {
        color: var(--s-primary);
    }

    &.active &-control {
        &-activearea {
            background-color: var(--s-primary);
            &-button {
                transform: translateX(100%);
                transition: transform 0.2s ease;
            }
        }
    }

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed !important;
    }

    &-control {
        &-activearea {
            box-sizing: border-box;
            width: 35px;
            height: 21px;
            padding: 3px;
            background-color: var(--s-text-light);
            border-radius: 30px;

            &-button {
                height: 100%;
                width: 50%;
                border-radius: 50%;
                background-color: var(--s-white);
                transition: transform 0.2s ease;
            }
        }

        &-activearea:hover {
            background-color: var(--s-border-light);
        }

        input {
            width: fit-content;
        }

        [type=checkbox] {
            display: none;
        }
    }   
}
</style>
