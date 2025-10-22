import react from '@vitejs/plugin-react'
import * as path from 'node:path';
import {defineConfig} from 'vite'


export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
})