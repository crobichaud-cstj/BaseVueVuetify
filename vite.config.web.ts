import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import Renderer from 'vite-plugin-electron-renderer'
import electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        exclude: ['vuetify'],
        // or include: ['vuetify'], ?
    },
    plugins: [
        vue(),
        Renderer(),
        vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/settings.scss',
            },
        }),
        ViteFonts({
            google: {
                families: [{
                    name: 'Roboto',
                    styles: 'wght@100;300;400;500;700;900',
                }],
            },
        }),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
