<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import SAlert from '../../../packages/startup-ui/src/components/SAlert/SAlert.vue'

const route = useRoute()
const alert = ref()

const ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`

async function init() {
    await nextTick()
    document.querySelectorAll('.vp-code-group:not([data-toggle])').forEach(group => {
        group.dataset.toggle = '1'

        const blocks = Array.from(group.querySelectorAll('.blocks > [class*="language-"]'))
        if (blocks.length < 2) return

        const radios = Array.from(group.querySelectorAll('input[type="radio"]'))

        const btn = document.createElement('button')
        btn.className = 'vp-code-toggle'
        btn.title = 'Показать весь код'
        btn.innerHTML = ICON

        let current = 0
        btn.addEventListener('click', () => {
            current = current === 0 ? 1 : 0
            blocks.forEach((b, j) => b.classList.toggle('active', j === current))
            if (radios[current]) radios[current].checked = true
            btn.title = current === 0 ? 'Показать весь код' : 'Свернуть'
        })

        group.style.position = 'relative'
        group.appendChild(btn)
    })
}

function onCopyClick(e) {
    const btn = e.target.closest('button.copy')
    if (!btn) return
    // Даём VitePress скопировать, потом показываем алерт
    setTimeout(() => alert.value?.info('Код скопирован в буфер обмена'), 50)
}

onMounted(() => {
    init()
    document.addEventListener('click', onCopyClick)
})
watch(() => route.path, init)
</script>

<template>
    <SAlert ref="alert" />
</template>
