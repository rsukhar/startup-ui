import type { App, Component } from 'vue';

const components: Array<Component & { __name?: string }> = [];

/**
 * Forms
 */
import SForm from './components/SForm.vue';
components.push(SForm);
import SFormRow from './components/SFormRow.vue';
components.push(SFormRow);
import SInput from './components/SInput.vue';
components.push(SInput);
import SSelect from './components/SSelect.vue';
components.push(SSelect);
import SCheckbox from './components/SCheckbox.vue';
components.push(SCheckbox);
import SRadio from './components/SRadio.vue';
components.push(SRadio);
import SRadioGroup from './components/SRadioGroup.vue';
components.push(SRadioGroup);
import SSwitch from './components/SSwitch.vue';
components.push(SSwitch);
import SDatePicker from './components/SDatePicker.vue';
components.push(SDatePicker);
import SHtmlEditor from './components/SHtmlEditor.vue';
components.push(SHtmlEditor);
import SUpload from './components/SUpload.vue';
components.push(SUpload);

/**
 * Data
 */
import SFilter from './components/SFilter.vue';
components.push(SFilter);
import SFilterGroup from './components/SFilterGroup.vue';
components.push(SFilterGroup);
import STable from './components/STable.vue';
components.push(STable);
import SPagination from './components/SPagination.vue';
components.push(SPagination);
import STree from './components/STree.vue';
components.push(STree);

/**
 * UI
 */
import SButton from './components/SButton.vue';
components.push(SButton);
import SActionIcon from './components/SActionIcon.vue';
components.push(SActionIcon);
import STooltip from './components/STooltip.vue';
components.push(STooltip);
import SNote from './components/SNote.vue';
components.push(SNote);
import SToggle from './components/SToggle.vue';
components.push(SToggle);
import SToggleGroup from './components/SToggleGroup.vue';
components.push(SToggleGroup);
import SDialog from './components/SDialog.vue';
components.push(SDialog);
import SImagePreview from './components/SImagePreview.vue';
components.push(SImagePreview);
import { SConfirm } from './components/SConfirm';
components.push(SConfirm);
import { SAlert } from './components/SAlert';
components.push(SAlert);
import STag from './components/STag.vue';
components.push(STag);
import SStatus from './components/SStatus.vue';
components.push(SStatus);
import SActionBar from './components/SActionBar.vue';
components.push(SActionBar);
import SProgressBar from './components/SProgressbar.vue';
components.push(SProgressBar);
import SCopyText from './components/SCopyText.vue';
components.push(SCopyText);
import STimeline from './components/STimeline.vue';
components.push(STimeline);
import SDashboard from './components/SDashboard.vue';
components.push(SDashboard);
import SDashboardItem from './components/SDashboardItem.vue';
components.push(SDashboardItem);
import SStat from './components/SStat.vue';
components.push(SStat);

/**
 * Layout
 */
import SCanvas from './components/SCanvas.vue';
components.push(SCanvas);
import SFooter from './components/SFooter.vue';
components.push(SFooter);
import SDropdownMenu from './components/SDropdownMenu.vue';
components.push(SDropdownMenu);
import SHorizontalMenu from './components/SHorizontalMenu.vue';
components.push(SHorizontalMenu);
import SVerticalMenu from './components/SVerticalMenu.vue';
components.push(SVerticalMenu);

import './style.scss';

export default {
    install(app: App) {
        components.forEach(c => {
            const compName = (c as any).name ?? (c as any).__name ?? 'Unnamed';
            app.component(compName, c);
        });
    }
}