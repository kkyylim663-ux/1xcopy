# 站点地图 (Site Map)

> 最后更新：2025-10  
> 构建状态：✅ `npm run build` 通过，23/23 页面

## 路由状态

| 组 | 路由 | 本地路径 | 状态 |
|---|---|---|---|
| A | /en/slots | src/app/en/slots/[[...tab]]/page.tsx | ✅ 完成（含 5 个子 tab） |
| A | /en/slots/popular | 同上（tab=popular） | ✅ |
| A | /en/slots/new | 同上（tab=new） | ✅ |
| A | /en/slots/recommended | 同上（tab=recommended） | ✅ |
| A | /en/slots/quick-play | 同上（tab=quick-play） | ✅ |
| A | /en/casino | src/app/en/casino/page.tsx | ✅ 完成 |
| A | /en/casino-lobby | src/app/en/casino-lobby/page.tsx | ✅ 重定向到 /en/casino |
| B | /en/games | src/app/en/games/page.tsx | ✅ 完成 |
| B | /en/tvgames | src/app/en/tvgames/page.tsx | ✅ 完成 |
| B | /en/othergames | src/app/en/othergames/page.tsx | ✅ 完成 |
| B | /en/fishinghunting | src/app/en/fishinghunting/page.tsx | ✅ 完成 |
| B | /en/scratchcards | src/app/en/scratchcards/page.tsx | ✅ 完成 |
| B | /en/bingo | src/app/en/bingo/page.tsx | ✅ 完成 |
| B | /en/poker | — | ❌ 源站 404，跳过 |
| B | /en/lotto | src/app/en/lotto/page.tsx | ✅ 完成 |
| B | /en/virtualsports | src/app/en/virtualsports/page.tsx | ✅ 完成 |
| B | /en/fast-bet | src/app/en/fast-bet/page.tsx | ✅ 完成 |
| C | /en/line | src/app/en/line/page.tsx | ✅ 完成（配体育分类 tab + MatchCard） |
| C | /en/live | src/app/en/live/page.tsx | ✅ 完成（LIVE 徽章动画） |
| C | /en/multi | src/app/en/multi/page.tsx | ✅ 完成（投注单侧边栏） |
| C | /en/results | src/app/en/results/page.tsx | ✅ 完成（联赛过滤 + 结果表格） |
| C | /en/statistic | src/app/en/statistic/page.tsx | ✅ 完成（排名表 + 胜负高亮） |
| C | /en/champs | src/app/en/champs/page.tsx | ✅ 完成（侧边栏 + 赛事视图） |
| C | /en/ufc | src/app/en/ufc/page.tsx | ✅ 完成（Main Card / Prelim 布局） |

## 组件目录

| 类型 | 组件 | 文件 |
|---|---|---|
| shell | Header（导航 + 汉堡菜单） | components/sites/slots-ref/shell/Header.tsx |
| shell | Footer（链接组 + 版权） | components/sites/slots-ref/shell/Footer.tsx |
| ui | GameCard（悬停遮罩 + 渐变占位图） | components/sites/slots-ref/ui/GameCard.tsx |
| ui | MatchCard（主客队 + 赔率按钮） | components/sites/slots-ref/ui/MatchCard.tsx |
| ui | ProviderSlider（横向滚动） | components/sites/slots-ref/ui/ProviderSlider.tsx |
| ui | SearchInput（实时过滤） | components/sites/slots-ref/ui/SearchInput.tsx |
| sections | SlotsSidebar（分类侧边栏） | components/sites/slots-ref/sections/SlotsSidebar.tsx |
| sections | HeroBanner（自动轮播） | components/sites/slots-ref/sections/HeroBanner.tsx |

## 已知差异（与源站）

1. **品牌**：SLOTSHUB 替代 1xBet（按计划）
2. **游戏图片**：渐变占位图，无版权原图
3. **游戏数量**：86 个静态记录（源站 1285+ 通过 API 加载）
4. **视觉精度**：颜色数值来自 CSS，因无法渲染源站，像素级对比未做
5. **API 功能**：无接入（登录/充值只做 UI）
6. **/en/poker**：源站 404，跳过
