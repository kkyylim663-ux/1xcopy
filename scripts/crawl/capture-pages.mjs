// 批量抓取所有缺失页面的结构、按钮、布局
// 输出: _ignore/pages/<slug>.json + _ignore/pages/screenshots/
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://malay.1xbet.com";
const OUT = path.resolve("_ignore/pages");
const SS = path.join(OUT, "screenshots");
fs.mkdirSync(SS, { recursive: true });
fs.mkdirSync("docs/research/slots-ref", { recursive: true });

const PAGES = [
  { slug: "registration",        url: "/en/registration" },
  { slug: "office-account",      url: "/en/office/account" },
  { slug: "information-about",   url: "/en/information/about" },
  { slug: "information-rules",   url: "/en/information/rules" },
  { slug: "information-payment", url: "/en/information/payment" },
  { slug: "information-contacts",url: "/en/information/contacts" },
  { slug: "information-cookies", url: "/en/information/cookies" },
  { slug: "bonus-rules",         url: "/en/bonus/rules" },
  { slug: "promotions-1st",      url: "/en/promotions/1st" },
  { slug: "esports-real",        url: "/en/esports/real" },
  { slug: "top-events",          url: "/en/top-events" },
  { slug: "mobile",              url: "/en/mobile" },
  { slug: "line-football",       url: "/en/line/football" },
  { slug: "line-tennis",         url: "/en/line/tennis" },
  { slug: "live-football",       url: "/en/live/football" },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function dismissPopup(page) {
  await sleep(2000);
  for (const sel of ["[class*=close]", "[aria-label='Close']", "button:has-text('×')"]) {
    try { const b = page.locator(sel).first(); if (await b.count()) { await b.click({ timeout: 1500 }); break; } } catch {}
  }
  try { await page.keyboard.press("Escape"); } catch {}
}

async function scanPage(page) {
  return page.evaluate(() => {
    const els = [...document.querySelectorAll("a[href],button,input,select,[role=button],[role=tab]")];
    return {
      title: document.title,
      finalUrl: location.href,
      h1: [...document.querySelectorAll("h1,h2")].slice(0,5).map(h=>h.innerText.trim().slice(0,80)),
      sections: [...document.querySelectorAll("[class*=section],[class*=block],[class*=panel],[class*=tab],[class*=nav],[class*=menu],[class*=form],[class*=aside],[class*=account],[class*=office],[class*=balance],[class*=profile],[class*=register]")]
        .filter(e=>e.getBoundingClientRect().height>40)
        .slice(0,20)
        .map(e=>({ cls: e.className?.toString?.().slice(0,80), tag: e.tagName, h: Math.round(e.getBoundingClientRect().height), y: Math.round(e.getBoundingClientRect().y + scrollY) })),
      buttons: els.filter(e=>{const r=e.getBoundingClientRect(); return r.width>0&&r.height>0}).slice(0,60).map(e=>{
        const r=e.getBoundingClientRect(), cs=getComputedStyle(e);
        let href=e.getAttribute("href")||"";
        try{ if(href){const u=new URL(href,location.href); href=u.host===location.host?u.pathname:"(外站)";} }catch{}
        return { tag:e.tagName.toLowerCase(), text:(e.innerText||e.getAttribute("aria-label")||e.getAttribute("placeholder")||"").trim().replace(/\s+/g," ").slice(0,40), type:e.getAttribute("type")||"", name:e.getAttribute("name")||"", href, cls:e.className?.toString?.().slice(0,80), w:Math.round(r.width), h:Math.round(r.height), y:Math.round(r.y+scrollY), bg:cs.backgroundColor, radius:cs.borderRadius };
      }),
      inputs: [...document.querySelectorAll("input,select,textarea")].map(i=>({ tag:i.tagName, type:i.type, name:i.name, placeholder:i.placeholder, id:i.id, cls:i.className?.toString?.().slice(0,60) })),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      pageH: document.body.scrollHeight,
    };
  });
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
const results = {};

for (const { slug, url } of PAGES) {
  console.log(`→ ${slug} ${url}`);
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: "en-US" });
  try {
    await page.goto(BASE + url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(()=>{});
    await dismissPopup(page);
    const data = await scanPage(page);
    data.slug = slug; data.requestedUrl = url;
    results[slug] = data;
    await page.screenshot({ path: path.join(SS, `${slug}.png`), fullPage: false });
    console.log(`  ✓ title="${data.title.slice(0,50)}" finalUrl=${new URL(data.finalUrl).pathname} buttons=${data.buttons.length} inputs=${data.inputs.length}`);
  } catch(e) {
    results[slug] = { slug, requestedUrl: url, error: e.message.split("\n")[0] };
    console.log(`  ✗ ${e.message.split("\n")[0]}`);
  }
  await page.close();
}

fs.writeFileSync(path.join(OUT, "all.json"), JSON.stringify(results, null, 1));

// 写 Markdown 摘要
let md = `# 缺失页面结构报告\n> ${new Date().toISOString()}\n\n`;
for (const [slug, d] of Object.entries(results)) {
  if (d.error) { md += `## ${slug}\n> ⚠️ ${d.error}\n\n`; continue; }
  md += `## ${slug}\n`;
  md += `- 请求: \`${d.requestedUrl}\` → 实际落点: \`${new URL(d.finalUrl).pathname}\`\n`;
  md += `- 标题: ${d.title?.slice(0,60)}\n`;
  md += `- h1/h2: ${d.h1?.join(" | ")}\n`;
  md += `- 页高: ${d.pageH}px，输入框: ${d.inputs?.length}\n`;
  if (d.inputs?.length) md += `- 字段: ${d.inputs.map(i=>`${i.tag}[${i.type}] name="${i.name}" placeholder="${i.placeholder}"`).join("; ")}\n`;
  md += `- 关键区块:\n${(d.sections||[]).slice(0,8).map(s=>`  - \`${s.cls.slice(0,60)}\` h=${s.h} y=${s.y}`).join("\n")}\n`;
  md += `- 按钮(前15): ${(d.buttons||[]).slice(0,15).map(b=>`\`${b.text||b.href||b.name}\``).join(", ")}\n\n`;
}
fs.writeFileSync("docs/research/slots-ref/pages.md", md);
await browser.close();
console.log("\n✓ 完成 →", "docs/research/slots-ref/pages.md");
