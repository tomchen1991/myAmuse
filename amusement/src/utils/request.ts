/*
 * @Date: 2023-10-20 10:45:39
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-10-20 11:25:06
 * @FilePath: /amusement/src/utils/request.ts
 */
import { Method } from "axios"

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

export interface ResData<T> {
  code: number,
  msg: string,
  data: T
}

const request1 = <T>(url: string, method: Method = 'GET', params: object, data: object) => {
  return service<any, ResData<T>>({
    url,
    method,
    params,
    data
  })
}

export default <T>(params:any) => {
  return request1<T>(params.url, params.method, params.params || {}, params.data || {})
}