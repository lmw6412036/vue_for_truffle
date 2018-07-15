<template>
  <div class="page flex column">
    <v-header>行情</v-header>
    <div class="main flex1">
      <table class="bg_fff">
        <tr>
          <th>
            资产名称
          </th>
          <th>
            最新价
          </th>
          <th>
            涨跌幅
          </th>
        </tr>
        <tr v-for="o,i in list">
          <td>ETH{{i}}</td>
          <td>{{o.price}}</td>
          <td>
            <span class="color_fff pt5 pb5 pl10 pr10 radius10"
                  :class="[parseFloat(o.chg)>0?'red':'green']">{{o.chg}}%</span>
          </td>
        </tr>
      </table>
    </div>
    <v-footer class="flex0" :current-nav="1"></v-footer>
  </div>
</template>

<script>
  import VFooter from "../../components/common/v-footer";

  export default {
    name: "index",
    components: {VFooter},
    data() {
      return {
        list: [],
        timer: null
      }
    },
    created() {
      this.makeData();
    },
    beforeDestroy() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    methods: {
      makeData() {
        this.timer = setTimeout(this.makeData, 1000)
        this.list = new Array(10).fill(1).map(r => {
          return {
            name: 'ETH',
            price: (Math.random() * 100).toFixed(2),
            chg: `${Math.random() * 10 > 5 ? '+' : '-'}${(Math.random()).toFixed(2)}`
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  table {
    width: 100%;
  }

  th, td {
    text-align: center;
    height: 70px;
  }

  .red {
    background-color: red;
  }

  .green {
    background-color: $mainColor;
  }
</style>
