import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
    strictPort: true,
    hmr: {
      port: 5175,
    },
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' fonts.googleapis.com fonts.gstatic.com cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com cdn.tailwindcss.com; img-src 'self' data: blob: fonts.gstatic.com *.githubusercontent.com; font-src 'self' data: fonts.gstatic.com; connect-src 'self' fonts.googleapis.com *.googleapis.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests; media-src 'self'",
    },
  },
  preview: {
    port: 5175,
    host: true,
    strictPort: true,
  },
});
