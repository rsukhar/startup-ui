<script setup>
import DefaultTheme from 'vitepress/theme'
import CopyToast from './CopyToast.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #layout-bottom>
            <CopyToast />
        </template>
    </Layout>
</template>
