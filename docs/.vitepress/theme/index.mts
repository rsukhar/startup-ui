import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import '../../../packages/startup-ui/src/style.scss'
import './normalize.css'
import './custom.css'
import '../../resources/js/font-awesome.js'
import { Link } from '@inertiajs/vue3'
import { configureStartupUi } from '../../../packages/startup-ui/src/locale'
import type { App } from 'vue'
export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: App }) {
        configureStartupUi({ locale: 'en-US' })
        app.component('Link', Link)
    }
}