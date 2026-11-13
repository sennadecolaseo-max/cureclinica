// Remove do CSS gerado (Elementor/tema) os seletores que nenhuma página usa.
// Roda depois do `astro build`, sobre a pasta dist.
import { PurgeCSS } from 'purgecss';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(dist);
const html = files.filter((f) => f.endsWith('.html'));
const js = files.filter((f) => f.endsWith('.js') && f.includes('/_astro/'));
const css = files.filter((f) => f.endsWith('.css') && f.includes('/_astro/'));

const result = await new PurgeCSS().purge({
  content: [...html, ...js].map((f) => ({ raw: readFileSync(f, 'utf8'), extension: f.endsWith('.js') ? 'js' : 'html' })),
  css: css.map((f) => ({ raw: readFileSync(f, 'utf8'), name: f })),
  safelist: {
    standard: [/^swiper/, /^elementor-sticky/, /^elementor-active$/, /^e-lazyloaded$/, /^elementor-invisible$/, /^animated/, /^sub-arrow$/],
    deep: [/^swiper/],
    greedy: [/swiper/],
  },
  keyframes: true,
  fontFace: true,
  variables: false,
});

let before = 0;
let after = 0;
for (const r of result) {
  before += statSync(r.file).size;
  writeFileSync(r.file, r.css);
  after += r.css.length;
}
console.log(`[purge-css] ${(before / 1024).toFixed(0)} KiB -> ${(after / 1024).toFixed(0)} KiB`);

// Inline do CSS (já enxuto) nos HTMLs: elimina a requisição que bloqueia a renderização.
for (const h of html) {
  let t = readFileSync(h, 'utf8');
  t = t.replace(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)">/g, (m, href) => {
    const f = join(dist, href.replace(/^\//, ''));
    return `<style>${readFileSync(f, 'utf8')}</style>`;
  });
  writeFileSync(h, t);
}
console.log('[purge-css] CSS inline nos HTMLs');
