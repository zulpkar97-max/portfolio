# Portfolio Website — zulpkar.com

## 项目概况

React 19 + Vite 7.3 单页应用，hash 路由（#project-1/2/3）。
所有组件、数据、样式都在 `src/App.jsx` 一个文件里（~3300行）。

## 技术栈

- React 19 + Vite 7.3，无 TypeScript
- 纯内联样式，无 CSS 框架
- SVG 插图作为 React 组件，注册在 `ILLUSTRATION_MAP`
- 部署：GitHub Pages（`/portfolio/` base path）
- Git 仓库：`zulpkar97-max/portfolio`，主分支 `master`

## 设计系统

- 背景：`#f0ebe3`
- 灰色梯度：`#eae7e1` → `#D5D0C8` → `#B8B0A3` → `#2A2A2A`
- 强调色：`#c4422b`（红）
- 字体：Noto Sans SC（正文）、Noto Serif SC（标题）、DM Mono（编号/标签）
- 字号常量 `T`：small=13, body=16, heading=18（移动端适配）
- 全局 `user-select: none; cursor: default`，可点击元素单独设置 `cursor: pointer`

## 文件结构

```
src/App.jsx          — 唯一代码文件（组件 + 数据 + 样式）
src/index.css        — CSS 动画关键帧（thread, confetti 等）
public/images/       — 截图资产
  ├── collab-system-interaction.jpg    (Case 1)
  ├── nana-tech-architecture.jpg       (Case 1)
  ├── nana-ai-chat.jpg                 (Case 1)
  ├── 1771894558756_协作系统截图3.png   (Case 1 carousel)
  ├── 协作系统截图1.png                 (Case 1 carousel)
  ├── 协作系统运行记录.png              (Case 1 carousel)
  ├── case2-old-homepage.png           (Case 2 旧版)
  ├── case2-old-detail.png             (Case 2 旧版)
  ├── case2-old-editor.png             (Case 2 旧版)
  ├── case2-new-homepage.png           (Case 2 新版)
  ├── case2-new-detail.png             (Case 2 新版)
  ├── case2-new-editor.jpg             (Case 2 新版)
  ├── case3-workflow-nodes.jpg         (Case 3)
  ├── case3-workflow-full.jpg          (Case 3)
  ├── case3-platform-audit.png         (Case 3)
  ├── case3-frontend-ui.jpg            (Case 3)
  ├── case3-18lang-output.png          (Case 3)
  └── case3-feishu-bot.png             (Case 3)
public/               — favicon 文件（favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, android-chrome-*.png）
index.html
```

## App.jsx 关键区域（按行号区间）

- **PROJECTS 数据数组**：~第15-340行
  - Project 1（协作危机）：id=1，lines ~15-146
  - Project 2（攻略站）：id=2，lines ~148-240
  - Project 3（18语种翻译）：id=3，lines ~242-340
- **共享组件**：PlaceholderBox, ScreenshotItem, TextPlaceholder ~345-390
- **ILLUSTRATION_MAP**（SVG组件注册表）：搜索 `ILLUSTRATION_MAP`
- **SideNav 组件**：搜索 `function SideNav`
- **ProjectPage 组件**：搜索 `function ProjectPage`
  - scroll-spy（activeScrollSection）
  - keyBlockMap 预计算
  - 两层 border（persistent + click）
  - 两层 key sentence 高亮（persistent + click animation）
  - carouselActive state（screenshot-carousel 轮播）
- **Lightbox 组件**：搜索 `function Lightbox`
  - zoom/pan/pinch，pointer capture
  - 容器用 `maxWidth`（非固定 width），图片自适应
  - SVG 内容包裹在显式宽度 div 中
- **首页（LandingPage）**：搜索 `Project Entries`
  - 全屏 hero：typewriter 逐字符打字机动画（requestAnimationFrame）
  - 标题三行："产品、设计、项目管理、客户——"/"收拢成一个 PM 底座，"/"下一步方向：AI"
  - 副标题 "Product Operations · 5 years"（DM Mono）
  - sessionStorage `hero-played` 控制"每次会话只播放一次"
  - 卡片：3列 grid（140px stat | 1fr content | auto arrow），短 hook 文本
  - 每个项目有 `cardStat`（number/unit/label）和 `cardHook`（短文本）
  - Hover：微妙底色 + 箭头变深，分隔线用绝对定位 `left:-24px right:-24px`
  - Footer CTA：居中布局，email/LinkedIn 按钮 + footer thread 动画
- **body block 渲染循环**：搜索 `block.type === "heading"`
  - 支持类型：heading, paragraph, quote-list, module-list, pull-quote, screenshot-inline, screenshot-carousel, screenshot-group, screenshot-pair, illustration, iteration-step

## 核心机制：skillTag 跳转 + 两层高亮

每个 Project 有 `skillTags`（4个标签）和 `skillTagJumps` 对象：

```javascript
skillTagJumps: {
  "标签名": {
    scrollTo: 6,              // 点击跳转到的 block index
    borderRange: [6, 12],     // 左边线覆盖的 block 范围
    keySentence: "关键句文本", // 高亮的关键句（必须在正文中存在）
    keyBlock: 12              // 关键句所在的 block index
  }
}
```

**两层反馈：**
1. **持续层**（滚动驱动）：关键句淡底色 `rgba(218,212,203,0.45)`
2. **点击层**（临时动画）：flashBg 背景闪光 `rgba(196,66,43,0.04)` + 关键句加强高亮动画（淡入1s→停留2s→淡出1s）

## 三个 Case 当前状态

### Hero 架构（所有3个项目统一）

5层杂志化布局，`key={project.id}` 强制 remount 以重置动画：
- Layer 1: 项目编号 "01/02/03"（DM Mono 64px）+ 元数据竖排（Role/Team/Context）
- Layer 2: 标题（Noto Serif SC 900, clamp 36-72px）+ stat hook（大号数字 + 说明）
- Layer 3: 叙事段落（hook 句 700 + detail 句 300）
- Layer 4: 条件渲染 — P1 用 Before→After 堆叠卡片，P2/P3 用 3列 Metrics 卡片
- Layer 5: Section nav（4个 skillTag 锚点按钮）
- 装饰性 SVG：P1 网格、P2 同心圆、P3 连接节点
- 入场动画：fadeUp + lineGrow，staggered delay 0.1s-0.55s
- 数据字段：heroTitleLines, heroStat, heroNarrative, heroMetrics（P2/P3）, stateBefore/stateAfter（P1）

### Case 1 — 不是人的问题，是系统的问题 ✅

- Header: 危机接管者 / 核心15人，协调近百人 / 公司首个长线项目
- skillTags: 系统诊断, 约束下决策, 流程设计, AI落地
- heroStat: "7天" / heroNarrative: hook + detail
- Layer 4: Before→After 堆叠卡片
- 截图：screenshot-carousel（3张层叠卡片轮播） + 2个 screenshot-inline + 2个SVG插图
- SVG 插图简化版：DualTrackTimeline（无 IntersectionObserver）、InfoHub（无 fade-in，marker IDs ag2/ad2/af2）
- pull-quote: "不是人的问题，是系统的问题。"（从段落提取独立展示）

### Case 2 — 客户说改UI，但UI不是问题 ✅

- Header: 自发介入者 / 跨5个部门联动 / 客户病急投医，方向不明
- skillTags: 问题重定义, 信任策略, 用户研究, 分阶段落地
- heroStat: "15×" / heroMetrics: [30+ 用户访谈, 全站 逐页走查, 未收费 主动交付]
- Layer 4: 3列 Metrics 卡片
- 图片：6张截图（3旧3新）+ 2个SVG插图（诊断漏斗图, 三期递进图）

### Case 3 — AI落地最难的部分，不是技术 ✅

- Header: AI产品负责人 / 2人（我+1名实习生）/ 无人要求，自主立项
- skillTags: 场景识别, 可行性判断, 迭代落地, 执行韧性
- heroStat: "2人" / heroMetrics: [18 Languages, 5 Iteration steps, 4 Business scenarios]
- Layer 4: 3列 Metrics 卡片
- 图片：6张截图 + 1个SVG插图（迭代流程图）

## 已完成的优化

- [x] Header 层级统一（h1/h2/h3）
- [x] Lightbox 一致性（统一触发方式）+ 拖拽修复 + 白边修复
- [x] 移动端布局修复
- [x] SideNav 改为 skillTags 驱动 + scroll-spy
- [x] 两层高亮系统（persistent + click）
- [x] Case 2/3 完整内容填充
- [x] 设计系统更新：背景 `#f0ebe3`、强调色 `#c4422b`、字体 Noto 系列
- [x] 所有3个 Hero 统一5层杂志化布局 + fadeUp 动画 + `key={project.id}` remount
- [x] 首页 Hero：typewriter 逐字符动画 + sessionStorage 单次播放
- [x] 首页卡片：stat 数据锚点 + 短 hook + 带边框标签 + 微妙 hover
- [x] Footer CTA：email/LinkedIn 按钮 + footer thread 动画
- [x] 全局 UX：禁用文本选择 + 光标样式 + 导航栏 DM Mono + skillTag 按钮居中
- [x] 自定义 favicon："Z" 红底（替换 Vite 默认）
- [x] 第一批 Diff：paragraph lineHeight/maxWidth、heading borderTop、highlight 加深、quote/module-list/pull-quote/screenshot-inline 样式微调
- [x] 第二批 Diff：DualTrackTimeline 简化（去 IntersectionObserver）、InfoHub 简化（去 fade-in, marker IDs ag2/ad2/af2）、pull-quote 独立块、screenshot-carousel 层叠卡片轮播
- [x] 第三批 Diff：screenshot-inline/carousel/illustration 卡片外壳统一 + 轮播 auto-play + 图片英文命名
- [x] 第四批 Diff：项目二三 ScreenshotItem 卡片对齐 + 交互反馈改为 flashBg 背景闪光
- [x] 第五批修复：heading margin 覆盖 + Hooks 违规 + 图片文件未提交
- [x] 第六批：图片交互统一 (expandCursor/zoom-in) + 大标题红色前缀 + breakout 居中
- [x] 第七批：heading 左对齐 (flex shrink-wrap fix) + pull-quote 统一样式 + 截图宽度 + SideNav 对称 + 轮播侧边条重做
- [x] Batch 4 诊断区重构：DiagnosisCascadeSVG + quote-list 左标签/右引言布局
- [x] Batch 5 宽度居中：body 880px / text 720px / illustration 无 breakout / SideNav fixed / screenshot-group aspectRatio
- [x] 首页 replay 按钮：?→AI 动画重播 SVG 按钮

## 宽度网格系统

- **Body 容器**: maxWidth 880, padding 0 40px 80px
- **文本块** (paragraph, heading, pull-quote): maxWidth 720, margin "0 auto", padding "0 8px"
- **视觉块** (illustration, carousel, screenshot-group, screenshot-inline): 填满 880px 容器
- **Heading 必须** `width: "100%"` 防止 flex shrink-wrap 居中
- **SideNav + ProgressBar**: 对称定位 `max(24px, calc((100vw - 720px) / 2 - 220px))`

## 轮播架构

- **CarouselSlide**: width 84%, left 8%, 侧边条各 8%
- **侧边卡**: translateX(±9.52%), 无 scale, opacity 0.7, border #b8b0a3
- **箭头**: 绝对定位在 stage 内 left:4% / left:96%, zIndex 5
- **自动播放**: 4s 间隔, hover 暂停, ScreenshotCarousel 独立组件

## 开发命令

```bash
npx vite --port 5173          # 开发服务器
npx vite build                # 构建
```

## 注意事项

- 编辑只涉及 `src/App.jsx` 和 `src/index.css`，没有其他代码文件
- SVG 插图是内联 React 组件，不是外部文件
- body block 的 `bodyIndex` 从0开始计数，`skillTagJumps` 里的 index 必须与实际 block 位置对应
- `keySentence` 文本必须在对应 `keyBlock` 的正文中完全匹配（子字符串匹配）
- screenshot-inline 需要 `src` 属性指向 `images/` 下的文件
- screenshot-group / screenshot-carousel 的 items 数组每项也需要 `src`
- screenshot-carousel 的 `carouselActive` state 在 ProjectPage 组件顶层声明
