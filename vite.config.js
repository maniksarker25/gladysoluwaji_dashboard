import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Pages are lazy-loaded in src/router, so Vite already splits the bundle per page.
// Avoid manualChunks for vendor libraries: grouping React/Jodit by hand created a
// circular chunk import that crashed the app at startup.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
