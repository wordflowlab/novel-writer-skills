# Novel Writer Skills 产品需求文档

**版本**: v1.0  
**日期**: 2025-10-18  
**状态**: Draft

---

## 1. 产品定位

### 1.1 项目概述

**novel-writer-skills** 是专为 **Claude Code** 设计的 AI 小说创作工具，深度集成 Claude 的 Slash Commands 和 Agent Skills 系统。

- **技术栈**：Claude Code 专用
- **核心能力**：七步方法论 + Agent Skills 智能辅助
- **目标用户**：使用 Claude Code 进行小说创作的作者

### 1.2 与 novel-writer 的关系

- **novel-writer**：跨平台（13个AI工具），基础方法论
- **novel-writer-skills**：Claude Code 专用，深度增强

**共享**：七步方法论、文件结构、追踪系统
**差异**：移除跨平台支持，新增 Agent Skills 智能系统

---

## 2. 核心架构

### 2.1 技术组件

| 组件 | 说明 |
|------|------|
| **Slash Commands** | Claude Code 斜杠命令，用户主动调用 |
| **Agent Skills** | AI 自动激活的知识库和检查系统 |
| **CLI 工具** | 项目初始化和管理（`novel-skills` 命令） |
| **插件系统** | 可扩展的功能模块 |

### 2.2 项目结构

```
novel-writer-skills/
├── .claude/
│   ├── commands/              # Slash Commands
│   │   ├── constitution.md
│   │   ├── specify.md
│   │   ├── clarify.md
│   │   ├── plan.md
│   │   ├── tasks.md
│   │   ├── write.md
│   │   ├── analyze.md
│   │   └── [追踪命令...]
│   │
│   └── skills/                # Agent Skills
│       ├── genre-knowledge/   # 类型知识库
│       ├── writing-techniques/ # 写作技巧
│       └── quality-assurance/ # 智能检查
│
├── src/                       # CLI 源代码
│   ├── cli.ts
│   ├── init.ts
│   └── utils/
│
├── templates/                 # 项目模板
│   ├── project-template/
│   └── plugin-template/
│
├── plugins/                   # 官方插件
│   ├── authentic-voice/
│   ├── translate/
│   └── [其他插件...]
│
├── docs/                      # 文档
│   ├── getting-started.md
│   ├── commands.md
│   └── skills-guide.md
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. 核心功能

### 3.1 Slash Commands（用户主动调用）

#### 七步方法论命令

| 命令 | 功能 | 输出 |
|------|------|------|
| `/constitution` | 创建创作宪法 | `.specify/memory/constitution.md` |
| `/specify` | 定义故事规格 | `stories/[name]/specification.md` |
| `/clarify` | 澄清模糊点（5个问题） | 更新 specification.md |
| `/plan` | 制定创作计划 | `stories/[name]/creative-plan.md` |
| `/tasks` | 分解任务清单 | `stories/[name]/tasks.md` |
| `/write` | 执行章节写作 | `stories/[name]/content/chapter-XX.md` |
| `/analyze` | 质量验证分析 | 分析报告（双模式：框架/内容） |

#### 追踪与验证命令

| 命令 | 功能 |
|------|------|
| `/track-init` | 初始化追踪系统 |
| `/track` | 综合追踪更新 |
| `/plot-check` | 情节一致性检查 |
| `/timeline` | 时间线管理 |
| `/relations` | 角色关系追踪 |
| `/world-check` | 世界观验证 |
| `/checklist` | 质量检查清单 |

### 3.2 Agent Skills（AI 自动激活）

#### Skills 设计原则

- **被动激活**：AI 根据上下文自动判断
- **无感知**：用户无需手动调用
- **持续应用**：在整个对话中保持活跃

#### Skills 分类

**1. Genre Knowledge Skills（类型知识库）**

根据小说类型自动提供创作惯例和技巧：

- `romance.md` - 言情小说惯例
- `mystery.md` - 推理悬疑技巧
- `fantasy.md` - 奇幻设定规范
- `sci-fi.md` - 科幻世界构建
- `thriller.md` - 惊悚节奏控制

**触发示例**：用户说"我要写言情小说" → romance skill 自动激活

**2. Writing Techniques Skills（写作技巧）**

在特定创作场景自动应用最佳实践：

- `dialogue-techniques.md` - 对话自然度
- `scene-structure.md` - 场景构建
- `character-arc.md` - 角色弧线
- `pacing-control.md` - 节奏把控
- `description-depth.md` - 描写层次

**触发示例**：写对话场景时 → dialogue-techniques 自动激活

**3. Quality Assurance Skills（智能检查）**

写作过程中自动监控和提醒：

- `consistency-checker.md` - 一致性检查（角色、世界观、时间线）
- `pov-validator.md` - 视角验证
- `continuity-tracker.md` - 连续性追踪
- `pacing-monitor.md` - 节奏监控

**触发示例**：写作中检测到矛盾 → 自动警告提示

### 3.3 Skills 与 Commands 协同

```
用户：我要写一部言情小说

[Skills 激活]
✓ romance-novel-conventions (类型知识)
✓ workflow-guide (引导使用七步方法论)

AI 回复：
"很好！让我们用系统化的方法创作。首先执行 /constitution 
定义你的创作原则，然后 /specify 明确故事规格..."

[在后续创作中]
✓ 执行 /write → dialogue-techniques 自动激活
✓ 写作过程 → consistency-checker 后台监控
✓ 发现问题 → 主动提醒用户
```

---

## 4. 技术规范

### 4.1 Slash Command 格式

```markdown
---
description: 命令的简短描述（一句话）
---

# 命令标题

## 目标
[命令要达成什么]

## 流程
[步骤说明]

## 输出
[生成什么文件]

## 示例
[使用示例]
```

### 4.2 Agent Skill 格式

```yaml
---
name: skill-identifier
description: "Use when [触发条件] - [功能说明]"
allowed-tools: Read, Grep, Glob
---

# Skill Title

## Quick Reference
[快速参考表]

## Core Concepts
[核心概念]

## Best Practices
[最佳实践]

## Common Pitfalls
[常见错误]
```

**Description 编写要点**：

- 必须包含明确的触发条件
- 说明提供什么价值
- 示例：`"Use when user mentions romance or love story - provides genre conventions and emotional beat planning for romance writing"`

### 4.3 用户项目结构

使用 `novel-skills init [name]` 初始化后的项目结构：

```
my-novel/
├── .claude/
│   ├── commands/       # 从 novel-writer-skills 复制
│   └── skills/         # 从 novel-writer-skills 复制
│
├── .specify/           # Spec Kit 配置
│   ├── memory/
│   │   └── constitution.md
│   └── scripts/
│
├── stories/
│   └── 001-my-story/
│       ├── specification.md
│       ├── creative-plan.md
│       ├── tasks.md
│       └── content/
│           ├── chapter-01.md
│           └── ...
│
├── spec/
│   ├── tracking/       # 追踪数据
│   │   ├── plot-tracker.json
│   │   ├── timeline.json
│   │   ├── character-state.json
│   │   └── relationships.json
│   │
│   └── knowledge/      # 知识库
│       ├── characters/
│       ├── worldbuilding/
│       └── references/
│
└── README.md
```

---

## 5. CLI 工具

### 5.1 核心命令

```bash
# 安装
npm install -g novel-writer-skills

# 初始化项目
novelwrite init my-novel

# 安装插件
novelwrite plugin:add authentic-voice

# 列出插件
novelwrite plugin:list

# 升级项目
novelwrite upgrade

# 检查状态
novelwrite check
```

### 5.2 初始化流程

```bash
novelwrite init my-novel
```

执行内容：
1. 创建项目目录结构
2. 复制 `.claude/commands/` 和 `.claude/skills/`
3. 初始化 `.specify/` 配置
4. 创建 `spec/tracking/` 模板
5. 生成 README.md

---

## 6. 开发路线图

### 6.1 MVP（4-6周）

**目标**：验证核心功能可用性

**交付物**：
- ✅ 七步方法论 Commands（7个命令）
- ✅ 追踪验证 Commands（6个命令）
- ✅ 2-3 个 Genre Knowledge Skills（romance, mystery, fantasy）
- ✅ 2-3 个 Writing Techniques Skills（dialogue, scene-structure）
- ✅ 1 个 Quality Assurance Skill（consistency-checker）
- ✅ CLI 基础工具（init, plugin）
- ✅ 核心文档

**成功标准**：
- Commands 能正确执行七步流程
- Skills 在正确场景下激活（激活率 > 80%）
- 5-10 位早期用户测试反馈积极

### 6.2 Phase 2（6-8周）

**目标**：完整功能和插件生态

**交付物**：
- ✅ 完整 Genre Skills（5种类型）
- ✅ 完整 Writing Skills（6种技巧）
- ✅ 完整 QA Skills（4种检查）
- ✅ 插件系统完善
- ✅ 官方插件（authentic-voice, translate 等）
- ✅ 插件开发文档

**成功标准**：
- Skills 覆盖主流创作场景
- 一致性检查准确率 > 85%
- 社区开始贡献插件

### 6.3 Phase 3（8-10周）

**目标**：优化和推广

**交付物**：
- ✅ 性能优化（Skills 加载 < 2秒）
- ✅ 高级 Commands（polish-prose, theme-analysis 等）
- ✅ 完整示例项目
- ✅ 视频教程
- ✅ 社区建设

**成功标准**：
- 100+ 活跃用户
- 误报率 < 10%
- GitHub Stars > 200

---

## 7. 成功指标

### 7.1 技术指标

| 指标 | 目标 | 测量方法 |
|------|------|---------|
| Skills 激活准确率 | > 85% | 测试用例通过率 |
| 一致性检查召回率 | > 90% | 已知错误捕获率 |
| Commands 执行成功率 | > 95% | 无错完成率 |
| 加载性能 | < 2秒 | Skills 加载时间 |
| 误报率 | < 10% | 错误警报占比 |

### 7.2 用户指标

| 指标 | 目标 | 测量方法 |
|------|------|---------|
| 月活用户 | 100+ | GitHub insights |
| 留存率（7天） | > 40% | 持续使用统计 |
| 完整流程完成率 | > 60% | 用户完成七步方法论比例 |
| 用户满意度 | > 4.0/5.0 | 问卷调查 |
| 社区贡献 | 5+ PRs/月 | GitHub contributions |

---

## 8. 风险与对策

### 8.1 技术风险

| 风险 | 影响 | 对策 |
|------|------|------|
| Skills 激活不准确 | 用户体验差 | 精心编写 description，充分测试 |
| 误报率高 | 用户信任度下降 | 分级警告（Critical/Warning/Note） |
| 性能问题 | 加载慢，影响使用 | 懒加载，优化 Skill 大小 |

### 8.2 产品风险

| 风险 | 影响 | 对策 |
|------|------|------|
| 只支持 Claude，用户基数小 | 增长受限 | 专注深度而非广度，打造最佳体验 |
| 学习曲线陡峭 | 新用户流失 | 完善文档，提供示例，引导式教程 |
| 社区参与度低 | 生态发展慢 | 激励机制，降低贡献门槛 |

---

## 9. 下一步行动

### 9.1 立即执行（本周）

1. **搭建项目框架**
   - 创建 `novel-writer-skills` 仓库
   - 设置项目结构
   - 配置 TypeScript 和构建工具

2. **实现 CLI 基础**
   - `novel-skills init` 命令
   - 项目模板文件

3. **编写第一个 Command**
   - `/constitution` 命令
   - 测试在 Claude Code 中运行

### 9.2 近期目标（2周内）

1. **完成七步方法论 Commands**
   - 7个核心命令全部实现
   - 编写使用文档

2. **实现 2-3 个基础 Skills**
   - romance-novel-conventions
   - dialogue-techniques
   - consistency-checker

3. **测试与迭代**
   - 邀请 5-10 位早期用户
   - 收集反馈，快速迭代

### 9.3 中期目标（4-6周）

1. **完成 MVP**
   - 所有核心功能实现
   - 文档完善
   - 示例项目

2. **准备发布**
   - npm 包发布
   - GitHub 仓库公开
   - 编写发布说明

---

## 附录

### A. 参考资源

- [Anthropic Agent Skills 文档](https://docs.anthropic.com/en/docs/build-with-claude/agent-skills)
- [Claude Code Slash Commands 规范](https://docs.anthropic.com/en/docs/build-with-claude/slash-commands)
- [novel-writer 项目](https://github.com/wordflowlab/novel-writer)（参考方法论）

### B. 术语表

| 术语 | 说明 |
|------|------|
| **Slash Commands** | 用户在 Claude Code 中输入的 `/` 开头命令 |
| **Agent Skills** | AI 自动激活的知识库和能力模块 |
| **七步方法论** | constitution → specify → clarify → plan → tasks → write → analyze |
| **规格驱动开发（SDD）** | 先定义规格，再执行创作的方法论 |

---

**版本历史**

- v1.0 (2025-10-18): 初始版本，明确产品定位和核心功能

