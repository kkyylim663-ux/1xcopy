/**
 * extract-styles.mjs - Parse CSS bundles → tokens.json + animations.md
 * Reads _ignore/css/*.css
 * Output:
 *   docs/research/slots-ref/tokens.json
 *   docs/research/slots-ref/animations.md
 *   src/styles/tokens.css
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const CSS_DIR = join(ROOT, '_ignore', 'css');
const OUT_DIR = join(ROOT, 'docs', 'research', 'slots-ref');
mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
let allCSS = '';
for (const f of files) {
  allCSS += '\n/* FILE: ' + f + ' */\n' + readFileSync(join(CSS_DIR, f), 'utf8');
}

// --- Extract CSS variables ---
const varRe = /--([\w-]+)\s*:\s*([^;}{]+);/g;
const vars = {};
let vm;
while ((vm = varRe.exec(allCSS)) !== null) {
  const k = vm[1].trim();
  const v = vm[2].trim();
  if (!vars[k]) vars[k] = v; // keep first definition
}

// Categorize
const tokens = { colors: {}, spacing: {}, font: {}, radius: {}, zIndex: {}, other: {} };
for (const [k, v] of Object.entries(vars)) {
  if (/color|bg|background|text|fill|stroke|border/.test(k)) tokens.colors[k] = v;
  else if (/spacing|gap|margin|padding|size/.test(k)) tokens.spacing[k] = v;
  else if (/font|text|line|letter/.test(k)) tokens.font[k] = v;
  else if (/radius|rounded/.test(k)) tokens.radius[k] = v;
  else if (/z-index|z-/.test(k)) tokens.zIndex[k] = v;
  else tokens.other[k] = v;
}

// --- Extract @keyframes ---
const kfRe = /@keyframes\s+([\w-]+)\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g;
const keyframes = [];
let kfm;
while ((kfm = kfRe.exec(allCSS)) !== null) {
  keyframes.push({ name: kfm[1], body: kfm[2].trim().slice(0, 200) });
}

// --- Extract transitions ---
const transRe = /([.#\w][^{}]{0,120})\{[^}]*transition\s*:\s*([^;}]+)/g;
const transitions = [];
let trm;
while ((trm = transRe.exec(allCSS)) !== null) {
  const sel = trm[1].trim().split('\n').pop().trim();
  transitions.push({ selector: sel, value: trm[2].trim().slice(0, 120) });
}

// --- Extract hover/focus rules ---
const hoverRe = /([.#\w][^{}]{0,80}:(?:hover|focus|active|focus-within))\s*\{([^}]{0,300})\}/g;
const hovers = [];
let hm;
while ((hm = hoverRe.exec(allCSS)) !== null) {
  hovers.push({ selector: hm[1].trim(), props: hm[2].trim().replace(/\s+/g, ' ').slice(0, 200) });
}

// Write tokens.json
writeFileSync(join(OUT_DIR, 'tokens.json'), JSON.stringify(tokens, null, 2));
console.log('→ tokens.json');

// Write animations.md
const animLines = [
  '# Animations & Interactions',
  '',
  '## @keyframes',
  ...keyframes.map(k => `### ${k.name}\n\`\`\`\n${k.body}\n\`\`\``),
  '',
  '## Transitions (sample, first 30)',
  '| Selector | transition value |',
  '|---|---|',
  ...transitions.slice(0, 30).map(t => `| \`${t.selector}\` | \`${t.value}\` |`),
  '',
  '## Hover/Focus rules (sample, first 30)',
  '| Selector | Properties |',
  '|---|---|',
  ...hovers.slice(0, 30).map(h => `| \`${h.selector}\` | \`${h.props}\` |`),
];
writeFileSync(join(OUT_DIR, 'animations.md'), animLines.join('\n') + '\n');
console.log('→ animations.md');

// Write tokens.css
const cssVarBlock = Object.entries(vars)
  .map(([k, v]) => `  --${k}: ${v};`)
  .join('\n');
const tokensCss = `/* Auto-generated from source CSS. Edit to match brand. */\n:root {\n${cssVarBlock}\n}\n`;
const styleDir = join(ROOT, 'src', 'styles');
mkdirSync(styleDir, { recursive: true });
writeFileSync(join(styleDir, 'tokens.css'), tokensCss);
console.log('→ src/styles/tokens.css');

console.log(`\nSummary: ${Object.keys(vars).length} vars, ${keyframes.length} keyframes, ${transitions.length} transitions, ${hovers.length} hover rules`);
