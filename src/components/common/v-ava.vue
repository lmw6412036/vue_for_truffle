<template>
  <div class="ava flex flex0 overflow-hidden radius50" :style="style">
    <slot v-if="showError" name="error"></slot>
  </div>
</template>

<script>
  import {readImg} from "../../lib/utils";

  /**
   * 圆形缩略图组件
   * props
   * **** url
   */
  export default {
    name: "v-ava",
    components: {},
    props: {
      url: String
    },
    data() {
      return {
        showError: false,
        style: {}
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      src() {
        this.init();
      }
    },
    methods: {
      async init() {
        if (!this.url) {
          this.showError = true;
        } else {
          try {
            let img = await readImg(this.url);
            this.style = {
              backgroundImage: `url(${img.src})`
            }
          }
          catch (e) {
            Log('error', e);
            this.showError = true;
          }
        }
      }
    },
  }
</script>

<style scoped>
  .ava {
    background-size: cover;
    background-position-x: center;

  }
</style>
