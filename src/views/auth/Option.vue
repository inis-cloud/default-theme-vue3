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
    <div id="option" class="content-page">

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <div class="page-title-right">
                        </div>
                        <h4 class="page-title">主题配置</h4>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <ul class="nav nav-tabs nav-bordered">
                                <li class="nav-item">
                                    <a href="#set-site" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                        <i class="mdi mdi-home-variant d-lg-none d-block mr-1"></i>
                                        <span class="d-none d-lg-block">站点设置</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#set-other" data-toggle="tab" aria-expanded="true" class="nav-link">
                                        <i class="mdi mdi-account-circle d-lg-none d-block mr-1"></i>
                                        <span class="d-none d-lg-block">其他设置</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#set-dev" data-toggle="tab" aria-expanded="false" class="nav-link">
                                        <i class="mdi mdi-settings-outline d-lg-none d-block mr-1"></i>
                                        <span class="d-none d-lg-block">开发者设置</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="tab-content custom-accordion">
                                <div class="tab-pane show active" id="set-site">
                                    <h4 class="header-title">站点配置</h4>
                                    <p class="text-muted">
                                        关于站点标题和站点昵称的一些配置
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header" id="site">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#siteOne" aria-expanded="true" aria-controls="collapseOne">
                                                            站点信息
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="siteOne" class="collapse show" aria-labelledby="site" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>站点标题</label>
                                                                    <input v-model="config.site.title" type="text" class="form-control">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>favicon 地址</label>
                                                                    <input v-model="config.site.favicon" type="text" class="form-control" placeholder="请提交一个图片链接">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>博主的昵称</label>
                                                                    <input v-model="config.site.nickname" type="text" class="form-control" placeholder="您希望大家怎么称呼您">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>站点描述</label>
                                                                    <input v-model="config.site.description" type="text" class="form-control" placeholder="为空默认使用一言">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>站点头像</label>
                                                                    <input v-model="config.site.head_img" type="text" class="form-control" placeholder="请提交一个图片链接">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>博主的介绍</label>
                                                                    <input v-model="config.site.present" type="text" class="form-control" placeholder="简单的介绍一下自己">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 class="header-title">LOGO配置</h4>
                                    <p class="text-muted">
                                        站点LOGO的配置，请填写图片链接地址
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-0">
                                                <div class="card-header" id="logo-day">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#logoOne" aria-expanded="false" aria-controls="collapseOne">
                                                            日间模式
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="logoOne" class="collapse" aria-labelledby="logo-day" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>大LOGO</label>
                                                                    <input v-model="config.logo.big_day" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>小LOGO</label>
                                                                    <input v-model="config.logo.small_day" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card mb-0">
                                                <div class="card-header" id="logo-night">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title collapsed d-block pt-2 pb-2" data-toggle="collapse" href="#logoTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            夜间模式
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="logoTwo" class="collapse" aria-labelledby="logo-night" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>大LOGO</label>
                                                                    <input v-model="config.logo.big_night" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>小LOGO</label>
                                                                    <input v-model="config.logo.small_night" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="set-other">
                                    <h4 class="header-title">配置复制</h4>
                                    <p class="text-muted">
                                        整站任意位置复制内容后，在末尾添加自定义的内容
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header" id="copy">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#copyOne" aria-expanded="true" aria-controls="collapseOne">
                                                            复制携带内容
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="copyOne" class="collapse show" aria-labelledby="copy" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <textarea v-model="config.copy.text" class="form-control inis-scroll" rows="3" placeholder="为空不添加内容"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 class="header-title">文章配置</h4>
                                    <p class="text-muted">
                                        关于文章版权信息的一些配置
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header" id="article">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#articleOne" aria-expanded="false" aria-controls="collapseOne">
                                                            文章配置信息
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="articleOne" class="collapse" aria-labelledby="article" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>是否在文章页面显示页脚版权信息</label>
                                                                    <p class="mb-0">
                                                                        <input type="checkbox" id="is_copy" checked data-switch="success">
                                                                        <label for="is_copy" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 class="header-title">帮助信息</h4>
                                    <p class="text-muted">
                                        帮助信息会显示在左边侧边栏
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header" id="help">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#helpOne" aria-expanded="true" aria-controls="collapseOne">
                                                            配置帮助信息
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="helpOne" class="collapse" aria-labelledby="help" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>描述</label>
                                                                    <input v-model="config.help.description" type="text" class="form-control">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>按钮文字</label>
                                                                    <input v-model="config.help.btn_text" type="text" class="form-control" placeholder>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>图片地址</label>
                                                                    <input v-model="config.help.img_src" type="text" class="form-control" placeholder="请填写图片链接">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>按钮跳转地址</label>
                                                                    <input v-model="config.help.btn_url" type="text" class="form-control" placeholder="请填写跳转链接">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <p class="mb-0 flex">
                                                                        是否显示帮助：
                                                                        <input type="checkbox" id="is_help" checked data-switch="success">
                                                                        <label for="is_help" data-on-label="Yes" data-off-label="No"></label>
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
                                <div class="tab-pane" id="set-dev">
                                    <h4 class="header-title">页脚信息</h4>
                                    <p class="text-muted">
                                        位置是博客底部，可以填写备案号等一些信息
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header" id="footer">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#footerOne" aria-expanded="true" aria-controls="collapseOne">
                                                            配置页脚
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="footerOne" class="collapse show" aria-labelledby="footer" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>底部左侧信息</label>
                                                                    <textarea v-model="config.footer.left" class="form-control inis-scroll" rows="3" placeholder="推荐填写HTML代码"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>底部右侧信息</label>
                                                                    <textarea v-model="config.footer.right" class="form-control inis-scroll" rows="3" placeholder="推荐填写HTML代码"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 class="header-title">自定义代码</h4>
                                    <p class="text-muted">
                                        位置是博客底部，可以填写备案号等一些信息
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header" id="code">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#codeOne" aria-expanded="false" aria-controls="collapseOne">
                                                            配置代码
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="codeOne" class="collapse" aria-labelledby="code" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>自定义 CSS</label>
                                                                    <textarea v-model="config.code.css" class="form-control inis-scroll" rows="3" placeholder="这里填写的是css代码，来进行自定义样式，会自动输出到</head>标签之前"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>自定义输出head 头部的HTML代码</label>
                                                                    <textarea v-model="config.code.head_html" class="form-control inis-scroll" rows="3" placeholder="这里填写的是html代码，会输入到</head>之前"></textarea>
                                                                    <p class="text-muted mb-0">你可以填写网站统计代码等其他信息，网站统计代码推荐google 统计和百度统计</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>自定义输出body 尾部的HTML代码</label>
                                                                    <textarea v-model="config.code.body_html" class="form-control inis-scroll" rows="3" placeholder="这里填写的是html代码，会输入到</body>之前"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="float-right mt-3">
                                    <button v-on:click="methods.save()" type="button" class="btn btn-success">保存配置</button>
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
import { onMounted, reactive, toRefs } from 'vue'

export default {
    components: { iFooter },
    setup(){

        const state = reactive({
            config: {},     // 配置信息
        })

        const methods = {
            // 初始化
            initData(){

            },
            // 初始化配置
            initConfig(){
                // 站点配置
                const site = {title:'', favicon:'', nickname:'', description:'', head_img:'', present:''}
                // LOGO配置
                const logo = {big_day:'',small_day:'',big_night:'',small_night:''}
                // 复制配置
                const copy = {text:''}
                // 帮助配置
                const help = {description:'',btn_text:'',btn_url:'',img_src:''}
                // 页脚配置
                const footer = {left:'',right:''}
                // 自定义代码
                const code = {css:'',head_html:'',body_html:''}
                // 设置初始化配置
                state.config = {site,logo,copy,help,footer,code}
            },
            // 保存信息
            save(){
                console.log(state.config)
            }
        }

        // 初始化配置
        methods.initConfig()

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