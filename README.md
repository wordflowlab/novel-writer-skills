# Novel Writer Skills - Claude Code 专用小说创作工具

[![npm version](https://badge.fury.io/js/novel-writer-skills.svg)](https://www.npmjs.com/package/novel-writer-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🚀 专为 Claude Code 设计的 AI 智能小说创作助手
>
> 深度集成 Slash Commands 和 Agent Skills，提供最佳创作体验

## ✨ 核心特性

- 📚 **Slash Commands** - Claude Code 斜杠命令，七步方法论完整支持
- 🤖 **Agent Skills** - AI 自动激活的知识库和智能检查系统
- 🎯 **类型知识库** - 自动提供言情、悬疑、奇幻等类型创作惯例
- 🔍 **智能质量检查** - 自动监控一致性、节奏、视角等问题
- 📝 **写作技巧增强** - 对话、场景、角色等专业技巧自动应用
- 🔌 **插件系统** - 可扩展功能，如真实人声、翻译等

## 🚀 快速开始

### 1. 安装

```bash
npm install -g novel-writer-skills
```

### 2. 初始化项目

```bash
# 基本用法
novelwrite init my-novel

# 在当前目录初始化
novelwrite init --here

# 预装插件
novelwrite init my-novel --plugins authentic-voice
```

### 3. 在 Claude Code 中开始创作

在 Claude Code 中打开项目，使用斜杠命令：

```text
/constitution    # 1. 创建创作宪法
/specify         # 2. 定义故事规格
/clarify         # 3. 澄清关键决策
/plan            # 4. 制定创作计划
/tasks           # 5. 分解任务清单
/write           # 6. AI 辅助写作
/analyze         # 7. 质量验证分析
```

## 🎨 Agent Skills 自动激活

### 类型知识库（Genre Knowledge）

当你提到特定类型时，相应的知识库会自动激活：

- 💕 **Romance** - 言情小说惯例和情感节奏
- 🔍 **Mystery** - 推理悬疑技巧和线索管理
- 🐉 **Fantasy** - 奇幻设定规范和世界构建

### 写作技巧（Writing Techniques）

写作过程中自动应用最佳实践：

- 💬 **Dialogue** - 对话自然度和角色声音
- 🎬 **Scene Structure** - 场景构建和节奏控制
- 👤 **Character Arc** - 角色弧线和成长逻辑

### 智能检查（Quality Assurance）

后台自动监控，主动提醒问题：

- ✅ **Consistency Checker** - 一致性检查（角色、世界观、时间线）
- 🧭 **Workflow Guide** - 引导使用七步方法论

## 📚 Slash Commands

### 七步方法论

| 命令 | 功能 | 输出 |
|------|------|------|
| `/constitution` | 创建创作宪法 | `.specify/memory/constitution.md` |
| `/specify` | 定义故事规格 | `stories/[name]/specification.md` |
| `/clarify` | 澄清模糊点（5个问题） | 更新 specification.md |
| `/plan` | 制定创作计划 | `stories/[name]/creative-plan.md` |
| `/tasks` | 分解任务清单 | `stories/[name]/tasks.md` |
| `/write` | 执行章节写作 | `stories/[name]/content/chapter-XX.md` |
| `/analyze` | 质量验证分析 | 分析报告（双模式：框架/内容） |

### 追踪与验证

| 命令 | 功能 |
|------|------|
| `/track-init` | 初始化追踪系统 |
| `/track` | 综合追踪更新 |
| `/plot-check` | 情节一致性检查 |
| `/timeline` | 时间线管理 |
| `/relations` | 角色关系追踪 |
| `/world-check` | 世界观验证 |

## 🔌 插件系统

### 安装插件

```bash
# 列出可用插件
novelwrite plugin:list

# 安装插件
novelwrite plugin:add authentic-voice

# 移除插件
novelwrite plugin:remove authentic-voice
```

### 官方插件

- **authentic-voice** - 真实人声写作插件，提升原创度和生活质感
- 更多插件开发中...

## 📖 项目结构

```text
my-novel/
├── .claude/
│   ├── commands/       # Slash Commands
│   └── skills/         # Agent Skills
│
├── .specify/           # Spec Kit 配置
│   ├── memory/
│   │   └── constitution.md
│   └── templates/
│       ├── scripts/    # 命令行脚本工具
│       │   ├── bash/
│       │   └── powershell/
│       ├── commands/
│       ├── knowledge/
│       └── ...
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

## 🆚 与 novel-writer 的关系

| 特性 | novel-writer | novel-writer-skills |
|------|-------------|-------------------|
| **支持平台** | 13个AI工具（Claude、Cursor、Gemini等） | Claude Code 专用 |
| **核心方法论** | ✅ 七步方法论 | ✅ 七步方法论 |
| **Slash Commands** | ✅ 跨平台命令 | ✅ Claude 优化命令 |
| **Agent Skills** | ❌ 不支持 | ✅ 深度集成 |
| **智能检查** | ⚠️ 手动执行 | ✅ 自动监控 |
| **类型知识库** | ⚠️ 需手动查阅 | ✅ 自动激活 |
| **适用场景** | 需要跨平台支持 | 追求最佳体验（Claude Code） |

**选择建议**：

- 如果你使用多个AI工具 → 选择 **novel-writer**
- 如果你专注 Claude Code → 选择 **novel-writer-skills**

## 🛠️ CLI 命令

### 项目管理

```bash
# 初始化项目
novelwrite init <project-name>

# 检查环境
novelwrite check

# 升级项目
novelwrite upgrade
```

### 插件管理

```bash
# 列出已安装插件
novelwrite plugin:list

# 安装插件
novelwrite plugin:add <plugin-name>

# 移除插件
novelwrite plugin:remove <plugin-name>
```

## 🔧 命令行脚本（可选）

除了 Claude Code 中的 Slash Commands，项目还包含命令行脚本工具：

### 脚本位置

初始化项目后，脚本位于：`.specify/templates/scripts/`

```text
.specify/templates/scripts/
├── bash/          # macOS/Linux 脚本
└── powershell/    # Windows 脚本
```

### 使用场景

- ✅ **命令行替代** - 在终端中直接执行七步方法论
- ✅ **自动化工作流** - 集成到 CI/CD 或批处理脚本
- ✅ **批量操作** - 处理多个故事或批量检查
- ✅ **独立使用** - 不依赖 Claude Code 的场景

### 快速示例

**macOS/Linux:**

```bash
# 创建宪法
bash .specify/templates/scripts/bash/constitution.sh

# 定义规格
bash .specify/templates/scripts/bash/specify-story.sh

# 追踪进度
bash .specify/templates/scripts/bash/track-progress.sh
```

**Windows:**

```powershell
# 创建宪法
.\.specify\templates\scripts\powershell\constitution.ps1

# 定义规格
.\.specify\templates\scripts\powershell\specify-story.ps1

# 追踪进度
.\.specify\templates\scripts\powershell\track-progress.ps1
```

### 可用脚本

所有 Slash Commands 都有对应的脚本版本：

| 脚本 | 功能 | 对应命令 |
|-----|------|---------|
| `constitution` | 创建创作宪法 | `/constitution` |
| `specify-story` | 定义故事规格 | `/specify` |
| `plan-story` | 制定创作计划 | `/plan` |
| `track-progress` | 追踪进度 | `/track` |
| `check-consistency` | 一致性检查 | - |
| 以及更多... | 查看 `.specify/templates/scripts/README.md` | - |

📖 **详细文档**：[scripts/README.md](templates/scripts/README.md)

### 何时使用脚本 vs Slash Commands

| 场景 | 推荐方式 |
|-----|---------|
| 日常创作、需要 AI 协助 | ✅ Slash Commands (优先) |
| 批量处理、自动化 | ✅ 命令行脚本 |
| CI/CD 集成 | ✅ 命令行脚本 |
| 快速检查验证 | ✅ 命令行脚本 |

## 📚 文档

- [入门指南](docs/getting-started.md) - 详细安装和使用教程
- [命令详解](docs/commands.md) - 所有命令的完整说明
- [Skills 指南](docs/skills-guide.md) - Agent Skills 工作原理
- [脚本工具集](templates/scripts/README.md) - 命令行脚本使用指南
- [插件开发](docs/plugin-development.md) - 如何开发自己的插件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

项目地址：[https://github.com/wordflowlab/novel-writer-skills](https://github.com/wordflowlab/novel-writer-skills)

## 📄 许可证

MIT License

## 🙏 致谢

本项目基于 [novel-writer](https://github.com/wordflowlab/novel-writer) 的方法论，专为 Claude Code 深度优化。

---

**Novel Writer Skills** - 让 Claude Code 成为你的最佳创作伙伴！ ✨📚
