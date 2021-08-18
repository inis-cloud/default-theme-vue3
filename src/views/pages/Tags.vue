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
                <div v-if="is_mobile" v-for="data in article.data" :key="data.id" class="col-md-6 col-xl-3">
                    <div class="card d-block">
                        <router-link :to="{name: 'article', params: { id: data.id }}">
                            <img class="card-img-top" :src="data.expand.img_src" alt="project image cap">
                            <div class="card-img-overlay">
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
                <div v-else-if="!is_mobile" class="col-md-6 col-xl-3 un-mobile" v-for="data in article.data" :key="data.id">
                    <div class="card d-block">
                        <div class="card-body p-2">
                            <router-link :to="{name: 'article', params: { id: data.id }}">
                                <img :src="data.expand.img_src" class="card-img-top">
                                <div class="card-img-overlay">
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
                                        评论：{{ data.expand.comments }}
                                    </span>
                                    <span class="text-nowrap">
                                        时间：{{ natureTime(data.create_time) }}
                                    </span>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="article_is_empty" class="col-lg-12">
                    <div class="card">
                        <div class="card-body p-2">
                            <div class="flex-center">
                                <p class="text-warning m-0">没有找到搜索结果，该标签下还未设置文章。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 文章展示 - 结束 -->
            </div>

            <teleport to="body">
                <div v-if="page_is_show" class="btn-group inis-page-list" style="float: right">
                    <button v-if="article.self_page != 1" v-on:click="methods.getArticle(tags.id, article.self_page-1)" type="button" class="btn btn-light inis-btn-page">
                        <span class="inis-page">
                            <svg-icon :file-name="(is_mobile) ? 'primary-left' : 'primary-upper'"></svg-icon>
                        </span>
                    </button>
                    <button v-for="(item, index) in article.page_list" :key="index" v-on:click="methods.getArticle(tags.id, item)" :class="(article.self_page == item) ? 'btn inis-btn-page btn-primary' : 'btn inis-btn-page btn-light'">{{item}}</button>
                    <button v-if="article.self_page != article.page" v-on:click="methods.getArticle(tags.id, article.self_page+1)" type="button" class="btn btn-light inis-btn-page">
                        <span class="inis-page">
                            <svg-icon :file-name="(is_mobile) ? 'primary-right' : 'primary-lower'"></svg-icon>
                        </span>
                    </button>
                </div>
            </teleport>

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
import { onMounted, reactive, toRefs, onBeforeUpdate } from 'vue'

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
            article: [],            // 文章数据
            is_mobile: inisHelper.get.storage('inis','mobile'),       // 是否为手机
            page_is_show: true,     // 是否显示分页
            article_is_empty: false,// 文章是否为空
        })

        // 初始化路由参数ID
        state.id = route.params.id

        // 监听路由更新
        onBeforeRouteUpdate((to, from, next)=>{
            state.id = to.params.id || null
            methods.getArticle(state.id)
            next()
        })

        const methods = {
            // 获取文章数据
            getArticle(id = null, page = 1){
                let params = {id,page,limit:4,order:'is_top desc, create_time asc'}
                GET('tag',{params}).then((res)=>{
                    if (res.data.code == 200) {
                        // 分类完整数据
                        state.tags = res.data.data
                        // 设置文章列表数据
                        state.article = res.data.data.expand
                        // 设置当前分页码
                        state.article.self_page = page
                        // 分页码列表
                        state.article.page_list = inisHelper.create.paging(page, state.article.page, 7)
                        // 文章是否为空
                        if (inisHelper.is.empty(state.article.data)) state.article_is_empty = true
                        else state.article_is_empty = false
                        // 是否显示分页码
                        if(state.article_is_empty || state.article.page == 1) state.page_is_show = false
                        else state.page_is_show = true
                        // 设置页面 title
                        document.title = `标签 ${state.tags.name} 下的文章 - ${store.state.theme_config.site.title}`
                    }
                })
            }
        }
        onMounted(() => {
            methods.getArticle(state.id)
        })

        onBeforeUpdate(()=>{
            // 计算分页码页面居中位置
            if (state.page_is_show) {
                let page_list = document.querySelector(".inis-page-list")
                if (!state.is_mobile) {
                    page_list.style.setProperty('position','absolute')
                    page_list.style.setProperty('right','1%')
                    page_list.style.top = "calc(50% - "+(page_list.offsetHeight/2 + 30)+"px)";
                } else {
                    page_list.style.setProperty('position','fixed')
                    page_list.style.setProperty('bottom','20px')
                    page_list.style.left = "calc(50% - "+(page_list.offsetWidth/2)+"px)";
                }
            }
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
}
</script>

<style scoped>
.badge-secondary{opacity: .7;right: 2em;position: absolute;}
</style>