import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
//コミットようにコメント追加

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: true },
      manifest: {
        name: 'TacT',
        short_name: 'TacT',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            sizes: '192x192',
            src: 'tact_192x192.png',
            type: 'image/png',
          },
          {
            sizes: '512x512',
            src: 'tact_512x512.png',
            type: 'image/png',
          },
          {
            sizes: '512x512',
            src: 'tact_512x512.png',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    allowedHosts: ['f323-133-207-116-98.ngrok-free.app'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
});
