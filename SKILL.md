---
name: dify-api
description: 调用云端 Dify AI 平台。用于文本分析、对话、知识库查询等 AI 任务。
---

## 认证

所有请求必须包含：
```
Authorization Bearer DIFY_API_KEY
```

## API 类型

### 1. chat API - 对话型应用

适用场景： 多轮对话、聊天机器人

```bash
curl -X POST "http://localhost:8080/v1/chat-messages" \
  --header "Authorization: Bearer DIFY_API_KEY" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "query": "用户的问题",
    "response_mode": "blocking",
    "user": "openclaw-feishu"
}'
```

**继续对话** （使用之前返回的 conversation_id）:
```bash
curl -X POST "http://localhost:8080/v1/chat-messages" \
  --header "Authorization: Bearer DIFY_API_KEY" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "query": "继续的问题",
    "conversation_id": "之前的会话ID",
    "response_mode": "blocking",
    "user": "openclaw-feishu"
}'
```

## 使用示例

当用户请求使用 Dify 时，你可以：

1. **识别任务类型**
   - 对话/聊天 → 使用 Chat API

2. **构建请求**
   - 使用 exec 工具执行 curl 命令
   - 替换 DIFY_API_KEY 为实际密钥
   - 根据用户输入填充参数

3. **返回结果**
   - 解析 JSON 响应
   - 提取 answer 字段
   - 以友好的方式呈现给用户

## 常用参数说明

- `query`: 用户的问题或输入（Chat API）
<!-- - `inputs`: 输入变量对象（Completion/Workflow API） -->
- `user`: 用户标识，用于追踪和分析
- `response_mode`: 
  - `blocking`: 等待完整响应（推荐）
  - `streaming`: 流式响应（实时）
- `conversation_id`: 会话ID（仅 Chat API，继续对话时使用）

## 响应格式

成功响应通常包含：
```json
{
  "answer": "AI生成的回答",
  "conversation_id": "会话ID（Chat）",
  "created_at": 时间戳,
  "id": "消息ID"
}
```

## 错误处理

如果请求失败：
1. 检查 API 端点是否正确
2. 验证 API Key 是否有效
3. 确认网络连接正常
4. 查看错误响应中的提示

## 实际调用示例

用户：请用 Dify 查询我想了解实例长租

你应该：
```bash
exec curl -X POST "http://http://localhost:8080/v1/chat-messages" \
  -H "Authorization: Bearer [从配置中获取]" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "查询我想了解实例长租",
    "user": "openclaw-feishu",
    "response_mode": "blocking"
  }'
```

然后将返回的 answer 以友好方式呈现给用户。

## 注意事项

1. API Key 敏感，不要在日志中明文显示
2. 优先使用 blocking 模式，更稳定
3. user 参数可用于区分不同设备（如 "openclaw-intel" / "openclaw-arm"）
4. 大量请求时注意 API 限流

## 获取 API Key

1. 访问 http://localhost:8080/
2. 登录 Dify
3. 进入应用 → API 访问
4. 复制 API Key

## 技术支持

- 检查 Dify 日志排查问题
- 测试网络连通性：`curl -I http://localhost:8080/`