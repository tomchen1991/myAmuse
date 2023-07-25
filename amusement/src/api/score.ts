/*
 * @Date: 2023-07-14 17:53:26
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-07-20 10:06:57
 * @FilePath: /amusement/src/api/score.ts
 */
import request from '../utils/request'

export const getDataById = function (id:string) {
  return request({
    method: 'get',
    url: '/getRowById',
    params: {
      id
    }
  })
}

export const getAllData = function () {
  return request({
    method: 'get',
    url: '/test'
  })
}
