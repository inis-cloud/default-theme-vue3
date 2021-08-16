<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 导入外部链接组件                                                        -->
<!-- +---------------------------------------------------------------------- -->

<template>

</template>

<script>
import { h } from 'vue'

export default {
  setup (props) {
    let result = () => {}
    if (props.tag == 'link') result = () => h(props.tag, {rel: 'stylesheet', href: props.src })
    else result = () => h(props.tag, { src: props.src })
    return result
  },
  props: {
    src: { type: String, required: true },
    tag: { type: String, default: 'link' }
  }
}
</script>
