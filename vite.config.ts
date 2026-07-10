import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['kylix.svg', 'icons/apple-touch-icon.png'],
      workbox: {
        // Precache the app shell AND every curriculum text: the whole
        // Year 1 library reads offline after first visit.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}', 'texts/**/*.json'],
      },
      manifest: {
        name: 'Symposium',
        short_name: 'Symposium',
        description:
          'Studia Humanitatis — a Great Books curriculum and tutorial companion.',
        start_url: '.',
        display: 'standalone',
        background_color: '#EFE8D8',
        theme_color: '#EFE8D8',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
