import type { DeepPartial, StartupUiMessages } from '../types';

// American English: differs from 'en' in the first day of the week (Sunday) and the
// 12-hour clock with AM/PM. Other strings are inherited from 'en' via base-language fallback.
const enUS: DeepPartial<StartupUiMessages> = {
    datePicker: {
        firstDay: 0,
        hour12: true,
    },
};

export default enUS;
