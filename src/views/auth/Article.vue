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
    <div class="content-page">

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <div class="page-title-right">
                        </div>
                        <h4 class="page-title">管理文章</h4>
                    </div>
                </div>
            </div>

            <div class="row">

            </div>

        </div>

        <i-footer></i-footer>
    </div>
</template>

<script>
import iFooter from '@/components/public/footer'
import { GET } from '@/utils/http/request'
import { useStore } from 'vuex'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs, watch } from 'vue'

export default {
    components: { iFooter },
    setup(){

        // Vuex 响应实例
        const store = useStore()
        const state = reactive({

        })

        const methods = {
            // 初始化
            initData(){

            },
        }

        onMounted(()=>{
            methods.initData()
        })

        watch(()=>store.state.theme_config,()=>{
            let site = store.state.theme_config.site
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
        }
    }
}
</script>