<template>
<div id="page" class="content-page">
    <div class="content">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">

                        <h3 class="mt-0 text-center">{{pages.title}}</h3>

                        <div v-html="pages.content" v-code-highlight class="article-content"></div>

                        <div class="row mt-3">
                            <div class="card-body">
                                <div class="float-left">
                                    <span class="font-12px">
                                        创建时间：{{ methods.natureTime(pages.create_time || null) }}
                                    </span>
                                </div>
                                <div class="float-right">
                                    <span class="font-12px">
                                        修改时间：{{ methods.natureTime(pages.update_time || null) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <teleport to="head">
        <!-- 代码高亮 CSS - 开始 -->
        <i-link src="assets/css/highlight/dark.min.css"></i-link>
        <!-- 代码高亮 CSS - 结束 -->
    </teleport>

    <i-footer></i-footer>
</div>
</template>

<script>
import iLink from '@/components/tool/Link'
import { GET } from '@/utils/http/request'
import iFooter from '@/components/public/footer'
import { onMounted, reactive, toRefs } from 'vue'
import { inisHelper } from '@/utils/helper/helper'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export default {
    components: { iFooter, iLink },
    setup(){

        // 响应式实例
        const route = useRoute()

        const state = reactive({
            alias: null,     // 别名
            pages: [],       // 页面数据
        })

        // 从路由获取别名
        state.alias = route.params.alias

        // 监听路由更新
        onBeforeRouteUpdate((to, from, next)=>{
            state.alias = to.params.alias || null
            methods.getPage()
            next()
        })

        const methods = {
            // 初始化数据
            initData(){
                methods.getPage()
            },
            // 获取页面详情数据
            getPage(){
                let params = {alias:state.alias}
                GET('page', {params}).then(res=>{
                    if (res.data.code == 200) {
                        state.pages = res.data.data
                    }
                })
            },
            // 人性化时间
            natureTime(date = null){
                const time = inisHelper.date.to.time(date)
                return inisHelper.time.nature(time)
            },
        }

        onMounted(()=>{
            methods.initData()
        })

        return { ...toRefs(state), methods }
    },
    computed: {
        
    }
}
</script>
