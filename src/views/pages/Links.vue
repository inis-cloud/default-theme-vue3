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
            </div>
        </div>
    </div>
    <i-footer></i-footer>
</div>
</template>

<script>
import iLink from '@/components/tool/Link'
import { GET } from '@/utils/http/request'
import iFooter from '@/components/public/footer'
import { onMounted, reactive, toRefs } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import * as echarts from 'echarts'
import { useStore } from 'vuex'

export default {
    components: { iFooter, iLink },
    setup(){

        const state = reactive({
            sort: [],       // 分类数据
            links_data: [], // 友链数据
            is_load: true,  // 加载动画
            links_chart: [],// 友链统计
            links_page:"",  // 页面数据
        })

        // Vuex 响应实例
        const store = useStore()

        const methods = {
            // 初始化数据
            initData(){
                methods.getSortData()
                methods.getLinksPage()
            },
            // 获取分类数据
            getSortData(id = null){

                state.is_load = true
                
                let params = {id,limit:999,order:"id asc"}

                GET('links-sort', {params}).then(res=>{
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
                GET('page',{params}).then(res=>{
                    if (res.data.code == 200) {
                        state.is_load = false
                        state.links_page = res.data.data
                        // 设置页面 title
                        // 设置页面 title
                        document.title = state.links_page.title + ' - ' + store.state.theme_config.site.title
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
        }

        onMounted(()=>{
            methods.initData()
        })

        return { ...toRefs(state), methods }
    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>