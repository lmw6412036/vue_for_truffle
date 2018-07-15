<template>
  <div class="v-header relative fs18 bg_main bb center color_fff">
    <slot name="back">
      <font class="back absolute center icon-htmal5icon37" @click="$router.back()"></font>
    </slot>
    <slot name="right"></slot>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "v-header"
  }
</script>

<style lang="scss" scoped>
  @import "../../style/public";

  $h: 45px;

  .v-header {
    @include h_lh($h);
    .back {
      width: $h;
    }
  }

  .back {
    @include t_r_b_l(0, 1, 0, 0);
  }

  .right {
    @include t_r_b_l(0, 0, 0, 1);
  }


</style>
