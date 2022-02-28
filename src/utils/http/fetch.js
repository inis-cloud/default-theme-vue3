// +----------------------------------------------------------------------
// | INIS [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 http://inis.cc All rights reserved.
// +----------------------------------------------------------------------
// | Author: racns <email: racns@qq.com> <url: https://inis.cn>
// +----------------------------------------------------------------------
// | 作用：fetch 网络请求封装
// +----------------------------------------------------------------------

import { inisHelper } from '@/utils/helper/helper'

const baseURL = inisHelper.customProcessApi(INIS.api)

// GET请求
export const Get = (url, params = {}, config = {}) => {
    config.headers = {...{token:INIS.token}, ...config.headers}
    return inisHelper.fetch.get(baseURL + url, params, config)
}

// DELECT请求
export function Del(url, params = {}, config = {}){
    config.headers = {...{token:INIS.token}, ...config.headers}
    return inisHelper.fetch.delete(baseURL + url, params, config)
}

// PUT请求
export function Put(url, params = {}, config = {}){
    config.headers = {...{token:INIS.token}, ...config.headers}
    return inisHelper.fetch.put(baseURL + url, params, config)
}

// POST请求
export function Post(url, params = {}, config = {}){
    config.headers = {...{token:INIS.token}, ...config.headers}
    return inisHelper.fetch.post(baseURL + url, params, config)
}

// PATCH请求
export function Patch(url, params = {}, config = {}){
    config.headers = {...{token:INIS.token}, ...config.headers}
    return inisHelper.fetch.patch(baseURL + url, params, config)
}
