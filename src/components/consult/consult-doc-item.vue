<template>
  <div class="flex bg_fff pt40 pb25 pl30 pr30" @click="jumpToDetails">
    <v-ava class="ava flex0">
      <img src="../../assets/img/doctorM.png" alt="" slot="error">
    </v-ava>
    <div class="info ml20 flex1 overflow-hidden">
      <h3 class="lh12 flex">
        <span class="fs17 color_333">医生姓名</span>
        <font class="fs12 ml20 bc_green radius6 pl18 pr18">团队成员</font>
        <font class="fs12 ml20 bc_orange radius6 pl18 pr18">8.9分</font>
      </h3>
      <div class="lh12 color_888 fs13 mt15">
        XX科 主任医生
      </div>
      <div class="lh12 color_888 fs13 mt15">
        XX医院
      </div>
      <p class="sc lh12 fs13 color_888 mt15">
        擅长:擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅擅长擅长擅长擅长擅擅长擅长擅长擅长擅擅长擅长擅长擅长擅长
      </p>
      <ul class="flex mt20">
        <li class="flex0 flex aic mr30">
          <font class="fs23 color_main">&#xe745;</font>
          <span class="fs15 color_666 ml16">图文</span>
        </li>
        <li class="flex0 flex aic mr30">
          <font class="fs23 color_main">&#xe62a;</font>
          <span class="fs15 color_666 ml16">视频</span>
        </li>
        <li class="flex0 flex aic mr30">
          <font class="fs23 color_main">&#xe746;</font>
          <span class="fs15 color_666 ml16">电话</span>
        </li>
        <li class="flex0 flex aic mr30">
          <font class="fs23 color_main">&#xe8b4;</font>
          <span class="fs15 color_666 ml16">团队</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import VAva from "../common/v-ava";

  export default {
    name: "consult-doc-item",
    components: {VAva},
    methods: {
      jumpToDetails () {
        this.$router.push('/consult/doct/home') 
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";
  .ava, .ava img {
    @include w_h(130px);
  }
  .sc {
    @include lines(1);
  }

  ul{
    flex-wrap: wrap;
  }
</style>
