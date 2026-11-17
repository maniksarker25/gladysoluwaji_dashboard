import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Split large, rarely-changing libraries into their own cacheable chunks.
const vendorChunks = {
  'vendor-react': ['react', 'react-dom', 'react-router', 'react-router-dom', 'scheduler'],
  'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux', 'immer', 'reselect'],
  'vendor-charts': ['chart.js', 'react-chartjs-2'],
  'vendor-editor': ['jodit', 'jodit-react'],
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          for (const [chunk, pkgs] of Object.entries(vendorChunks)) {
            if (pkgs.some((p) => id.includes(`/node_modules/${p}/`))) return chunk
          }
        },
      },
    },
  },
})
