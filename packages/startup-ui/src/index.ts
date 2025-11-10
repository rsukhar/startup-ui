import plugin from './plugin';
import './style.scss';

export * from './components/SAlert';
export * from './components/SConfirm';

// Экспорт плагина по умолчанию
export default plugin;

/**
 * Forms
 */
export { default as SForm } from './components/SForm.vue';
export { default as SFormRow } from './components/SFormRow.vue';
export { default as SInput } from './components/SInput.vue';
export { default as SSelect } from './components/SSelect.vue';
export { default as SCheckbox } from './components/SCheckbox.vue';
export { default as SRadioGroup } from './components/SRadioGroup.vue';
export { default as SRadio } from './components/SRadio.vue';
export { default as SSwitch } from './components/SSwitch.vue';
export { default as SDatePicker } from './components/SDatePicker.vue';
export { default as SHtmlEditor } from './components/SHtmlEditor.vue';
export { default as SUpload } from './components/SUpload.vue';

/**
 * Data
 */
export { default as SFilter } from './components/SFilter.vue';
export { default as SFilterGroup } from './components/SFilterGroup.vue';
export { default as STable } from './components/STable.vue';
export { default as SPagination } from './components/SPagination.vue';
export { default as STree } from './components/STree.vue';

/**
 * UI
 */
export { default as SButton } from './components/SButton.vue';
export { default as SActionIcon } from './components/SActionIcon.vue';
export { default as STooltip } from './components/STooltip.vue';
export { default as SNote } from './components/SNote.vue';
export { default as SToggle } from './components/SToggle.vue';
export { default as SToggleGroup } from './components/SToggleGroup.vue';
export { SConfirm } from './components/SConfirm/index.js';
export { default as SDialog } from './components/SDialog.vue';
export { default as SImagePreview } from './components/SImagePreview.vue';
export { SAlert } from './components/SAlert/index.js';
export { default as STag } from './components/STag.vue';
export { default as SStatus } from './components/SStatus.vue';
export { default as SActionBar } from './components/SActionBar.vue';
export { default as SProgressBar } from './components/SProgressbar.vue';
export { default as SCopyText } from './components/SCopyText.vue';
export { default as STimeline } from './components/STimeline.vue';
export { default as SDashboard } from './components/SDashboard.vue';
export { default as SDashboardItem } from './components/SDashboardItem.vue';
export { default as SStat } from './components/SStat.vue';

/**
 * Layout
 */
export { default as SCanvas } from './components/SCanvas.vue';
export { default as SFooter } from './components/SFooter.vue';
export { default as SDropdownMenu } from './components/SDropdownMenu.vue';
export { default as SHorizontalMenu } from './components/SHorizontalMenu.vue';
export { default as SVerticalMenu } from './components/SVerticalMenu.vue';
