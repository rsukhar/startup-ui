import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [vue(), dts({
        entryRoot: 'src',
        outDir: 'dist/types',
        tsconfigPath: './tsconfig.json'
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'StartupUI',
            fileName: (format) => `startup-ui.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: { vue: 'Vue' }
            }
        },
        sourcemap: true,
        target: 'es2019',
        cssCodeSplit: true,
    }
});