/*
 * @Date: 2023-07-14 17:48:20
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-07-17 11:14:24
 * @FilePath: /amusement/src/utils/request.ts
 */
import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// response interceptor
service.interceptors.response.use(response => {
  return response.data
})

export default service