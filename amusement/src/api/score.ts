/*
 * @Date: 2023-07-14 17:53:26
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-10-20 11:18:58
 * @FilePath: /amusement/src/api/score.ts
 */
import { dataType } from '../components/MyRate.vue'
import request from '../utils/request'

export const getDataById = function (id:string) {
  return request({
    method: 'get',
    url: '/user/getRowById',
    params: {
      id
    }
  })
}

export const getAllData = function () {
  return request<dataType>({
    method: 'get',
    url: '/user/getAllGames'
  })
}

export const insertData = function (data: any) {
  return request({
    method: 'post',
    url: '/user/insert',
    data
  })
}

export const deleteData = function (params: any) {
  return request({
    method: 'get',
    url: '/user/delete',
    params
  })
}
