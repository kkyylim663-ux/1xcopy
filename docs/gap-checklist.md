# 对比清单：源站 /en/slots vs 本地复刻

> 数据来源：2026-10-07 用 Playwright 在 1440×900 下抓取
> 原始数据：`docs/research/slots-ref/inventory-source.json`（源站 320 个可交互元素）、`inventory-local.json`（本地 153 个）
> 抓取脚本：`scripts/crawl/inventory-buttons.mjs`

---

## 一、源站按钮都在哪里、怎么做的

尺寸单位为 px；颜色是实际计算值；“过渡”是 CSS transition。

### 1. 顶栏（吸顶，高 96，背景 `rgb(29,66,104)`）

| 按钮 | 尺寸 | 样式 | 过渡 | 作用 |
|---|---|---|---|---|
| Logo | 122×48 | 透明 | — | 链接 `/en` |
| 活动小图标 | 36×32 | 透明 | — | 链接到赛事页 |
| 主导航 ×9：TOP-EVENTS / SPORTS / LIVE / 1XGAMES / SLOTS / LIVE CASINO / ESPORTS / PROMO / MORE | 约 141×32 | 透明，圆角 8 | `opacity 0.2s` | 链接；MORE 是下拉 |
| LOG IN（下拉触发） | 32 高 | 蓝 `rgb(39,106,165)`，圆角 8 | `background-color 0.1s, color 0.1s` | 打开登录下拉框 |
| REGISTRATION | 32 高 | 同上（主题 accent 绿） | 同上 | 链接 `/en/registration` |
| Deposit | 32×32 图标 | 蓝，圆角 8 | 同上 | 链接 `/en/information/payment` |
| Become a payment agent | 32×32 图标 | 蓝，圆角 8 | 同上 | 外站链接 |
| Settings（下拉） | 32×32 | 蓝，圆角 8 | 同上 | 设置下拉 |
| EN / 时间（下拉） | 32 高 | 蓝，圆角 8 | 同上 | 语言和时区下拉 |

### 2. 赌场栏（吸附在顶栏下方 top 96，高 52）

| 按钮 | 尺寸 | 样式 | 作用 |
|---|---|---|---|
| 面包屑：Main page › Slots | 小字 | 透明 | `/en/casino-lobby`、`/en/slots` |
| 搜索框 | 208×32 | 透明底，圆角 8，字号 14 | 过渡 `opacity 0.25s, transform 0.25s` |

### 3. 左侧窄栏 `casino-aside`（吸附在 top 148）

注意：**源站没有我们现在这种 12 项文字分类侧边栏。** 它只有：

| 按钮 | 尺寸 | 样式 | 作用 |
|---|---|---|---|
| Filter | 60×32 | `rgb(62,79,121)`，圆角 8 | 打开筛选面板 |
| 4 个方形图标 | 40×40 | `rgb(52,70,116)`，圆角 8，过渡 `background 0.1s` | 我的赌场（需登录）、大厅、赌场奖金、锦标赛 |

### 4. 首屏轮播 `ui-slider-with-preview`

| 元素 | 尺寸 | 样式 | 作用 |
|---|---|---|---|
| 轮播图 ×13（整张是链接） | 1017×250 | 背景图 | 每张链接到一个活动/锦标赛页 |
| 上一张 / 下一张 | 32×32 | 白色半透明 `rgba(255,255,255,.5)`，圆角 8 | 过渡 `background-color 0.2s` |
| 分页条 ×13 | 24×8 | 白色，圆角 5 | 过渡 `width 0.2s, background-color 0.2s`（当前项变宽） |
| 参数 | — | 每次 1 张、循环、5 秒自动播放、切换 300ms | — |

### 5. 分类切换 `casino-switch`（横排文字链接）

Best Games In Malaysia / Popular / Recommended / Quick Play / New / Exclusive / Bonus Wagering
→ 链接 `/en/slots/<分类>`。另有排序下拉 **Popularity**（`ui-inline-dropdown`，32 高，圆角 8）。

### 6. 游戏卡片 `casino-games__item`（48 张）

| 元素 | 说明 |
|---|---|
| 卡片 | **214×168，横向**（我们现在是竖向 3:4） |
| 角标 | NEW / PROMO |
| 悬停遮罩里 3 个按钮 | **Play for free**（试玩）、**PLAY**（开始）、**Add to favorites**（收藏） |
| 链接 | `/en/slots/game/<id>/<slug>` |
| SHOW MORE | 1324×32 通栏，`rgb(62,79,121)`，只有下边圆角 `0 0 8px 8px` |

### 7. 页脚

| 元素 | 说明 |
|---|---|
| 链接组 | About us、Terms and Conditions、Affiliate Program、Become an agent、Privacy Policy、Cookie Policy、Contacts、Payment methods、Mobile version、Registration；应用：iOS、Android、Other apps |
| 第二组 | Sports、Multi-LIVE、Live、Toto、Slots、1xGames、Live Casino、Statistics、Results |
| 客服电话 | 字号 20，过渡 `color 0.3s` |
| 社交图标 ×4 | 32×32 圆形，浅灰 `rgb(233,238,242)`：X、Telegram、Instagram、Facebook |
| MOBILE VERSION | 278×32，蓝，圆角 8 |
| Cookie 提示 | “Find out more” 链接 |
| SEO 长文 | 约 15 个小标题的介绍文章，带 **展开/收起** 按钮（46×46） |

### 8. 浮动与弹窗

| 元素 | 说明 |
|---|---|
| 24/7 SUPPORT | 220×40，`rgb(61,165,255)`，圆角 20，固定在右下 |
| 回到顶部 | 固定定位（滚动后出现） |
| 欢迎奖金弹窗 | 进页面自动弹出；关闭按钮 24×24（过渡 `transform 0.5s`）；**GET BONUS** 270×41，亮绿 `rgb(151,231,13)`，圆角 50 |
| 通知 toast 容器 | 底部与默认两组 `vue-notification-group` |

---

## 二、还没做到的（按优先级）

### P0：结构不一致，必须改

- [ ] 主导航改成 9 项（含 MORE 下拉）；现在是 12 项且没有下拉
- [ ] 顶栏右侧补齐：Deposit、Settings 下拉、语言/时间下拉、LOG IN 下拉（现在只有 2 个普通按钮）
- [ ] 删掉 12 项文字侧边栏，改成源站的窄栏：Filter + 4 个图标按钮
- [ ] 赌场栏：面包屑 + 搜索框放进吸顶的 52px 栏（现在搜索在内容里）
- [ ] 分类切换改成 7 个文字链接（缺 Exclusive、Bonus Wagering）+ Popularity 排序下拉
- [ ] 游戏卡片改成横向 214×168，悬停显示 Play for free / PLAY / 收藏 3 个按钮
- [ ] 主体改成单一游戏网格（48 张 + 通栏 SHOW MORE）；源站 slots 页**没有**横向 Popular/New/Jackpot 行，这些行是我加的，需要去掉

### P1：缺少的组件

- [ ] 首屏轮播：13 张、上一张/下一张按钮、24×8 分页条（变宽动画）；现在 3 张、圆点、淡入
- [ ] 欢迎奖金弹窗（自动弹出 + 关闭 + GET BONUS）
- [ ] 登录下拉框和注册页的表单结构（**这次没抓到**，因为欢迎弹窗挡住了；下次先关弹窗再抓）
- [ ] Filter 筛选面板（点开后的内容未抓）
- [ ] 页脚：链接组对齐、客服电话、4 个社交图标、MOBILE VERSION、Cookie 提示
- [ ] SEO 长文模块 + 展开/收起
- [ ] Support 按钮改为 220×40、`rgb(61,165,255)`、文字 “24/7 SUPPORT”
- [ ] 通知 toast

### P2：动画与细节

- [ ] 悬停颜色：效果在子元素/伪元素上，需用 CSS 规则交叉确认后逐个对齐
- [ ] 源站动画 `top-down`（1.2s，48 个，疑似加载骨架）、`flicker`（3s）、`flag-pulse`（3.5s）未接入
- [ ] 供应商轮播：源站一屏 9 个、间距 20、带分页；我们现在是文字胶囊横向滚动
- [ ] 其他路由（casino、line、live 等）还没用 Playwright 逐页核对

---

## 三、占位内容清单（接后台时要替换）

| 位置 | 现状 | 接后台需要 |
|---|---|---|
| `src/data/games.ts` | 86 个静态游戏，RTP、角标是编的 | 游戏列表 API（分页、分类、供应商、搜索、排序） |
| 游戏卡片缩略图 | 渐变色占位图 | 后台返回的游戏封面图地址 |
| 游戏详情 `/en/slots/game/<id>/<slug>` | **没有这个页面**，会落到 slots 列表 | 游戏启动页 / iframe 与启动地址 API |
| Header 的 LOG IN、REGISTER（`Header.tsx:35,38,92,93`） | 按钮没有任何动作 | 登录、注册接口与会话 |
| HeroBanner 的 CTA（`HeroBanner.tsx:91`）及横幅文案 | 按钮无动作；3 张写死的文案 | 横幅/活动 API（图、标题、链接） |
| SlotsSidebar 选择分类 | 只改高亮，**不会筛选**（`sidebarCat` 没参与过滤） | 按 P0 改成源站窄栏后再接 |
| `PROVIDERS`（`games.ts`） | 11 个写死的名字 | 供应商列表 API |
| FloatingButtons 的 Support（`FloatingButtons.tsx:27`） | 无动作 | 客服聊天组件 |
| Footer 的 Promotions、Responsible Gaming、Help | `href="#"` | 对应内容页 |
| MatchCard 赔率按钮（`MatchCard.tsx:36,40,44`） | `href="#"` | 投注单 / 下注接口 |
| ufc、results、multi、othergames 中的按钮 | `href="#"` | 赛事、结果、下注接口 |
| line、live、champs、results、ufc 的比赛数据 | 页面内写死的假数据 | 赛事、赔率、比分 API |
| casino（111）、multi（99）、slots（168）、GameLobby（111）中的部分按钮 | 无 onClick 或只做本地状态 | 视功能接后台 |
| 侧边栏和导航图标 | emoji | 正式 SVG 图标 |

---

## 四、按约定不会照抄的部分

- 品牌：1xBet 名称和 Logo 一律换成 SLOTSHUB（例如导航里的 “1XGAMES” 需要换个名字）
- 游戏封面和横幅图片：版权素材，不下载，由你的后台提供
- 指向外站的链接（支付代理、社交媒体、客服电话）：保留位置，地址由你提供
