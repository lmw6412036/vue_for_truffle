<template>
  <div class="page flex column">
    <v-header class="flex0">{{title}}</v-header>

    <div class="QRBox bg_fff center pt50 flex0">
      <img class="QR" id="qr" @click="scan($event)">
      <p class="fs15 color_999 center pt15">病案号：{{data.patid}}</p>
    </div>

    <ul class="datas bg_fff pt30 pl30 pr30 pb30 mt20 flex1 overflow-y-auto overflow-x-hidden">
      <li class="line1 fs20 color_000 flex mb30">
        <div class="line2 flex">
          <div class="pr20">{{data.numdate}}</div>
          <div class="pr20">{{data.ampm|ampm}}</div>
          <div class="pr20">{{data.numno}}号</div>
        </div>
        <template v-if="data.orderState==0 ||data.orderState==6">
          <div class="color_main fs17 mr15">待就诊</div>
        </template>
        <template v-if="data.orderState==1 ">
          <div class="color_666 fs17 mr15">已锁定</div>
        </template>
        <template v-if="data.orderState==3">
          <div class="color_666 fs17 mr15">已取消</div>
        </template>
        <template v-if="data.orderState==2">
          <div class="color_666 fs17 mr15">失败</div>
        </template>
        <template v-if="data.orderState==4 ">
          <div class="color_666 fs17 mr15">停诊取消</div>
        </template>
        <template v-if="data.orderState==5">
          <div class="color_666 fs17 mr15">已结束</div>
        </template>
      </li>

      <li class="flex">
        <v-label class="mr20" title="医院"></v-label>
        {{data.hospitalname}}
      </li>
      <li class="flex">
        <v-label class="mr20" title="医生"></v-label>
        {{data.docname || '普通号'}}
      </li>
      <li class="flex">
        <v-label class="mr20" title="费用"></v-label>
        {{data.regfee||'0.0'}} 元
      </li>
      <li class="flex">
        <v-label class="mr20" title="科室"></v-label>
        {{data.deptname}}
      </li>
      <li class="flex">
        <v-label class="mr50" title="预估就诊时间"></v-label>
        {{data.numtime}}<span class="tip1 fs12 color_aaa mr60">（以医院实际情况为准)</span>
      </li>
      <li class="flex">
        <v-label class="mr20" title="支付方式"></v-label>
        线上支付
      </li>

      <div class="dash mt30"></div>
      <li class="flex">
        <v-label class="mr20" title="患者信息"></v-label>
        {{data.patname}} {{data.sex}} {{data.age}}
      </li>
      <li class="flex">
        <v-label class="mr20" title="身份证号"></v-label>
        {{data.idcard}}
      </li>
      <li class="flex">
        <v-label class="mr20" title="手机号码"></v-label>
        {{data.mobileno}}
      </li>
    </ul>

    <template>

      <div class="flex0 center color_333 pt10">
        <p v-show="data.orderState==0">取消预约需提前一天；你可以事先测试视频功能</p>
        <p v-show="data.orderState==6">当前已叫到<span class="color_main pl5 pr5">{{num}}</span>号，请提前进入视频诊间候诊</p>
        <div v-show="data.orderState==0" class="endBox bt mt10 overflow-hidden pt15 pb15">
          <div class="v-btn dangtian center fs14 radius10  pt6 pb6 pl10 pr10 mr30 "
               @click="cancel"
               v-show="data.orderState==0"
          >取消预约
          </div>
          <div class="v-btn center color_999 fs14 radius10 pt6 pb6 pl10 pr10 mr30 " @click.stop="click">测试视频</div>
        </div>
        <div v-show="data.orderState==6"
             class="v-btn jinru center overflow-hidden bg_main color_fff fs14 bt radius10  pt6 pb6 pl10 pr10 mt15 mr30 mb15"
             @click.stop="click">进入诊间
        </div>
      </div>
    </template>
    <pic-fullscrenn-scan ref="zoom"></pic-fullscrenn-scan>
  </div>
</template>

<script>
  import {ampm} from 'ty-vue-filters'
  import JsBarcode from 'jsbarcode'
  import VLabel from "../../../components/common/v-label";
  import {bookMixin} from "../../../mixins/book";
  import PicFullscrennScan from "../../../components/common/pic-fullscrenn-scan";

  export default {
    name: "order-detail",

    filters: {ampm},
    components: {PicFullscrennScan, VLabel},
    mixins: [bookMixin],
    data() {
      return {
        title: '我的预约',
        data: {},
        num: 0,
      }
    },
    async created() {
      this.data = this.$cache.get('orderDetail');
      this.getData(this.data.hisOrderId);
      this.getNum()
    },

    mounted() {
      this.getQR();
    },

    methods: {
      scan(e) {
        let img = e.target;
        this.$refs.zoom.show(img.src);
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

      /**获取已叫到号码
       *
       * @returns {Promise<void>}
       */
      async getNum() {
        let {code, list} = await this.$http("smarthos.online.outpatient.callno.list", {
          onlineOutpatientIds: [this.data.orderid]
        })
        if (code == 0) {
          if (list !== undefined) {
            this.num = list[0].callingNo;
          }
        }
      },

      getQR() {
        let el = document.getElementById('qr');
        if (el) {
          JsBarcode('#qr', this.data.qhmm, {
            displayValue: false
          });
        } else setTimeout(this.getQR, 20)
      },

      async cancel() {
        let {data} = this;
        let {code} = await this.mixin_book_order_cancel(data.orderid, data.qhmm, data.orgid);
        if (code == 0) {
          this.$router.back();
        }
      },
      async getData(ddid) {
        await this.$http('smarthos.yygh.ApiDoctorService.orderByDdid', {
          ddid: ddid
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/public";

  $pageWidth: 375*2px;
  .tip1 {
    width: 150*2px !important;
    height: 20*2px;
  }

  .jinru {
    border-color: $mainColor !important;
  }

  .bottomBox {
    width: 375*2px;
    position: absolute;
    bottom: 0;
  }

  .endBox {

  }

  .dangtian {
    color: #F76260;
    background-color: #f1f1f1;
    border-color: #f1f1f1 !important;
  }

  .QRBox {
    height: 160*2px;
    width: $pageWidth;
  }

  .QR {
    width: 250*2px;
    height: 80*2px;
    margin: 0 auto;
  }

  .orderPage {
    background-color: #F1F1F1;
  }

  .v-btn {
    border: 1px solid #999999;
    float: right;
    min-width: 67*2px;
  }

  .ibtn {
    height: 45*2px;
    border-top: 1px solid #F1F1F1;
  }

  .line1 {
    flex-direction: row;
    justify-content: space-between;
  }

  .wait {
    color: #3B9DFF;
  }

  .datas {
    span {
      width: 75*2px;

    }
  }

  li {
    line-height: 50px;
  }

  li .v-label {
    width: 150px;
    justify-content: space-between;
    color: #999999;
  }

  .dash {
    border-top: 1px dashed #f1f1f1;
    height: 30px;
  }
</style>
