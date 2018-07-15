<template>
  <div id="loadingToast" v-if="showTag">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">{{text}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-loading",
    props: {
      text: {
        type: String,
        default: '加载中...'
      },
      showTag: {
        type: Boolean,
        default: false
      }
    }

  }
</script>

<style scoped>

</style>
