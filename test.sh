cd /Users/ghj/.openclaw/workspace/skills/dify-api

export DIFY_BASE_URL="http://localhost:8080/v1"
export DIFY_API_KEY="app-Fdm15lnUfPRVkZrRgVY1TePY"

node -e "
const { chat } = require('./index.js');
chat({ name: '实例长租？' })
  .then(res => console.log('\n🎉 Dify 成功返回：\n', res))
  .catch(err => console.error('\n❌ 报错了：', err));
"
