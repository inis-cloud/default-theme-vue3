import config from '@/assets/json/config.json'

export default {
    site_info: {},          // 站点信息
    login: {                // 用户登录信息
        "login-token":"",
        user: {
            address_url:"",
            create_time:"",
            description:"",
            email:"",
            expand:"",
            head_img:"",
            id:"",
            last_login_time:"",
            level:"",
            longtext:"",
            nickname:"",
            opt:{
                alipay:"",
                login_auth:"",
                qq_pay:"",
                wechat_pay:""
            },
            sex:"",
            status:"",
            update_time:""
        }
    },
    theme_config: config,
    article: {
        is_comments: false,     // 是否触发评论
    }
}