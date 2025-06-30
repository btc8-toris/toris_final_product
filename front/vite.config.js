import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['f323-133-207-116-98.ngrok-free.app'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
});
