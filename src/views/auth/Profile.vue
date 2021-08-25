<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 个人信息组件                                                           -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <div id="option" class="content-page">

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <div class="page-title-right">
                        </div>
                        <h4 class="page-title">个人信息</h4>
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
import { useStore, mapState } from 'vuex'
import iFooter from '@/components/public/footer'
import { GET, POST } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs, watch } from 'vue'
import axios from 'axios'

export default {
    components: { iFooter },
    setup(){

        const store = useStore()
        const state = reactive({

        })

        const methods = {
            // 初始化
            initData(){
                methods.getUser()
            },
            getUser(){
                axios.get('/api/users').then(res=>{
                    console.log(res.data)
                })
            }
        }

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
    },
    computed: {
    },
}
</script>