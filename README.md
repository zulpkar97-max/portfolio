# Portfolio V1

Portfolio V1 的公开站点与历史生产源。 / Portfolio V1 public site and historical production source.

## 这个仓库是什么 / What this repository is

这是 V1 的 public/live、historical、rollback 与 provenance carrier。默认分支 `master` 保留生产源；`gh-pages` 承载 Pages 发布结果。/ This is the V1 public/live, historical, rollback, and provenance carrier. The `master` branch retains the production source; `gh-pages` carries the Pages publication.

## 仓库结构 / Repository map

| 路径 / Path | 中文用途 | English purpose |
| --- | --- | --- |
| `src/` | V1 应用源代码 | V1 application source |
| `public/` | 静态资源与生产资产 | Static and production assets |
| `portfolio/` | 历史/相关 Portfolio 材料 | Historical/related Portfolio material |
| `generate-pdf.mjs` | PDF 生成入口 | PDF generation entrypoint |
| `package.json` | V1 构建与预览脚本 | V1 build and preview scripts |
| `.github/workflows/` | Pages 部署流程 | Pages deployment workflow |
| `CLAUDE.md` / `SECURITY.md` / `RIGHTS.md` | 项目边界与治理说明 | Project boundary and governance notes |

## 当前边界 / Current boundaries

V1 继续独立在线并保留历史生产与回滚价值。V2 已迁移到独立的 `portfolio-v2` 私有开发仓库；AF Runtime 位于 `af-lab`，不在本仓库。/ V1 remains independently live and retains historical production and rollback value. V2 is developed in the separate private `portfolio-v2` repository; AF Runtime is in `af-lab`, not here.

## 常用入口 / Useful entrypoints

`npm run dev` · `npm run build` · `npm run preview` · `npm run pdf`
