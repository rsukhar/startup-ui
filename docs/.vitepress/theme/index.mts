import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import '../../../packages/startup-ui/src/style.scss'
import './normalize.css'
import './custom.css'
import '../../resources/js/font-awesome.js'
import { Link } from '@inertiajs/vue3'
import type { App } from 'vue'
export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: App }) {
        app.component('Link', Link)
    }
}