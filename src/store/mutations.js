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
}