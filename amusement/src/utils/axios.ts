/*
 * @Date: 2023-07-14 17:48:20
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-10-17 09:29:10
 * @FilePath: /amusement/src/utils/request.ts
 */
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// response interceptor
service.interceptors.response.use(response => {
  return response.data
})

export default service