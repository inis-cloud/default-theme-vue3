<template>
    <div class="content-page">
        <div class="content links-page">
            <div class="row">

                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">

                            <h4 class="header-title mb-3">友情链接</h4>
                            <ul class="nav nav-tabs nav-bordered mb-3">
                                <li class="nav-item">
                                    <a href="#apply-links" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                        <span>申请友链</span>
                                    </a>
                                </li>
                                <li v-for="data in sort.data" :key="data.id" v-on:click="methods.getSortData(data.id)" class="nav-item">
                                    <a :href="'#links-sort-'+data.id" data-toggle="tab" aria-expanded="false" class="nav-link">
                                        <span>{{data.name}}</span>
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane show active" id="apply-links">
                                    <div v-if="is_load" class="card-body flex-center">
                                        <div class="spinner-border text-primary m-1" role="status"></div>
                                        <div>加载中...</div>
                                    </div>
                                    <div v-html="links_page.content" v-code-highlight class="article-content"></div>
                                </div>

                                <div v-for="data in sort.data" :key="data.id" :id="'links-sort-'+data.id" class="tab-pane">
                                    <div v-if="is_load" class="card-body flex-center">
                                        <div class="spinner-border text-primary m-1" role="status"></div>
                                        <div>加载中...</div>
                                    </div>
                                    <div v-else-if="!is_load" class="row">
                                        <div v-for="(data,index) in links_data.data" :key="index" class="col-md-6">
                                            <a :href="data.url || 'javasctipt:;'" target="_blank">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="media">
                                                            <img :src="data.head_img || null" :alt="data.description || '这个人很懒，什么都没留下！'" class="mr-3 rounded-circle" width="40" height="40">
                                                            <div class="media-body">
                                                                <h5 class="mt-0 mb-1 text-dark">{{data.name || '友链名称'}}</h5>
                                                                <span class="font-13 text-muted text-line line-limit-1">{{data.description || '这个人很懒，什么都没留下！'}}</span>
                                                            </div>
                                                            <span :class="'d-none d-xl-block badge ' + methods.randomClass()">{{methods.natureTime(data.create_time)}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-body">

                            <h4 class="header-title">友链统计</h4>

                            <div class="flex-center">
                                <canvas id="links-chart"></canvas>
                            </div>

                            <div class="chart-widget-list">
                                <p v-for="(data,index) in links_chart" :key="index">
                                    {{data.name}}
                                    <span class="float-right">{{data.value}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title">评论<span class="badge bg-primary rounded-pill text-white float-right">{{comments.count}}</span></h4>
                            <i-box v-if="config.comment.show" :params="{type:'links'}" v-on:change="methods.getComments()" class="mt-3"></i-box>
                        </div>
                        <div class="card-body pt-0">
                            <div class="inis-scroll">
                                <div class="media row mackdown comments" v-code-highlight>
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
                                            <p v-html="data.expand.html" class="text-dark mb-0"></p>
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
                                            <p v-html="reply.expand.html" class="text-dark"></p>
                                            <!-- 评论框 - 开始 -->
                                            <i-box v-if="config.comment.reply_id == reply.id" :params="{type:'links',pid:reply.id}" v-on:change="methods.getComments()" class="mt-3"></i-box>
                                            <!-- 评论框 - 结束 -->
                                        </div>
                                        <!-- 回复 - 结束 -->

                                        <!-- 评论框 - 开始 -->
                                        <i-box v-if="config.comment.reply_id == data.id" :params="{type:'links',pid:data.id}" v-on:change="methods.getComments()" class="mt-3"></i-box>
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
            <!-- 代码高亮 CSS - 结束 -->
        </teleport>
        <i-footer></i-footer>
    </div>
</template>

<script>
import iLink from '@/components/tool/Link'
import { GET } from '@/utils/http/request'
import iFooter from '@/components/public/footer'
import iBox from "@/components/module/comments/page/box"
import { onMounted, reactive, toRefs } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import * as echarts from 'echarts'
import { useStore } from 'vuex'

export default {
    components: { iFooter, iLink, iBox },
    setup(){

        const state = reactive({
            sort: [],       // 分类数据
            links_data: [], // 友链数据
            is_load: true,  // 加载动画
            links_chart: [],// 友链统计
            links_page:"",  // 页面数据
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

        // Vuex 响应实例
        const store = useStore()

        const methods = {
            // 初始化数据
            initData(){
                methods.getSortData()
                methods.getLinksPage()
                methods.getComments()
            },
            // 获取分类数据
            getSortData(id = null){

                state.is_load = true
                
                let params = {id,limit:999,order:"id asc"}

                GET('links-sort/all', {params}).then(res=>{
                    if (res.data.code == 200) {
                        if (inisHelper.is.empty(id)) {
                            state.sort = res.data.data
                            state.sort.data.forEach((item)=>{
                                state.links_chart.push({name:item.name,value:item.expand.count})
                            })
                            methods.caches()
                        } else {
                            state.links_data = res.data.data.expand
                            // 加载动画
                            state.is_load = false
                        }
                    }
                })
            },
            // 获取友链页面
            getLinksPage(){
                let params = {alias:"links"}
                GET('page/one',{params}).then(res=>{
                    if (res.data.code == 200) {
                        state.is_load = false
                        state.links_page = res.data.data
                        // 设置页面 title
                        document.title = state.links_page.title + ' - ' + store.state.theme_config.basic.site.title
                    }
                })
            },
            // 人性化时间
            natureTime(date = null){
                let time = inisHelper.date.to.time(date)
                return inisHelper.time.nature(time)
            },
            // 随机 class
            randomClass(){
                let array = ['badge-primary-lighten','badge-secondary-lighten','badge-success-lighten','badge-danger-lighten','badge-warning-lighten','badge-info-lighten','badge-dark-lighten'];
                return array[parseInt(Math.random() * array.length)]
            },
            // 统计友链图表
            caches(){
                let chart = echarts.init(document.querySelector("#links-chart"));
                chart.setOption({
                    tooltip : {
                        trigger: 'item',
                    },
                    series : [{
                        name: '友链统计',
                        type: 'pie',
                        radius: '60%',
                        data: state.links_chart,
                        roseType: 'angle',
                    }]
                })
            },
            // 获取评论
            getComments(){
                const params = {
                    type:'links'
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
        natureTime(date){
            let time = inisHelper.date.to.time(date)
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
    }
}
</script>

<style scoped>
.text-white.float-right{padding: 2px 6px;}
.inis-scroll::-webkit-scrollbar{display: none;}
.inis-scroll{
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    max-height: 500px;
}
</style>