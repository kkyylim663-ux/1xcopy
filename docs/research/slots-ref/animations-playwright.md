# Playwright 抓取的交互与动画

来源：https://malay.1xbet.com/en/slots　时间：2026-10-07T06:00:16.635Z

## 抓取错误

- 无

## 悬停（hover）

- **headerNavLink** `header-navigation-section-link`
  - transition: `opacity 0.2s`　cursor: pointer
  - 自身变化：无
- **loginBtn** `auth-dropdown-trigger ui-button ui-button--size-m ui-button--theme-pri`
  - transition: `background-color 0.1s, color 0.1s`　cursor: pointer
  - 自身变化：无
- **registerBtn** `ui-button ui-button--size-m ui-button--theme-accent ui-button--upperca`
  - transition: `background-color 0.1s, color 0.1s`　cursor: pointer
  - 自身变化：无
- **asideBtn** `casino-aside-button ui-button ui-button--size-m ui-button--theme-tp-gr`
  - transition: `background-color 0.1s, color 0.1s`　cursor: pointer
  - 自身变化：无
- **gameCard** `casino-games__item`
  - transition: `all`　cursor: auto
  - 自身变化：无
- **providerSlide** `swiper-slide swiper-slide-active casino-brand-slider__slide`
  - transition: `all`　cursor: auto
  - 自身变化：无
- **sectionSwitch** `ui-inline-dropdown--outside ui-inline-dropdown--outline ui-inline-drop`
  - transition: `all`　cursor: auto
  - 自身变化：无
- **searchInput** `ui-search-default__input`
  - transition: `opacity 0.25s, transform 0.25s`　cursor: text
  - 自身变化：无

## 页面上运行中的动画/过渡（去重统计）

- CSSTransition | opacity | 500ms | ease | x1　（1 个）
- CSSAnimation | flag-pulse-dfeaa86c | 3500ms | linear | xnull　（1 个）
- CSSAnimation | top-down-29102045 | 1200ms | linear | xnull　（48 个）
- CSSAnimation | flicker-ecffdb31 | 3000ms | linear | xnull　（1 个）

## Swiper 实际参数

- `swiper swiper-initialized swiper-horizontal swiper-watch-progress ui-slider`　slides=13　params={"slidesPerView":1,"spaceBetween":0,"speed":300,"loop":true,"autoplay":{"enabled":true,"delay":5000,"waitForTransition":true,"disableOnInteraction":false,"stopOnLastSlide":false,"reverseDirection":false,"pauseOnMouseEnter":false},"freeMode":false,"effect":"slide","navigation":true,"pagination":true}
- `swiper swiper-initialized swiper-horizontal swiper-grid swiper-grid-column casin`　slides=18　params={"slidesPerView":9,"spaceBetween":20,"speed":300,"loop":false,"freeMode":false,"breakpoints":{"1366":{"slidesPerView":9}},"effect":"slide","navigation":false,"pagination":true}

## 滚动

```json
{
 "before": {
  "pos": "static",
  "top": 0,
  "bg": "rgb(29, 66, 104)",
  "h": 96
 },
 "afterScroll1200": {
  "pos": "static",
  "top": 0,
  "bg": "rgb(29, 66, 104)",
  "h": 96
 },
 "stickyOrFixed": [
  {
   "tag": "DIV",
   "cls": "layout-content__header",
   "pos": "sticky",
   "top": 0,
   "h": 96,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "casino-layout__header",
   "pos": "sticky",
   "top": 96,
   "h": 52,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "casino-aside",
   "pos": "sticky",
   "top": 148,
   "h": 744,
   "scrollY": 0
  },
  {
   "tag": "BUTTON",
   "cls": "casino-scroll-up-button casino-layout__scroll-up has-tooltip",
   "pos": "fixed",
   "top": 0,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--bottom notifications m",
   "pos": "fixed",
   "top": 900,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "support-multi-button",
   "pos": "fixed",
   "top": 852,
   "h": 40,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--default notifications ",
   "pos": "fixed",
   "top": 864,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--bottom notifications d",
   "pos": "fixed",
   "top": 900,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--default notifications ",
   "pos": "fixed",
   "top": 864,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "",
   "pos": "fixed",
   "top": 915,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--default notifications ",
   "pos": "fixed",
   "top": 864,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--bottom notifications d",
   "pos": "fixed",
   "top": 900,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--default notifications ",
   "pos": "fixed",
   "top": 864,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--default notifications ",
   "pos": "fixed",
   "top": 864,
   "h": 0,
   "scrollY": 0
  },
  {
   "tag": "DIV",
   "cls": "vue-notification-group notifications--bottom notifications d",
   "pos": "fixed",
   "top": 900,
   "h": 0,
   "scrollY": 0
  }
 ]
}
```

## 点击侧边栏第 2 项

```json
null
```