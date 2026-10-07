/**
 * extract-sections.mjs - Parse HTML → section list Markdown
 * Usage: node extract-sections.mjs <slug>   (reads _ignore/raw/<slug>.html)
 * Output: docs/research/slots-ref/routes/<slug>.md
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const RAW_DIR = join(ROOT, '_ignore', 'raw');
const OUT_DIR = join(ROOT, 'docs', 'research', 'slots-ref', 'routes');
mkdirSync(OUT_DIR, { recursive: true });

// Which files to process
const target = process.argv[2];
const files = target
  ? [`${target}.html`]
  : readdirSync(RAW_DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const slug = file.replace('.html', '');
  const html = readFileSync(join(RAW_DIR, file), 'utf8');

  // --- Extract sections ---
  const sections = [];

  // Top-level semantic sections / main landmarks
  const sectionRe = /<(header|main|footer|nav|section|aside)[^>]*class="([^"]*)"[^>]*>/gi;
  let m;
  while ((m = sectionRe.exec(html)) !== null) {
    sections.push({ tag: m[1], cls: m[2].split(/\s+/).filter(Boolean).slice(0, 3).join(' ') });
  }

  // Game cards
  const gameCards = (html.match(/class="[^"]*casino-game[^"]*"/g) || []).length;
  const providerCards = (html.match(/class="[^"]*casino-brand-slider__slide[^"]*"/g) || []).length;
  const gameLinks = (html.match(/href="\/en\/slots\/game\/\d+/g) || []);

  // Tabs
  const tabLinks = [...new Set((html.match(/href="\/en\/slots\/[a-z-]+"/g) || []))];

  // Nav links in header
  const navLinks = [...new Set((html.match(/href="\/en\/[a-z-]+"/g) || []).map(h => h.replace('href="', '').replace('"', '')))];

  // Swiper instances
  const swiperCount = (html.match(/class="swiper[^"]*"/g) || []).length;

  // Banners / hero
  const bannerCount = (html.match(/class="[^"]*banner[^"]*"/g) || []).length;

  // Page title
  const titleM = html.match(/<title>([^<]+)<\/title>/);
  const title = titleM ? titleM[1].trim() : slug;

  // Build markdown
  const lines = [
    `# Route: ${slug}`,
    `> Title: ${title}`,
    '',
    '## Sections (top → bottom)',
    ...sections.slice(0, 30).map((s, i) => `${i + 1}. \`<${s.tag}>\` · \`${s.cls}\``),
    '',
    '## Key Metrics',
    `- Game cards on page: **${gameCards}**`,
    `- Game links found: **${gameLinks.length}** (sample: ${gameLinks.slice(0, 3).map(l => l.replace('href="', '')).join(', ')})`,
    `- Provider/brand slides: **${providerCards}**`,
    `- Swiper instances: **${swiperCount}**`,
    `- Banner/hero blocks: **${bannerCount}**`,
    '',
    '## Sub-tabs',
    tabLinks.length ? tabLinks.map(t => `- \`${t}\``).join('\n') : '- (none)',
    '',
    '## Top-nav links',
    navLinks.length ? navLinks.slice(0, 15).map(l => `- \`${l}\``).join('\n') : '- (none)',
    '',
    '## Notable class selectors',
    ...[...new Set((html.match(/class="[^"]{8,60}"/g) || [])
      .map(c => c.replace(/class="|"/g, '').split(/\s+/)[0])
      .filter(c => c.includes('-') && !c.startsWith('nuxt') && !c.startsWith('v-'))
    )].slice(0, 25).map(c => `- \`.${c}\``),
  ];

  const out = join(OUT_DIR, `${slug}.md`);
  writeFileSync(out, lines.join('\n') + '\n');
  console.log(`→ ${out} (${gameCards} cards, ${swiperCount} sliders)`);
}
