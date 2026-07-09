// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import fs from 'node:fs';
import path from 'node:path';

// Fungsi helper untuk mendapatkan semua file JSON secara rekursif
function getJsonFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsonFiles(filePath));
    } else if (file.endsWith('.json')) {
      results.push(filePath);
    }
  });
  return results;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://djckontraktor.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    includeFiles: getJsonFiles('./src/content'),
  }),
  integrations: [
    react(),
    keystatic(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/keystatic') && !page.includes('/login-cms')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});