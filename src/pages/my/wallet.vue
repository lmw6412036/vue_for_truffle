<template>
  <div class="page flex column">
    <v-header class="flex0">钱包管理</v-header>
    <scroll class="flex1 overflow-hidden" :data="[1,2]">
      <ul>
        <li class="flex bg_fff pt20 pb20 pl30 pr30 aic" v-for="o,i in 10" :class="[{bt:i>0}]">
          <div class="ava flex0 iconfont fs30 bg_main color_fff flex aic jcc radius50">&#xe67b;</div>
          <div class="info ml20 lh12">
            <h3 class="color_333">钱包名称</h3>
            <div class="mt10 color_666">0x99393488</div>
            <p class="mt10 color_999">0.011 ether</p>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll";

  export default {
    name: "wallet",
    components: {Scroll}
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  .ava {
    @include w_h(100px);
  }

</style>
