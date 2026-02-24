# Portfolio Website — zulpkar.com

## 项目概况

React 19 + Vite 7.3 单页应用，hash 路由（#project-1/2/3）。
所有组件、数据、样式都在 `src/App.jsx` 一个文件里（~2700行）。

## 技术栈

- React 19 + Vite 7.3，无 TypeScript
- 纯内联样式，无 CSS 框架
- SVG 插图作为 React 组件，注册在 `ILLUSTRATION_MAP`
- 部署：GitHub Pages（`/portfolio/` base path）
- Git 仓库：`zulpkar97-max/portfolio`，主分支 `master`

## 设计系统

- 背景：`#FAF9F7`
- 灰色梯度：`#EDEAE3` → `#D5D0C8` → `#B8B0A3` → `#2A2A2A`
- 强调色：`#5B8C7E`（绿）、`#7A8BA8`（蓝灰）
- 字体：DM Sans（正文）、DM Serif Display（标题）
- 字号常量 `T`：small=13, body=16, heading=18（移动端适配）

## 文件结构

```
src/App.jsx          — 唯一代码文件（组件 + 数据 + 样式）
public/images/       — 所有截图（15张）
  ├── collab-system-interaction.jpg    (Case 1)
  ├── nana-tech-architecture.jpg       (Case 1)
  ├── nana-ai-chat.jpg                 (Case 1)
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
index.html
```

## App.jsx 关键区域（按行号区间）

- **PROJECTS 数据数组**：~第15-292行
  - Project 1（协作危机）：id=1，lines ~15-137
  - Project 2（攻略站）：id=2，lines ~139-218
  - Project 3（18语种翻译）：id=3，lines ~220-292
- **共享组件**：PlaceholderBox, ScreenshotItem, TextPlaceholder ~295-340
- **ILLUSTRATION_MAP**（SVG组件注册表）：搜索 `ILLUSTRATION_MAP`
- **SideNav 组件**：搜索 `function SideNav`
- **ProjectPage 组件**：搜索 `function ProjectPage`
  - scroll-spy（activeScrollSection）
  - keyBlockMap 预计算
  - 两层 border（persistent + click）
  - 两层 key sentence 高亮（persistent + click animation）
- **Lightbox 组件**：搜索 `function Lightbox`
  - zoom/pan/pinch，pointer capture
  - 容器用 `maxWidth`（非固定 width），图片自适应
  - SVG 内容包裹在显式宽度 div 中
- **首页（LandingPage）**：搜索 `Project Entries`
  - 卡片：3列 grid（desktop）/ 堆叠（mobile），无时间信息
- **body block 渲染循环**：搜索 `block.type === "heading"`
  - 支持类型：heading, paragraph, quote-list, module-list, pull-quote, screenshot-inline, screenshot-group, screenshot-pair, illustration, iteration-step

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
1. **持续层**（滚动驱动）：浅灰左边线 `inset 2px 0 0 #D5D0C8` + 关键句淡底色 `rgba(229,226,220,0.35)`
2. **点击层**（临时动画）：深色左边线 `inset 3px 0 0 #111` + 关键句加强高亮动画（淡入1s→停留2s→淡出1s）

## 三个 Case 当前状态

### Case 1 — 不是人的问题，是系统的问题 ✅
- Header: 危机接管者 / 跨部门8人 / 项目已失控，合同悬而未决
- skillTags: 系统诊断, 约束下决策, 流程设计, AI落地
- 图片：3张截图 + 2个SVG插图（InfoHub, Iteration Flow）
- 状态：完成

### Case 2 — 客户说改UI，但UI不是问题 ✅
- Header: 自发介入者 / 跨5个部门联动 / 客户病急投医，方向不明
- skillTags: 问题重定义, 信任策略, 用户研究, 分阶段落地
- 图片：6张截图（3旧3新）+ 2个SVG插图（诊断漏斗图, 三期递进图）
- 状态：完成

### Case 3 — AI落地最难的部分，不是技术 ✅
- Header: AI产品负责人 / 2人（我+1名实习生）/ 无人要求，自主立项
- skillTags: 场景识别, 可行性判断, 迭代落地, 执行韧性
- 图片：6张截图 + 1个SVG插图（迭代流程图）
- 状态：完成

## 已完成的优化

- [x] Header 层级统一（h1/h2/h3）
- [x] Lightbox 一致性（统一触发方式）
- [x] 移动端布局修复
- [x] InfoHub SVG 重设计
- [x] Lightbox 拖拽修复 + 白边修复（maxWidth 方案）
- [x] 图片裁剪（nana-tech-architecture, collab-system-interaction）
- [x] SideNav 改为 skillTags 驱动 + scroll-spy
- [x] 两层高亮系统（persistent + click）
- [x] 首页卡片去除时间信息
- [x] Case 2 完整内容填充
- [x] Case 3 完整内容填充

## 开发命令

```bash
npx vite --port 5173          # 开发服务器
npx vite build                # 构建
```

## 注意事项

- 编辑只涉及 `src/App.jsx`，没有其他代码文件
- SVG 插图是内联 React 组件，不是外部文件
- body block 的 `bodyIndex` 从0开始计数，`skillTagJumps` 里的 index 必须与实际 block 位置对应
- `keySentence` 文本必须在对应 `keyBlock` 的正文中完全匹配（子字符串匹配）
- screenshot-inline 需要 `src` 属性指向 `images/` 下的文件
- screenshot-group 的 items 数组每项也需要 `src`
