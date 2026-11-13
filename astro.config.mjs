import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cureclinica.com.br',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
