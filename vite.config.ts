import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 固定使用子路徑（Project Pages）
export default defineConfig(() => ({
  base: '/wormbakery_site_2/',
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
}));
