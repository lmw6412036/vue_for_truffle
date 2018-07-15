<template>
  <div>
    <div class="bg_fff pt30 pb35 pl30 pr30">
      <h3 class="lh12 pb30 flex bb-dashed">
        <font class="fs15 bc_green radius6 pl26 pr26">眼科</font>
        <font class="fs15 ml30 bc_green radius6 pl26 pr26">视网膜中央</font>
      </h3>
      <p class="color_999 sc mt20" @click="jumpToDetails">吾问无为谓无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无吾问无为谓无无无无无无无无无无无无无无无无无无吾问无为谓无无无无无无无无无无无无无无无吾问无为谓无无无无无无无无无无无无无</p>
      <div class="flex color_999 fs13 lh12 mt30">
        <font class="fs23 color_main mr10">&#xe745;</font>
        <span class="flex1">李时珍</span>
        <font class="fs23">&#xe661;</font>
        <span class=" ml16">2000</span>
        <font class="fs23 ml30 active">&#xe60a;</font>
        <span class=" ml16">2000</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'consult-selection-item',
  methods: {
    jumpToDetails () {
      this.$router.push('/consult/details')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/public";
  .sc {
    @include lines(2);
  }
  .bb-dashed {
    border-bottom: 1px dashed #dddddd;
  }
  .active {
    color: #ff8686;
  }
</style>