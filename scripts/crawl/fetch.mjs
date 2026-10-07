/**
 * fetch.mjs - Crawl HTML pages and CSS bundles from the source site.
 * Usage: node fetch.mjs --group A|B|C|all|css
 * Output: _ignore/raw/<slug>.html  _ignore/css/<hash>.css  _ignore/crawl-log.json
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..', '..');
const ROUTES_JSON = JSON.parse(readFileSync(join(__dir, 'routes.json'), 'utf8'));

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36';
const DELAY_MS = 2000;
const MAX_RETRY = 1;

const arg = process.argv.find(a => a.startsWith('--group=') || a === '--group');
const groupVal = arg
  ? (arg.includes('=') ? arg.split('=')[1] : process.argv[process.argv.indexOf(arg) + 1])
  : 'all';

function slug(url) {
  return url.replace(/^https?:\/\/[^/]+/, '').replace(/\//g, '_').replace(/^_/, '') || 'index';
}

async function fetchUrl(url, retries = MAX_RETRY) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries) throw e;
      await sleep(DELAY_MS);
    }
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const log = [];

async function crawlGroup(groupId) {
  const group = ROUTES_JSON.groups[groupId];
  if (!group) { console.error(`Unknown group: ${groupId}`); process.exit(1); }
  const outDir = join(ROOT, '_ignore', 'raw');
  mkdirSync(outDir, { recursive: true });

  for (const route of group.routes) {
    const url = ROUTES_JSON.base + route;
    const file = join(outDir, slug(route) + '.html');
    if (existsSync(file)) {
      console.log(`[SKIP] ${url}`);
      log.push({ url, file, status: 'skip' });
      continue;
    }
    try {
      console.log(`[FETCH] ${url}`);
      const html = await fetchUrl(url);
      writeFileSync(file, html, 'utf8');
      log.push({ url, file, status: 'ok', size: html.length });
      console.log(`  → ${file} (${html.length} bytes)`);
    } catch (e) {
      console.error(`  ✗ ${e.message}`);
      log.push({ url, file, status: 'error', error: e.message });
    }
    await sleep(DELAY_MS);
  }
}

async function crawlCSS() {
  const outDir = join(ROOT, '_ignore', 'css');
  mkdirSync(outDir, { recursive: true });
  for (const path of ROUTES_JSON.sharedCSS) {
    const url = ROUTES_JSON.base + path;
    const file = join(outDir, slug(path) + '.css');
    if (existsSync(file)) { console.log(`[SKIP] ${url}`); continue; }
    try {
      console.log(`[FETCH CSS] ${url}`);
      const css = await fetchUrl(url);
      writeFileSync(file, css, 'utf8');
      log.push({ url, file, status: 'ok', size: css.length });
      console.log(`  → ${file}`);
    } catch (e) {
      console.error(`  ✗ ${e.message}`);
      log.push({ url, file, status: 'error', error: e.message });
    }
    await sleep(DELAY_MS);
  }
}

// main
if (groupVal === 'css') {
  await crawlCSS();
} else if (groupVal === 'all') {
  for (const g of Object.keys(ROUTES_JSON.groups)) await crawlGroup(g);
  await crawlCSS();
} else {
  await crawlGroup(groupVal.toUpperCase());
}

const logFile = join(ROOT, '_ignore', 'crawl-log.json');
let existing = [];
if (existsSync(logFile)) { try { existing = JSON.parse(readFileSync(logFile)); } catch {} }
writeFileSync(logFile, JSON.stringify([...existing, ...log], null, 2));
console.log(`\nDone. Log → ${logFile}`);
