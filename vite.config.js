import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web/',
  server: {
    host: '0.0.0.0', // Allow access from other devices
    proxy: {
      '/api': 'http://localhost:5174',
    },
  },
})
