import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'https://api.pexels.com',
      changeOrigin: true,
      secure: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
})

