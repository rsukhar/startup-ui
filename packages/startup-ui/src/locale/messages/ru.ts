import type { StartupUiMessages } from '../types';

const ru: StartupUiMessages = {
    confirm: {
        title: 'Необходимо подтверждение',
        accept: 'Да',
        cancel: 'Нет',
    },
    pagination: {
        shown: 'Показаны',
        of: 'из',
        perPage: 'По {n}',
    },
    select: {
        noData: 'Нет данных',
    },
    table: {
        noData: 'Ничего не найдено',
    },
    canvas: {
        sidebarMobileTitle: 'Содержание',
    },
    upload: {
        selectFile: 'Выбрать файл',
        selectFiles: 'Выбрать файлы',
    },
    copyText: {
        copy: 'Скопировать',
    },
    columnSettings: {
        configure: 'Настроить колонки',
        reset: 'Сбросить',
        resetTo: 'на {title}',
        resetChanges: 'изменения',
    },
    dropdownMenu: {
        placeholder: 'Перейти к',
    },
    datePicker: {
        weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        notSelected: 'Дата не выбрана',
        firstDay: 1,
    },
    htmlEditor: {
        language: null,
        blocks: {
            paragraph: 'Обычный текст',
            h1: 'Заголовок 1',
            h2: 'Заголовок 2',
            h3: 'Заголовок 3',
            h4: 'Заголовок 4',
            blockquote: 'Цитата',
            code: 'Код',
            note: 'Заметка',
            attention: 'Внимание',
            success: 'Успех',
            error: 'Ошибка',
        },
    },
};

export default ru;
