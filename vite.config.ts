import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: '/embedded/controller-vue/',
  server: {
    https: {
      key: fs.readFileSync('C:\\Windows\\System32\\cert.key'),
      cert: fs.readFileSync('C:\\Windows\\System32\\cert.crt'),
    },
    host: 'localhost',
    port: 5173, // or any preferred port
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
