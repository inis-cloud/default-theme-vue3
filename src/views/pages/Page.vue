<template>
<div id="page" class="content-page">
    <div class="content">
        <div class="row">

            <div class="col-lg-8">
                <div class="card">
                    <div class="card-body">

                        <h3 class="mt-0 text-center">{{pages.title}}</h3>

                        <div v-html="pages.content" v-code-highlight class="article-content"></div>

                        <div class="row mt-3">
                            <div class="card-body">
                                <div class="float-left">
                                    <span class="font-12px">
                                        创建时间：{{ natureTime(pages.create_time || null) }}
                                    </span>
                                </div>
                                <div class="float-right">
                                    <span class="font-12px">
                                        修改时间：{{ natureTime(pages.update_time || null) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">评论<span class="badge bg-primary rounded-pill text-white float-right">{{comments.count}}</span></h4>
                        <i-box v-if="config.comment.show" :params="{type:'page:'+alias}" v-on:change="methods.getComments()" class="mt-3"></i-box>
                    </div>
                    <div class="card-body pt-0">
                        <div class="inis-scroll">
                            <div class="media row">
                                <!-- 评论 - 开始 -->
                                <div class="inbox-widget col-md-12" v-for="data in comments.data" :key="data.id">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <a :href="(data.url == null) ? data.url : '//'+data.url" target="_blank">
                                                <img :src="data.expand.head_img" class="rounded-circle img-thumbnail" height="50" width="50">
                                            </a>
                                        </div>
                                        <h5 class="inbox-item-author mt-0">
                                            <a :href="(data.url == null) ? data.url : '//'+data.url" target="_blank" class="text-dark">{{ data.nickname }}</a>
                                            <span class="text-muted font-13 mx-2">{{ natureTime(data.create_time) }}</span>
                                            <a href="javascript:;" v-on:click="setReplyId(data.id)" class="badge bg-light text-dark rounded-pill">回复</a>
                                        </h5>
                                        <p class="text-dark mb-0">{{ data.content || '' }}</p>
                                    </div>

                                    <!-- 回复 - 开始 -->
                                    <div class="inbox-item ml-3" v-for="(reply) in data.son" :key="reply.id">
                                        <div class="inbox-item-img">
                                            <a :href="(!reply.expand.url) ? 'javasctipt:;' : '//' + reply.expand.url" target="_blank">
                                                <img :src="reply.expand.head_img" class="rounded-circle img-thumbnail" width="50" height="50">
                                            </a>
                                        </div>
                                        <h5 class="inbox-item-author mt-0">
                                            <a :href="(!reply.expand.url) ? 'javasctipt:;' : '//' + reply.expand.url" target="_blank" class="text-dark">{{ reply.nickname }}</a>
                                            <span class="text-muted font-13 mx-2">{{ natureTime(reply.create_time) }}</span>
                                            <a href="javascript:;" v-on:click="setReplyId(reply.id)" class="badge bg-light text-dark rounded-pill">回复</a>
                                        </h5>
                                        <p class="text-dark">{{ reply.content }}</p>
                                        <!-- 评论框 - 开始 -->
                                        <i-box v-if="config.comment.reply_id == reply.id" :params="{type:'page:'+alias,pid:reply.id}" v-on:change="methods.getComments()" class="mt-3"></i-box>
                                        <!-- 评论框 - 结束 -->
                                    </div>
                                    <!-- 回复 - 结束 -->

                                    <!-- 评论框 - 开始 -->
                                    <i-box v-if="config.comment.reply_id == data.id" :params="{type:'page:'+alias,pid:data.id}" v-on:change="methods.getComments()" class="mt-3"></i-box>
                                    <!-- 评论框 - 结束 -->
                                </div>
                                <!-- 评论 - 结束 -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <teleport to="head">
        <!-- 代码高亮 CSS - 开始 -->
        <i-link :src="handleCDN() + 'assets/css/highlight/dark.min.css'"></i-link>
        <i-link :src="handleCDN() + 'assets/libs/fancybox/jquery.fancybox.min.css'"></i-link>
        <!-- 代码高亮 CSS - 结束 -->
    </teleport>

    <teleport to="body">
        <!-- 页面依赖 JS - 开始 -->
        <i-link tag="script" :src="handleCDN() + 'assets/libs/fancybox/jquery-3.3.1.min.js'"></i-link>
        <i-link tag="script" :src="handleCDN() + 'assets/libs/fancybox/jquery.fancybox.min.js'"></i-link>
        <!-- 页面依赖 JS - 结束 -->
    </teleport>

    <i-footer></i-footer>
</div>
</template>

<script>
import { useStore } from 'vuex'
import iLink from '@/components/tool/Link'
import { GET } from '@/utils/http/request'
import iFooter from '@/components/public/footer'
import { onMounted, reactive, toRefs } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import iBox from "@/components/module/comments/page/box"
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export default {
    components: { iFooter, iLink, iBox },
    setup(){

        // 响应式实例
        const route = useRoute()
        // Vuex 响应实例
        const store = useStore()

        const state = reactive({
            alias: null,     // 别名
            pages: [],       // 页面数据
            comments: {     // 显示的评论
                count:0,
                data:{},
                page:0
            },
            config:{
                comment: {
                    show: true,         // 显示评论框
                    reply_id: null,     // 回复的ID
                }
            }
        })

        // 从路由获取别名
        state.alias = route.params.alias

        // 监听路由更新
        onBeforeRouteUpdate((to, from, next)=>{
            state.alias = to.params.alias || null
            methods.getPage()
            next()
        })

        const methods = {
            // 初始化数据
            initData(){
                methods.getPage()
                methods.getComments()
            },
            // 获取页面详情数据
            getPage(){
                let params = {alias:state.alias}
                GET('page', {params}).then(res=>{
                    if (res.data.code == 200) {
                        state.pages = res.data.data
                        // 设置页面 title
                        document.title = state.pages.title + ' - ' + store.state.theme_config.basic.site.title
                    }
                })
            },
            // 获取评论
            getComments(){
                const params = {
                    type:'page:' + state.alias
                }
                GET('comments/type',{params}).then(res=>{
                    if (res.data.code == 200) {
                        const result  = res.data.data
                        state.comments= result
                    }
                })
            },
        }

        onMounted(()=>{
            methods.initData()
        })

        return { ...toRefs(state), methods }
    },
    methods: {
      // 图片预览框
      imagesBox(){
        // 获取渲染文章下的全部图片
        let images = document.querySelector(".article-content").getElementsByTagName("img");
        for (let item of images) {
            // 给图片上预览盒子
            item.outerHTML = `<a data-fancybox="gallery" href="${item.src}" data-caption="${item.alt}">${item.outerHTML}</a>`
        }
      },
      // 人性化时间
      natureTime(date = null){
        const time = inisHelper.date.to.time((inisHelper.is.empty(date) ? '2021-5-20 13:14:00' : date))
        return inisHelper.time.nature(time)
      },
      setReplyId(id = null){
        this.config.comment.reply_id = id
        if (this.config.comment.reply_id != null) this.config.comment.show = false
      },
      // 自动处理CDN地址
      handleCDN(cdn = INIS.cdn){
        if (!inisHelper.is.empty(cdn)) {
            // 过滤http(s):// - 转数组 - 去空
            let result = ((cdn.replace(/http(s)?:\/\//g,"")).split("/")).filter((s)=>{
                return s && s.trim();
            });
            cdn = (result.length == 1) ? inisHelper.customProcessApi(cdn, 'theme/default') : cdn
            if (!inisHelper.is.string.end(cdn,'/')) cdn = cdn + '/';
        }
        return cdn
      },
    },
    updated(){
      this.imagesBox()
    }
}
</script>

<style scoped>
.inis-scroll::-webkit-scrollbar{display: none;}
.inis-scroll{
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    max-height: 500px;
}
</style>