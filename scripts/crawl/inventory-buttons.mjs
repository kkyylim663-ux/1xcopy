// 列出页面上所有可交互元素（按钮/链接/输入框）及所在区域、样式、行为。
// 用法: node inventory-buttons.mjs <url> <label>   输出: docs/research/slots-ref/inventory-<label>.json
import { chromium } from "playwright";
import fs from "node:fs";

const [url, label] = [process.argv[2], process.argv[3] || "page"];
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, locale: "en-US" });
await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
await p.waitForTimeout(3000);

const scan = () => p.evaluate(() => {
  const REGION = [
    ["header", /header|navigation/i], ["sidebar", /aside|sidebar/i], ["footer", /footer/i],
    ["modal", /modal|dialog|popup|dropdown/i], ["banner", /banner|swiper|slider/i],
  ];
  const regionOf = (el) => {
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const c = (a.className?.toString?.() || "") + " " + a.tagName;
      for (const [n, re] of REGION) if (re.test(c)) return n;
    }
    return "main";
  };
  const blockOf = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const c = a.className?.toString?.() || "";
      const m = c.split(/\s+/).find((x) => /^[a-z]+(-[a-z]+)*(__|$)/.test(x) && x.length > 4);
      if (m) return m.slice(0, 50);
    }
    return "";
  };
  const els = [...document.querySelectorAll("a[href], button, input, select, textarea, [role=button], [role=tab]")];
  return els.map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width === 0 || r.height === 0 || cs.visibility === "hidden") return null;
    let href = el.getAttribute("href");
    if (href) { try { const u = new URL(href, location.href); href = u.host === location.host ? u.pathname : "(外站)"; } catch {} }
    return {
      region: regionOf(el), block: blockOf(el), tag: el.tagName.toLowerCase(),
      text: (el.innerText || el.getAttribute("aria-label") || el.getAttribute("placeholder") || el.getAttribute("title") || "").trim().replace(/\s+/g, " ").slice(0, 40),
      type: el.getAttribute("type") || "", name: el.getAttribute("name") || "",
      href: href || "", cls: (el.className?.toString?.() || "").slice(0, 90),
      x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height),
      bg: cs.backgroundColor, color: cs.color, radius: cs.borderRadius, font: `${cs.fontSize} ${cs.fontWeight}`,
      transition: cs.transition === "all 0s ease 0s" ? "" : cs.transition,
    };
  }).filter(Boolean);
});

const out = { url, at: new Date().toISOString(), elements: await scan(), sections: [], dialogs: {} };

// 页面主要区块顺序（标题）
out.sections = await p.evaluate(() =>
  [...document.querySelectorAll("h1,h2,h3,[class*=section__title],[class*=header__title]")]
    .map((h) => ({ tag: h.tagName, text: h.innerText.trim().slice(0, 50), y: Math.round(h.getBoundingClientRect().y + scrollY) }))
    .filter((h) => h.text).slice(0, 40)
);

// 点开登录/注册（只看弹出的表单结构，不填写、不提交）
for (const key of ["Log in", "Registration", "Register"]) {
  try {
    const btn = p.locator(`button:has-text("${key}"), a:has-text("${key}")`).first();
    if (!(await btn.count())) continue;
    const bb = await btn.boundingBox(); if (!bb) continue;
    await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await p.waitForTimeout(2000);
    out.dialogs[key] = await p.evaluate(() => {
      const box = [...document.querySelectorAll("[class*=modal],[class*=dialog],[class*=dropdown],[role=dialog],form")]
        .filter((e) => e.getBoundingClientRect().height > 80).pop();
      if (!box) return { url: location.pathname, found: false };
      return {
        url: location.pathname, found: true, cls: box.className.toString().slice(0, 80),
        fields: [...box.querySelectorAll("input,select,textarea")].map((i) => ({ tag: i.tagName.toLowerCase(), type: i.type, name: i.name, placeholder: i.placeholder, autocomplete: i.autocomplete })),
        buttons: [...box.querySelectorAll("button,a,[role=tab]")].map((x) => (x.innerText || x.getAttribute("aria-label") || "").trim().slice(0, 30)).filter(Boolean).slice(0, 25),
      };
    });
    await p.keyboard.press("Escape"); await p.waitForTimeout(500);
    if (!new URL(p.url()).pathname.includes("slots")) { await p.goBack().catch(() => {}); await p.waitForTimeout(1500); }
  } catch (e) { out.dialogs[key] = { error: e.message.split("\n")[0] }; }
}

fs.mkdirSync("docs/research/slots-ref", { recursive: true });
fs.writeFileSync(`docs/research/slots-ref/inventory-${label}.json`, JSON.stringify(out, null, 1));
const byRegion = {};
for (const e of out.elements) byRegion[e.region] = (byRegion[e.region] || 0) + 1;
console.log(label, "elements:", out.elements.length, JSON.stringify(byRegion), "sections:", out.sections.length, "dialogs:", Object.keys(out.dialogs).join(","));
await b.close();
