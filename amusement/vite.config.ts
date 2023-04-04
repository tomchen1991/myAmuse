/*
 * @Date: 2022-01-12 11:19:29
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-04-04 17:06:12
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
  base: './'
})
