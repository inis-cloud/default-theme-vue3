<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 文章详情组件                                                           -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <div class="content-page" id="article">
        <div class="content">

            <div class="row">
                <div class="col-md-8">
                    <div class="card article-head-title">
                        <div class="card-body">
                            <div v-if="!is_load">
                                <a href="javascript:;" class="article-svg" data-toggle="tooltip" data-placement="top" data-original-title="作者">
                                    <svg-icon i-class="article" file-name="user"></svg-icon>
                                    {{ author.nickname || '***' }}
                                </a>
                                <a href="javascript:;" class="article-svg" data-toggle="tooltip" data-placement="top" data-original-title="创建时间">
                                    <svg-icon i-class="article" file-name="clock"></svg-icon>
                                    {{ article.create_time }}
                                </a>
                                <a href="javascript:;" class="article-svg" data-toggle="tooltip" data-placement="top" data-original-title="浏览量">
                                    <svg-icon i-class="article" file-name="views"></svg-icon>
                                    {{ article.views }}
                                </a>
                                <a href="javascript:;" class="article-svg" data-toggle="tooltip" data-placement="top" data-original-title="评论数">
                                    <svg-icon i-class="article" file-name="article-comment"></svg-icon>
                                    {{ comment.count }}
                                </a>
                                <a href="javascript:;" class="article-svg" data-toggle="tooltip" data-placement="top" data-original-title="字数">
                                    <svg-icon i-class="article" file-name="edit"></svg-icon>
                                    {{ article.font_count }}
                                </a>
                                <a data-toggle="tooltip" class="article-svg" data-placement="top" data-original-title="分类">
                                    <svg-icon i-class="article" file-name="hashtag"></svg-icon>
                                    <a :href="'/#/sort/'+data.id" class="sort" v-for="data in sort" :key="data.id">{{ data.name }}</a>
                                </a>
                                <a v-on:click="methods.copy()" class="float-right" href="javascript:;" data-toggle="tooltip" data-placement="top" data-original-title="分享">
                                    <svg-icon i-class="article" file-name="share"></svg-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- 文章内容 - 开始 -->
                    <div class="card d-block">

                        <div v-if="is_load" class="card-body load">
                            <div class="spinner-border text-primary m-1" role="status"></div>
                            <div>加载中...</div>
                        </div>
                        <div v-if="!is_load" class="card-body">

                            <h3 class="mt-0 text-center">
                                {{article.title}}
                            </h3>

                            <br>

                            <div v-if="auth.is_pwd" class="is-password">
                                <p class="text-muted text-center">这是一篇受到保护的文章，在访问之前，请输入 <span class="text-primary">访问密码</span> </p>
                                <div class="row">
                                    <div class="col">
                                        <input v-model="auth.password" v-on:keyup.enter="methods.getArticle()" type="text" class="form-control chat-input" placeholder="访问密码">
                                    </div>
                                    <div class="col-auto">
                                        <button v-on:click="methods.getArticle()" class="btn btn-danger chat-send btn-block waves-effect waves-light">确定</button>
                                    </div>
                                </div>
                            </div>

                            <div v-code-highlight v-html="article.content" class="mackdown"></div>

                            <div class="row mt-3">
                                <div class="card-body">
                                    <div class="float-left">
                                        <svg-icon file-name="clock"></svg-icon>
                                        <span class="font-12px">
                                            最后修改：{{ natureTime(article.last_update_time || null) }}
                                        </span>
                                    </div>
                                    <div class="float-right">
                                        <span class="font-12px">
                                            © 转载请保留版权
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="card-body">
                                    <div class="flex-center">
                                        <button type="button" class="btn btn-primary btn-rounded" data-toggle="modal" data-target="#reward-alert-modal">
                                            <svg-icon file-name="reward"></svg-icon> 赞 赏
                                        </button>
                                    </div>
                                    <p class="text-center mt-3">如果觉得我的文章对你有帮助，请随意赞赏</p>
                                </div>
                                <teleport to="body">
                                    <div id="reward-alert-modal" class="modal fade" aria-labelledby="pay" tabindex="-1" role="dialog" aria-hidden="true">
                                        <!-- modal-sm -->
                                        <div class="modal-dialog modal-sm">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4 class="modal-title" id="pay">赞赏作者</h4>
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                </div>
                                                <div class="modal-body p-4">
                                                    <div class="text-center">
                                                        <i class="dripicons-information h1 text-info">
                                                            <svg-icon file-name="reward"></svg-icon>
                                                        </i>
                                                        <p class="mt-2">我欣赏你的才艺~</p>

                                                        <ul class="nav nav-tabs nav-justified nav-bordered mb-3">
                                                            <li class="nav-item">
                                                                <a href="#alipay" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                                                    <span>支付宝</span>
                                                                </a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a href="#we-chat-pay" data-toggle="tab" aria-expanded="true" class="nav-link">
                                                                    <span>微信</span>
                                                                </a>
                                                            </li>
                                                        </ul>

                                                        <div class="tab-content">
                                                            <div class="tab-pane show active" id="alipay">
                                                                <img :src="author.pay.alipay || null" class="w-100">
                                                            </div>
                                                            <div class="tab-pane" id="we-chat-pay">
                                                                <img :src="author.pay.wechat_pay || null" class="w-100">
                                                            </div>
                                                        </div>
                                                        <p v-on:click="methods.isLegal()" id="legal-notices" class="text-muted cursor mt-2">法律声明</p>
                                                        <p class="legal-is-show">用户自行承担资金安全，我方不承担连带责任，相关约定见《法律声明》</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </teleport>
                            </div>

                            <div v-show="((theme_config.other.module.article_copy == 'true') ? true : false)" class="row flex-center copy">
                                <span class="end">END</span>
                                <span class="line"></span>
                            </div>

                            <div v-show="((theme_config.other.module.article_copy == 'true') ? true : false)" class="row table mt-2 ml-0">
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="limit-4em">版权声明</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>本文作者</td>
                                            <td class="text-dark">{{author.nickname || '***'}}</td>
                                        </tr>
                                        <tr>
                                            <td>文章标题</td>
                                            <td>
                                                <a :href="(url || '#')" target="_block" class="text-dark">
                                                    <ins>{{article.title || '文章标题'}}</ins>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>本文地址</td>
                                            <td>
                                                <a :href="(url || '#')" target="_block" class="text-dark">
                                                    <ins>{{url || '#'}}</ins>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>版权说明</td>
                                            <td class="text-dark">若无注明均为原创，转载请注明出处，感谢您的支持!</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-4">

                    <div v-show="is_top.is_show" class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-3">置顶文章</h4>
                            <!-- 淡入淡出 .carousel-fade 停止轮播 data-touch="false" data-interval="false" -->
                            <div id="carouselExampleCaptions" class="carousel carousel-fade slide article-popular" data-ride="carousel">
                                <ol class="carousel-indicators"></ol>
                                <div class="carousel-inner"></div>
                            </div>
                        </div>
                    </div>

                    <div v-show="tag.is_show" class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-2">标签云</h4>
                            <span v-for="data in tag.data" :key="data.id" v-on:click="this.$router.push({path: `/tags/${data.id}`})" :class="'badge badge-pill cursor mr-2 badge-' + data.color">
                                {{data.name}}
                            </span>
                        </div>
                    </div>

                    <div class="card directory">
                        <div class="card-body">
                            <h4 class="header-title mb-3">文章目录</h4>
                            <div class="inis-scroll" style="max-height: 300px;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div v-code-highlight id="preview" class="mackdown"></div>
                <div id="outline"></div>
            </div>

            <div v-if="!auth.is_pwd" class="row">
                <div class="col-md-8">
                    <!-- 评论 - 开始 -->
                    <div class="card mb-0" id="article-comments">
                        <div v-show="config.comments.allow" class="card-body">
                            <h4 class="mt-0 mb-3">发表评论 [ {{ comment.count }} ]</h4>
                            <i-comment-reply></i-comment-reply>
                        </div>
                        <div v-show="!config.comments.allow" class="card-body p-2">
                            <h4 class="text-center">评论功能已关闭</h4>
                            <i-comment-reply></i-comment-reply>
                        </div>
                    </div>
                    <!-- 评论 - 结束 -->
                </div>
            </div>

        </div>

        <i-footer></i-footer>

        <teleport to="head">
            <!-- 代码高亮 CSS - 开始 -->
            <i-link :src="handleCDN() + 'assets/css/highlight/dark.min.css'"></i-link>
            <!-- 代码高亮 CSS - 结束 -->
            <i-link :src="handleCDN() + 'assets/libs/fancybox/jquery.fancybox.min.css'"></i-link>
        </teleport>
        <teleport to="body">
            <!-- 页面依赖 JS - 开始 -->
            <i-link tag="script" :src="handleCDN() + 'assets/libs/fancybox/jquery-3.3.1.min.js'"></i-link>
            <i-link tag="script" :src="handleCDN() + 'assets/libs/fancybox/jquery.fancybox.min.js'"></i-link>
            <!-- 页面依赖 JS - 结束 -->
        </teleport>
    </div>
</template>

<script>
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import iLink from '@/components/tool/Link'
import { GET } from '@/utils/http/request'
import { Get } from '@/utils/http/fetch'
import { inisHelper } from '@/utils/helper/helper'
import iFooter from '@/components/public/footer.vue'
import { onMounted, reactive, toRefs, onUpdated, watch, watchEffect } from 'vue'
import iCommentReply from '@/components/module/comments/article/CommentReply.vue'
import { useStore, mapState } from 'vuex'

export default {
  components: { iFooter, iLink, iCommentReply },
  setup() {

    // 响应式实例
    const route = useRoute()
    const store = useStore()
    const state = reactive({
        id: null,           // 文章ID
        article: [],        // 文章
        author: [],         // 作者信息
        comment: 0,         // 评论数量
        sort: [],           // 分类
        tag: [],            // 标签
        is_load: true,      // 加载
        is_top: [],         // 置顶文章
        url: '#',           // 当前URL
        auth:[],            // 文章权限
        config: {			// 配置
            comments: {
                show : true,// 显示评论
                allow: true,// 允许评论
            },
        },
    })

    store.dispatch('commitArticle', {is_comments:false})

    // 监听路由更新
    onBeforeRouteUpdate((to, from, next)=>{
        state.id = to.params.id || null
        methods.getArticle()
        next()
    })

    const methods = {
        initData(){
            methods.checkArticle()
            methods.getIsTop()
        },
        initState(){
            // 初始化路由参数ID
            state.id     = route.params.id
            state.url    = window.location.href
            state.author = {pay:{alipay:"", wechat_pay:""}}
            state.auth   = {is_pwd:false,password:""}
            state.hide   = []
        },
        checkArticle(){
            Get('article/sql', {
                where: [
                    ['id', '=', state.id],
                ]
            }, {
                headers: {
                    'Authorization': store.state.login['login-token']
                }
            }).then(res=>{
                if (res.code == 200) {
                    let result = res.data
                    if (result.count > 0) {
                        if (!inisHelper.is.empty(result.data[0].opt) && result.data[0].opt.auth == 'password') {
                            state.auth.is_pwd = true
                            state.article = result.data[0]
                            state.is_load = false
                        } else methods.getArticle()
                    }
                }
            })
        },
        getArticle(){
            // 获取文章数据
            GET('article',{
                params:{id:state.id,password:state.auth.password},
                headers:{'login-token':`${store.state.login['login-token']}`}
            }).then( res=> {
                if(res.data.code == 200){
                    state.auth.is_pwd = false
                    let result    = res.data.data
                    state.article = result
                    state.comment = result.expand.comments
                    state.author  = result.expand.author
                    state.sort    = result.expand.sort
                    let tag       = result.expand.tag
                    if (inisHelper.is.empty(tag)) state.tag = {is_show:false,data:[]}
                    else state.tag = {is_show:true,data:tag}
                    state.is_load = false
                    // 设置页面 title
                    document.title = state.article.title + ' - ' + store.state.theme_config.basic.site.title
                } else {
                    $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning")
                }
                // 获取系统配置
                methods.getConfig()
            })
        },
        getIsTop(){
            // 获取置顶文章
            Get('article/sql',{
                limit: 3,
                order: 'create_time asc',
                where: [
                    ['is_top', '=', 1],
                    ['is_show', '=', 1],
                ]
            }).then(res=>{
                if (res.code == 200) {
                    state.is_top = res.data
                    state.is_top.is_show = (state.is_top.count != 0) ? true : false
                    state.is_top.data.forEach((item,index)=>{

                        let li = document.querySelector("#carouselExampleCaptions .carousel-indicators")
                        let inner = document.querySelector("#carouselExampleCaptions .carousel-inner")

                        let active = (index == 0) ? 'active' : ''
                        li.innerHTML += `<li data-target="#carouselExampleCaptions" data-slide-to="${index}" class="${active}"></li>`
                        inner.innerHTML += `<div class="carousel-item ${active}">
                            <a href="/#/article/${item.id}" target="_blank">
                                <div class="row">
                                    <div class="col-md-5">
                                        <img src="${item.expand.img_src}" class="d-block w-100 h-100">
                                    </div>
                                    <div class="col-md-7">
                                        <h5 class="text-muted mt-2">${item.title}</h5>
                                        <p class="text-muted">${item.description || ''}</p>
                                    </div>
                                </div>
                            </a>
                        </div>`
                    })
                }
            })
        },
        // 文章目录
        directory(){
            document.querySelector(".directory .inis-scroll").style.setProperty("height","200px")
            let content    = document.querySelector(".mackdown")
            let slimscroll = document.querySelector(".directory .inis-scroll")
            let children   = content.children
            slimscroll.innerHTML = ''
            inisHelper.set.css(".directory","display: none;")
            // 转换数组，防止报错
            children = Array.from(children)
            children.forEach((item, index)=>{
                let tag_name = item.tagName.toUpperCase()
                if (tag_name.substr(0,1) == "H" && tag_name.substr(0,2) != "HR") {
                    // 获取 H标签 内容
                    let text = item.textContent
                    // 设置锚点ID
                    let mark = "mark-" + tag_name + "-" + index
                    item.setAttribute("id", mark)
                    document.querySelector(".directory .inis-scroll").innerHTML += '<div class="directory-item pl-4" name="'+mark+'"># '+text+'</div>'
                    inisHelper.set.css(".directory","display: block;")
                }
            })
        },
        // 目录跳转
        markLocation(){
            document.querySelectorAll('.directory-item').forEach((item)=>{
                item.addEventListener('click', ()=>{
                    // 方法一：定位准确
                    let offsetTop = document.querySelector("#" + item.getAttribute("name")).offsetTop
                    let topHeight = document.querySelector(".navbar-custom").offsetHeight * 2 - 20
                    inisHelper.to.scroll(offsetTop + topHeight, 200)
                    // 方法二：略有偏差
                    // document.querySelector("#" + item.getAttribute("name")).scrollIntoView()
                }, false)
            })
        },
        // 法律声明
        isLegal(){
            let legal = document.querySelector(".legal-is-show").style
            if (legal.display == 'none' || inisHelper.is.empty(legal.display)) legal.display = 'block'
            else legal.display = 'none'
        },
        // 分享
        copy(){
            inisHelper.set.copy.text(`分享一篇不错的文章：《${state.article.title}》\n链接：${window.location.href}`)
            $.NotificationApp.send("提示！", "链接已复制，快去分享吧~", "top-right", "rgba(0,0,0,0.2)", "info")
        },
        // 设置目录位置
        setDirectory(){

            let directory = document.querySelector(".directory")
            let offsetTop = directory.offsetTop

            document.addEventListener('scroll', ()=>{
                let offsetY   = window.pageYOffset
                let is_show   = directory.style.display
                let width     = document.querySelector('#article .content .row .col-md-4')
                if (!!width) {
                    if (is_show != 'none' && offsetY >= offsetTop) {
                        inisHelper.set.css('.directory', `position: fixed;top: 100px;width: ${width.offsetWidth - 30}px;`)
                    } else {
                        inisHelper.set.css('.directory', 'position: unset;top: auto;')
                    }
                }
            }, true)
        },
        // 评论可见
        hide(){
            let content= document.querySelectorAll('.hide .hide-content')
            let status = store.state.article.is_comments
            let description = document.querySelectorAll('.hide .hide-description')
            if (!status && !inisHelper.is.empty(content)) {
                content.forEach((item, index)=>{
                    state.hide[index] = {html:item.innerHTML}
                    // item.innerHTML = '你好坏坏哟，居然想偷看人家的秘密'
                    item.style.display = "none"
                })
                description.forEach(item=>{
                    item.style.display = "block"
                })
            } else if (status) {
                content.forEach((item, index)=>{
                    item.innerHTML = state.hide[index].html
                    item.style.display = "block"
                })
                description.forEach(item=>{
                    item.style.display = "none"
                })
            }
        },
        // 获取系统配置
        getConfig(){
            const params = {
                key:'config:system'
            }
            GET('options', {params}).then(res=>{
                if (res.data.code == 200) {
                    const result = res.data.data
                    methods.setShow(result.opt)
                }
            })
        },
        // 设置显示
        setShow(config = {}){
            // 文章配置
            let opt = state.article.opt
            // 本地配置
            let comments = {show:false, allow:false}
            // 文章内的评论配置
            if (!inisHelper.is.empty(opt)) {
                if (!inisHelper.is.empty(opt.comments)) {
                    comments.show = (opt.comments.show == 'true' || opt.comments.show == true) ? true : false
                    comments.allow= (opt.comments.allow== 'true' || opt.comments.allow== true) ? true : false
                }
            }
            // 文章评论的全局配置 - 优先级最高
            let system_comments = {show:false, allow:false}

            system_comments = config.article.comments
            comments.show = (system_comments.show == 'true' || system_comments.show == true) ? comments.show  : false
            comments.allow= (system_comments.allow== 'true' || system_comments.allow== true) ? comments.allow : false
            
            state.config.comments = comments
        },
    }

    methods.initState()

    onMounted(() => {
        methods.initData()
    })

    onUpdated(()=>{
        methods.directory()
        methods.markLocation()
        inisHelper.set.css('.directory .inis-scroll', 'height:auto!important;max-height:200px!important;')
        methods.setDirectory()
        methods.hide()
    })

    watchEffect(()=>{
        methods.hide()
    })

    // 窗口大小发生变化
    window.onresize = () => {
        methods.setDirectory()
    }

    // 返回数据
    return { ...toRefs(state), methods }
  },
  methods:{
      // 人性化时间
      natureTime(date){
        let time = inisHelper.date.to.time(date)
        return inisHelper.time.nature(time)
      },
      // 图片预览框
      imagesBox(){
        // 获取渲染文章下的全部图片
        let images = document.querySelector(".mackdown").getElementsByTagName("img");
        for (let item of images) {
            // 给图片上预览盒子
            item.outerHTML = `<a data-fancybox="gallery" href="${item.src}" data-caption="${item.alt}">${item.outerHTML}</a>`
        }
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
    ...mapState(['theme_config'])
  },
  updated() {
      this.imagesBox()
  },
}
</script>

<style scoped>
textarea.form-control{padding:12px}
.article-head-title .card-body > div > a{color:#555;font-size:0.5em;line-height:16px;margin-right:12px;display:inline-flex}
.article-head-title .card-body > div a svg{margin-right:5px}
.article-head-title .card-body > div > a > .sort{color:#555;margin-right:5px}

/* 加载动画 */
.load{display:flex;align-items: center;justify-content: center;}
.load .spinner-border{width: 1em;height: 1em;border: .18em solid currentColor;border-right-color: transparent;}
.svg-icon-article.views, .svg-icon-article.article-comment{fill:#555}
.is-password .form-control {padding: .45rem .9rem;}
</style>
