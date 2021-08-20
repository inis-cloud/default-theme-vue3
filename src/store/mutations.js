import { GET } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'

export default {
    // 设置站点信息
    setSiteInfo(state) {
        if (inisHelper.is.empty(state.site_info)) {
            GET('options').then((res)=>{
                if (res.data.code == 200) {
                    state.site_info = res.data.data
                    // 防止 undefined
                    if (document.title == 'undefined') document.title = state.site_info.title
                }
            })
        }
    },
    // 设置主题配置
    setThemeConfig(state, params = {}) {

        if (inisHelper.is.empty(params)) {
            GET('options',{params:{key:'inis_config'}}).then(res=>{
                if (res.data.code == 200) {
                    state.theme_config = res.data.data.opt
                }
            })
        } else state.theme_config = params
    },
    // 设置登录信息
    setLogin(state, params = {}) {

        if (inisHelper.is.empty(params)) {

            // 获取缓存中的登录信息
            let login = inisHelper.get.storage("login")
            // 判断缓存是否存在且未过期
            if (login != "expire" && login) state.login = login

        } else state.login = params
    }
}