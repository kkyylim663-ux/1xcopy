/**
 * extract-assets.mjs - Extract SVG icons + font URLs from HTML and CSS
 * Usage: node extract-assets.mjs
 * Output: docs/research/slots-ref/asset-list.md
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');

const htmlFiles = readdirSync(join(ROOT, '_ignore', 'raw')).filter(f => f.endsWith('.html'));
const cssFiles = readdirSync(join(ROOT, '_ignore', 'css')).filter(f => f.endsWith('.css'));

let allHTML = htmlFiles.map(f => readFileSync(join(ROOT, '_ignore', 'raw', f), 'utf8')).join('\n');
let allCSS = cssFiles.map(f => readFileSync(join(ROOT, '_ignore', 'css', f), 'utf8')).join('\n');

// SVG sprite / symbol usage
const svgUse = [...new Set((allHTML.match(/xlink:href="#[^"]+"|href="#[^"]+"/g) || []).map(h => h.replace(/.*#/, '#').replace('"', '')))];
// Inline SVG files
const svgSrc = [...new Set((allHTML.match(/src="[^"]+\.svg[^"]*"/g) || []).map(s => s.replace(/src="|"/g, '')))];
// Font URLs from CSS
const fontUrls = [...new Set((allCSS.match(/url\(['"]?([^'")\s]+\.(?:woff2?|ttf|eot))['")\s]/g) || []).map(u => u.replace(/url\(['"]?/, '').replace(/['")].*/g, '')))];
// Image URLs from CSS (backgrounds)
const bgUrls = [...new Set((allCSS.match(/url\(['"]?([^'")\s]+\.(?:webp|png|jpg|svg))['")\s]/g) || []).map(u => u.replace(/url\(['"]?/, '').replace(/['")].*/g, '')))];

const lines = [
  '# Asset List',
  '',
  '## SVG Symbols (via #hash reference)',
  svgUse.slice(0, 40).map(s => `- \`${s}\``).join('\n') || '- (none)',
  '',
  '## SVG Files (via src=)',
  svgSrc.slice(0, 20).map(s => `- \`${s}\``).join('\n') || '- (none)',
  '',
  '## Font URLs (from CSS)',
  fontUrls.slice(0, 20).map(u => `- \`${u}\``).join('\n') || '- (none)',
  '',
  '## Background Image URLs (from CSS)',
  bgUrls.slice(0, 20).map(u => `- \`${u}\``).join('\n') || '- (none)',
];

writeFileSync(join(ROOT, 'docs', 'research', 'slots-ref', 'asset-list.md'), lines.join('\n') + '\n');
console.log('→ docs/research/slots-ref/asset-list.md');
