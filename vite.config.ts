import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  base: "./",
  plugins: [vue(), ...(mode === 'prerelease'
  ? [
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'sunburst',
      }),
    ]
  : []),
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  build: {
    
  }
}))
