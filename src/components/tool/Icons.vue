<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | SVG 图标组件                                                           -->
<!-- +---------------------------------------------------------------------- -->

<template>

</template>

<script>
import { h } from 'vue'

export default {
  name: 'i-icons',
  setup (props) {
    return () => h('img', { src: '/assets/icons/svg/' + props.name + '.svg', class: 'list-icons' })
  },
  props: {
    name: { type: String, required: true }
  }
}
</script>
