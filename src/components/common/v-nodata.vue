<template>
  <div class="center pt100" v-if="!loading && show">
    <font class="fs100 color_999">&#xe642;</font><br>
    <p class="color_666 fs16">{{text}}</p>
  </div>
</template>

<script>
  /**
   * 暂无数据显示组件
   * props
   * **** show
   * **** text
   */
  export default {
    name: "v-nodata",
    props: {
      text: {
        type: String,
        default: '暂无数据'
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
