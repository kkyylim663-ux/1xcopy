// 读取 _ignore/animations/report.json，输出可读摘要到 docs/research/slots-ref/animations-playwright.md
import fs from "node:fs";

const r = JSON.parse(fs.readFileSync("_ignore/animations/report.json", "utf8"));
const L = [];
L.push("# Playwright 抓取的交互与动画", "", `来源：${r.finalUrl}　时间：${r.at}`, "");

L.push("## 抓取错误", "");
L.push(r.errors.length ? r.errors.map((e) => `- ${e}`).join("\n") : "- 无", "");

L.push("## 悬停（hover）", "");
for (const [name, h] of Object.entries(r.hovers)) {
  if (!h.found) { L.push(`- **${name}**：页面上未找到`); continue; }
  L.push(`- **${name}** \`${(h.cls || "").slice(0, 70)}\``);
  L.push(`  - transition: \`${h.transition}\`　cursor: ${h.cursor}`);
  const d = Object.entries(h.selfDiff).map(([k, v]) => `${k}: ${v[0]} → ${v[1]}`);
  L.push(`  - 自身变化：${d.length ? d.join("；") : "无"}`);
  for (const c of h.childDiff.slice(0, 4)) L.push(`  - 子元素 \`${c.cls}\`：opacity ${c.opacity.join("→")}，transform ${c.transform.join("→")}，transition \`${c.transition}\``);
}

L.push("", "## 页面上运行中的动画/过渡（去重统计）", "");
const cnt = {};
for (const a of r.running) {
  const k = `${a.type} | ${a.name} | ${a.duration}ms | ${a.easing} | x${a.iterations}`;
  cnt[k] = (cnt[k] || 0) + 1;
}
for (const [k, n] of Object.entries(cnt)) L.push(`- ${k}　（${n} 个）`);

L.push("", "## Swiper 实际参数", "");
for (const s of r.swiper || []) L.push(`- \`${s.cls}\`　slides=${s.slides}　params=${JSON.stringify(s.params)}`);

L.push("", "## 滚动", "", "```json", JSON.stringify(r.scroll, null, 1), "```", "");
L.push("## 点击侧边栏第 2 项", "", "```json", JSON.stringify(r.clickAside ?? null, null, 1), "```");

fs.mkdirSync("docs/research/slots-ref", { recursive: true });
fs.writeFileSync("docs/research/slots-ref/animations-playwright.md", L.join("\n"));
console.log("written, lines:", L.length);
