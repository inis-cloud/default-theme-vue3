<template>
  <svg :class="svgClass + ' ' + fileName" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    fileName : { type: String, required: true },
    iClass   : { type: String, default: '' },
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
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: white;
  overflow: hidden;
}
</style>