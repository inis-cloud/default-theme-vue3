<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 管理文章组件                                                           -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <div class="content-page">

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <div class="page-title-right">
                        </div>
                        <h4 class="page-title">管理文章</h4>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">

                            <ul class="nav nav-tabs nav-bordered mb-3">
                                <li class="nav-item">
                                    <a href="#all" data-toggle="tab" aria-expanded="false" class="nav-link">
                                        <span>全部</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#me" data-toggle="tab" aria-expanded="true" class="nav-link active">
                                        <span>我的</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#destroy" data-toggle="tab" aria-expanded="false" class="nav-link">
                                        <span>回收站</span>
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane" id="all">

                                </div>
                                <div class="tab-pane show active" id="me">
                                    <!-- 加载动画 开始 -->
                                    <div v-if="is_load" class="table-responsive load mb-2">
                                        <div class="spinner-border text-primary m-1" role="status"></div>
                                        <div>加载中 ...</div>
                                    </div>
                                    <!-- 加载动画 结束 -->
                                    <div v-if="!is_load" class="table-responsive-sm">
                                        <table class="table table-centered mb-0">
                                            <thead>
                                                <tr>
                                                    <th>作者</th>
                                                    <th>标题</th>
                                                    <th>时间</th>
                                                    <th>访客</th>
                                                    <th>评论</th>
                                                    <th>置顶</th>
                                                    <th>显示</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="data in me_article.data" :key="data.id">
                                                    <td class="table-user">
                                                        <a href="javascript:;" class="text-body font-weight-semibold" data-toggle="tooltip" data-placement="top" :data-original-title="data.expand.author.description">
                                                            <img :src="data.expand.author.head_img" alt="table-user" class="mr-1 rounded-circle">
                                                            {{data.expand.author.nickname}}
                                                        </a>
                                                    </td>
                                                    <td><a :href="'/index/WriteArticle?id=' + data.id" class="text-body font-weight-bold" data-toggle="tooltip" data-placement="top" :data-original-title="'创建时间：'+ data.create_time">{{data.title}}</a>
                                                    </td>
                                                    <td>{{data.create_time}}</td>
                                                    <td>
                                                        <span class="badge badge-info-lighten">
                                                            <svg-icon i-class="article" file-name="views"></svg-icon>
                                                            {{data.views}}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span class="badge badge-success-lighten">
                                                            <svg-icon i-class="article" file-name="article-comment"></svg-icon>
                                                            {{data.expand.comments}}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <input :id="'switch-top-me-' + data.id" v-model="is_top.me" :value="data.id" type="checkbox" data-switch="danger"/>
                                                            <label :for="'switch-top-me-' + data.id" data-on-label="Yes" data-off-label="No" class="mb-0 d-block"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <input :id="'switch-show-me-' + data.id" v-model="is_show.me" :value="data.id" type="checkbox" data-switch="success"/>
                                                            <label :for="'switch-show-me-' + data.id" data-on-label="Yes" data-off-label="No" class="mb-0 d-block"></label>
                                                        </div>    
                                                    </td>
                                                    <td>
                                                        <a type="button" :href="'/index/WriteArticle?id=' + data.id" class="btn btn-outline-info btn-sm mr-1">
                                                            <svg t="1603942550558" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3087" width="14" height="14">
                                                                <path d="M906.116912 36.819799l6.357068 5.84509 66.685222 65.789259a134.778384 134.778384 0 0 1 6.826382 185.592267l-6.101079 6.399733L299.038207 998.187742a85.329778 85.329778 0 0 1-53.459106 25.385609L237.984751 1023.957335H43.304862a42.664889 42.664889 0 0 1-42.366234-37.545102l-0.298655-4.991792-0.554643-178.168576a85.329778 85.329778 0 0 1 19.711178-54.781718l5.034457-5.546435L719.202033 42.664889a138.063581 138.063581 0 0 1 186.914879-5.84509zM981.292446 938.627557a42.664889 42.664889 0 0 1 0 85.329778h-511.978667a42.664889 42.664889 0 1 1 0-85.329778h511.978667zM86.3964 786.783217l-4.735803 4.735803L84.433815 938.627557h153.508271l0.08533-0.213324-151.631016-151.631016zM676.32382 204.791467L147.151202 726.796383l150.521728 150.521729L818.440565 343.665681 676.32382 204.791467zM981.249781 767.968001a42.664889 42.664889 0 0 1 0 85.329778h-255.989334a42.664889 42.664889 0 1 1 0-85.329778h255.989334zM783.626016 99.494521l-4.607808 4.0105-41.939586 41.342277 140.922128 137.764926 41.512937-42.494229c6.783717-6.613058 11.43419-15.018041 13.567435-24.148327l0.938627-5.546436 0.341319-5.631765c0-11.391525-3.92517-22.399067-11.092871-31.230699l-3.882505-4.266489-66.727886-65.789258-4.181159-3.669181a52.733803 52.733803 0 0 0-64.850631-0.341319z" fill="#008df0" p-id="3088">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                        <a type="button" class="btn btn-outline-danger btn-sm">
                                                            <svg t="1603942959679" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5903" width="14" height="14">
                                                                <path d="M973.312 187.904h-172.544V121.856c0-60.928-49.664-111.104-110.592-111.616H334.336c-61.44 0-111.616 50.176-111.616 111.616v66.048H50.688c-22.528 0-40.448 18.432-40.448 40.448 0 22.528 18.432 40.448 40.448 40.448H972.8c22.528 0 40.448-18.432 40.448-40.448 0.512-22.528-17.92-40.448-39.936-40.448zM304.128 121.856c0-16.896 13.824-30.208 30.208-30.208h355.328c16.384 0 29.696 13.312 29.696 29.696v66.56H304.128V121.856zM831.488 330.752c-22.528 0-40.448 18.432-40.448 40.448v531.456c0 16.896-13.824 30.208-30.208 30.208h-496.64c-16.896 0-30.208-13.824-30.208-30.208v-532.48c0-22.528-18.432-40.448-40.448-40.448-22.528 0-40.448 18.432-40.448 40.448v531.968c0 61.44 50.176 111.616 111.616 111.616h496.64c61.44 0 111.616-50.176 111.616-111.616V371.2c-1.024-22.528-19.456-40.448-41.472-40.448z" fill="#d81e06" p-id="5904" data-spm-anchor-id="a313x.7781069.0.i11" class="">
                                                                </path>
                                                                <path d="M405.504 532.992c-22.528 0-40.448 18.432-40.448 40.448v202.24c0 18.432 12.8 34.304 29.696 38.912l-1.536 1.536h17.408v-0.512c19.968-2.56 35.328-19.456 35.328-39.936V573.44c0-22.016-17.92-40.448-40.448-40.448zM405.504 329.728c-22.528 0-40.448 18.432-40.448 40.448v88.064c0 18.432 12.8 34.304 29.696 38.912l-1.536 1.536h17.408v-0.512c19.968-2.56 35.328-19.456 35.328-39.936V370.176c0-22.016-17.92-40.448-40.448-40.448zM623.616 329.728l-17.408-0.512 1.536 1.536c-16.896 4.608-29.696 20.48-29.696 38.912v202.24c0 22.528 18.432 40.448 40.448 40.448s40.448-18.432 40.448-40.448V370.176c0-20.48-15.36-37.376-35.328-40.448zM623.616 647.168l-17.408-0.512 1.536 1.536c-16.896 4.608-29.696 20.48-29.696 38.912v88.064c0 22.528 18.432 40.448 40.448 40.448s40.448-18.432 40.448-40.448v-88.576c0-19.968-15.36-36.864-35.328-39.424z" fill="#d4237a" p-id="5905" data-spm-anchor-id="a313x.7781069.0.i12" class="selected">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div v-if="page_is_show.me" class="btn-group mt-2" style="float: right">
                                        <button type="button" class="btn btn-light" v-on:click="methods.getMeArticle(1)">首页</button>
                                        <button v-for="(item, index) in page_list.me" :key="index" v-on:click="methods.getMeArticle(item)" class="btn btn-light">{{item}}</button>
                                        <button type="button" class="btn btn-light" v-on:click="methods.getMeArticle(me_article.page)">末页</button>
                                        <div class="btn-group">
                                            <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">其他</button>
                                            <div class="dropdown-menu dropdown-menu-animated">
                                                <a class="dropdown-item" href="javascript:;" v-on:click="methods.getMeArticle('',self_page.me-1)">上一页</a>
                                                <a class="dropdown-item" href="javascript:;" v-on:click="methods.getMeArticle('',self_page.me+1)">下一页</a>
                                                <a class="dropdown-item" href="javascript:;">共 {{me_article.page}} 页</a>
                                                <a class="dropdown-item" href="javascript:;">共 {{me_article.count}} 条数据</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="destroy">

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
import { Get } from '@/utils/http/fetch'
import { useStore } from 'vuex'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs, watch } from 'vue'

export default {
    components: { iFooter },
    setup(){

        // Vuex 响应实例
        const store = useStore()
        const state = reactive({
            is_load: false
        })

        const methods = {
            // 初始化
            initData(){
                methods.getMeArticle()
            },
            // 初始化 state
            initState(){
                state.me_article   = []                                        // 我的文章
                state.is_top       = {my:[], me:[]}                            // 是否置顶
                state.is_show      = {my:[], me:[]}                            // 是否显示
                state.page_is_show = {my:false, me:false, destroy:false}       // 是否显示页脚
                state.self_page    = {my:1, me:1, destroy:1}                   // 当前页码
                state.page_list    = {my:[],me:[],destroy:[]}                  // 页码列表
            },
            // 获取全部文章
            getAllArticle(id = null){
                GET('article/sql').then(res=>{
                    console.log(res.data.data)
                })
            },
            // 获取我的文章
            getMeArticle(page = 1){
                state.is_load = true
                Get('article/sql', {
                    page,
                    limit: 10,
                    where:[
                        ['users_id', '=', store.state.login.user.id]
                    ],
                    'login-token':store.state.login['login-token']
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.me_article   = res.data.data
                        // 当前页码
                        state.self_page.me = page
                        // 页码列表
                        if (state.me_article.count != 0) state.page_list.me = inisHelper.create.paging(state.self_page.me, state.me_article.page, 7)
                        // 是否显示分页
                        state.page_is_show.me = (inisHelper.isEmpty(state.me_article.data) || state.me_article.page == 1) ? false : true
                        // 文章置顶开关 和 文章显示开关
                        state.me_article.data.forEach((item) => {
                            if(item.is_top  === 1) state.is_top.me.push(item.id)
                            if(item.is_show === 1) state.is_show.me.push(item.id)
                        })
                        // 加载中动画
                        state.is_load = false
                    } else {
                        $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning")
                    }
                })
            }
        }

        methods.initState()

        watch(()=>store.state.theme_config,()=>{
            let site = store.state.theme_config.site
            // 设置页面 title
            document.title = basic.site.title
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
.table tr, .table td, .table th {border-top: 1px solid #e3eaef!important;padding: .95rem!important;}
.table > thead > tr, .table > thead > tr th{border-top: none!important;}
/* 加载动画 */
.load{display:flex;align-items: center;justify-content: center;}
.load .spinner-border{width: 1em;height: 1em;border: .18em solid currentColor;border-right-color: transparent;}
.svg-icon-article{width: 1.2em;height: 1.2em;}
.svg-icon-article.views{fill:rgb(67, 140, 255);}
.svg-icon-article.article-comment{fill:rgb(10, 207, 151);}
</style>