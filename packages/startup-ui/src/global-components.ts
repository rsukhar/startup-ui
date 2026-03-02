import '@vue/runtime-core';
import type SButton from './components/SButton.vue';
import type SActionIcon from './components/SActionIcon.vue';
import type STooltip from './components/STooltip.vue';
import type SNote from './components/SNote.vue';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        SButton: typeof SButton;
        's-button': typeof SButton;
        SActionIcon: typeof SActionIcon;
        's-action-icon': typeof SActionIcon;
        STooltip: typeof STooltip;
        's-tooltip': typeof STooltip;
        SNote: typeof SNote;
        's-note': typeof SNote;
    }
}
export { };
