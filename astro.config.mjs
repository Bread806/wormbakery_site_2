// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wormbakery.com',
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  // 確保 public/ 下的檔案（CNAME、pic/、work_pic/）會被複製到 dist/
  // Astro 預設會這麼做，不需要額外設定
});
