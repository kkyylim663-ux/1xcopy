// 抓取 malay.1xbet.com/en 首页的结构、按钮、轮播参数和表单字段
// 用法: node capture-home.mjs
// 输出: _ignore/home/（截图+JSON）, docs/research/slots-ref/home.md
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const HOME = "https://malay.1xbet.com/en";
const OUT = path.resolve("_ignore/home");
const DOCS = path.resolve("docs/research/slots-ref");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(DOCS, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH,
});

const report = {
  url: HOME,
  at: new Date().toISOString(),
  viewports: {},
  sections: [],
  buttons: [],
  swipers: [],
  dialogs: {},
  errors: [],
};

// ── 工具函数 ──────────────────────────────────────────────────────────────────
async function dismissPopups(page) {
  // 等一下让弹窗完全渲染
  await sleep(2500);

  // 尝试多种关闭选择器
  const closeSels = [
    "[class*=welcome-popup] [class*=close]",
    "[class*=modal] [class*=close]",
    "[class*=dialog] [class*=close]",
    ".popup-close",
    ".modal__close",
    "[aria-label='Close']",
    "[data-role='close']",
    "button:has-text('×')",
    "button:has-text('✕')",
    "button:has-text('Close')",
    ".icon-close",
    "[class*=close-button]",
  ];

  for (const sel of closeSels) {
    try {
      const btn = page.locator(sel).first();
      if ((await btn.count()) > 0) {
        await btn.click({ timeout: 2000 });
        await sleep(600);
        console.log(`关闭弹窗: ${sel}`);
      }
    } catch {}
  }

  // 如果有遮罩层，按 ESC
  try {
    await page.keyboard.press("Escape");
    await sleep(500);
  } catch {}
}

async function scanButtons(page) {
  return page.evaluate(() => {
    const REGION = [
      ["header", /header|navigation/i],
      ["sidebar", /aside|sidebar/i],
      ["footer", /footer/i],
      ["modal", /modal|dialog|popup|dropdown/i],
      ["banner", /banner|swiper|slider/i],
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
        const m = c.split(/\s+/).find((x) => /^[a-z]/.test(x) && x.length > 4 && x.length < 50);
        if (m) return m.slice(0, 60);
      }
      return "";
    };
    const els = [
      ...document.querySelectorAll("a[href], button, input, select, textarea, [role=button], [role=tab]"),
    ];
    return els
      .map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (r.width === 0 || r.height === 0 || cs.visibility === "hidden") return null;
        let href = el.getAttribute("href");
        if (href) {
          try {
            const u = new URL(href, location.href);
            href = u.host === location.host ? u.pathname : "(外站)";
          } catch {}
        }
        return {
          region: regionOf(el),
          block: blockOf(el),
          tag: el.tagName.toLowerCase(),
          text: (
            el.innerText ||
            el.getAttribute("aria-label") ||
            el.getAttribute("placeholder") ||
            el.getAttribute("title") ||
            ""
          )
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 40),
          type: el.getAttribute("type") || "",
          name: el.getAttribute("name") || "",
          href: href || "",
          cls: (el.className?.toString?.() || "").slice(0, 90),
          x: Math.round(r.x),
          y: Math.round(r.y + scrollY),
          w: Math.round(r.width),
          h: Math.round(r.height),
          bg: cs.backgroundColor,
          color: cs.color,
          radius: cs.borderRadius,
          font: `${cs.fontSize} ${cs.fontWeight}`,
          transition: cs.transition === "all 0s ease 0s" ? "" : cs.transition,
        };
      })
      .filter(Boolean);
  });
}

async function scanSwipers(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll(".swiper")].map((el) => {
      const s = el.swiper;
      const slides = el.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)").length;
      return {
        cls: el.className.slice(0, 80),
        slides,
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
        y: Math.round(el.getBoundingClientRect().y + scrollY),
        params: s
          ? {
              slidesPerView: s.params.slidesPerView,
              spaceBetween: s.params.spaceBetween,
              speed: s.params.speed,
              loop: s.params.loop,
              autoplay: s.params.autoplay,
              effect: s.params.effect,
              navigation: !!s.params.navigation,
              pagination: !!s.params.pagination,
              centeredSlides: s.params.centeredSlides,
            }
          : null,
      };
    })
  );
}

async function scanSections(page) {
  return page.evaluate(() => {
    const blocks = [...document.querySelectorAll("[class*=showcase],[class*=banner],[class*=slider],[class*=products],[class*=events],[class*=bonuses],[class*=footer],[class*=header]")];
    const seen = new Set();
    return blocks
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 100 || r.height < 40) return false;
        const key = `${Math.round(r.y + scrollY)}-${el.className.toString().slice(0, 30)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 25)
      .map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          cls: el.className.toString().slice(0, 80),
          tag: el.tagName,
          x: Math.round(r.x),
          y: Math.round(r.y + scrollY),
          w: Math.round(r.width),
          h: Math.round(r.height),
          bg: cs.backgroundColor,
        };
      });
  });
}

// ── 主流程 ────────────────────────────────────────────────────────────────────
// 1440px 宽
console.log("→ 1440px 截图...");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: "en-US" });
  await page.goto(HOME, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await dismissPopups(page);

  report.viewports["1440"] = {};

  // 整页截图
  await page.screenshot({ path: path.join(OUT, "1440-full.png"), fullPage: true });
  console.log("  整页截图已保存");

  // 初始视口
  await page.screenshot({ path: path.join(OUT, "1440-viewport.png") });

  // 区块截图
  report.sections = await scanSections(page);
  for (const sec of report.sections) {
    const safe = sec.cls.split(" ")[0].replace(/[^a-z0-9-_]/gi, "-").slice(0, 40);
    try {
      await page.screenshot({
        path: path.join(OUT, `1440-sec-${safe}.png`),
        clip: { x: sec.x, y: sec.y, width: Math.min(sec.w, 1440), height: Math.min(sec.h, 800) },
      });
    } catch {}
  }

  // 按钮扫描
  report.buttons = await scanButtons(page);
  console.log(`  按钮: ${report.buttons.length}`);

  // Swiper
  report.swipers = await scanSwipers(page);
  console.log(`  Swiper: ${report.swipers.length}`);

  // 页面主要 heading 顺序
  report.headings = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3,[class*=title]")]
      .filter((h) => h.innerText.trim().length > 0)
      .map((h) => ({
        tag: h.tagName,
        text: h.innerText.trim().slice(0, 60),
        y: Math.round(h.getBoundingClientRect().y + scrollY),
      }))
      .slice(0, 40)
  );

  // sticky 元素
  report.sticky = await page.evaluate(() => {
    const els = [...document.querySelectorAll("*")].filter((e) =>
      ["sticky", "fixed"].includes(getComputedStyle(e).position)
    );
    return els.slice(0, 10).map((e) => ({
      cls: e.className?.toString?.().slice(0, 60),
      tag: e.tagName,
      pos: getComputedStyle(e).position,
      top: getComputedStyle(e).top,
      h: Math.round(e.getBoundingClientRect().height),
      bg: getComputedStyle(e).backgroundColor,
    }));
  });

  // header 详细结构
  report.header = await page.evaluate(() => {
    const h = document.querySelector("header, [class*=header]");
    if (!h) return null;
    const r = h.getBoundingClientRect();
    const rows = [...h.children].map((row) => {
      const rr = row.getBoundingClientRect();
      return {
        cls: row.className?.toString?.().slice(0, 60),
        h: Math.round(rr.height),
        items: [...row.querySelectorAll("a,button,[role=button]")]
          .slice(0, 20)
          .map((el) => ({
            tag: el.tagName,
            text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 30),
            cls: el.className?.toString?.().slice(0, 60),
            w: Math.round(el.getBoundingClientRect().width),
            h: Math.round(el.getBoundingClientRect().height),
            bg: getComputedStyle(el).backgroundColor,
          })),
      };
    });
    return { cls: h.className?.toString?.().slice(0, 60), h: Math.round(r.height), rows };
  });

  // 登录下拉框和注册页表单结构
  for (const key of ["Log in", "Registration"]) {
    try {
      const btn = page.locator(`button:has-text("${key}"), a:has-text("${key}")`).first();
      if (!(await btn.count())) {
        report.dialogs[key] = { found: false };
        continue;
      }
      const bb = await btn.boundingBox();
      if (!bb) { report.dialogs[key] = { found: false }; continue; }
      await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
      await sleep(2000);
      await page.screenshot({ path: path.join(OUT, `dialog-${key.replace(/ /g, "-").toLowerCase()}.png`) });
      report.dialogs[key] = await page.evaluate(() => {
        const box = [
          ...document.querySelectorAll("[class*=modal],[class*=dialog],[class*=dropdown],[role=dialog],form"),
        ]
          .filter((e) => e.getBoundingClientRect().height > 80)
          .pop();
        if (!box) return { found: false };
        return {
          found: true,
          cls: box.className.toString().slice(0, 80),
          w: Math.round(box.getBoundingClientRect().width),
          h: Math.round(box.getBoundingClientRect().height),
          fields: [...box.querySelectorAll("input,select,textarea")].map((i) => ({
            tag: i.tagName.toLowerCase(),
            type: i.type,
            name: i.name,
            placeholder: i.placeholder,
            autocomplete: i.autocomplete,
            w: Math.round(i.getBoundingClientRect().width),
            h: Math.round(i.getBoundingClientRect().height),
          })),
          buttons: [...box.querySelectorAll("button,a,[role=tab]")]
            .map((x) => (x.innerText || x.getAttribute("aria-label") || "").trim().slice(0, 30))
            .filter(Boolean)
            .slice(0, 20),
        };
      });
      await page.keyboard.press("Escape");
      await sleep(500);
      if (!new URL(page.url()).pathname.startsWith("/en")) {
        await page.goto(HOME, { waitUntil: "domcontentloaded", timeout: 30000 });
        await sleep(1500);
        await dismissPopups(page);
      }
    } catch (e) {
      report.dialogs[key] = { error: e.message.split("\n")[0] };
    }
  }

  await page.close();
}

// 1920px 宽
console.log("→ 1920px 截图...");
{
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, locale: "en-US" });
  await page.goto(HOME, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await dismissPopups(page);
  await page.screenshot({ path: path.join(OUT, "1920-full.png"), fullPage: true });
  await page.screenshot({ path: path.join(OUT, "1920-viewport.png") });
  report.viewports["1920"] = {
    pageH: await page.evaluate(() => document.body.scrollHeight),
    pageW: await page.evaluate(() => document.body.scrollWidth),
  };
  await page.close();
}

// 390px 宽（移动端）
console.log("→ 390px 截图...");
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, locale: "en-US" });
  await page.goto(HOME, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await dismissPopups(page);
  await page.screenshot({ path: path.join(OUT, "390-full.png"), fullPage: true });
  await page.screenshot({ path: path.join(OUT, "390-viewport.png") });

  // 移动端 header
  report.viewports["390"] = {};
  report.mobileHeader = await page.evaluate(() => {
    const h = document.querySelector("header, [class*=header]");
    if (!h) return null;
    const r = h.getBoundingClientRect();
    return {
      cls: h.className?.toString?.().slice(0, 80),
      h: Math.round(r.height),
      items: [...h.querySelectorAll("a,button,[role=button]")]
        .slice(0, 12)
        .map((el) => ({
          text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 30),
          w: Math.round(el.getBoundingClientRect().width),
          h: Math.round(el.getBoundingClientRect().height),
        })),
    };
  });

  // 打开手机菜单
  try {
    const ham = page.locator("[class*=hamburger],[class*=menu-button],[aria-label*=menu],[aria-label*=Menu]").first();
    if ((await ham.count()) > 0) {
      await ham.click({ timeout: 2000 });
      await sleep(1000);
      await page.screenshot({ path: path.join(OUT, "390-mobile-menu.png") });
    }
  } catch {}

  await page.close();
}

// 保存 JSON
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));

// ── 生成 Markdown 摘要 ────────────────────────────────────────────────────────
const byRegion = {};
for (const btn of report.buttons) {
  byRegion[btn.region] = (byRegion[btn.region] || []);
  byRegion[btn.region].push(btn);
}

const swiperMd = report.swipers
  .map((s, i) => {
    const p = s.params;
    return `**Swiper ${i + 1}** \`${s.cls.slice(0, 50)}\`
- 实际 slides（非 duplicate）: ${s.slides}，尺寸: ${s.w}×${s.h}，y=${s.y}
- slidesPerView: ${p?.slidesPerView}，spaceBetween: ${p?.spaceBetween}
- speed: ${p?.speed}ms，loop: ${p?.loop}，autoplay: ${JSON.stringify(p?.autoplay)}
- navigation: ${p?.navigation}，pagination: ${p?.pagination}，effect: ${p?.effect}`;
  })
  .join("\n\n");

const sectionsMd = report.sections
  .map((s) => `| \`${s.cls.slice(0, 50)}\` | ${s.y}px | ${s.w}×${s.h} | ${s.bg} |`)
  .join("\n");

const headerMd = report.header
  ? report.header.rows
      .map(
        (row) =>
          `  - 行 \`${row.cls.slice(0, 40)}\` h=${row.h}px，${row.items.length} 个按钮:\n` +
          row.items
            .slice(0, 12)
            .map((i) => `    - \`${i.text}\` ${i.w}×${i.h} bg=${i.bg} cls=\`${i.cls.slice(0, 40)}\``)
            .join("\n")
      )
      .join("\n")
  : "未找到";

const dialogsMd = Object.entries(report.dialogs)
  .map(([key, val]) => {
    if (!val.found) return `**${key}**: 未找到弹窗`;
    return `**${key}** — ${val.w}×${val.h} \`${val.cls.slice(0, 60)}\`
字段: ${val.fields.map((f) => `${f.tag}[${f.type}] name="${f.name}" placeholder="${f.placeholder}" autocomplete="${f.autocomplete}" ${f.w}×${f.h}`).join("; ")}
按钮: ${val.buttons.join(" / ")}`;
  })
  .join("\n\n");

const buttonTableMd = Object.entries(byRegion)
  .map(([region, btns]) => {
    const rows = btns
      .slice(0, 30)
      .map(
        (b) =>
          `| ${b.tag} | ${b.text || "(无文本)"} | ${b.w}×${b.h} | ${b.bg} | ${b.radius} | ${b.transition.slice(0, 40)} | ${b.href || b.type} |`
      )
      .join("\n");
    return `### 区域: ${region}\n| 标签 | 文本 | 尺寸 | 背景色 | 圆角 | 过渡 | href/type |\n|---|---|---|---|---|---|---|\n${rows}`;
  })
  .join("\n\n");

const md = `# 首页观察报告 — malay.1xbet.com/en
> 抓取时间: ${report.at}
> 原始数据: \`_ignore/home/report.json\`
> 截图: \`_ignore/home/\`

## 顶栏结构（实测）
总高: ${report.header?.h ?? "?"}px
${headerMd}

## 吸顶/固定元素
| 类名 | pos | top | 高 | 背景 |
|---|---|---|---|---|
${(report.sticky || []).map((s) => `| \`${s.cls.slice(0, 50)}\` | ${s.pos} | ${s.top} | ${s.h} | ${s.bg} |`).join("\n")}

## 页面区块顺序（1440px）
| class | y | 尺寸 | 背景 |
|---|---|---|---|
${sectionsMd}

## Swiper 参数（1440px）
${swiperMd || "未找到 Swiper"}

## 对话框 / 表单结构
${dialogsMd || "无"}

## 按钮清单（按区域，最多 30/区域）
${buttonTableMd}

## 标题顺序
${(report.headings || []).map((h) => `- [y=${h.y}] \`${h.tag}\` ${h.text}`).join("\n")}
`;

fs.writeFileSync(path.join(DOCS, "home.md"), md);
await browser.close();

console.log("\n✓ 完成");
console.log(`  截图目录: ${OUT}`);
console.log(`  摘要文档: ${path.join(DOCS, "home.md")}`);
console.log(`  按钮总数: ${report.buttons.length}`);
console.log(`  Swiper 数: ${report.swipers.length}`);
console.log(`  区块数: ${report.sections.length}`);
console.log(`  对话框: ${Object.keys(report.dialogs).join(", ")}`);
