import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { fileURLToPath, URL } from 'node:url'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return{
  plugins: [vue()],
  define: {
    'process.env.API_URL': JSON.stringify(env.API_URL)
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'],
    alias: {
        '@': `${path.resolve(__dirname, 'src')}/`
    }
  }}
})
