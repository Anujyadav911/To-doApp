import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy /api calls to Express during local dev so we don't deal with CORS
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
