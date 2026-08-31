/**
 * 
 * @param {Object} params
 * @param {string} params.query  用户具体提出的问题
 * @param {string} [params.conversation_id]  可选的会话id 
 * @returns 
 */
async function chat(params) {
  const queryText = params.query || params.name || params.content || "未提取到有效问题";

  const baseUrl = process.env.DIFY_BASE_URL
  const apiKey = process.env.DIFY_API_KEY

  if (!baseUrl || !apiKey ) {
    throw new Error("Dify-api 插件配置不完整，请检查环境变量。");
  }

  const requestBody = {
    "inputs": {},
    "query": queryText,
    "response_mode": "blocking",
    "user": "openclaw-feishu"
  };

  if (params.conversation_id && params.conversation_id.trim() !== "") {
    requestBody.conversation_id = params.conversation_id;
  }
  try{
    const response = await fetch(`${process.env.DIFY_BASE_URL}/chat-messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();

    if (data.code || data.status === 400) {
      return `Dify 接口报错: ${data.message || '未知错误'}`;
    }
    const rawAnswer = data.answer || "Dify 成功响应，但未解析到 answer 字段。";

    return rawAnswer;
  } catch (err) {
    console.error("[Dify-api] 运行时发生捕获错误:", error.message);
    throw error;
  }
  
}

module.exports = { chat, dify_chat: chat, default: chat }