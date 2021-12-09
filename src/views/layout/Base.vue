<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 根组件                                                                 -->
<!-- +---------------------------------------------------------------------- -->

<template>
  <div id="nav">
    <!-- 顶部导航 - 开始 -->
    <i-nav></i-nav>
    <!-- 顶部导航 - 结束 -->

    <div class="container-fluid small-container">
      <div class="wrapper">

        <!-- 侧边栏 - 开始 -->
        <i-side></i-side>
        <!-- 侧边栏 - 结束 -->

        <!-- 内容 - 开始 -->
        <router-view></router-view>
        <!-- 内容 - 结束 -->
        
      </div>
    </div>

    <i-tool></i-tool>

    <teleport to="head">
      <i-link :src="handleCDN() + 'assets/css/root.css'"></i-link>
      <i-link :src="handleCDN() + 'assets/css/app.min.css'"></i-link>
      <i-link :src="handleCDN() + 'assets/css/inis.min.css'"></i-link>
      <i-link :src="handleCDN() + 'assets/css/inis.media.css'"></i-link>
      <i-link :src="handleCDN() + 'assets/css/night.css'"></i-link>
      <i-link :src="handleCDN() + 'assets/libs/animate/animate.min.css'"></i-link>
      <!-- 核心CSS - 开始 -->
      <i-tag tag="style" v-html="theme_config.developer.code.css"></i-tag>
      <!-- 核心CSS - 结束 -->
    </teleport>
    <teleport to="body">
      <!-- 公共依赖 JS - 开始 -->
      <i-link tag="script" :src="handleCDN() + 'assets/js/app.min.js'"></i-link>
      <!-- 公共依赖 JS - 结束 -->
    </teleport>
  </div>
</template>

<script>
// 公共组件
import iTag from '@/components/tool/Tag'
import iLink from '@/components/tool/Link'
import iNav from '@/components/public/navbar'
import iSide from '@/components/public/sidebar'
import iTool from '@/components/public/tool'
import { inisHelper } from '@/utils/helper/helper'
import { watchEffect } from 'vue'
import { useStore, mapState } from 'vuex'
import { onBeforeRouteUpdate } from 'vue-router'
import JQ from 'jquery'

export default {
  components: { iNav, iSide, iLink, iTool, iTag },
  setup() {
    const store = useStore()
    
    // 记录一下是否为手机设备
    inisHelper.set.storage('inis',{'mobile':inisHelper.is.mobile()})
    // 主题配置
    store.dispatch('commitThemeConfig')
    // 登录信息
    store.dispatch('commitLogin')

    const methods = {
      initData(){
        // 监听复制操作
        document.addEventListener('copy',(e)=>{
          let clipboardData = e.clipboardData || window.clipboardData;
          if(!clipboardData) return;
          let text = window.getSelection().toString();
          if (text) {
            e.preventDefault();
            clipboardData.setData('text/plain', text + '\n' + store.state.theme_config.other.copy.text || null)
          }
        })

        // 自定义代码
        setTimeout(()=>{
          let code = store.state.theme_config.developer.code
          JQ('head').append(code.html.head)
          JQ('body').append(code.html.body)
        },500)
        
        watchEffect(()=>{
          
          let theme_config = store.state.theme_config

          // 动态修改 favicon
          let link  = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel  = 'shortcut icon';
          link.href = store.state.theme_config.basic.site.favicon;
          document.getElementsByTagName('head')[0].appendChild(link);

          // 静态背景图设置
          if (!inisHelper.is.empty(theme_config.basic.style.background.static) && theme_config.basic.style.background.dynamic == 0) {
            inisHelper.set.links([{
              config:{'type':'img',tag:'body'},
              id:'background-image',
              src:theme_config.basic.style.background.static,
            }])
          } else if (theme_config.basic.style.background.dynamic != 0) {
            let cdn = methods.handleCDN(INIS.cdn);
            // 使用本地资源
            inisHelper.set.links(`${cdn}assets/js/bg/${theme_config.basic.style.background.dynamic}.js`)
          }
          
          let style = theme_config.basic.style

          // 设置自定义主题颜色
          inisHelper.set.css(':root',`
            --inis-nav:${methods.color(style.color.nav, style.opacity)};
            --inis-left:${methods.color(style.color.left, style.opacity)};
            --inis-main:${methods.color(style.color.main, style.opacity)};
            --inis-background:${methods.color(style.color.background, 1)};
            --inis-font-color:${style.font.color};
            --inis-font-size:${style.font.size};
            --inis-radius:${style.radius};
            --inis-opacity:${style.opacity};
          `)
        })
      },
      // 颜色转换
      color(color,opacity){
        let result = inisHelper.color(color,opacity)
        return result.rgba
      },
      // 自动处理CDN地址
      handleCDN(cdn = ''){
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

    methods.initData()

    // 监听路由更新
    onBeforeRouteUpdate((to, from, next)=>{
      // 关闭菜单栏
      document.querySelector("body").classList.remove("sidebar-enable")
      next()
    })

    document.querySelector('body').setAttribute('class','loaded')
  },
  computed: {
    ...mapState(['theme_config'])
  },
  updated(){
    // document.querySelector('body').setAttribute('class','loaded')
  },
  methods:{
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
    }
  }
}
</script>
