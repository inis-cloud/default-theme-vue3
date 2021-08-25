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

// 创建 axios 对象
const instance = axios.create({
    // baseURL: process.env.VUE_APP_API,
    baseURL: INIS.api + '/',
    timeout: 60 * 1000,
})

// 请求拦截
//   所有的网络请求都会先走这个方法
instance.interceptors.request.use(
    config => {
        // 定义请求头
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        if (config.method == 'get') config.params.token = INIS.token
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
export function GET(url, params = {params:{}}){
    return instance.get(url, params);
}

// POST请求
export function POST(url, params = {}, data = null){
    params.token = INIS.token || ''
    return instance.post(url, qs.stringify({...params}));
}

// DELECT请求
export function DEL(url){
    return instance.delete(url);
}

// PUT请求
export function PUT(url, params = null){
    return instance.put(url, params);
}

