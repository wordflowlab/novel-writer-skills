---
name: timeline
description: 管理和验证故事时间线
argument-hint: [add | check | show | sync]
allowed-tools: Read(//spec/tracking/timeline.json), Read(spec/tracking/timeline.json), Write(//spec/tracking/timeline.json), Write(spec/tracking/timeline.json), Read(//stories/**/content/**), Read(stories/**/content/**), Bash(find:*), Bash(*)
model: claude-sonnet-4-5-20250929
scripts:
  sh: .specify/scripts/bash/check-timeline.sh
  ps: .specify/scripts/powershell/check-timeline.ps1
---

# 时间线管理

维护故事的时间轴，确保时间逻辑的一致性。

## 功能

1. **时间记录** - 追踪每个章节的时间点
2. **并行事件** - 管理同时发生的多线剧情
3. **历史对照** - 与真实历史事件对比（历史小说）
4. **逻辑验证** - 检查时间跨度的合理性

## 使用方法

执行脚本 {SCRIPT}，支持以下操作：
- `add` - 添加时间节点
- `check` - 验证时间连续性
- `show` - 显示时间线概览
- `sync` - 同步并行事件

## 时间线数据

时间线信息存储在 `spec/tracking/timeline.json` 中：
- 故事内时间（年/月/日）
- 章节对应关系
- 重要事件标记
- 时间跨度计算

## 示例输出

```
📅 故事时间线
━━━━━━━━━━━━━━━━━━━━
当前时间：万历三十年春

第1章  | 万历二十九年冬月 | 穿越事件
第4章  | 万历三十年正月   | 北上赴考
第6章  | 万历三十年二月   | 会试
第8章  | 万历三十年三月   | 殿试
第61章 | 万历三十年四月   | [待写]

⏱️ 时间跨度：5个月
🔄 并行事件：日本入侵朝鲜
```
