# 交互地图 (Interaction Map)

## 已实现的交互

| 元素 | 触发 | 效果 | 实现方式 | 来源选择器 |
|---|---|---|---|---|
| GameCard | hover | overlay (0→1 opacity) + playBtn scale(0.85→1) | CSS transition 0.2s ease | `.casino-game-card` |
| GameCard | hover | thumbnail scale(1→1.05) | CSS transition 0.3s ease | `.casino-game-card__content` |
| GameCard.playBtn | hover | background-color accent→accent-hover | CSS transition 0.2s ease | `.casino-game__play-btn` |
| Header.navLink | hover | background hsl(primary--30-bg), color white | CSS transition 0.2s ease | `.header-navigation-links__link` |
| Header.hamburger | click | 移动端菜单 show/hide | React useState | `.header-hamburger` |
| HeroBanner | auto/time | 每 5s 切换 banner，gradient 过渡 | setInterval + CSS transition | `casino-brand-slider` |
| HeroBanner.dot | click | 手动切换 banner | React onClick | swiper pagination |
| SlotsSidebar.btn | click | 切换激活类别，active 样式 | React onClick | `.casino-aside-button` |
| Tabs | click | 路由跳转，改变 activeTab 高亮 | Next.js Link | `.header-navigation-section-link` |
| ProviderSlider | scroll/click | 横向滚动，active 高亮 | CSS scroll-snap + scrollBy | `.casino-brand-slider__swiper` |
| SearchInput | input | 过滤游戏列表（实时） | React useMemo | `.casino-search` |
| Button.login | hover | border-color + background | CSS transition 0.2s | `.log-button` |
| Button.register | hover | background-color accent-hover | CSS transition 0.2s | `.ui-button--theme-accent` |

## 来源动画（来自 animations.md）

| 名称 | 类型 | 用途 |
|---|---|---|
| mf-loading-rotate | @keyframes rotate 0→∞ | 加载图标旋转 |
| ui-timer-*-digit-enter/leave | @keyframes translateY | 倒计时数字翻转 |
| ui-tooltip-show | @keyframes opacity 0→1 | 工具提示出现 |
| uiIndeterminateProgressIndicatorAnimation | @keyframes translateX | 进度条 indeterminate |
| bounse | @keyframes translateY | 弹跳动画 |
| spin-wheel-* | @keyframes rotateX | 老虎机滚轮 |
| crossRotate / circleRotate | @keyframes rotate | 加载圆圈 |
| ui-notification-progress-line | @keyframes width 0→100% | 通知进度条 |

## 尚未实现（标记待做）

| 元素 | 触发 | 效果 | 优先级 |
|---|---|---|---|
| GameCard demo模式 | hover 延迟 | 显示"试玩"按钮 | 中 |
| 游戏卡片 skeleton | 加载中 | skeleton placeholder | 低 |
| 通知 toast | 操作后 | 通知动画弹出 | 低 |
| 老虎机滚轮 | spin | spin-wheel 动画 | 低 |
