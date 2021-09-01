<template>
<div class="content-page cross">
    <div class="content">
        <div class="row">
            <div class="col-lg-8">

                <div class="card">
                    <img class="w-100" height="200" style="object-fit: cover;border-radius: 5px 5px 0 0;" :src="theme_config.site.cross_bg || null" />
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="float-left flex-center">
                                    <a :href="switchUrl(sociality.qq, 'qq')" class="mr-2" target="_blank">
                                        <svg-icon file-name="qq" class="head-svg"></svg-icon>
                                    </a>
                                    <a v-on:click="copyWeChat()" href="javascript:;" class="mr-2">
                                        <svg-icon file-name="wechat" class="head-svg"></svg-icon>
                                    </a>
                                    <a :href="switchUrl(sociality.weibo, 'weibo')" class="mr-2" target="_blank">
                                        <svg-icon file-name="weibo" class="head-svg"></svg-icon>
                                    </a>
                                    <a :href="switchUrl(sociality.github, 'github')" class="mr-2" target="_blank">
                                        <svg-icon file-name="github" class="head-svg"></svg-icon>
                                    </a>
                                    <a :href="switchUrl(sociality.gitee, 'gitee')" class="mr-2" target="_blank">
                                        <svg-icon file-name="gitee" class="head-svg"></svg-icon>
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="float-right">
                                    <ul class="mb-0 list-inline text-light">
                                        <li class="list-inline-item mr-2">
                                            <h5 class="text-dark font-13 m-0">文章</h5>
                                            <p class="mb-0 font-13 text-muted text-center">{{timeline.count || 0}}</p>
                                        </li>
                                        <li class="list-inline-item mr-2">
                                            <h5 class="text-dark font-13 m-0">朋友</h5>
                                            <p class="mb-0 font-13 text-muted text-center">{{links.count || 0}}</p>
                                        </li>
                                        <li class="list-inline-item">
                                            <h5 class="text-dark font-13 m-0">评论</h5>
                                            <p class="mb-0 font-13 text-muted text-center">{{comments.count || 0}}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-img">
                            <img :src="user.head_img || null" class="rounded-circle shadow-sm mb-1" height="100" width="100">
                            <strong>{{user.nickname || '站长'}}</strong>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <ul class="nav nav-tabs nav-justified nav-bordered">
                            <li class="nav-item">
                                <a href="#time-machine" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                    <span>时光机</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#about" data-toggle="tab" aria-expanded="true" class="nav-link">
                                    <span>关于我</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#timeline" data-toggle="tab" aria-expanded="true" class="nav-link">
                                    <span>时间线</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#friends" data-toggle="tab" aria-expanded="false" class="nav-link">
                                    <span>朋友</span>
                                </a>
                            </li>
                            <li v-if="false" class="nav-item">
                                <a href="#settings-b2" data-toggle="tab" aria-expanded="false" class="nav-link">
                                    <span>照片墙</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="tab-content">

                    <div class="tab-pane show active" id="time-machine">
                        <div v-show="is_login" class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{title || '发表动态'}}</h5>
                                <!-- 编辑器 -->
                                <div id="vditor"></div>
                            </div>
                        </div>
                        <div v-show="moving.count >= 1" v-for="(data, index) in moving.data" :key="data.id" class="card">
                            <div class="card-body">
                                <div class="media mb-2">
                                    <img :src="data.expand.head_img || null" class="mr-3 rounded-circle" width="40" height="40">
                                    <div class="media-body">
                                        <h5 class="mt-0 mb-1">{{data.nickname || '昵称'}}</h5>
                                        <span class="font-13">{{methods.natureTime(data.create_time)}}</span>
                                    </div>
                                    <span v-show="is_login" v-on:click="methods.setMoving(index)" class="cursor">
                                        <svg-icon file-name="edit"></svg-icon>
                                    </span>
                                </div>
                                <hr>
                                <div v-html="data.content" class="col-lg-12 article-content"></div>
                            </div>
                            <div class="card-body pt-0">
                                <div class="float-left">
                                    <span class="mr-2 font-12px">
                                        <span v-on:click="methods.like(data.id, index)" v-if="!like.includes(data.id)" class="cursor">
                                            <svg-icon file-name="like-4"></svg-icon>
                                        </span>
                                        <span v-else-if="like.includes(data.id)" class="cursor">
                                            <svg-icon file-name="like-5"></svg-icon>
                                        </span>
                                        {{data.opt.like || 0}}
                                    </span>
                                    <span class="font-12px">
                                        <span><svg-icon file-name="position"></svg-icon></span>
                                        发自
                                        {{data.expand.agent.os.system}}
                                    </span>
                                </div>
                                <div class="float-right">
                                    <!-- 这是右边 -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="about">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="header-title mt-0 mb-3">基本信息</h4>
                                <p class="text-muted"><strong>昵称：</strong> <span class="ml-2">{{user.nickname || '昵称'}}</span></p>
                                <p class="text-muted font-13">
                                    {{user.description || '描述'}}
                                </p>
                                <hr>
                                <div class="text-left">
                                    <p class="text-muted">
                                        <strong>QQ：</strong>
                                        <span class="ml-2">
                                            <a :href="switchUrl(sociality.qq, 'qq')" target="_blank" class="text-muted">
                                                {{sociality.qq || 'QQ'}}
                                            </a>
                                        </span>
                                    </p>
                                    <p class="text-muted">
                                        <strong>微信：</strong>
                                        <span class="ml-2">{{sociality.wechat || 'WeChat'}}</span>
                                    </p>
                                    <p class="text-muted">
                                        <strong>微博：</strong>
                                        <span class="ml-2">
                                            <a :href="switchUrl(sociality.weibo, 'weibo')" target="_blank" class="text-muted">
                                                {{sociality.weibo || 'weibo'}}
                                            </a>
                                        </span>
                                    </p>
                                    <p class="text-muted">
                                        <strong>GitHub：</strong>
                                        <span class="ml-2">
                                            <a :href="switchUrl(sociality.github, 'github')" target="_blank" class="text-muted">
                                                {{sociality.github || 'GitHub'}}
                                            </a>
                                        </span>
                                    </p>
                                    <p class="text-muted">
                                        <strong>Gitee：</strong>
                                        <span class="ml-2">
                                            <a :href="switchUrl(sociality.gitee, 'gitee')" target="_blank" class="text-muted">
                                                {{sociality.gitee || 'Gitee'}}
                                            </a>
                                        </span>
                                    </p>
                                </div>
                                <hr>
                                <div v-html="sociality.description" class="font-13 description">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="timeline">
                        <div class="card">
                            <div class="card-body">
                                <div class="inis-scroll" style="max-height: 400px;">

                                    <div v-for="data in timeline_data" :key="data.id" class="timeline-alt pb-0 pt-0">
                                        <div class="timeline-item">
                                            <i :class="'bg-'+data.color+'-lighten text-'+data.color+' timeline-icon'"></i>
                                            <div class="timeline-item-info">
                                                <router-link :to="{name: 'article', params: { id: data.id }}" :class="'text-'+data.color+' font-weight-bold mb-1 d-block'">
                                                    {{data.title || '文章标题'}}
                                                </router-link>
                                                <small>{{data.description || '文章描述'}}</small>
                                                <p class="mb-0 pb-2">
                                                    <small class="text-muted">{{methods.natureTime(data.create_time)}}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="time_line_is_load" class="flex-center">
                                        <div class="spinner-border text-primary m-1" role="status"></div>
                                        <div>加载中...</div>
                                    </div>
                                    <div v-if="no_data" class="flex-center">
                                        <div>没有数据啦~</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="friends">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="header-title mb-3">我的朋友们</h4>

                                <ul class="nav nav-tabs nav-bordered mb-3">
                                    <li v-for="(data, index) in linksSort.data" :key="data.id" v-on:click="methods.linksSortItem(data.id)" class="nav-item">
                                        <a :href="'#friends-links-' + data.id" data-toggle="tab" aria-expanded="false" :class="(index == 0) ? 'nav-link active' : 'nav-link'">
                                            <span>{{data.name || '分组名称'}} <span :class="'friends-count font-12px ' + ('text-' + data.expand.color || 'text-muted')">{{data.expand.count || 0}}</span></span>
                                        </a>
                                    </li>
                                </ul>

                                <div class="tab-content">
                                    <div v-for="(data, index) in linksSort.data" :key="data.id" :class="(index == 0) ? 'tab-pane mb-4 show active' : 'tab-pane mb-4'" :id="'friends-links-' + data.id">
                                        <div class="alert alert-primary bg-white text-primary" role="alert">
                                            <p class="mb-1">{{data.description || '分组描述'}}</p>
                                            <p class="flex-end mb-0">该分组创建于：{{data.create_time || (new Date).toLocaleString()}}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div v-if="is_load" class="card-body flex-center">
                                            <div class="spinner-border text-primary m-1" role="status"></div>
                                            <div>加载中...</div>
                                        </div>
                                        <div v-else-if="!is_load" v-for="data in linksItemData.data" :key="data.id" class="col-lg-4">
                                            <div class="card text-white bg-white text-xs-center">
                                                <div class="card-body pb-0">
                                                    <blockquote class="card-bodyquote">
                                                        <a :href="data.url || '#'" target="_blank">
                                                            <img :src="data.head_img || null" height="42" class="rounded-circle shadow-sm head-img">
                                                            <span class="text-muted">{{data.name || '用户'}}</span>
                                                        </a>
                                                        <p class="text-muted mt-2 mb-0">{{data.description || '这个人很神秘~'}}</p>
                                                    </blockquote>
                                                </div>
                                                <div class="card-footer text-muted">
                                                    相识于：{{methods.natureTime(data.create_time || '2021-3-14 05:20:00')}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-show="linksItemData.count != 0 && linksSort.count != 0" class="row flex-center">
                                        <div v-if="linksItemData.page != 1" class="btn-group inis-page-list mt-2" style="float: right">
                                            <button v-if="self_page != 1" v-on:click="methods.linksSortItem(linksSortItem.id, self_page - 1)" class="btn btn-light">
                                                <span class="inis-page">
                                                    <svg-icon file-name="primary-left"></svg-icon>
                                                </span>
                                            </button>
                                            <button v-for="(item, index) in page_list" :key="index" v-on:click="methods.linksSortItem(linksSortItem.id, item)" :class="(self_page == item) ? 'btn btn-primary' : 'btn btn-light'">{{item}}</button>
                                            <button v-if="self_page != linksItemData.page" v-on:click="methods.linksSortItem(linksSortItem.id, self_page + 1)" class="btn btn-light">
                                                <span class="inis-page">
                                                    <svg-icon file-name="primary-right"></svg-icon>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div v-if="false" class="tab-pane" id="settings-b2">
                        <p>Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                        <p class="mb-0">Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                    </div>
                </div>

            </div>
            <div class="col-lg-4">
                <div class="card mb-0 users">
                    <div class="card-body">
                        <h4 class="header-title mb-3">最近登录用户</h4>
                        <div class="flex-center">
                            <canvas id="chart"></canvas>
                        </div>
                        <div class="chart-widget-list">
                            <p v-for="(data,index) in chart" :key="index">
                                {{data.name}}
                                <span class="float-right">{{data.value}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <teleport to="head">
      <!-- 编辑器 - 开始 -->
      <i-link src="assets/css/vditor/index.css"></i-link>
      <!-- 编辑器 - 结束 -->
    </teleport>

    <i-footer></i-footer>
</div>
</template>

<script>
import iLink from '@/components/tool/Link'
import { GET, POST } from '@/utils/http/request'
import iFooter from '@/components/public/footer'
import { onMounted, onUpdated, reactive, toRefs, watch } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import axios from "axios"
import Vditor from "vditor"
import { useStore, mapState } from 'vuex'
import * as echarts from 'echarts'

export default {
    components: { iFooter, iLink },
    setup(){

        const store = useStore()

        const state = reactive({
            user: [],           // 用户信息
            links: [],          // 友链数据
            comments: [],       // 评论数据
            linksSort: [],      // 友链分组
            linksSortItem: [],  // 友链分组下的友链数据
            linksItemData: [],  // 友链分组下的友链数据
            is_load: true,      // 加载动画
            page_list: [],      // 分页列表
            self_page: 1,       // 当前页码
            timeline: [],       // 时间线文章
            timeline_data: [],  // 时间线文章
            time_line_is_load: false,   // 加载时间线数据
            timeline_page: 1,   // 时间线页码
            no_data: false,     // 无数据
            webmaster: [],      // 站长数据
            sociality: [],      // 社交
            is_login: false,    // 是否登录
            login_user: [],     // 登录用户
            emoji: [],          // 表情数据
            moving: [],         // 时光机动态
            id: null,           // 动态ID
            title: '发表动态',   // 编辑器状态
            like: [],           // 点赞 includes
            users: [],          // 用户数据
            chart: [],          // 绘图数据
        })

        // 获取缓存中的登录信息
        let login_storage = inisHelper.get.storage("login")
        // 判断缓存是否存在且未过期
        if (login_storage != "expire" && login_storage != false) {
            state.login_user = login_storage.user
            if (state.login_user.level == 'admin') state.is_login = true
        }

        const methods = {
            // 初始化数据
            initData(){
                methods.linksSort()
                methods.timeline()
                methods.webmaster()
                methods.getLinks()
                methods.getComments()
                methods.emoji()
                methods.moving()
                methods.users()
                // 设置页面 title
                document.title = '时光机 - ' + store.state.theme_config.site.title
            },
            // 初始化编辑器
            initVditor(){
                window.vditor = new Vditor("vditor",{
                    height: 300,
                    // minHeight: 500,
                    placeholder: '写点什么吧！',
                    icon: 'material',           // 图标风格
                    toolbarConfig: {
                        pin: true,              // 固定工具栏
                    },
                    cache: {
                        enable: false,          // 关闭缓存
                    },
                    counter: {
                        enable: true,           // 启用计数器
                    },
                    resize: {
                        enable: true,           // 支持主窗口大小拖拽
                    },
                    preview: {
                        hljs: {
                            enable: true,       // 启用代码高亮
                            lineNumber: true    // 启用行号
                        },
                        markdown:{
                            autoSpace: true,    // 自动空格
                            fixTermTypo: true,  // 自动矫正术语
                            toc: true,          // 插入目录
                            paragraphBeginningSpace: true,  // 首行缩进二字符
                            sanitize: true,     // 启用过滤 XSS
                        }
                    },
                    // 编辑器异步渲染完成后的回调方法
                    after: () => {
                        // this.initData(this.id)
                    },
                    hint: {
                        emoji: state.emoji,
                    },
                    upload: {
                        // accept: 'image/jpg, image/jpeg, image/png, image/gif, image/webp, image/gif, audio/*',
                        accept: 'image/*, video/*',
                        multiple: false,
                        // 上传失败自定义方法
                        handler: (files) => {
                            
                            window.vditor.tip('上传中...', 2000)

                            let params = new FormData
                            params.append('file', ...files)
                            params.append('mode', 'upload')
                            params.append('login-token', login_storage['login-token'])
                            
                            axios.post(inisHelper.customProcessApi(INIS.api) + 'file', params, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((res) => {
                                if (res.data.code == 200) {

                                    let result = res.data.data
                                    if (methods.checkFile(result) == 'image') {
                                        window.vditor.insertValue(`![](${result})`)
                                    } else if (methods.checkFile(result) == 'video') {
                                        window.vditor.insertValue(`<video src="${result}" controls>Not Support</video>`)
                                    } else {
                                        window.vditor.insertValue(`${result}`)
                                    }

                                    window.vditor.tip('上传完成！', 2000)

                                } else {
                                    window.vditor.tip(res.data.msg, 2000)
                                }
                            }).catch((err) => {
                                window.vditor.tip('上传地址已失效！', 2000)
                            })
                        },
                        filename: (name) => {
                            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
                            .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
                            .replace("/\\s/g", "");
                        },
                    },
                    toolbar: [
                        "emoji","headings","bold","italic","strike","link",
                        "|",
                        "list","ordered-list","check","outdent","indent",
                        "|",
                        "quote","line","code","inline-code","insert-before","insert-after",
                        "|",
                        "upload","table",
                        "|",
                        "undo","redo",
                        "|",
                        "export","fullscreen","preview","edit-mode",
                        "|",
                        {
                            hotkey: "",
                            name: "album",
                            tipPosition: "s",
                            tip: "插入相册",
                            className: "right",
                            icon: `<img style="margin: -4px 0 0 -6px;" src='assets/svg/album.svg' height="16" />`,
                            click: () => {
                                window.vditor.insertValue('[album]\n支持Markdown格式和HTML格式的图片\n[/album]')
                            }
                        },
                        {
                            hotkey: "",
                            name: "doubt",
                            tipPosition: "s",
                            tip: "帮助文档",
                            className: "right",
                            icon: `<img style="margin: -4px 0 0 -6px;" src='assets/svg/help.svg' height="16" />`,
                            click: () => {
                                window.open("https://ld246.com/guide/markdown",'top')
                            }
                        },
                        {
                            hotkey: "⌘S",
                            name: "save",
                            tipPosition: "s",
                            tip: "发表",
                            className: "right",
                            icon: `<img style="margin: -4px 0 0 -6px;" src='assets/svg/save.svg' height="22"/>`,
                            click: () => {
                                methods.saveMoving()
                            }
                        },
                        "|",
                        {
                            name: "more",
                            toolbar: [
                                "both",
                                "info",
                                "help",
                            ]
                        },
                    ],
                })
            },
            // 表情数据
            async emoji(){
                let emoji = await axios.get('assets/json/emoji.json')
                state.emoji = emoji.data
                if (state.is_login) methods.initVditor()
            },
            // 保存动态
            saveMoving(){
                
                let content = window.vditor.getHTML()

                if (inisHelper.is.empty(content)) {
                    $.NotificationApp.send("提示！", "请写点什么再发表", "top-right", "rgba(0,0,0,0.2)", "warning")
                } else {

                    let params = {
                        content, 
                        'login-token':login_storage['login-token'],
                        type: 'moving',
                        opt: {'like':1}
                    }

                    // 修改动态
                    if (!inisHelper.is.empty(state.id)) {
                        params.id   = state.id
                        params.mode = 'edit'
                    } 

                    POST('comments', params).then(res=>{
                        if (res.data.code == 200) {
                            state.id = null
                            window.vditor.setValue('')
                            methods.moving()
                            $.NotificationApp.send("提示！", "发表成功！", "top-right", "rgba(0,0,0,0.2)", "info")
                        } else {
                            $.NotificationApp.send("提示！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning")
                        }
                    })
                }

            },
            // 获取时光机动态
            moving(page = 1){
                GET('comments', {params:{page,type: 'moving',limit:99}}).then(res=>{
                    if (res.data.code == 200) {
                        state.moving = res.data.data
                        state.chart.push({value:state.moving.count,name:'时光机动态'})
                    }
                })
            },
            // 修改动态
            setMoving(index){
                let data = state.moving.data[index]
                state.id = data.id
                GET('comments', {params:{id:data.id}}).then(res=>{
                    if (res.data.code == 200) {
                        window.vditor.setValue(window.vditor.html2md(res.data.data.content))
                        inisHelper.to.scroll(300, 200)
                    }
                })
            },
            // 点赞动态
            like(id, index){
                state.like.push(id)
                state.moving.data[index].opt.like++
                let params = {
                    id,
                    'mode':'edit',
                    'login-token':login_storage['login-token'],
                    opt: {'like':state.moving.data[index].opt.like}
                }
                // 暂时只有管理员点赞生效
                POST('comments', params)
            },
            // 友链分组
            linksSort(){
                GET('links-sort',{
                    params: {limit:99,order:'create_time acs'}
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.linksSort = res.data.data
                        let item = state.linksSort.data
                        if (!inisHelper.is.empty(item)) methods.linksSortItem(item[0].id)
                        // 加载动画
                        state.is_load = false
                    }
                })
            },
            // 获取友链分组下的数据
            linksSortItem(id, page = 1){

                state.is_load   = true
                state.self_page = page
                state.page_list = []

                GET('links-sort',{
                    params:{id,page,limit:20}
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.linksSortItem = res.data.data
                        state.linksItemData = res.data.data.expand
                        // 加载动画
                        state.is_load = false
                        // 分页码列表
                        state.page_list = inisHelper.create.paging(page, state.linksItemData.page, 7)
                    }
                })
            },
            // 获取时间线文章
            timeline(page = 1){
                state.timeline_page = page
                GET('article', {
                    params: {
                        page,
                        order: 'create_time desc'
                    }
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.timeline = res.data.data
                        state.timeline.data.forEach(item=>{
                            item.color = methods.randomClass()
                            state.timeline_data.push(item)
                        })
                        state.chart.push({value:state.timeline.count,name:'文章'})
                    }
                })
            },
            // 站长信息
            webmaster(){
                GET('options',{
                    params:{
                        key: 'webmaster'
                    }
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.webmaster = res.data.data
                        state.sociality = res.data.data.opt
                        methods.getUser(state.sociality.users_id)
                    }
                })
            },
            // 站长信息
            getUser(id = null){
                GET('users',{params:{id}}).then(res=>{
                    if (res.data.code == 200) {
                        state.user = res.data.data
                    }
                })
            },
            // 友链数据
            getLinks(){
                GET('links',{params:{limit:1}}).then(res=>{
                    if (res.data.code == 200) {
                        state.links = res.data.data
                        state.chart.push({value:state.links.count,name:'友链'})
                    }
                })
            },
            // 评论数据
            getComments(){
                GET('comments',{params:{limit:1}}).then(res=>{
                    if (res.data.code == 200) {
                        state.comments = res.data.data
                        state.chart.push({value:state.comments.count,name:'评论'})
                    }
                })
            },
            // 获取用户
            users(){
                GET('users', {params:{order:'last_login_time desc',limit:12}}).then(res=>{
                    if (res.data.code == 200) {
                        state.users = res.data.data
                        state.chart.push({value:state.users.count,name:'用户'})
                    }
                })
            },
            // 人性化时间
            natureTime(date = null){
                const time = inisHelper.date.to.time(date)
                return inisHelper.time.nature(time)
            },
            // 随机 class
            randomClass(){
                const array = ['primary','secondary','success','danger','warning','info','dark'];
                return array[parseInt(Math.random() * array.length)]
            },
            // 校验文件格式
            checkFile(url = null){

                let result  = 'other'
                const image = ['png','jpg','jpeg','gif','webp','svg','ico']
                const video = ['avi','mp4']
                const array = url.split('.')
                const pop   = array.pop()

                if (inisHelper.in.array(pop, image)) result = 'image'
                else if (inisHelper.in.array(pop, video)) result = 'video'

                return result
            },
            // 绘制图表
            caches(){
                let chart = echarts.init(document.querySelector("#chart"));
                chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}：\n{c} KB',
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },
                    series: [
                        {
                            name: '占用',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                },
                            },
                            labelLine: {
                                show: false
                            },
                            data: state.chart
                        }
                    ]
                })
            },
        }

        onMounted(()=>{
            methods.initData()
        })

        onUpdated(()=>{
            methods.caches()
            const scroll = '.cross #timeline .inis-scroll'
            inisHelper.set.css(scroll,'height:auto;max-height:400px;')
            document.querySelector(scroll).onscroll = () =>{
                let scrollHeight = document.querySelector(scroll).scrollHeight
                let scrollTop    = document.querySelector(scroll).scrollTop
                let clientHeight = document.querySelector(scroll).clientHeight
                if (scrollHeight - clientHeight == scrollTop) {
                    let timeline_page = (!inisHelper.is.empty(state.timeline)) ? state.timeline.page : 1
                    // 是否执行懒加载动画
                    if (state.timeline_page != timeline_page + 1) state.time_line_is_load = true
                    else if (state.timeline_page == timeline_page + 1)state.no_data = true
                    // 是否执行懒加载
                    if (state.timeline_page < timeline_page) methods.timeline(timeline_page + 1)
                } else state.time_line_is_load = false
            }
        })

        watch(()=>state.id,()=>{
            if (inisHelper.is.empty(state.id)) state.title = '发表动态'
            else state.title = '修改动态'
        })

        return { ...toRefs(state), methods }
    },
    methods:{
        // 复制微信号
        copyWeChat(){
            inisHelper.set.copy.text(`微信号：${this.sociality.wechat}`)
            $.NotificationApp.send("提示！", "微信号已复制，快去添加好友吧~", "top-right", "rgba(0,0,0,0.2)", "info")
        },
        // 转换URL
        switchUrl(value, opt){
            let url = value
            if (!inisHelper.is.url(value)) {
                if (opt == 'qq') {
                    url = `https://wpa.qq.com/msgrd?v=3&uin=${value}&site=qq&menu=yes`
                } else if (opt == 'weibo') {
                    url = `https://weibo.com/${value}`
                } else if (opt == 'github') {
                    url = `https://github.com/${value}`
                } else if (opt == 'gitee') {
                    url = `https://gitee.com/${value}`
                }
            }
            return url
        }
    },
    computed: {
        ...mapState(['theme_config'])
    }
}
</script>