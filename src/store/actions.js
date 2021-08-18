export default {
    // 触发获取站点信息数据
    commitSiteInfo(context) {
        context.commit('setSiteInfo')
    },
    // 提交主题配置
    commitThemeConfig(context, params = {}){
        context.commit('setThemeConfig', params)
    }
}