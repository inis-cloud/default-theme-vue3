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
            
            <!-- 标题部分 - 开始 -->
            <div v-show="!theme_config.other.module.banner" class="row mb-2 master-info">
                <div class="col-sm-4">
                    <h1 class="page-title display-6">{{theme_config.basic.site.title || ''}}</h1>
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
            <!-- 标题部分 - 结束 -->

            <!-- 轮播 - 开始 -->
            <div v-show="theme_config.other.module.banner" class="row banner mt-1 mt-md-0">
                <div v-show="banner.count > 0" class="col-md-8">
                    <div class="card mb-lg-3 mb-2">
                        <div class="card-body p-2">
                            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                              <ol class="carousel-indicators"></ol>
                              <div class="carousel-inner"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="(banner.count > 0) ? 'col-md-4' : 'col-md-12'">
                    <div class="card mb-lg-3 mb-2">
                        <div class="card-body">
                            <div id="lottie-performance" class="cursor" data-toggle="tooltip" data-placement="left" data-original-title="性能检测工具">
                              <img :src="handleCDN() + 'assets/images/performance.gif'" width="65" />
                            </div>
                            <h5 class="page-title display-7 animated fadeInUp">{{theme_config.basic.site.title || ''}}</h5>
                            <p class="text-muted mb-0">{{hitokoto.hitokoto || ''}}</p>
                            <h5 v-if="false" class="mb-1 font-weight-normal animated bounceInRight">
                              {{time.tts}}
                            </h5>
                            <div v-show="banner.count > 0" class="row mt-3">
                              <div class="col-12 mt-1 mb-1">
                                <h5 class="mb-1 mt-0 font-weight-normal text-muted">内存占用：</h5>
                                <div class="progress-w-percent mb-0">
                                    <span class="progress-value font-weight-bold">{{(performance.ram.rate * 100).toFixed(1)}}%</span>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar" role="progressbar" :style="'width: ' + (performance.ram.rate * 100) + '%'" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                              </div>
                              <div class="col-6 limit-1">
                                <span>
                                  <svg-icon file-name="window"></svg-icon>
                                  <span class="text-muted ml-1">白屏时间：{{performance.blank.value || 0}}ms</span>
                                </span>
                              </div>
                              <div class="col-6 limit-1">
                                <span class="float-right">
                                  <svg-icon file-name="dom"></svg-icon>
                                  <span class="text-muted ml-1">DOM解析：{{performance.dom.parse.value || 0}}ms</span>
                                </span>
                              </div>
                            </div>
                            <div v-show="banner.count > 0" class="row mt-3">
                              <div class="col-12 mt-1 mb-1">
                                <h5 class="mb-1 mt-0 font-weight-normal text-muted">DOM解析占用：</h5>
                                <div class="progress-w-percent mb-0">
                                    <span class="progress-value font-weight-bold">{{(performance.dom.parse.value/performance.dom.completed.value * 100).toFixed(1)}}%</span>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar" role="progressbar" :style="'width: ' + (performance.dom.parse.value/performance.dom.completed.value * 100) + '%'" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                              </div>
                              <div class="col-4 limit-1">
                                <span>
                                  <span class="text-muted ml-1">文章：{{group.article.count || 0}}</span>
                                </span>
                              </div>
                              <div class="col-4 text-center limit-1">
                                <span>
                                  <span class="text-muted ml-1">评论：{{group.comments.count || 0}}</span>
                                </span>
                              </div>
                              <div class="col-4 limit-1">
                                <span class="float-right">
                                  <span class="text-muted ml-1">访问：{{group.other.views || 0}}</span>
                                </span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 轮播 - 结束 -->

            <div class="row">
                <!-- 文章展示 - 开始 -->
                <div v-if="is_mobile" v-for="data in article_data" :key="data.id" class="col-md-6 col-xl-3">
                    <div class="card d-block">
                        <router-link :to="{name: 'article', params: { id: data.id }}">
                            <i-img :src="data.expand.img_src" class="card-img-top"></i-img>
                            <div class="card-img-overlay">
                                <span>
                                    <svg-icon v-if="data.opt.auth == 'password'" file-name="lock"></svg-icon>
                                    <svg-icon v-else-if="data.opt.auth == 'login'" file-name="diamond"></svg-icon>
                                    <svg-icon v-else-if="data.opt.auth == 'private'" file-name="self"></svg-icon>
                                    <svg-icon v-else file-name="image" height="21" width="21"></svg-icon>
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
                                <i-img :src="data.expand.img_src" class="card-img-top"></i-img>
                                <div class="card-img-overlay">
                                    <span>
                                        <svg-icon v-if="data.opt.auth == 'password'" file-name="lock"></svg-icon>
                                        <svg-icon v-else-if="data.opt.auth == 'login'" file-name="diamond"></svg-icon>
                                        <svg-icon v-else-if="data.opt.auth == 'private'" file-name="self"></svg-icon>
                                        <svg-icon v-else file-name="image" height="21" width="21"></svg-icon>
                                    </span>
                                    <div class="badge badge-secondary p-1">
                                        {{ data.views || 0 }}
                                    </div>
                                </div>
                            </router-link>
                            <div class="position-relative p-1 mt-2">
                                <h4 class="mt-0">
                                    <router-link :to="{name: 'article', params: { id: data.id }}" class="text-title text-line line-limit-1">
                                    <a v-on:click="routerLink({name: 'article', params: { id: data.id }}, data)" href="javascript:;" class="text-title text-line line-limit-1 flex">
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
                            <span v-show="last_page" class="see-more pt-1 pb-1 pl-3 pr-3">再怎么找也没有啦~</span>
                            <span>
                                <button v-show="!last_page" v-on:click="methods.getArticle(self_page + 1)" type="button" class="btn btn-link text-muted pt-1 pb-1 pl-3 pr-3 see-more">查看更多</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <i-footer></i-footer>

        <!-- 公告 - 开始 -->
        <teleport to="body">
        <div id="primary-placard-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="primary-placard-modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header modal-colored-placard bg-primary">
                        <h4 class="modal-title text-white">{{placard.preview.title || ''}}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <p>{{placard.preview.content}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="float-right">
                                    时间：{{placard.preview.update_time}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">我知道了</button>
                        <button v-on:click="closePlacard(placard.preview.url)" class="btn btn-primary text-white" data-dismiss="modal">详情</button>
                    </div>
                </div>
            </div>
        </div>
        </teleport>
        <!-- 公告 - 结束 -->
    </div>
</template>

<script>

import axios from 'axios'
import iImg from '@/components/tool/Iimg'
import { mapState, useStore } from 'vuex'
import { GET } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import iFooter from '@/components/public/footer'
import { onMounted, reactive, toRefs, watch, onBeforeUpdate } from 'vue'

export default {
    name: 'Index',
    components: { iFooter, iImg },
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
            banner: {               // 轮播内容
                count:0
            },
            time: {tts:''},         // 时间
            performance: {          // 性能监控
              blank: {value:0},
              dom: {
                parse: {value:0},
                completed:{value:0},
              },
              ram: {rate:0,value:0}
            },
            group: {                // 统计数据
              article:{},
              comments:{},
              other:{}
            },
            placard:{               // 公告
                show: false,
                data: {count:0,data:{}},    // 数据
                preview:{}
            }
        })

        const methods = {
            // 初始化数据
            initData(){
                methods.hitokoto()
                methods.getGroup()
                methods.getBanner()
                methods.getArticle()
                methods.getPlacard()
            },
            // 获取文章数据
            getArticle(page = 1){

                if (page <= state.article.page) {
                    if (page == state.article.page) state.last_page = true
                    const params = {limit:8,page}
                    const headers= {'login-token':`${store.state.login['login-token']}`}
                    GET('article',{
                        params,headers
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
                            document.title = store.state.theme_config.basic.site.title
                        }
                    })
                } else state.last_page = true
            },
            // 获取轮播
            getBanner(){
                const params = {
                    limit: 5
                }
                GET('banner', {params}).then(res=>{
                    if (res.data.code == 200) {
                        let result   = res.data.data
                        state.banner = result
                        let ol = document.querySelector("#carouselExampleCaptions .carousel-indicators")
                        let inner = document.querySelector("#carouselExampleCaptions .carousel-inner")
                        result.data.forEach((item, index)=>{
                            // 处理URL跳转 - 判断站内跳转 或 站外跳转
                            if (!inisHelper.is.empty(item.opt)) if (item.opt.jump == 'inside') item.url = '/#/article/' + item.opt.article_id
                            let active = (index == 0) ? 'active' : ''
                            ol.innerHTML += `<li data-target="#carouselExampleCaptions" data-slide-to="${index}" class="${active}"></li>`
                            inner.innerHTML += `<div class="carousel-item ${active}">
                              <img src="${item.img}" class="d-block w-100" alt="${item.description}">
                              <div class="carousel-caption">
                                <a href="${item.url}" target="_blank">
                                  <h5 class="text-white">${item.title}</h5>
                                  <p class="text-white">${item.description}</p>
                                </a>
                              </div>
                            </div>`
                        })
                    } else $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning")
                })
            },
            // 获取一言数据
            hitokoto(){
                // 太快了，延迟一下
                setTimeout(()=>{
                    let description = store.state.theme_config.basic.site.description
                    let check = inisHelper.is.empty(description) ? true : false
                    if (check) {
                        GET('https://v1.hitokoto.cn').then( res => {
                            state.hitokoto = res.data
                        })
                    } else state.hitokoto.hitokoto = description
                },500)
            },
            // 页面欢迎信息
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
            },
            // 获取统计数据
            getGroup(){
              const params = {
                field:'article,comments,other'
              }
              GET('group', {params}).then(res=>{
                if (res.data.code == 200) state.group = res.data.data
              })
            },
            // 获取公告内容
            getPlacard(){
                const params = {
                    whereOr:'type,=,web;type,=,all;'
                }
                GET('placard/sql', {params}).then(res=>{
                    if (res.data.code == 200) {
                        let result = res.data.data
                        state.placard.data = result
                        if (result.count > 0) {
                            let preview = result.data[0]
                            if (!inisHelper.is.empty(preview.opt)) if (preview.opt.jump == 'inside') preview.url = '/#/article/' + preview.opt.article_id
                            state.placard.preview = preview
                        }
                    }
                })
            },
        }

        onMounted(() => {
            methods.initData()
        })

        // 监听是否显示页面欢迎
        watch(()=>store.state.theme_config, ()=>{
            let theme_config = store.state.theme_config,
                basic = theme_config.basic,
                other = theme_config.other;
            // 是否显示首页欢迎
            let is_wecome = (other.module.wecome == 'true') ? true : false
            if (!inisHelper.is.empty(other.module.banner)) {
              store.state.theme_config.other.module.banner = (other.module.banner == 'true') ? true : false
            } else store.state.theme_config.other.module.banner = false
            if (is_wecome) methods.wecome()
            // 是否显示公告
            if (other.module.placard == 'true') {
                if (state.placard.data.data.length > 0) state.placard.show = true
            } else state.placard.show = false
        })

        // 是否显示公告
        watch(()=>state.placard.show,()=>{
            if (state.placard.show) {
                $('#primary-placard-modal').modal('show')
            }
        })
        onBeforeUpdate(()=>{
          let performance   = inisHelper.performance(true)
          state.performance = performance
        })

        // 返回数据
        return{ ...toRefs(state), methods }
    },
    methods: {
        natureTime(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time)
        },
        closePlacard(url = ''){
            window.location.href = url
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
    computed: {
        ...mapState(['theme_config']),
        article_data:{
            get(){
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
