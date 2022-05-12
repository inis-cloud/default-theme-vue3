<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 首页组件                                                               -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <div class="content-page home">
        <div class="content">

            <div class="row mobile-head-title">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body p-2">
                            <div class="flex-center">
                                <h4>标签&nbsp;&nbsp;&nbsp;{{tags.name || 'XX'}}&nbsp;&nbsp;&nbsp;下的文章</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                
                <!-- 文章展示 - 开始 -->
                <div v-if="is_mobile" v-for="data in article_data" :key="data.id" class="col-md-6 col-xl-3">
                    <div class="card d-block">
                        <router-link :to="{name: 'article', params: { id: data.id }}">
                            <img class="card-img-top" :src="data.expand.img_src" alt="project image cap">
                            <div class="card-img-overlay">
                                 <span>
                                    <svg-icon v-if="data.opt.auth =='password'" file-name="lock"></svg-icon>
                                    <svg-icon v-else-if="data.opt.auth =='login'" file-name="diamond"></svg-icon>
                                    <svg-icon v-else-if="data.opt.auth =='private'" file-name="self"></svg-icon>
                                </span>
                                <div class="badge badge-secondary p-1">
                                    {{ data.views || 0 }}
                                </div>
                            </div>
                        </router-link>
                        <div class="card-body position-relative p-2">
                            <div class="media">
                                <img :src="data.expand.author.head_img" :alt="data.expand.author.nickname" class="rounded-circle-10px mr-2" width="40">
                                <div class="media-body">
                                    <h5 class="mt-0">
                                        <a :href="'/#/article/' + data.id" class="text-title text-line line-limit-1">
                                            <span v-if="data.is_top == 1" class="badge badge-danger mr-1">置顶</span>
                                            {{data.title}}
                                        </a>
                                    </h5>
                                    <span>
                                        <span v-for="data in data.expand.tag" :key="data.id" :class="'badge badge-'+data.color+'-lighten mr-1'">{{data.name}}</span>
                                    </span>
                                </div>
                                <div class="mb-1">
                                    <span class="text-muted">{{natureTime(data.create_time)}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="!is_mobile" v-for="data in article_data" :key="data.id" class="col-md-6 col-xl-3 un-mobile">
                    <div class="card d-block">
                        <div class="card-body p-2">
                            <router-link :to="{name: 'article', params: { id: data.id }}">
                                <img :src="data.expand.img_src" class="card-img-top">
                                <div class="card-img-overlay">
                                     <span>
                                        <svg-icon v-if="data.opt.auth =='password'" file-name="lock"></svg-icon>
                                        <svg-icon v-else-if="data.opt.auth =='login'" file-name="diamond"></svg-icon>
                                        <svg-icon v-else-if="data.opt.auth =='private'" file-name="self"></svg-icon>
                                    </span>
                                    <div class="badge badge-secondary p-1">
                                        {{ data.views || 0 }}
                                    </div>
                                </div>
                            </router-link>
                            <div class="position-relative p-1 mt-2">
                                <h4 class="mt-0">
                                    <a :href="'/#/article/' + data.id" class="text-title text-line line-limit-1">
                                        <span v-if="data.is_top == 1" class="badge badge-danger mr-1">置顶</span>
                                        {{ data.title }}
                                    </a>
                                </h4>

                                <p>
                                    <span class="pr-2 text-nowrap">
                                        <a href="javascript:void(0);" class="d-inline-block">
                                            <img :src="data.expand.author.head_img" class="rounded-circle avatar-xs" alt="friend">
                                        </a>
                                        {{ data.expand.author.nickname }}
                                    </span>
                                    <span class="pr-2 text-nowrap">
                                        评论：{{ data.expand.comments.count }}
                                    </span>
                                    <span class="text-nowrap">
                                        时间：{{ natureTime(data.create_time) }}
                                    </span>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="article_is_empty" class="col-lg-12">
                    <div class="card">
                        <div class="card-body p-2">
                            <div class="flex-center">
                                <p class="text-warning m-0">没有找到搜索结果，该标签下还未设置文章。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 article-footer">
                    <div class="card-body pt-0">
                        <div class="flex-center">
                            <span v-show="last_page && !article_is_empty" class="see-more pt-1 pb-1 pl-3 pr-3">再怎么找也没有啦~</span>
                            <span>
                                <button v-show="!last_page && !article_is_empty" v-on:click="methods.getArticle(id, self_page+1)" type="button" class="btn btn-link text-muted pt-1 pb-1 pl-3 pr-3 see-more">查看更多</button>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 文章展示 - 结束 -->
            </div>

        </div>
        <i-footer></i-footer>
    </div>
</template>

<script>
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GET } from '@/utils/http/request'
import iFooter from '@/components/public/footer'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs } from 'vue'

export default {
    name: 'Index',
    components: { iFooter },
    setup() {

        // 响应式实例
        const route = useRoute()
        // Vuex 响应实例
        const store = useStore()

        const state = reactive({
            id: null,               // 分类ID
            tags: [],               // 文章分类
            is_mobile: inisHelper.get.storage('inis','mobile'),       // 是否为手机
        })

        // 初始化路由参数ID
        state.id = route.params.id

        const methods = {
            // 初始化 state 数据
            initState(){
                state.self_page = 1         // 当前页码
                state.last_page = false     // 最后一页
                state.article_data = []     // 文章数据
                state.article_is_empty = false // 文章是否为空
                state.article = {page:2}    // 文章数据
            },
            // 获取文章数据
            getArticle(id = null, page = 1){
                let params = {id,page,limit:8,order:'is_top desc, create_time asc'}
                if (page <= state.article.page) {
                    if (page == state.article.page) state.last_page = true
                    GET('tag',{params}).then((res)=>{
                        if (res.data.code == 200) {
                            // 分类完整数据
                            state.tags = res.data.data
                            // 设置文章列表数据
                            state.article = res.data.data.expand
                            state.article.data.forEach(item=>{
                                state.article_data.push(item)
                            })
                            // 设置当前分页码
                            state.self_page = page
                            // 是否显示分页码
                            if(state.article_is_empty || state.article.page == 1) state.page_is_show = false
                            else state.page_is_show = true
                            // 设置页面 title
                            document.title = `标签 ${state.tags.name} 下的文章 - ${store.state.theme_config.basic.site.title}`
                        }
                    })
                } else state.last_page = true
            }
        }

        methods.initState()
        
        onMounted(() => {
            methods.getArticle(state.id)
        })

        // 监听路由更新
        onBeforeRouteUpdate((to, from, next)=>{
            state.id = to.params.id || null
            methods.initState()
            methods.getArticle(state.id)
            next()
        })

        // 返回数据
        return{ ...toRefs(state), methods }
    },
    methods: {
        natureTime(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time)
        }
    },
    computed:{
        article_data(){
            let result = this.article_data
            result.forEach(item=>{
                if (inisHelper.is.empty(item.opt)) {
                    item.opt = {auth:"anyone"}
                } else if (inisHelper.is.empty(item.opt.auth)) {
                    item.opt.auth = "anyone"
                }
                item.views = inisHelper.format.number(item.views)
            })
            return result
        }
    }
}
</script>

<style scoped>
.badge-secondary{opacity: .8;right: 2em;position: absolute;background-color: rgba(255, 255, 255, 0.3);}
@media screen and (max-width:768px) {
    .card-img-overlay{
        top: -8px;
        right: -6px;
    }
}
</style>