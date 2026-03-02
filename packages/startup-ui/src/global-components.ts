import '@vue/runtime-core';
import type SButton from './components/SButton.vue';
import type SActionIcon from './components/SActionIcon.vue';
import type STooltip from './components/STooltip.vue';
import type SNote from './components/SNote.vue';
import type SToggle from './components/SToggle.vue';
import type SToggleGroup from './components/SToggleGroup.vue';
import type SDialog from './components/SDialog.vue';

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
        SToggle: typeof SToggle;
        's-toggle': typeof SToggle;
        SToggleGroup: typeof SToggleGroup;
        's-toggle-group': typeof SToggleGroup;
        SDialog: typeof SDialog;
        's-dialog': typeof SDialog;
    }
}
export { };
