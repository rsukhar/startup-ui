import '@vue/runtime-core';
import type SButton from './components/SButton.vue';
import type SActionIcon from './components/SActionIcon.vue';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        SButton: typeof SButton;
        's-button': typeof SButton;
        SActionIcon: typeof SActionIcon;
        's-action-icon': typeof SActionIcon;
    }
}
export { };
