<template>
  <div @click="hide">
    <div class="mask fixed l0 t0 r0 b0 rgba5" v-if="showTag">

    </div>
    <div class="main" v-if="showTag">
      <img class="fixed l0" :src="url" alt="" :style="style" @transitionend="transitionend">
    </div>
  </div>
</template>

<script>
  import {readImg} from "../../lib/utils";

  /**
   * 图片放大旋转组件
   * methods
   * **** show(url)
   */
  export default {
    name: "pic-fullscrenn-scan",
    data() {
      return {
        url: "",
        style: {},
        showTag: false,
      }
    },
    methods: {
      async show(url) {
        this.status = 'show';
        this.showTag = true;
        this.url = url;
        const img = await readImg(url);
        let mh = img.height, mw = img.width,
          wh = Math.min(window.innerHeight, screen.availHeight), ww = Math.min(window.innerWidth, screen.availWidth),
          mw2 = ww, mh2 = ww / mw * mh,
          hScale = wh / mw2, wScale = ww / mh2,
          scale = Math.min(hScale, wScale) * 0.8;
        this.style = {
          marginTop: `-${mh}px`,
          transform: `rotate(90deg) scale(${scale},${scale})`
        }
      },
      hide() {
        this.status = 'hide';
        this.$set(this.style, 'transform', "");
      },
      transitionend() {
        if (this.status == 'hide') {
          this.style = {};
          this.showTag = false;
        }
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
    top: 50%;
    transition: all 0.5s;
  }
</style>
