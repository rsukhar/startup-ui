import { defineConfig } from 'vitepress'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import { demoFullCodePlugin } from './demoFullCode'
import mdContainer from 'markdown-it-container'
// @ts-ignore — plain ESM helper shared with the npm-bundle generator (no .d.ts)
import { discoverComponentPages, discoverGuidePages, buildLlmsTxt, buildLlmsFull, cleanMarkdown, SITE } from '../../scripts/llm-shared.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Startup UI",
    description: "Библиотека компонентов для Vue3",
    lang: 'ru',
    appearance: false,
    cleanUrls: true,
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
                        { text: 'SColumnSettings', link: '/pages/components/interfaces/scolumnsettings' },
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
                        { text: 'Локализация', link: '/pages/welcome/basics/localization' },
                        { text: 'Иконки', link: '/pages/welcome/basics/icons' }
                    ]
                },
                {
                    text: 'Дополнительно',
                    items: [
                        { text: 'Вайб-кодинг', link: '/pages/welcome/extras/vibe-coding' },
                        { text: 'Миграция на мажор', link: '/pages/welcome/extras/migration' }
                    ]
                },
                {
                    text: 'Разработка библиотеки',
                    items: [
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
        theme: 'github-dark-default',
        codeTransformers: [
            {
                postprocess(html) {
                    return html.replace(/#ffa198/gi, '#7EE787');
                }
            }
        ],
        config: (md) => {
            // Inline live demos: ::: demo + ```vue block. Imports from 'startup-ui'
            // are rewritten to a single barrel import (Vue itself is auto-mapped to the global).
            md.use(demoBlockPlugin, {
                scriptImports: ["import * as StartupUI from 'startup-ui'"],
                scriptReplaces: [
                    {
                        searchValue: /import\s+(\{[^}]*\})\s+from\s+'startup-ui'/g,
                        replaceValue: (_s: string, s1: string) => `const ${s1} = StartupUI`,
                    },
                    {
                        // demoblock compiles a demo's <script setup> with compileScript, which marks
                        // the setup return with __isScriptSetup. demoblock then compiles the template
                        // separately (function mode) — that render reads bindings off _ctx, but the
                        // marker makes Vue hide script-setup bindings from it (value becomes undefined).
                        // Strip the marker so the setup returns a plain object → bindings stay reactive.
                        searchValue: /Object\.defineProperty\(__returned__,\s*['"]__isScriptSetup['"],\s*\{[^}]*\}\)\s*;?/g,
                        replaceValue: '',
                    },
                ],
            })
            // Code-only short/full panel (no live preview) for non-runnable snippets
            // (e.g. Inertia useForm). Two ```vue fences: 1st = full, 2nd = short.
            md.use(mdContainer, 'example', {
                render(tokens: any[], idx: number) {
                    if (tokens[idx].nesting === 1) {
                        const content = tokens[idx + 1]?.type === 'fence' ? tokens[idx + 1].content : ''
                        return `<Demo :preview="false" sourceCode="${md.utils.escapeHtml(content)}">`
                    }
                    return '</Demo>'
                },
            })
            // Adds the "show full code" variant (full SFC) next to the authored code.
            md.use(demoFullCodePlugin)
        },
    },
    // Emit the agent-readable artifacts into the production build (dist): a clean `.md` next to
    // every page (so "append .md to any docs URL" works in prod), plus a spec-shaped /llms.txt
    // index and a /llms-full.txt concatenation. Same source + helpers as the npm-bundle generator.
    async buildEnd(siteConfig) {
        const docsRoot = siteConfig.srcDir
        const outDir = siteConfig.outDir
        const componentPages = discoverComponentPages(docsRoot)
        const guidePages = discoverGuidePages(docsRoot)
        for (const p of [...guidePages, ...componentPages]) {
            const dest = path.join(outDir, `${p.route}.md`)
            fs.mkdirSync(path.dirname(dest), { recursive: true })
            fs.writeFileSync(dest, cleanMarkdown(p.src))
        }
        fs.writeFileSync(path.join(outDir, 'llms.txt'), buildLlmsTxt(componentPages, guidePages, (r: string) => `${SITE}${r}.md`))
        fs.writeFileSync(path.join(outDir, 'llms-full.txt'), buildLlmsFull(componentPages, guidePages))
    },
    vite: {
        resolve: {
            alias: {
                'tinymce': path.resolve(__dirname, '../node_modules/tinymce'),
                '@tinymce/tinymce-vue': path.resolve(__dirname, '../node_modules/@tinymce/tinymce-vue'),
                'startup-ui': path.resolve(__dirname, '../../packages/startup-ui/src'),
            }
        },
        ssr: {
            noExternal: ['@vueuse/integrations'],
        },
        plugins: [
            {
                name: 'middleware',
                configureServer(server) {
                    server.middlewares.use((req, res, next) => {
                        if (req.url?.endsWith('.html')) {
                            const newUrl = req.url.slice(0, -5);
                            res.statusCode = 301;
                            res.setHeader('Location', newUrl);
                            res.end();
                            return;
                        }
                        next();
                    });
                }
            },
            {
                // Dev-server parity for the LLM artifacts that buildEnd writes in production:
                // /llms.txt, /llms-full.txt, and a clean `.md` for any page URL (append `.md`).
                name: 'llm-md-proxy',
                configureServer(server) {
                    const docsRoot = server.config.root;
                    server.middlewares.use((req, res, next) => {
                        // IMPORTANT: only handle query-less requests. Vite loads each page's compiled
                        // `.md` module with a query string (e.g. `?t=…`); intercepting those would
                        // break client-side navigation. Direct agent fetches have no query.
                        const rawUrl = req.url || '';
                        if (rawUrl.includes('?')) { next(); return; }
                        const send = (body: string) => {
                            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
                            res.end(body);
                        };
                        if (rawUrl === '/llms.txt') {
                            return send(buildLlmsTxt(discoverComponentPages(docsRoot), discoverGuidePages(docsRoot), (r: string) => `${SITE}${r}.md`));
                        }
                        if (rawUrl === '/llms-full.txt') {
                            return send(buildLlmsFull(discoverComponentPages(docsRoot), discoverGuidePages(docsRoot)));
                        }
                        if (rawUrl.endsWith('.md')) {
                            const fullPath = path.join(docsRoot, rawUrl);
                            if (fs.existsSync(fullPath)) {
                                return send(cleanMarkdown(fs.readFileSync(fullPath, 'utf8')));
                            }
                        }
                        next();
                    });
                }
            }
        ],
        css: {
            preprocessorOptions: {
                scss: {
                        // Подключает SCSS-миксины во все <style lang="scss">. Значения --s-* приходят из defaults.css (импорт в теме).
                        additionalData: `
                        @use "${path.resolve(__dirname, '../../packages/startup-ui/src/styles/mixins.scss')}" as *;
                        `
                }
            }
        }
    }
})
