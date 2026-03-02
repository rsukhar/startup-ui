import '@vue/runtime-core';
import type SButton from './components/SButton.vue';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        SButton: typeof SButton;
        's-button': typeof SButton;
    }
}
export { };
