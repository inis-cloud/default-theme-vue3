<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 公共页脚组件                                                           -->
<!-- +---------------------------------------------------------------------- -->

<template>
    <footer class="footer">
        <div class="row">
            <div class="col-md-6 font-12px">
                <span class="item left bg-dark">© {{ year }} Copyright</span>
                <span class="item right bg-primary"><a href="https://beian.miit.gov.cn" target="_blank">{{site_info.copy || '备案码'}}</a></span>
                <span v-html="theme_config.footer.left"></span>
            </div>
            <div class="col-md-6">
                <div class="text-md-right footer-links d-none d-md-block">
                    <span v-html="theme_config.footer.right"></span>
                    <span class="item left bg-dark"><a href="//racns.com/inis.html" target="_blank">Theme</a></span>
                    <span class="item right bg-warning"><a href="//inis.cc" target="_blank">inis</a></span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
    setup(){

    },
    computed: {
        year:()=>{
            return (new Date).getFullYear()
        },
        ...mapState(['site_info', 'theme_config'])
    }
}
</script>
