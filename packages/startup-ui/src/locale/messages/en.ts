import type { StartupUiMessages } from '../types';

const en: StartupUiMessages = {
    confirm: {
        title: 'Confirmation required',
        accept: 'Yes',
        cancel: 'No',
    },
    pagination: {
        shown: 'Showing',
        of: 'of',
        perPage: '{n} per page',
    },
    select: {
        noData: 'No data',
    },
    table: {
        noData: 'Nothing found',
    },
    canvas: {
        sidebarMobileTitle: 'Contents',
    },
    upload: {
        selectFile: 'Select file',
        selectFiles: 'Select files',
    },
    copyText: {
        copy: 'Copy',
    },
    columnSettings: {
        configure: 'Configure columns',
        reset: 'Reset',
        resetTo: 'to {title}',
        resetChanges: 'changes',
    },
    dropdownMenu: {
        placeholder: 'Go to',
    },
    datePicker: {
        weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        notSelected: 'No date selected',
        firstDay: 1,
        hour12: false,
        am: 'AM',
        pm: 'PM',
    },
    htmlEditor: {
        language: null,
        blocks: {
            paragraph: 'Paragraph',
            h1: 'Heading 1',
            h2: 'Heading 2',
            h3: 'Heading 3',
            h4: 'Heading 4',
            blockquote: 'Quote',
            code: 'Code',
            note: 'Note',
            attention: 'Attention',
            success: 'Success',
            error: 'Error',
        },
    },
};

export default en;
