// +----------------------------------------------------------------------
// | INIS [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 http://inis.cc All rights reserved.
// +----------------------------------------------------------------------
// | Author: racns <email: racns@qq.com> <url: https://inis.cn>
// +----------------------------------------------------------------------
// | 作用：axios 网络请求封装
// +----------------------------------------------------------------------

import qs from 'qs'
import axios from 'axios'
import { inisHelper } from '@/utils/helper/helper'

// 创建 axios 对象
const instance = axios.create({
    baseURL: inisHelper.customProcessApi(INIS.api),
    timeout: 60 * 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})

// 请求拦截
//   所有的网络请求都会先走这个方法
instance.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers,
        token:INIS.token
      }
    return config;
})

// 响应拦截
//   所有的网络请求返回数据之后都会先执行这个方法
instance.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        return Promise.reject(err);
    }
)

// GET请求
export function GET(url, config = {}){
    return instance.get(url, config);
}

// DELECT请求
export function DEL(url, config = {}){
    return instance.delete(url, config);
}

// PUT请求
export function PUT(url, data = {}, config = {}){
    return instance.put(url, data, config);
}

// POST请求
export function POST(url, data = {}, config = {}){
    // params.token = INIS.token || ''
    if (Object.prototype.toString.call(data) === '[object Object]') data = qs.stringify({...data})
    return instance.post(url, data, config);
}

// PATCH请求
export function PATCH(url, data = {}, config = {}){
    return instance.patch(url, data, config);
}
