<template>
  <div class="bg_fff pt30 pb35 pl30 pr30">
    <h3 class="lh12 flex">
      <span class="fs18 color_333">医生团队姓名</span>
      <font class="fs12 ml30 bc_orange radius6 pl18 pr18">9.5分</font>
    </h3>
    <div class="flex lh12 mt25 fs13">
      <span class="color_333 flex0">医院：</span>
      <span class="color_888 flex1 ml15">xxx医院</span>
    </div>
    <div class="flex lh12 mt15 fs13">
      <span class="color_333 flex0">科室：</span>
      <span class="color_888 flex1 ml15">xxx科室</span>
    </div>
    <div class="flex lh12 mt15 fs13">
      <span class="color_333 flex0">擅长：</span>
      <span class="color_888 flex1 ml15 sc lh16">擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长</span>
    </div>
    <div class="weui-flex mt40">
      <div class="weui-flex__item center">
        <v-ava class="ava flex0">
          <img src="../../assets/img/doctorM.png" class="w_h120" alt="" slot="error">
        </v-ava>
        <div class="mt25">weui</div>
      </div>
      <div class="weui-flex__item center">
        <v-ava class="ava flex0">
          <img src="../../assets/img/doctorM.png" class="w_h120" alt="" slot="error">
        </v-ava>
        <div class="mt25">weui</div>
      </div>
      <div class="weui-flex__item center">
        <v-ava class="ava flex0">
          <img src="../../assets/img/doctorM.png" class="w_h120" alt="" slot="error">
        </v-ava>
        <div class="mt25">weui</div>
      </div>
      <div class="weui-flex__item center">
        <v-ava class="ava flex0">
          <img src="../../assets/img/doctorM.png" class="w_h120" alt="" slot="error">
        </v-ava>
        <div class="mt25">weui</div>
      </div>
    </div>
  </div>
</template>

<script>
import VAva from '../common/v-ava';
export default {
  name: 'consult-doc-item',
  components: {VAva}
}
</script>

<style lang="scss" scoped>
  @import "../../style/public";
  .sc {
    @include lines(2);
  }
  .w_h120 {
    @include w_h(120px, 120px)
  }
  .ava {
    justify-content: center;
  }
</style>