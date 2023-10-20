/*
 * @Date: 2022-01-12 11:19:29
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-10-20 10:28:18
 * @FilePath: /amusement/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/*.vue', 'src/**/*.vue']
    })
  ],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8901',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
