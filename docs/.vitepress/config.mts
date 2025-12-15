import { defineConfig } from 'vitepress'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Startup UI",
    description: "Библиотека компонентов для Vue3",
    lang: 'ru',
    appearance: false,
    themeConfig: {
        nav: [
            { text: 'Знакомство', link: '/pages/welcome/basics/about', activeMatch: '/pages/welcome' },
            { text: 'Компоненты', link: '/pages/components/forms/sform', activeMatch: '/pages/components' }
        ],
        sidebar: {
            '/pages/components': [
                {
                    text: 'Формы',
                    items: [
                        { text: 'SForm > SFormRow', link: '/pages/components/forms/sform' },
                        { text: 'SInput', link: '/pages/components/forms/sinput' },
                        { text: 'SSelect', link: '/pages/components/forms/sselect' },
                        { text: 'SCheckboxGroup > SCheckbox', link: '/pages/components/forms/scheckbox' },
                        { text: 'SRadioGroup > SRadio', link: '/pages/components/forms/sradio' },
                        { text: 'SSwitch', link: '/pages/components/forms/sswitch' },
                        { text: 'SDatePicker', link: '/pages/components/forms/sdatepicker' },
                        { text: 'SHtmlEditor', link: '/pages/components/forms/shtmleditor' },
                        { text: 'SUpload', link: '/pages/components/forms/supload' },
                    ],
                },
                {
                    text: 'Данные',
                    items: [
                        { text: 'SFilterGroup > SFilter', link: '/pages/components/data/sfilter' },
                        { text: 'SPagination', link: '/pages/components/data/spagination' },
                        { text: 'STable', link: '/pages/components/data/stable' },
                        { text: 'STree', link: '/pages/components/data/stree' },
                    ],
                },
                {
                    text: 'Интерфейсы',
                    items: [
                        { text: 'SButton', link: '/pages/components/interfaces/sbutton' },
                        { text: 'SActionIcon', link: '/pages/components/interfaces/sactionicon' },
                        { text: 'STooltip', link: '/pages/components/interfaces/stooltip' },
                        { text: 'SNote', link: '/pages/components/interfaces/snote' },
                        { text: 'SToggleGroup > SToggle', link: '/pages/components/interfaces/stoggle' },
                        { text: 'SConfirm', link: '/pages/components/interfaces/sconfirm' },
                        { text: 'SDialog', link: '/pages/components/interfaces/sdialog' },
                        { text: 'SImagePreview', link: '/pages/components/interfaces/simagepreview' },
                        { text: 'SAlert', link: '/pages/components/interfaces/salert' },
                        { text: 'STag', link: '/pages/components/interfaces/stag' },
                        { text: 'SStatus', link: '/pages/components/interfaces/sstatus' },
                        { text: 'SActionBar', link: '/pages/components/interfaces/sactionbar' },
                        { text: 'SProgressBar', link: '/pages/components/interfaces/sprogressbar' },
                        { text: 'SCopyText', link: '/pages/components/interfaces/scopytext' },
                        { text: 'STimeline', link: '/pages/components/interfaces/stimeline' },
                        { text: 'SDashboard > SDashboardItem', link: '/pages/components/interfaces/sdashboard' },
                        { text: 'SStat', link: '/pages/components/interfaces/sstat' },
                    ],
                },

                {
                    text: 'Шаблон',
                    items: [
                        { text: 'SCanvas + SFooter', link: '/pages/components/template/scanvas' },
                        { text: 'SDropdownMenu', link: '/pages/components/template/sdropdownmenu' },
                        { text: 'SHorizontalMenu', link: '/pages/components/template/shorizontalmenu' },
                        { text: 'SVerticalMenu', link: '/pages/components/template/sverticalmenu' },
                    ]
                }
            ],

            // Сайдбар для Знакомства
            '/pages/welcome': [
                {
                    text: 'Основы',
                    items: [
                        { text: 'Что такое Startup UI', link: '/pages/welcome/basics/about' },
                        { text: 'Установка', link: '/pages/welcome/basics/installing' },
                        { text: 'Цвета и настройки', link: '/pages/welcome/basics/colors' },
                        { text: 'Иконки', link: '/pages/welcome/basics/icons' }
                    ]
                },
                {
                    text: 'Дополнительно',
                    items: [
                        { text: 'Вайб-кодинг', link: '/pages/welcome/extras/vibe-coding' },
                        { text: 'Гайдлайн разработки', link: '/pages/welcome/extras/guideline' },
                        { text: 'Обновление документации', link: '/pages/welcome/extras/docs-update' }
                    ]
                }
            ]
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/rsukhar/startup-ui' }],
        outline: {
            level: [2, 3],
            label: 'На этой странице'
        },
        docFooter: {
            prev: 'Предыдущая страница',
            next: 'Следующая страница'
        },
        footer: {
            message: "Доступен под лицензией MIT",
            copyright: "© 2025 <a href=\"https://suhar.ru\" target=\"_blank\">Стартап-бюро «Сухарь и партнеры»</a>",
        }
    },
    markdown: {
        theme: {
            name: 'my-custom-theme',
            settings: [
                {
                    scope: ['entity.name.tag'],
                    settings: { foreground: 'var(--vp-code-tag)', fontStyle: '' }
                },
                {
                    scope: ['entity.other.attribute-name', 'meta.directive.vue'],
                    settings: { foreground: 'var(--vp-code-attr)', fontStyle: '' }
                }
            ],
            bg: 'var(--vp-code-bg)',
            fg: 'var(--vp-code-fg)'
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                        // Этот код подключает SCSS-миксины, переменные и т.д. во все <style lang="scss">
                        additionalData: `                        @use "${path.resolve(__dirname, '../../packages/startup-ui/src/styles/mixins.scss')}" as *;
                        @use "${path.resolve(__dirname, '../../packages/startup-ui/src/styles/variables.scss')}" as *;
                        `                    }
            }
        }
    },
})
