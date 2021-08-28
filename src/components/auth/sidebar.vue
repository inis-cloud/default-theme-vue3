<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 公共侧边栏组件                                                         -->
<!-- +---------------------------------------------------------------------- -->

<template>
<div class="left-side-menu">

    <div class="slimScrollDiv">

        <div class="leftbar-user">
            <router-link :to="{path:'/cross'}">
                <img :src=" user.head_img || theme_config.site.head_img" height="42" width="42" class="rounded-circle shadow-sm">
                <span class="text-muted d-block mt-1">{{user.nickname || theme_config.site.nickname}}</span>
                <span class="leftbar-user-name text-muted font-12px">
                    {{user.description || theme_config.site.present}}
                </span>
            </router-link>
        </div>

        <ul class="metismenu side-nav">

            <li class="side-nav-title side-nav-item">导航</li>

            <li class="side-nav-item">
                <router-link :to="{name:'admin'}" class="side-nav-link">
                    <i><svg-icon file-name="home"></svg-icon></i>
                    <span> 控制台 </span>
                </router-link>
            </li>

            <li class="side-nav-item">
                <router-link :to="{name:'profile'}" class="side-nav-link">
                    <i><svg-icon file-name="backstage"></svg-icon></i>
                    <span> 个人信息 </span>
                </router-link>
            </li>

            <li class="side-nav-title side-nav-item mt-1">控制台</li>

            <li v-if="user.level == 'admin'" class="side-nav-item">
                <router-link :to="{name:'option'}" class="side-nav-link">
                    <i><svg-icon file-name="option"></svg-icon></i>
                    <span> 主题配置 </span>
                </router-link>
            </li>

        </ul>

        <div v-if="((theme_config.help.is_show == 'true') ? true : false)" class="help-box text-center">
            <a v-on:click="methods.setHelp()" href="javascript: void(0);" class="float-right close-btn text-body">
                <i><svg-icon file-name="close" style="width: 0.6em;height: 0.6em;"></svg-icon></i>
            </a>
            <img :src="theme_config.help.img_src || null" height="90" />
            <h5 class="mt-3">{{ user.nickname || null }}</h5>
            <p class="mb-3">{{theme_config.help.description || null}}</p>
            <a :href="theme_config.help.btn_url || null" target="_block" class="btn btn-outline-primary btn-sm">
                {{theme_config.help.btn_text || null}}
            </a>
        </div>

        <div class="clearfix"></div>

    </div>
</div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { mapState } from 'vuex'
import { inisHelper } from '@/utils/helper/helper'

export default {
    setup(){

        const state = reactive({
            user: {'level':'user'}, // 登录的用户
            is_login: false,        // 是否登录
        })

        // 获取缓存中的登录信息
        let login_storage = inisHelper.get.storage("login")
        // 判断缓存是否存在且未过期
        if (login_storage != "expire" && login_storage != false) {
            state.is_login = true
            state.user = login_storage.user
        }

        const methods = {
            // 初始化数据
            initData(){
                // 侧边栏滚动
                inisHelper.set.css(".left-side-menu .slimScrollDiv","height:" + (window.innerHeight - 100) + "px!important;")
            },
            // 打印彩色字体
            colorFont(){
                let DOM  = document.querySelector('.leftbar-user-name')
                let color_font=(r)=>{let t=()=>{return b[Math.floor(Math.random()*b.length)]};let e=()=>{return String.fromCharCode(94*Math.random()+33)};let n=(r)=>{for(var n=document.createDocumentFragment(),i=0;r>i;i++){var l=document.createElement("span");l.textContent=e(),l.style.color=t(),n.appendChild(l)}return n};let i=()=>{var t=o[c.skillI];c.step?c.step--:(c.step=g,c.prefixP<l.length?(c.prefixP>=0&&(c.text+=l[c.prefixP]),c.prefixP++):"forward"===c.direction?c.skillP<t.length?(c.text+=t[c.skillP],c.skillP++):c.delay?c.delay--:(c.direction="backward",c.delay=a):c.skillP>0?(c.text=c.text.slice(0,-1),c.skillP--):(c.skillI=(c.skillI+1)%o.length,c.direction="forward")),r.textContent=c.text,r.appendChild(n(c.prefixP<l.length?Math.min(s,s+c.prefixP):Math.min(s,t.length-c.skillP))),setTimeout(i,d)};let l="*",o=[DOM.innerText].map((r)=>{return r+""}),a=2,g=1,s=5,d=75,b=["rgb(110,64,170)","rgb(150,61,179)","rgb(191,60,175)","rgb(228,65,157)","rgb(254,75,131)","rgb(255,94,99)","rgb(255,120,71)","rgb(251,150,51)","rgb(226,183,47)","rgb(198,214,60)","rgb(175,240,91)","rgb(127,246,88)","rgb(82,246,103)","rgb(48,239,130)","rgb(29,223,163)","rgb(26,199,194)","rgb(35,171,216)","rgb(54,140,225)","rgb(76,110,219)","rgb(96,84,200)"],c={text:"",prefixP:-s,skillI:0,skillP:0,direction:"forward",delay:a,step:g};i()};
                if (!inisHelper.is.empty(DOM.innerText)) color_font(DOM);
            },
        }

        onMounted(()=>{
            methods.initData()
            methods.colorFont()
        })

        // 返回数据
        return { ...toRefs(state), methods }
    },
    methods:{
        
    },
    computed: {
        ...mapState(['site_info','theme_config'])
    },
}

</script>


<style scoped>
.side-nav .menu-arrow:before{content:""!important}
.list-icons{width:.8em;height:.8em}
.side-nav-second-level li a img{width:20px;height:20px;border-radius:50%;margin-right:10px}
</style>
