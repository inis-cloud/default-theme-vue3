<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 注册组件                                                               -->
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
                <h2>注册</h2>
                <div class="inputBox">
                    <input v-model="user.nickname" type="text" placeholder="昵称">
                </div>
                <div class="inputBox">
                    <input v-model="user.password1" type="password" placeholder="密码">
                </div>
                <div class="inputBox">
                    <input v-model="user.password2" type="password" placeholder="确认密码">
                </div>
                <div class="inputBox">
                    <input v-model="user.email" type="text" placeholder="邮箱">
                </div>
                <div class="input-group">
                    <input v-model="user.code" type="text" class="form-control" placeholder="验证码">
                    <div class="input-group-append">
                        <button v-on:click="methods.code()" id="code" class="btn btn-dark" type="button">{{ code_title || '获取'}}</button>
                    </div>
                </div>
                <div class="inputBox">
                    <button v-on:click="methods.save()" type="button" class="btn login flex-center">
                        <span v-if="login_is_load" class="spinner-border text-light mr-1" role="status"></span>
                        <span>{{ (login_is_load) ? "注册中" : "提交注册" }}</span>
                    </button>
                </div>
                <!-- <p class="forget">忘记密码?
                    <a href="#">  点击这里 </a>
                </p> -->
                <p class="forget">
                    <span class="float-left">已有账户？ <router-link :to="{name:'login'}">登录</router-link></span>
                    <span class="float-right">
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
    <!-- 注册成功 - 开始 -->
    <div id="fill-signup-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="fill-primary-modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content modal-filled bg-primary">
                <div class="modal-header">
                    <h4 class="modal-title" id="fill-primary-modalLabel">注册成功！</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <p>请妥善保管好您的账户，登录后可在个人资料中<span style="color:var(--pink)">自定义登录帐号</span>。</p>
                    <br>
                    <div>
                        <p>登录帐号：{{result.email}}</p>
                        <p>登录密码：{{result.password}}</p>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-success" data-dismiss="modal">
                        <router-link :to="{name: 'login'}" class="text-white">前往登录</router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- 注册成功 - 结束 -->
    </teleport>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import iLink from '@/components/tool/Link'
import { POST } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'

export default {
    components: { iLink },
    setup() {

        const state = reactive({
            user : {mode:"register"}, // 用户数据
            login_is_load: false,     // 注册动画
            code_title: '获取',       // 验证码标题
            result: [],               // 注册结果
        })

        const methods = {
            // 提交
            save(){
                if (methods.check()) {

                    // 开启注册动画
                    state.login_is_load = true

                    state.user.password = state.user.password1

                    POST('users', state.user).then((res) => {
                        if (res.data.code == 200) {
                            state.result = res.data.data
                            $.NotificationApp.send("提示！", "注册成功！"  , "top-right", "rgba(0,0,0,0.2)", "info");
                            // 显示注册结果
                            $("#fill-signup-modal").modal('show');
                        } else {
                            const code = document.querySelector("#code")
                            code.classList.add('btn-danger')
                            code.classList.remove('btn-dark')
                            code.classList.remove('btn-primary')
                            $.NotificationApp.send("提示！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning");
                        }
                        // 关闭注册动画
                        state.login_is_load = false
                    })
                }
            },
            // 校验
            check(){

                let result = false
                
                if (inisHelper.is.empty(state.user.nickname)) {
                    $.NotificationApp.send("提示！", "必须填写昵称！", "top-right", "rgba(0,0,0,0.2)", "warning");
                } else if (inisHelper.is.empty(state.user.password1)) {
                    $.NotificationApp.send("提示！", "请填写密码！"    , "top-right", "rgba(0,0,0,0.2)", "warning");
                } else if (inisHelper.is.empty(state.user.password2)) {
                    $.NotificationApp.send("提示！", "请再次填写密码！", "top-right", "rgba(0,0,0,0.2)", "warning");
                } else if (state.user.password1 != state.user.password2) {
                    $.NotificationApp.send("提示！", "两次密码不一致！", "top-right", "rgba(0,0,0,0.2)", "warning");
                } else if (inisHelper.is.empty(state.user.email)) {
                    $.NotificationApp.send("提示！", "邮箱不得为空！"  , "top-right", "rgba(0,0,0,0.2)", "warning");
                } else if (!inisHelper.is.email(state.user.email)) {
                    $.NotificationApp.send("提示！", "邮箱格式不正确！", "top-right", "rgba(0,0,0,0.2)", "warning");
                } else if (inisHelper.is.empty(state.user.code)) {
                    $.NotificationApp.send("提示！", "请填写验证码！"  , "top-right", "rgba(0,0,0,0.2)", "warning");
                } else result = true
                
                return result
            },
            // 验证码
            code(){
                
                if (inisHelper.is.empty(state.user.email)) {
                    $.NotificationApp.send("提示！", "请先填写邮箱！"  , "top-right", "rgba(0,0,0,0.2)", "warning");
                } else if (!inisHelper.is.email(state.user.email)) {
                    $.NotificationApp.send("提示！", "邮箱格式不正确！", "top-right", "rgba(0,0,0,0.2)", "warning");
                } else {
                    
                    let time   = 60;
                    const code = document.querySelector("#code");
                    
                    let timeStop = setInterval(()=>{
                    
                        time--;
                        
                        if (time > 0) {
                            state.code_title = '获取 ' + time + 's';
                            code.disabled = true
                        } else {
                            // 当减到0时赋值为60
                            timeo = 60;
                            state.code_title = '获取';
                            // 清除定时器
                            clearInterval(timeStop);
                            code.disabled = false
                        }
                        
                    },1000)

                    let params = {
                        mode: "create",
                        email: state.user.email
                    }
                    
                    POST('verify-code', params).then(res=>{
                        if (res.data.code == 200) {
                            $.NotificationApp.send("提示！", res.data.msg  , "top-right", "rgba(0,0,0,0.2)", "info");
                        } else if (res.data.code == 412) {
                            clearInterval(timeStop);
                            code.disabled = false
                            $.NotificationApp.send("提示！", "此邮箱已注册本站帐号，<a href='reset.html' style='color:red'>点击此处可找回密码</a>" , "top-right", "rgba(0,0,0,0.2)", "info");
                        } else {
                            clearInterval(timeStop);
                            code.disabled = false
                            $.NotificationApp.send("提示！", res.data.msg  , "top-right", "rgba(0,0,0,0.2)", "warning");
                        }
                    })
                }
                
            },
            // 重置密码
            reset(){
                // ... 下个版本再写
            }
        }

        watch(()=>state.user.code,(newValue)=>{

            const code = document.querySelector("#code")
            
            if (!inisHelper.is.empty(newValue)) {
                code.classList.add('btn-primary')
                code.classList.remove('btn-dark')
            } else {
                code.classList.add('btn-dark')
                code.classList.remove('btn-primary')
            }
        })

        return { ...toRefs(state), methods }
    }
}
</script>

<style scoped>
@import url('~@/assets/css/root.css');
@import url('~@/assets/css/app.min.css');
@import url('~@/assets/css/inis.auth.css');
</style>