<template>
  <div class="flex pl30 pr30 pt25 pb25 fs15 color_666">
    <div class="flex0 pr20">{{i+1}}</div>
    <div class="flex1">
      <div class="flex space-between">
        <p>谷丙转氮酶谷丙转氮酶谷丙转氮酶</p>
        <span class="vred" v-if="i=='0'">12.33
          <font>&#xe729;</font>
        </span>
        <span class="vred" v-else-if="i=='1'">9.33
          <font>&#xe72a;</font>
        </span>
        <span v-else>10.33</span>
      </div>
      <div class="flex space-between">[10^9/L] <span>参考值：10.01-11.36</span></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "check-item-list",
      props:{
          i:{
            type:String,
          }
      },
      filters:{
        row(str){

        }
      },
    }
</script>

<style scoped lang="scss">
  @import "../../../style/public";

  .vred{
    color: #f15a4a;
  }

  p{
    width:170*2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }

</style>
