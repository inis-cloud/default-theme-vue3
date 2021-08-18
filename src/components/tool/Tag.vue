<!-- +---------------------------------------------------------------------- -->
<!-- | INIS [ WE CAN DO IT JUST THINK ]                                      -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Copyright (c) 2020~2021 http://inis.cc All rights reserved.           -->
<!-- +---------------------------------------------------------------------- -->
<!-- | Author: racns <email: racns@qq.com> <url: https://inis.cn>            -->
<!-- +---------------------------------------------------------------------- -->
<!-- | 导入外部链接组件                                                        -->
<!-- +---------------------------------------------------------------------- -->

<script>
import { h } from 'vue'

export default {
  setup (props) {
    let result = () => {}
    if (props.tag == 'style') result = () => h(props.tag, {type: 'text/css'})
    else result = () => h(props.tag)
    return result
  },
  props: {
    tag: { type: String, default: 'style' }
  }
}
</script>
