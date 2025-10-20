# 脚本工具集

本目录包含 Novel Writer Skills 的命令行脚本工具，作为 Claude Code Slash Commands 的替代方案。

## 📂 目录结构

```text
scripts/
├── bash/          # macOS/Linux 脚本
├── powershell/    # Windows 脚本
└── README.md      # 本文档
```

## 🔄 novel-writer-skills 适配说明

这些脚本已从 [novel-writer](https://github.com/wordflowlab/novel-writer) 移植并适配到 novel-writer-skills 项目结构：

### 路径差异

| 文件 | novel-writer | novel-writer-skills |
|------|-------------|-------------------|
| 宪法文件 | `memory/constitution.md` | `.specify/memory/constitution.md` |
| 故事规格 | `stories/*/specification.md` | `stories/*/specification.md` ✅ |
| 追踪数据 | `spec/tracking/*.json` | `spec/tracking/*.json` ✅ |

**所有脚本已自动适配新路径**，无需手动修改！

## 🎯 使用场景

虽然 Novel Writer Skills 主要为 Claude Code 设计，但这些脚本提供了：

- ✅ **命令行替代方案** - 在终端中直接执行操作
- ✅ **自动化工作流** - 集成到 CI/CD 或自动化脚本中
- ✅ **批处理操作** - 处理多个故事或批量检查
- ✅ **独立工具** - 不依赖 Claude Code 的独立功能

## 🚀 快速开始

### macOS/Linux 用户

```bash
# 进入项目根目录
cd my-novel

# 使用脚本（示例：创建宪法）
bash .specify/templates/scripts/bash/constitution.sh

# 或者添加到 PATH
export PATH="$PATH:$(pwd)/.specify/templates/scripts/bash"
constitution.sh
```

### Windows 用户

```powershell
# 进入项目根目录
cd my-novel

# 使用脚本（示例：创建宪法）
.\.specify\templates\scripts\powershell\constitution.ps1

# 或者添加到环境变量
$env:PATH += ";$(Get-Location)\.specify\templates\scripts\powershell"
constitution.ps1
```

## 📚 核心脚本

### 七步方法论

| 脚本 | 功能 | 对应命令 |
|-----|------|---------|
| `constitution.sh/ps1` | 创建创作宪法 | `/constitution` |
| `specify-story.sh/ps1` | 定义故事规格 | `/specify` |
| `clarify-story.sh/ps1` | 澄清模糊点 | `/clarify` |
| `plan-story.sh/ps1` | 制定创作计划 | `/plan` |
| `generate-tasks.sh/ps1` | 生成任务清单 | `/tasks` |
| `analyze-story.sh/ps1` | 质量验证分析 | `/analyze` |

### 追踪与检查

| 脚本 | 功能 | 对应命令 |
|-----|------|---------|
| `init-tracking.sh/ps1` | 初始化追踪系统 | `/track-init` |
| `track-progress.sh/ps1` | 综合追踪更新 | `/track` |
| `check-plot.sh/ps1` | 情节一致性检查 | `/plot-check` |
| `check-timeline.sh/ps1` | 时间线管理 | `/timeline` |
| `manage-relations.sh/ps1` | 角色关系追踪 | `/relations` |
| `check-world.sh/ps1` | 世界观验证 | `/world-check` |
| `check-consistency.sh/ps1` | 一致性检查 | - |
| `check-writing-state.sh/ps1` | 写作状态检查 | - |

### 工具脚本

| 脚本 | 功能 |
|-----|------|
| `common.sh/ps1` | 通用函数库（被其他脚本引用） |
| `text-audit.sh/ps1` | 文本审计工具 |
| `test-word-count.sh` | 字数统计（仅 bash） |

## 🔧 通用函数库

`common.sh` 和 `common.ps1` 提供了以下公共函数：

### Bash 函数

```bash
get_project_root()    # 获取项目根目录
get_current_story()   # 获取当前故事目录
get_active_story()    # 获取活跃故事名称
create_numbered_dir() # 创建带编号的目录
```

### PowerShell 函数

```powershell
Get-ProjectRoot       # 获取项目根目录
Get-CurrentStoryDir   # 获取当前故事目录
Get-ActiveStory       # 获取活跃故事名称
```

## ⚠️ 注意事项

1. **项目根目录识别** - 脚本通过查找 `.specify/config.json` 确定项目根目录
2. **执行权限** - Linux/macOS 用户需要确保脚本有执行权限：
   ```bash
   chmod +x .specify/templates/scripts/bash/*.sh
   ```
3. **与 Slash Commands 的区别**：
   - Slash Commands 在 Claude Code 中使用，有 AI 交互能力
   - 脚本适合自动化和批处理，无 AI 交互
   - 推荐优先使用 Slash Commands 以获得最佳体验

## 🆚 何时使用脚本 vs Slash Commands

| 场景 | 推荐方式 |
|-----|---------|
| 日常创作、需要 AI 协助 | ✅ Slash Commands |
| 批量处理、自动化 | ✅ 脚本 |
| CI/CD 集成 | ✅ 脚本 |
| 学习和理解工作流 | ✅ 脚本（可查看源码） |
| 快速检查和验证 | ✅ 脚本 |

## 📖 示例：完整工作流

```bash
# 1. 创建宪法
bash constitution.sh

# 2. 定义故事规格
bash specify-story.sh

# 3. 澄清模糊点（通常需要人工参与）
bash clarify-story.sh

# 4. 制定计划
bash plan-story.sh

# 5. 生成任务
bash generate-tasks.sh

# 6. 初始化追踪
bash init-tracking.sh

# 7. 写作过程中定期追踪
bash track-progress.sh

# 8. 最终分析
bash analyze-story.sh
```

## 🔗 相关文档

- [Novel Writer Skills 主文档](../../README.md)
- [命令详解](../../docs/commands.md)
- [入门指南](../../docs/getting-started.md)

## 💡 提示

这些脚本是从 [novel-writer](https://github.com/wordflowlab/novel-writer) 项目移植而来，经过调整以适配 Novel Writer Skills 的项目结构。

如果你在多个 AI 工具间切换，也可以考虑使用完整版的 [novel-writer](https://github.com/wordflowlab/novel-writer)。

---

**Happy Writing!** ✨📚

