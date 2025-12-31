import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // When building for GitHub Pages we set GH_PAGES=1 in the build environment.
  // Use that to set the base so assets are emitted with the correct subpath.
  base: process.env.GH_PAGES ? '/wormbakery_site_2/' : '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
