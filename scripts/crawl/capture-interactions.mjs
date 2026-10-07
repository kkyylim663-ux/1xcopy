// 用 Playwright 抓取源站的交互与动画。输出到 _ignore/animations/（Agent 读不到）
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const URL = process.argv[2] || "https://malay.1xbet.com/en/slots";
const OUT = path.resolve("_ignore/animations");
fs.mkdirSync(OUT, { recursive: true });

const PROPS = [
  "color", "backgroundColor", "borderColor", "opacity", "transform", "boxShadow",
  "filter", "width", "height", "top", "left", "outlineColor",
];

// 目标选择器（来自前面 CSS 分析）
const TARGETS = {
  headerNavLink: ".header-navigation-links__link, .header-navigation-section-link",
  loginBtn: ".log-button, button:has-text(\"Log in\"), a:has-text(\"Log in\")",
  registerBtn: ".ui-button--theme-accent",
  asideBtn: ".casino-aside-button",
  gameCard: ".casino-game-card, .casino-games__list li",
  providerSlide: ".casino-brand-slider__swiper .swiper-slide",
  sectionSwitch: ".casino-section-header__actions button, .casino-multi-select",
  searchInput: ".casino-search input, input[type=search], input[type=text]",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { url: URL, at: new Date().toISOString(), hovers: {}, running: [], swiper: null, scroll: null, errors: [] };

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "en-US" });
const page = await ctx.newPage();

try {
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await sleep(3000);
  report.title = await page.title();
  report.finalUrl = page.url();
  await page.screenshot({ path: path.join(OUT, "01-initial.png") });

  // 1) 悬停：记录 前/后 的计算样式 与 transition 参数
  for (const [name, sel] of Object.entries(TARGETS)) {
    try {
      const loc = page.locator(sel).first();
      if (!(await loc.count())) { report.hovers[name] = { found: false }; continue; }
      await loc.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {});
      const read = () => loc.evaluate((el, props) => {
        const cs = getComputedStyle(el);
        const o = { transition: cs.transition, animation: cs.animation, cursor: cs.cursor };
        for (const p of props) o[p] = cs[p];
        const kids = [...el.querySelectorAll("*")].slice(0, 12).map((k) => {
          const c = getComputedStyle(k);
          return { cls: k.className?.toString?.().slice(0, 60), opacity: c.opacity, transform: c.transform, transition: c.transition, bg: c.backgroundColor };
        });
        return { self: o, kids, cls: el.className?.toString?.() };
      }, PROPS);
      const before = await read();
      const bb = await loc.boundingBox(); if (!bb) throw new Error("no box"); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 4 });
      await sleep(600);
      const after = await read();
      const diff = {};
      for (const k of Object.keys(after.self)) if (before.self[k] !== after.self[k]) diff[k] = [before.self[k], after.self[k]];
      const kidDiff = after.kids.map((k, i) => ({ k, b: before.kids[i] })).filter(({ k, b }) => b && (k.opacity !== b.opacity || k.transform !== b.transform || k.bg !== b.bg)).map(({ k, b }) => ({ cls: k.cls, opacity: [b.opacity, k.opacity], transform: [b.transform, k.transform], bg: [b.bg, k.bg], transition: k.transition }));
      report.hovers[name] = { found: true, cls: before.cls, transition: before.self.transition, cursor: before.self.cursor, selfDiff: diff, childDiff: kidDiff };
      await page.screenshot({ path: path.join(OUT, `hover-${name}.png`) });
      await page.mouse.move(0, 0);
    } catch (e) { report.errors.push(`${name}: ${e.message.split("\n")[0]}`); }
  }

  // 2) 页面上正在运行的动画（CSS animation / transition）
  report.running = await page.evaluate(() =>
    document.getAnimations().slice(0, 60).map((a) => ({
      type: a.constructor.name,
      name: a.animationName || a.transitionProperty || null,
      target: a.effect?.target?.className?.toString?.().slice(0, 60) || a.effect?.target?.tagName,
      duration: a.effect?.getTiming?.().duration,
      easing: a.effect?.getTiming?.().easing,
      iterations: a.effect?.getTiming?.().iterations,
    }))
  );

  // 3) Swiper 实际参数
  report.swiper = await page.evaluate(() =>
    [...document.querySelectorAll(".swiper")].map((el) => {
      const s = el.swiper;
      return {
        cls: el.className.slice(0, 80),
        slides: el.querySelectorAll(".swiper-slide").length,
        params: s ? {
          slidesPerView: s.params.slidesPerView, spaceBetween: s.params.spaceBetween, speed: s.params.speed,
          loop: s.params.loop, autoplay: s.params.autoplay, freeMode: !!s.params.freeMode,
          breakpoints: s.params.breakpoints, effect: s.params.effect, navigation: !!s.params.navigation, pagination: !!s.params.pagination,
        } : null,
      };
    })
  );

  // 4) 滚动行为：header 是否 sticky / 变化
  const h0 = await page.evaluate(() => { const h = document.querySelector("header"); return h && { pos: getComputedStyle(h).position, top: h.getBoundingClientRect().top, bg: getComputedStyle(h).backgroundColor, h: h.getBoundingClientRect().height }; });
  await page.mouse.wheel(0, 1200); await sleep(800);
  const h1 = await page.evaluate(() => { const h = document.querySelector("header"); return h && { pos: getComputedStyle(h).position, top: h.getBoundingClientRect().top, bg: getComputedStyle(h).backgroundColor, h: h.getBoundingClientRect().height }; });
  const fixedEls = await page.evaluate(() => [...document.querySelectorAll("*")].filter((e) => ["sticky", "fixed"].includes(getComputedStyle(e).position)).slice(0, 15).map((e) => ({ tag: e.tagName, cls: e.className?.toString?.().slice(0, 60), pos: getComputedStyle(e).position, top: Math.round(e.getBoundingClientRect().top), h: Math.round(e.getBoundingClientRect().height), scrollY: window.scrollY })));
  report.scroll = { before: h0, afterScroll1200: h1, stickyOrFixed: fixedEls };
  await page.screenshot({ path: path.join(OUT, "02-scrolled.png") });
  await page.mouse.wheel(0, -1200);

  // 5) 点击：侧边栏第二项，记录 URL 与内容变化
  try {
    const items = page.locator(TARGETS.asideBtn);
    if ((await items.count()) > 1) {
      const t0 = Date.now();
      await items.nth(1).click({ timeout: 3000 });
      await sleep(1200);
      report.clickAside = { url: page.url(), ms: Date.now() - t0, activeCls: await items.nth(1).evaluate((e) => e.className.toString()) };
      await page.screenshot({ path: path.join(OUT, "03-after-click.png") });
    }
  } catch (e) { report.errors.push(`click: ${e.message.split("\n")[0]}`); }

  // 6) 手机宽度下的布局
  await page.setViewportSize({ width: 390, height: 844 });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUT, "04-mobile.png") });
} catch (e) {
  report.errors.push(`fatal: ${e.message.split("\n")[0]}`);
}

fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
await browser.close();
console.log("hover targets found:", Object.entries(report.hovers).map(([k, v]) => `${k}=${v.found}`).join(" "));
console.log("running animations:", report.running.length, "| swipers:", report.swiper?.length, "| errors:", report.errors.length);
console.log("title:", report.title, "| url:", report.finalUrl);
