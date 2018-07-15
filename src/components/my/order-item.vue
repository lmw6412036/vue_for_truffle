<template>
  <div class="order-item flex bg_fff radius10 pt25 pb25 pl30 pr30 aic">
    <div class="icon iconfont flex0 radius50 bg_main color_fff fs12 flex aic jcc" v-if="index%2==0">&#xe651;</div>
    <div class="icon iconfont flex0 radius50 bg_main color_fff fs12 flex aic jcc" v-if="index%2==1">&#xe650;</div>
    <div class="info flex1 lh12 ml20">
      <h3 class="color_333 fs16">0x9876666</h3>
      <p class="color_999 mt10 fs14">3天前</p>
    </div>
    <div class="flex0 fs14" :class="[index%2==0?'color_green':'color_red']">
      {{index%2==0?'-':'+'}}{{(Math.random()).toFixed(5)}} ether
    </div>

  </div>
</template>

<script>
  /**
   *
   * props
   * **** mode
   *
   * events
   * **** click
   * **** cancel
   */


  import {ampm, getAgeFromIdCard, getSexFromIdCard} from 'ty-vue-filters'
  import {HOSID} from "../../lib/config"
  import {bookMixin} from "../../mixins/book";

  export default {
    name: "order-item",
    props: {
      mode: {
        type: String,
        default: 'list'//[list,index]
      },
      index: Number,
      info: Object,
    },
    data() {
      return {
        HOSID,
        num: 0,
      }
    },
    created() {
      if (this.info.orderState == 6) {
        this.getNum();
      }

    },
    filters: {
      ampm, getAgeFromIdCard, getSexFromIdCard
    },
    mixins: [bookMixin],
    methods: {
      handler(data) {
        this.$emit("click", data);
      },

      click() {
        this.$weuijs.confirm("<span class='color_333'>由于微信暂不支持和医生视频功能，请下载APP和医生视频</span>", {
          title: "预约提示",
          buttons: [{
            label: '取消',
            type: 'default'
          }, {
            label: '下载APP',
            type: 'primary',
            onClick: () => {
              this.$router.push('/download')
            }
          }]
        });
      },

      async vcancel(info) {
        let {code} = await this.mixin_book_order_cancel(info.orderid, info.qhmm, HOSID);
        if (code == 0) {
          this.$emit('cancel', 'ok');
        }
      },

      /**获取已叫到号码
       *
       * @returns {Promise<void>}
       */
      async getNum() {
        let {code, list} = await this.$http("smarthos.online.outpatient.callno.list", {
          onlineOutpatientIds: [this.info.orderid]
        })
        if (code == 0) {
          if (list !== undefined) {
            this.num = list[0].callingNo;
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/public.scss";
  .icon{
    @include w_h(70px);
  }
</style>
