<template>
  <div>
    <div class="doc-item flex bg_fff pl30 pr15 pt30 pb30" v-show="info.ksid" v-for="(o,i) in schemeList" :key="i" @click="showSheet(o)">
      <div class="ava radius50 overflow-hidden flex0" >
        <img v-if="info.ysid" src="../../../assets/img/doctorM.png" alt="">
        <img v-else src="../../../assets/img/online/eye-icon.png" alt="">
      </div>
      <div class="det flex row flex1">
        <div class="info ml30 overflow-hidden">
          <h3 class="lin fs17 color_333">{{info.ysxm||'普通号'}}
            <span class="color_666 fs16 ml10 flex1 ellipsis">{{info.yszc}}</span>
          </h3>
          <div class="lin flex mt15 ksmc">
            <template v-if="info.ysid && mode=='list'">
              <span class="leng color_666 fs14 ellipsis">擅长：{{info.ysjs}}</span>
            </template>

            <template v-if ="!info.ysid">
              <span class="color_666 fs14">{{info.ksmc}}</span>
            </template>
          </div>

          <div class="lin fs14 color_666 flex row pt15">
            <p>{{info.yymc||$route.query.hosname}}</p>
          </div>

          <div class="lin fs14 mt15">
            {{o.schdate|filter_striping_date}} <span class="color_main">{{o.ampm|ampm}}</span> 专家
          </div>

        </div>

        <div class="box2 flex0 flex column center ml10">
          <p class="icon  order color_main fs15 flex0 pb30 center">预约</p>
          <p class="fees fs15 yellow pb10">{{o.regfee|filter_fee_regfee}}元</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {ampm} from 'ty-vue-filters'
  import {filter_striping_date,filter_fee_regfee} from "../../../filters/book";

  /**
   * props
   * **** info
   * **** mode {String} ['list','detail']
   * events
   * **** click(info)
   */
  export default {
    name: "time-doc-item",
    props: {
      info: Object,
      mode: {
        type: String,
        default: 'list'
      }
    },
    computed:{
      schemeList(){
        if(this.info && this.info.deptSchemeList){
          let schemeList= this.info.deptSchemeList[0].schemeList;
          return schemeList;
        }
      }
    },
    filters:{
      ampm,filter_striping_date,filter_fee_regfee
    },
    methods:{
      showSheet(o){
        this.$emit('showSheet',o);
      }
    },
    created(){
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../style/public";

  .ava, img {
    @include w_h(120px);
  }

  .info {
    * {
      line-height: 1.1;
    }
  }

  .ksmc {
    align-items: center;
  }

  .icon{
    width: 105px;
    padding-top: 3%;
  }

  .box2,.order{
    width: 65*2px;
  }
  .fees{
    min-width:105px;
  }
  .lin, .det{
    justify-content: space-between;
  }

  .leng{
    width: 215*2px;
  }
</style>
