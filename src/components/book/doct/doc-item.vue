<template>
  <div class="doc-item flex bg_fff pl30 pr30 pt30 pb30" v-show="info.ksid"  @click="handler">
    <div class="ava radius50 overflow-hidden flex0">
      <img v-if="info.ysid" src="../../../assets/img/doctorM.png" alt="">
      <img v-else src="../../../assets/img/online/eye-icon.png" alt="">
    </div>

    <div class="info ml30 flex1 overflow-hidden">
      <h3 class="lin fs17 color_333">{{info.ysxm||'普通号'}}
        <span class="color_666 fs16 ml10 flex1 ellipsis">{{info.yszc}}</span>
      </h3>
      <div class="lin flex ksmc">
        <template v-if="info.ysid">
          <div class="flex1 flex">
            <p class="color_666 fs14 flex0">{{info.ksmc}}</p>
            <span class="lin fs14 color_666 ml15">{{info.yymc||$route.query.hosname}}</span>
          </div>

          <span class="lin fs14 color_main ml15 flex0 mb5" v-if="mode!=='list'">在线问诊<font class="fs13">&#xe7d7;</font></span>
        </template>
        <template v-else>
          <span class="color_666 fs14 flex1">{{info.ksmc}}</span>
        </template>

        <span v-if="(mode=='list' && info.ysid!==0 && info.yszt==0) ||(mode=='list' && info.ysid==0 &&info.schemeList.length>0)"
              class="icon color_main fs15 flex0 ml20">
          预约<font class="fs13">&#xe7d7;</font>
        </span>
        <span v-if="mode=='list' && info.ysid!==0 && info.yszt!==0" class="icon color_666 fs15 flex0 ml20">{{toString(info.yszt)|filter_deptStates_state}}<font class="fs13">&#xe7d7;</font></span>
        <span v-if="mode=='list' && info.ysid==0 &&info.schemeList.length==0" class="icon color_666 fs15 flex0 ">未排班</span>


      </div>

      <div class="lin fs14 color_666" v-if="!info.ysid">{{info.yymc||$route.query.hosname}}</div>
      <div class="lin color_aaa fs14  ellipsis" v-if="info.ysid" >擅长：{{info.ysjs}}</div>
    </div>
  </div>
</template>

<script>
  import {filter_doctStates_state,filter_deptStates_state} from "../../../filters/book";

  /**
   * props
   * **** info
   * **** mode {String} ['list','detail']
   * events
   * **** click(info)
   */
  export default {
    name: "doc-item",
    props: {
      info: Object,
      mode: {
        type: String,
        default: 'list'
      }
    },
    filters:{
      filter_doctStates_state,filter_deptStates_state,
    },
    created(){
    },
    methods: {
      handler() {
        this.$emit('toPaiban', this.info);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/public";

  .ava, img {
    @include w_h(120px);
  }

  .ksmc {
    align-items: center;
  }

  .icon {
    width: 120px;
  }
</style>
