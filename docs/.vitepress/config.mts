import { defineConfig } from 'vitepress'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "startup-ui",
    description: "Docs for frontend components.",
    lang: 'ru',
    themeConfig: {
        nav: [
            { text: 'Знакомство', link: '/pages/welcome' },
            { text: 'Компоненты', link: '/pages/components' }
        ],
        sidebar: [
            {
                text: 'Фронтенд компоненты',
                items: [
                    { text: 'Формы', link: '/pages/forms/sform',
                        items: [
                            { text: 'SForm > SFormRow', link: '/pages/forms/sform.html' },
                            { text: 'SInput', link: '/pages/forms/sinput' },
                            { text: 'SSelect', link: '/pages/forms/sselect' },
                            { text: 'SCheckbox', link: '/pages/forms/scheckbox' },
                            { text: 'SRadio', link: '/pages/forms/sradio' },
                            { text: 'SSwitch', link: '/pages/forms/sswitch' },
                            { text: 'SDatePicker', link: '/pages/forms/sdatepicker' },
                            { text: 'SHtmlEditor', link: '/pages/forms/shtmleditor' },
                            { text: 'SUpload', link: '/pages/forms/supload' },
                        ],
                    },
                    { text: 'Данные', link: '/pages/data/sfilter',
                        items: [
                            { text: 'SFilter', link: '/pages/data/sfilter' },
                            { text: 'SPagination', link: '/pages/data/spagination' },
                            { text: 'STable', link: '/pages/data/stable' },
                            { text: 'STree', link: '/pages/data/stree' },
                        ],
                    },
                    { text: 'Интерфейсы', link: '/pages/interfaces/sbutton',
                        items: [
                            { text: 'SButton', link: '/pages/interfaces/sbutton' },
                            { text: 'SActionIcon', link: '/pages/interfaces/sactionicon' },
                            { text: 'STooltip', link: '/pages/interfaces/stooltip' },
                            { text: 'SNote', link: '/pages/interfaces/snote' },
                            { text: 'SToggleGroup + SToggle', link: '/pages/interfaces/stoggle' },
                            { text: 'SConfirm', link: '/pages/interfaces/sconfirm' },
                            { text: 'SDialog', link: '/pages/interfaces/sdialog' },
                            { text: 'SImagePreview', link: '/pages/interfaces/simagepreview' },
                            { text: 'SAlert', link: '/pages/interfaces/salert' },
                            { text: 'STag', link: '/pages/interfaces/stag' },
                            { text: 'SStatus', link: '/pages/interfaces/sstatus' },
                            { text: 'SActionBar', link: '/pages/interfaces/sactionbar' },
                            { text: 'SProgressBar', link: '/pages/interfaces/sprogressbar' },
                            { text: 'SCopyText', link: '/pages/interfaces/scopytext' },
                            { text: 'STimeline', link: '/pages/interfaces/stimeline' },
                            { text: 'SDashboard + SDashboardItem', link: '/pages/interfaces/sdashboard' },
                            { text: 'SStat', link: '/pages/interfaces/sstat' },
                        ],
                    },
                    { text: 'Шаблон', link: '/pages/template/scanvas', 
                        items: [
                            { text: 'SCanvas + SFooter', link: '/pages/template/scanvas' },
                            { text: 'SDropdownMenu', link: '/pages/template/sdropdownmenu' },
                            { text: 'SHorizontalMenu', link: '/pages/template/shorizontalmenu' },
                            { text: 'SVerticalMenu', link: '/pages/template/sverticalmenu' },
                        ]
                    }
                ]
            }
        ],
        socialLinks: [{ icon: 'github', link: 'https://github.com/rsukhar/startup-ui' }],
        outline: {
            level: [2, 3],
            label: 'На этой странице'
        },
        docFooter: {
            prev: 'Предыдущая страница',
            next: 'Следующая страница'
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                        // Этот код подключает SCSS-миксины, переменные и т.д. во все <style lang="scss">
                        additionalData: `
                        @use "${path.resolve(__dirname, '../../packages/startup-ui/src/styles/mixins.scss')}" as *;
                        @use "${path.resolve(__dirname, '../../packages/startup-ui/src/styles/variables.scss')}" as *;
                        `
                    }
            }
        }
    },
})
