export interface StartupUiMessages {
    confirm: {
        title: string;
        accept: string;
        cancel: string;
    };
    pagination: {
        shown: string;
        of: string;
        /** Поддерживает плейсхолдер {n} */
        perPage: string;
    };
    select: {
        noData: string;
    };
    table: {
        noData: string;
    };
    canvas: {
        sidebarMobileTitle: string;
    };
    upload: {
        selectFile: string;
        selectFiles: string;
    };
    copyText: {
        copy: string;
    };
    columnSettings: {
        configure: string;
        reset: string;
        /** Поддерживает плейсхолдер {title} */
        resetTo: string;
        resetChanges: string;
    };
    dropdownMenu: {
        placeholder: string;
    };
    datePicker: {
        weekDays: string[];
        months: string[];
        notSelected: string;
    };
    htmlEditor: {
        /** Код языка интерфейса TinyMCE (требует наличия языкового пака). null — не задавать (UI остаётся английским) */
        language: string | null;
        /** Локализованные подписи блоков: ключ — формат, значение — подпись */
        blocks: {
            paragraph: string;
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            blockquote: string;
            code: string;
            note: string;
            attention: string;
            success: string;
            error: string;
        };
    };
}

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends (infer U)[]
        ? T[K]
        : T[K] extends object
            ? DeepPartial<T[K]>
            : T[K];
};

export type StartupUiLocaleMessages = Record<string, DeepPartial<StartupUiMessages>>;
