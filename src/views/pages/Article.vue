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
                                    {{ author.nickname }}
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
                                    {{ comment }}
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

                            <div v-code-highlight v-html="article.content" class="article-content"></div>

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

                            <div v-if="inis_config.article.end_copy" class="row flex-center copy">
                                <span class="end">END</span>
                                <span class="line"></span>
                            </div>

                            <div v-if="inis_config.article.end_copy" class="row table mt-2 ml-0">
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
                                            <td class="text-dark">{{author.nickname || '本文作者'}}</td>
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

                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-3">置顶文章</h4>
                            <!-- 淡入淡出 .carousel-fade 停止轮播 data-touch="false" data-interval="false" -->
                            <div id="carouselExampleCaptions" class="carousel carousel-fade slide article-popular" data-ride="carousel">
                                <ol class="carousel-indicators"></ol>
                                <div class="carousel-inner"></div>
                            </div>
                        </div>
                    </div>

                    <div v-if="tag.is_show" class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-2">标签云</h4>
                            <!-- <span v-for="data in tag.data" :key="data.id" :class="'badge badge-pill mr-2 badge-' + data.color">{{data.name}}</span> -->
                            <span v-for="data in tag.data" :key="data.id" v-on:click="toPage('/tags/',data.id)" :class="'badge badge-pill cursor mr-2 badge-' + data.color">
                                {{data.name}}
                            </span>
                        </div>
                    </div>

                    <div class="card directory">
                        <div class="card-body">
                            <h4 class="header-title mb-3">文章目录</h4>
                            <div class="slimscroll" style="max-height: 300px;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div v-code-highlight id="preview" class="article-content"></div>
                <div id="outline"></div>
            </div>

            <div class="row">
                <div class="col-md-8">
                    <!-- 评论 - 开始 -->
                    <div class="card" id="article-comments">
                        <div class="card-body">
                            <h4 class="mt-0 mb-3">发表评论 [ {{ comment }} ]</h4>
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
            <i-link src="assets/css/highlight/dark.min.css"></i-link>
            <!-- 代码高亮 CSS - 结束 -->
        </teleport>
        <teleport to="body">
            <!-- 页面依赖 JS - 开始 -->
            <!-- 页面依赖 JS - 结束 -->
        </teleport>
    </div>
</template>

<script>
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import iLink from '@/components/tool/Link'
import { GET } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import iFooter from '@/components/public/footer.vue'
import { onMounted, reactive, toRefs, ref, onUpdated, watch } from 'vue'
import iCommentReply from '@/components/module/comments/CommentReply.vue'
import { useStore } from 'vuex'

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
        is_top: [],         // 指定文章
        url: '#',           // 当前URL
        inis_config: INIS,  // inis配置文件
    })

    // 初始化路由参数ID
    state.id = route.params.id

    // 监听路由更新
    onBeforeRouteUpdate((to, from, next)=>{
        state.id = to.params.id || null
        methods.getArticle()
        next()
    })

    state.url = window.location.href

    const methods = {
        initData(){
            methods.getArticle()
            methods.getIsTop()
        },
        getArticle(){
            // 获取文章数据
            GET('article',{params:{id:state.id}}).then( res=> {
                if(res.data.code == 200){
                    state.article = res.data.data
                    state.comment = res.data.data.expand.comments
                    state.author  = res.data.data.expand.author
                    state.sort = res.data.data.expand.sort
                    let tag    = res.data.data.expand.tag
                    if (inisHelper.is.empty(tag)) state.tag = {is_show:false,data:[]}
                    else state.tag = {is_show:true,data:tag}
                    state.is_load = false
                    // 设置页面 title
                    document.title = state.article.title + ' - ' + store.state.site_info.title
                }else{
                    $.NotificationApp.send("加载超时！", '请求错误，请<a href="'+window.location.protocol+"//"+window.location.host+'">刷新页面！</a>', "top-right", "rgba(0,0,0,0.2)", "warning")
                }
            })
        },
        getIsTop(){
            // 获取置顶文章
            GET('article/sql',{
                params:{
                    limit:3,
                    where:"is_top=1;is_show=1",
                    order:"create_time asc"
                }
            }).then(res=>{
                if (res.data.code == 200) {
                    state.is_top = res.data.data
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
            document.querySelector(".directory .slimscroll").style.setProperty("height","200px")
            let content    = document.querySelector(".article-content")
            let slimscroll = document.querySelector(".directory .slimscroll")
            let children   = content.children
            slimscroll.innerHTML = ''
            inisHelper.set.css(".directory","display: none;")
            children.forEach((item, index)=>{
                let tag_name = item.tagName.toUpperCase()
                if (tag_name.substr(0,1) == "H" && tag_name.substr(0,2) != "HR") {
                    // 获取 H标签 内容
                    let text = item.textContent
                    // 设置锚点ID
                    let mark = "mark-" + tag_name + "-" + index
                    item.setAttribute("id", mark)
                    document.querySelector(".directory .slimscroll").innerHTML += '<div class="directory-item pl-4" name="'+mark+'">'+text+'</div>'
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
                let width     = document.querySelector('#article .content .row .col-md-4').offsetWidth - 30
                if (is_show != 'none' && offsetY >= offsetTop) {
                    inisHelper.set.css('.directory', `position: fixed;top: 100px;width: ${width}px;`)
                } else {
                    inisHelper.set.css('.directory', 'position: unset;top: auto;')
                }
            }, true)
        }
    }

    onMounted(() => {
        methods.initData()
    })

    onUpdated(()=>{
        methods.directory()
        methods.markLocation()
        inisHelper.set.css('.directory .slimscroll', 'height:auto!important;max-height:200px!important;')
        methods.setDirectory()
    })

    // 窗口大小发生变化
    window.onresize = () => {
        methods.setDirectory()
    }
    
    // 返回数据
    return { ...toRefs(state), methods }
  },
  methods:{
      toPage(path,id){
        this.$router.push({path: `${path}` + id})
      },
      // 人性化时间  
      natureTime(date){
        let time = inisHelper.date.to.time(date)
        return inisHelper.time.nature(time)
      }
  }
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
</style>