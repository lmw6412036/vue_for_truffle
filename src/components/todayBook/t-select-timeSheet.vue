<template>
<div>
  <transition name="fade">
    <div v-if="showTag" @click.stop="hide" class="mask fixed rgba5 t0 r0 b0 l0"></div>
  </transition>

  <transition name="fade">
    <div v-if="showTag" class="main fixed bg_fff l0 r0 b0 overflow-y-auto overflow-x-hidden">
      <div class="flex fs20 color_000 mt50 ml30">
        <p class="mr20">{{dateObj.date|filter_striping_date}}</p>
        <p class="mr20">{{dateObj.weekNum}}</p>
        <p>{{dateObj.ampm|ampm}}</p>
      </div>
    <p class="fs15 color_333 pl30 pt10">号源时段以医院实际情况为准</p>

    <div class="Box">
      <ul class="timeUl mt50 relative pl30 pr10" v-for="item in apiArr">
        <li class="timeLi mr20 mb20 bg2 center fs16 color_333 radius16" @click="handler(item)"><span class="pr20">{{item.numno}}号</span>{{item.numtime}}</li>
      </ul>
    </div>
    </div>
  </transition>

</div>
</template>

<script>
  /*
  * props
  *
  * events
  * time-change
  *
  * methods
  * show()
  *
  * */
  import {orderTimeCache,bookDeptCache} from "../../lib/cache";
  import {ampm} from 'ty-vue-filters'
  import {filter_striping_date} from "../../filters/book";

  export default {
      name: "t-select-timeSheet",
      props:{
        apiArr:{
          type:Array,
        },
        dateObj:{
          type:Object,
        }

      },
      data(){
          return {
            showTag:false,
          }
      },
      filters:{
        ampm, filter_striping_date
      },
      created(){

      },
      methods:{
        show(){
          this.showTag=true;
        },
        hide(){
            this.showTag=false;
        },

        async saveTime(item){
          let arr =this.$cache.get('orderTime');
          item.ampm= arr.ampm;
          await this.$cache.set('orderTime',item);
        },

        handler(item){
          this.saveTime(item);
          this.$router.push({
            path:`/tbook/check`,
            query:{
              numtime:item.numtime,
              hosid:this.$route.query.hosid,
              hosname: this.$route.query.hosname,
            },
          })
        },

      }
  }
</script>

<style scoped lang="scss">
 @import "../../style/public";

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    transform: translateY(100%);
  }
  .mask{
    z-index: 10000;
  }
  .main{
    z-index: 11000;
    top: 40vh;
  }
  .Box{
    width: 376*2px;
    overflow: scroll;
  }
  .timeUl{
    width: 376*2px;
  }
  .timeLi{
    width: 167*2px;
    height: 45*2px;
    line-height: 45*2px;
    border: 1px solid $mainColor;
    float: left;
    display: block;
  }

</style>
