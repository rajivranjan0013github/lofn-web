import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:4000',
        changeOrigin: true,
      },
      // Same-origin stand-in for the public bucket. The bucket does not send
      // Access-Control-Allow-Origin, so the browser blocks those image loads.
      '/r2': {
        target: 'https://r2.lofnchat.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/r2/, ''),
      },
    },
  },
})
