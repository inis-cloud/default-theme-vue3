<template>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group mb-3">
                <input v-model="comment.nickname" type="text" class="form-control" placeholder="昵称*">
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group mb-3">
                <input v-model="comment.email" type="text" class="form-control" placeholder="邮箱*">
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group mb-3">
                <input v-model="comment.url" type="text" class="form-control" placeholder="站点">
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group mb-3">
                <textarea v-model="comment.content" class="form-control inis-scroll" rows="3" placeholder="说点什么吧 (支持Mackdown语法！) * ... ..."></textarea>
            </div>
        </div>
        <div class="col-md-12">
            <button v-on:click="saveComment()" class="btn btn-primary btn-sm float-right">发表评论</button>
        </div>
    </div>
</template>

<script>

import { POST } from '@/utils/http/request'
import { onMounted, reactive, toRefs } from 'vue'
import { inisHelper } from '@/utils/helper/helper'

export default {
    setup(props){

        const state = reactive({
            comment: {      // 提交的评论
                content : '',
                nickname: '',
                email   : '',
                url     : ''
            }
        })

        onMounted(()=>{
            // 获取缓存中的登录信息
            let login_storage = inisHelper.get.storage("login")
            // 判断缓存是否存在且未过期
            if (login_storage != "expire" && login_storage != false) {
                // 登录信息
                let user = inisHelper.get.storage('login','user')
                state.comment.email    = user.email
                state.comment.nickname = user.nickname
                state.comment.url      = user.address_url
            }
            for (let item in props.params) state.comment[item] = props.params[item]
        })

        return { ...toRefs(state) }
    },
    props: {
        params: { type: Object, default:{} },
    },
    methods: {
        saveComment(){
            const params = this.comment
            // 评论前验证
            if (inisHelper.is.empty(params.content)) {
                $.NotificationApp.send("提示！", '请填写评论内容！', "top-right", "rgba(0,0,0,0.2)", "warning")
            } else if (inisHelper.is.empty(params.nickname)) {
                $.NotificationApp.send("提示！", '请告诉我您的昵称！', "top-right", "rgba(0,0,0,0.2)", "warning")
            } else if (inisHelper.is.empty(params.email)) {
                $.NotificationApp.send("提示！", '请填写邮箱，方便我们给您回复！', "top-right", "rgba(0,0,0,0.2)", "warning")
            } else if (!inisHelper.is.email(params.email)) {
                $.NotificationApp.send("提示！", '邮箱格式错误，请填写正确的邮箱！', "top-right", "rgba(0,0,0,0.2)", "warning")
            } else {
                POST('comments', params).then((res) => {
                    if (res.data.code == 200) {
                        const result = res.data.data
                        this.$emit('change')
                        $.NotificationApp.send("提示！", '评论成功！', "top-right", "rgba(0,0,0,0.2)", "info")
                    } else $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning");
                })
            }
        },
    }
}
</script>