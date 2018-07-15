<template>
  <div class="btn right bt pt30 pr30">
    <template v-if="info.chargeFlag=='已结算'">
      <span v-if="info.invoiceType.indexOf('检查')>=0" class="color_999 fs15 pt5 pb5 pl20 pr20 radius10 mr20" @click.stop="handler('jc')">到院检查</span>
      <span v-if="info.invoiceType.indexOf('处方')>=0" class="color_999 fs15 pt5 pb5 pl20 pr20 radius10 mr20" @click.stop="handler('qy')">到院取药</span>
      <span v-if="info.invoiceType.indexOf('处方')>=0" class="color_999 fs15 pt5 pb5 pl20 pr20 radius10" @click.stop="global_noopen">送药到家</span>
    </template>
    <template v-else>
      <router-link to="/ykfpay">
        <span class="pay fs15 pt5 pb5 pl20 pr20 radius10">支付费用</span>
      </router-link>

    </template>
  </div>
</template>

<script>
  export default {
    name: "item-bottom",
    props: {
      info: Object
    },
    methods: {
      handler(type) {
        switch (type) {
          case 'jc':
            this.$weuijs.alert(
              '<img width="80" src="./static/img/dyjc.png">' +
              '<br/>' +
              '<h3 class="fs18 color_333">到院检查</h3>' +
              '<p class="fs14 mt30 color_333">您可以携带相关就医证件，前往衢州市人民医院进行检查检验。</p>', {
                isAndroid: false,
                buttons: [
                  {label: '我知道了', type: 'primary'}
                ]
              })
            break;
          case 'qy':
            this.$weuijs.alert(
              '<img width="80" src="./static/img/dyqy.png">' +
              '<br/>' +
              '<h3 class="fs18 color_333">到院取药</h3>' +
              '<p class="fs14 mt30 color_333">您可以携带相关就医证件，前往衢州市人民医院药房取药。或者您也可以选择“送药到家”</p>', {
                isAndroid: false,
                buttons: [
                  {label: '我知道了', type: 'primary'}
                ]
              })
            break;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $c: #F5A623;

  .btn {
    .pay {
      color: $c;
      border: 1px solid $c;
    }
    span {
      border: 1px solid #999999;
    }
  }
</style>
