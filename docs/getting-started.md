# Novel Writer Skills 入门指南

欢迎使用 **Novel Writer Skills** - 专为 Claude Code 设计的 AI 小说创作工具！

## 快速开始

### 1. 安装

```bash
npm install -g novel-writer-skills
```

### 2. 创建你的第一个项目

```bash
# 创建新项目
novelwrite init my-first-novel

# 进入项目目录
cd my-first-novel
```

### 3. 在 Claude Code 中打开

在 Claude Code 中打开项目文件夹，你将看到：

```
my-first-novel/
├── .claude/
│   ├── commands/      # 13 个斜杠命令
│   └── skills/        # 7 个 Agent Skills
├── .specify/
├── stories/
└── spec/
```

## 七步创作流程

### 第一步：创建创作宪法

在 Claude Code 中输入：

```
/constitution
```

这将引导你定义：
- ✅ 核心创作原则
- ✅ 质量标准
- ✅ 风格偏好
- ✅ 内容规范

**预计时间**：15-20 分钟

### 第二步：定义故事规格

```
/specify
```

明确你的故事：
- 📖 一句话概括
- 👥 目标读者
- ⚔️ 核心冲突
- 👤 主要角色
- 🎯 成功标准

**预计时间**：30-45 分钟

### 第三步：澄清模糊点

```
/clarify
```

AI 会通过 5 个关键问题帮你：
- ❓ 识别规格中的模糊点
- 💡 做出清晰决策
- 📝 自动更新规格文档

**预计时间**：10-15 分钟

### 第四步：制定创作计划

```
/plan
```

设计具体实现方案：
- 📚 章节结构
- 📈 节奏分布
- 🎭 角色弧线
- 🔮 伏笔计划

**预计时间**：45-60 分钟

### 第五步：分解任务清单

```
/tasks
```

生成可执行任务：
- ✅ 按优先级排序
- 🔗 标明依赖关系
- ⏱️ 估算工作量

**预计时间**：20-30 分钟

### 第六步：开始写作

```
/write
```

AI 辅助创作：
- 🤖 根据规格和计划生成内容
- 🎨 自动应用类型知识
- 🔍 后台一致性检查
- ⚡ 实时写作技巧应用

**建议节奏**：每次 1-2 章，每 3-5 章停下来分析

### 第七步：质量验证

```
/analyze
```

全面质量检查：
- ✅ 宪法合规性
- ✅ 规格满足度
- ✅ 内容一致性
- ✅ 质量标准达成

**建议频率**：每 5 章运行一次

## Agent Skills 自动激活

### 无需手动调用

当你创作时，相关 Skills 会**自动激活**：

**类型知识**：
- 提到"言情" → Romance Skill 激活
- 提到"悬疑" → Mystery Skill 激活
- 提到"奇幻" → Fantasy Skill 激活

**写作技巧**：
- 写对话时 → Dialogue Techniques 激活
- 写场景时 → Scene Structure 激活

**质量保证**：
- 写作过程中 → Consistency Checker 后台监控
- 整个流程中 → Workflow Guide 保持活跃

### 主动提醒

Skills 会在检测到问题时主动提醒：

```
⚠️ 一致性检查警报

问题：角色特征不匹配
位置：第 5 章，第 3 段

当前文本："玛丽的绿色眼睛..."
已建立特征："眼睛颜色：蓝色"

你想让我修复吗？
```

## 追踪与验证命令

### 初始化追踪系统

```
/track-init
```

首次使用，创建追踪文件。

### 综合追踪

```
/track
```

每完成一章后运行，更新：
- 📊 情节追踪
- ⏰ 时间线
- 👥 角色关系
- 🌍 世界观状态

### 专项检查

```
/plot-check   # 情节一致性
/timeline     # 时间线管理
/relations    # 角色关系
/world-check  # 世界观验证
```

## 插件系统

### 查看已安装插件

```bash
novelwrite plugin:list
```

### 安装插件

```bash
novelwrite plugin:add authentic-voice
```

### 移除插件

```bash
novelwrite plugin:remove authentic-voice
```

### 官方插件

- **authentic-voice**：真实人声写作插件，提升原创度

## 常见问题

### Q: 我可以跳过某些步骤吗？

A: 可以，但有些命令相互依赖：
- `/write` 需要 `/specify` 和 `/plan`
- 最小流程：`/constitution` → `/specify` → `/write`

### Q: Skills 会不会干扰我的创作？

A: 不会！Skills 是**被动的**：
- 只在相关时激活
- 提供建议而非强制
- 你始终有最终决定权

### Q: 如何调整一致性检查的严格度？

A: 在对话中告诉 AI：
```
"请使用灵活模式进行一致性检查，
因为这是奇幻小说。"
```

### Q: 我已经有大纲了，怎么办？

A: 使用 `/specify` 将现有大纲转换为 novelwrite 格式，
然后继续后续步骤。

## 下一步

### 深入学习

- 📖 [命令详解](commands.md) - 所有命令的详细说明
- 🎨 [Skills 指南](skills-guide.md) - Skills 工作原理
- 🔌 [插件开发](plugin-development.md) - 创建自己的插件

### 示例项目

查看 `examples/` 目录中的示例项目，了解完整工作流。

### 社区支持

- 💬 GitHub Discussions：https://github.com/wordflowlab/novel-writer-skills/discussions
- 🐛 Bug 报告：https://github.com/wordflowlab/novel-writer-skills/issues
- 📧 邮件支持：support@wordflowlab.com

---

**准备好了吗？** 创建你的第一个项目，开始你的小说创作之旅！

```bash
novelwrite init my-amazing-novel
cd my-amazing-novel
# 在 Claude Code 中打开，输入 /constitution 开始
```

祝创作愉快！ ✨📚

