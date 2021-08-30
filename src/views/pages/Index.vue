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

            <div class="row mb-2 master-info">
                <div class="col-sm-4">
                    <h1 class="page-title display-6">{{theme_config.site.title || site_info.title}}</h1>
                    <p class="text-muted mb-0">{{hitokoto.hitokoto || ''}}</p>
                </div>
                <div v-if="false" class="col-sm-8">
                    <div class="text-sm-right">
                        <div class="btn-group mb-3">
                            <button type="button" class="btn btn-primary">全部</button>
                        </div>
                        <div class="btn-group mb-3 ml-1">
                            <button type="button" class="btn btn-light">占位符</button>
                        </div>
                        <div class="btn-group mb-3 ml-2 d-none d-sm-inline-block">
                            <button type="button" class="btn btn-primary"><span class="menu-list"><svg-icon file-name="matrix"></svg-icon></span></button>
                        </div>
                        <div class="btn-group mb-3 d-none d-sm-inline-block">
                            <button type="button" class="btn btn-light text-muted"><span class="menu-list"><svg-icon file-name="list"></svg-icon></span></button>
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
                                        <router-link :to="{name: 'article', params: { id: data.id }}" class="text-title">
                                            <span v-if="data.is_top == 1" class="badge badge-danger mr-1">置顶</span>
                                            {{data.title}}
                                        </router-link>
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
                <div v-else-if="!is_mobile" v-for="data in article_data" :key="data.id" class="col-md-6 col-xl-3 un-mobile" >
                    <div class="card d-block">
                        <div class="card-body p-2">
                            <router-link :to="{name: 'article', params: { id: data.id }}">
                                <img :src="data.expand.img_src || null" class="card-img-top">
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
                                    <router-link :to="{name: 'article', params: { id: data.id }}" class="text-title text-line line-limit-1">
                                    <a v-on:click="routerLink({name: 'article', params: { id: data.id }}, data)" href="javascript:;" class="text-title text-line line-limit-1">
                                        <span v-if="data.is_top == 1" class="badge badge-danger mr-1">置顶</span>
                                        {{ data.title }}
                                    </a>
                                    </router-link>
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
                <!-- 文章展示 - 结束 -->
                <div class="col-lg-12 article-footer">
                    <div class="card-body pt-0">
                        <div class="flex-center">
                            <span v-show="last_page">再怎么找也没有啦~</span>
                            <span>
                                <button v-show="!last_page" v-on:click="methods.getArticle(self_page+1)" type="button" class="btn btn-link text-muted">查看更多</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <i-footer></i-footer>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState, useStore } from 'vuex'
import { GET } from '@/utils/http/request'
import iFooter from '@/components/public/footer'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { inisHelper } from '@/utils/helper/helper'

export default {
    name: 'Index',
    components: { iFooter },
    setup() {

        // Vuex 响应实例
        const store = useStore()
        const state = reactive({
            hitokoto: [],           // 一言
            article: {page:2},      // 文章数据
            article_data: [],       // 文章数据
            is_mobile: inisHelper.get.storage('inis','mobile'),       // 是否为手机
            self_page: 1,           // 当前页码
            last_page: false,       // 最后一页
        })

        const methods = {
            // 初始化数据
            initData(){
                methods.hitokoto()
                methods.getArticle()
            },
            // 获取文章数据
            getArticle(page = 1){

                if (page <= state.article.page) {
                    if (page == state.article.page) state.last_page = true
                    GET('article',{
                        params:{limit:8,page,'login-token':`${store.state.login['login-token']}`}
                    }).then((res)=>{
                        if (res.data.code == 200) {
                            // 设置文章列表数据
                            state.article = res.data.data
                            state.article.data.forEach(item=>{
                                state.article_data.push(item)
                            })
                            // 设置当前分页码
                            state.self_page = page
                            // 设置页面 title
                            document.title = store.state.theme_config.site.title
                        }
                    })
                } else state.last_page = true
            },
            // 获取一言数据
            hitokoto(){
                // 太快了，延迟一下
                setTimeout(()=>{
                    let description = store.state.theme_config.site.description
                    let check = inisHelper.is.empty(description) ? true : false
                    if (check) {
                        GET('https://v1.hitokoto.cn').then( res => {
                            state.hitokoto = res.data
                        })
                    } else state.hitokoto.hitokoto = description
                },500)
            },
            wecome(){
                axios.all([
                    GET('other/ua').then(res=>res.data),
                    GET('location/weather').then(res=>res.data)
                ]).then(axios.spread((ua, weather)=>{

                    if (ua.code == 200 && weather.code == 200) {
                        let info = `<p class="mb-1">欢迎来自 ${weather.data.lives[0].province} ${weather.data.lives[0].city} 的朋友</p>
                        <p class="mb-1"><span class="text-primary">${weather.data.lives[0].city}</span> 当前气温 <span class="text-primary">${weather.data.lives[0].temperature} ℃ ${weather.data.lives[0].weather}</span></p>
                        <p class="mb-1">系统：${ua.data.os.system} ${ua.data.os.version} </p>
                        <p class="mb-1">内核：${ua.data.browser.kernel}</p>`
                        $.NotificationApp.send("", info, "top-right", "rgba(0,0,0,0.2)", "info")
                    }
                }))
            }
        }

        onMounted(() => {
            methods.initData()
        })

        // 监听是否显示页面欢迎
        watch(()=>store.state.theme_config.basic, ()=>{
            let basic = store.state.theme_config.basic
            let is_wecome = (basic.wecome == 'true') ? true : false
            if (is_wecome) methods.wecome()
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
    computed: {
        ...mapState(['site_info', 'theme_config']),
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
        },
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