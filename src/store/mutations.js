
import { GET } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'

export default {
    // 获取站点信息
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
    }
}