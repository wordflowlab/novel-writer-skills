# 完整对话示例和成功案例

本文档展示 requirement-detector 在实际使用中的完整对话流程。

---

## 示例 1：基础规范探测

**用户**：
> "我要写现代言情，甜文，但不能有AI味"

**requirement-detector 响应**：
```
📋 规范探测器已激活

检测到关键词：
- "甜文" → romance-sweet
- "不能有AI味" → anti-ai-v4

建议规范组合：
1. romance-sweet（甜文规范）
2. anti-ai-v4（强力AI去味）

✅ 已加载规范文档
✅ 已写入配置：
   writing-requirements:
     - romance-sweet
     - anti-ai-v4

配合建议：
💡 检测到"现代言情"，建议同时激活
   style-detector 选择 natural-voice 风格。
```

---

## 示例 2：与 style-detector 协同

**用户**：
> "我要写都市爽文，口语化，去AI味"

**system（两个detector协同）**：
```
🎨 style-detector 已激活
检测到：口语化 → natural-voice

📋 requirement-detector 已激活
检测到：爽文 → fast-paced
检测到：去AI味 → anti-ai-v4

✅ 推荐配置组合：

风格层：natural-voice
规范层：fast-paced + anti-ai-v4

最终效果：
自然口语化的快节奏爽文，强力去AI味

已写入配置：
---
writing-style: natural-voice
writing-requirements:
  - fast-paced
  - anti-ai-v4
---

这个组合特别适合你的需求，确认应用吗？
```

---

## 示例 3：冲突处理

**用户**：
> "我要写严肃文学，但也要每章都有爽点"

**requirement-detector 响应**：
```
⚠️ 规范冲突检测

检测到：
- serious-literature（因为"严肃文学"）
- fast-paced（因为"每章都有爽点"）

这两个规范有根本冲突：
- 严肃文学：慢节奏、思想性
- 快节奏爽文：密集冲突、爽感优先

建议：
1. 选择 serious-literature，调整"爽点"为"情感高潮点"
   → 可以使用 strong-emotion 代替 fast-paced
2. 选择 fast-paced，调整为"有深度的爽文"
   → 降低爽点密度，增加思想性

你倾向哪个方向？
```

---

## 示例 4：主动建议

**用户已经选择了 natural-voice 风格**

**requirement-detector 主动建议**：
```
💡 规范建议

检测到你选择了 natural-voice（自然人声风格）

建议配套规范：
1. **anti-ai-v4** - 与 natural-voice 完美配合，极致自然
2. **no-poison** - 保证逻辑合理，避免降智
3. **fast-paced**（可选） - 如果写商业化爽文

推荐组合：
natural-voice + anti-ai-v4 + no-poison
= 极致自然、逻辑自洽的现代小说

需要我加载这些规范吗？
```

---

## 使用技巧

1. **明确需求**：说清楚你要什么效果（爽文、虐文、去AI味等）
2. **信任探测**：探测器会基于经验给出推荐
3. **组合使用**：多个兼容的规范可以叠加
4. **注意冲突**：遇到冲突时，选择最重要的需求
5. **配合风格**：规范（requirement）+ 风格（style）效果更好

---

## 常见问题

**Q：可以同时使用多个规范吗？**
A：可以，但要注意兼容性。参考 [CONFLICT_RESOLUTION.md](CONFLICT_RESOLUTION.md)。

**Q：anti-ai-v4 和 anti-ai-v3 有什么区别？**
A：v4 是强力版本，限制更严格；v3 是标准版本，更平衡。

**Q：爽文规范会影响文学性吗？**
A：fast-paced 强调节奏和爽点，与 serious-literature 有冲突。但可以和 literary 风格配合。

**Q：甜文和虐文能混合吗？**
A：不推荐，但可以分阶段使用（先甜后虐）。详见 CONFLICT_RESOLUTION.md。
