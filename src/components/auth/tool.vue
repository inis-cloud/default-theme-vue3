<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 公共测试组件                                                           -->
<!-- +---------------------------------------------------------------------- -->

<template>
<div class="list-container">
  <button class="more-button" aria-label="Menu Button">
    <div class="menu-icon-wrapper">
      <div id="lottie-menu"></div>
    </div>
  </button>
  <ul class="more-button-list">
    <li v-on:click="methods.switchNight()" class="more-button-list-item">
        <div id="lottie-night"></div>
      <span>{{theme}}</span>
    </li>
    <li v-on:click="goToTop" class="more-button-list-item">
      <div id="lottie-upup"></div>
      <span>返回顶部</span>
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'
import lottie from 'lottie-web'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { inisHelper } from '@/utils/helper/helper'

export default {
    setup(){

        const store = useStore()
        const state = reactive({
            theme: '夜间模式'
        })

        const methods = {
            // 初始化
            initData(){
                methods.lottie()
                methods.listener()
                methods.setTheme()
            },
            // 动态图标
            lottie(){
                axios.all([
                    axios.get('assets/libs/lottie/json/night.json').then(res=>res.data),
                    axios.get('assets/libs/lottie/json/upup.json').then(res=>res.data),
                    axios.get('assets/libs/lottie/json/menu.json').then(res=>res.data),
                ]).then(axios.spread((night,upup,menu)=>{
                    lottie.loadAnimation({container:document.getElementById("lottie-night"),renderer:"svg",loop:true,autoplay:true,animationData:night})
                    lottie.loadAnimation({container:document.getElementById("lottie-upup"),renderer:"svg",loop:true,autoplay:true,animationData:upup})
                    lottie.loadAnimation({container:document.getElementById("lottie-menu"),renderer:"svg",loop:true,autoplay:true,animationData:menu})
                }))
            },
            // 监听
            listener(){
                let container = document.querySelector('.list-container')
                // 点击空白关闭工具栏
                document.querySelector('body').addEventListener('click', () => {
                    if (container.className.indexOf('active') !== -1) {
                        container.classList.remove('active')
                    }
                })
                // 显示工具栏
                document.querySelector('.more-button').addEventListener('click', (e) => {
                    e.stopPropagation()
                    container.classList.toggle('active')
                })
                // 阻止冒泡
                document.querySelector('.more-button-list').addEventListener('click', (e) => {
                    // e.stopPropagation()
                })
            },
            // 设置主题模式
            setTheme(){
                let body    = document.querySelector('body')
                let theme   = inisHelper.get.storage("inis",'theme')
                let lg_logo = document.querySelector('.topnav-logo .topnav-logo-lg img')
                let sm_logo = document.querySelector('.topnav-logo .topnav-logo-sm img')
                // 判断缓存是否存在且未过期
                if (inisHelper.in.array(theme,['night'])) {
                    state.theme = '日间模式'
                    body.setAttribute('theme','night')
                    setTimeout(()=>{
                        lg_logo.src = store.state.theme_config.logo.big_night
                        sm_logo.src = store.state.theme_config.logo.small_night
                    }, 500)
                } else {
                    state.theme = '夜间模式'
                    body.setAttribute('theme','')
                    setTimeout(()=>{
                        lg_logo.src = store.state.theme_config.logo.big_day
                        sm_logo.src = store.state.theme_config.logo.small_day
                    }, 500)
                }
            },
            // 切换主题模式
            switchNight(){
                
                let body  = document.querySelector('body')
                let theme = body.getAttribute('theme')

                if (inisHelper.in.array(theme,['night'])) {
                    inisHelper.set.storage('inis',{'theme':''})
                } else {
                    inisHelper.set.storage('inis',{'theme':'night'})
                }

                // 更新vuex主题配置
                store.dispatch('commitThemeConfig')

                methods.setTheme()
            },
            // 自动夜间模式
            autoNight(start = 22, end = 6){
                if ((new Date).getHours() <= parseInt(end) || (new Date).getHours() >= parseInt(start)) {
                    inisHelper.set.storage('inis',{'theme':'night'})
                } else inisHelper.set.storage('inis',{'theme':''})
            }
        }

        watch(()=>store.state.theme_config.basic, ()=>{
            let config = store.state.theme_config
            if (config.basic.auto_night == 'true') {
                methods.autoNight(config.basic.night_start, config.basic.night_end)
                methods.setTheme()
            }
        })

        onMounted(()=>{
            methods.initData()
        })

        return { ...toRefs(state), methods }
    },
    methods:{
        // 返回顶部
        goToTop(){
            inisHelper.to.scroll(0, 300)
        },
    }
}
</script>

<style scoped>
.list-container{position:relative}
.list-container.active .more-button-list{opacity:1;transform:scale(1)}
.list-container.active .more-button-list-item{-webkit-animation:fadeInItem 0.6s 0.2s forwards;animation:fadeInItem 0.6s 0.2s forwards}
.list-container.active .more-button-list-item:nth-child(2){-webkit-animation-delay:0.4s;animation-delay:0.4s}
.list-container.active .more-button-list-item:nth-child(3){-webkit-animation-delay:0.6s;animation-delay:0.6s}
.list-container.active .more-button-list-item:nth-child(4){-webkit-animation-delay:0.8s;animation-delay:0.8s}
.list-container.active .menu-icon-wrapper{transform:rotate(-45deg)}
.more-button{background-color:white;box-shadow:0 0 35px 0 rgb(154 161 171 / 46%);border-radius:50%;width:40px;height:40px;border:none;padding:0;cursor:pointer;transition:0.2s ease-in;display:flex;align-items:center;justify-content:center;color:#fff;position:relative;z-index:2}
.more-button:focus{outline:0}
.more-button-list{background-color:#fff;border-radius:8px;list-style-type:none;width:140px;box-shadow:0 0 35px 0 rgb(154 161 171 / 46%);padding:0;padding:6px;position:absolute;right:24px;bottom:0;opacity:0;transform:scale(0);transform-origin:bottom right;transition:all 0.3s ease 0.1s}
.more-button-list li{opacity:0}
.more-button-list-item{display:flex;align-items:center;color:#6c757d;padding:10px;border-radius:4px;cursor:pointer;position:relative;transition:0.2s ease-in;transform:translatex(-10px)}
.more-button-list-item:hover{color:#727cf5}
.more-button-list-item:after{content:"";position:absolute;height:1px;width:calc(100% - 24px);left:12px;bottom:0;background-color:rgba(132,160,244,0.1)}
.more-button-list-item:last-child:after{display:none}
.more-button-list-item svg{width:18px;height:18px}
.more-button-list-item span{display:inline-block;line-height:20px;font-size:14px;margin-left:8px}
@-webkit-keyframes onePulse{0%{box-shadow:0px 0px 0px 0px rgba(92,103,255,0.3)}
50%{box-shadow:0px 0px 0px 12px rgba(92,103,255,0.1)}
100%{box-shadow:0px 0px 0px 4px rgba(92,103,255,0.3)}
}@keyframes onePulse{0%{box-shadow:0px 0px 0px 0px rgba(92,103,255,0.3)}
50%{box-shadow:0px 0px 0px 12px rgba(92,103,255,0.1)}
100%{box-shadow:0px 0px 0px 4px rgba(92,103,255,0.3)}
}@-webkit-keyframes fadeInItem{100%{transform:translatex(0px);opacity:1}
}@keyframes fadeInItem{100%{transform:translatex(0px);opacity:1}
}
.socials{position:fixed;bottom:16px;right:16px;display:flex;align-items:center}
.social-link{color:#fff;display:flex;align-items:center;cursor:pointer;text-decoration:none;margin-right:12px}
.menu-icon-wrapper{border-radius:2px;width:20px;height:20px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:transform 330ms ease-out}
.list-container{position:fixed;right:5%;bottom:5%}
</style>

