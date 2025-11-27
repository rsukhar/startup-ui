import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import path from 'path';

export default defineConfig({
    plugins: [vue(), dts({
        entryRoot: 'src',
        outDir: 'dist/types',
        insertTypesEntry: true,
        tsconfigPath: './tsconfig.json'
    })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `                    @use "@/styles/variables.scss" as *;
                    @use "@/styles/mixins.scss" as *;
                `            }
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'StartupUI',
            fileName: (format) => `startup-ui.${format}.js`,
            formats: ['es', 'cjs']
        },
        cssCodeSplit: true,
        rollupOptions: {
            external: [
                'vue',
                '@vueuse/core',
                '@tinymce/tinymce-vue',
                /^tinymce(\/.*)?$/,
                '@inertiajs/vue3'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    '@vueuse/core': 'VueUse',
                    tinymce: 'tinymce',
                    '@tinymce/tinymce-vue': 'TinyMCEVue',
                    '@inertiajs/vue3': 'InertiaVue3'
                },
                exports: 'named'
            }
        },  
        sourcemap: true,
        target: 'es2019',
    }
});