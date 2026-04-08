/**
 * 抖音搜索内容 API 测试脚本
 *
 * 使用方法：
 * 1. 确保已运行 pnpm install
 * 2. 运行: node test-search-content.mjs
 */

import cookies from './cookies.json' with { type: 'json' }

function cookiesToString (cookiesArray) {
  return cookiesArray
    .filter(cookie => cookie.name && cookie.value)
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ')
}

const COOKIE = cookiesToString(cookies)

// 搜索用户列表
const QUERIES = [
  '46879740177',
  '7322272',
  '96195372132',
  '93554752930',
  '70015346582',
  '42577882655',
  '28563651552',
  '43265204506',
  'Lidongxu4869'
]

async function testSearchContent () {
  try {
    console.log('开始测试抖音搜索内容 API...\n')
    console.log('Cookie 长度:', COOKIE.length, '字符')
    console.log('搜索用户数量:', QUERIES.length, '\n')

    // 导入构建后的包
    const { createAmagiClient } = await import('./packages/core/dist/default/index.mjs')

    // 创建客户端
    const client = createAmagiClient({ cookies: { douyin: COOKIE } })

    const allResults = []

    // 循环搜索每个用户
    for (const query of QUERIES) {
      console.log(`正在搜索: ${query}`)

      const params = {
        type: 'user',
        query,
        number: 20
      }

      // 调用搜索内容 API
      const result = await client.douyin.fetcher.searchContent(params)

      if (result.success && result.data.user_list) {
        // 从 user_list 中找到 unique_id 匹配的用户
        const matchedUser = result.data.user_list.find(u => u.user_info.unique_id === query)
        if (matchedUser) {
          const { uid, short_id, nickname, sec_uid } = matchedUser.user_info
          allResults.push({ uid, short_id, nickname, sec_uid })
          console.log(`✅ ${query} 找到用户: ${nickname}`)
        } else {
          console.log(`❌ ${query} 未找到匹配用户`)
        }
      } else {
        console.log(`❌ ${query} 请求失败:`, result.message)
      }

      // 延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 10000))
    }

    // 写入所有结果到 result.json
    const fs = await import('fs')
    fs.writeFileSync('result.json', JSON.stringify(allResults, null, 2))
    console.log('\n所有结果已写入 result.json')
  } catch (error) {
    console.error('❌ 发生错误:')
    console.error(error.message)
    console.error('\n错误堆栈:', error.stack)
  }
}

// 运行测试
testSearchContent()
