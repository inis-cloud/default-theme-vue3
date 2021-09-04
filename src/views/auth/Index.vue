<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 控制台组件                                                             -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <div class="content-page">

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <div class="page-title-right">
                            <!-- <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Hyper</a></li>
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
                                <li class="breadcrumb-item active">Ecommerce</li>
                            </ol> -->
                        </div>
                        <h4 class="page-title">控制台</h4>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-5">

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card widget-flat">
                                <div class="card-body">
                                    <h5 class="text-muted font-weight-normal mt-0">用户</h5>
                                    <h3 class="mt-3 mb-3">{{group.users || 0}}</h3>
                                    <p class="mb-0 text-muted">
                                        <span class="text-nowrap">本站的注册用户量</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="card widget-flat">
                                <div class="card-body">
                                    <h5 class="text-muted font-weight-normal mt-0">友链</h5>
                                    <h3 class="mt-3 mb-3">{{group.links || 0}}</h3>
                                    <p class="mb-0 text-muted">
                                        <span class="text-nowrap">拥有的友链数量</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card widget-flat">
                                <div class="card-body">
                                    <h5 class="text-muted font-weight-normal mt-0">评论</h5>
                                    <h3 class="mt-3 mb-3">{{group.comments || 0}}</h3>
                                    <p class="mb-0 text-muted">
                                        <span class="text-nowrap">全站的评论数量</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="card widget-flat">
                                <div class="card-body">
                                    <h5 class="text-muted font-weight-normal mt-0">页面</h5>
                                    <h3 class="mt-3 mb-3">{{group.page || 0}}</h3>
                                    <p class="mb-0 text-muted">
                                        <span class="text-nowrap">创建的独立页面</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-7">
                    <div class="card">
                        <div class="card-body">

                            <h4 class="header-title mb-3">12天内日访客量</h4>

                            <div class="flex-center">
                                <canvas id="visit"></canvas>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-8">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-3">7天内数据统计</h4>

                            <div class="flex-center">
                                <canvas id="count"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card bg-primary">
                        <div class="card-body">
                            <h4 class="header-title text-white mb-4">累计文章数量</h4>
                            <div class="text-center">
                                <p class="mt-4 mb-2">
                                    <span class="badge badge-danger">{{group.articlesort || 0}} 个分类</span>
                                </p>
                                <h3 class="font-weight-normal text-white mb-2">{{group.article || 0}} 篇</h3>
                                <p class="text-light text-uppercase font-13 font-weight-bold">{{group.tag || 0}} 个标签</p>
                                <a href="javascript: void(0);" class="btn btn-outline-light btn-sm mb-1">
                                    管理
                                    <i class="mdi mdi-arrow-right ml-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-2">最新评论</h4>

                            <div class="inis-slimscroll">
                                <div class="timeline-alt pb-0">

                                    <div v-for="data in comments.data" :key="data.id" class="timeline-item">
                                        <i class="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                                        <div class="timeline-item-info">
                                            <a href="javascript:;" class="text-primary font-weight-bold mb-1 d-block">
                                                <span v-if="data.expand.article">《{{data.expand.article.title || '文章'}}》 - </span>
                                                <span>昵称：{{data.nickname || '谁评论的'}}</span>
                                            </a>
                                            <small>{{data.content || '评论内容'}}</small>
                                            <p class="mb-0 pb-2">
                                                <small class="text-muted">{{natureTime(data.create_time)}}</small>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <i-footer></i-footer>
    </div>
</template>

<script>
import iFooter from '@/components/public/footer'
import { GET } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);

export default {
    components: { iFooter },
    setup(){

        // Vuex 响应实例
        const store = useStore()
        const state = reactive({
            visit: {title:[],data:[]},          // 访客数据
            count: {title:[],links:[],article:[],users:[],comments:[],tag:[]},  // 统计每日数据
            group: [],                          // 总数据统计
            comments: [],                       // 最新评论
        })

        const methods = {
            // 初始化
            initData(){
                methods.getVisit()
                methods.getCount()
                methods.getGroup()
                methods.getComments()
            },
            getVisit(){
                let timestamp = Math.round(new Date / 1000) - (12 * 86400)
                GET('group',{
                    params:{ mode: "detail", field: "visit", timestamp }
                }).then(res=>{
                    if (res.data.code == 200) {
                        let visit = res.data.data.visit
                        visit.forEach(item=>{
                            state.visit.title.push(methods.getWeek(item[0]))
                            state.visit.data.push(item[1])
                        })
                        methods.visit()
                    }
                })
            },
            // 绘制图标
            visit(){

                let dom    = document.querySelector("#visit")
                let width  = document.querySelector(".col-xl-7")
                let height = document.querySelector(".col-xl-5 .col-lg-6 .card-body")

                let charts = echarts.init(dom)

                dom.style.width  = `${width.offsetWidth}px`
                dom.style.height = `${height.offsetHeight * 2 - 60}px`

                const top_color = ["#02c3f1", "#53e568", "#a154e9", '#ffa800', '#1ace4a', '#4bf3ff', '#4f9aff', '#b250ff', '#1ace4a', '#4bf3ff', '#4f9aff', '#b250ff'];
                const bottom_color = ["rgba(2,195,241,0.1)", "rgba(83, 229, 104, 0.1)", "rgba(161, 84, 233, 0.1)", 'rgba(248,195,248,.3)', 'rgba(100,255,249, 0.3)', 'rgba(135,183,255,.3)', 'rgba(11,42,84,.3)', 'rgba(100,255,249,.3)', 'rgba(100,255,249, 0.3)', 'rgba(135,183,255,.3)', 'rgba(11,42,84,.3)', 'rgba(100,255,249,.3)'];
                
                state.visit.title[state.visit.title.length-1] = '昨天'
                
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: (params) => {
                            params = params[0]
                            return params.name + '<br/>' + params.value;
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: state.visit.title
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: 'bar',
                        data: state.visit.data,
                        itemStyle: {
                            normal: {
                                color: (params) => {
                                    return new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1, [{
                                            offset: 1,
                                            color: top_color[params.dataIndex]
                                        }, {
                                            offset: 0,
                                            color: bottom_color[params.dataIndex]
                                        }]
                                    );
                                },
                            },
                        },
                    }]
                }

                charts.setOption(option)
                charts.resize()
                
                window.addEventListener('resize', ()=>{
                    dom.style.width  = `${width.offsetWidth - 50}px`
                    dom.style.height = `${height.offsetHeight * 2 - 60}px`
                    charts.resize()
                })
            },
            // 获取星期
            getWeek(string){
                
                let date = null

                if (inisHelper.is.empty(string)) date = new Date;
                else {
                    let array = string.split("-");
                    date = new Date(array[0], parseInt(array[1] - 1), array[2]);
                }

                return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
            },
            // 获取统计
            getCount(){
                GET('group',{
                    params:{ mode: "detail", field: "visit", field: "links,article,users,comments,tag" }
                }).then(res=>{
                    if (res.data.code == 200) {
                        let count = res.data.data
                        const links = count.links
                        links.forEach(item=>{
                            state.count.title.push(methods.getWeek(item[0]))
                        })
                        for (let items in count) {
                            if (items == 'links')         count[items].forEach(item=>state.count.links.push(item[1])) 
                            else if (items == 'article')  count[items].forEach(item=>state.count.article.push(item[1]))
                            else if (items == 'users')    count[items].forEach(item=>state.count.users.push(item[1]))
                            else if (items == 'comments') count[items].forEach(item=>state.count.comments.push(item[1]))
                            else if (items == 'tag')      count[items].forEach(item=>state.count.tag.push(item[1]))
                        }

                        state.count.title[state.count.title.length - 1] = '昨天'
                        methods.count()
                    }
                })
            },
            // 统计
            count(){
                let dom    = document.querySelector("#count")
                let charts = echarts.init(dom)
                dom.style.width  = `${document.querySelector(".col-xl-8").offsetWidth - 50}px`
                dom.style.height = `430px`
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['文章', '评论', '用户', '友链', '标签']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: state.count.title
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '文章',
                            type: 'line',
                            stack: '总量',
                            data: state.count.article
                        },
                        {
                            name: '评论',
                            type: 'line',
                            stack: '总量',
                            data: state.count.comments
                        },
                        {
                            name: '用户',
                            type: 'line',
                            stack: '总量',
                            data: state.count.users
                        },
                        {
                            name: '友链',
                            type: 'line',
                            stack: '总量',
                            data: state.count.links
                        },
                        {
                            name: '标签',
                            type: 'line',
                            stack: '总量',
                            data: state.count.tag
                        }
                    ]
                };
                // charts.setOption(option)
                unwarp(charts).setOption(option);
                charts.resize()
                window.addEventListener('resize', () => {
                    let width = document.querySelector(".col-xl-8").offsetWidth
                    dom.style.width  = `${width - 50}px`
                    charts.resize()
                })
            },
            // 统计中数据
            getGroup(){
                GET('group').then(res=>{
                    if (res.data.code == 200) {
                        let group = res.data.data
                        for (let item in group) {
                            group[item] = group[item].count
                        }
                        state.group = group
                    }
                })
            },
            getComments(){
                let user = []
                // 获取缓存中的登录信息
                let login_storage = inisHelper.get.storage("login")
                // 判断缓存是否存在且未过期
                if (login_storage != "expire" && login_storage != false) {
                    user = login_storage.user
                }
                const email = `email,<>,${user.email}`
                GET('comments/sql',{
                    params:{whereOr:email}
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.comments = res.data.data
                    }
                })
            },
        }

        watch(()=>store.state.theme_config,()=>{
            let site = store.state.theme_config.site
            // 设置页面 title
            document.title = site.title
        })

        onMounted(()=>{
            methods.initData()
        })

        return { ...toRefs(state), methods }
    },
    methods: {
        // 自然时间
        natureTime(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time)
        }
    }
}
</script>

<style scoped>
.inis-slimscroll{border:none;resize:none;overflow-x:hidden;overflow-y:auto;overflow-wrap:break-word;outline:none;scrollbar-width: thin;scrollbar-color: rgba(0,0,0,.2) transparent;}
.inis-slimscroll::-webkit-scrollbar{width:4px;height:10px;background-color:rgba(110, 110, 110, 0)}
.inis-slimscroll::-webkit-scrollbar-thumb{border-radius:6px;background-color:rgba(0,0,0,.2);transition:all .4s ease;-moz-transition:all .4s ease;-webkit-transition:all .4s ease;-o-transition:all .4s ease}
.inis-slimscroll::-webkit-scrollbar-track{background-color:rgba(0,0,0,.1)}
</style>