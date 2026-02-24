import { useState, useEffect, useRef, useMemo, useCallback } from "react";

function useIsMobile(bp = 720) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const c = () => setM(window.innerWidth < bp);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, [bp]);
  return m;
}

// Height of the sticky Nav bar on mobile (used to anchor MobileProgressNav)
const MOBILE_NAV_H = 50;

/*
 * CARL NOTES (not rendered):
 * 1. Tagline + personal context: write as one conversational sentence
 * 2. Card tags: use PM-domain language (user research, data-driven, 0-1 build)
 * 3. Each project reflection: 1-2 paragraphs on trade-offs and learnings
 * 4. Project names: consider problem-statement style (a la Sam Frons)
 */

/*
 * COLOR TEMPERATURE CONSTRAINT (locked):
 * All site colors align to the warm-gray system established by the 5 illustrations.
 * Reference palette: bg #FAF9F7, grays #EDEAE3 → #B8B0A3 → #2A2A2A,
 * accents #5B8C7E (green) and #7A8BA8 (blue-gray), font DM Sans.
 * No pure white #fff or neutral cold grays (#e0e0e0, #f4f4f4) in page surfaces.
 * This constraint is binding for all subsequent UI work.
 */

const T = { display: 30, title: 22, heading: 18, body: 16, small: 13 };
// 单一中性强调色，减少绿色感，整体更黑白
const ACCENT = "#2A2A2A";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_DISPLAY = "'DM Serif Display', serif";

const PROJECTS = [
  {
    id: 1,
    name: "不是人的问题，是系统的问题",
    navName: "01",
    roleLine: "危机接管者 // 2023–2024",
    summary: "春节7天，从零搭出一套协作系统救回百万合同——之后又在同一项目里推动了公司首个AI智能体上线。",
    cardSummary: "合同快丢了，所有人在互相指责。我没有急着出方案，先拿7天做了15次一对一访谈——拼完所有人的说法，看到了一个谁都没意识到的问题。",
    cardTag: "公司首个长线项目",
    skillTags: ["系统诊断", "约束下决策", "流程设计", "AI落地"],
    skillTagJumps: {
      "系统诊断":  { scrollTo: 6,  borderRange: [5, 11],  keySentence: "不是人的问题，是系统的问题。", keyBlock: 10 },
      "约束下决策": { scrollTo: 13, borderRange: [13, 14], keySentence: "我给自己设了三条硬约束", keyBlock: 13 },
      "流程设计":  { scrollTo: 16, borderRange: [16, 20], keySentence: "六个模块不是拍脑袋拆的", keyBlock: 20 },
      "AI落地":   { scrollTo: 26, borderRange: [25, 33], keySentence: "知识库的信息架构", keyBlock: 33 },
    },
    context: "公司首个长线项目",
    cardImage: "images/collab-system-interaction.jpg",
    cardHighlights: ["从零搭建协作系统", "百万级合同挽回", "全公司SOP"],
    layoutMode: "linear",
    metricsMode: "state-change",
    stateBefore: "互相指责 · 信息淹没 · 职责不清",
    stateAfter: "单一信息源 · 状态全程可追溯 · 角色权责锁定",
    teamInfo: "核心15人，协调近百人",
    illustrations: [
      { name: "双轨时间轴", type: "时间线", note: "覆盖从危机诊断到AI上线的完整双线叙事" },
      { name: "六模块信息枢纽", type: "架构图", note: "覆盖协作系统的信息流动设计逻辑" },
    ],
    bodyStructure: [
      // === 背景 ===
      { type: "heading", text: "背景：一个差点丢掉的百万级合同", navLabel: "背景" },
      { type: "paragraph", text: "2023年，我所在的公司承接了一个游戏社区平台的全案开发项目。客户是一家头部游戏公司，项目总包约百万，分两期交付，预计周期两年。我的内部核心团队约15人，跨团队协调涉及客户方多个部门，总协调人数近百人。" },
      { type: "paragraph", text: "这个项目的复杂度远超我们过往经验。公司之前做的都是一两周就能结束的H5活动和小型游戏页面，从未接过这种体量的长线项目。我当时也没有接触过行业内已有的成熟专业协作工具——不知道它们的存在，更没有任何标准化流程的经验可以参照。" },
      { type: "paragraph", text: "一期开发过程中，团队协作迅速恶化。所有沟通靠群聊，关键信息被海量消息淹没；成员之间私聊解决问题，信息无法同步；需求描述模糊导致频繁返工；设计稿和技术文档散落各处，版本混乱；没人说得清谁负责什么，进度也完全不透明。团队情绪很差，频繁争吵，没有人想继续做这个项目。" },
      { type: "paragraph", text: "春节前，客户方的产品负责人对团队专业度提出严重质疑，明确表示考虑终止合作。我只剩7到8天的春节假期来挽回这件事。" },

      // === 诊断 ===
      { type: "heading", text: "诊断：先搞清楚问题出在哪", navLabel: "诊断" },
      { type: "paragraph", text: "面对这个局面，我没有急着想方案。我做的第一件事是回溯过去几个月积累的所有历史会议纪要和语音记录，把反复出现的争论点、矛盾点逐条标注出来，形成了一组初步假设：问题可能不是某个人或某个环节的问题，而是整个协作方式承载不了这个项目的复杂度。" },
      { type: "paragraph", text: "带着这些假设，我跟团队里不同角色做了15次一对一访谈。不是问卷，不是群体会议，是把人一个一个叫到办公室，正式坐下来，录音，开放式提问：\u201C你觉得现在最大的问题是什么？你需要什么样的支持？\u201D" },
      { type: "paragraph", text: "我拿到了几乎一致的诊断线索：" },
      { type: "quote-list", items: [
        { role: "前端开发", text: "需求总是不明确，我不知道做到什么程度算完成。" },
        { role: "后端开发", text: "我不知道前端在做什么，经常重复开发。" },
        { role: "设计师",   text: "我的稿子改了，但不知道开发有没有看到新版本。" },
        { role: "客户方",   text: "我提的需求，不知道有没有进入开发流程。" },
        { role: "技术部领导", text: "我看不到整体进度，不知道哪里卡住了。" },
      ]},
      { type: "paragraph", text: "每个人描述的症状不一样，但根源指向同一件事：信息在人和人之间流转不了。不是谁不愿意干活，是现有的群聊式协作方式，在一两周短项目里勉强能用，但放到两年长线项目里完全崩溃了。不是人的问题，是系统的问题。" },
      { type: "illustration", index: 0 },

      // === 设计 ===
      { type: "heading", text: "设计：用现有条件从零搭一套协作系统", navLabel: "设计" },
      { type: "paragraph", text: "确认了问题根源之后，我给自己设了三条硬约束：零成本——只用公司已有的飞书文档，不引入新工具；零学习成本——团队不需要学新东西，打开文档就能用；立即见效——没有时间搞试点推广，必须一上来就全员切换。" },
      { type: "paragraph", text: "这三条约束是现实倒逼出来的。公司没有预算买新工具，团队也没有时间和意愿去学一套陌生的系统。如果方案不能在现有条件下直接落地，就等于没有方案。" },
      { type: "paragraph", text: "我回到三个最基本的问题来推导。问题本质是什么？——信息不对称、流程不清晰、责任不明确。最小可行方案是什么？——用一份结构化的中枢文档，把所有信息、流程、责任固定下来。怎么保证执行？——规则公开透明，所有人只有一个信息来源。" },
      { type: "paragraph", text: "基于这个逻辑，我设计了六个模块：" },
      { type: "module-list", items: [
        { name: "变更日志",           desc: "强制记录所有改动，任何人都能追溯历史，解决「我改了但你不知道」的问题。" },
        { name: "资产归集",           desc: "把环境链接、文档、第三方平台凭证集中管理，终结「那个链接在哪」的重复提问。" },
        { name: "组织职责",           desc: "列清每个人的角色和职责边界，终结「这个问题该找谁」的困惑。" },
        { name: "需求全生命周期管理", desc: "核心模块。所有需求必须进入统一需求池，经过「待评估 / 已排期 / 开发中 / 已完成 / 已拒绝」完整状态流转，拒绝必须写明原因，决策过程透明可追溯。" },
        { name: "迭代发布",           desc: "每次发版前生成发布清单，明确本次上线什么、修复了什么。" },
        { name: "验收走查",           desc: "为每个页面建独立走查表，并列放设计稿和前端还原截图，把主观验收变成可比对、可追溯的结构化流程。" },
      ]},
      { type: "illustration", index: 1 },
      { type: "screenshot-inline", label: "飞书多维表格目录结构 + 协作流程图", note: "正文讲六模块系统时", src: "images/collab-system-interaction.jpg" },
      { type: "paragraph", text: "六个模块不是拍脑袋拆的，每一个都对应着访谈中反复出现的具体痛点。需求全生命周期管理对应的是前端\u201C不知道做到什么程度\u201D和客户\u201C不知道需求有没有进流程\u201D的问题；变更日志对应的是设计师\u201C改了但开发不知道\u201D的问题；组织职责对应的是所有人\u201C不知道找谁\u201D的问题。" },
      { type: "paragraph", text: "推行策略是\u201C先建共识再定规则\u201D。项目启动会上，我把一期暴露的问题一条一条摊开，让团队自己确认——这些是不是真的？然后针对每个问题提出对应的模块方案。团队自然接受了，因为方案就是从他们说出来的问题中推导出来的。我没有给\u201C不同意\u201D的选项——这是引导，不是强制，但也没有留退路。" },
      { type: "paragraph", text: "结果是：这套协作系统直接支撑了二期的顺利交付，差点丢掉的合同被挽回来了。客户签下了二期。之后我把系统打包成三个版本（简化/标准/完整），适配不同复杂度的项目，向公司提议推广。技术部先用，效果验证后其他团队认可跟进，最终成为全公司标准SOP。" },
      { type: "paragraph", text: "后来我才知道，行业内早已有成熟的专业协作工具在做类似的事。我从问题本身出发一步步推导出来的东西，和那些成熟工具的底层逻辑高度一致。这件事让我意识到：解决问题的关键不是知道有什么工具，而是能不能准确诊断出问题的结构，然后用手头有的资源把它解出来。" },
      { type: "screenshot-group", items: [
        { src: "images/1771894558756_协作系统截图3.png", label: "文档结构", note: "协作系统完整文档架构" },
        { src: "images/协作系统截图1.png", label: "流程设计", note: "执行层流程设计" },
        { src: "images/协作系统运行记录.png", label: "看板运行", note: "系统实际运行状态" },
      ]},

      // === 转折 ===
      { type: "heading", text: "转折：在同一个项目里识别AI落地机会", navLabel: "转折" },
      { type: "paragraph", text: "二期进入查漏补缺阶段时，DeepSeek刚刚发布，成本极低、性能很强。我判断这个技术可以用在社区场景里——如果给微社区接入一个AI攻略助手，能直接提升用户停留时长和使用频率，这正是客户最核心的诉求。" },
      { type: "paragraph", text: "但我没有直接去找客户。我做的第一件事是确认这件事在技术上能不能落地。我绕过了项目经理，直接找技术总监。原因很现实：按这个方案前期肯定亏损，项目经理受限于预算考核，这个想法大概率在萌芽阶段就会被否掉。我需要技术总监帮我确认可行性，也需要他帮忙推动资源支持。" },
      { type: "paragraph", text: "我直接坐到技术总监旁边，一起研究Coze平台的技术文档。我看不懂代码，但我能识别哪些环节可能有技术风险，然后逐一向他确认。确认技术可行后，我做了人力资源预估：前端约1.5人，后端2人。同时梳理了管理端需求——活动管理、英雄信息输入、知识库维护，这些是客户运营必须的能力。" },
      { type: "paragraph", text: "所有准备工作做完，我才开始跟客户沟通。我预判客户一定会抗拒——外包方提议加新功能，客户的第一反应通常是怀疑动机。所以我的预案策略是：方案足够详细，方向、内容、时间节点全部明确；同时设计退出机制，数据不好随时可以撤，分散客户的决策压力。" },
      { type: "paragraph", text: "第一次pitch写了简要提案，先探口风。客户的反应不是拒绝，是不确定——回去跟Leader讨论。Leader过来让我再讲一遍，提了修改意见，要求出交互设计。这里有一个关键动作：我用下班后的业余时间自己做了交互设计，没有跟公司报备。原因是项目经理的预算报不出去，但我想推这件事。作为外包方，出交互图通常是要收费的，我自己承担了这个成本。" },
      { type: "paragraph", text: "第二次pitch带着完整交互方案再讲一遍，过程中持续协商。最后在正式沟通会上，带上工程师和项目经理完成了集体宣讲。客户和Leader拿着方案去找VP要预算——我的权限到这里为止了，无法再介入。VP批了。从第一次pitch到审批通过，大约一个半月。" },
      { type: "screenshot-inline", label: "娜娜AI对话界面", note: "正文讲AI产品时", src: "images/nana-ai-chat.jpg" },
      { type: "paragraph", text: "最终落地的智能体叫\u201C娜娜\u201D，基于Coze平台搭建，底层模型为DeepSeek R1/V3及豆包。上线后服务了2000多名用户。调试过程中遇到的最大问题是知识库检索不准：以同一个问题重复测试20次，初始版本仅5次命中正确内容，12次返回其他英雄的信息，3次检索不到任何结果。根因是原来的知识库把每个英雄的所有信息作为一个大块存入，用户问具体问题时搜索引擎无法精准命中。我重新设计了知识库的信息架构——每个英雄拆成三段切片（英雄简介、技能+战场技能+连招、装备+徽记），字段对齐后迁移至火山引擎向量知识库VikingDB，由技术团队完成Embedding模型选型和检索参数的配置调试。优化后同样的测试20次全部准确命中。核心是信息架构的重设计，不是单纯换平台。" },

      // === 回头看 ===
      { type: "heading", text: "回头看：这两件事教会我什么", navLabel: "回头看" },
      { type: "paragraph", text: "这个项目里我做了两件性质不同但逻辑相通的事。协作系统是在危机中被动响应——团队要崩了，我必须找到问题并解出来。娜娜是在稳定期主动进攻——我识别到一个技术机会，判断它能创造价值，然后推动它落地。" },
      { type: "paragraph", text: "两件事的共同点是：在每个关键节点，我的判断比我的执行更重要。判断\u201C不是人的问题是系统的问题\u201D决定了协作系统的方向；判断\u201CDeepSeek能用在社区场景\u201D决定了AI线的启动；判断\u201C先找技术总监不找项目经理\u201D决定了娜娜项目能活过萌芽期。" },
      { type: "paragraph", text: "但这些判断都是靠经验和直觉驱动的，缺少系统性的方法论支撑。我能从零设计一套协作系统，但说不清楚它背后的理论框架；我能识别AI落地机会并推动客户买单，但对AI产品管理的完整知识体系还有明显的缺口。这也是我想进一步深入学习的原因——把散装的实践经验，整合进一个专业的、可复用的框架里。" },
    ],
    supportingScreenshots: [
      { label: "四层技术架构", proves: "技术选型全景", src: "images/nana-tech-architecture.jpg", featured: true },
      { label: "看板运行状态", proves: "系统日常运行状态" },
      { label: "空间化PRD", proves: "信息架构实际产出" },
    ],
  },
  {
    id: 2,
    name: "客户说改UI，但UI不是问题",
    navName: "02",
    roleLine: "自发介入者 // 2025",
    summary: "【一句话概述待定稿】",
    cardSummary: "订单范围是UI迭代，没有人让我做全站走查，更没有人让我自掏腰包找三四十个用户做访谈。但我需要先搞清楚这个产品到底卡在哪——走查报告和三期规划是未收费主动交出去的，拿着它直接过了客户VP的审批。",
    cardTag: "【关键数字待定】",
    cardImage: null,
    cardHighlights: ["¥10万→¥150万", "三期产品规划", "20人执行团队"],
    layoutMode: "before-after",
    metricsMode: "numbers",
    metrics: [
      { number: "¥100K", label: "起始订单" },
      { number: "¥1.5M", label: "最终审批规模" },
      { number: "15\u00D7", label: "订单扩展倍数" },
    ],
    teamInfo: "内部团队20人",
    context: "【待定】",
    skillTags: ["【待定】"],
    skillTagJumps: {},
    illustrations: [
      { name: "诊断漏斗图", type: "漏斗图", note: "覆盖诊断链（从表象到根因）" },
      { name: "三期递进图", type: "路线图", note: "覆盖落地路径和商业结果" },
    ],
    bodyStructure: [
      // === 起点 ===
      { type: "heading", text: "起点：一个卡住的客户，和一个即时冒出来的念头", navLabel: "起点" },
      { type: "paragraph", text: "2025年初，一个攻略站项目转到我手上。背景是这样的：客户之前找外包做了一版潮汐守望者游戏攻略站（移动端H5），一期上线后效果不好，想做二期但说不清楚该往哪个方向改。最后给出的需求是\u201C先把UI改一下\u201D——这不是一个明确的产品诉求，更像是找不到方向时退而求其次的兜底选项。起始订单是10万的UI迭代。" },
      { type: "paragraph", text: "听到\u201C潮汐守望者\u201D这个名字的瞬间，我就搜索并下载了游戏。这是职业本能——你要帮一个游戏攻略站做产品判断，不深入理解它服务的游戏生态，所有判断都是空的。" },
      { type: "paragraph", text: "下载游戏后几乎立刻注意到一件事：玩家之间有一个非常活跃的\u201C装备码\u201D分享习惯。在B站、YouTube这些平台上，玩家分享一串代码，其他人在游戏内输入就能直接复制整套英雄装备配置。这是游戏已有的、被玩家高频使用的打通机制。我当时脑子里冒出来一个念头：既然装备能用一串码打通，为什么攻略站的\u201C阵容\u201D不能？这个想法在那一刻就出现了，不是后来分析出来的。但直觉离落地很远，我先把它放着，开始做正事。" },

      // === 走查 ===
      { type: "heading", text: "走查：不是客户要求的，但我判断必须做的事", navLabel: "走查" },
      { type: "paragraph", text: "客户说的是改UI。如果我只按这个需求做，正确的动作是拉一份界面修改清单，报价执行。但我没有这么做。原因很简单：我还不理解这个产品，没有足够的判断力来确认\u201C改UI\u201D是不是真正需要做的事。所以我给自己加了一项不在订单范围内的工作——全站体验走查，从首页到编辑器到收藏到个人中心，逐页记录问题并归类。没有人要求我做这件事。" },
      { type: "paragraph", text: "打开攻略站的第一眼，两个感受同时出现：视觉层面不匹配，这是客观的；更重要的是一种\u201C四不像\u201D感——这个产品既不像一个内容平台，也不像一个工具站，说不清它到底想做什么。直觉层面就不对劲。" },
      { type: "paragraph", text: "首页走完，判断加重了。问题不在于某个按钮丑或某处配色不对——而是整个页面没有信息优先级。哪些内容重要、哪些次要、用户该按什么顺序看，完全没有引导。功能堆在那里，但堆的逻辑不清楚。UI丑可以换皮，信息架构的混乱说明产品本身没想清楚自己要给用户呈现什么。如果只是UI问题，首页应该是\u201C好看但不好用\u201D或者\u201C丑但逻辑清晰\u201D，不应该是\u201C不知道在说什么\u201D。" },
      { type: "screenshot-pair", labelBefore: "首页 Before", labelAfter: "首页 After", note: "正文讲首页走查时" },
      { type: "paragraph", text: "编辑器的问题更直接。攻略站的编辑器不只是给普通用户用的——在这个生态里，真正持续产出内容的人首先是能带来流量的游戏主播，其次是官方的内容运营人员。编辑器是他们的核心生产工具。但整条上传链路的操作逻辑跟游戏内搭阵容的逻辑完全不一致，玩家在游戏里习惯的交互方式到了攻略站变成另一套东西。如果连最核心的内容生产者都觉得难用，产品的问题就不在表面。" },
      { type: "screenshot-pair", labelBefore: "编辑器 Before", labelAfter: "编辑器 After", note: "正文讲编辑器走查时" },
      { type: "paragraph", text: "走查进行到大约一半的时候，我开始注意到一个反复出现的现象：很多问题表面上各不相同，但底下都是同一种冲突——功能和功能在打架。首页里，内容推荐和筛选工具在抢同一块空间，信息展示和操作入口互相挤压，谁都没有得到合理的优先级。编辑器里，攻略的文字描述流程和阵容的结构化配置被塞在同一条线性链路里，两种完全不同性质的任务被迫共用一套交互逻辑。一个想展示内容，一个想提供工具，但产品没有决定谁先谁后、怎么衔接，所以它们在每个页面里各自为战。" },
      { type: "paragraph", text: "这个冲突反复出现之后，我才意识到它们不是各自独立的缺陷，是同一个根源。我回到\u201C攻略站\u201D这三个字本身去想：攻略站天然有双重身份，它是眼睛看的（玩家来这里看攻略内容），也是手上用的（玩家要把阵容拿到游戏里去用）。看和用，这两件事必须实现闭环。但当前的产品把这两个角色既没有整合、也没有区分，互相干扰着挤在一起。" },
      { type: "paragraph", text: "到这里，我之前下载游戏时冒出的那个念头突然有了落点。阵容码不只是一个功能想法——它恰好是连接\u201C看\u201D和\u201C用\u201D的枢纽。主播展示阵容码，玩家看完攻略后输入阵容码，在游戏内直接使用。两个角色通过一串代码实现统一。" },
      { type: "paragraph", text: "我基本确认了两件事：第一，客户的问题不是UI，是产品定位——\u201C内容聚合\u201D和\u201C阵容工具\u201D两个身份没有找到统一的方式；第二，定位之外，执行层面的交互设计基础也出了问题。" },
      { type: "paragraph", text: "但我知道不能一上来就跟客户说\u201C你的问题不是UI是定位\u201D。所以我在走查报告里做了一个刻意的安排：前半部分老老实实标注每一个UI和交互缺陷，配截图、写修复方案，回应客户\u201C先改UI\u201D的原始需求。你拿着这部分找更便宜的外包去改也行。真正的重点在报告后半部分——产品定位分析和分阶段规划。先解决客户说的问题，再引出客户没看到的问题。" },
      { type: "illustration", index: 0 },

      // === 验证 ===
      { type: "heading", text: "验证：走查能看到产品，看不到人", navLabel: "验证" },
      { type: "paragraph", text: "走查告诉我产品本身有什么问题，但它有一个天然局限：看不到真实用户在实际使用中卡在哪里。我对这款游戏的理解也可能不够深。这个判断需要第三方验证。" },
      { type: "paragraph", text: "还是那个前提——没有人要求我做这件事。10万的UI迭代订单不包含用户调研，公司不会报销访谈费用。但我判断不做不行。我自掏腰包做了一对一访谈：给国内主播发50块红包、国外主播发10美金，换半小时深度对话；普通玩家每人约聊10分钟；官方的内容填报人员不需要花钱，这是他们工作的一部分，直接聊。前后接触大约三四十人。" },
      { type: "paragraph", text: "几类关键反馈逐渐清晰，每一类都接回了我在走查中形成的诊断：\n\n官方内容填报人员说上传流程太繁琐、步骤太多——这直接印证了走查中编辑器的判断：上传链路跟游戏内逻辑不一致，连最核心的内容生产者都觉得难用，问题确实不在UI层面。\n\n头部主播的反馈补充了走查完全看不到的维度：写完攻略之后分发量不够，分享出去只是一个链接，点击量和用户反馈作者完全不知道，没有激励也没有反馈，持续创作动力很难维持。这告诉我：产品不只是\u201C内容聚合\u201D这个角色没做好，它根本没想清楚内容生产出来之后往哪走——内容的流通和生态的循环是整体缺失的。\n\n最重要的观察来自普通用户。攻略站上目前全是图文，但潮汐守望者是一款高度策略化的游戏，阵容的英雄站位、出手顺序、操作时机都是通关关键。这类信息靠图文很难讲清楚。在游戏内容的信息传递中，文字的效率低于图片，图片低于视频——尤其对操作密集的策略型游戏，玩家需要的是\u201C手把手跟着做\u201D，需要知道几分几秒该做什么。这意味着产品形态本身也需要重新考虑。" },
      { type: "paragraph", text: "走查、访谈、玩游戏是同步推进的。深度玩了大约两个月后，之前脑子里零散的判断全部串起来了。" },

      // === 方案 ===
      { type: "heading", text: "方案：分阶段实施，阵容码是枢纽", navLabel: "方案" },
      { type: "paragraph", text: "基于走查和访谈的完整诊断，阵容码从最初的产品直觉变成了整个方案的枢纽。它是攻略站相较于任何外部平台的独家优势——B站和YouTube只能看视频，不能实现阵容数据的直接复用。" },
      { type: "paragraph", text: "但阵容码不能第一步就做，它依赖游戏客户端的功能支持。我产出了三期规划：第一期解决当前竖版交互的基础体验问题，优化上传链路和信息架构，让产品先能用；第二期做横版适配——游戏内核心操作界面全是横版，主播和核心玩家普遍用PC端或模拟器，竖版H5在主力使用场景下体验断裂；第三期横版内嵌游戏、联动阵容码，打通\u201C看攻略\u201D和\u201C用攻略\u201D的完整闭环。" },
      { type: "illustration", index: 1 },
      { type: "paragraph", text: "我没有让客户三选一，建议是全做、分阶段实施，总预算150万。" },
      { type: "paragraph", text: "走查报告和三期规划都是未收费主动产出的。我拿走查报告直接跟客户VP团队做了汇报，方案获得审批。订单从10万UI迭代扩展为150万的完整产品重构，分三阶段执行。我离职时前两个阶段约110万已在执行中，内部团队20人。" },
      { type: "screenshot-pair", labelBefore: "详情页 Before", labelAfter: "详情页 After", note: "方案落地后的详情页重设计" },

      // === 回头看 ===
      { type: "heading", text: "回头看", navLabel: "回头看" },
      { type: "paragraph", text: "我之前处理过一次已经爆发的团队协作危机，那次是问题摆在所有人面前，合同快丢了，我必须找到根源并解出来。这次完全不同。客户只说\u201C改UI\u201D，没有人让我做全站走查，没有人让我找三四十个用户访谈，走查报告和三期规划不在订单范围内，访谈费用是自己出的。从头到尾，每一步都是我自己判断\u201C这件事应该做\u201D之后主动推进的。" },
    ],
    supportingScreenshots: [],
  },
  {
    id: 3,
    name: "AI落地最难的部分，不是技术",
    navName: "03",
    roleLine: "AI产品负责人 // 2024–2025",
    summary: "从娜娜项目衍生：通过内部调研识别跨国翻译痛点，从0搭建覆盖18语种的AI翻译系统，独立完成从MVP到飞书集成的全链路迭代。",
    cardSummary: "第一个AI产品上线后，我在公司做了一轮AI培训，但目的不是教人用工具——我想知道哪些业务场景真正值得用AI重做。挨个部门聊完之后，从十几个候选里筛出了翻译：需求高频、流程标准化、容错空间大。判断完该不该做，剩下的就是做。",
    cardTag: "AI产品 · 0→1",
    cardImage: null,
    cardHighlights: ["18语种翻译系统", "节省十几万翻译成本", "2人团队"],
    layoutMode: "iteration",
    metricsMode: "numbers",
    metrics: [
      { number: "18", label: "Languages supported" },
      { number: "5", label: "Iteration steps" },
      { number: "4", label: "Business scenarios" },
    ],
    teamInfo: "2人核心团队（我 + 实习生1名）",
    context: "【待定】",
    skillTags: ["【待定】"],
    skillTagJumps: {},
    illustrations: [
      { name: "线性迭代流程图", type: "流程图", note: "从MVP到business-ready的五步迭代路径与关键决策节点" },
    ],
    bodyStructure: [
      // === 背景 ===
      { type: "heading", text: "从一次内部培训开始的AI落地", navLabel: "背景" },
      { type: "paragraph", text: "娜娜项目上线后，我在公司内部做了一场AI培训宣讲，主题是鼓励大家用Coze平台搭建自己的工作流。我当时的想法很简单——娜娜证明了AI在实际业务中能用，但如果只有我一个人在推，AI在公司内部的落地就始终是孤例。我希望更多人看到这个可能性。" },
      { type: "paragraph", text: "培训结束后我做了用户调研，收到了一条让我停下来的反馈：政企部门说跨国业务的翻译特别痛苦。他们的业务覆盖十八种语言，但市面上很难找到一家供应商能同时处理这么多语种且价格合理，实际操作是每两三种语言找一家不同的外包公司。成本高是一方面，更大的问题是对接复杂——十八种语言意味着要同时管理多条外包线，沟通成本和出错概率都在翻倍增长。" },
      { type: "paragraph", text: "我当时的判断是：这件事很适合用AI解决。原因有三点。第一，翻译是高度标准化的输入输出任务，AI大模型在这个场景下的能力已经足够成熟。第二，痛点不在翻译质量本身，而在多语种并行处理的效率和成本——这恰好是AI工作流最擅长解决的问题。第三，如果做成了，受益的不只是政企部门，公司所有全球业务线都有同样的需求。" },
      { type: "paragraph", text: "我带着初步方案去找了技术总监。确认技术上可行之后，我开始动手。" },

      // === 迭代过程 ===
      { type: "iteration-step", version: "Step 1", heading: "MVP: 跑通中英文纯文本互换", navLabel: "MVP" },
      { type: "paragraph", text: "最简单的 input/output，目的只有一个——验证翻译逻辑在 Coze 工作流里能不能跑通。这一步不追求完美，只追求「能用」。" },

      { type: "iteration-step", version: "Step 2", heading: "API 选型", navLabel: "API选型" },
      { type: "paragraph", text: "这一步我花了比较多时间权衡。评估维度有三个：业务量适配度（我们的翻译量级适合哪种计费模式）、价格（在合适的前提下找最便宜的）、翻译准确度。三者不可能都是最优解，我需要找到平衡点。最终选定了在我们的业务量级下性价比最高的方案。" },

      { type: "iteration-step", version: "Step 3", heading: "从文本到文件，从政企到全公司", navLabel: "产品升级" },
      { type: "paragraph", text: "MVP跑通之后我发现两件事。第一，翻译需求不只存在于政企部门——公司全球业务线都有「随手放进去就能翻」的需求，用户范围比我最初预想的大得多。第二，用户实际工作中处理的不是一句一句的文本，而是整份文档。这两个发现改变了我对产品边界的判断：这不是一个给政企部门用的小工具，而是需要支持文件级批量处理的通用翻译系统。产品定位的升级直接决定了后续所有功能的设计方向。" },

      { type: "iteration-step", version: "Step 4", heading: "格式转换——整个项目最难的环节", navLabel: "格式突破" },
      { type: "paragraph", text: "问题在于：Excel输入只能Excel输出，Markdown同理，现有的Coze插件都做不到跨格式转换。但用户的真实需求是灵活的——他们希望文本输入之后，可以选择输出为Excel、云文档或其他格式。这里我面对一个选择：是接受技术限制、告诉用户「输入什么格式就输出什么格式」，还是想办法突破？我选择后者，因为如果用户还得自己做格式转换，这个系统的实际使用门槛并没有真正降下来。我把需求定义清楚后交给技术团队，他们用Coze的代码插件功能开发了自定义插件来解决这个问题。" },

      { type: "iteration-step", version: "Step 5", heading: "飞书集成与前端搭建", navLabel: "整合上线" },
      { type: "paragraph", text: "格式问题解决之后，下一个判断是：怎样才算「真正好用」？我的标准是用户拿来就能用，不需要任何额外操作。所以我推动了飞书集成——翻译完成后自动生成文档、直接写入对应人的文档库，省去转换和上传步骤。前端方面，因为这是一个公益性项目，没有独立的前端开发人力，我自己用低代码平台搭建了用户界面，包括单语种和多语种两个入口。这一步的判断不复杂，但它决定了最终产出是「能跑的demo」还是「同事们愿意打开来用的工具」。" },
      { type: "screenshot-inline", label: "飞书云表格18语种产出", note: "实际翻译产出，展示系统覆盖的语言范围" },
      { type: "screenshot-inline", label: "自搭前端界面", note: "低代码平台搭建的用户界面（单语种 / 多语种两个入口）" },

      { type: "illustration", index: 0 },

      // === 调试 ===
      { type: "heading", text: "调试：最痛苦的部分", navLabel: "调试" },
      { type: "paragraph", text: "坦白说，整个迭代过程中最让我崩溃的不是产品设计，而是调试。\n\n我不懂代码。但Coze工作流的调试不是「点一下就跑通」的事情——系统频繁报错，报错信息对我来说就是一堆看不懂的技术术语。我的做法是逼自己查资料、逐条读报错信息、试不同的节点组合、调整工作流搭配、切换节点，反复排查。没有人帮我做这件事，因为这个项目的团队只有我和一个实习生——实习生负责记录报错信息、汇报进展、编写提示词初稿（由我审核定稿）、知识库维护更新等基础工作，但核心的架构决策和排错方向都是我在定。\n\n这个过程极其痛苦，但它让我理解了一件事：AI PM不需要自己写代码，但必须有能力在技术实现层面「够得着」——至少能读懂报错信息意味着什么，能判断问题出在哪个环节，能跟工程师说清楚「我需要你在这个节点上做什么」。" },
      { type: "screenshot-inline", label: "Coze工作流运行界面", note: "工作流实际运行状态与节点结构" },

      // === 结果 ===
      { type: "heading", text: "结果", navLabel: "结果" },
      { type: "paragraph", text: "系统正式投入公司使用，覆盖十八个语种的翻译需求。实际产出是标准化的多语种Excel表格——中文内容可以一次性转换为英语、泰语、土耳其语、马来语、缅甸语、越南语、印尼语、葡萄牙语、俄语、高棉语、菲律宾语、西班牙语等十八种目标语言。相比之前分找多家外包公司的模式，显著降低了人工翻译成本，同时把多语种并行处理的效率从「逐条对接」提升到了「一次完成」。" },

      // === 回头看 ===
      { type: "heading", text: "回头看", navLabel: "回头看" },
      { type: "paragraph", text: "如果说娜娜项目让我证明了「我能从零做出一个AI产品」，翻译系统让我看到的是另一件事——一个人做出一个AI产品不够，关键是能不能让AI能力在组织内部扩散开来。" },
      { type: "paragraph", text: "回头看整个链条：我先做了娜娜，然后做内部培训把经验推出去，通过培训后的调研发现了翻译场景，判断值得做之后从MVP迭代到完整系统。而这还没结束——在同一时期，我还在Coze平台上搭建了财务报销助手和多Agent架构的营销问答系统，覆盖了社区、翻译、财务、营销四个完全不同的业务场景。" },
      { type: "paragraph", text: "这个过程让我意识到，AI在组织内部的落地不是一个项目一个项目单独发生的。它需要有人先做出第一个成功案例打开局面，再主动把能力和方法推广出去，再持续识别新的场景、判断优先级、推动落地。这个「推动者」的角色，技术能力不是门槛——公司有比我强得多的工程师——门槛是对业务场景的判断力，以及愿意主动去推的意愿。" },
      { type: "paragraph", text: "但我也清楚，目前我做这些判断基本靠经验积累和直觉驱动。翻译系统之所以成功，一部分是判断准确，一部分是场景本身足够标准化、容错空间大。如果场景更复杂、风险更高，纯靠直觉是不够的。我需要系统性的方法论支撑——不是学怎么用Coze搭工作流，而是学怎么评估一个AI场景的可行性、优先级和投入产出比。这是我想通过硕士阶段补上的东西。" },
    ],
    supportingScreenshots: [
      { label: "Coze平台工作流节点视图", proves: "工作流架构与迭代过程" },
      { label: "飞书机器人开发者署名", proves: "实际落地部署证明" },
    ],
  },
];

/* ===== Shared Components ===== */

function PlaceholderBox({ label, sublabel, height = 180, dark = false }) {
  return (
    <div style={{
      width: "100%", height,
      border: dark ? "1px solid #B8B0A3" : "1px dashed #D5D0C8",
      backgroundColor: dark ? "#EDEAE3" : "#F2EFEA",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 16, boxSizing: "border-box",
    }}>
      <span style={{ fontSize: T.small, color: "#888", textAlign: "center", lineHeight: 1.5 }}>{label}</span>
      {sublabel && <span style={{ fontSize: T.small, color: "#aaa", marginTop: 4, textAlign: "center" }}>{sublabel}</span>}
    </div>
  );
}

function ScreenshotItem({ item, onLightbox }) {
  const [failed, setFailed] = useState(false);
  const hasImage = item.src && !failed;
  return (
    <div onClick={() => hasImage && onLightbox()} style={{ cursor: hasImage ? "pointer" : "default" }}>
      {hasImage ? (
        <img
          src={item.src}
          alt={item.label}
          style={{ width: "100%", display: "block" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <PlaceholderBox label={item.label} sublabel={item.note} height={200} />
      )}
      <div style={{ marginTop: 8 }}>
        <p style={{ fontSize: T.small, fontWeight: 600, color: "#333", margin: 0 }}>{item.label}</p>
        {item.note && <p style={{ fontSize: T.small, color: "#999", margin: "2px 0 0" }}>{item.note}</p>}
      </div>
    </div>
  );
}

function TextPlaceholder({ lines = 4 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ height: 10, backgroundColor: "#E5E2DC", width: i === lines - 1 ? "55%" : "100%" }} />
      ))}
    </div>
  );
}

function Footer({ isMobile }) {
  const maxW = 860;
  return (
    <footer style={{
      maxWidth: maxW,
      margin: "0 auto",
      padding: isMobile ? "24px 16px 24px" : "24px 40px 32px",
      textAlign: "center",
      borderTop: "1px solid #E5E2DC",
    }}>
      <p style={{ fontSize: T.body, color: "#444", margin: 0, lineHeight: 1.8 }}>
        {"【邮箱 / LinkedIn，待Carl确认放哪些】"}
      </p>
      <p style={{ fontSize: T.small, color: "#ccc", marginTop: 8 }}>{"zulpkar.com"}</p>
    </footer>
  );
}

function Nav({ currentPage, onNavigate, isMobile }) {
  const [hovered, setHovered] = useState(null);
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: "#FAF9F7",
    }}>
      <div style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: isMobile ? "10px 16px 8px" : "12px 40px 8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #EDEAE6",
      }}>
        <span
          onClick={() => { if (currentPage !== "home") onNavigate("home"); }}
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered(null)}
          style={{
            fontSize: T.heading,
            fontWeight: 700,
            color: hovered === "home" ? "#FAF9F7" : "#000",
            fontFamily: FONT_DISPLAY,
            flexShrink: 0,
            cursor: "pointer",
            padding: "4px 12px",
            borderRadius: 0,
            backgroundColor: hovered === "home" ? "#111111" : "transparent",
            transition: "color 0.2s ease, background-color 0.2s ease",
          }}
        >{"Zulpkar Tuerxun"}</span>
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
        {PROJECTS.map((p) => {
          const isActive = currentPage === "project-" + p.id;
          const isItemHovered = hovered === p.id;
          return (
            <span
              key={p.id}
              onClick={() => { if (!isActive) onNavigate("project-" + p.id); }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontSize: T.small,
                fontFamily: FONT_DISPLAY,
                fontWeight: isActive ? 600 : 400,
                color: isItemHovered ? "#FAF9F7" : isActive ? "#000" : "#888",
                padding: "4px 10px",
                backgroundColor: isItemHovered ? "#111111" : isActive ? "#F2EFEA" : "transparent",
                borderRadius: 0,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "color 0.2s ease, background-color 0.2s ease",
              }}
            >
              {p.navName}
            </span>
          );
        })}
        {!isMobile && <span style={{ color: "#E5E2DC", fontSize: T.small, margin: "0 4px" }}>|</span>}
        <span style={{
          fontSize: T.small, color: "#ccc",
          cursor: "not-allowed", userSelect: "none",
          whiteSpace: "nowrap",
          padding: "4px 10px",
        }}>
          {"EN / 中"}
        </span>
      </div>
      </div>
    </nav>
  );
}

/* ===== Homepage ===== */

function HomePage({ onNavigate, isMobile }) {
  const maxW = 860;
  const [hoveredId, setHoveredId] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [pageCursor, setPageCursor] = useState({ x: 0, y: 0, visible: false });
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [pressedId, setPressedId] = useState(null);

  return (
    <div
      style={{ width: "100%", position: "relative" }}
      onMouseMove={(e) => {
        // 只在没有 hover 某个卡片时，展示页面级跟随效果
        if (hoveredId != null) return;
        setPageCursor({ x: e.clientX, y: e.clientY, visible: true });
      }}
      onMouseLeave={() => setPageCursor((c) => ({ ...c, visible: false }))}
    >
      {/* Page-level subtle cursor indicator for whitespace */}
      {pageCursor.visible && hoveredId == null && !isMobile && (
        <div
          style={{
            position: "fixed",
            left: pageCursor.x - 60,
            top: pageCursor.y - 60,
            width: 120,
            height: 120,
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 60%)",
            pointerEvents: "none",
            mixBlendMode: "multiply",
          }}
        />
      )}
      {/* === Hero/Tagline === */}
      <div style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "24px 16px 0" : "40px 40px 0", textAlign: "center" }}>
        <h1 style={{
          margin: "0 auto",
          maxWidth: 580,
          fontFamily: FONT_DISPLAY,
          lineHeight: 1.5,
        }}>
          <span style={{
            fontSize: isMobile ? 16 : 20,
            fontWeight: 400,
            color: "#8A8276",
            letterSpacing: "0.02em",
          }}>{"产品、设计、项目管理、客户 \u00B7\u00B7\u00B7  收拢成一个 "}</span>
          <span style={{
            fontSize: isMobile ? 16 : 20,
            fontWeight: 700,
            color: "#000",
          }}>{"PM"}</span>
          <span style={{
            fontSize: isMobile ? 16 : 20,
            fontWeight: 400,
            color: "#8A8276",
          }}>{" 底座"}</span>
          <br />
          <span style={{
            fontSize: isMobile ? 24 : 30,
            fontWeight: 400,
            color: "#2A2A2A",
          }}>{"下一步方向："}</span>
          <span style={{
            fontSize: isMobile ? 36 : 48,
            fontWeight: 700,
            color: "#FAF9F7",
            backgroundColor: "#111111",
            padding: "0 14px 0 10px",
            display: "inline-block",
            lineHeight: 1.2,
          }}>{"AI"}</span>
        </h1>
      </div>

      {/* === Curatorial line — belongs to card section, not hero === */}
      <div style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" }}>
        <p style={{
          fontSize: 12, color: "#8A8276", fontWeight: 500,
          margin: 0, lineHeight: 1.5, marginBottom: isMobile ? 16 : 24,
          letterSpacing: "0.04em",
          paddingTop: 0,
          marginTop: isMobile ? 24 : 36,
        }}>
          {"三个项目，做的事越来越不一样——但切入点始终一样：先把问题拆对。"}
        </p>
      </div>

      {/* === Project Entries === */}
      <div style={{ marginTop: 0, marginBottom: isMobile ? 24 : 32 }}>
        {PROJECTS.map((p, idx) => {
          const isHovered = hoveredId === p.id;
          const timeStr = p.roleLine.split(" // ")[1] || "";

          return (
            <div
              key={p.id}
              onTouchStart={() => setPressedId(p.id)}
              onTouchEnd={() => setPressedId(null)}
              onTouchCancel={() => setPressedId(null)}
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                backgroundColor: isMobile && pressedId === p.id ? "#F2EFEA" : "transparent",
                transition: "background-color 0.1s ease",
              }}
            >
              <div
                style={{
                  maxWidth: maxW,
                  margin: "0 auto",
                  padding: isMobile ? "16px 16px" : "6px 40px",
                  minHeight: 120,
                }}
              >
              {/* Desktop: number anchor + text + arrow */}
              {!isMobile ? (
                <div
                  onClick={() => onNavigate("project-" + p.id)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoverPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "90px 1fr auto",
                    columnGap: 24,
                    alignItems: "center",
                    padding: "28px 24px",
                    borderRadius: 0,
                    border: "1px solid #E5E2DC",
                    backgroundColor: isHovered ? "#111111" : "#FAF9F7",
                    boxShadow: isHovered ? "0 18px 40px rgba(0,0,0,0.16)" : "none",
                    transition: "background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                    backgroundImage: isHovered
                      ? `radial-gradient(circle at ${hoverPos.x}px ${hoverPos.y}px, rgba(255,255,255,0.12), rgba(17,17,17,0))`
                      : "none",
                  }}
                >
                  {/* Left: large number as visual anchor */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      fontSize: 52,
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      color: isHovered ? "rgba(255,255,255,0.2)" : "#E0DCD5",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      userSelect: "none",
                      transition: "color 0.4s ease",
                    }}>{String(idx + 1).padStart(2, "0")}</span>
                  </div>

                  {/* Center: text block */}
                  <div style={{ minWidth: 0 }}>
                    {/* Year */}
                    <div style={{ marginBottom: 6 }}>
                      <span style={{
                        fontSize: T.small,
                        color: isHovered ? "rgba(255,255,255,0.6)" : "#B8B0A3",
                        transition: "color 0.4s ease",
                      }}>{timeStr}</span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: isHovered ? "#FAF9F7" : "#2A2A2A",
                      margin: "0 0 6px",
                      lineHeight: 1.3,
                      fontFamily: FONT_DISPLAY,
                    }}>{p.name}</h2>

                    {/* Summary */}
                    <p style={{
                      fontSize: T.body,
                      color: isHovered ? "rgba(255,255,255,0.75)" : "#888",
                      margin: 0,
                      lineHeight: 1.65,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>{p.cardSummary}</p>

                    {/* Highlights chips */}
                    {p.cardHighlights && p.cardHighlights.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                        {p.cardHighlights.map((h, hi) => (
                          <span key={hi} style={{
                            fontSize: 12,
                            color: isHovered ? "rgba(255,255,255,0.65)" : "#666",
                            backgroundColor: isHovered ? "transparent" : "#F2EFEA",
                            border: isHovered ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
                            borderRadius: 0,
                            padding: "3px 10px",
                            lineHeight: 1.5,
                            transition: "color 0.4s ease, background-color 0.4s ease, border-color 0.4s ease",
                          }}>{h}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: arrow */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                  }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: "999px",
                      border: isHovered ? "1px solid #FAF9F7" : "1px solid #D5D0C8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
                      backgroundColor: isHovered ? "#FAF9F7" : "transparent",
                      borderColor: isHovered ? "#FAF9F7" : "#D5D0C8",
                      transform: isHovered ? "translateX(2px)" : "translateX(0)",
                    }}>
                      <span style={{
                        fontSize: 18,
                        color: isHovered ? "#111111" : "#2A2A2A",
                        cursor: "pointer",
                        userSelect: "none",
                      }}>{"\u2192"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mobile: stacked but compact */
                <div onClick={() => onNavigate("project-" + p.id)} style={{ cursor: "pointer" }}>
                  {/* Number + time */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}>
                    <span style={{
                      fontSize: 28,
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      color: "#E0DCD5",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      userSelect: "none",
                    }}>{String(idx + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: T.small, color: "#B8B0A3" }}>{timeStr}</span>
                  </div>

                  {/* Title + summary */}
                  <h2 style={{
                    fontSize: T.heading,
                    fontWeight: 600,
                    color: "#2A2A2A",
                    margin: "0 0 6px",
                    lineHeight: 1.3,
                    fontFamily: FONT_DISPLAY,
                  }}>{p.name}</h2>
                  <p style={{
                    fontSize: 15,
                    color: "#888",
                    margin: 0,
                    lineHeight: 1.7,
                  }}>{p.cardSummary}</p>

                  {/* Highlights chips */}
                  {p.cardHighlights && p.cardHighlights.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                      {p.cardHighlights.map((h, hi) => (
                        <span key={hi} style={{
                          fontSize: 11,
                          color: "#666",
                          backgroundColor: "#F2EFEA",
                          borderRadius: 0,
                          padding: "3px 9px",
                          lineHeight: 1.5,
                        }}>{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              </div>
            </div>
          );
        })}
      </div>

      {/* === Footer / Contact section === */}
      <footer style={{
        maxWidth: maxW,
        margin: "0 auto",
        padding: isMobile ? "24px 16px 28px" : "28px 40px 32px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: isMobile ? 22 : 26,
          fontWeight: 400,
          color: "#2A2A2A",
          margin: 0,
        }}>
          {"Let's Talk"}
        </h2>
        <p style={{
          fontSize: T.body,
          color: "#777",
          marginTop: 12,
          marginBottom: 24,
          maxWidth: 520,
          lineHeight: 1.7,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          {"野路子走了近5年，下一步是把经验系统化。"}<br />{"2027年秋季，我准备回到学校。"}
        </p>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
        }}>
          <a
            href="mailto:zulpkar97@gmail.com"
            onMouseEnter={(e) => { setHoveredBtn("email"); setBtnPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
            onMouseMove={(e) => setBtnPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 18px",
              borderRadius: 0,
              border: hoveredBtn === "email" ? "1px solid #111" : "1px solid #2A2A2A",
              fontSize: T.small,
              color: hoveredBtn === "email" ? "#fff" : "#2A2A2A",
              cursor: "pointer",
              textDecoration: "none",
              backgroundColor: hoveredBtn === "email" ? "#111" : "transparent",
              backgroundImage: hoveredBtn === "email"
                ? `radial-gradient(circle at ${btnPos.x}px ${btnPos.y}px, rgba(255,255,255,0.12), rgba(17,17,17,0))`
                : "none",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {"zulpkar97@gmail.com"}
          </a>
          <span
            onMouseEnter={(e) => { setHoveredBtn("link"); setBtnPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
            onMouseMove={(e) => setBtnPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 18px",
              borderRadius: 0,
              border: hoveredBtn === "link" ? "1px solid #111" : "1px solid #2A2A2A",
              fontSize: T.small,
              color: hoveredBtn === "link" ? "#fff" : "#2A2A2A",
              cursor: "pointer",
              backgroundColor: hoveredBtn === "link" ? "#111" : "transparent",
              backgroundImage: hoveredBtn === "link"
                ? `radial-gradient(circle at ${btnPos.x}px ${btnPos.y}px, rgba(255,255,255,0.12), rgba(17,17,17,0))`
                : "none",
              transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {"【LinkedIn / 个人网站等】"}
          </span>
        </div>
        <p style={{ fontSize: T.small, color: "#CCC", marginTop: 28 }}>
          {"zulpkar.com"}
        </p>
      </footer>
    </div>
  );
}

/* ===== Detail Page Components ===== */

function BeforeAfterPair({ labelBefore, labelAfter, note, isMobile }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ fontSize: T.small, fontWeight: 600, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{"Before"}</div>
          <PlaceholderBox label={labelBefore} height={220} />
        </div>
        <div>
          <div style={{ fontSize: T.small, fontWeight: 600, color: "#333", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{"After"}</div>
          <PlaceholderBox label={labelAfter} height={220} />
        </div>
      </div>
      <p style={{ fontSize: T.small, color: "#aaa", marginTop: 8, textAlign: "center" }}>{note}</p>
    </div>
  );
}

function IterationStep({ version, heading }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          padding: "4px 12px", backgroundColor: "#333", color: "#fff",
          fontSize: T.small, fontWeight: 600, letterSpacing: 0.5,
        }}>{version}</div>
        <div style={{ width: 1, height: 24, backgroundColor: "#E5E2DC", marginTop: 4 }} />
      </div>
      <h3 style={{ fontSize: T.heading, fontWeight: 600, color: "#000", margin: 0, paddingTop: 2 }}>{heading}</h3>
    </div>
  );
}

function SideNav({ headings, onNavigate, prevProjectId }) {
  const isCompact = useIsMobile(1100);
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    let rafId = null;
    const compute = () => {
      const els = headings.map((_, i) => document.getElementById("section-" + i));
      const navH = 60;
      let found = -1;
      const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (atBottom && headings.length > 0) {
        found = headings.length - 1;
      } else {
        for (let i = els.length - 1; i >= 0; i--) {
          if (els[i] && els[i].getBoundingClientRect().top <= navH + 100) {
            found = i;
            break;
          }
        }
      }
      setActive(found);
      setVisible(found >= 0);
      rafId = null;
    };
    const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(compute, 100);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); if (rafId) cancelAnimationFrame(rafId); };
  }, [headings]);

  if (isCompact) return null;

  return (
    <>
      {/* Back button — 40x40 box, navigates to prev project */}
      <div
        onClick={() => onNavigate("home")}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#111"; e.currentTarget.style.borderColor = "#111"; e.currentTarget.querySelector("span").style.color = "#FAF9F7"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FAF9F7"; e.currentTarget.style.borderColor = "#E5E2DC"; e.currentTarget.querySelector("span").style.color = "#666"; }}
        style={{
          position: "fixed", top: 72,
          right: "max(16px, calc((100% - 720px) / 2 - 140px))",
          zIndex: 50, pointerEvents: "auto",
          width: 40, height: 40,
          border: "1px solid #E5E2DC", backgroundColor: "#FAF9F7",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "background-color 0.2s ease, border-color 0.2s ease",
        }}
      >
        <span style={{ fontSize: 14, color: "#666", transition: "color 0.2s ease" }}>{"\u2190"}</span>
      </div>

      {/* Section nav — slides in once body is scrolled into view */}
      {visible && (
        <div style={{
          position: "fixed", top: "50%", right: "max(16px, calc((100% - 720px) / 2 - 140px))",
          transform: "translateY(-50%)",
          zIndex: 50,
          transition: "opacity 0.3s ease",
          opacity: 1,
          display: "flex", alignItems: "stretch",
          pointerEvents: "none",
        }}>
          {/* Labels */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            {headings.map((h, i) => (
              <div
                key={i}
                onClick={() => {
                  const el = document.getElementById("section-" + i);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  fontSize: active === i ? T.body : T.small,
                  lineHeight: 1,
                  color: (hoveredIdx === i || active === i) ? (hoveredIdx === i ? "#FAF9F7" : "#000") : "#ccc",
                  backgroundColor: hoveredIdx === i ? "#111" : "transparent",
                  fontWeight: active === i ? 700 : 500,
                  padding: "10px 12px 10px 8px",
                  whiteSpace: "nowrap",
                  minWidth: 68,
                  textAlign: "center",
                  transform: active === i ? "translateX(-4px)" : "translateX(0)",
                  pointerEvents: "auto",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
              >
                {h}
              </div>
            ))}
          </div>
          {/* Vertical track */}
          <div style={{ width: 2, backgroundColor: "#E5E2DC", position: "relative", flexShrink: 0 }}>
            {active >= 0 && (
              <div style={{
                position: "absolute",
                top: `${(active / headings.length) * 100}%`,
                height: `${(1 / headings.length) * 100}%`,
                width: 2,
                backgroundColor: "#000",
                transition: "top 0.25s ease, height 0.25s ease",
              }} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function MobileProgressNav({ headings }) {
  const isCompact = useIsMobile(1100);
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showList, setShowList] = useState(false);
  const [labelFlash, setLabelFlash] = useState(false);
  const prevActive = useRef(-1);

  useEffect(() => {
    let rafId = null;
    const compute = () => {
      const els = headings.map((_, i) => document.getElementById("section-" + i));
      const navH = 60;
      let found = -1;
      const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (atBottom && headings.length > 0) {
        found = headings.length - 1;
      } else {
        for (let i = els.length - 1; i >= 0; i--) {
          if (els[i] && els[i].getBoundingClientRect().top <= navH + 100) {
            found = i;
            break;
          }
        }
      }
      setActive(found);
      setVisible(found >= 0);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(window.scrollY / docH, 1) : 0);
      rafId = null;
    };
    const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(compute, 100);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); if (rafId) cancelAnimationFrame(rafId); };
  }, [headings]);

  // Flash the label when section changes
  useEffect(() => {
    if (active !== prevActive.current && active >= 0) {
      setLabelFlash(true);
      const t = setTimeout(() => setLabelFlash(false), 1200);
      prevActive.current = active;
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!isCompact || !visible) return null;

  return (
    <>
      {/* Progress bar — pinned under nav */}
      <div style={{
        position: "fixed", top: MOBILE_NAV_H, left: 0, right: 0,
        zIndex: 99, height: 3, backgroundColor: "#EDEAE3",
      }}>
        <div style={{
          height: "100%", backgroundColor: "#2A2A2A",
          width: `${progress * 100}%`,
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* Section indicator — pinned under progress bar */}
      <div
        onClick={() => setShowList(!showList)}
        style={{
          position: "fixed", top: MOBILE_NAV_H + 3, left: 0, right: 0,
          zIndex: 98,
          backgroundColor: labelFlash ? "rgba(250,249,247,0.97)" : "rgba(250,249,247,0.92)",
          borderBottom: showList ? "1px solid #E5E2DC" : "none",
          padding: "8px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        <span style={{
          fontSize: T.small, fontWeight: 600, color: "#2A2A2A",
          transition: "opacity 0.3s",
        }}>
          {active >= 0 ? `${active + 1}/${headings.length}  \u00B7  ${headings[active]}` : ""}
        </span>
        <span style={{
          fontSize: 10, color: "#999",
          transform: showList ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
        }}>{"\u25BC"}</span>
      </div>

      {/* Section list dropdown */}
      {showList && (
        <div style={{
          position: "fixed", top: MOBILE_NAV_H + 3 + 30, left: 0, right: 0,
          zIndex: 97,
          backgroundColor: "rgba(250,249,247,0.97)",
          borderBottom: "1px solid #E5E2DC",
          padding: "4px 0",
          maxHeight: "50vh", overflowY: "auto",
        }}>
          {headings.map((h, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setShowList(false);
                const el = document.getElementById("section-" + i);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                padding: "10px 16px",
                fontSize: T.small,
                color: i === active ? "#2A2A2A" : "#999",
                fontWeight: i === active ? 600 : 400,
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer",
              }}
            >
              <span style={{
                width: 20, textAlign: "right",
                fontSize: 11, color: "#B8B0A3",
              }}>{i + 1}</span>
              {h}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const CONFETTI_PARTICLES = [
  { dx: -30, dy: -55, rot:  130, color: "#F5C842" },
  { dx:  30, dy: -55, rot: -130, color: "#E87040" },
  { dx: -55, dy: -18, rot:  210, color: "#5B8C7E" },
  { dx:  55, dy: -18, rot: -210, color: "#7A8BA8" },
  { dx: -18, dy: -68, rot:   90, color: "#2A2A2A" },
  { dx:  18, dy: -68, rot:  -90, color: "#E87040" },
  { dx: -42, dy: -42, rot:  165, color: "#F5C842" },
  { dx:  42, dy: -42, rot: -165, color: "#5B8C7E" },
];

function ReadingProgressBar() {
  const isCompact = useIsMobile(1100);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const confettiFired = useRef(false);

  useEffect(() => {
    let rafId = null;
    const compute = () => {
      // Mirror SideNav visibility: appear when section-0 scrolls past 160px from top
      const section0 = document.getElementById("section-0");
      const isVis = section0 ? section0.getBoundingClientRect().top <= 160 : false;
      setVisible(isVis);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0;
      setProgress(p);

      if (p >= 0.99 && !confettiFired.current) {
        confettiFired.current = true;
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 1300);
      }
      if (p < 0.90) confettiFired.current = false;

      rafId = null;
    };
    const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(compute, 100);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  if (isCompact || !visible) return null;

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "max(16px, calc((100% - 720px) / 2 - 140px))",
      transform: "translateY(-50%)",
      zIndex: 50,
      height: 200,
      width: 2,
      backgroundColor: "#E5E2DC",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
      pointerEvents: "none",
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 2,
        height: `${progress * 100}%`,
        backgroundColor: "#000",
      }} />
      {progress > 0 && (
        <div style={{
          position: "absolute",
          top: `${progress * 100}%`,
          left: 8,
          transform: "translateY(-50%)",
          fontSize: 10,
          color: "#888",
          lineHeight: 1,
          whiteSpace: "nowrap",
          fontFamily: FONT_BODY,
          fontVariantNumeric: "tabular-nums",
        }}>
          {Math.round(progress * 100)}%
        </div>
      )}
      {confettiActive && CONFETTI_PARTICLES.map((pt, i) => (
        <div key={i} style={{
          position: "absolute",
          top: "100%",
          left: -1,
          width: 5,
          height: 5,
          backgroundColor: pt.color,
          "--cdx": `${pt.dx}px`,
          "--cdy": `${pt.dy}px`,
          "--crot": `${pt.rot}deg`,
          animation: "confetti-fly 1.1s ease-out forwards",
          animationDelay: `${i * 0.04}s`,
        }} />
      ))}
    </div>
  );
}

/* ===== Illustration: Dual-Track Timeline (Project 1) ===== */

function DualTrackTimeline() {
  const ff = "'DM Sans', sans-serif";
  // Track colors
  const blue = "#2B5EA7";
  const blueLight = "#C6D8EF";
  const orange = "#D97B0D";
  const orangeLight = "#F5DFC0";
  const resultGray = "#666";
  return (
    <svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <marker id="dt-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={blue}/>
        </marker>
        <marker id="dt-orange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={orange}/>
        </marker>
        <marker id="dt-pivot" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="#555"/>
        </marker>
      </defs>

      {/* === Legend === */}
      <rect x="20" y="8" width="10" height="10" rx="2" fill={blue}/>
      <text x="34" y="17" fontFamily={ff} fontSize="9" fontWeight="600" fill="#666">Track A: Collaboration</text>
      <rect x="175" y="8" width="10" height="10" rx="2" fill={orange}/>
      <text x="189" y="17" fontFamily={ff} fontSize="9" fontWeight="600" fill="#666">Track B: Nana AI</text>
      <text x="316" y="17" fontFamily={ff} fontSize="9" fontWeight="600" fill="#666">{"\u2605 Core Decision"}</text>
      <text x="414" y="17" fontFamily={ff} fontSize="9" fontWeight="600" fill="#666">{"\u25C6 Key Result"}</text>

      {/* === Time axis === */}
      <text x="20" y="40" fontFamily={ff} fontSize="8.5" fontWeight="600" fill="#999">2023</text>
      <text x="200" y="40" fontFamily={ff} fontSize="8.5" fontWeight="500" fill="#bbb">Early 2024</text>
      <text x="668" y="40" fontFamily={ff} fontSize="8.5" fontWeight="600" fill="#999">{"\u2192 2025"}</text>
      <line x1="50" y1="37" x2="660" y2="37" stroke="#D5D0C8" strokeWidth="1"/>

      {/* === Phase labels === */}
      <text x="110" y="56" textAnchor="middle" fontFamily={ff} fontSize="8" fontWeight="700" letterSpacing="0.08em" fill="#bbb">PHASE 1</text>
      <text x="370" y="56" textAnchor="middle" fontFamily={ff} fontSize="8" fontWeight="700" letterSpacing="0.08em" fill="#bbb">PHASE 2</text>
      <text x="640" y="56" textAnchor="middle" fontFamily={ff} fontSize="8" fontWeight="700" letterSpacing="0.08em" fill="#bbb">PHASE 3</text>

      {/* Phase 1→2 divider (light dashed) */}
      <line x1="215" y1="48" x2="215" y2="390" stroke="#e8e8e8" strokeWidth="1" strokeDasharray="4,4"/>

      {/* === Track divider === */}
      <line x1="20" y1="230" x2="700" y2="230" stroke="#D5D0C8" strokeWidth="1"/>
      <text x="12" y="150" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.06em" fill={blue} transform="rotate(-90, 12, 150)" textAnchor="middle">TRACK A</text>
      <text x="12" y="320" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.06em" fill={orange} transform="rotate(-90, 12, 320)" textAnchor="middle">TRACK B</text>

      {/* ====== TRACK A ====== */}

      {/* Node 1 — Normal */}
      <rect x="30" y="70" width="160" height="44" rx="3" fill="#FAF9F7" stroke={blueLight} strokeWidth="1.5"/>
      <circle cx="46" cy="92" r="10" fill={blue}/>
      <text x="46" y="96" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">1</text>
      <text x="62" y="96" fontFamily={ff} fontSize="11" fontWeight="700" fill="#1a1a1a">Collaboration Breakdown</text>

      {/* Arrow 1→2 */}
      <line x1="110" y1="114" x2="110" y2="130" stroke={blue} strokeWidth="1.5" markerEnd="url(#dt-blue)"/>

      {/* Node 2 — CORE */}
      <rect x="30" y="138" width="160" height="56" rx="3" fill="#FAF9F7" stroke={blue} strokeWidth="2.5"/>
      <circle cx="46" cy="155" r="10" fill={blue}/>
      <text x="46" y="159" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">2</text>
      <rect x="60" y="148" width="40" height="14" rx="7" fill={blue}/>
      <text x="80" y="158" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" fill="#fff">{"\u2605 CORE"}</text>
      <text x="106" y="158" fontFamily={ff} fontSize="11" fontWeight="700" fill="#1a1a1a">Structural Diagnosis</text>
      <text x="46" y="180" fontFamily={ff} fontSize="9" fontWeight="500" fill="#666">{"System failure, not people"}</text>

      {/* Arrow 2→3 (cross-phase, dashed) */}
      <line x1="190" y1="166" x2="238" y2="92" stroke={blue} strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#dt-blue)"/>

      {/* Node 3 — Normal */}
      <rect x="244" y="70" width="160" height="44" rx="3" fill="#FAF9F7" stroke={blueLight} strokeWidth="1.5"/>
      <circle cx="260" cy="92" r="10" fill={blue}/>
      <text x="260" y="96" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">3</text>
      <text x="276" y="96" fontFamily={ff} fontSize="11" fontWeight="700" fill="#1a1a1a">Six-Module System</text>

      {/* Arrow 3→4 */}
      <line x1="404" y1="92" x2="430" y2="92" stroke={blue} strokeWidth="1.5" markerEnd="url(#dt-blue)"/>

      {/* Node 4 — RESULT */}
      <rect x="436" y="70" width="160" height="44" rx="3" fill="#FAF9F7" stroke={resultGray} strokeWidth="2" strokeDasharray="6,3"/>
      <circle cx="452" cy="92" r="10" fill={resultGray}/>
      <text x="452" y="96" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">4</text>
      <rect x="466" y="79" width="52" height="14" rx="7" fill={resultGray}/>
      <text x="492" y="89" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" fill="#fff">{"\u25C6 RESULT"}</text>
      <text x="468" y="106" fontFamily={ff} fontSize="9" fontWeight="500" fill="#666">Client Re-commits</text>

      {/* Arrow 4→5 */}
      <line x1="516" y1="114" x2="516" y2="140" stroke={blue} strokeWidth="1.5" markerEnd="url(#dt-blue)"/>

      {/* Node 5 — Normal */}
      <rect x="436" y="148" width="160" height="44" rx="3" fill="#FAF9F7" stroke={blueLight} strokeWidth="1.5"/>
      <circle cx="452" cy="170" r="10" fill={blue}/>
      <text x="452" y="174" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">5</text>
      <text x="468" y="174" fontFamily={ff} fontSize="11" fontWeight="700" fill="#1a1a1a">Company-wide SOP</text>

      {/* ====== PIVOT CONNECTOR 4→6 ====== */}
      <path d="M 516 114 L 516 230 L 360 230 L 360 260" fill="none" stroke="#555" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#dt-pivot)"/>
      <rect x="340" y="218" width="300" height="18" rx="9" fill="none" stroke="none"/>
      <text x="530" y="222" textAnchor="middle" fontFamily={ff} fontSize="8" fontWeight="600" fontStyle="italic" fill="#888">{"Stable delivery builds trust \u2192 enables AI proposal"}</text>

      {/* ====== TRACK B ====== */}

      {/* Node 6 — CORE */}
      <rect x="280" y="268" width="160" height="56" rx="3" fill="#FAF9F7" stroke={orange} strokeWidth="2.5"/>
      <circle cx="296" cy="285" r="10" fill={orange}/>
      <text x="296" y="289" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">6</text>
      <rect x="310" y="278" width="40" height="14" rx="7" fill={orange}/>
      <text x="330" y="288" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" fill="#fff">{"\u2605 CORE"}</text>
      <text x="356" y="288" fontFamily={ff} fontSize="10.5" fontWeight="700" fill="#1a1a1a">Identifies AI Opp.</text>
      <text x="296" y="310" fontFamily={ff} fontSize="9" fontWeight="500" fill="#666">{"DeepSeek \u2192 community scenario fit"}</text>

      {/* Arrow 6→7 */}
      <line x1="440" y1="296" x2="468" y2="296" stroke={orange} strokeWidth="1.5" markerEnd="url(#dt-orange)"/>

      {/* Node 7 — CORE */}
      <rect x="474" y="268" width="160" height="56" rx="3" fill="#FAF9F7" stroke={orange} strokeWidth="2.5"/>
      <circle cx="490" cy="285" r="10" fill={orange}/>
      <text x="490" y="289" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">7</text>
      <rect x="504" y="278" width="40" height="14" rx="7" fill={orange}/>
      <text x="524" y="288" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" fill="#fff">{"\u2605 CORE"}</text>
      <text x="550" y="288" fontFamily={ff} fontSize="10.5" fontWeight="700" fill="#1a1a1a">Validates Feasibility</text>
      <text x="490" y="310" fontFamily={ff} fontSize="9" fontWeight="500" fill="#666">{"Tech Director first, then budget"}</text>

      {/* Arrow 7→8 (cross-phase, dashed) */}
      <line x1="634" y1="296" x2="540" y2="360" stroke={orange} strokeWidth="1.5" strokeDasharray="6,4"/>
      <line x1="540" y1="348" x2="540" y2="360" stroke={orange} strokeWidth="1.5" markerEnd="url(#dt-orange)"/>

      {/* Node 8 — RESULT (black fill) */}
      <rect x="468" y="348" width="190" height="46" rx="3" fill="#111" stroke="#111" strokeWidth="1.5"/>
      <circle cx="484" cy="365" r="10" fill={resultGray}/>
      <text x="484" y="369" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">8</text>
      <rect x="498" y="356" width="52" height="14" rx="7" fill={resultGray}/>
      <text x="524" y="366" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" fill="#fff">{"\u25C6 RESULT"}</text>
      <text x="556" y="367" fontFamily={ff} fontSize="10.5" fontWeight="700" fill="#fff">Nana AI Launches</text>
      <text x="498" y="385" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">{"VP approved \u2192 2,000+ users"}</text>
    </svg>
  );
}

/* ===== Illustration: Six-Module Information Hub (Project 1) ===== */

function InfoHub() {
  const ff = "'DM Sans', sans-serif";
  return (
    <svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <marker id="ih-gov" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="#000"/>
        </marker>
        <marker id="ih-gov-rev" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
          <path d="M 8 0 L 0 3 L 8 6 Z" fill="#aaa"/>
        </marker>
      </defs>

      {/* === Legend + Core Rule (top row) === */}
      <line x1="20" y1="12" x2="40" y2="12" stroke="#000" strokeWidth="1.5"/>
      <text x="44" y="15" fontFamily={ff} fontSize="8.5" fontWeight="600" fill="#666">{"\u2192 Governance (demand in)"}</text>
      <line x1="195" y1="12" x2="215" y2="12" stroke="#aaa" strokeWidth="1.5"/>
      <text x="219" y="15" fontFamily={ff} fontSize="8.5" fontWeight="600" fill="#666">{"\u2190 Delivery (output back)"}</text>
      <text x="410" y="15" fontFamily={ff} fontSize="8.5" fontWeight="700" fill="#333">{"\u201CIf it\u2019s not in the formal tracker, it doesn\u2019t exist\u201D"}</text>

      {/* === Three zone backgrounds === */}
      {/* Client zone */}
      <rect x="0" y="30" width="60" height="290" fill="#EDF2F7"/>
      <text x="30" y="175" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#4A5568" transform="rotate(-90, 30, 175)">CLIENT</text>
      {/* Hub zone (white — default) */}
      {/* Execution zone */}
      <rect x="660" y="30" width="60" height="290" fill="#F5F5F5"/>
      <text x="690" y="175" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#666" transform="rotate(90, 690, 175)">EXECUTION</text>

      {/* === GOVERNANCE LAYER === */}
      <text x="360" y="46" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.08em" fill="#bbb">{"GOVERNANCE \u2014 DEMAND FLOWS IN \u2192"}</text>
      <line x1="80" y1="52" x2="640" y2="52" stroke="#e8e8e8" strokeWidth="1"/>

      {/* Entrance annotation */}
      <text x="82" y="72" fontFamily={ff} fontSize="8" fontWeight="500" fontStyle="italic" fill="#999">Only formal submissions enter</text>
      <text x="82" y="82" fontFamily={ff} fontSize="8" fontWeight="500" fontStyle="italic" fill="#999">{"— all other channels ignored"}</text>

      {/* Arrow Client → Requirement Lifecycle */}
      <line x1="60" y1="100" x2="88" y2="100" stroke="#000" strokeWidth="1.5" markerEnd="url(#ih-gov)"/>

      {/* Requirement Lifecycle — CORE, widest box */}
      <rect x="96" y="62" width="280" height="80" fill="#FAF9F7" stroke="#000" strokeWidth="2" rx="2"/>
      <rect x="96" y="62" width="280" height="20" fill="#111" rx="2"/>
      <text x="108" y="76" fontFamily={ff} fontSize="11" fontWeight="700" fill="#fff">Requirement Lifecycle</text>
      <rect x="296" y="65" width="44" height="14" rx="7" fill="#666"/>
      <text x="318" y="75" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" fill="#fff">CORE</text>
      <text x="108" y="102" fontFamily={ff} fontSize="9.5" fontWeight="600" letterSpacing="0.04em" fill="#555">GATEWAY & ENGINE</text>

      {/* Arrow Req → Role Map */}
      <line x1="376" y1="100" x2="408" y2="100" stroke="#000" strokeWidth="1.5" markerEnd="url(#ih-gov)"/>

      {/* Role Map */}
      <rect x="416" y="62" width="200" height="80" fill="#FAF9F7" stroke="#000" strokeWidth="1.5" rx="2"/>
      <rect x="416" y="62" width="200" height="20" fill="#111" rx="2"/>
      <text x="428" y="76" fontFamily={ff} fontSize="11" fontWeight="700" fill="#fff">Role Map</text>
      <text x="428" y="102" fontFamily={ff} fontSize="9.5" fontWeight="600" letterSpacing="0.04em" fill="#555">ROUTER</text>

      {/* Arrow Role Map → Execution */}
      <line x1="616" y1="100" x2="658" y2="100" stroke="#000" strokeWidth="1.5" markerEnd="url(#ih-gov)"/>

      {/* === DELIVERY LAYER === */}
      <text x="360" y="168" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.08em" fill="#bbb">{"\u2190 OUTPUT FLOWS BACK \u2014 DELIVERY"}</text>
      <line x1="80" y1="174" x2="640" y2="174" stroke="#e8e8e8" strokeWidth="1"/>

      {/* Arrow Execution → Release Mgmt */}
      <line x1="658" y1="220" x2="624" y2="220" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#ih-gov-rev)"/>

      {/* Release Management */}
      <rect x="416" y="184" width="200" height="72" fill="#FAF9F7" stroke="#aaa" strokeWidth="1.5" rx="2"/>
      <rect x="416" y="184" width="200" height="20" fill="#aaa" rx="2"/>
      <text x="428" y="198" fontFamily={ff} fontSize="11" fontWeight="700" fill="#fff">Release Management</text>
      <text x="428" y="224" fontFamily={ff} fontSize="9.5" fontWeight="600" letterSpacing="0.04em" fill="#888">PACKAGING</text>

      {/* Arrow Release → Acceptance */}
      <line x1="416" y1="220" x2="384" y2="220" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#ih-gov-rev)"/>

      {/* Acceptance Review */}
      <rect x="96" y="184" width="280" height="72" fill="#FAF9F7" stroke="#aaa" strokeWidth="1.5" rx="2"/>
      <rect x="96" y="184" width="280" height="20" fill="#aaa" rx="2"/>
      <text x="108" y="198" fontFamily={ff} fontSize="11" fontWeight="700" fill="#fff">Acceptance Review</text>
      <text x="108" y="224" fontFamily={ff} fontSize="9.5" fontWeight="600" letterSpacing="0.04em" fill="#888">QUALITY GATE</text>

      {/* Arrow Acceptance → Client */}
      <line x1="96" y1="220" x2="62" y2="220" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#ih-gov-rev)"/>

      {/* === Feedback loop: Acceptance Review → Requirement Lifecycle === */}
      <path d="M 236 256 L 236 278 L 82 278 L 82 130 L 94 130" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5" markerEnd="url(#ih-gov)"/>
      <text x="170" y="292" textAnchor="middle" fontFamily={ff} fontSize="8" fontWeight="600" fontStyle="italic" fill="#999">Issues feed back into requirement pool</text>

      {/* === BASE LAYER === */}
      <rect x="96" y="310" width="520" height="50" fill="#FAF9F7" stroke="#D5D0C8" strokeWidth="1" rx="2"/>
      <text x="236" y="335" textAnchor="middle" fontFamily={ff} fontSize="11" fontWeight="700" fill="#333">Change Log</text>
      <line x1="356" y1="318" x2="356" y2="352" stroke="#D5D0C8" strokeWidth="1"/>
      <text x="476" y="335" textAnchor="middle" fontFamily={ff} fontSize="11" fontWeight="700" fill="#333">Asset Repository</text>
      <text x="356" y="354" textAnchor="middle" fontFamily={ff} fontSize="8" fontWeight="500" fill="#aaa">{"Always on \u00B7 spans entire system"}</text>
    </svg>
  );
}

/* ===== Illustration: Linear Iteration Flow (Project 3) ===== */

function LinearIterationFlow() {
  const ff = "'DM Sans', sans-serif";
  return (
    <svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <marker id="lif-step" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M 0 0 L 7 2.5 L 0 5 Z" fill="#B8B0A3"/>
        </marker>
        <marker id="lif-axis" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="#B8B0A3"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="450" y="26" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="600" letterSpacing="0.1em" fill="#908D86">
        {"LINEAR ITERATION FLOW \u2014 FROM MVP TO BUSINESS-READY PRODUCT"}
      </text>

      {/* Step 1 */}
      <rect x="25" y="52" width="130" height="210" rx="4" fill="#EDEAE3"/>
      <text x="90" y="78" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.12em" fill="#9A9590">{"STEP 1"}</text>
      <text x="90" y="98" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"MVP: Text"}</text>
      <text x="90" y="113" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"Translation"}</text>
      <line x1="55" y1="123" x2="125" y2="123" stroke="#D6D1C8" strokeWidth="1.2"/>
      <text x="90" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="500" fill="#5a5a5a">
        <tspan x="90" y="143">{"CN\u21D4EN plain text"}</tspan>
        <tspan x="90" dy="15">{"\u2014"}</tspan>
        <tspan x="90" dy="15">{"\u201CCan it work?\u201D"}</tspan>
      </text>

      {/* Arrow 1→2 */}
      <line x1="160" y1="157" x2="178" y2="157" stroke="#B8B0A3" strokeWidth="2" markerEnd="url(#lif-step)"/>

      {/* Step 2 */}
      <rect x="185" y="52" width="130" height="210" rx="4" fill="#E3DFD6"/>
      <text x="250" y="78" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.12em" fill="#9A9590">{"STEP 2"}</text>
      <text x="250" y="98" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"API"}</text>
      <text x="250" y="113" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"Selection"}</text>
      <line x1="215" y1="123" x2="285" y2="123" stroke="#C8C0B4" strokeWidth="1.2"/>
      <text x="250" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="500" fill="#5a5a5a">
        <tspan x="250" y="143">{"3 trade-offs:"}</tspan>
        <tspan x="250" dy="15">{"volume fit / cost"}</tspan>
        <tspan x="250" dy="15">{"/ accuracy"}</tspan>
      </text>

      {/* Arrow 2→3 */}
      <line x1="320" y1="157" x2="338" y2="157" stroke="#B8B0A3" strokeWidth="2" markerEnd="url(#lif-step)"/>

      {/* Step 3 — Pivot */}
      <rect x="345" y="52" width="130" height="210" rx="4" fill="#D6D1C8"/>
      <rect x="373" y="44" width="64" height="18" rx="9" fill="#7A8BA8"/>
      <text x="405" y="56" textAnchor="middle" fontFamily={ff} fontSize="8.5" fontWeight="700" letterSpacing="0.06em" fill="#ffffff">{"PIVOT POINT"}</text>
      <text x="410" y="78" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.12em" fill="#8A857E">{"STEP 3"}</text>
      <text x="410" y="98" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"Text \u2192 File"}</text>
      <text x="410" y="113" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"Dept \u2192 Company"}</text>
      <line x1="375" y1="123" x2="445" y2="123" stroke="#B8B0A3" strokeWidth="1.2"/>
      <text x="410" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="500" fill="#5a5a5a">
        <tspan x="410" y="143">{"Product scope"}</tspan>
        <tspan x="410" dy="15">{"redefined: internal"}</tspan>
        <tspan x="410" dy="15">{"tool \u2192 company-"}</tspan>
        <tspan x="410" dy="15">{"wide system"}</tspan>
      </text>

      {/* Arrow 3→4 */}
      <line x1="480" y1="157" x2="498" y2="157" stroke="#B8B0A3" strokeWidth="2" markerEnd="url(#lif-step)"/>

      {/* Step 4 — Hardest */}
      <rect x="505" y="52" width="130" height="210" rx="4" fill="#B8B0A3" stroke="#2A2A2A" strokeWidth="2.5"/>
      <rect x="516" y="44" width="108" height="18" rx="9" fill="#2A2A2A"/>
      <text x="570" y="56" textAnchor="middle" fontFamily={ff} fontSize="8.5" fontWeight="700" letterSpacing="0.06em" fill="#ffffff">{"HARDEST CHALLENGE"}</text>
      <text x="570" y="78" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.12em" fill="#7A756E">{"STEP 4"}</text>
      <text x="570" y="98" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"Format"}</text>
      <text x="570" y="113" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#1a1a1a">{"Conversion"}</text>
      <line x1="535" y1="123" x2="605" y2="123" stroke="#9A9590" strokeWidth="1.2"/>
      <text x="570" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="500" fill="#3a3a3a">
        <tspan x="570" y="143">{"Accept limitation"}</tspan>
        <tspan x="570" dy="15">{"or break through?"}</tspan>
        <tspan x="570" dy="15">{"\u2192 Custom Coze"}</tspan>
        <tspan x="570" dy="15">{"plugin"}</tspan>
      </text>

      {/* Arrow 4→5 */}
      <line x1="640" y1="157" x2="658" y2="157" stroke="#B8B0A3" strokeWidth="2" markerEnd="url(#lif-step)"/>

      {/* Step 5 */}
      <rect x="665" y="52" width="130" height="210" rx="4" fill="#2A2A2A"/>
      <text x="730" y="78" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.12em" fill="#8A8A8A">{"STEP 5"}</text>
      <text x="730" y="98" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#ffffff">{"Feishu Integration"}</text>
      <text x="730" y="113" textAnchor="middle" fontFamily={ff} fontSize="12.5" fontWeight="700" fill="#ffffff">{"+ Frontend"}</text>
      <line x1="695" y1="123" x2="765" y2="123" stroke="#4a4a4a" strokeWidth="1.2"/>
      <text x="730" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="500" fill="#cccccc">
        <tspan x="730" y="143">{"Standard:"}</tspan>
        <tspan x="730" dy="15">{"\u201CReady to use,"}</tspan>
        <tspan x="730" dy="15">{"zero extra steps\u201D"}</tspan>
      </text>

      {/* Bottom axis */}
      <line x1="60" y1="310" x2="800" y2="310" stroke="#B8B0A3" strokeWidth="1.5" markerEnd="url(#lif-axis)"/>
      <text x="60" y="336" fontFamily={ff} fontSize="9.5" fontWeight="600" letterSpacing="0.08em" fill="#9A9590">{"TECHNICAL VALIDATION"}</text>
      <text x="800" y="336" textAnchor="end" fontFamily={ff} fontSize="9.5" fontWeight="600" letterSpacing="0.08em" fill="#2A2A2A">{"BUSINESS-READY PRODUCT"}</text>

      {/* Axis dots */}
      <circle cx="90" cy="310" r="3" fill="#EDEAE3" stroke="#B8B0A3" strokeWidth="1"/>
      <circle cx="250" cy="310" r="3" fill="#E3DFD6" stroke="#B8B0A3" strokeWidth="1"/>
      <circle cx="410" cy="310" r="3" fill="#D6D1C8" stroke="#B8B0A3" strokeWidth="1"/>
      <circle cx="570" cy="310" r="3" fill="#B8B0A3" stroke="#7A756E" strokeWidth="1"/>
      <circle cx="730" cy="310" r="3" fill="#2A2A2A" stroke="#2A2A2A" strokeWidth="1"/>

      {/* Vertical connectors */}
      <line x1="90" y1="262" x2="90" y2="307" stroke="#D6D1C8" strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="250" y1="262" x2="250" y2="307" stroke="#D6D1C8" strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="410" y1="262" x2="410" y2="307" stroke="#D6D1C8" strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="570" y1="262" x2="570" y2="307" stroke="#D6D1C8" strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="730" y1="262" x2="730" y2="307" stroke="#D6D1C8" strokeWidth="1" strokeDasharray="3,3"/>
    </svg>
  );
}

const ILLUSTRATION_MAP = {
  "双轨时间轴": DualTrackTimeline,
  "六模块信息枢纽": InfoHub,
  "诊断漏斗图": DiagnosticFunnel,
  "三期递进图": ThreePhaseRoadmap,
  "线性迭代流程图": LinearIterationFlow,
};

/* ===== Illustration: Diagnostic Funnel (Project 2) ===== */

function DiagnosticFunnel() {
  const ff = "'Inter', sans-serif";
  return (
    <svg viewBox="0 0 800 590" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Title */}
      <text x="430" y="28" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="600" letterSpacing="0.1em" fill="#999">
        {"DIAGNOSTIC FUNNEL \u2014 FROM \u201CFIX THE UI\u201D TO PRODUCT REPOSITIONING"}
      </text>
      {/* Layer 1: Surface Request */}
      <path d="M 170,60 L 690,60 L 670,142 L 190,142 Z" fill="#F2EFEA"/>
      <text x="430" y="94" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#999">SURFACE REQUEST</text>
      <text x="430" y="116" textAnchor="middle" fontFamily={ff} fontSize="13.5" fontWeight="600" fill="#000">{"\u201CFix the UI\u201D (\u00A5100K)"}</text>
      {/* Layer 2: First-Pass Walkthrough */}
      <path d="M 190,149 L 670,149 L 655,231 L 205,231 Z" fill="#EDEAE3"/>
      <text x="430" y="183" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#999">FIRST-PASS WALKTHROUGH</text>
      <text x="430" y="205" textAnchor="middle" fontFamily={ff} fontSize="13.5" fontWeight="600" fill="#000">{"Fragmented UX across homepage & editor"}</text>
      {/* Layer 3: Pattern Recognition */}
      <path d="M 205,238 L 655,238 L 644,320 L 216,320 Z" fill="#D5D0C8"/>
      <text x="430" y="268" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#888">PATTERN RECOGNITION</text>
      <text x="430" y="288" textAnchor="middle" fontFamily={ff} fontSize="13.5" fontWeight="600" fill="#000">
        <tspan x="430" dy="0">Content display vs. tool functionality</tspan>
        <tspan x="430" dy="17">competing on every page</tspan>
      </text>
      {/* Layer 4: Root Diagnosis */}
      <path d="M 216,327 L 644,327 L 636,409 L 224,409 Z" fill="#aaa"/>
      <text x="430" y="357" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#666">ROOT DIAGNOSIS</text>
      <text x="430" y="377" textAnchor="middle" fontFamily={ff} fontSize="13.5" fontWeight="600" fill="#000">
        <tspan x="430" dy="0">{"Product identity crisis: \u201Ccontent hub\u201D"}</tspan>
        <tspan x="430" dy="17">{"and \u201Clinup tool\u201D unresolved"}</tspan>
      </text>

      {/* === Key transition gap === */}
      <line x1="350" y1="428" x2="510" y2="428" stroke="#888" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="430" y="445" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#aaa">
        {"PROBLEM \u2192 SOLUTION"}
      </text>

      {/* Layer 5: Solution Anchor — shifted down */}
      <path d="M 224,458 L 636,458 L 630,540 L 230,540 Z" fill="#000"/>
      <text x="430" y="492" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#888">SOLUTION ANCHOR</text>
      <text x="430" y="514" textAnchor="middle" fontFamily={ff} fontSize="13.5" fontWeight="600" fill="#fff">Lineup Code as unifying mechanism</text>

      {/* === Left method indicators — horizontal labels, different line styles === */}

      {/* Walkthrough: solid line, covers layers 1-4 */}
      <line x1="132" y1="65" x2="132" y2="405" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="132" cy="65" r="3.5" fill="#000"/>
      <circle cx="132" cy="405" r="3.5" fill="#000"/>
      {/* Horizontal label at top */}
      <text x="40" y="60" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.08em" fill="#000" textAnchor="start">WALK-</text>
      <text x="40" y="71" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.08em" fill="#000" textAnchor="start">THROUGH</text>

      {/* Interviews: dashed line, covers layers 2-4 */}
      <line x1="100" y1="154" x2="100" y2="405" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,4"/>
      <circle cx="100" cy="154" r="3.5" fill="#888"/>
      <circle cx="100" cy="405" r="3.5" fill="#888"/>
      {/* Horizontal label at top */}
      <text x="40" y="149" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.08em" fill="#888" textAnchor="start">INTER-</text>
      <text x="40" y="160" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.08em" fill="#888" textAnchor="start">VIEWS</text>

      {/* Legend: line styles */}
      <line x1="40" y1="185" x2="60" y2="185" stroke="#000" strokeWidth="2"/>
      <text x="66" y="188" fontFamily={ff} fontSize="8" fill="#999">Solid = walkthrough</text>
      <line x1="40" y1="198" x2="60" y2="198" stroke="#888" strokeWidth="2" strokeDasharray="4,3"/>
      <text x="66" y="201" fontFamily={ff} fontSize="8" fill="#999">Dashed = interviews</text>
    </svg>
  );
}

/* ===== Illustration: Three-Phase Roadmap (Project 2) ===== */

function ThreePhaseRoadmap() {
  const ff = "'Inter', sans-serif";
  return (
    <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <marker id="rm-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="#aaa"/>
        </marker>
      </defs>
      {/* Title */}
      <text x="400" y="28" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="600" letterSpacing="0.1em" fill="#999">
        {"THREE-PHASE ROADMAP \u2014 FROM UI ORDER TO PRODUCT RECONSTRUCTION"}
      </text>
      {/* Phase 1 */}
      <rect x="60" y="60" width="210" height="200" fill="#F2EFEA"/>
      <text x="165" y="90" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#999">PHASE 1</text>
      <text x="165" y="114" textAnchor="middle" fontFamily={ff} fontSize="14" fontWeight="700" fill="#000">Vertical UX Fix</text>
      <line x1="120" y1="128" x2="210" y2="128" stroke="#D5D0C8" strokeWidth="1.5"/>
      <text x="165" y="152" textAnchor="middle" fontFamily={ff} fontSize="12" fontWeight="500" fill="#666">
        <tspan x="165" dy="0">Optimize upload flow</tspan>
        <tspan x="165" dy="18">and info architecture.</tspan>
        <tspan x="165" dy="18">Make the product</tspan>
        <tspan x="165" dy="18">usable first.</tspan>
      </text>
      {/* Arrow 1→2 */}
      <line x1="278" y1="160" x2="294" y2="160" stroke="#aaa" strokeWidth="2" markerEnd="url(#rm-arr)"/>
      {/* Phase 2 */}
      <rect x="300" y="60" width="210" height="200" fill="#EDEAE3"/>
      <text x="405" y="90" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#888">PHASE 2</text>
      <text x="405" y="114" textAnchor="middle" fontFamily={ff} fontSize="14" fontWeight="700" fill="#000">Horizontal Adapt</text>
      <line x1="360" y1="128" x2="450" y2="128" stroke="#aaa" strokeWidth="1.5"/>
      <text x="405" y="152" textAnchor="middle" fontFamily={ff} fontSize="12" fontWeight="500" fill="#666">
        <tspan x="405" dy="0">Game UI is landscape.</tspan>
        <tspan x="405" dy="18">Streamers use PC.</tspan>
        <tspan x="405" dy="18">Portrait H5 breaks</tspan>
        <tspan x="405" dy="18">core use scenarios.</tspan>
      </text>
      {/* Arrow 2→3 */}
      <line x1="518" y1="160" x2="534" y2="160" stroke="#aaa" strokeWidth="2" markerEnd="url(#rm-arr)"/>
      {/* Phase 3 */}
      <rect x="540" y="60" width="210" height="200" fill="#000"/>
      <text x="645" y="90" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#888">PHASE 3</text>
      <text x="645" y="114" textAnchor="middle" fontFamily={ff} fontSize="14" fontWeight="700" fill="#fff">Lineup Code</text>
      <line x1="600" y1="128" x2="690" y2="128" stroke="#444" strokeWidth="1.5"/>
      <text x="645" y="152" textAnchor="middle" fontFamily={ff} fontSize="12" fontWeight="500" fill="#999">
        <tspan x="645" dy="0">Embed game client.</tspan>
        <tspan x="645" dy="18">Lineup Code bridges</tspan>
        <tspan x="645" dy="18">{"\u201Cwatch guides\u201D and"}</tspan>
        <tspan x="645" dy="18">{"\u201Cuse lineups\u201D loop."}</tspan>
      </text>
      {/* Bottom result line */}
      <text x="60" y="308" fontFamily={ff} fontSize="10" fontWeight="600" letterSpacing="0.08em" fill="#999">STARTING ORDER</text>
      <text x="60" y="332" fontFamily={ff} fontSize="18" fontWeight="700" fill="#000">{"\u00A5100K"}</text>
      <text x="60" y="348" fontFamily={ff} fontSize="12" fontWeight="500" fill="#999">UI iteration</text>
      <line x1="155" y1="330" x2="640" y2="330" stroke="#aaa" strokeWidth="2" strokeDasharray="6,4"/>
      <text x="750" y="308" textAnchor="end" fontFamily={ff} fontSize="10" fontWeight="600" letterSpacing="0.08em" fill="#000">VP-APPROVED SCOPE</text>
      <text x="750" y="332" textAnchor="end" fontFamily={ff} fontSize="18" fontWeight="700" fill="#000">{"\u00A51.5M"}</text>
      <text x="750" y="348" textAnchor="end" fontFamily={ff} fontSize="12" fontWeight="500" fill="#999">Full product reconstruction</text>
      {/* 15x badge */}
      <rect x="370" y="314" width="60" height="24" rx="12" fill="#000"/>
      <text x="400" y="331" textAnchor="middle" fontFamily={ff} fontSize="11" fontWeight="700" fill="#fff">{"\u00D715"}</text>
    </svg>
  );
}

/* ===== Project Detail Page ===== */

function ProjectPage({ project, onNavigate, onToast, isMobile }) {
  const hasPrev = project.id > 1;
  const hasNext = project.id < PROJECTS.length;
  const prevProject = hasPrev ? PROJECTS.find((p) => p.id === project.id - 1) : null;
  const nextProject = hasNext ? PROJECTS.find((p) => p.id === project.id + 1) : null;
  const [lightboxContent, setLightboxContent] = useState(null);
  const [pageCursor, setPageCursor] = useState({ x: 0, y: 0, visible: false });
  const [hoveredNav, setHoveredNav] = useState(null);
  const [navPos, setNavPos] = useState({ x: 0, y: 0 });

  // Extract headings for side nav — memoized so SideNav/MobileProgressNav
  // don't re-attach scroll listeners on every parent render
  const { sectionHeadings, bodyWithIds } = useMemo(() => {
    const headings = [];
    let idx = 0;
    const body = project.bodyStructure.map((block, bodyIdx) => {
      if (block.type === "heading" || block.type === "iteration-step") {
        const fullLabel = block.type === "heading" ? block.text : block.heading;
        headings.push(block.navLabel || fullLabel);
        return { ...block, sectionId: idx++, bodyIndex: bodyIdx };
      }
      return { ...block, bodyIndex: bodyIdx };
    });
    return { sectionHeadings: headings, bodyWithIds: body };
  }, [project.bodyStructure]);

  // --- Skill tag jump state ---
  const [activeTagJump, setActiveTagJump] = useState(null);
  const highlightTimers = useRef([]);

  const handleTagClick = useCallback((tag) => {
    const jumpData = project.skillTagJumps && project.skillTagJumps[tag];
    if (!jumpData) return;
    highlightTimers.current.forEach((t) => clearTimeout(t));
    highlightTimers.current = [];
    setActiveTagJump({ tag, ...jumpData, sentencePhase: "mounting" });
    requestAnimationFrame(() => {
      const el = document.getElementById("body-block-" + jumpData.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      requestAnimationFrame(() => {
        setActiveTagJump((prev) => prev && { ...prev, sentencePhase: "in" });
      });
    });
    highlightTimers.current.push(
      setTimeout(() => { setActiveTagJump((prev) => prev && { ...prev, sentencePhase: "out" }); }, 3000)
    );
    highlightTimers.current.push(
      setTimeout(() => { setActiveTagJump((prev) => prev && { ...prev, sentencePhase: "done" }); }, 4000)
    );
  }, [project.skillTagJumps]);

  useEffect(() => {
    if (!activeTagJump) return;
    const handleScroll = () => {
      const el = document.getElementById("body-block-" + activeTagJump.scrollTo);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        highlightTimers.current.forEach((t) => clearTimeout(t));
        highlightTimers.current = [];
        setActiveTagJump(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTagJump]);

  return (
    <div
      style={{ position: "relative" }}
      onMouseMove={(e) => {
        if (isMobile) return;
        setPageCursor({ x: e.clientX, y: e.clientY, visible: true });
      }}
      onMouseLeave={() => setPageCursor((c) => ({ ...c, visible: false }))}
    >
      {pageCursor.visible && !isMobile && (
        <div style={{
          position: "fixed",
          left: pageCursor.x - 60,
          top: pageCursor.y - 60,
          width: 120,
          height: 120,
          borderRadius: "999px",
          background: "radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 60%)",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          zIndex: 0,
        }} />
      )}
      <ReadingProgressBar />
      <SideNav headings={sectionHeadings} onNavigate={onNavigate} prevProjectId={prevProject ? prevProject.id : null} />
      <MobileProgressNav headings={sectionHeadings} />
      {/* === Header — wider, two-column on desktop === */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "28px 16px 0" : "40px 0 0" }}>

        {/* Back link — shown on mobile only; desktop uses SideNav back link */}
        {isMobile && (
          <div
            onClick={() => onNavigate("home")}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#111"; e.currentTarget.style.borderColor = "#111"; e.currentTarget.querySelector("span").style.color = "#FAF9F7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FAF9F7"; e.currentTarget.style.borderColor = "#E5E2DC"; e.currentTarget.querySelector("span").style.color = "#666"; }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40,
              border: "1px solid #E5E2DC", backgroundColor: "#FAF9F7",
              cursor: "pointer", marginBottom: 28,
              transition: "background-color 0.2s ease, border-color 0.2s ease",
            }}
          >
            <span style={{ fontSize: 14, color: "#666", transition: "color 0.2s ease" }}>{"\u2190"}</span>
          </div>
        )}

        <header style={{ marginBottom: 0, paddingBottom: 0 }}>
          {/* Beat 1: Title + metadata + tags */}
          <h1 style={{ fontSize: isMobile ? 24 : 30, fontWeight: 700, margin: 0, color: "#000", lineHeight: 1.2, fontFamily: FONT_DISPLAY, textAlign: "center" }}>
            {project.name}
          </h1>
          <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 20 : 32, marginTop: 16 }}>
            {[
              ["Role", project.roleLine.split(" // ")[0]],
              ["Team", project.teamInfo || "\u3010\u56E2\u961F\u6784\u6210\u5F85\u5B9A\u3011"],
              ["Context", project.context || "\u3010\u5F85\u5B9A\u3011"],
            ].map(([label, val], fi) => (
              <div key={fi} style={{ textAlign: "center" }}>
                <p style={{ fontSize: T.small, color: "#aaa", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</p>
                <p style={{ fontSize: T.small, color: "#444", margin: 0, fontWeight: 500 }}>{val}</p>
              </div>
            ))}
          </div>
          {/* Tags */}
          {project.skillTags && project.skillTags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10, justifyContent: "center" }}>
              {project.skillTags.map((tag, ti) => {
                const hasJump = project.skillTagJumps && project.skillTagJumps[tag];
                const isActive = activeTagJump && activeTagJump.tag === tag;
                return (
                  <span
                    key={ti}
                    onClick={hasJump ? () => handleTagClick(tag) : undefined}
                    style={{
                      fontSize: 11,
                      color: isActive ? "#111" : "#999",
                      backgroundColor: isActive ? "#E5E2DC" : "#F2EFEA",
                      borderRadius: 0,
                      padding: "3px 9px",
                      lineHeight: 1.5,
                      cursor: hasJump ? "pointer" : "default",
                      transition: "background-color 0.2s ease, color 0.2s ease",
                    }}
                  >{tag}</span>
                );
              })}
            </div>
          )}
          {/* Beat 2: Story hook — visually separated from orientation block */}
          <p style={{ fontSize: isMobile ? 16 : 17, color: "#555", marginTop: 32, marginBottom: 0, lineHeight: 1.75, textAlign: "center", fontWeight: 400, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>{project.summary}</p>
        </header>
      </div>

      {/* === Metrics Bar === */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "16px 16px 0" : "16px 0 0" }}>
        <div style={{
          paddingBottom: 24, marginBottom: 32,
        }}>
          {project.metricsMode === "state-change" ? (
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 20 : 0,
              alignItems: "center",
            }}>
              <div style={{
                flex: 1, textAlign: "center",
                borderRight: isMobile ? "none" : "1px solid #E5E2DC",
                padding: isMobile ? "0" : "0 24px",
              }}>
                <p style={{ fontSize: T.small, color: "#999", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>{"Before"}</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#aaa", margin: 0, lineHeight: 1.5, textDecoration: "line-through" }}>{project.stateBefore}</p>
              </div>
              {/* Arrow indicator */}
              <div style={{ padding: "0 16px", fontSize: 20, color: "#B8B0A3", flexShrink: 0 }}>{"\u2192"}</div>
              <div style={{
                flex: 1, textAlign: "center",
                padding: isMobile ? "0" : "0 24px",
              }}>
                <p style={{ fontSize: T.small, color: "#999", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>{"After"}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0, lineHeight: 1.5 }}>{project.stateAfter}</p>
              </div>
            </div>
          ) : (
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 20 : 0,
            }}>
              {project.metrics.map((m, i) => (
                <div key={i} style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: (!isMobile && i < project.metrics.length - 1) ? "1px solid #E5E2DC" : "none",
                  padding: isMobile ? "0" : "0 24px",
                }}>
                  <p style={{ fontSize: T.display, fontWeight: 700, color: "#000", margin: 0, lineHeight: 1.2 }}>{m.number}</p>
                  <p style={{ fontSize: T.small, color: "#888", marginTop: 4 }}>{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* === Body — narrower for reading === */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "0 16px 56px" : "0 0 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {bodyWithIds.map((block, i) => {
          const isInBorderRange = activeTagJump && block.bodyIndex >= activeTagJump.borderRange[0] && block.bodyIndex <= activeTagJump.borderRange[1];
          const borderShadow = isInBorderRange ? "inset 3px 0 0 #111" : undefined;
          const blockId = "body-block-" + block.bodyIndex;

          if (block.type === "heading") {
            const isReflection = block.navLabel === "\u56DE\u5934\u770B";
            if (isReflection) {
              return (
                <div key={i} id={blockId} style={{ scrollMarginTop: 80, marginTop: 36, paddingTop: 40, borderTop: "1px solid #E5E2DC", boxShadow: borderShadow, transition: "box-shadow 0.3s ease" }}>
                  <h2 id={"section-" + block.sectionId} style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0, fontFamily: FONT_DISPLAY, scrollMarginTop: 80 }}>{block.text}</h2>
                </div>
              );
            }
            return (
              <div key={i} id={blockId} style={{ margin: "28px 0 0", scrollMarginTop: 80, boxShadow: borderShadow, transition: "box-shadow 0.3s ease" }}>
                <h2 id={"section-" + block.sectionId} style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0, fontFamily: FONT_DISPLAY, scrollMarginTop: 80 }}>{block.text}</h2>
              </div>
            );
          }

          if (block.type === "paragraph") {
            if (block.text) {
              const isKeyBlock = activeTagJump && block.bodyIndex === activeTagJump.keyBlock && activeTagJump.sentencePhase !== "done";
              let paragraphContent = block.text;
              if (isKeyBlock && activeTagJump.keySentence && block.text.includes(activeTagJump.keySentence)) {
                const parts = block.text.split(activeTagJump.keySentence);
                const phase = activeTagJump.sentencePhase;
                const hlOpacity = phase === "mounting" ? 0 : phase === "in" ? 1 : phase === "out" ? 0 : 0;
                paragraphContent = (
                  <>{parts[0]}<span style={{
                    backgroundColor: "rgba(229, 226, 220, 0.7)",
                    opacity: hlOpacity,
                    transition: "opacity 1s ease",
                    borderRadius: 2,
                    padding: "1px 0",
                  }}>{activeTagJump.keySentence}</span>{parts.slice(1).join(activeTagJump.keySentence)}</>
                );
              }
              return <p key={i} id={blockId} style={{ fontSize: T.body, color: "#333", lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap", boxShadow: borderShadow, transition: "box-shadow 0.3s ease", scrollMarginTop: 80 }}>{paragraphContent}</p>;
            }
            return <TextPlaceholder key={i} lines={5} />;
          }

          if (block.type === "quote-list") {
            return (
              <div key={i} id={blockId} style={{ display: "flex", flexDirection: "column", gap: 10, boxShadow: borderShadow, transition: "box-shadow 0.3s ease", scrollMarginTop: 80 }}>
                {block.items.map((q, qi) => (
                  <div key={qi} style={{
                    display: "flex", gap: isMobile ? 10 : 16, alignItems: "flex-start",
                    borderLeft: "2px solid #5B8C7E", paddingLeft: 16,
                    flexDirection: isMobile ? "column" : "row",
                  }}>
                    <span style={{ fontSize: T.small, fontWeight: 600, color: "#888", minWidth: isMobile ? "auto" : 80, flexShrink: 0 }}>
                      {q.role}
                    </span>
                    <span style={{ fontSize: T.body, color: "#444", lineHeight: 1.65 }}>
                      {"\u201C"}{q.text}{"\u201D"}
                    </span>
                  </div>
                ))}
              </div>
            );
          }

          if (block.type === "module-list") {
            return (
              <div key={i} id={blockId} style={{ display: "flex", flexDirection: "column", boxShadow: borderShadow, transition: "box-shadow 0.3s ease", scrollMarginTop: 80 }}>
                {block.items.map((m, mi) => (
                  <div key={mi} style={{
                    display: "flex", gap: isMobile ? 8 : 20, alignItems: "flex-start",
                    padding: "14px 0",
                    borderBottom: mi < block.items.length - 1 ? "1px solid #F0EDE8" : "none",
                    flexDirection: isMobile ? "column" : "row",
                  }}>
                    <span style={{ fontSize: T.small, fontWeight: 600, color: "#111", minWidth: isMobile ? "auto" : 140, flexShrink: 0, paddingTop: 2 }}>
                      {m.name}
                    </span>
                    <span style={{ fontSize: T.body, color: "#555", lineHeight: 1.7 }}>
                      {m.desc}
                    </span>
                  </div>
                ))}
              </div>
            );
          }

          if (block.type === "pull-quote") {
            return (
              <blockquote key={i} id={blockId} style={{
                margin: "8px 0",
                padding: "20px 0 20px 24px",
                borderLeft: "4px solid #2A2A2A",
                scrollMarginTop: 80,
                fontSize: 20,
                fontWeight: 600,
                color: "#000",
                lineHeight: 1.4,
                fontFamily: FONT_DISPLAY,
              }}>
                {block.text}
              </blockquote>
            );
          }

          if (block.type === "screenshot-group") {
            return (
              <div key={i} id={blockId} style={{ margin: "32px 0", boxShadow: borderShadow, transition: "box-shadow 0.3s ease", scrollMarginTop: 80 }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 16,
                }}>
                  {block.items.map((item, ii) => (
                    <ScreenshotItem
                      key={ii}
                      item={item}
                      onLightbox={() => setLightboxContent(
                        <img src={item.src} alt={item.label} style={{ maxWidth: "100%", maxHeight: "90vh", display: "block" }} />
                      )}
                    />
                  ))}
                </div>
              </div>
            );
          }

          if (block.type === "illustration") {
            const ill = project.illustrations[block.index];
            const IllComponent = ILLUSTRATION_MAP[ill.name];
            if (IllComponent) {
              // Break out of 720px body — asymmetric to keep clear of SideNav on right
              const breakoutL = isMobile ? 0 : 80;
              const breakoutR = isMobile ? 0 : 20;
              return (
                <div
                  key={i}
                  id={blockId}
                  style={{
                    margin: `12px -${breakoutR}px 12px -${breakoutL}px`,
                    position: "relative",
                    boxShadow: borderShadow,
                    transition: "box-shadow 0.3s ease",
                    scrollMarginTop: 80,
                  }}
                >
                  {/* On mobile: horizontally scrollable so SVG text remains legible */}
                  <div style={{
                    overflowX: isMobile ? "auto" : "visible",
                    WebkitOverflowScrolling: "touch",
                  }}>
                    {isMobile && (
                      <p style={{ fontSize: 10, color: "#aaa", margin: "0 0 6px 0", textAlign: "center" }}>
                        {"← 左右滑动查看 / scroll to explore →"}
                      </p>
                    )}
                    <div style={{ minWidth: isMobile ? 600 : "auto" }}>
                      <div
                        onClick={() => setLightboxContent(<IllComponent />)}
                        style={{ cursor: "pointer" }}
                      >
                        <IllComponent />
                      </div>
                    </div>
                  </div>
                  {/* Subtle caption line with expand hint */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 4px 0",
                  }}>
                    <span style={{ fontSize: T.small, color: "#aaa" }}>
                      {ill.name}<span style={{ color: "#ccc", margin: "0 6px" }}>{"\u00B7"}</span>{ill.type}
                    </span>
                    <span
                      onClick={() => setLightboxContent(<IllComponent />)}
                      style={{
                        fontSize: T.small, color: "#666", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "4px 10px",
                        backgroundColor: "#F2EFEA",
                        transition: "background-color 0.2s ease, color 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#111"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F2EFEA"; e.currentTarget.style.color = "#666"; }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                      {"Expand"}
                    </span>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} id={blockId} style={{ scrollMarginTop: 80, boxShadow: borderShadow, transition: "box-shadow 0.3s ease" }}>
                <PlaceholderBox label={ill.name} sublabel={ill.type + " \u00B7 " + ill.note} height={240} dark />
              </div>
            );
          }

          if (block.type === "screenshot-inline") {
            if (block.src) {
              return (
                <div key={i} id={blockId} style={{ margin: "32px 0", boxShadow: borderShadow, transition: "box-shadow 0.3s ease", scrollMarginTop: 80 }}>
                  <img
                    src={block.src}
                    alt={block.label}
                    onClick={() => setLightboxContent(
                      <img src={block.src} alt={block.label} style={{ maxWidth: "100%", maxHeight: "90vh", display: "block" }} />
                    )}
                    style={{
                      width: "100%",
                      borderRadius: 0,
                      display: "block",
                      cursor: "pointer",
                    }}
                  />
                  {block.note && (
                    <p style={{ fontSize: T.small, color: "#999", marginTop: 8, textAlign: "center" }}>{block.note}</p>
                  )}
                </div>
              );
            }
            return (
              <div key={i} id={blockId} style={{ scrollMarginTop: 80, boxShadow: borderShadow, transition: "box-shadow 0.3s ease" }}>
                <PlaceholderBox label={block.label} sublabel={block.note} height={200} />
              </div>
            );
          }

          if (block.type === "screenshot-pair") {
            return <div key={i} id={blockId} style={{ scrollMarginTop: 80, boxShadow: borderShadow, transition: "box-shadow 0.3s ease" }}><BeforeAfterPair labelBefore={block.labelBefore} labelAfter={block.labelAfter} note={block.note} isMobile={isMobile} /></div>;
          }

          if (block.type === "iteration-step") {
            return <div key={i} id={blockId} style={{ scrollMarginTop: 80, boxShadow: borderShadow, transition: "box-shadow 0.3s ease" }}><div id={"section-" + block.sectionId} style={{ scrollMarginTop: 80 }}><IterationStep version={block.version} heading={block.heading} /></div></div>;
          }

          return null;
        })}
      </div>

      {/* === Supporting Screenshots === */}
      {project.supportingScreenshots.length > 0 && (() => {
        const visibleScreenshots = project.supportingScreenshots.filter(s => s.src);
        if (visibleScreenshots.length === 0) return null;
        const featured = visibleScreenshots.filter(s => s.featured);
        const rest = visibleScreenshots.filter(s => !s.featured);
        const renderCard = (s, i) => (
          <div key={i} style={{
            background: "#FAF9F7",
            borderRadius: 0,
            border: "1px solid #EDEAE3",
            overflow: "hidden",
            cursor: s.src ? "pointer" : "default",
          }}
            onClick={s.src ? () => setLightboxContent(
              <img src={s.src} alt={s.label} style={{ maxWidth: "100%", maxHeight: "90vh", display: "block" }} />
            ) : undefined}
          >
            {s.src ? (
              <img src={s.src} alt={s.label} style={{ width: "100%", display: "block" }} />
            ) : (
              <PlaceholderBox label={s.label} height={220} />
            )}
            <div style={{ padding: "14px 16px 16px" }}>
              <p style={{ fontSize: T.small, fontWeight: 600, color: "#333", margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: T.small, color: "#999", margin: "4px 0 0" }}>{s.proves}</p>
            </div>
          </div>
        );
        return (
          <section style={{ marginTop: 72, paddingTop: 36, borderTop: "1px solid #E5E2DC" }}>
            <h3 style={{ fontSize: T.small, fontWeight: 600, color: "#000", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {"System in Action"}
            </h3>
            <p style={{ fontSize: T.small, color: "#999", marginBottom: 24 }}>
              {"Evidence of live deployment"}
            </p>
            {featured.map((s, i) => (
              <div key={"f" + i} style={{ marginBottom: 20 }}>
                {renderCard(s, i)}
              </div>
            ))}
            {rest.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 20,
              }}>
                {rest.map((s, i) => renderCard(s, i))}
              </div>
            )}
          </section>
        );
      })()}


      {/* === Prev / Next Nav === */}
      <nav style={{
        display: "flex",
        marginTop: 72, paddingTop: 28, borderTop: "1px solid #E5E2DC",
        flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 16,
      }}>
        <div
          onClick={hasPrev ? () => onNavigate("project-" + prevProject.id) : () => onToast("This is the first project", "bottom")}
          onMouseEnter={(e) => { if (hasPrev) { setHoveredNav("prev"); setNavPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); } }}
          onMouseMove={(e) => { if (hoveredNav === "prev") setNavPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            flex: 1,
            border: hasPrev ? "1px solid #E5E2DC" : "1px dashed #E5E2DC",
            padding: "14px 20px",
            cursor: hasPrev ? "pointer" : "default",
            opacity: hasPrev ? 1 : 0.7,
            backgroundColor: hoveredNav === "prev" ? "#111" : "transparent",
            backgroundImage: hoveredNav === "prev" ? `radial-gradient(circle at ${navPos.x}px ${navPos.y}px, rgba(255,255,255,0.12), rgba(17,17,17,0))` : "none",
            transition: "background-color 0.2s ease",
          }}
        >
          <span style={{ fontSize: T.small, color: hoveredNav === "prev" ? "rgba(255,255,255,0.5)" : (hasPrev ? "#999" : "#ccc"), display: "block", transition: "color 0.2s ease" }}>{"\u2190 Previous"}</span>
          <span style={{ fontSize: T.body, fontWeight: 500, color: hoveredNav === "prev" ? "#fff" : (hasPrev ? "#000" : "#ccc"), transition: "color 0.2s ease" }}>{hasPrev ? prevProject.name : "First project"}</span>
        </div>
        <div
          onClick={hasNext ? () => onNavigate("project-" + nextProject.id) : () => onToast("This is the last project", "bottom")}
          onMouseEnter={(e) => { if (hasNext) { setHoveredNav("next"); setNavPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); } }}
          onMouseMove={(e) => { if (hoveredNav === "next") setNavPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            flex: 1,
            border: hasNext ? "1px solid #E5E2DC" : "1px dashed #E5E2DC",
            padding: "14px 20px",
            textAlign: isMobile ? "left" : "right",
            cursor: hasNext ? "pointer" : "default",
            opacity: hasNext ? 1 : 0.7,
            backgroundColor: hoveredNav === "next" ? "#111" : "transparent",
            backgroundImage: hoveredNav === "next" ? `radial-gradient(circle at ${navPos.x}px ${navPos.y}px, rgba(255,255,255,0.12), rgba(17,17,17,0))` : "none",
            transition: "background-color 0.2s ease",
          }}
        >
          <span style={{ fontSize: T.small, color: hoveredNav === "next" ? "rgba(255,255,255,0.5)" : (hasNext ? "#999" : "#ccc"), display: "block", transition: "color 0.2s ease" }}>{"Next \u2192"}</span>
          <span style={{ fontSize: T.body, fontWeight: 500, color: hoveredNav === "next" ? "#fff" : (hasNext ? "#000" : "#ccc"), transition: "color 0.2s ease" }}>{hasNext ? nextProject.name : "Last project"}</span>
        </div>
      </nav>
      </div>
      {lightboxContent && (
        <Lightbox onClose={() => setLightboxContent(null)}>
          {lightboxContent}
        </Lightbox>
      )}
    </div>
  );
}

/* ===== App ===== */

function Lightbox({ children, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  const containerRef = useRef(null);
  const scaleRef = useRef(1);
  const touchPinch = useRef(null);

  useEffect(() => { scaleRef.current = scale; }, [scale]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  // Pinch-to-zoom for mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        touchPinch.current = {
          dist: Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          ),
          startScale: scaleRef.current,
        };
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 2 && touchPinch.current) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const ratio = dist / touchPinch.current.dist;
        setScale(Math.min(Math.max(touchPinch.current.startScale * ratio, 0.5), 4));
      }
    };
    const onTouchEnd = () => { touchPinch.current = null; };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const onWheel = (e) => {
    e.preventDefault();
    setScale((s) => {
      const next = s + (e.deltaY < 0 ? 0.15 : -0.15);
      return Math.min(Math.max(next, 0.5), 4);
    });
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    hasDragged.current = false;
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const nx = e.clientX - dragStart.current.x;
    const ny = e.clientY - dragStart.current.y;
    if (Math.abs(nx - posRef.current.x) > 10 || Math.abs(ny - posRef.current.y) > 10) {
      hasDragged.current = true;
    }
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  };

  const onPointerUp = () => {
    dragging.current = false;
    if (!hasDragged.current) onClose();
  };

  return (
    <div
      ref={containerRef}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        backgroundColor: "rgba(20,18,15,0.85)",
        cursor: dragging.current ? "grabbing" : "grab",
        touchAction: "none", userSelect: "none",
      }}
    >
      {/* Close button — top right */}
      <div
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "fixed", top: 20, right: 20, zIndex: 501,
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          color: "rgba(255,255,255,0.6)",
          fontSize: 24,
          fontWeight: 300,
          transition: "color 0.2s ease",
          pointerEvents: "auto",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
      >
        {"\u00D7"}
      </div>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`,
        transformOrigin: "center center",
        width: "min(94vw, 1100px)",
        transition: dragging.current ? "none" : "transform 0.15s ease-out",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ backgroundColor: "#FAF9F7", padding: 24, width: "100%" }}>
          {children}
        </div>
        {/* Hint bar right below the card */}
        <div style={{
          marginTop: 12,
          display: "flex", gap: 6, alignItems: "center",
          pointerEvents: "none",
        }}>
          {/* Operations group — subdued */}
          <div style={{
            display: "flex", gap: 16, alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.45)", padding: "6px 16px",
            borderRadius: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="2" width="10" height="20" rx="5" />
                <line x1="12" y1="6" x2="12" y2="10" />
              </svg>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>Zoom</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-4 0v5" />
                <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                <path d="M10 10.5V6a2 2 0 0 0-4 0v9" />
                <path d="M18 11a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8H12a8 8 0 0 1-6-2.7" />
              </svg>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>Drag</span>
            </div>
          </div>
          {/* Exit group — prominent */}
          <div style={{
            display: "flex", gap: 8, alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.95)", padding: "6px 18px",
            borderRadius: 0,
          }}>
            {/* Click / cursor icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#000" stroke="none">
              <path d="M4 2l16 10-8 2-4 8L4 2z" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#000" }}>
              {"Click \u00B7 ESC \u00B7 \u00D7"}
            </span>
            <span style={{ fontSize: 10, color: "#888" }}>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 80,
        right: "max(16px, calc((100% - 720px) / 2 - 140px))",
        zIndex: 200, width: 40, height: 40,
        border: hovered ? "1px solid #111" : "1px solid #E5E2DC",
        backgroundColor: hovered ? "#111" : "#FAF9F7",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <span style={{ fontSize: 14, color: hovered ? "#FAF9F7" : "#666", transition: "color 0.2s ease", display: "inline-block", transform: "rotate(90deg)" }}>{"\u2190"}</span>
    </div>
  );
}

function Toast({ message, position, onDone }) {
  const [phase, setPhase] = useState("in");
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);
  useEffect(() => {
    const fadeInDone = setTimeout(() => setPhase("visible"), 20);
    const startOut = setTimeout(() => setPhase("out"), 1600);
    const done = setTimeout(() => onDoneRef.current(), 2000);
    return () => { clearTimeout(fadeInDone); clearTimeout(startOut); clearTimeout(done); };
  }, []);
  const posStyle = position === "bottom"
    ? { bottom: 80 }
    : { top: 64 };
  return (
    <div style={{
      position: "fixed", left: "50%", transform: "translateX(-50%)",
      ...posStyle,
      zIndex: 300, backgroundColor: "#333", color: "#fff",
      fontSize: T.small, padding: "10px 24px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      opacity: phase === "in" ? 0 : phase === "out" ? 0 : 1,
      transition: "opacity 0.3s ease",
    }}>{message}</div>
  );
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === "home") return "home";
  if (hash.startsWith("project-")) {
    const id = parseInt(hash.split("-")[1]);
    if (PROJECTS.find((p) => p.id === id)) return hash;
  }
  return "home";
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash);
  const [toast, setToast] = useState(null);
  const [fade, setFade] = useState(1);
  const pendingNav = useRef(null);
  const pageRef = useRef(page);
  const isMobile = useIsMobile();

  useEffect(() => { pageRef.current = page; }, [page]);

  // Sync URL hash on navigation
  const navigate = (t) => {
    if (t === page) return;
    history.pushState(null, "", "#" + t);
    pendingNav.current = t;
    setFade(0);
  };

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => {
      const t = getPageFromHash();
      if (t !== pageRef.current) {
        pendingNav.current = t;
        setFade(0);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (fade === 0 && pendingNav.current) {
      const timer = setTimeout(() => {
        setPage(pendingNav.current);
        pendingNav.current = null;
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => setFade(1), 30);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [fade]);

  const showToast = (msg, position) => { setToast({ msg, position: position || "top" }); };
  const cp = page.startsWith("project-") ? PROJECTS.find((p) => p.id === parseInt(page.split("-")[1])) : null;

  return (
    <div style={{
      fontFamily: FONT_BODY,
      color: "#000",
      minHeight: "100vh",
      backgroundColor: "#FAF9F7",
      display: "flex",
      flexDirection: "column",
    }}>
      <Nav currentPage={page} onNavigate={navigate} isMobile={isMobile} />
      <div style={{ opacity: fade, transition: "opacity 0.25s ease", flex: 1 }}>
        {page === "home" && <HomePage onNavigate={navigate} isMobile={isMobile} />}
        {cp && <ProjectPage project={cp} onNavigate={navigate} onToast={showToast} isMobile={isMobile} />}
      </div>
      <BackToTop />
      {toast && <Toast message={toast.msg} position={toast.position} onDone={() => setToast(null)} />}
    </div>
  );
}
