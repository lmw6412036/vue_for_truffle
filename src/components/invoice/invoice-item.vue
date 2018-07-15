<template>
  <div class="invoice-item bg_fff ml30 mr30 pt30 pb30 pl30 pr30">
    <h3 class="fs15 color_333 flex aic" @click="handler(info)">
      <span>{{info.invDate}}</span>
      <span class="ml20">{{info.admLoc}}</span>
      <img v-if="info.invoiceType=='检查'" class="tag ml20" src="../../assets/img/icon/处方@3x.png" alt="">
      <img v-if="info.invoiceType=='处方'" class="tag ml20" src="../../assets/img/icon/检查@3x.png" alt="">
      <img v-if="info.invoiceType=='处方+检查'" class="tag ml20" src="../../assets/img/icon/检查处方@3x.png" alt="">
    </h3>

    <ul @click="handler(info)">
      <li class="flex color_999 fs15 lh12 mt20 overflow-hidden">
        <v-label class="flex0" title="收费项目"></v-label>
        <div class="ml20 flex1 break">{{info.invoiceCateDesc}}</div>
      </li>
      <li class="flex color_999 fs15 lh12 mt20">
        <v-label class="flex0" title="发票号"></v-label>
        <div class="ml20 flex1">{{info.invNo}}</div>
        <div class="color_666 flex0">{{info.chargeFlag}} <font class="fs13">&#xe7d7;</font></div>
      </li>
      <li class="flex color_999 fs15 lh12 mt20">
        <v-label class="flex0" title="合计金额"></v-label>
        <div class="ml20 flex1">￥{{info.totalAmount}}</div>
      </li>
    </ul>
    <item-bottom :info="info" class="mt30"></item-bottom>
  </div>
</template>

<script>
  import VLabel from "../common/v-label";
  import ItemBottom from "./item-bottom";

  export default {
    name: "invoice-item",
    props: {
      info: Object
    },
    components: {ItemBottom, VLabel},
    methods: {
      handler(data) {
        this.$emit('click', data);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  .break {
    word-break: break-all;
  }

  img {
    height: 26px;
  }

  .v-label {
    justify-content: space-between;
    width: 130px;
  }
  .btn {
    margin-left: -30px;
    margin-right: -30px;
  }

</style>
