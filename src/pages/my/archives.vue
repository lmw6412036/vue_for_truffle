<template>
  <div class="page flex column">
    <v-header class="flex0">健康档案</v-header>
    <scroll class="flex1 overflow-hidden" :data="list">
      <div class="main">
        <info-item class="info bg_fff pt30 pb30" type="archives"></info-item>
        <div class="wrap mt20 bg_fff">
          <h3 class="flex fs16 color_333 pt40 pb40 pl30">
            <div class="biaoshi bg_main"></div>
            <div class="text ml10">基本情况</div>
          </h3>

          <ul>
            <li :class="[i>0?'bt':'']" v-for="(o,i) in types" :key="i" class="flex fs15 pl30 pr30 pt25 pb25 aic"
                @click="handler('edit',o.type,info[o.type])">
              <label class="color_333 flex0 fs16">{{o.name}}</label>
              <span class="flex1 color_666 right ellipsis">{{info[o.type]}}</span>
              <font class="color_666 fs13 ml20 flex0">&#xe7d5;</font>
            </li>

          </ul>

        </div>

        <div class="wrap mt20 bg_fff">
          <h3 class="flex fs16 color_333 pt40 pb40 pl30">
            <div class="biaoshi bg_main"></div>
            <div class="text ml10">诊疗记录</div>
          </h3>

          <dl>
            <dd @click="handler('detail',o)" v-for="(o,i) in list" :key="i" :class="[{bt:i>0}]" class="pl30 pr30 pt20 pb20">
              <h3 class="fs15 color_333">{{o.medicalHistory.createTime|T('%Y年%m月%d日')}}</h3>
              <div class="content fs14 color_666 mt20">
                {{o.medicalHistory.medContent}}
              </div>
              <ol class="mt20 flex" v-if="o.attaList&&o.attaList.length">
                <li class="overflow-hidden" v-for="(oo,i) in o.attaList" :key="i" :class="[i>2?'mt20':'']">
                  <img class="ava" :src="oo.attaFileUrl" alt="">
                </li>
              </ol>
            </dd>
          </dl>
        </div>
      </div>
    </scroll>

    <router-link to="/my/archives/medical/add" class="weui-btn weui-btn_primary ml30 mr30 mt30 mb30 flex0">添加诊疗记录
    </router-link>
  </div>
</template>

<script>
  import InfoItem from "../../components/my/info-item";
  import Scroll from "../../components/common/scroll";
  import VLabel from "../../components/common/v-label";
  import {medicalinfo} from "../../lib/config";
  import T from 'lmw-time-format';

  export default {
    name: "archives",
    data() {
      return {
        list: [],
        types: medicalinfo,
        info: {}
      }
    },

    filters: {T},
    components: {VLabel, Scroll, InfoItem},

    async created() {
      await this.getData();
      await this.getList();
    },

    methods: {
      handler(type, field, value) {
        switch (type) {
          case "detail":
            this.$cache.set('medicalDetail', field);
            this.$router.push({
              path: '/my/archives/medical/edit',
              query: {id: field.medicalHistory.id}
            });
            break;

          case 'edit':
            this.$router.push({
              path: '/my/archives/add',
              query: {type: field, value}
            });
            break;
        }
      },
      async getData() {
        let {user} = this;
        let {code, obj} = await this.$http('smarthos.medical.info.detail', {patId: user.pat.id});
        if (code == 0) {
          this.info = obj || {};
        }
      },

      async getList() {
        let {code, list} = await this.$http('smarthos.medical.history.list.page', {});
        if (code == 0) {
          this.list = list;
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  ol {
    $i: 200px;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      @include w_h($i);
      img {
        width: $i;
      }
    }
  }

  h3 {
    align-items: center;
  }

  .bt {
    border-width: 10px;
    border-color: $bgColor;
  }

  .biaoshi {
    width: 8px;
    height: 30px;
  }
</style>
