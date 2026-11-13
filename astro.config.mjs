import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cureclinica.com.br',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    // O CSS do Elementor tem seletores que o lightningcss rejeita; esbuild minifica sem erro.
    build: { cssMinify: 'esbuild' },
  },
});
