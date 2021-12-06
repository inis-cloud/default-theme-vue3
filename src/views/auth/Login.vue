<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 登录组件                                                               -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <section id="auth">
        <!-- 背景颜色 -->
        <div class="color"></div>
        <div class="color"></div>
        <div class="color"></div>
        <div class="box">
            <!-- 背景圆 -->
            <div class="circle" style="--x:0"></div>
            <div class="circle" style="--x:1"></div>
            <div class="circle" style="--x:2"></div>
            <div class="circle" style="--x:3"></div>
            <div class="circle" style="--x:4"></div>
            <!-- 登录框 -->
            <div class="container">
                <!-- 内容 - 开始 -->
                <div class="form">
                    <h2>登录</h2>
                    <div class="inputBox">
                        <input v-model="account" type="text" placeholder="帐号 | 邮箱">
                    </div>
                    <div class="inputBox">
                        <input v-model="password" v-on:keyup.enter="methods.login()" type="password" placeholder="密码">
                    </div>
                    <div class="inputBox">
                        <button v-on:click="methods.login()" type="button" class="btn login flex-center">
                            <span v-if="login_is_load" class="spinner-border text-light mr-1" role="status"></span>
                            <span>{{ (login_is_load) ? "登录中" : "登录" }}</span>
                        </button>
                    </div>
                    <!-- <p class="forget">忘记密码?
                        <a href="#">  点击这里 </a>
                    </p> -->
                    <p class="forget">
                        <span class="float-left">没有账户？ <router-link :to="{name:'register'}">注册</router-link></span>
                        <span class="float-right">
                            <!-- <router-link :to="{name:'index'}">回到首页</router-link> -->
                            <a href="/">回到首页</a>
                        </span>
                    </p>
                </div>
                <!-- 内容 - 结束 -->
            </div>
        </div>
    </section>
    <teleport to="body">
      <!-- 公共依赖 JS - 开始 -->
      <i-link tag="script" src="assets/js/app.min.js"></i-link>
      <!-- 公共依赖 JS - 结束 -->
    </teleport>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { POST } from '@/utils/http/request'
import iLink from '@/components/tool/Link'
import { inisHelper } from '@/utils/helper/helper'

export default {
    components: { iLink },
    setup() {

        const state = reactive({
            account  : null,     // 帐号或邮箱
            password : null,     // 密码
            login_is_load: false,// 登录动画
        })

        const methods = {
            // 登录
            login(){
                if (inisHelper.is.empty(state.account)) $.NotificationApp.send("提示！", '帐号不得为空！', "top-right", "rgba(0,0,0,0.2)", "warning")
                else if (inisHelper.is.empty(state.password)) $.NotificationApp.send("提示！", '帐号不得为空！', "top-right", "rgba(0,0,0,0.2)", "warning")
                else {
                    let params = {
                        mode     : 'login',
                        account  : state.account,
                        password : state.password
                    }
                    // 登录动画
                    state.login_is_load = true

                    POST('users', params).then(res=>{
                        if (res.data.code == 200) {
                            // 设置登录用户信息
                            state.user = res.data.data.user
                            // 有效时间
                            res.data.data.time = 7200
                            // 登录信息存储到缓存中
                            inisHelper.set.storage('login',res.data.data)
                            // 关闭登录框
                            $('#login-modal').modal('hide')
                            // 更新登录状态
                            state.is_login = true
                            state.account  = null
                            state.password = null
                            $.NotificationApp.send("提示！", "登录成功！", "top-right", "rgba(0,0,0,0.2)", "info")
                            setTimeout(()=>{
                                window.location.href = '/'
                            }, 1000)
                        } else $.NotificationApp.send("提示！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "error")
                        // 登录动画
                        state.login_is_load = false
                    })
                }
            },
            // 重置密码
            reset(){
                // ... 下个版本再写
            }
        }

        return { ...toRefs(state), methods }
    },
}
</script>

<style scoped>
@import url('~@/assets/css/root.css');
@import url('~@/assets/css/app.min.css');
@import url('~@/assets/css/inis.auth.css');
</style>