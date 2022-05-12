<template>
    <div class="content-page mt-2 mt-md-0">
        <div class="content">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <div class="row px-lg-5 mx-lg-3">
                                    <div class="col-4 col-md-3 px-0">
                                        <select2 v-model="sort.value" :options="sort.data" :settings="sort.opt" class="custom-select2"></select2>
                                    </div>
                                    <div class="col-8 col-md-9 input-group px-0">
                                        <input v-model="search.value" v-on:keyup.enter="runSearch(true)" type="text" class="form-control custom-input" placeholder="擅用搜索，事半功倍！">
                                        <div class="input-group-append">
                                            <button v-on:click="runSearch(true)" class="btn" type="button">
                                                <svg-icon file-name="search" class="fs-em-13"></svg-icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row px-lg-5 mx-lg-3">
                                    <div v-show="!empty(search.record.system.data)" class="col-12 pl-0">
                                        <h4 class="header-title my-2 pl-0">热门搜索</h4>
                                        <span v-for="(item, index) in search.record.system.data" :key="index" v-on:click="runSearch(true,{},item.name)" class="badge custom-badge-secondary-lighten hover-opacity-80 cursor p-1 mr-1 mb-1">
                                            <span class="p-1">{{item.name}}</span>
                                        </span>
                                    </div>
                                    <div v-show="!empty(search.record.local)" class="col-12 pl-0">
                                        <h4 class="header-title my-2 pl-0">
                                            历史记录
                                            <i v-on:click="clearSearch()" class="float-right cursor">
                                                <svg-icon class="fs-em-13" file-name="delete"></svg-icon>
                                            </i>
                                        </h4>
                                    </div>
                                    <div class="col-12 pl-0">
                                        <span v-for="(item, index) in search.record.local" :key="index" v-on:click="runSearch(true,{},item)" class="badge custom-badge-secondary-lighten hover-opacity-80 cursor p-1 mr-1 mb-1">
                                            <span class="p-1">{{item}}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <ul v-if="search.init" class="card-header nav nav-tabs nav-bordered pb-0">
                                <li class="nav-item">
                                    <a href="#search-article" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                        <span>
                                            文章
                                            <span class="badge text-primary">{{search.result.article.count}}</span>
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#search-page" data-toggle="tab" aria-expanded="true" class="nav-link">
                                        <span>
                                            页面
                                            <span class="badge text-primary">{{search.result.page.count}}</span>
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#search-comments" data-toggle="tab" aria-expanded="false" class="nav-link">
                                        <span>
                                            评论
                                            <span class="badge text-primary">{{search.result.comments.count}}</span>
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#search-links" data-toggle="tab" aria-expanded="false" class="nav-link">
                                        <span>
                                            友链
                                            <span class="badge text-primary">{{search.result.links.count}}</span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <!-- </div> -->
                            <div v-if="!search.init" class="card-body text-center">
                                <img style="width:280px;opacity: .7;" src="assets/svg/null-search.svg">
                                <p class="text-muted custom-hr mt-5">请输入搜索关键词</p>
                            </div>
                            <div v-else class="card-body py-2 tab-content">
                                <div id="search-article" class="tab-pane show active">
                                    <div v-for="(item, index) in search.result.article.data" :key="index" class="row my-2">
                                        <div class="col-5 col-md-4">
                                            <router-link :to="{name: 'article', params: { id: item.id }}" class="img-shadow">
                                                <img :src="item.expand.img_src" class="img-cover w-100 img-h-auto" height="130">
                                            </router-link>
                                        </div>
                                        <div class="col-7 col-md-8 flex-vertical">
                                            <router-link :to="{name: 'article', params: { id: item.id }}" class="fs-em-14 text-hover-primary text-muted cursor mb-1 text-ellipsis">
                                                {{item.title || '文章标题'}}
                                            </router-link>
                                            <p class="text-ellipsis font-13 mb-1">{{item.description || '文章描述'}}</p>
                                            <p class="mb-1 d-mb-none">
                                                <span v-for="(tag, tsgs) in item.expand.tag" :key="tsgs" class="badge custom-badge-secondary-lighten hover-opacity-80 cursor p-1 mr-1 mb-1">
                                                    <span class="p-1">{{tag.name}}</span>
                                                </span>
                                            </p>
                                            <p class="mb-1 flex-space-between">
                                                <span>
                                                    <span class="d-mb-none">
                                                        <img :src="item.expand.author.head_img" class="rounded-circle avatar-xs">
                                                        {{item.expand.author.nickname}}
                                                    </span>
                                                    <span class="icon-circle">
                                                        {{natureTime(item.create_time)}}
                                                    </span>
                                                </span>
                                                <span class="float-right flex-center">
                                                    <span class="text-muted fs-em-06 flex-center mr-1">
                                                        <svg-icon i-class="article mr-1" file-name="article-comment"></svg-icon>
                                                        <span>{{format(item.expand.comments.count)}}</span>
                                                    </span>
                                                    <span class="text-muted fs-em-06 flex-center">
                                                        <svg-icon i-class="article mr-1" file-name="views"></svg-icon>
                                                        <span>{{format(item.views)}}</span>
                                                    </span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <span v-show="!empty(search.result.article.data) && search.page.article != search.result.article.page" v-on:click="runSearch(false,{article:search.page.article+1})" class="cursor opacity-06 opacity-hover-10">
                                            <svg-icon class="font-11 mr-2" file-name="more"></svg-icon>
                                            <span class="font-11 text-muted">{{(search.load) ? '加载中...' : '加载更多'}}</span>
                                        </span>
                                        <p v-show="empty(search.result.article.data) || search.page.article == search.result.article.page" class="text-muted custom-hr mb-0">
                                            <span v-if="search.load" class="flex-center">
                                                <div class="spinner-border text-primary m-1" role="status"></div>
                                                <div>加载中 ...</div>
                                            </span>
                                            <span v-else>没有更多内容了</span>
                                        </p>
                                    </div>
                                </div>
                                <div id="search-page" class="tab-pane">
                                    <div v-show="!empty(search.result.page.data)" class="row mt-3">
                                        <div v-for="(item, index) in search.result.page.data" :key="index" class="col-12">
                                            <div class="card">
                                                <h6 class="card-header">
                                                    <span>{{item.title || '标题'}}</span>
                                                    <span class="float-right">{{natureTime(item.create_time)}}</span>
                                                </h6>
                                                <div class="card-body">
                                                    <p class="card-text text-line line-limit-3">{{item.content || '内容'}}</p>
                                                    <a v-on:click="toRouter({name:'page', params:{alias:item.alias}})" href="javascript:;" class="btn btn-primary">
                                                        前往页面
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <span v-show="!empty(search.result.page.data) && search.page.page != search.result.page.page" v-on:click="runSearch(false,{page:search.page.page+1})" class="cursor opacity-06 opacity-hover-10">
                                            <svg-icon class="font-11 mr-2" file-name="more"></svg-icon>
                                            <span class="font-11 text-muted">{{(search.load) ? '加载中...' : '加载更多'}}</span>
                                        </span>
                                        <p v-show="empty(search.result.page.data) || search.page.page == search.result.page.page" class="text-muted custom-hr mb-0">
                                            <span v-if="search.load" class="flex-center">
                                                <div class="spinner-border text-primary m-1" role="status"></div>
                                                <div>加载中 ...</div>
                                            </span>
                                            <span v-else>没有更多内容了</span>
                                        </p>
                                    </div>
                                </div>
                                <div id="search-comments" class="tab-pane">
                                    <div class="media row mackdown comments" v-code-highlight>
                                        <div v-for="(item, index) in search.result.comments.data" :key="index" class="inbox-widget col-md-12">
                                            <div class="inbox-item">
                                                <div class="inbox-item-img">
                                                    <a :href="(item.url == null) ? item.url : '//'+item.url" target="_blank">
                                                        <img :src="item.expand.head_img" class="rounded-circle img-thumbnail" height="50" width="50">
                                                    </a>
                                                </div>
                                                <h5 class="inbox-item-author mt-0">
                                                    <a :href="(item.url == null) ? item.url : '//'+item.url" target="_blank" class="text-dark">{{ item.nickname }}</a>
                                                    <span class="text-muted font-13 mx-2">{{ natureTime(item.create_time) }}</span>
                                                </h5>
                                                <p v-html="item.expand.html" class="text-dark mb-0"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <span v-show="!empty(search.result.comments.data) && search.page.comments != search.result.comments.page" v-on:click="runSearch(false,{comments:search.page.comments+1})" class="cursor opacity-06 opacity-hover-10">
                                            <svg-icon class="font-11 mr-2" file-name="more"></svg-icon>
                                            <span class="font-11 text-muted">{{(search.load) ? '加载中...' : '加载更多'}}</span>
                                        </span>
                                        <p v-show="empty(search.result.comments.data) || search.page.comments == search.result.comments.page" class="text-muted custom-hr mb-0">
                                            <span v-if="search.load" class="flex-center">
                                                <div class="spinner-border text-primary m-1" role="status"></div>
                                                <div>加载中 ...</div>
                                            </span>
                                            <span v-else>没有更多内容了</span>
                                        </p>
                                    </div>
                                </div>
                                <div id="search-links" class="tab-pane">
                                    <div v-show="!empty(search.result.links.data)" class="row mt-3">
                                        <div v-for="(item, index) in search.result.links.data" :key="index" class="col-md-6">
                                            <div class="card text-white bg-white text-xs-center">
                                                <div class="card-body pb-0">
                                                    <blockquote class="card-bodyquote">
                                                        <a :href="item.url || '#'" target="_blank">
                                                            <img :src="item.head_img || 'assets/images/empty.png'" height="42" width="42" class="rounded-circle shadow-sm head-img">
                                                            <span class="text-muted">{{item.name || '昵称'}}</span>
                                                        </a>
                                                        <p class="text-muted mt-2 mb-0">{{item.description || '这个人很神秘~'}}</p>
                                                    </blockquote>
                                                </div>
                                                <div class="card-footer text-muted">
                                                    相识于：{{natureTimeDetail(item.create_time || '2021-3-14 05:20:00')}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <span v-show="!empty(search.result.links.data) && search.page.links != search.result.links.page" v-on:click="runSearch(false,{links:search.page.links+1})" class="cursor opacity-06 opacity-hover-10">
                                            <svg-icon class="font-11 mr-2" file-name="more"></svg-icon>
                                            <span class="font-11 text-muted">{{(search.load) ? '加载中...' : '加载更多'}}</span>
                                        </span>
                                        <p v-show="empty(search.result.links.data) || search.page.links == search.result.links.page" class="text-muted custom-hr mb-0">
                                            <span v-if="search.load" class="flex-center">
                                                <div class="spinner-border text-primary m-1" role="status"></div>
                                                <div>加载中 ...</div>
                                            </span>
                                            <span v-else>没有更多内容了</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div v-if="!empty(hot.data)" class="card hot mb-2">
                            <div class="card-body p-2">
                                <div class="col-12 px-0 first ribbon-box">
                                    <a v-on:click="toRouter({name: 'article', params: { id: hot.data[0].id }})" href="javascript:;">
                                        <div class="ribbon ribbon-danger float-start">
                                            <svg-icon class="fs-em-13" file-name="hot"></svg-icon>
                                            TOP1
                                        </div>
                                        <img :src="hot.data[0].expand.img_src" class="w-100 img-cover" height="200">
                                        <div class="img-mark"></div>
                                        <div class="bottom-10 position-absolute text-white mb-2">
                                            <span class="badge badge-danger font-11 ml-2">{{format(hot.data[0].views)}}人已阅读</span>
                                            <br>
                                            <span class="ml-2 font-20">{{hot.data[0].title || '文章标题'}}</span>
                                        </div>
                                    </a>
                                </div>
                                <div v-for="(item, index) in hot.data.slice(1,5)" :key="index" class="row my-2 ribbon-box">
                                    <div class="col-5 col-md-4">
                                        <div :class="((index + 2 > 3) ? 'ribbon-warning' : 'ribbon-info') + ' ribbon custom-ribbon float-start'">
                                            TOP{{index+2}}
                                        </div>
                                        <router-link :to="{name: 'article', params: { id: item.id }}">
                                            <img :src="item.expand.img_src" class="img-cover w-100" height="70">
                                        </router-link>
                                    </div>
                                    <div class="col-7 col-md-8 flex-vertical">
                                        <router-link :to="{name: 'article', params: { id: item.id }}" class="fs-em-14 text-hover-primary text-muted cursor mb-1 line-1">
                                            <span class="text-ellipsis text-hover-primary text-muted font-14 text-dark">{{item.title || '文章标题'}}</span>
                                        </router-link>
                                        <p class="mb-1">
                                            <span class="text-light">
                                                {{natureTime(item.create_time)}}
                                            </span>
                                            <span class="float-right">
                                                <span class="text-light font-12">
                                                    <span>{{format(item.views)}}人已阅读</span>
                                                </span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p v-if="!empty(tags.data)" class="ml-3 mb-2">
                            <span class="bullet bullet-vertical bg-danger h-13px mr-2"></span>
                            <span class="font-16 text-dark">标签云</span>
                        </p>
                        <div v-if="!empty(tags.data)" class="card mb-2">
                            <div class="card-body p-2">
                                <span v-for="(item, index) in tags.data" :key="index" v-on:click="toRouter({path:`/tags/${item.id}`})" :class="'badge badge-' + item.expand.color + '-lighten cursor'" style="margin: 2px;">
                                    {{item.name || '标签'}}({{item.expand.count || 0}})
                                </span>
                            </div>
                        </div>
                        <p v-if="!empty(hitokoto.data)" class="ml-3 mb-2">
                            <span class="bullet bullet-vertical bg-danger h-13px mr-2"></span>
                            <span class="font-16 text-dark">一言</span>
                        </p>
                        <div v-if="!empty(hitokoto.data)" class="card mb-2">
                            <div class="card-body">
                                <div class="card-widgets">
                                    <a v-on:click="runHitokoto()" href="javascript:;"><i class="mdi mdi-refresh"></i></a>
                                    <a data-toggle="collapse" href="#hitokoto" role="button" aria-expanded="true" aria-controls="hitokoto" class=""><i class="mdi mdi-minus"></i></a>
                                    <a href="javascript:;" data-toggle="remove"><i class="mdi mdi-close"></i></a>
                                </div>
                                <h5 class="card-title mb-0"># {{hitokoto.data.from || '来自'}} #</h5>
                                <div id="hitokoto" class="pt-3 collapse show">
                                    <div>
                                        {{hitokoto.data.hitokoto || '内容'}}
                                    </div>
                                    <div v-show="!empty(hitokoto.data.from_who)" class="float-right">
                                        作者：{{hitokoto.data.from_who || '作者'}}
                                    </div>
                                </div>
                            </div>
                            <div v-if="hitokoto.load" class="card-disabled opacity-07">
                                <div class="card-portlets-loader"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <teleport to="head">
            <!-- 代码高亮 CSS - 开始 -->
            <i-link :src="handleCDN() + 'assets/css/highlight/dark.min.css'"></i-link>
            <!-- 代码高亮 CSS - 结束 -->
        </teleport>
        <i-footer></i-footer>
    </div>
</template>

<script>

import iLink from '@/components/tool/Link'
import select2 from 'vue3-select2-component';
import iFooter from '@/components/public/footer'
import { reactive, toRefs } from 'vue'
import { Get } from '@/utils/http/fetch'
import { inisHelper } from '@/utils/helper/helper'

export default {
    components: { iFooter, select2, iLink },
    setup(){

        const state = reactive({
            search:{
                page:{
                    page:1,
                    links:1,
                    article:1,
                    comments:1,
                },
                value: '',
                init: false,
                load: false,
                result:{
                    article:{
                        page:1,
                        data:[],
                        count:0,
                    },
                    comments:{
                        page:1,
                        data:[],
                        count:0,
                    },
                    links:{
                        page:1,
                        data:[],
                        count:0,
                    },
                    page:{
                        page:1,
                        data:[],
                        count:0,
                    },
                },
                record: {
                    local:[],
                    system:{
                        data:[]
                    }
                }
            },
            sort: {
                data: [{id:0,text:'全部'}],
                opt: {
                    minimumResultsForSearch: Infinity,
                },
                value: 0,
            },
            hot:{count:0,page:1,data:[]},
            tags:{count:0,page:1,data:[]},
            hitokoto:{
                data:{},
                load: false
            }
        })

        const methods = {
            initData(){
                methods.getArticleSort()
                methods.getRecord()
                methods.setSearch()
                methods.getHotArticle()
                methods.getTags()
            },
            // 获取文章分类
            getArticleSort(){
                Get('article-sort',{limit:99}).then(res=>{
                    if (res.code == 200) {
                        const result    = res.data.data
                        state.sort.data = [...state.sort.data,...result]
                    }
                })
            },
            // 设置搜索记录
            setSearch(tag = ''){

                // 初始化搜索记录
                if (!inisHelper.get.storage('search','record')) inisHelper.set.storage('search',{record:[]})

                let array  = []
                let record = inisHelper.get.storage('search','record')
                // 对象转数组
                if (!inisHelper.is.empty(record)) for (let item in record) array.push(record[item])
                // push搜索记录
                if (!inisHelper.is.empty(tag)) array.push(tag)
                // 存储搜索记录 - 去重
                inisHelper.set.storage('search',{record:inisHelper.array.unique(array)})
                const result = inisHelper.get.storage('search','record')
                // 更新本地搜索记录
                state.search.record.local = result
                // 返回本地搜索记录
                return result
            },
            // 获取系统搜索记录
            getRecord(){
                Get('search/record',{
                    limit:20
                }).then(res=>{
                    if (res.code == 200) {
                        state.search.record.system = res.data
                    }
                })
            },
            // 获取热门文章
            getHotArticle(){
                Get('article',{
                    order:'views desc'
                }).then(res=>{
                    if (res.code == 200) {
                        state.hot = res.data
                    }
                })
            },
            // 获取标签
            getTags(){
                Get('tag',{
                    limit:99
                }).then(res=>{
                    if (res.code == 200) {
                        state.tags = res.data
                    }
                })
            }
        }

        methods.initData()

        return { ...toRefs(state), methods }
    },
    mounted(){
        if (!inisHelper.is.empty(this.$route.query.value)) {
            this.runSearch(true,{},this.$route.query.value)
        }
        this.runHitokoto()
    },
    methods:{
        // 发起搜索
        runSearch(reset = false, page = {}, value = this.search.value){
            // 重组页码
            page = {...this.search.page, ...page}
            // 设置URL参数
            this.$router.push({query:{value}})
            if (inisHelper.is.empty(value)) this.search.init = false
            else {
                // 设置搜索记录
                this.methods.setSearch(value)
                this.search.value = value
                this.search.load = true
                // 重置默认数据
                if (reset) {
                    this.search.result = {
                        article:{page:1,data:[],count:0},
                        comments:{page:1,data:[],count:0},
                        links:{page:1,data:[],count:0},
                        page:{page:1,data:[],count:0},
                    }
                    page = {page:1,links:1,article:1,comments:1}
                }
                Get('search/complex',{
                    value,
                    config: {
                        article:{
                            page: page.article,
                            sort_id:this.sort.value,
                        },
                        comments:{
                            page: page.comments,
                        },
                        links:{
                            page: page.links
                        },
                        page:{
                            page: page.page
                        },
                        record:{
                            limit: 20
                        }
                    }
                }).then(res=>{
                    if (res.code == 200) {

                        this.search.init = true
                        const result     = res.data
                        const allow      = ['article','comments','links','page']

                        for (let item in result) if (inisHelper.in.array(item, allow)) {
                            for (let i in result[item]) {
                                // 更新各个数据中的 page 和 count
                                if (i != 'data') this.search.result[item][i] = result[item][i]
                                // push数据 - 数组对象数据去重
                                else this.search.result[item].data = inisHelper.array.object.unique([
                                    ...this.search.result[item].data,
                                    ...result[item].data
                                ])
                            }
                        }
                        this.search.record.system = result.record
                        this.search.load = false
                        this.search.page = this.empty(page) ? this.search.page : page

                    } else $.NotificationApp.send(null, res.msg, "top-right", "rgba(0,0,0,0.2)", "error")
                })
            }
        },
        // 清除本地搜索记录
        clearSearch(){
            inisHelper.set.storage('search',{record:[]})
            this.search.record.local = []
        },
        // 发起一言请求
        runHitokoto(){
            this.hitokoto.load= true
            inisHelper.fetch.get('https://v1.hitokoto.cn').then(res=>{
                this.hitokoto = {
                    data:res,
                    load:false
                }
            })
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
        // 自然时间
        natureTime(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time,5)
        },
        // 详细的自然时间
        natureTimeDetail(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time)
        },
        // 格式化数字
        format(value = 0){
            return inisHelper.format.number(value)
        },
        // 判断是否为空
        empty(data = null){
            return inisHelper.is.empty(data)
        },
        // 路由跳转
        toRouter(params = {}){
            this.$router.push(params)
        }
    },
    computed: {
        // 处理select2格式
        sort(){
            this.sort.data.forEach(item=>{
                if (item.id != 0) item.text = '分类 - ' + item.name
            })
            return this.sort
        },
    },
}
</script>

<style scoped>
.custom-ribbon {
    margin-top: 10px;
    position: absolute;
    padding: 3px 6px;
    font-size: 11px;
    margin-left: -20px !important;
}
.hot .first .ribbon{
    margin-left: -20px;top: 12px;
}
.hot .first.ribbon-box img{
    margin-top: -45px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 25%);
    border-radius: var(--inis-radius);
}
.hot:not(.first) img{
    box-shadow: 0 4px 8px rgb(0 0 0 / 25%);
    border-radius: var(--inis-radius);
}
.bottom-10{
    bottom: 10px;
}
.opacity-06.opacity-hover-10{
    border-radius: 30px;
    padding: 5px 15px;
    transition: .3s;
}
.opacity-06.opacity-hover-10:hover{
    background: #3232320f;
    transition: 0.3;
}
.opacity-06.opacity-hover-10:hover > .mr-2{
    margin-right: 0.375rem!important;
    transition: .3s;
}
.opacity-06.opacity-hover-10 > .mr-2{
    transition: .3s;
}
.spinner-border{width: 1em;height: 1em;border: .18em solid currentColor;border-right-color: transparent;}
#search-links .card-bodyquote img:first-child {
    position: absolute;
    top: -20px;
}
#search-links .card-bodyquote span.text-muted {
    position: absolute;
    top: 4px;
    left: 74px;
    font-size: 12px;
}
</style>