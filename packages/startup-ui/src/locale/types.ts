export interface StartupUiMessages {
    confirm: {
        title: string;
        accept: string;
        cancel: string;
    };
    pagination: {
        shown: string;
        of: string;
        /** Supports the {n} placeholder */
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
        /** Supports the {title} placeholder */
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
        /** First day of the week: 0 — Sunday, 1 — Monday */
        firstDay: number;
    };
    htmlEditor: {
        /** TinyMCE interface language code (requires a language pack). null — do not set (UI stays English) */
        language: string | null;
        /** Localized block labels: key — format, value — label */
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
