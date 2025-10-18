# 写作知识库系统

## 概述

这是 Novel Writer Skills 的核心竞争力 - 一个可扩展的通用写作知识库系统。

**与项目特定知识的区别**：
- `spec/knowledge/` - 存放项目特定知识（角色档案、地点、世界观等）
- `templates/knowledge-base/`（本目录）- 存放通用写作知识（类型惯例、技法、参考资料）

**工作原理**：
1. **自动激活**：setting-detector Skill根据关键词映射表自动检测故事设定
2. **按需加载**：只加载相关的知识库，节省token（单个知识库~500 tokens）
3. **持续应用**：知识库在整个创作过程中保持激活

**Token效率**：
- 传统方案（50个Skill）：~2000 tokens
- 当前方案（1个detector + 按需知识库）：~600 tokens
- **节省75%**

---

## 📚 知识库索引

### 1. 类型知识库（Genres）

专业类型小说的创作惯例和最佳实践。

| 文件 | 类型 | 关键惯例 |
|------|------|---------|
| `genres/romance.md` | 言情小说 | HEA结局、情感节奏点、关系弧 |
| `genres/mystery.md` | 悬疑推理 | 公平游戏、线索管理、嫌疑人设计 |
| `genres/historical.md` | 历史小说 | 考据平衡、时代氛围、历史白描 |
| `genres/revenge.md` | 复仇爽文 | 节奏控制、打脸设计、情绪管理 |
| `genres/wuxia.md` | 武侠小说 | 江湖规则、武学体系、侠义精神 |

### 2. 写作技法知识库（Craft）

跨类型适用的专业写作技巧。

| 文件 | 技法 | 核心原则 |
|------|------|---------|
| `craft/dialogue.md` | 对话技巧 | 潜台词、角色声音、自然感 |
| `craft/scene-structure.md` | 场景结构 | 目标-冲突-灾难、续场模型 |
| `craft/character-arc.md` | 角色弧线 | 改变机制、内外冲突、成长逻辑 |
| `craft/pacing.md` | 节奏控制 | 张弛有度、高潮设计、过渡管理 |
| `craft/show-not-tell.md` | 展示技巧 | 感官细节、行为暗示、避免说教 |

### 3. 参考资料库（References）

特定时代、文化、背景的真实资料。

| 目录 | 内容 | 用途 |
|------|------|------|
| `references/china-1920s/` | 1920年代中国 | 军阀混战、社会风貌、日常生活 |
| └─ `warlords.md` | 军阀体系 | 派系关系、军队编制、权力结构 |
| └─ `society.md` | 社会结构 | 阶层分化、城乡对比、教育状况 |
| └─ `daily-life.md` | 日常生活 | 衣食住行、货币物价、娱乐文化 |

**未来扩展**：
- `references/ancient-china/` - 古代中国各朝代
- `references/modern-workplace/` - 现代职场
- `references/mythology/` - 神话体系
- ...（可无限扩展）

---

## 🔍 关键词映射表

**用途**：供 `setting-detector` Skill 使用，根据用户输入的关键词自动激活对应知识库。

### 类型知识库关键词

```yaml
romance:
  keywords: [言情, 爱情, 恋爱, 浪漫, 感情线, 关系弧, CP, 甜文, 虐文]
  auto_load: genres/romance.md

mystery:
  keywords: [悬疑, 推理, 侦探, 破案, 谜团, 线索, 真相, 凶手, 犯罪]
  auto_load: genres/mystery.md

historical:
  keywords: [历史, 古代, 朝代, 考据, 时代背景, 历史小说]
  auto_load: genres/historical.md

revenge:
  keywords: [复仇, 报仇, 打脸, 爽文, 逆袭, 反击]
  auto_load: genres/revenge.md

wuxia:
  keywords: [武侠, 江湖, 武功, 侠客, 门派, 武学, 剑客]
  auto_load: genres/wuxia.md
```

### 写作技法关键词

```yaml
dialogue:
  triggers: [对话, 角色说话, 台词, 交流场景, 谈话]
  auto_load: craft/dialogue.md

scene-structure:
  triggers: [场景, 章节结构, 情节推进, 场景设计]
  auto_load: craft/scene-structure.md

character-arc:
  triggers: [角色成长, 人物弧线, 角色改变, 性格转变]
  auto_load: craft/character-arc.md

pacing:
  triggers: [节奏, 快慢, 拖沓, 高潮, 张力]
  auto_load: craft/pacing.md

show-not-tell:
  triggers: [展示, 具象化, 说教, 感官细节, 描写]
  auto_load: craft/show-not-tell.md
```

### 参考资料关键词

```yaml
china-1920s:
  keywords: [1920, 民国, 军阀, 北洋, 穿越民国, 二十年代]
  auto_load:
    - references/china-1920s/warlords.md
    - references/china-1920s/society.md
    - references/china-1920s/daily-life.md
```

---

## 🛠️ 使用指南

### 自动激活流程

1. **用户提到关键词**：
   ```
   用户："我要写一部1920年代的言情复仇小说"
   ```

2. **setting-detector 检测**：
   - 检测到 "1920" → 激活 `references/china-1920s/`
   - 检测到 "言情" → 激活 `genres/romance.md`
   - 检测到 "复仇" → 激活 `genres/revenge.md`

3. **按需加载**：
   ```
   ✓ 已加载 genres/romance.md (520 tokens)
   ✓ 已加载 genres/revenge.md (480 tokens)
   ✓ 已加载 references/china-1920s/*.md (650 tokens)

   总计：~1650 tokens（仅加载相关知识）
   ```

4. **持续应用**：
   - 在 `/specify` 时：建议关键元素
   - 在 `/plan` 时：提供结构框架
   - 在 `/write` 时：实时写作建议
   - 在 `/analyze` 时：类型惯例检查

### 手动指定加载

如果自动检测失败，用户可以明确指定：

```
"请加载 romance 和 mystery 知识库"
"这个故事需要 1920s 中国参考资料"
```

### 查看当前激活的知识库

用户可随时询问：
```
"当前激活了哪些知识库？"
```

AI会回复：
```
📚 当前激活的知识库：
✓ genres/romance.md - 言情小说惯例
✓ genres/revenge.md - 复仇爽文技巧
✓ references/china-1920s/ - 1920年代中国资料
```

---

## 📦 知识库扩展

### 添加新知识库

1. **确定类别**：genres / craft / references

2. **创建文件**：
   ```bash
   # 类型知识
   touch templates/knowledge-base/genres/sci-fi.md

   # 写作技法
   touch templates/knowledge-base/craft/worldbuilding.md

   # 参考资料
   mkdir -p templates/knowledge-base/references/ancient-rome
   touch templates/knowledge-base/references/ancient-rome/military.md
   ```

3. **更新映射表**：在本 README 的关键词映射表中添加对应条目

4. **编写内容**：参考现有知识库的格式（500-800行）

### 知识库格式规范

每个知识库文件应包含：

```markdown
# [知识库标题]

## 快速参考（Quick Reference）
[1-3段概述，说明核心原则]

## 核心原则（Core Principles）
[3-5个关键法则，带详细解释]

## 实践应用（Practical Application）
[如何在各个创作阶段应用这些知识]

## 常见陷阱（Common Pitfalls）
[类型新人常犯的错误及避免方法]

## 示例分析（Examples）
[经典作品案例分析]

## 与Commands的集成（Integration with Commands）
[在/specify, /plan, /write, /analyze中如何应用]
```

### 从经典小说提取知识库

未来可以解构经典小说，提取为知识库：

```bash
# 示例：从《三体》提取硬科幻知识
templates/knowledge-base/genres/hard-sci-fi.md

# 从《红楼梦》提取家族叙事知识
templates/knowledge-base/craft/family-saga.md
```

---

## 📊 知识库状态

**当前状态**：初始版本

| 类别 | 已完成 | 计划中 | 总计 |
|------|--------|--------|------|
| 类型知识 | 5 | 10+ | 15+ |
| 写作技法 | 5 | 8+ | 13+ |
| 参考资料 | 1 | 20+ | 21+ |

**下一步扩展计划**：
- [ ] 奇幻小说（fantasy）
- [ ] 科幻小说（sci-fi）
- [ ] 恐怖小说（horror）
- [ ] 世界构建技法（worldbuilding）
- [ ] 古代中国各朝代参考资料
- [ ] 现代都市参考资料

---

## 🔗 相关文档

- **Skills指南**：`docs/skills-guide.md` - 了解 setting-detector Skill 如何使用本知识库
- **插件开发**：`docs/plugin-development.md` - 如何开发知识库插件
- **命令详解**：`docs/commands.md` - 知识库如何增强各个命令

---

**知识库系统 = Novel Writer Skills 的长期竞争力**

让专业知识为你的创作保驾护航！ ✨📚
