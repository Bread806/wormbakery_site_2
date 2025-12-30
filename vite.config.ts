import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 若要部署到 https://<user>.github.io/wormbakery_site_2/，保留下面 base
  base: process.env.GH_PAGES ? '/wormbakery_site_2/' : '/',
  plugins: [react()],
});
