<template>
  <div class="item flex aic bg_fff pl30 pr30 pt25 pb25" @click="handler">
    <v-ava class="ava flex0" :url="info.ystp">
      <img src="../../assets/img/doctorM.png" slot="error" alt="">
    </v-ava>

    <div class="main ml20 flex1 overflow-hidden">
      <h3 class="flex aic">
        <span class="color_333 fs16 lh12">{{info.ysxm}}</span>
        <slot name="p1"></slot>
      </h3>
      <slot name="p2" :scheme="scheme"></slot>
    </div>

    <slot name="right" :scheme="scheme"></slot>
  </div>
</template>

<script>
  import VAva from "../common/v-ava";

  /**
   *
   * events
   * **** click(info,scheme)
   * slot
   * **** p1 姓名右侧
   * **** p2 姓名下方 props scheme
   * **** right 右侧箭头 props scheme
   */
  export default {
    name: "book-doc-item",
    components: {VAva},
    props: {
      info: Object
    },
    computed: {
      scheme() {
        return this.info.deptSchemeList[0].schemeList[0]
      }
    },

    methods: {
      handler() {
        this.$emit('click', this.scheme);
        this.$emit('showSheet', this.scheme);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  .ava {
    @include w_h(120px);
    img{
      width: 120px;
    }
  }
</style>
