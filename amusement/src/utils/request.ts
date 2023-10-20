/*
 * @Date: 2023-10-20 10:45:39
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-10-20 11:08:20
 * @FilePath: /amusement/src/utils/request.ts
 */
import { Method } from "axios"

import myRequest from './axios'

export interface ResData<T> {
  code: number,
  msg: string,
  data: T
}

const request1 = <T>(url: string, method: Method = 'GET', params: object, data: object) => {
  return myRequest<any, ResData<T>>({
    url,
    method,
    params,
    data
  })
}

export default <T>(params:any) => {
  return request1<T>(params.url, params.method, params.params, params.data)
}