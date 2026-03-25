<script setup>
import DefaultTheme from 'vitepress/theme'
import CodeGroupToggle from './CodeGroupToggle.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #layout-bottom>
            <CodeGroupToggle />
        </template>
    </Layout>
</template>
