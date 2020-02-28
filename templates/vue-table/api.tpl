/** 
 * ***** 模板定义 ******
 * @name    <{root.group.model}>
 * @description    <{root.group.model}>接口类
 * @ext    js
 * @targetPath    @projectRoot/src/api/heji
 *
 * ***** 模板变量定义 ******
 * @variable    api_module|v1/heji_<{root.group.model}>|接口地址
 * @variable    desc|<{root.group.model_desc}>接口js|描述
 */


import axios from '@/libs/api.request'
import config from '@/config'
// import StringUtil from '@/libs/string-util'
const api_module = '<{api_module}>'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

/**
 * <desc>
 */

/**
 * 列表
 */
const list = (queryObj, number, size) => {
  // 参数初始化
  number = !isNaN(number) ? number : 1
  size = !isNaN(size) ? size : 10
  queryObj = !(typeof queryObj === 'undefined') ? queryObj : {}

  const params = Object.assign(queryObj, { pageSize: size, pageNum: number })
  return axios.request({
    url: `${api_module}`,
    method: 'get',
    params: params
  })
}

/**
 * 获取单条记录
 */
const one = (id) => {
  return axios.request({
    url: `${api_module}/${id}`,
    method: 'get'
  })
}

const add = (data) => {
  return axios.request({
    url: `${api_module}`,
    method: 'post',
    data: data
  })
}

const edit = (data) => {
  return axios.request({
    url: `${api_module}`,
    method: 'put',
    data: data
  })
}

// 删除单个
const del = (uuid) => {
  return axios.request({
    url: `${api_module}/${uuid}`,
    method: 'delete'
  })
}
// 批量删除
const batchDel = (idList) => {
  return axios.request({
    url: `${api_module}/batch`,
    method: 'delete',
    data: {
      uuidList: idList
    }
  })
}

// 删除单个
const exportUrl = (queryObj) => {
  const exportUrl = `${api_module}/export`
  return baseUrl + exportUrl
}

export default {
  list,
  add,
  edit,
  one,
  del,
  batchDel,
  exportUrl
}
