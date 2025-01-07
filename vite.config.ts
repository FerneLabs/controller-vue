import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import wasm from "vite-plugin-wasm";
import fs from 'fs';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    wasm(),
    topLevelAwait(),
  ],
  // Needed for deployment on fernelabs.tech
  // base: '/embedded/tg-controller-vue/',
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
