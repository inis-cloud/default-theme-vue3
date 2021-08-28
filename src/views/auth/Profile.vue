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
    <div id="profile" class="content-page">

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
                <div class="col-lg-12">
                    <div class="card bg-white">
                        <div class="card-body profile-user-box">
        
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="media">
                                        <span class="float-left m-2 mr-4">
                                            <input v-show="false" type="file" accept="image/*" />
                                            <img :src="user.head_img || null" class="rounded-circle img-thumbnail" width="100" height="100">
                                        </span>
                                        <div class="media-body">
        
                                            <h4 class="mt-1 mb-1 text-muted">{{user.nickname || '昵称'}}</h4>
                                            <p class="font-13 text-muted">{{user.description || '描述'}}</p>
        
                                            <ul class="mb-0 list-inline text-light">
                                                <li class="list-inline-item mr-3">
                                                    <h5 class="mb-1 text-muted">5482</h5>
                                                    <p class="mb-0 font-13 text-muted">我的文章</p>
                                                </li>
                                                <li class="list-inline-item mr-3">
                                                    <h5 class="mb-1 text-muted">25,184</h5>
                                                    <p class="mb-0 font-13 text-muted">我的评论</p>
                                                </li>
                                                <li class="list-inline-item mr-3">
                                                    <h5 class="mb-1 text-muted">25,184</h5>
                                                    <p class="mb-0 font-13 text-muted">我的访客</p>
                                                </li>
                                                <li class="list-inline-item mr-3">
                                                    <h5 class="mb-1 text-muted">2184</h5>
                                                    <p class="mb-0 font-13 text-muted">我的访客</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mt-sm-0 mt-3 save">
                                        <button v-on:click="save()" type="button" class="btn btn-light">保存配置</button>
                                    </div>
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-3">个人信息</h4>
                            <div class="tab-content mb-0 b-0">
                                <div class="tab-pane fade active show">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">昵称</label>
                                                <div class="col-md-9">
                                                    <input v-model="user.nickname" name="nickname" type="text" class="form-control custom-input" placeholder="您的称呼">
                                                </div>
                                            </div>
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">性别</label>
                                                <div class="col-md-9 sex">
                                                    <select2 v-model="sex.value" :options="sex.data" :settings="sex.opt"></select2>
                                                </div>
                                            </div>
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">描述</label>
                                                <div class="col-md-9">
                                                    <input v-model="user.description" type="text" class="form-control custom-input" placeholder>
                                                </div>
                                            </div>
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">头像地址</label>
                                                <div class="col-md-9">
                                                    <div class="input-group">
                                                        <input v-model="user.head_img" type="text" class="form-control custom-input" placeholder>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">主页地址</label>
                                                <div class="col-md-9">
                                                    <input v-model="user.address_url" type="text" class="form-control custom-input" placeholder>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-3">帐号安全</h4>
                            <div class="tab-content mb-0 b-0">
                                <div class="tab-pane fade active show">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">登录帐号</label>
                                                <div class="col-md-9">
                                                    <input v-model="user.account" name="username" onkeyup="this.value=this.value.replace(/\s+/g,'')" type="text" class="form-control custom-input" placeholder="帐号">
                                                </div>
                                            </div>
                                            <div v-if="!modify_email" class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">邮箱地址</label>
                                                <div class="col-md-9">
                                                    <input v-model="user.email" onkeyup="this.value=this.value.replace(/\s+/g,'')" type="email" class="form-control custom-input" placeholder="用于找回密码或邮箱登录">
                                                </div>
                                            </div>
                                            <div v-if="modify_email" class="form-group row mb-3">
                                                <div class="col-md-6">
                                                    <label>邮箱地址</label>
                                                    <input v-model="user.email" onkeyup="this.value=this.value.replace(/\s+/g,'')" type="email" class="form-control custom-input" placeholder="用于找回密码或邮箱登录">
                                                </div>
                                                <div class="col-md-6">
                                                    <label>验证码</label>
                                                    <input v-model="user.code" type="text" class="form-control custom-input" placeholder="请填写验证码">
                                                </div>
                                            </div>
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">手机号码</label>
                                                <div class="col-md-9">
                                                    <input v-model="user.phone" maxlength="11" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" type="text" class="form-control custom-input" placeholder="用于找回密码或手机登录">
                                                </div>
                                            </div>
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">修改密码</label>
                                                <div class="col-md-9">
                                                    <input v-model="password1" name="password" type="password" class="form-control custom-input" placeholder="请输入新密码" onkeyup="this.value=this.value.replace(/\s+/g,'')">
                                                </div>
                                            </div>
                                            <div class="form-group row mb-3">
                                                <label class="col-md-3 col-form-label">确认密码</label>
                                                <div class="col-md-9">
                                                    <input v-model="password2" type="password" class="form-control custom-input" placeholder="请再次输入新密码" onkeyup="this.value=this.value.replace(/\s+/g,'')">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <i-footer></i-footer>
    </div>
</template>

<script>
import { useStore, mapState } from 'vuex'
import iFooter from '@/components/public/footer'
import { POST } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'
import { onMounted, reactive, toRefs, watch } from 'vue'
import select2 from 'vue3-select2-component';

export default {
    components: { iFooter, select2 },
    setup(){

        const store = useStore()
        const state = reactive({})

        const methods = {
            // 初始化
            initData(){

            },
            initState(){
                state.user = store.state.login.user
                state.password1 = null
                state.password2 = null
                state.sex = {
                    data: [{"id":0,"text":"女"},{"id":1,"text":"男"},{"id":3,"text":"保密"}],
                    opt: {
                        minimumResultsForSearch: Infinity,
                    },
                    value: null,
                }
                state.modify_email = false
            }
        }

        methods.initState()

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
        },
        // 校验数据
        check(){
            let result = true
            if (!inisHelper.is.empty(this.password1) || !inisHelper.is.empty(this.password1)) {
                result = false
                delete this.user.password
                if (inisHelper.is.empty(this.password1)) {
                    $.NotificationApp.send("错误！", "密码不能为空！", "top-right", "rgba(0,0,0,0.2)", "warning")
                } else if (inisHelper.is.empty(this.password2)) {
                    $.NotificationApp.send("错误！", "请再次输入密码！", "top-right", "rgba(0,0,0,0.2)", "warning")
                } else if (this.password1 != this.password2) {
                    $.NotificationApp.send("错误！", "两次密码不一致！", "top-right", "rgba(0,0,0,0.2)", "warning")
                } else {
                    result = true
                    this.user.password = this.password1
                }
            }
            return result
        },
        // 提交保存
        save(){

            let check = this.check()

            let user = this.user
            let sex  = this.sex.data

            delete user.opt
            delete user.level
            delete user.status

            // 获取性别
            sex.forEach(item=>{
                if (this.sex.value == item.id) user.sex = item.text
            })

            user['login-token'] = this.$store.state.login['login-token']

            if (check) POST('users', user).then(res=>{
                if (res.data.code == 200) {
                    this.modify_email = false
                    $.NotificationApp.send("提示！", "保存成功，修改结果将会在重新登录后生效！", "top-right", "rgba(0,0,0,0.2)", "info")
                } else if (res.data.code == 201) {
                    this.modify_email = true
                    $.NotificationApp.send("提示！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "info")
                } else {
                    $.NotificationApp.send("错误！", res.data.msg, "top-right", "rgba(0,0,0,0.2)", "warning")
                }
            })
        }
    },
    computed: {
        // 处理性别格式
        sex(){
            let sex = this.sex.data
            sex.forEach(item=>{
                if (this.user.sex == item.text) this.sex.value = item.id
            })
            return this.sex
        },
        // 格式化用户数据
        user(){
            let user     = this.user
            user.email   = user.email.replace(/ /g,'')
            user.phone   = user.phone.replace(/ /g,'')
            user.account = user.account.replace(/ /g,'')
            return user
        }
    },
}
</script>