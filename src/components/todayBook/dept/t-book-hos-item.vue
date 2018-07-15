<template>
  <div @click="click(info)" class="hos flex bg_fff pt25 pb25 pl30 pr30 aic">
    <div class="thumb flex0 overflow-hidden radius20">
    <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1003241200,936520023&fm=58&bpow=915&bpoh=680" alt="">
  </div>
    <div class="info flex1 ml20 overflow-hidden">
      <!--<h3 class="fs16 color_333 lh12">{{info.yymc}}</h3>-->
      <h3 class="fs16 color_333 lh12">特扬模拟医院</h3>
      <div class="fs14 color_999 lh12 mt10">{{info.yydj|filter_book_yydj}}</div>
      <p class="fs14 color_999 lh12 mt10 ellipsis">{{info.yydz}}</p>
    </div>
    <div class="icon flex0" >
      <font class="color_666">&#xe7d5;</font>
    </div>
  </div>
</template>

<script>
  import {filter_book_yydj} from "../../../filters/book";

  export default {
    name: "t-book-hos-item",
    props:{
      info:{
        type:Object,
      }
    },
    filters:{filter_book_yydj},
    methods:{
      click(info){
        this.$emit('toDept',info)
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/public";

  .thumb {
    @include w_h(180px, 140px);
    img {
      width: 100%;
    }
  }

</style>
