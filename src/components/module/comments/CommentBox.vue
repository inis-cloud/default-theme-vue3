<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 评论框组件                                                             -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <div class="row" id="example-textarea">
        <!-- col-md-10 offset-lg-1 -->
        <div class="card">
            <div class="card-body">
                <textarea class="form-control" rows="3" id="text" placeholder="说点什么吧* ... ... " v-model.trim="content"></textarea>
                <div class="row">
                    <div class="col-4">
                        <input type="text" class="form-control" placeholder="昵称*：" v-model.trim="nickname">
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control" placeholder="邮箱*：" v-model.trim="email">
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control" placeholder="网址：" v-model.trim="url">
                    </div>
                </div>
                <div class="row pt-2">
                    <!-- 表情预留区域 -->
                    <div class="col-md-6">
                        <button type="button" class="btn btn-icon btn-light mr-1"> <i class="mdi mdi-heart-outline"></i> </button>
                        <button type="button" class="btn btn-icon btn-light mr-1"> <i class="mdi mdi-heart-outline"></i> </button>
                        <button type="button" class="btn btn-icon btn-light mr-1"> <i class="mdi mdi-heart-outline"></i> </button>
                        <button type="button" class="btn btn-icon btn-light mr-1"> <i class="mdi mdi-heart-outline"></i> </button>
                    </div>
                    <!-- 发表评论 -->
                    <div class="col-md-6">
                        <button v-if="!is_load" v-on:click="methods.btnReply()" type="button" class="btn btn-inis-info btn-sm btn-rounded float-right">发表评论</button>
                        <button v-else type="button" class="btn btn-inis-info btn-sm btn-rounded float-right">
                            <div class="spinner-border text-light is-load mr-1" role="status"></div>发送中...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { POST } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup(props,context){

        // 响应式实例
        const route = useRoute()
        const store = useStore()
        const state = reactive({
            content: '',        // 评论内容
            nickname: '',       // 昵称
            email: '',          // 邮箱
            url: '',            // 网址
            article_id: '',     // 文章ID
            pid: 0,             // 父级评论ID
            is_login: false,    // 是否登录
            is_load: false,     // 加载中
        })

        // 评论ID
        state.pid = props.pid
        // 文章ID
        state.article_id = route.params.id

        const methods = {
            btnReply(){
                // 评论前验证
                if (inisHelper.is.empty(state.content)) {
                    $.NotificationApp.send("提示！", '请填写评论内容！', "top-right", "rgba(0,0,0,0.2)", "warning")
                } else if (inisHelper.is.empty(state.nickname)) {
                    $.NotificationApp.send("提示！", '请告诉我您的昵称！', "top-right", "rgba(0,0,0,0.2)", "warning")
                } else if (inisHelper.is.empty(state.email)) {
                    $.NotificationApp.send("提示！", '请填写邮箱，方便我们给您回复！', "top-right", "rgba(0,0,0,0.2)", "warning")
                } else if (!inisHelper.is.email(state.email)) {
                    $.NotificationApp.send("提示！", '邮箱格式错误，请填写正确的邮箱！', "top-right", "rgba(0,0,0,0.2)", "warning")
                } else {

                    let parasm = {
                        content:state.content,
                        nickname:state.nickname,
                        email:state.email,
                        url:state.url,
                        article_id:state.article_id,
                        pid: state.pid,
                    }

                    state.is_load = true

                    // 发送评论
                    POST('comments', parasm).then((res) => {
                        if (res.data.code == 200) {

                            $.NotificationApp.send("提示！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "info");

                            // 触发父组件重新获取评论数据
                            context.emit('reset');

                            // 清空评论框数据
                            state.content  = '';

                            // 评论状态
                            store.dispatch('commitArticle', {is_comments:true})

                        } else {
                            $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning");
                        }
                        state.is_load = false
                    })
                }
            },
            // 校验登录
            checkLogin(){
                // 获取缓存中的登录信息
                let login_storage = inisHelper.get.storage("login")
                // 判断缓存是否存在且未过期
                if (login_storage != "expire" && login_storage != false) {
                    state.login_storage = login_storage
                    state.is_login = true
                    // 登录信息
                    let user = inisHelper.get.storage('login','user')
                    state.email    = user.email
                    state.nickname = user.nickname
                    state.url      = user.address_url
                    // 登录后禁止修改
                    let inputs = document.querySelectorAll('#example-textarea input')
                    for (let item of inputs) item.disabled = true

                } else state.is_login = false
            }
        }

        onMounted(()=>{
            methods.checkLogin()
        })
        
        return { ...toRefs(state), methods }
    },
    props:{
        pid: {type: Number, default: 0}
    },
    methods:{
        
    }
}
</script>

<style scoped>
/* 评论框滚动条美化 */
#example-textarea .form-control{border:none;resize:none;overflow-x:hidden;overflow-y:auto;overflow-wrap:break-word;outline:none;scrollbar-width: thin;scrollbar-color: rgba(0,0,0,.2) transparent;}
#example-textarea .form-control::-webkit-scrollbar{width:4px;height:10px;background-color:rgba(110, 110, 110, 0)}
#example-textarea .form-control::-webkit-scrollbar-thumb{border-radius:6px;background-color:rgba(0,0,0,.2);transition:all .4s ease;-moz-transition:all .4s ease;-webkit-transition:all .4s ease;-o-transition:all .4s ease}
#example-textarea .form-control::-webkit-scrollbar-track{background-color:rgba(0,0,0,.1)}
.is-load{width: 1.3em;height: 1.3em;}
</style>