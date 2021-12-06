<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 主题配置组件                                                           -->
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
                                        <span>基础设置</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#set-other" data-toggle="tab" aria-expanded="true" class="nav-link">
                                        <span>其他设置</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#set-dev" data-toggle="tab" aria-expanded="false" class="nav-link">
                                        <span>开发者设置</span>
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
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="site">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#siteOne" aria-expanded="true" aria-controls="collapseOne">
                                                            站点信息<span class="text-muted font-13">（站点标题、站点描述、站点头像、favicon、博主昵称、博主介绍、备案信息）</span>
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
                                                                    <input v-model="theme_config.basic.site.title" type="text" class="form-control">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>favicon 地址</label>
                                                                    <input v-model="theme_config.basic.site.favicon" type="text" class="form-control" placeholder="请提交一个图片链接">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>博主的昵称</label>
                                                                    <input v-model="theme_config.basic.site.nickname" type="text" class="form-control" placeholder="您希望大家怎么称呼您">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>备案信息</label>
                                                                    <input v-model="theme_config.basic.site.copy.code" type="text" class="form-control" placeholder="备案号">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>站点描述</label>
                                                                    <input v-model="theme_config.basic.site.description" type="text" class="form-control" placeholder="为空默认使用一言">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>站点头像</label>
                                                                    <input v-model="theme_config.basic.site.head_img" type="text" class="form-control" placeholder="请提交一个图片链接">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>博主的介绍</label>
                                                                    <input v-model="theme_config.basic.site.present" type="text" class="form-control" placeholder="简单的介绍一下自己">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>工信部地址</label>
                                                                    <input v-model="theme_config.basic.site.copy.url" type="text" class="form-control" placeholder="点击备案号跳转的工信部地址">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="style">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#styleOne" aria-expanded="false" aria-controls="collapseOne">
                                                            外观设置<span class="text-muted font-13">（主题颜色、主题透明度、静态背景、动态背景）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="styleOne" class="collapse" aria-labelledby="style" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>导航栏颜色</label>
                                                                    <input class="form-control" type="color" name="color" v-model="theme_config.basic.style.color.nav">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>侧边栏颜色</label>
                                                                    <input class="form-control" type="color" name="color" v-model="theme_config.basic.style.color.left">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>主体颜色</label>
                                                                    <input class="form-control" type="color" name="color" v-model="theme_config.basic.style.color.main">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>主题透明度</label>
                                                                    <input v-model="theme_config.basic.style.opacity" type="text" class="form-control" placeholder="取值范围：0.00 - 1">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>背景颜色</label>
                                                                    <input class="form-control" type="color" name="color" v-model="theme_config.basic.style.color.background">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>字体颜色</label>
                                                                    <input class="form-control" type="color" name="color" v-model="theme_config.basic.style.font.color">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>字体大小</label>
                                                                    <input v-model="theme_config.basic.style.font.size" type="text" class="form-control" placeholder="如：13px、0.9em">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group mb-3">
                                                                    <label>圆角值</label>
                                                                    <input v-model="theme_config.basic.style.radius" type="text" class="form-control" placeholder="如：5px、0.25em">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>背景图片</label>
                                                                    <input v-model="theme_config.basic.style.background.static" type="text" class="form-control" placeholder="请提交一个图片链接，为空不设置">
                                                                    <p class="text-muted mb-0">优先级低，动态背景优先级高</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>动态背景</label>
                                                                    <select2 v-model="theme_config.basic.style.background.dynamic" :options="dynamic" />
                                                                    <p class="text-muted mb-0">低配党此功能谨慎开启，会影响响应速度</p>
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
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="basic">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#basicOne" aria-expanded="false" aria-controls="collapseOne">
                                                            小组件<span class="text-muted font-13">（轮播、首页欢迎、音乐播放器、文章版权）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="basicOne" class="collapse" aria-labelledby="basic" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group flex">
                                                                    <p class="mb-0 mr-2 flex">
                                                                        显示轮播：
                                                                        <input v-model="theme_config.other.module.banner" type="checkbox" id="banner" checked data-switch="success">
                                                                        <label for="banner" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                    <p class="mb-0 mr-2 flex">
                                                                        首页访问欢迎：
                                                                        <input v-model="theme_config.other.module.wecome" type="checkbox" id="wecome" checked data-switch="success">
                                                                        <label for="wecome" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                    <p class="mb-0 mr-2 flex">
                                                                        音乐播放器：
                                                                        <input v-model="theme_config.other.module.music" type="checkbox" id="music_show" checked data-switch="success">
                                                                        <label for="music_show" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                    <p class="mb-0 mr-2 flex">
                                                                        文章版权：
                                                                        <input v-model="theme_config.other.module.article_copy" type="checkbox" id="article_copy" checked data-switch="success">
                                                                        <label for="article_copy" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                    <p class="mb-0 mr-2 flex">
                                                                        显示登录入口：
                                                                        <input v-model="theme_config.other.module.login" type="checkbox" id="login_show" checked data-switch="success">
                                                                        <label for="login_show" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                    <p class="mb-0 mr-2 flex">
                                                                        显示公告：
                                                                        <input v-model="theme_config.other.module.placard" type="checkbox" id="placard_show" checked data-switch="success">
                                                                        <label for="placard_show" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="basic-1">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#basicTwo" aria-expanded="false" aria-controls="collapseOne">
                                                            夜间模式<span class="text-muted font-13">（开始时间、结束时间）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="basicTwo" class="collapse" aria-labelledby="basic-1" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>夜间模式开始时间（24小时制）</label>
                                                                    <input v-model="theme_config.other.night.start" type="text" class="form-control" placeholder="该配置项填写小时的时间（24进制），如：22">
                                                                    <p class="text-muted mb-0">该配置只有在 夜间/日间模式选择自动才会生效。</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>夜间模式结束时间（24小时制）</label>
                                                                    <input v-model="theme_config.other.night.end" type="text" class="form-control" placeholder="该配置项填写小时的时间（24进制），如：6">
                                                                    <p class="text-muted mb-0">该配置只有在 夜间/日间模式选择自动才会生效。</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <p class="mb-0 flex">
                                                                        自动开启夜间模式：
                                                                        <input v-model="theme_config.other.night.auto" type="checkbox" id="auto_night" checked data-switch="success">
                                                                        <label for="auto_night" data-on-label="Yes" data-off-label="No"></label>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="images-1">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#imagesOne" aria-expanded="false" aria-controls="collapseOne">
                                                            图片配置<span class="text-muted font-13">（图片预加载、图片加载失败、时光机背景图、LOGO）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="imagesOne" class="collapse" aria-labelledby="images-1" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>图片预加载图</label>
                                                                    <input v-model="theme_config.other.images.preview_url" type="text" class="form-control" placeholder="图片地址">
                                                                    <p class="text-muted mb-0">在图片加载完成之前，先加载此图</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>图片加载失败图</label>
                                                                    <input v-model="theme_config.other.images.img_err_url" type="text" class="form-control" placeholder="图片地址">
                                                                    <p class="text-muted mb-0">若图片地址失效，会替换成此图</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label>日间模式大LOGO</label>
                                                                    <input v-model="theme_config.other.images.logo.day.big" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label>日间模式小LOGO</label>
                                                                    <input v-model="theme_config.other.images.logo.day.small" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label>夜间模式大LOGO</label>
                                                                    <input v-model="theme_config.other.images.logo.night.big" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label>夜间模式小LOGO</label>
                                                                    <input v-model="theme_config.other.images.logo.night.small" type="text" class="form-control" placeholder="填写HTML代码，如：<img src='//inis.cn/assets/images/logo.png'> ，也可以填写更复杂的html代码，如svg等">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>时光机背景图</label>
                                                                    <input v-model="theme_config.other.images.cross_bg" type="text" class="form-control" placeholder="请提交一个图片链接">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="help">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#helpOne" aria-expanded="true" aria-controls="collapseOne">
                                                            帮助信息<span class="text-muted font-13">（帮助信息会显示在左边侧边栏）</span>
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
                                                                    <input v-model="theme_config.other.help.description" type="text" class="form-control">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>按钮文字</label>
                                                                    <input v-model="theme_config.other.help.btn_text" type="text" class="form-control" placeholder>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group mb-3">
                                                                    <label>图片地址</label>
                                                                    <input v-model="theme_config.other.help.img_src" type="text" class="form-control" placeholder="请填写图片链接">
                                                                </div>
                                                                <div class="form-group mb-3">
                                                                    <label>按钮跳转地址</label>
                                                                    <input v-model="theme_config.other.help.btn_url" type="text" class="form-control" placeholder="请填写跳转链接">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <p class="mb-0 flex">
                                                                        是否显示帮助：
                                                                        <input v-model="theme_config.other.help.is_show" type="checkbox" id="is_help" checked data-switch="success">
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
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="copy">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#copyOne" aria-expanded="false" aria-controls="collapseOne">
                                                            复制 <span class="text-muted font-13">（整站任意位置复制内容后，在末尾添加自定义的内容）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="copyOne" class="collapse" aria-labelledby="copy" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <textarea v-model="theme_config.other.copy.text" class="form-control inis-scroll" rows="3" placeholder="为空不添加内容"></textarea>
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
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="footer">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#footerOne" aria-expanded="false" aria-controls="collapseOne">
                                                            页脚<span class="text-muted font-13">（博客底部页脚处）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="footerOne" class="collapse" aria-labelledby="footer" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>底部左侧信息</label>
                                                                    <textarea v-model="theme_config.developer.footer.left" class="form-control inis-scroll" rows="3" placeholder="推荐填写HTML代码"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <label>底部右侧信息</label>
                                                                    <textarea v-model="theme_config.developer.footer.right" class="form-control inis-scroll" rows="3" placeholder="推荐填写HTML代码"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="menu">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#menuOne" aria-expanded="false" aria-controls="collapseOne">
                                                            侧边栏菜单<span class="text-muted font-13">（一级菜单、二级菜单）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="menuOne" class="collapse" aria-labelledby="menu" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>一级菜单</label>
                                                                    <textarea v-model="theme_config.developer.menu.one" class="form-control inis-scroll" rows="5" placeholder="JSON代码"></textarea>
                                                                    <p class="text-muted mb-0">推荐将配置复制粘贴到 <a href="//json.cn" target="_blank">在线编辑器</a> 编辑</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <label>二级菜单</label>
                                                                    <textarea v-model="theme_config.developer.menu.two" class="form-control inis-scroll" rows="5" placeholder="JSON代码"></textarea>
                                                                    <p class="text-muted mb-0">推荐将配置复制粘贴到 <a href="//json.cn" target="_blank">在线编辑器</a> 编辑</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card mb-1">
                                                <div class="card-header" id="code">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#codeOne" aria-expanded="false" aria-controls="collapseOne">
                                                            自定义代码<span class="text-muted font-13">（提供开发者使用的自定义代码配置 <span class="text-danger">（注意：不支持JS代码）</span>）</span>
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
                                                                    <textarea v-model="theme_config.developer.code.css" class="form-control inis-scroll" rows="3" placeholder="这里填写的是css代码，来进行自定义样式，会自动输出到</head>标签之前"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>自定义输出head 头部的HTML代码</label>
                                                                    <textarea v-model="theme_config.developer.code.html.head" class="form-control inis-scroll" rows="3" placeholder="这里填写的是html代码，会输入到</head>之前"></textarea>
                                                                    <p class="text-muted mb-0">你可以填写网站统计代码等其他信息，网站统计代码推荐google 统计和百度统计</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <label>自定义输出body 尾部的HTML代码</label>
                                                                    <textarea v-model="theme_config.developer.code.html.body" class="form-control inis-scroll" rows="3" placeholder="这里填写的是html代码，会输入到</body>之前"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header" id="optimize">
                                                    <h5 class="m-0">
                                                        <a class="custom-accordion-title d-block pt-2 pb-2" data-toggle="collapse" href="#optimizeOne" aria-expanded="false" aria-controls="collapseOne">
                                                            速度优化<span class="text-muted font-13">（将静态资源使用CDN加速）</span>
                                                            <span class="float-right"><i class="fa fa-chevron-down"></i></span>
                                                        </a>
                                                    </h5>
                                                </div>
                                                <div id="optimizeOne" class="collapse" aria-labelledby="optimize" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group mb-3">
                                                                    <label>CDN地址</label>
                                                                    <input v-model="theme_config.developer.optimize.cdn" type="text" class="form-control" placeholder="请提交一个CDN地址，为空使用本地资源">
                                                                    <p class="text-muted mb-0">需要获取或自行发布CDN请前往<a href="//docs.inis.cc/#/tool/cdn" class="ml-1" target="_blank">文档</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="float-left mt-3">
                                    <button v-on:click="reset()" type="button" class="btn btn-light">恢复默认配置</button>
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

import { useStore, mapState } from 'vuex'
import iFooter from '@/components/public/footer'
import { GET, POST } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs, watch } from 'vue'
import default_theme_config from '@/assets/json/config.json'

export default {
    components: { iFooter },
    setup(){

        const store = useStore()
        const state = reactive({
            user: [],                                   // 用户信息
            theme_config: store.state.theme_config,     // 主题配置
            dynamic: [
                {id:0,text:'不设置'},
                {id:1,text:'彩色气球[推荐]'},
                {id:2,text:'漫漫星空[推荐]'},
                {id:3,text:'气泡背景[推荐]'},
                {id:4,text:'黑客帝国'},
                {id:5,text:'浮动气泡'},
                {id:6,text:'七色彩虹'},
                {id:7,text:'下雨背景'},
                {id:8,text:'彩色爱心'},
                {id:9,text:'蓝色气泡'},
                {id:10,text:'随机色带'},
                {id:11,text:'旋转特效'},
                {id:12,text:'磁力线条'},
                {id:13,text:'寂静的夜'},
                {id:14,text:'深邃星空'},
            ]
        })

        const methods = {
            // 初始化
            initData(){
                methods.getConfig()
            },
            // 获取主题配置
            getConfig(){
                GET('options',{
                    params:{key:'config:default-theme'}
                }).then(res=>{
                    if (res.data.code == 200) {
                        state.theme_config = res.data.data.opt
                        // 更新vuex主题配置
                        store.dispatch('commitThemeConfig', state.theme_config)
                    } else if (res.data.code == 204) {
                        if (state.user.user.level == 'admin') {
                            $.NotificationApp.send("提示！", "正在为您初始化主题配置信息！", "top-right", "rgba(0,0,0,0.2)", "info")
                            methods.save(true)
                        }
                    } else $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning")
                })
            },
            // 保存信息
            save(init = false){

                const params = inisHelper.stringfy({
                  keys:'config:default-theme',
                  opt :state.theme_config,
                })
                const config = {headers:{'login-token':state.user['login-token']}}

                POST('options', params, config).then(res=>{
                    if (res.data.code == 200) {
                        if (init) $.NotificationApp.send("提示！", "主题配置初始化完成！", "top-right", "rgba(0,0,0,0.2)", "info")
                        else {
                            $.NotificationApp.send("提示！", "主题配置保存成功！", "top-right", "rgba(0,0,0,0.2)", "info")
                            // 更新vuex主题配置
                            store.dispatch('commitThemeConfig', state.theme_config)
                        }
                    } else {
                        $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning")
                    }
                })
            },
            // 登录信息
            loginToken(){
                // 获取缓存中的登录信息
                let login_storage = inisHelper.get.storage("login")
                // 判断缓存是否存在且未过期
                if (login_storage != "expire" && login_storage) {
                    state.user = login_storage
                }
            }
        }

        // 初始化配置
        methods.loginToken()

        onMounted(()=>{
            methods.initData()
        })

        watch(()=>store.state.theme_config,()=>{
            let site = store.state.theme_config.basic.site
            // 设置页面 title
            document.title = site.title
        })

        return { ...toRefs(state), methods }
    },
    methods: {
        // 自然时间
        natureTime(date){
            let time = inisHelper.date.to.time(date)
            return inisHelper.time.nature(time)
        },
        // 恢复默认配置
        async reset(){

            const params = inisHelper.stringfy({
                mode: 'remove',
                keys:'config:default-theme'
            })
            const config = {headers:{'login-token':this.user['login-token']}}

            POST('options', params, config).then(res=>{
                if (res.data.code == 200) {
                    this.$store.dispatch('commitThemeConfig', default_theme_config)
                    this.theme_config = default_theme_config
                    this.methods.getConfig()
                }
            })
        },
    },
    computed: {
        ...mapState(['theme_config']),
        theme_config() {
            return this.theme_config
        }
    },
}
</script>

<style scoped>
#basicOne .form-group.flex{flex-wrap: wrap;}
</style>