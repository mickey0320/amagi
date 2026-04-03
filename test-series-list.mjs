/**
 * 抖音系列列表 API 测试脚本
 *
 * 使用方法：
 * 1. 确保已运行 pnpm install
 * 2. 运行: node test-series-list.mjs
 */

import cookies from './cookies.json' with { type: 'json' }

function cookiesToString (cookiesArray) {
  return cookiesArray
    .filter(cookie => cookie.name && cookie.value)
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ')
}

const COOKIE = cookiesToString(cookies)
const SEC_USER_ID = 'MS4wLjABAAAAEmq0G_fkKBFyW2cygI3w8-MEcV5hW6fR7SPip3VQ-YUkDOplV5lR1NVE8gs8hB6T'

async function testSeriesList () {
  try {
    console.log('开始测试抖音系列列表 API...\n')
    console.log('使用的 sec_uid:', SEC_USER_ID)
    console.log('Cookie 长度:', COOKIE.length, '字符\n')

    // 导入构建后的包
    const { douyinFetcher, validateDouyinParams } = await import('./packages/core/dist/default/index.mjs')

    // 先测试参数验证
    console.log('测试参数验证...')
    try {
      const validated = validateDouyinParams('seriesList', { sec_uid: SEC_USER_ID, number: 20, cursor: 0 })
      console.log('✅ 参数验证通过:', JSON.stringify(validated, null, 2))
    } catch (e) {
      console.log('❌ 参数验证失败:', e.message)
      return
    }

    // 先测试用户信息 API
    console.log('\n测试用户信息 API...')
    const userProfile = await douyinFetcher.fetchUserProfile({ sec_uid: SEC_USER_ID }, COOKIE)
    console.log('用户信息响应:', JSON.stringify(userProfile, null, 2))
    if (!userProfile.success) {
      console.log('❌ 用户信息获取失败:', userProfile.message)
      return
    }

    // 调用系列列表 API
    const params = {
      sec_uid: SEC_USER_ID,
      number: 20,
      cursor: 0
    }
    console.log('\n请求参数:', JSON.stringify(params, null, 2))
    const result = await douyinFetcher.fetchSeriesList(params, COOKIE)

    // 检查结果
    if (result.success) {
      // console.log('✅ 请求成功!\n')
      // console.log('状态码:', result.data.status_code)
      // console.log('状态信息:', result.data.status_msg || '无')
      // console.log('总数:', result.data.total)
      // console.log('本次返回数量:', result.data.series_infos?.length || 0)
      // console.log('是否有更多:', result.data.has_more)
      // console.log('游标:', result.data.cursor)

      if (result.data.series_infos && result.data.series_infos.length > 0) {
        console.log('\n系列列表:')
        result.data.series_infos.forEach((series, index) => {
          console.log(`\n${index + 1}. ${series.series_name}`)
          console.log(`   series_id: ${series.series_id}`)
          console.log(`   real_name: ${series.real_name}`)
          console.log('   stats:', series.stats)
        })
      } else {
        console.log('\n该用户暂无系列内容')
      }
    } else {
      console.log('❌ 请求失败!')
      console.log('错误信息:', result.message)
      if (result.error) {
        console.log('错误详情:', result.error)
      }
    }
  } catch (error) {
    console.error('❌ 发生错误:')
    console.error(error.message)
    console.error('\n错误堆栈:', error.stack)
  }
}

// 运行测试
testSeriesList()
