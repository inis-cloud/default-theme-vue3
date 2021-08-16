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

            <!-- <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="https://api.inis.cn/storage/banner/1565407459914.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="https://api.inis.cn/storage/banner/1565407459914.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="https://api.inis.cn/storage/banner/1565407459914.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions"  data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions"  data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </button>
            </div> -->
            
            <div class="row mb-2 master-info">
                <div class="col-sm-4">
                    <h1 class="page-title display-6">{{site_info.title}}</h1>
                    <p class="text-muted mb-0">{{hitokoto.hitokoto}}</p>
                </div>
                <div v-if="false" class="col-sm-8">
                    <div class="text-sm-right">
                        <div class="btn-group mb-3">
                            <button type="button" class="btn btn-primary">全部</button>
                        </div>
                        <div class="btn-group mb-3 ml-1">
                            <button type="button" class="btn btn-light" v-for="(sort, id) in article_sort" :key="id">{{ sort.name }}</button>
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
                                    <router-link :to="{name: 'article', params: { id: data.id }}" class="text-title text-line line-limit-1">
                                        <span v-if="data.is_top == 1" class="badge badge-danger mr-1">置顶</span>
                                        {{ data.title }}
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
            </div>

            <teleport to="body">
                <div v-if="page_is_show" class="btn-group inis-page-list" style="float: right">
                    <button v-if="article.self_page != 1" v-on:click="methods.getArticle({page:article.self_page-1})" type="button" class="btn btn-light inis-btn-page">
                        <span class="inis-page">
                            <svg-icon :file-name="(is_mobile) ? 'primary-left' : 'primary-upper'"></svg-icon>
                        </span>
                    </button>
                    <button v-for="(item, index) in article.page_list" :key="index" v-on:click="methods.getArticle({page:item})" :class="(article.self_page == item) ? 'btn inis-btn-page btn-primary' : 'btn inis-btn-page btn-light'">{{item}}</button>
                    <button v-if="article.self_page != article.page" v-on:click="methods.getArticle({page:article.self_page+1})" type="button" class="btn btn-light inis-btn-page">
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
import iFooter from '@/components/public/footer'
import { GET } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs, onBeforeUpdate } from 'vue'
import { mapState, useStore } from 'vuex'

export default {
    name: 'Index',
    components: { iFooter },
    setup() {

        const state = reactive({
            article_sort: [],       // 文章分类
            hitokoto: [],           // 一言
            article: [],            // 文章数据
            is_mobile: inisHelper.get.storage('inis','mobile'),       // 是否为手机
            page_is_show: true,     // 是否显示分页
        })

        // Vuex 响应实例
        const store = useStore()

        const methods = {
            // 获取文章数据
            getArticle(opt){
                // 从缓存中获取分页码 - 防止刷新页面，分页数据也刷新
                const storage = inisHelper.get.storage('article','page')
                const page = (inisHelper.is.empty(storage) || !storage) ? 1 : storage

                opt = opt || {page}

                GET('article',{params:{limit:8,page:opt.page}}).then((res)=>{
                    if (res.data.code == 200) {
                        // 设置文章列表数据
                        state.article = res.data.data
                        // 设置当前分页码
                        state.article.self_page = opt.page
                        // 分页码列表
                        state.article.page_list = inisHelper.create.paging(opt.page, res.data.data.page, 7)
                        // 是否显示分页码
                        if(inisHelper.is.empty(res.data.data.data) || res.data.data.page == 1) state.page_is_show = false
                        else state.page_is_show = true
                        // 设置分页码到缓存中
                        inisHelper.set.storage('article',{'page':opt.page})
                        // 设置页面 title
                        document.title = store.state.site_info.title
                    }
                })
            },
            // 设置分页
            setPage(){
                if (state.page_is_show) {
                    // 计算分页码页面居中位置
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
            }
        }
        onMounted(() => {
            methods.getArticle()
            // 获取文章分类
            GET('article-sort').then( res => {
                state.article_sort = res.data.data.data
            }),
            // 获取一言数据
            GET('https://v1.hitokoto.cn').then( res => {
                state.hitokoto = res.data
                // $('.carousel-inner').carousel({
                //     interval: 1000,
                //     keyboard: true
                // })
            })
        })

        onBeforeUpdate(()=>{
            methods.setPage()
        })

        // 返回数据
        return{ ...toRefs(state), methods }
    },
    methods: {
        // 页面跳转
        toPage(id) {
            this.$router.push(`/article/`+id)
        },
        natureTime(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time)
        }
    },
    computed: {
        ...mapState(['site_info'])
    }
}
</script>

<style scoped>
.badge-secondary{opacity: .7;right: 2em;position: absolute;}
</style>