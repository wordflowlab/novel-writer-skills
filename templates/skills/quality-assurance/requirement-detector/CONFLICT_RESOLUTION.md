# 多规范探测与冲突处理

当探测到多个规范关键词时，需要进行冲突检测并提供解决方案。

---

## 兼容组合示例

### fast-paced + anti-ai-v4

**用户说**：
> "我要写爽文，节奏快，而且要去AI味"

**处理方式**：
```markdown
🔍 多规范探测结果

检测到：
- fast-paced（因为"爽文、节奏快"）
- anti-ai-v4（因为"去AI味"）

这两个规范可以组合使用！

推荐配置：
writing-requirements:
  - fast-paced
  - anti-ai-v4

效果：快节奏爽文 + 强力去AI味 = 自然流畅的商业化网文

确认应用这个组合吗？
```

---

## 冲突组合示例

### serious-literature + fast-paced

**用户说**：
> "我要写严肃文学，但也要每章都有爽点"

**处理方式**：
```markdown
⚠️ 规范冲突检测

检测到：
- serious-literature（严肃文学） - 要求慢节奏、深度
- fast-paced（快节奏爽文） - 要求每章2个爽点

这两个规范有根本冲突：
- 严肃文学：慢节奏、思想性、开放结局
- 快节奏爽文：密集冲突、爽感优先、套路化

建议：
1. 选择 serious-literature，放弃"每章爽点"要求
2. 选择 fast-paced，调整为"有深度的爽文"
3. 考虑使用 strong-emotion（强情绪）作为折中

你倾向哪个方向？
```

---

### romance-sweet + romance-angst

**用户说**：
> "我要写甜文，但也要虐一下"

**处理方式**：
```markdown
⚠️ 甜虐冲突检测

检测到：
- romance-sweet（甜文） - 禁止长时间虐
- romance-angst（虐文） - 需要虐心情节

建议处理方式：

1. **先甜后虐**（虐恋）
   - 前半部分：romance-sweet
   - 后半部分：romance-angst

2. **虐中带甜**（微虐）
   - 主要：romance-sweet
   - 允许：短暂小虐（1-2章）
   - 甜虐比例：80% 甜 / 20% 虐

3. **BE甜文**（先甜后刀）
   - 前期：romance-sweet
   - 结局：romance-angst（BE）

你想要哪种模式？
```

---

## 冲突矩阵

| 组合 | 兼容性 | 说明 |
|------|--------|------|
| anti-ai-v4 + fast-paced | ✅ 兼容 | 极致自然的爽文 |
| anti-ai-v4 + no-poison | ✅ 兼容 | 自然且逻辑合理 |
| anti-ai-v4 + romance-sweet | ✅ 兼容 | 自然的甜文 |
| fast-paced + no-poison | ✅ 兼容 | 合理的爽文 |
| fast-paced + strong-emotion | ✅ 兼容 | 情绪饱满的爽文 |
| serious-literature + fast-paced | ❌ 冲突 | 慢节奏 vs 快节奏 |
| serious-literature + romance-sweet | ⚠️ 谨慎 | 可以尝试，但需平衡 |
| romance-sweet + romance-angst | ❌ 冲突 | 甜 vs 虐 |

---

## 处理原则

1. **优先用户意图**：尊重用户明确表达的偏好
2. **提供选项**：遇到冲突时给出解决方案
3. **解释原因**：说明为什么冲突
4. **支持组合**：对于兼容的组合，鼓励使用
5. **允许调整**：支持中途切换规范
