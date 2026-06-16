import type { DeepPartial, StartupUiMessages } from '../types';

// American English: differs from 'en' only in the first day of the week (Sunday).
// Other strings are inherited from 'en' via base-language fallback.
const enUS: DeepPartial<StartupUiMessages> = {
    datePicker: {
        firstDay: 0,
    },
};

export default enUS;
