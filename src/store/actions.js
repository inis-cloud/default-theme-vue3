export default {
    // 提交主题配置
    commitThemeConfig(context, params = {}){
        context.commit('setThemeConfig', params)
    },
    // 提交登录信息
    commitLogin(context, params = {}){
        context.commit('setLogin', params)
    },
    // 提交文章信息
    commitArticle(context, params = {}){
        context.commit('setArticle', params)
    },
}