// Base dos arquivos de mídia (imagens e vídeo).
// Hoje aponta para o WordPress original. Para tornar o site 100% independente,
// copie as mídias para public/uploads/ mantendo a estrutura (ex.: 2026/01/tania-machado.webp)
// e troque o valor abaixo por '/uploads'.
export const ASSET_BASE = 'https://cureclinica.com.br/wp-content/uploads';

export const asset = (path: string) => `${ASSET_BASE}/${path}`;

export const WHATSAPP_URL =
  'https://wa.me/5511943352498?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20Tratamentos';
