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
    name: "项目1名称待定",
    navName: "项目1",
    roleLine: "【角色待定】 // 2023–2024",
    summary: "【一句话概述待定稿】",
    cardSummary: "【卡片摘要待定稿】",
    cardTag: "【关键标签待定】",
    layoutMode: "linear",
    metricsMode: "state-change",
    stateBefore: "【介入前状态待定】",
    stateAfter: "【交付后状态待定】",
    teamInfo: "核心团队约15人 · 跨团队协调近百人",
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
      { type: "paragraph", text: "我拿到了几乎一致的诊断线索：\n\n前端开发说：\u201C需求总是不明确，我不知道做到什么程度算完成。\u201D后端开发说：\u201C我不知道前端在做什么，经常重复开发。\u201D设计师说：\u201C我的稿子改了，但不知道开发有没有看到新版本。\u201D客户方说：\u201C我提的需求，不知道有没有进入开发流程。\u201D技术部领导说：\u201C我看不到整体进度，不知道哪里卡住了。\u201D" },
      { type: "paragraph", text: "每个人描述的症状不一样，但根源指向同一件事：信息在人和人之间流转不了。不是谁不愿意干活，是现有的群聊式协作方式，在一两周短项目里勉强能用，但放到两年长线项目里完全崩溃了。不是人的问题，是系统的问题。" },
      { type: "illustration", index: 0 },

      // === 设计 ===
      { type: "heading", text: "设计：用现有条件从零搭一套协作系统", navLabel: "设计" },
      { type: "paragraph", text: "确认了问题根源之后，我给自己设了三条硬约束：零成本——只用公司已有的飞书文档，不引入新工具；零学习成本——团队不需要学新东西，打开文档就能用；立即见效——没有时间搞试点推广，必须一上来就全员切换。" },
      { type: "paragraph", text: "这三条约束是现实倒逼出来的。公司没有预算买新工具，团队也没有时间和意愿去学一套陌生的系统。如果方案不能在现有条件下直接落地，就等于没有方案。" },
      { type: "paragraph", text: "我回到三个最基本的问题来推导。问题本质是什么？——信息不对称、流程不清晰、责任不明确。最小可行方案是什么？——用一份结构化的中枢文档，把所有信息、流程、责任固定下来。怎么保证执行？——规则公开透明，所有人只有一个信息来源。" },
      { type: "paragraph", text: "基于这个逻辑，我设计了六个模块：变更日志——强制记录所有改动，任何人都能追溯历史，解决\u201C我改了但你不知道\u201D的问题；资产归集——把环境链接、文档、第三方平台凭证集中管理，终结\u201C那个链接在哪\u201D的重复提问；组织职责——列清每个人的角色和职责边界，终结\u201C这个问题该找谁\u201D的困惑；需求全生命周期管理——这是核心模块，所有需求必须进入统一的需求池，经过\u201C待评估/已排期/开发中/已完成/已拒绝\u201D的完整状态流转，拒绝必须写明原因，决策过程透明可追溯；迭代发布——每次发版前生成发布清单，明确本次上线什么、修复了什么；验收走查——为每个页面建独立走查表，并列放设计稿和前端还原截图，把主观验收变成可比对、可追溯的结构化流程。" },
      { type: "illustration", index: 1 },
      { type: "screenshot-inline", label: "飞书多维表格目录结构 + 协作流程图", note: "正文讲六模块系统时" },
      { type: "paragraph", text: "六个模块不是拍脑袋拆的，每一个都对应着访谈中反复出现的具体痛点。需求全生命周期管理对应的是前端\u201C不知道做到什么程度\u201D和客户\u201C不知道需求有没有进流程\u201D的问题；变更日志对应的是设计师\u201C改了但开发不知道\u201D的问题；组织职责对应的是所有人\u201C不知道找谁\u201D的问题。" },
      { type: "paragraph", text: "推行策略是\u201C先建共识再定规则\u201D。项目启动会上，我把一期暴露的问题一条一条摊开，让团队自己确认——这些是不是真的？然后针对每个问题提出对应的模块方案。团队自然接受了，因为方案就是从他们说出来的问题中推导出来的。我没有给\u201C不同意\u201D的选项——这是引导，不是强制，但也没有留退路。" },
      { type: "paragraph", text: "结果是：这套协作系统直接支撑了二期的顺利交付，差点丢掉的合同被挽回来了。客户签下了二期。之后我把系统打包成三个版本（简化/标准/完整），适配不同复杂度的项目，向公司提议推广。技术部先用，效果验证后其他团队认可跟进，最终成为全公司标准SOP。" },
      { type: "paragraph", text: "后来我才知道，行业内早已有成熟的专业协作工具在做类似的事。我从问题本身出发一步步推导出来的东西，和那些成熟工具的底层逻辑高度一致。这件事让我意识到：解决问题的关键不是知道有什么工具，而是能不能准确诊断出问题的结构，然后用手头有的资源把它解出来。" },

      // === 转折 ===
      { type: "heading", text: "转折：在同一个项目里识别AI落地机会", navLabel: "转折" },
      { type: "paragraph", text: "二期进入查漏补缺阶段时，DeepSeek刚刚发布，成本极低、性能很强。我判断这个技术可以用在社区场景里——如果给微社区接入一个AI攻略助手，能直接提升用户停留时长和使用频率，这正是客户最核心的诉求。" },
      { type: "paragraph", text: "但我没有直接去找客户。我做的第一件事是确认这件事在技术上能不能落地。我绕过了项目经理，直接找技术总监。原因很现实：按这个方案前期肯定亏损，项目经理受限于预算考核，这个想法大概率在萌芽阶段就会被否掉。我需要技术总监帮我确认可行性，也需要他帮忙推动资源支持。" },
      { type: "paragraph", text: "我直接坐到技术总监旁边，一起研究Coze平台的技术文档。我看不懂代码，但我能识别哪些环节可能有技术风险，然后逐一向他确认。确认技术可行后，我做了人力资源预估：前端约1.5人，后端2人。同时梳理了管理端需求——活动管理、英雄信息输入、知识库维护，这些是客户运营必须的能力。" },
      { type: "paragraph", text: "所有准备工作做完，我才开始跟客户沟通。我预判客户一定会抗拒——外包方提议加新功能，客户的第一反应通常是怀疑动机。所以我的预案策略是：方案足够详细，方向、内容、时间节点全部明确；同时设计退出机制，数据不好随时可以撤，分散客户的决策压力。" },
      { type: "paragraph", text: "第一次pitch写了简要提案，先探口风。客户的反应不是拒绝，是不确定——回去跟Leader讨论。Leader过来让我再讲一遍，提了修改意见，要求出交互设计。这里有一个关键动作：我用下班后的业余时间自己做了交互设计，没有跟公司报备。原因是项目经理的预算报不出去，但我想推这件事。作为外包方，出交互图通常是要收费的，我自己承担了这个成本。" },
      { type: "paragraph", text: "第二次pitch带着完整交互方案再讲一遍，过程中持续协商。最后在正式沟通会上，带上工程师和项目经理完成了集体宣讲。客户和Leader拿着方案去找VP要预算——我的权限到这里为止了，无法再介入。VP批了。从第一次pitch到审批通过，大约一个半月。" },
      { type: "screenshot-inline", label: "娜娜AI对话界面", note: "正文讲AI产品时" },
      { type: "paragraph", text: "最终落地的智能体叫\u201C娜娜\u201D，基于Coze平台搭建，底层模型为DeepSeek R1/V3及豆包。上线后服务了2000多名用户。调试过程中遇到的最大问题是知识库检索不准：以同一个问题重复测试20次，初始版本仅5次命中正确内容，12次返回其他英雄的信息，3次检索不到任何结果。根因是原来的知识库把每个英雄的所有信息作为一个大块存入，用户问具体问题时搜索引擎无法精准命中。我重新设计了知识库的信息架构——每个英雄拆成三段切片（英雄简介、技能+战场技能+连招、装备+徽记），字段对齐后迁移至火山引擎向量知识库VikingDB，由技术团队完成Embedding模型选型和检索参数的配置调试。优化后同样的测试20次全部准确命中。核心是信息架构的重设计，不是单纯换平台。" },

      // === 回头看 ===
      { type: "heading", text: "回头看：这两件事教会我什么", navLabel: "回头看" },
      { type: "paragraph", text: "这个项目里我做了两件性质不同但逻辑相通的事。协作系统是在危机中被动响应——团队要崩了，我必须找到问题并解出来。娜娜是在稳定期主动进攻——我识别到一个技术机会，判断它能创造价值，然后推动它落地。" },
      { type: "paragraph", text: "两件事的共同点是：在每个关键节点，我的判断比我的执行更重要。判断\u201C不是人的问题是系统的问题\u201D决定了协作系统的方向；判断\u201CDeepSeek能用在社区场景\u201D决定了AI线的启动；判断\u201C先找技术总监不找项目经理\u201D决定了娜娜项目能活过萌芽期。" },
      { type: "paragraph", text: "但这些判断都是靠经验和直觉驱动的，缺少系统性的方法论支撑。我能从零设计一套协作系统，但说不清楚它背后的理论框架；我能识别AI落地机会并推动客户买单，但对AI产品管理的完整知识体系还有明显的缺口。这也是我想进一步深入学习的原因——把散装的实践经验，整合进一个专业的、可复用的框架里。" },
    ],
    supportingScreenshots: [
      { label: "看板运行状态", proves: "系统日常运行状态" },
      { label: "四层技术架构", proves: "技术选型全景" },
      { label: "空间化PRD", proves: "信息架构实际产出" },
    ],
  },
  {
    id: 2,
    name: "项目2名称待定",
    navName: "项目2",
    roleLine: "【角色待定】 // 2025",
    summary: "【一句话概述待定稿】",
    cardSummary: "【卡片摘要待定稿】",
    cardTag: "【关键数字待定】",
    layoutMode: "before-after",
    metricsMode: "numbers",
    metrics: [
      { number: "¥100K", label: "起始订单" },
      { number: "¥1.5M", label: "最终审批规模" },
      { number: "15\u00D7", label: "订单扩展倍数" },
    ],
    teamInfo: "内部团队20人",
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
    name: "项目3名称待定",
    navName: "项目3",
    roleLine: "【角色待定】 // 【时间待定】",
    summary: "【一句话概述，从正文提取】",
    cardSummary: "【卡片摘要待定稿】",
    cardTag: "【关键数字待定】",
    layoutMode: "iteration",
    metricsMode: "numbers",
    metrics: [
      { number: "【数字待定】", label: "【指标1待定】" },
      { number: "【数字待定】", label: "【指标2待定】" },
      { number: "【数字待定】", label: "【指标3待定】" },
    ],
    illustrations: [
      { name: "线性迭代流程图", type: "流程图", note: "迭代过程=结果证明" },
    ],
    bodyStructure: [
      { type: "heading", text: "【正文小标题 · 段落一】" },
      { type: "paragraph" },
      { type: "iteration-step", version: "阶段1", heading: "【搭建bot相关段落】" },
      { type: "paragraph" },
      { type: "screenshot-inline", label: "飞书机器人运行界面", note: "正文讲搭建bot时" },
      { type: "screenshot-inline", label: "开发者署名「卡尔」", note: "同上或紧跟其后" },
      { type: "iteration-step", version: "阶段2", heading: "【翻译产出相关段落】" },
      { type: "paragraph" },
      { type: "illustration", index: 0 },
      { type: "screenshot-inline", label: "飞书云表格18语种产出", note: "正文讲翻译产出时" },
      { type: "iteration-step", version: "阶段3", heading: "【没有前端资源自己解决】" },
      { type: "paragraph" },
      { type: "screenshot-inline", label: "自搭前端", note: "正文讲「没有前端资源自己解决」时" },
      { type: "iteration-step", version: "阶段4", heading: "【版本演进相关段落】" },
      { type: "paragraph" },
      { type: "screenshot-inline", label: "版本迭代标签（V2/V3/V5）+ 语言选择列表", note: "正文讲版本演进时" },
    ],
    supportingScreenshots: [
      { label: "Coze平台能力评估", proves: "技术选型决策过程" },
      { label: "工作流实际运行", proves: "自动化流程运行状态" },
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

function Nav({ currentPage, onNavigate, onToast, isMobile }) {
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
        borderBottom: "1px solid #E5E2DC",
      }}>
        <span
        onClick={() => currentPage === "home" ? onToast("You're on the homepage") : onNavigate("home")}
        className="clickable-soft"
        style={{ fontSize: T.heading, fontWeight: 700, color: "#000", fontFamily: FONT_DISPLAY }}
      >{"Zulpkar Tuerxun"}</span>
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 16 : 28 }}>
        {PROJECTS.map((p) => (
          <span
            key={p.id}
            onClick={() => currentPage === "project-" + p.id ? onToast("You're viewing this project") : onNavigate("project-" + p.id)}
            className="clickable-soft"
            style={{
              fontSize: T.small,
              fontWeight: 400,
              color: currentPage === "project-" + p.id ? "#000" : "#888",
              padding: "4px 0",
              borderBottom: currentPage === "project-" + p.id ? "1.5px solid #000" : "1.5px solid transparent",
            }}
          >
            {p.navName}
          </span>
        ))}
        {!isMobile && <span style={{ color: "#E5E2DC", fontSize: T.small }}>|</span>}
        <span style={{
          fontSize: T.small, color: "#ccc",
          cursor: "not-allowed", userSelect: "none",
          whiteSpace: "nowrap",
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
      <div style={{ maxWidth: maxW, margin: "0 auto" }}>
        <section style={{
          padding: isMobile ? "36px 16px 16px" : "64px 40px 20px",
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: isMobile ? 28 : 38,
            fontWeight: 400,
            color: "#2A2A2A",
            lineHeight: 1.4,
            margin: 0,
            maxWidth: 540,
            fontFamily: FONT_DISPLAY,
          }}>
            {"\u3010\u4E00\u53E5\u8BDD\u5B9A\u4F4D\u5F85\u5B9A\u7A3F\u3011"}
          </h1>
          <p style={{
            fontSize: T.small, color: "#B8B0A3",
            marginTop: 12, lineHeight: 1.5,
          }}>
            {"\u3010\u4E00\u884C context\uFF1A\u5982 6 years in gaming tech \u00B7 transitioning to HCI / AI product \u00B7 speaks 4 languages\u3011"}
          </p>
        </section>
      </div>

      {/* === Curatorial line === */}
      <div style={{ maxWidth: maxW, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px", textAlign: "center" }}>
        <p style={{
          fontSize: T.body, color: "#B8B0A3",
          margin: "0 auto 24px", lineHeight: 1.7,
          maxWidth: 480,
        }}>
          {"\u3010\u7B56\u5C55\u8BED\u5F85\u5B9A\u7A3F\uFF1A\u4E00\u53E5\u8BDD\uFF0C\u70B9\u51FA\u4E09\u4E2A\u9879\u76EE\u653E\u5728\u4E00\u8D77\u8BF4\u660E\u4EC0\u4E48\u3011"}
        </p>
      </div>

      {/* === Project Entries — simplified, higher-contrast rows === */}
      <div style={{ marginTop: isMobile ? 20 : 28, marginBottom: isMobile ? 24 : 32 }}>
        {PROJECTS.map((p, idx) => {
          const isHovered = hoveredId === p.id;
          const timeStr = p.roleLine.split(" // ")[1] || "";

          return (
            <div
              key={p.id}
              onClick={() => onNavigate("project-" + p.id)}
              style={{
                paddingTop: idx === 0 ? 2 : 3,
                paddingBottom: 3,
              }}
            >
              <div
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  maxWidth: maxW,
                  margin: "0 auto",
                  padding: isMobile ? "22px 16px" : "26px 40px",
                  minHeight: 120,
                  cursor: "pointer",
                }}
              >
              {/* Desktop: two-column layout — text left, meta right */}
              {!isMobile ? (
                <div
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoverPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) auto",
                    columnGap: 32,
                    alignItems: "center",
                    padding: "28px 20px",
                    borderRadius: 0,
                    border: "1px solid #E5E2DC",
                    backgroundColor: isHovered ? "#111111" : "#FAF9F7",
                    boxShadow: isHovered ? "0 18px 40px rgba(0,0,0,0.16)" : "none",
                    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                    backgroundImage: isHovered
                      ? `radial-gradient(circle at ${hoverPos.x}px ${hoverPos.y}px, rgba(255,255,255,0.12), rgba(17,17,17,0))`
                      : "none",
                  }}
                >
                  {/* Left: text block */}
                  <div style={{ minWidth: 0 }}>
                    {/* Small index + tag */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6,
                    }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 22,
                        height: 22,
                        borderRadius: "999px",
                        border: "1px solid #D5D0C8",
                        fontSize: 11,
                        color: "#777",
                      }}>{String(idx + 1).padStart(2, "0")}</span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: isHovered ? "#FAF9F7" : ACCENT,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}>{p.cardTag}</span>
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
                      color: isHovered ? "#D7D3CB" : "#888",
                      margin: 0,
                      lineHeight: 1.7,
                    }}>{p.cardSummary}</p>
                  </div>

                  {/* Right: time + arrow */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 10,
                  }}>
                    <span style={{
                      fontSize: T.small,
                      color: isHovered ? "#E5E2DC" : "#B8B0A3",
                      whiteSpace: "nowrap",
                    }}>{timeStr}</span>
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
                      }}>{"\u2192"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mobile: stacked but compact */
                <div>
                  {/* Tag + index + time */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 20,
                        height: 20,
                        borderRadius: "999px",
                        border: "1px solid #D5D0C8",
                        fontSize: 10,
                        color: "#777",
                      }}>{String(idx + 1).padStart(2, "0")}</span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: ACCENT,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}>{p.cardTag}</span>
                    </div>
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
        borderTop: "1px solid #E5E2DC",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: isMobile ? 22 : 26,
          fontWeight: 400,
          color: "#2A2A2A",
          margin: 0,
        }}>
          {"下一步：如果你想进一步了解我"}
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
          {"【面向招生官的一句话，比如：如需查看完整作品集或更多背景材料，可以通过下列方式联系我。】"}
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
              border: hoveredBtn === "link" ? "1px solid #111" : "1px solid #D5D0C8",
              fontSize: T.small,
              color: hoveredBtn === "link" ? "#fff" : "#777",
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

function SideNav({ headings, isMobile }) {
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);

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

  if (isMobile || !visible) return null;

  return (
    <div style={{
      position: "fixed", top: "50%", right: "max(16px, calc((100% - 860px) / 2 - 120px))",
      transform: "translateY(-50%)",
      zIndex: 50,
      transition: "opacity 0.3s ease",
      opacity: visible ? 1 : 0,
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
            className="clickable-soft"
            style={{
              fontSize: active === i ? T.body : T.small,
              lineHeight: 1,
              color: active === i ? "#000" : "#ccc",
              fontWeight: active === i ? 700 : 500,
              padding: "10px 12px 10px 8px",
              whiteSpace: "nowrap",
              transform: active === i ? "translateX(-4px)" : "translateX(0)",
              pointerEvents: "auto",
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
  );
}

function MobileProgressNav({ headings, isMobile }) {
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

  if (!isMobile || !visible) return null;

  return (
    <>
      {/* Progress bar — pinned under nav */}
      <div style={{
        position: "fixed", top: 50, left: 0, right: 0,
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
          position: "fixed", top: 53, left: 0, right: 0,
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
          position: "fixed", top: 80, left: 0, right: 0,
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

/* ===== Illustration: Dual-Track Timeline (Project 1) ===== */

function DualTrackTimeline() {
  const ff = "'Inter', sans-serif";
  return (
    <svg viewBox="0 0 1020 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <marker id="dt-arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M 0 0 L 7 2.5 L 0 5 Z" fill="#aaa"/>
        </marker>
      </defs>
      <text x="510" y="24" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="600" letterSpacing="0.1em" fill="#999">DUAL-TRACK TIMELINE — COLLABORATION SYSTEM + NANA AI</text>
      {/* Legend */}
      <rect x="280" y="38" width="10" height="10" rx="2" fill="#000"/>
      <text x="296" y="47" fontFamily={ff} fontSize="9" fontWeight="600" fill="#999">TRACK A: COLLABORATION</text>
      <rect x="460" y="38" width="10" height="10" rx="2" fill="#aaa"/>
      <text x="476" y="47" fontFamily={ff} fontSize="9" fontWeight="600" fill="#999">TRACK B: NANA AI</text>
      <circle cx="615" cy="43" r="5" fill="#000"/>
      <text x="626" y="47" fontFamily={ff} fontSize="9" fontWeight="600" fill="#999">{"\u2605 CORE DECISION"}</text>
      <circle cx="745" cy="43" r="5" fill="#888"/>
      <text x="756" y="47" fontFamily={ff} fontSize="9" fontWeight="600" fill="#999">{"\u25C6 KEY RESULT"}</text>
      {/* Phase backgrounds */}
      <rect x="50" y="62" width="300" height="400" fill="#fafafa" opacity="0.5"/>
      <rect x="352" y="62" width="370" height="400" fill="#f5f5f5" opacity="0.5"/>
      <rect x="724" y="62" width="246" height="400" fill="#fafafa" opacity="0.5"/>
      {/* Phase headers */}
      <text x="200" y="82" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.1em" fill="#999">{"PHASE 1: CRISIS & DIAGNOSIS"}</text>
      <text x="200" y="94" textAnchor="middle" fontFamily={ff} fontSize="8.5" fontWeight="500" fill="#aaa">{"2023 \u2192 early 2024"}</text>
      <text x="537" y="82" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.1em" fill="#999">{"PHASE 2: SYSTEM DESIGN & DELIVERY \u2194 AI OPPORTUNITY"}</text>
      <text x="537" y="94" textAnchor="middle" fontFamily={ff} fontSize="8.5" fontWeight="500" fill="#aaa">2024 (overlapping transition)</text>
      <text x="847" y="82" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.1em" fill="#999">PHASE 3: AI LAUNCH</text>
      <text x="847" y="94" textAnchor="middle" fontFamily={ff} fontSize="8.5" fontWeight="500" fill="#aaa">{"\u2192 2025"}</text>
      {/* Dividers */}
      <line x1="351" y1="62" x2="351" y2="462" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4,4"/>
      <line x1="723" y1="62" x2="723" y2="462" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4,4"/>
      {/* Track labels */}
      <text x="30" y="200" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.1em" fill="#000" transform="rotate(-90, 30, 200)" textAnchor="middle">TRACK A</text>
      <text x="30" y="380" fontFamily={ff} fontSize="9" fontWeight="700" letterSpacing="0.1em" fill="#aaa" transform="rotate(-90, 30, 380)" textAnchor="middle">TRACK B</text>
      <line x1="50" y1="260" x2="970" y2="260" stroke="#e0e0e0" strokeWidth="1"/>
      {/* === TRACK A === */}
      {/* Node 1 */}
      <rect x="70" y="120" width="200" height="70" fill="#f4f4f4" stroke="#e0e0e0" strokeWidth="1.5"/>
      <circle cx="86" cy="136" r="10" fill="#000"/>
      <text x="86" y="140" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">1</text>
      <text x="102" y="140" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">Collaboration Breakdown</text>
      <text x="86" y="160" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666"><tspan x="86" dy="0">Phase 1 delivery crisis — client</tspan><tspan x="86" dy="14">questions team competence</tspan></text>
      {/* Node 2 ★ */}
      <rect x="70" y="200" width="260" height="50" fill="#f4f4f4" stroke="#000" strokeWidth="2.5"/>
      <circle cx="86" cy="220" r="10" fill="#000"/>
      <text x="86" y="224" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">2</text>
      <rect x="100" y="207" width="36" height="14" rx="7" fill="#000"/>
      <text x="118" y="217" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.08em" fill="#fff">{"\u2605 CORE"}</text>
      <text x="142" y="218" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">Structural Diagnosis</text>
      <text x="86" y="240" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">{"15 interviews \u2192 \u201CSystem failure, not people failure\u201D"}</text>
      <line x1="170" y1="190" x2="170" y2="198" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#dt-arr)"/>
      {/* Node 3 */}
      <rect x="370" y="120" width="220" height="70" fill="#ebebeb" stroke="#e0e0e0" strokeWidth="1.5"/>
      <circle cx="386" cy="136" r="10" fill="#000"/>
      <text x="386" y="140" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">3</text>
      <text x="402" y="140" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">Six-Module System</text>
      <text x="386" y="160" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666"><tspan x="386" dy="0">3 constraints: zero cost, zero</tspan><tspan x="386" dy="14">learning curve, instant effect</tspan></text>
      <line x1="330" y1="225" x2="355" y2="155" stroke="#aaa" strokeWidth="1.5" strokeDasharray="4,3"/>
      {/* Node 4 ◆ */}
      <rect x="604" y="120" width="105" height="50" fill="#f4f4f4" stroke="#888" strokeWidth="2"/>
      <circle cx="620" cy="136" r="10" fill="#888"/>
      <text x="620" y="140" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">4</text>
      <rect x="634" y="125" width="46" height="14" rx="7" fill="#888"/>
      <text x="657" y="135" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.08em" fill="#fff">{"\u25C6 RESULT"}</text>
      <text x="620" y="158" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">Client re-commits</text>
      <line x1="590" y1="155" x2="602" y2="155" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#dt-arr)"/>
      {/* Node 5 */}
      <rect x="604" y="200" width="105" height="50" fill="#ebebeb" stroke="#e0e0e0" strokeWidth="1.5"/>
      <circle cx="620" cy="216" r="10" fill="#000"/>
      <text x="620" y="220" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">5</text>
      <text x="636" y="220" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">SOP</text>
      <text x="620" y="240" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">Company-wide</text>
      <line x1="656" y1="170" x2="656" y2="198" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#dt-arr)"/>
      {/* Connector */}
      <rect x="370" y="268" width="340" height="28" rx="14" fill="none" stroke="#aaa" strokeWidth="1.5" strokeDasharray="5,4"/>
      <text x="540" y="286" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="600" fill="#999">{"Stable delivery builds trust \u2192 space to propose AI"}</text>
      {/* === TRACK B === */}
      <text x="200" y="370" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="500" fill="#e0e0e0">—</text>
      {/* Node 6 ★ */}
      <rect x="370" y="320" width="210" height="70" fill="#e0e0e0" stroke="#000" strokeWidth="2.5"/>
      <circle cx="386" cy="336" r="10" fill="#000"/>
      <text x="386" y="340" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">6</text>
      <rect x="400" y="325" width="36" height="14" rx="7" fill="#000"/>
      <text x="418" y="335" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.08em" fill="#fff">{"\u2605 CORE"}</text>
      <text x="442" y="336" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">Identifies AI Opportunity</text>
      <text x="386" y="360" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666"><tspan x="386" dy="0">DeepSeek launch — judges community</tspan><tspan x="386" dy="14">scenario fit for AI integration</tspan></text>
      {/* Node 7 ★ */}
      <rect x="370" y="400" width="210" height="56" fill="#e0e0e0" stroke="#000" strokeWidth="2.5"/>
      <circle cx="386" cy="420" r="10" fill="#000"/>
      <text x="386" y="424" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">7</text>
      <rect x="400" y="407" width="36" height="14" rx="7" fill="#000"/>
      <text x="418" y="417" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.08em" fill="#fff">{"\u2605 CORE"}</text>
      <text x="442" y="418" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">Validates Feasibility</text>
      <text x="386" y="444" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">Tech Director first, then budget chain</text>
      <line x1="475" y1="390" x2="475" y2="398" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#dt-arr)"/>
      {/* Node 8 ◆ */}
      <rect x="744" y="340" width="200" height="70" fill="#000" stroke="#000" strokeWidth="1.5"/>
      <circle cx="760" cy="358" r="10" fill="#888"/>
      <text x="760" y="362" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" fill="#fff">8</text>
      <rect x="774" y="347" width="46" height="14" rx="7" fill="#888"/>
      <text x="797" y="357" textAnchor="middle" fontFamily={ff} fontSize="7.5" fontWeight="700" letterSpacing="0.08em" fill="#fff">{"\u25C6 RESULT"}</text>
      <text x="830" y="358" fontFamily={ff} fontSize="12" fontWeight="700" fill="#fff">{"  Nana AI Launches"}</text>
      <text x="760" y="384" fontFamily={ff} fontSize="10" fontWeight="500" fill="#999"><tspan x="760" dy="0">{"VP approved \u2192 serving"}</tspan><tspan x="760" dy="14">2,000+ users</tspan></text>
      <line x1="580" y1="428" x2="742" y2="375" stroke="#aaa" strokeWidth="1.5" strokeDasharray="4,3"/>
    </svg>
  );
}

/* ===== Illustration: Six-Module Information Hub (Project 1) ===== */

function InfoHub() {
  const ff = "'Inter', sans-serif";
  return (
    <svg viewBox="0 0 920 500" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <marker id="ih-gov" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M 0 0 L 7 2.5 L 0 5 Z" fill="#000"/>
        </marker>
        <marker id="ih-del" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M 0 0 L 7 2.5 L 0 5 Z" fill="#aaa"/>
        </marker>
        <marker id="ih-delRev" markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto">
          <path d="M 7 0 L 0 2.5 L 7 5 Z" fill="#aaa"/>
        </marker>
        <marker id="ih-loop" markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto">
          <path d="M 7 0 L 0 2.5 L 7 5 Z" fill="#000"/>
        </marker>
      </defs>
      {/* Title */}
      <text x="460" y="22" textAnchor="middle" fontFamily={ff} fontSize="10.5" fontWeight="600" letterSpacing="0.1em" fill="#999">SIX-MODULE INFORMATION HUB — COLLABORATION SYSTEM DESIGN LOGIC</text>
      <text x="460" y="38" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="500" fill="#aaa">{"Not \u201Cbuilt six modules\u201D — how information flows, filters, and closes loops between roles"}</text>
      {/* Legend */}
      <rect x="240" y="50" width="10" height="10" rx="2" fill="#000"/>
      <text x="256" y="59" fontFamily={ff} fontSize="9" fontWeight="600" fill="#999">{"GOVERNANCE (demand flows in \u2192)"}</text>
      <rect x="430" y="50" width="10" height="10" rx="2" fill="#aaa"/>
      <text x="446" y="59" fontFamily={ff} fontSize="9" fontWeight="600" fill="#999">{"(\u2190 output flows back)"}</text>
      <rect x="600" y="50" width="10" height="10" rx="2" fill="#000" opacity="0.4"/>
      <text x="616" y="59" fontFamily={ff} fontSize="9" fontWeight="600" fill="#999">FEEDBACK LOOP</text>
      {/* Zones */}
      <rect x="20" y="80" width="100" height="340" rx="0" fill="#f4f4f4" stroke="#e0e0e0" strokeWidth="1"/>
      <text x="70" y="240" textAnchor="middle" fontFamily={ff} fontSize="11" fontWeight="700" fill="#000">Client</text>
      <text x="70" y="255" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">Submits</text>
      <text x="70" y="267" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">demands</text>
      <text x="70" y="282" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">{"& accepts"}</text>
      <text x="70" y="294" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">deliveries</text>
      <rect x="800" y="80" width="100" height="340" rx="0" fill="#f4f4f4" stroke="#e0e0e0" strokeWidth="1"/>
      <text x="850" y="240" textAnchor="middle" fontFamily={ff} fontSize="11" fontWeight="700" fill="#000">Execution</text>
      <text x="850" y="255" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">Frontend</text>
      <text x="850" y="267" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">Backend</text>
      <text x="850" y="282" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">Design</text>
      <text x="850" y="294" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="500" fill="#999">QA</text>
      {/* Core rule callout */}
      <rect x="230" y="72" width="460" height="26" rx="13" fill="none" stroke="#000" strokeWidth="1.5"/>
      <text x="460" y="89" textAnchor="middle" fontFamily={ff} fontSize="10" fontWeight="700" letterSpacing="0.04em" fill="#000">{"Core rule: \u201CIf it\u2019s not in the formal tracker, it doesn\u2019t exist\u201D"}</text>
      {/* Governance layer label */}
      <text x="460" y="118" textAnchor="middle" fontFamily={ff} fontSize="8.5" fontWeight="600" letterSpacing="0.06em" fill="#999">{"GOVERNANCE LAYER — DEMAND FLOWS IN \u2192"}</text>
      <line x1="150" y1="124" x2="770" y2="124" stroke="#e0e0e0" strokeWidth="1"/>
      {/* Requirement Lifecycle */}
      <rect x="150" y="134" width="280" height="90" fill="#fafafa" stroke="#000" strokeWidth="2"/>
      <rect x="150" y="134" width="280" height="26" fill="#000"/>
      <rect x="150" y="152" width="280" height="8" fill="#000"/>
      <text x="165" y="152" fontFamily={ff} fontSize="12" fontWeight="700" fill="#fff">Requirement Lifecycle</text>
      <rect x="360" y="138" width="58" height="14" rx="7" fill="#888"/>
      <text x="389" y="148" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="600" fill="#fff">CORE</text>
      <text x="165" y="180" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">{"Demand in \u2192 classify \u2192 prioritize"}</text>
      <text x="165" y="194" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">{"→ assign → status flow → decision"}</text>
      <text x="165" y="214" fontFamily={ff} fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#000">ROLE: GATEWAY + PROCESSING ENGINE</text>
      <line x1="120" y1="179" x2="148" y2="179" stroke="#000" strokeWidth="1.5" markerEnd="url(#ih-gov)" opacity="0.5"/>
      {/* Role Map */}
      <rect x="490" y="134" width="240" height="90" fill="#fafafa" stroke="#000" strokeWidth="1.5" opacity="0.85"/>
      <rect x="490" y="134" width="240" height="26" fill="#000" opacity="0.85"/>
      <rect x="490" y="152" width="240" height="8" fill="#000" opacity="0.85"/>
      <text x="505" y="152" fontFamily={ff} fontSize="12" fontWeight="700" fill="#fff">Role Map</text>
      <text x="505" y="180" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">Defines who is responsible</text>
      <text x="505" y="194" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">{"at each stage \u2192 routes to assignee"}</text>
      <text x="505" y="214" fontFamily={ff} fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#000">ROLE: ROUTING</text>
      <line x1="430" y1="179" x2="488" y2="179" stroke="#000" strokeWidth="1.5" markerEnd="url(#ih-gov)" opacity="0.5"/>
      <line x1="730" y1="179" x2="798" y2="179" stroke="#000" strokeWidth="1.5" markerEnd="url(#ih-gov)" opacity="0.5"/>
      {/* Delivery layer label */}
      <text x="460" y="252" textAnchor="middle" fontFamily={ff} fontSize="8.5" fontWeight="600" letterSpacing="0.06em" fill="#999">{"← OUTPUT FLOWS BACK — DELIVERY LAYER"}</text>
      <line x1="150" y1="258" x2="770" y2="258" stroke="#e0e0e0" strokeWidth="1"/>
      {/* Release Management */}
      <rect x="490" y="268" width="240" height="90" fill="#fafafa" stroke="#aaa" strokeWidth="1.5"/>
      <rect x="490" y="268" width="240" height="26" fill="#aaa"/>
      <rect x="490" y="286" width="240" height="8" fill="#aaa"/>
      <text x="505" y="286" fontFamily={ff} fontSize="12" fontWeight="700" fill="#fff">Release Management</text>
      <text x="505" y="314" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">{"Execution done \u2192 packaged as"}</text>
      <text x="505" y="328" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">{"release checklist \u2192 scope made explicit"}</text>
      <text x="505" y="348" fontFamily={ff} fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#aaa">ROLE: PACKAGING</text>
      {/* Acceptance Review */}
      <rect x="150" y="268" width="280" height="90" fill="#fafafa" stroke="#aaa" strokeWidth="1.5"/>
      <rect x="150" y="268" width="280" height="26" fill="#aaa"/>
      <rect x="150" y="286" width="280" height="8" fill="#aaa"/>
      <text x="165" y="286" fontFamily={ff} fontSize="12" fontWeight="700" fill="#fff">Acceptance Review</text>
      <text x="165" y="314" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">Design vs. implementation page-by-page</text>
      <text x="165" y="328" fontFamily={ff} fontSize="10" fontWeight="500" fill="#666">{"→ pass / reject"}</text>
      <text x="165" y="348" fontFamily={ff} fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#aaa">ROLE: QUALITY GATE</text>
      {/* Delivery arrows */}
      <line x1="488" y1="313" x2="432" y2="313" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#ih-delRev)" opacity="0.5"/>
      <line x1="798" y1="313" x2="732" y2="313" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#ih-delRev)" opacity="0.5"/>
      <line x1="148" y1="313" x2="120" y2="313" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#ih-delRev)" opacity="0.5"/>
      {/* Feedback loop */}
      <path d="M 290 360 C 290 390, 135 390, 135 230 C 135 180, 148 164, 148 160" fill="none" stroke="#000" strokeWidth="1.8" strokeDasharray="5,4" markerEnd="url(#ih-loop)" opacity="0.35"/>
      <rect x="60" y="378" width="195" height="22" rx="11" fill="none" stroke="#000" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.4"/>
      <text x="157" y="393" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="600" fill="#888">{"Review issues \u2192 back to requirement pool"}</text>
      {/* Base layer */}
      <rect x="150" y="420" width="580" height="70" fill="#fafafa" stroke="#e0e0e0" strokeWidth="1.2"/>
      <rect x="155" y="425" width="80" height="18" rx="0" fill="#e0e0e0"/>
      <text x="195" y="437" textAnchor="middle" fontFamily={ff} fontSize="9" fontWeight="600" fill="#666">BASE LAYER</text>
      <text x="248" y="437" fontFamily={ff} fontSize="10" fontWeight="500" fill="#999">{"Always on \u00B7 spans entire system"}</text>
      <rect x="165" y="450" width="260" height="30" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
      <text x="180" y="469" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">Change Log</text>
      <text x="265" y="469" fontFamily={ff} fontSize="10" fontWeight="500" fill="#999">— Every action recorded, every change traceable</text>
      <rect x="445" y="450" width="270" height="30" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
      <text x="460" y="469" fontFamily={ff} fontSize="12" fontWeight="700" fill="#000">Asset Repository</text>
      <text x="560" y="469" fontFamily={ff} fontSize="10" fontWeight="500" fill="#999">— Docs, links, credentials unified</text>
      <line x1="295" y1="360" x2="295" y2="418" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="3,3" opacity="0.3"/>
      <line x1="610" y1="360" x2="610" y2="418" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="3,3" opacity="0.3"/>
    </svg>
  );
}

const ILLUSTRATION_MAP = {
  "\u53CC\u8F68\u65F6\u95F4\u8F74": DualTrackTimeline,
  "\u516D\u6A21\u5757\u4FE1\u606F\u67A2\u7EBD": InfoHub,
  "\u8BCA\u65AD\u6F0F\u6597\u56FE": DiagnosticFunnel,
  "\u4E09\u671F\u9012\u8FDB\u56FE": ThreePhaseRoadmap,
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
      <path d="M 170,60 L 690,60 L 670,142 L 190,142 Z" fill="#f4f4f4"/>
      <text x="430" y="94" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#999">SURFACE REQUEST</text>
      <text x="430" y="116" textAnchor="middle" fontFamily={ff} fontSize="13.5" fontWeight="600" fill="#000">{"\u201CFix the UI\u201D (\u00A5100K)"}</text>
      {/* Layer 2: First-Pass Walkthrough */}
      <path d="M 190,149 L 670,149 L 655,231 L 205,231 Z" fill="#ebebeb"/>
      <text x="430" y="183" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#999">FIRST-PASS WALKTHROUGH</text>
      <text x="430" y="205" textAnchor="middle" fontFamily={ff} fontSize="13.5" fontWeight="600" fill="#000">{"Fragmented UX across homepage & editor"}</text>
      {/* Layer 3: Pattern Recognition */}
      <path d="M 205,238 L 655,238 L 644,320 L 216,320 Z" fill="#e0e0e0"/>
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
      <rect x="60" y="60" width="210" height="200" fill="#f4f4f4"/>
      <text x="165" y="90" textAnchor="middle" fontFamily={ff} fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#999">PHASE 1</text>
      <text x="165" y="114" textAnchor="middle" fontFamily={ff} fontSize="14" fontWeight="700" fill="#000">Vertical UX Fix</text>
      <line x1="120" y1="128" x2="210" y2="128" stroke="#e0e0e0" strokeWidth="1.5"/>
      <text x="165" y="152" textAnchor="middle" fontFamily={ff} fontSize="12" fontWeight="500" fill="#666">
        <tspan x="165" dy="0">Optimize upload flow</tspan>
        <tspan x="165" dy="18">and info architecture.</tspan>
        <tspan x="165" dy="18">Make the product</tspan>
        <tspan x="165" dy="18">usable first.</tspan>
      </text>
      {/* Arrow 1→2 */}
      <line x1="278" y1="160" x2="294" y2="160" stroke="#aaa" strokeWidth="2" markerEnd="url(#rm-arr)"/>
      {/* Phase 2 */}
      <rect x="300" y="60" width="210" height="200" fill="#e0e0e0"/>
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
  const hasNext = project.id < 3;
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
    const body = project.bodyStructure.map((block) => {
      if (block.type === "heading" || block.type === "iteration-step") {
        const fullLabel = block.type === "heading" ? block.text : block.heading;
        headings.push(block.navLabel || fullLabel);
        return { ...block, sectionId: idx++ };
      }
      return block;
    });
    return { sectionHeadings: headings, bodyWithIds: body };
  }, [project.bodyStructure]);

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
      <SideNav headings={sectionHeadings} isMobile={isMobile} />
      <MobileProgressNav headings={sectionHeadings} isMobile={isMobile} />
      {/* === Header — wider, two-column on desktop === */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "28px 16px 0" : "40px 40px 0" }}>

        {/* Back link */}
        <span
          onClick={() => onNavigate("home")}
          style={{ fontSize: T.small, color: "#999", cursor: "pointer", display: "inline-block", marginBottom: 28 }}
        >{"\u2190 All projects"}</span>

        <header style={{ marginBottom: 0, paddingBottom: 36, borderBottom: "1px solid #E5E2DC" }}>
          {/* Title — full width */}
          <h1 style={{ fontSize: T.title, fontWeight: 700, margin: 0, color: "#000", lineHeight: 1.25, fontFamily: FONT_DISPLAY }}>
            {project.name}
          </h1>

          {/* Metadata row — horizontal under title */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            gap: isMobile ? "8px 24px" : "0 40px",
            marginTop: 18,
            paddingTop: 16,
            borderTop: "1px solid #EDEAE3",
          }}>
            <div>
              <p style={{ fontSize: T.small, color: "#999", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 0.5 }}>{"Role"}</p>
              <p style={{ fontSize: T.small, color: "#333", margin: 0, fontWeight: 500 }}>{project.roleLine.split(" // ")[0]}</p>
            </div>
            <div>
              <p style={{ fontSize: T.small, color: "#999", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 0.5 }}>{"Timeline"}</p>
              <p style={{ fontSize: T.small, color: "#333", margin: 0, fontWeight: 500 }}>{project.roleLine.split(" // ")[1]}</p>
            </div>
            <div>
              <p style={{ fontSize: T.small, color: "#999", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 0.5 }}>{"Team"}</p>
              <p style={{ fontSize: T.small, color: "#333", margin: 0, fontWeight: 500 }}>
                {project.teamInfo || "\u3010\u56E2\u961F\u6784\u6210\u5F85\u5B9A\u3011"}
              </p>
            </div>
          </div>

          {/* Summary — full width, breathes below metadata */}
          <p style={{ fontSize: T.body, color: "#444", marginTop: 20, lineHeight: 1.8, maxWidth: 640 }}>{project.summary}</p>
        </header>
      </div>

      {/* === Metrics Bar === */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "24px 16px 0" : "28px 40px 0" }}>
        <div style={{
          borderBottom: "1px solid #E5E2DC",
          paddingBottom: 28, marginBottom: 48,
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
                <p style={{ fontSize: T.body, fontWeight: 500, color: "#888", margin: 0, lineHeight: 1.5 }}>{project.stateBefore}</p>
              </div>
              {/* Arrow indicator */}
              <div style={{ padding: "0 12px", fontSize: T.heading, color: "#ccc", flexShrink: 0 }}>{"\u2192"}</div>
              <div style={{
                flex: 1, textAlign: "center",
                padding: isMobile ? "0" : "0 24px",
              }}>
                <p style={{ fontSize: T.small, color: "#999", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>{"After"}</p>
                <p style={{ fontSize: T.body, fontWeight: 600, color: "#000", margin: 0, lineHeight: 1.5 }}>{project.stateAfter}</p>
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
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "0 16px 56px" : "0 32px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        {bodyWithIds.map((block, i) => {

          if (block.type === "heading") {
            const isReflection = block.navLabel === "\u56DE\u5934\u770B";
            if (isReflection) {
              return (
                <div key={i} id={"section-" + block.sectionId} style={{ scrollMarginTop: 80, marginTop: 36, paddingTop: 40, borderTop: "1px solid #E5E2DC" }}>
                  <h2 style={{ fontSize: T.heading, fontWeight: 600, color: "#000", margin: 0, fontFamily: FONT_DISPLAY }}>{block.text}</h2>
                </div>
              );
            }
            return <h2 key={i} id={"section-" + block.sectionId} style={{ fontSize: T.heading, fontWeight: 600, color: "#000", margin: 0, scrollMarginTop: 80, fontFamily: FONT_DISPLAY }}>{block.text}</h2>;
          }

          if (block.type === "paragraph") {
            if (block.text) {
              return <p key={i} style={{ fontSize: T.body, color: "#333", lineHeight: 2, margin: 0, whiteSpace: "pre-wrap" }}>{block.text}</p>;
            }
            return <TextPlaceholder key={i} lines={5} />;
          }

          if (block.type === "illustration") {
            const ill = project.illustrations[block.index];
            const IllComponent = ILLUSTRATION_MAP[ill.name];
            if (IllComponent) {
              // Break out of 720px body into ~960px for breathing room
              const breakoutPx = isMobile ? 0 : 120;
              return (
                <div
                  key={i}
                  style={{
                    margin: `12px -${breakoutPx}px`,
                    position: "relative",
                  }}
                >
                  {/* Clear illustration — no overlay, no filter */}
                  <div
                    onClick={() => setLightboxContent(<IllComponent />)}
                    style={{ cursor: "pointer" }}
                  >
                    <IllComponent />
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
                        fontSize: T.small, color: "#999", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 4,
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                      {"Expand"}
                    </span>
                  </div>
                </div>
              );
            }
            return (
              <PlaceholderBox key={i} label={ill.name} sublabel={ill.type + " \u00B7 " + ill.note} height={240} dark />
            );
          }

          if (block.type === "screenshot-inline") {
            return (
              <PlaceholderBox key={i} label={block.label} sublabel={block.note} height={200} />
            );
          }

          if (block.type === "screenshot-pair") {
            return <BeforeAfterPair key={i} labelBefore={block.labelBefore} labelAfter={block.labelAfter} note={block.note} isMobile={isMobile} />;
          }

          if (block.type === "iteration-step") {
            return <div key={i} id={"section-" + block.sectionId} style={{ scrollMarginTop: 80 }}><IterationStep version={block.version} heading={block.heading} /></div>;
          }

          return null;
        })}
      </div>

      {/* === Supporting Screenshots === */}
      {project.supportingScreenshots.length > 0 && (
        <section style={{ marginTop: 72, paddingTop: 36, borderTop: "1px solid #E5E2DC" }}>
          <h3 style={{ fontSize: T.small, fontWeight: 600, color: "#000", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {"System in Action"}
          </h3>
          <p style={{ fontSize: T.small, color: "#999", marginBottom: 24 }}>
            {"Evidence of live deployment"}
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 20,
          }}>
            {project.supportingScreenshots.map((s, i) => (
              <div key={i}>
                <PlaceholderBox label={s.label} height={180} />
                <div style={{ padding: "10px 2px 0" }}>
                  <p style={{ fontSize: T.small, fontWeight: 600, color: "#333", margin: 0 }}>{s.label}</p>
                  <p style={{ fontSize: T.small, color: "#999", margin: "2px 0 0" }}>{s.proves}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* === Prev / Next Nav === */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 72, paddingTop: 28, borderTop: "1px solid #E5E2DC",
        flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0,
      }}>
        <div
          onClick={hasPrev ? () => onNavigate("project-" + prevProject.id) : () => onToast("This is the first project", "bottom")}
          onMouseEnter={(e) => { if (hasPrev) { setHoveredNav("prev"); setNavPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); } }}
          onMouseMove={(e) => { if (hoveredNav === "prev") setNavPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            border: hasPrev ? "1px solid #E5E2DC" : "1px dashed #E5E2DC",
            padding: "14px 20px",
            cursor: hasPrev ? "pointer" : "default",
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
            border: hasNext ? "1px solid #E5E2DC" : "1px dashed #E5E2DC",
            padding: "14px 20px",
            textAlign: isMobile ? "left" : "right",
            cursor: hasNext ? "pointer" : "default",
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

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

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
    if (Math.abs(nx - posRef.current.x) > 3 || Math.abs(ny - posRef.current.y) > 3) {
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
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        backgroundColor: "rgba(0,0,0,0.82)",
        cursor: dragging.current ? "grabbing" : "grab",
        touchAction: "none", userSelect: "none",
      }}
    >
      {/* Top-right close button — always visible, prominent */}
      <div
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "fixed", top: 20, right: 24, zIndex: 510,
          display: "flex", alignItems: "center", gap: 8,
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: "8px 16px",
          borderRadius: 20,
          cursor: "pointer",
          pointerEvents: "auto",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#000" }}>Close</span>
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
            borderRadius: 16,
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
            display: "flex", gap: 12, alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.95)", padding: "6px 18px",
            borderRadius: 16,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#000" }}>
              {"Click anywhere \u00B7 ESC \u00B7 \u00D7"}
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
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 200,
        width: 40, height: 40,
        border: "1px solid #E5E2DC", backgroundColor: "#FAF9F7",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "border-color 0.15s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#000"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E2DC"; }}
    >
      <span style={{ fontSize: 14, color: "#666" }}>{"\u2191"}</span>
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

export default function App() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState(null);
  const [fade, setFade] = useState(1);
  const pendingNav = useRef(null);
  const isMobile = useIsMobile();

  const navigate = (t) => {
    if (t === page) return;
    pendingNav.current = t;
    setFade(0);
  };

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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');`}</style>
      <Nav currentPage={page} onNavigate={navigate} onToast={showToast} isMobile={isMobile} />
      <div style={{ opacity: fade, transition: "opacity 0.25s ease", flex: 1 }}>
        {page === "home" && <HomePage onNavigate={navigate} isMobile={isMobile} />}
        {cp && <ProjectPage project={cp} onNavigate={navigate} onToast={showToast} isMobile={isMobile} />}
      </div>
      <BackToTop />
      {toast && <Toast message={toast.msg} position={toast.position} onDone={() => setToast(null)} />}
    </div>
  );
}
