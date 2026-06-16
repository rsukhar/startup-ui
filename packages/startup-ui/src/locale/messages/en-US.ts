import type { DeepPartial, StartupUiMessages } from '../types';

// Американский английский: отличается от 'en' только первым днём недели (воскресенье).
// Остальные строки наследуются от 'en' через фолбэк по базовому языку.
const enUS: DeepPartial<StartupUiMessages> = {
    datePicker: {
        firstDay: 0,
    },
};

export default enUS;
