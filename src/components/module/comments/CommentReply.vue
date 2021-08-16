<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 评论回复组件                                                           -->
<!-- +---------------------------------------------------------------------- -->

<template>

    <!-- 评论框 - 开始 -->
    <i-comment-box v-if="is_show" v-on:reset="methods.getComments()"></i-comment-box>
    <!-- 评论框 - 结束 -->

    <div class="media mt-2 row">
        <!-- 评论 - 开始 -->
        <div class="card-body inbox-widget col-md-12"  v-for="data in comments.data" :key="data.id">
            <div class="inbox-item">
                <div class="inbox-item-img">
                    <a :href="(data.url == null) ? data.url : '//'+data.url" target="_blank">
                        <img :src="data.expand.head_img" class="rounded-circle img-thumbnail avatar-sm" alt="">
                    </a>
                </div>
                <h5 class="inbox-item-author mt-0">
                    <a :href="(data.url == null) ? data.url : '//'+data.url" target="_blank">{{ data.nickname }}</a>
                    <a href="javascript:;" v-on:click="methods.btnReply(data.id)" class="badge badge-success ml-2" style="color:#fff">回复</a>
                </h5>
                <p class="inbox-item-text">{{ data.create_time }}</p>
                <p class="text-muted">{{ data.content }}</p>
            </div>

            <!-- 回复 - 开始 -->
            <div class="inbox-item ml-5" v-for="reply in data.son" :key="reply.id">
                <div class="inbox-item-img">
                    <a :href="(!reply.expand.url) ? 'javasctipt:;' : '//' + reply.expand.url" target="_blank">
                        <img :src="reply.expand.head_img" class="rounded-circle img-thumbnail avatar-sm">
                    </a>
                </div>
                <h5 class="inbox-item-author mt-0">
                    <a :href="(!reply.expand.url) ? 'javasctipt:;' : '//' + reply.expand.url" target="_blank">{{ reply.nickname }}</a>
                    <a href="javascript:;" v-on:click="methods.btnReply(reply.id)" class="badge badge-success ml-2" style="color:#fff">回复</a>
                </h5>
                <p class="inbox-item-text">{{ reply.create_time }}</p>
                <p class="text-muted">{{ reply.content }}</p>
                <!-- 评论框 - 开始 -->
                <i-comment-box v-if="(comments_reply_id == reply.id) ? true : false" :pid="reply.id" v-on:reset="methods.getComments()"></i-comment-box>
                <!-- 评论框 - 结束 -->
            </div>
            <!-- 回复 - 结束 -->

            <!-- 评论框 - 开始 -->
            <i-comment-box v-if="(comments_reply_id == data.id) ? true : false" :pid="data.id" v-on:reset="methods.getComments()"></i-comment-box>
            <!-- 评论框 - 结束 -->
        </div>
        <!-- 评论 - 结束 -->
    </div>

    <div class="text-center">
        <!-- 加载动画 开始 -->
        <div v-if="page_is_load" class="btn-group mb-2" style="float: right">
            <button class="btn btn-light" type="button" disabled>
                <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                加载中...
            </button>
        </div>
        <!-- 加载动画 结束 -->
        
        <div v-else-if="!page_is_load && page_is_show" class="btn-group inis-page-list mt-2" style="float: right">
            <button v-if="page != 1" v-on:click="methods.getComments(page - 1, true)" class="btn btn-light">
                <span class="inis-page">
                    <svg-icon file-name="primary-left"></svg-icon>
                </span>
            </button>
            <button v-for="(item, index) in page_list" :key="index" v-on:click="methods.getComments(item, true)" :class="(page == item) ? 'btn btn-primary' : 'btn btn-light'">{{item}}</button>
            <button v-if="page != comments.page" v-on:click="methods.getComments(page + 1, true)" class="btn btn-light">
                <span class="inis-page">
                    <svg-icon file-name="primary-right"></svg-icon>
                </span>
            </button>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { GET } from '@/utils/http/request'
import { reactive, onMounted, toRefs } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import iCommentBox from '@/components/module/comments/CommentBox.vue'

export default {
    components: { iCommentBox },
    setup() {

        // 响应式实例
        const route = useRoute()

        const state = reactive({
            comments: [],           // 评论 - 回复 - 内容
            is_show: true,          // 评论框显示
            comments_reply_id: null,// 评论ID
            page_is_show: false,    // 是否显示分页
            page: 1,                // 当前评论页码
            is_load: true,          // 数据加载动画
            page_list: [],          // 评论页码列表
            page_is_load:true,      // 页码加载动画
        })

        // 获取文章ID
        const id = route.params.id

        const methods = {
            // 初始化数据
            initData(){
                methods.getComments()
            },
            // 获取文章评论
            getComments(page = state.page, is_load = false){

                state.comments_reply_id = null
                let params = {article_id:id,page,tree:false}

                GET('comments',{params}).then(res=>{
                    if (res.data.code == 200) {
                        
                        // 评论数据
                        state.comments = res.data.data

                        // 是否显示分页
                        if(inisHelper.is.empty(state.comments.data) || state.comments.page == 1) state.page_is_show = false
                        else state.page_is_show = true
                        
                        // 更新页码
                        state.page              = page
                        // 页码列表
                        state.page_list         = inisHelper.create.paging(page, state.comments.page, 7)
                        // 数据加载动画
                        state.is_load           = false
                        // 页码加载动画
                        state.page_is_load      = false
                        // 调转锚点
                        if (is_load) document.querySelector("#article-comments").scrollIntoView()
                    }
                })
            },
            // 回复按钮 - 调出评论框
            btnReply(id = null){
                state.comments_reply_id = id
                if(state.comments_reply_id != null) state.is_show = false
            }
        } 

        onMounted(()=>{
            methods.initData()
        })

        // 返回数据
        return { ...toRefs(state), methods }
    },
    methods: {

    }
}   
</script>

<style scoped>
/* 头像 */
img.rounded-circle.img-thumbnail.avatar-sm{width:auto!important;border:none;box-shadow:0px 0px 3px 1px #d0d4da}
.inbox-widget .inbox-item .inbox-item-img{width:auto!important;margin-left:4px}
.media .card-body h5 a{color:#343a40}
</style>