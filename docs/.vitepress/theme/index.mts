import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import '../../../packages/startup-ui/src/style.scss'
import '../../../packages/startup-ui/src/styles/defaults.css'
import './normalize.css'
import './custom.css'
import '../../resources/js/font-awesome.js'
import Demo from './Demo.vue'
import StartupUI from 'startup-ui'
import { Link } from '@inertiajs/vue3'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { configureStartupUi } from '../../../packages/startup-ui/src/locale'
import type { App } from 'vue'
export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: App }) {
        // Globally register all S-components so demos (and prose) need no per-page imports.
        app.use(StartupUI)
        configureStartupUi({ locale: 'ru' })
        app.component('Demo', Demo)
        app.component('Link', Link)
        app.component('FontAwesomeIcon', FontAwesomeIcon)
    }
}