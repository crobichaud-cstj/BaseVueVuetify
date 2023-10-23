// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import electron from 'vite-plugin-electron'
import Renderer from 'vite-plugin-electron-renderer'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['vuetify'],
    // or include: ['vuetify'], ?
  },
  plugins: [
    electron([

      {

        // Main-Process entry file of the Electron App.

        entry: 'electron/main.ts',

      },

      {

        entry: 'electron/preload.ts',

        onstart(options) {

          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,

          // instead of restarting the entire Electron App.

          options.reload()

        },

      },

    ]),
    Renderer(),
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
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
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],

  },
  server: {
    port: 3000,
  },
})
