<template>

<div id="astronaut"></div>

<teleport to="body">
    <!-- 公共依赖 JS - 开始 -->
    <i-link tag="script" src="assets/js/404/bodymovin.js"></i-link>
    <i-link tag="script" src="assets/js/404/data.js"></i-link>
    <!-- 公共依赖 JS - 结束 -->
</teleport>

</template>

<script>
import JQ from 'jquery'
import iLink from '@/components/tool/Link'

export default {
    components: { iLink },
    setup(){
        window.onload = () => {
            let astronaut = document.getElementById('astronaut');
            let animItem = bodymovin.loadAnimation({
                wrapper: astronaut,
                animType: 'svg',
                loop: true,
                animationData: JSON.parse(animationData)
            });
            JQ("#astronaut").append(`<div class="flex">
                <span class="pink mr-2">访问的页面不存在或已被删除</span>
                <a href="/" class="text-primary">回到首页</a>
            </div>`)
        }
    }
}
</script>

<style>
html{margin:0;padding:0;background-color:white}
a{text-decoration:none}
body,html{width:100%;height:100%;overflow:hidden}
#astronaut{width:100vw;height:80vh;background-color:white;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto}
.flex{display:flex;justify-content:center;align-items:center}
.pink{color:#ff83c4}
.mr-2{margin-right:1em}
.text-primary{color:#727cf5!important}
</style>