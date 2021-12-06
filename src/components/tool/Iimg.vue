<template>
  <img :src="url">
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { mapState, useStore } from 'vuex'
export default {
  props: {
    src : { type: String, required: true},
  },
  setup(){
    const store = useStore()
    const state = reactive({
      // 先加载load.gif
      url: store.state.theme_config.other.images.preview_url,
    })
    return{ ...toRefs(state) }
  },
  mounted() {

    let image = new Image()
    image.src = this.src

    // 图片加载错误时的替换图片
    image.onerror = () => {
      image.src = this.theme_config.other.images.img_err_url
    }
    // 图片加载成功后把地址给原来的img
    image.onload = () => {
      this.url = image.src
    }
  },
  computed:{
    ...mapState(['theme_config']),
  }
}
</script>
