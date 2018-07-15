<template>
  <div class="page flex column">
    <v-header>资产</v-header>
    <div class="main flex1">
      <div class="info pt30 bg_fff pb30">
        <v-ava>
          <img src="http://www.qqzhi.com/uploadpic/2014-10-08/165911868.jpg" slot="error" alt="">
        </v-ava>
        <p class="center color_999 fs16 pt25">
          0X101020300394844 <font>&#xe600;</font>
        </p>
      </div>

      <ul class="bg_fff bt">
        <li class="flex pt25 pb25 pl30 pr30 aic bb">
          <div class="icon eth flex0 iconfont bg_main radius50 color_fff flex aic jcc fs30">&#xe67b;</div>
          <p class="fs20 flex1 color_333 ml20">ETH</p>
          <div class="text flex0 lh12 color_999 fs16 center">
            <p>1</p>
            <p>≈ ￥10000</p>
          </div>
        </li>
      </ul>


    </div>
    <v-footer class="flex0"></v-footer>
  </div>
</template>

<script>
  import VFooter from "../../components/common/v-footer";
  import VAva from "../../components/common/v-ava";

  export default {
    name: "index",
    components: {VAva, VFooter}
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  .ava, .ava img {
    @include w_h(180px);
  }

  .ava {
    margin: 0 auto;
  }

  .eth {
    @include w_h(120px);
  }
</style>
