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
    <i-nav />
    <!-- 顶部导航 - 结束 -->

    <div class="container-fluid small-container">
      <div class="wrapper">

        <!-- 侧边栏 - 开始 -->
        <i-side />
        <!-- 侧边栏 - 结束 -->

        <!-- 内容 - 开始 -->
        <!-- 路由变化更新 :key="$route.fullPath" -->
        <router-view />
        <!-- 内容 - 结束 -->
        
      </div>
    </div>

    <i-tool />

    <teleport to="head">
      <!-- 核心CSS - 开始 -->
      <i-link src="assets/css/inis.min.css"></i-link>
      <i-link src="assets/css/inis.media.css"></i-link>
      <!-- 核心CSS - 结束 -->
    </teleport>
    <teleport to="body">
      <!-- 公共依赖 JS - 开始 -->
      <i-link tag="script" src="assets/js/app.min.js"></i-link>
      <!-- 公共依赖 JS - 结束 -->
    </teleport>
  </div>
</template>

<script>
// 公共组件
import iLink from '@/components/tool/Link'
import iNav from '@/components/auth/navbar'
import iSide from '@/components/auth/sidebar'
import iTool from '@/components/public/tool'
import { inisHelper } from '@/utils/helper/helper'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate } from 'vue-router'

export default {
  components: { iNav, iSide, iLink, iTool },
  setup() {
    const store = useStore()
    
    // 记录一下是否为手机设备
    inisHelper.set.storage('inis',{'mobile':inisHelper.is.mobile()})
    store.dispatch('commitSiteInfo')

    // 监听复制操作
    if (INIS.copyright) document.addEventListener('copy',(e)=>{
      let clipboardData = e.clipboardData || window.clipboardData;
      if(!clipboardData) return ;
      let text = window.getSelection().toString();
      if (text) {
        e.preventDefault();
        clipboardData.setData('text/plain', text + '\n' + INIS.copy_text || null)
      }
    })

    // 监听路由更新
    onBeforeRouteUpdate((to, from, next)=>{
      // 关闭菜单栏
      document.querySelector("body").classList.remove("sidebar-enable")
      next()
    })
  },
}
</script>

<style>
@import url('~@/assets/css/root.css');
@import url('~@/assets/css/app.min.css');
</style>
