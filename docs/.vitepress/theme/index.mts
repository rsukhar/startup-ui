import DefaultTheme from 'vitepress/theme'
import '../../../packages/startup-ui/src/style.scss'
import './custom.css'
import '../../resources/js/font-awesome.js'
import { Link } from '@inertiajs/vue3'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Link', Link)
    }
}