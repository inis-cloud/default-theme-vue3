<template>
  <svg :class="svgClass + ' ' + fileName" aria-hidden="true" :width="width" :height="height" :fill="fill">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    fileName : { type: String, required: true },
    iClass   : { type: String, default: '' },
    width    : { type: String, default: '1em' },
    height   : { type: String, default: '1em' },
    fill     : { type: String, default: '#FFFFFF' },
  },
  computed: {
    iconName() {
      return `#icon-${this.fileName}`
    },
    svgClass() {
      return 'svg-icon' + (this.iClass ? '-' + this.iClass : '')
    }
  }
}
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
