<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 根组件                                                                 -->
<!-- +---------------------------------------------------------------------- -->

<template>
  <router-view></router-view>
</template>

<script>
export default {
  setup(){
    // console.log("This is the inis blog system.\nOur official website is https://racns.com")
    console.log("%cinis默认主题%cversion - " + INIS.version,
      "color:white;background:#313a46;padding:3px 7px;border-top-left-radius: 3px;border-bottom-left-radius: 3px;",
      "color:white;background:#727cf5;padding:3px 7px;border-top-right-radius: 3px;border-bottom-right-radius: 3px;"
    )
  }
}
</script>