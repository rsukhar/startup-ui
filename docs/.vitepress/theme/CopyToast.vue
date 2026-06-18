<script setup>
import { ref, onMounted } from 'vue'
import SAlert from '../../../packages/startup-ui/src/components/SAlert/SAlert.vue'

const alert = ref()

// Show a toast when the user copies a standalone code block via VitePress's
// native copy button. Live :::demo blocks use their own copy button (Demo.vue).
function onCopyClick(e) {
    const btn = e.target.closest('button.copy')
    if (!btn) return
    // Let VitePress copy first, then surface the toast.
    setTimeout(() => alert.value?.info('Код скопирован в буфер обмена'), 50)
}

onMounted(() => document.addEventListener('click', onCopyClick))
</script>

<template>
    <SAlert ref="alert" />
</template>
