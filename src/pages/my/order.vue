<template>
  <div class="page column flex overflow-y-auto">
    <v-header class="flex0">交易记录</v-header>
    <scroll :data="list" class="flex1 overflow-hidden">
      <div class="">
        <order-item @click="click" @cancel="cancel"
                    :info="item" :index="index" :class="[index>0?'bt':'']"
                    v-for="(item,index) in 100" :key="index">
        </order-item>

        <div v-show="list.length==0 && show" class="center pt50">
          <font class="fs100 color_999">&#xe642;</font>
          <p class="fs18 color_999">暂无预约记录</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll";
  import OrderItem from "../../components/my/order-item";
  import {isLoginMixin} from '../../mixins/isLogin'
  import {HOSID} from "../../lib/config";

  export default {
    name: "order",

    data() {
      return {
        HOSID,
        list: [],
        today: '',
        show: false,
      }
    },

    components: {OrderItem, Scroll},
    mixins: [isLoginMixin],

    async created() {

    },

    methods: {
      cancel() {
        this.getData();
      },
      click(data) {
        this.$cache.set('orderDetail', data);
        this.$router.push('/my/order/detail');
      },
      async getData() {
        let {user: {pat}} = this;
        let {code, msg, list} = await this.$http('smarthos.yygh.apiOrderService.ghBespeakList', {
          hzid: pat.id,
          pageNum: 1,
          pageSize: 30
        });
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          this.list.length == 0 && (this.show = true);
          this.list = list;
        } else {
          this.show = true;
        }
      },

    }
  }
  // "4376"
</script>

<style scoped lang="scss">

</style>
