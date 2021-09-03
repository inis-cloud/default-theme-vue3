<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 公共顶部导航组件                                                       -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <div class="navbar-custom topnav-navbar fixed-top">
        <div class="container-fluid">

            <!-- LOGO -->
            <a href="/" class="topnav-logo">
                <span class="topnav-logo-lg">
                    <img :src="theme_config.logo.big_day || 'assets/images/logo.png'" height="32">
                </span>
                <span class="topnav-logo-sm">
                    <img :src="theme_config.logo.small_day || 'assets/images/logo_sm.png'" height="28">
                </span>
            </a>

            <ul class="list-unstyled topbar-right-menu float-right mb-0 navbar-list">
                
                <li v-show="is_update" class="dropdown notification-list nav-item">
                    <a data-toggle="modal" data-target="#update-info" class="nav-link dropdown-toggle arrow-none nav-item" href="javascript:;" role="button" aria-haspopup="true" aria-expanded="false">
                        <!-- 图标 -->
                        <div id="lottie-beil"></div>
                        <!-- 点点 -->
                        <span class="bg-danger dots"></span>
                    </a>
                </li>

                <li v-show="music_is_show" v-on:click.stop="setClass('#show-music')" id="show-music" class="dropdown notification-list music-nav">
                    <a class="nav-link dropdown-toggle arrow-none nav-item" href="javascript:;" id="topbar-music" role="button" aria-haspopup="true" aria-expanded="false">
                        <!-- 图标 -->
                        <div id="lottie-music"></div>
                        <!-- 点点 -->
                        <!-- <span class="bg-danger dots"></span> -->
                    </a>
                    <i-music></i-music>
                </li>

                <li v-on:click.stop="setClass('#show-mail')" id="show-mail" class="dropdown notification-list nav-item">
                    <a href="javascript:;" class="nav-link dropdown-toggle arrow-none nav-item" id="news-notice" role="button" aria-haspopup="true" aria-expanded="false">
                        <!-- 图标 -->
                        <div id="lottie-mail"></div>
                        <!-- 点点 -->
                        <!-- <span class="bg-info count-mail"></span> -->
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg dropdown-msg" aria-labelledby="news-notice">

                        <div class="dropdown-item noti-title">
                            <h5 class="m-0">
                                最新消息
                            </h5>
                        </div>

                        <div class="inis-scroll" style="max-height: 230px;">
                            
                            <div v-for="data in moving.data" :key="data.id" class="dropdown-item notify-item">
                                <div class="notify-icon">
                                    <img :src="data.expand.head_img || null" class="img-fluid rounded-circle" />
                                </div>
                                <p class="notify-details">{{data.nickname || '昵称'}}</p>
                                <p class="text-muted mb-0 user-msg">
                                    <small>{{data.expand.description || '摘要'}}</small>
                                </p>
                            </div>

                        </div>

                        <router-link :to="{path:'/cross'}" class="dropdown-item text-center text-primary notify-item notify-all">
                            查看更多
                        </router-link>

                    </div>
                </li>

                <li v-if="!is_login" class="dropdown notification-list nav-item">
                    <a href="#" data-toggle="modal" data-target="#login-modal" class="nav-link dropdown-toggle nav-user arrow-none mr-0">
                        <!-- 图标 -->
                        <span class="account-user-avatar">
                            <svg-icon i-class="1-5em" file-name="user-1"></svg-icon>
                        </span>
                    </a>
                </li>

                <li v-else-if="is_login" v-on:click.stop="setClass('#show-login')" id="show-login" class="dropdown notification-list">
                    <!-- data-toggle="dropdown"  -->
                    <a class="nav-link dropdown-toggle nav-user arrow-none mr-0" id="topbar-userdrop" href="javascript:;" role="button" aria-haspopup="true"
                        aria-expanded="false">
                        <span class="account-user-name">{{user.nickname || '用户'}}</span>
                        <span class="menu-arrow user-lower">
                            <svg-icon file-name="lower"></svg-icon>
                        </span>
                        <span class="account-user-avatar">
                            <img :src="user.head_img || null" :alt="user.description" class="rounded-circle">
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown" aria-labelledby="topbar-userdrop">
                        
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">您好，{{user.nickname || '用户'}}！</h6>
                        </div>

                        <!-- <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="media align-items-center">
                                <div class="rounded">
                                    <svg-icon file-name="write"></svg-icon>
                                </div>
                                <div class="media-body ml-2">
                                    <h6 class="mb-0 ">撰写文章</h6>
                                    <p class="mb-0 font-size-12">记录美好生活！</p>
                                </div>
                            </div>
                        </a> -->

                        <router-link :to="{name:'admin'}" class="dropdown-item notify-item">
                            <div class="media align-items-center">
                                <div class="rounded">
                                    <svg-icon file-name="backstage"></svg-icon>
                                </div>
                                <div class="media-body ml-2">
                                    <h6 class="mb-0 ">后台管理</h6>
                                    <p class="mb-0 font-size-12">您是尊贵的贵宾吗！</p>
                                </div>
                            </div>
                        </router-link>

                        <router-link :to="{name:'profile'}" class="dropdown-item notify-item">
                            <div class="media align-items-center">
                                <div class="rounded">
                                    <svg-icon file-name="profile"></svg-icon>
                                </div>
                                <div class="media-body ml-2">
                                    <h6 class="mb-0 ">个人信息</h6>
                                    <p class="mb-0 font-size-12">编辑您的个人资料！</p>
                                </div>
                            </div>
                        </router-link>

                        <a v-on:click="methods.loginOut()" href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="media align-items-center">
                                <div class="rounded">
                                    <svg-icon file-name="logout"></svg-icon>
                                </div>
                                <div class="media-body ml-2">
                                    <h6 class="mb-0">退出登录</h6>
                                    <p class="mb-0 font-size-12">&nbsp;</p>
                                </div>
                            </div>
                        </a>

                    </div>
                </li>

            </ul>
            <a class="button-menu-mobile disable-btn">
                <div class="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </a>
            <div class="app-search">
                <div class="input-group" style="max-width: 320px;">
                    <input v-model="search" v-on:keyup.enter="search" v-on:click="methods.search_focus()" name="search" autocomplete="off" type="text" class="form-control" placeholder="擅用搜索，事半功倍！">
                    <span class="mdi mdi-magnify"></span>
                    <div class="input-group-append notification-list">
                        <button class="btn btn-primary">
                            <div v-show="!searching" id="lottie-search"></div>
                            <b v-show="searching" class="spinner-border text-light" role="status"></b>
                        </button>
                        <span data-toggle="dropdown" id="search-notice" role="button" aria-haspopup="true" aria-expanded="false"></span>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg dropdown-msg" aria-labelledby="search-notice">

                            <div class="dropdown-item noti-title">
                                <h5 class="m-0">
                                    搜索结果
                                </h5>
                            </div>

                            <div class="slimscroll" style="max-height: 230px;">
                                <a v-for="data in search_result.data" :key="data.id" v-on:click="toPage('/article/', data.id)" class="dropdown-item notify-item cursor">
                                    <div class="notify-icon">
                                        <img :src="data.expand.img_src || null" class="img-fluid object-fit w-100 h-100">
                                    </div>
                                    <p class="notify-details">
                                        {{data.title || '文章标题'}}
                                        <small class="text-muted">{{natureTime(data.create_time)}}</small>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 登录 - 开始 -->
    <div id="login-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="primary-header-modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header modal-colored-header bg-primary">
                    <h4 class="modal-title" id="primary-header-modalLabel">登录</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="text-center mt-2">
                        <router-link :to="{name: 'login'}" class="text-success" data-dismiss="modal">
                            <span><img :src="theme_config.logo.big_day || 'assets/images/logo.png'" class="login-logo" height="32"></span>
                        </router-link>
                    </div>
                    <div class="card-body">

                        <div class="form-group">
                            <label>帐号</label>
                            <input v-model="account" name="username" class="form-control" type="text" placeholder="帐号 | 邮箱">
                        </div>

                        <div class="form-group mb-2">
                            <label>密码</label>
                            <input v-model="password" name="password" v-on:keyup.enter="methods.login()" class="form-control" type="password" placeholder="密码">
                        </div>

                        <div class="form-group">
                            <span class="text-muted float-left cursor">
                                <router-link :to="{name: 'register'}" class="text-muted" data-dismiss="modal">
                                    注册帐号
                                </router-link>
                            </span>
                            <span class="text-muted float-right cursor">
                                忘记密码
                            </span>
                        </div>

                        <button v-on:click="methods.login()" type="button" class="btn btn-block btn-primary btn-rounded login flex">
                            <span v-if="login_is_load" class="spinner-border text-light mr-2" role="status"></span>
                            <span>{{ (login_is_load) ? "登录中 ... " : "登录" }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 登录 - 结束 -->

    <teleport to="body">
    <div id="update-info" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="primary-header-modalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header modal-colored-header bg-primary">
                    <h4 class="modal-title" id="primary-header-modalLabel">[ inis 主题 ] - 版本更新</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="row flex-center font-20px">
                            <svg t="1626366975999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4254" width="40" height="40"><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-197.12 0-358.4 161.28-358.4 358.4s161.28 358.4 358.4 358.4 358.4-161.28 358.4-358.4-161.28-358.4-358.4-358.4z" p-id="4255" fill="#f39b12"></path><path d="M550.4 368.64m-38.4 0a38.4 38.4 0 1 0 76.8 0 38.4 38.4 0 1 0-76.8 0Z" p-id="4256" fill="#f39b12"></path><path d="M486.4 716.8c-7.68 0-15.36-2.56-20.48-7.68-5.12-5.12-7.68-15.36-5.12-23.04l38.4-179.2c-10.24 7.68-23.04 5.12-30.72-2.56-10.24-10.24-12.8-25.6-2.56-35.84 30.72-33.28 66.56-35.84 71.68-33.28 7.68 0 15.36 5.12 20.48 10.24 5.12 5.12 7.68 12.8 5.12 20.48l-38.4 179.2c7.68-5.12 20.48-5.12 28.16 0 12.8 7.68 15.36 23.04 7.68 35.84-25.6 30.72-66.56 35.84-74.24 35.84z" p-id="4257" fill="#f39b12"></path></svg>
                            <span class="ml-1">有新的版本更新，是否更新？</span>
                        </div>
                        <div class="row">
                            <div class="alert alert-light fade show w-100 ml-5 mr-5 mt-2" role="alert">
                                <p class="pb-3">
                                    <span class="float-left">
                                        <strong>最新版本：</strong><span class="text-success">{{update.version_title}} - {{update.version}}</span>
                                    </span>
                                    <span class="float-right">
                                        <strong>更新时间：</strong><span class="text-success">{{update.last_update_time}}</span>
                                    </span>
                                </p>
                                <p v-html="update.version_content" class="pre-line"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                    <button v-on:click="goUpdate()" type="button" class="btn btn-primary">前往更新</button>
                </div>
            </div>
        </div>
    </div>
    </teleport>

</template>

<script>
import axios from 'axios'
import { onMounted } from 'vue'
import lottie from 'lottie-web'
import { mapState, useStore } from 'vuex'
import { GET, POST } from '@/utils/http/request'
import { reactive, toRefs, watch } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import iMusic from '@/components/module/music/index'

export default {
    components: { iMusic },
    setup() {

        const store = useStore()
        const state = reactive({
            account: null,       // 帐号
            password: null,      // 密码
            user: [],            // 用户数据
            search: '',          // 搜索
            searching: false,    // 搜索中 ... 
            search_result: [],   // 搜索结果
            is_login: false,     // 是否登录
            login_is_load: false,// 登录动画
            moving: [],          // 动态
            update: [],          // 最新版本
            is_update: false,    // 是否显示更新
            music_is_show: false,// 是否显示音乐播放器
        })

        // 获取缓存中的登录信息
        let login_storage = inisHelper.get.storage("login")
        // 判断缓存是否存在且未过期
        if (login_storage != "expire" && login_storage != false) {
            state.user = login_storage.user
            state.is_login = true
        }

        const methods = {
            // 初始化
            initData(){
                methods.update()
                methods.lottie()
                methods.moving()
            },
            // 动态图标
            lottie(){
                axios.all([
                    axios.get('assets/libs/lottie/json/music.json').then(res=>res.data),
                    axios.get('assets/libs/lottie/json/mail.json').then(res=>res.data),
                    axios.get('assets/libs/lottie/json/search.json').then(res=>res.data),
                ]).then(axios.spread((music,mail,search)=>{
                    lottie.loadAnimation({container:document.getElementById("lottie-music"),renderer:"svg",loop:!0,autoplay:!0,animationData:music})
                    lottie.loadAnimation({container:document.getElementById("lottie-mail"),renderer:"svg",loop:!0,autoplay:!0,animationData:mail})
                    lottie.loadAnimation({container:document.getElementById("lottie-search"),renderer:"svg",loop:!0,autoplay:!0,animationData:search})
                }))
            },
            // 搜索
            search() {
                let params = {value:state.search,limit:9999}
                GET('search', {params}).then((res) => {
                    if (res.data.code == 200) {
                        // 关闭搜索状态交互
                        state.searching = false
                        // 搜索结果
                        state.search_result = res.data.data
                        inisHelper.set.css('.app-search .slimscroll','height:unset;max-height:230px')
                        // 显示搜索结果
                        $('#search-notice').dropdown('show')
                    }
                })
            },
            // 搜索框焦点
            search_focus(){
                if (!inisHelper.is.empty(state.search)) {
                    $('#search-notice').dropdown('show')
                }
            },
            // 登录
            login(){
                if (inisHelper.is.empty(state.account)) $.NotificationApp.send("提示！", '帐号不得为空！', "top-right", "rgba(0,0,0,0.2)", "warning")
                else if (inisHelper.is.empty(state.password)) $.NotificationApp.send("提示！", '帐号不得为空！', "top-right", "rgba(0,0,0,0.2)", "warning")
                else {
                    let params = {
                        mode:     'login',
                        account:  state.account,
                        password: state.password
                    }

                    // 登录动画
                    state.login_is_load = true

                    POST('users', params).then(res=>{
                        if (res.data.code == 200) {
                            // 设置登录用户信息
                            state.user = res.data.data.user
                            // 有效时间
                            res.data.data.time = 7200
                            // 登录信息存储到缓存中
                            inisHelper.set.storage('login',res.data.data)
                            // 关闭登录框
                            $('#login-modal').modal('hide')
                            // 更新登录状态
                            state.is_login = true
                            // 重载页面
                            location.reload()
                        } else $.NotificationApp.send("提示！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "error")
                        // 登录动画
                        state.login_is_load = false
                    })

                }
            },
            // 退出登录
            loginOut(){
                // 更新登录状态
                state.is_login = false
                // 删除缓存中的登录信息
                window.localStorage.removeItem('login')
                // 重载页面
                location.reload()
            },
            // 获取时光机动态
            moving(page = 1){
                GET('comments', {params:{page,type: 'moving'}}).then(res=>{
                    if (res.data.code == 200) {
                        state.moving = res.data.data
                    }
                })
            },
            // 检查更新
            update(){
                axios.get('https://inis.cc/api/theme', {params:{id:1}}).then(res=>{
                    if (res.data.code == 200) {
                        state.update = res.data.data.opt
                        state.update.last_update_time = inisHelper.time.nature(res.data.data.last_update_time)
                        if (inisHelper.compare.version(state.update.version, INIS.version)) {
                            state.is_update = true
                            methods.isUpdate()
                        }
                    }
                })
            },
            // 显示更新
            isUpdate(){
                axios.all([
                    axios.get('assets/libs/lottie/json/beil.json').then(res=>res.data),
                ]).then(axios.spread((beil)=>{
                    lottie.loadAnimation({container:document.getElementById("lottie-beil"),renderer:"svg",loop:!0,autoplay:!0,animationData:beil})
                }))
            }
        }

        // 监听搜索
        watch(()=>state.search,(newValue)=>{
            if (!inisHelper.is.empty(newValue)) {
                methods.search()
                // 显示搜索状态交互
                state.searching = true
            } else $('#search-notice').dropdown('hide')
        })

        // 监听是否显示音乐播放器
        watch(()=>store.state.theme_config.basic, ()=>{
            let basic = store.state.theme_config.basic
            state.music_is_show = (basic.music_show == 'true') ? true : false
        })

        onMounted(()=>{
            methods.initData()
        })

        return { ...toRefs(state), methods }
    },
    methods: {
        // 人性化时间
        natureTime(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time)
        },
        toPage(path,id){
            this.$router.push({path: `${path}` + id})
        },
        // 前往更新
        goUpdate(){
            window.open(this.update.update_url)
        },
        // 设置class
        setClass(className){
            let dom = document.querySelector(className)
            dom.classList.toggle('show')
        }
    },
    computed: {
        ...mapState(['site_info', 'theme_config'])
    },
    watch: {

    },
}
</script>

<style scoped>
.svg-icon-1-5em{width: 1.5em;height: 1.5em;}
#lottie-mail{height:22px;width:22px;display:flex}
#lottie-music{height:28px;width:28px;display:flex}
#lottie-beil{height:26px;width:26px;display:flex}
</style>
