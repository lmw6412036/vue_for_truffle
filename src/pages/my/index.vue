<template>
  <div class="page flex column">
    <v-header class="flex0">我</v-header>
    <div class="main flex1">
      <ol class="bg_fff flex pt25 pb25">
        <li class="flex0 lh18 center" @click="handler({id:'wallet'})">
          <div class="icon iconfont fs30 color_main">&#xe68f;</div>
          <div class="text fs16">管理钱包</div>
        </li>
        <li class="flex0 lh18 center" @click="handler({id:'order'})">
          <div class="icon iconfont fs30 color_main">&#xe61c;</div>
          <div class="text fs16">交易记录</div>
        </li>
      </ol>
      <div class="nav mt20">
        <ul class="bg_fff">
          <li v-for="(item,index) in nav" :key="index" @click="handler(item)" class="flex pl30 pt20 pb20 pr30 aic"
              :class="[index!==0?'bt':'',item.id]">
            <div class="class iconfont fs20 color_main" :class="['icon-'+item.icon]"></div>
            <div class="text flex1 fs16 ml20">{{item.name}}</div>
            <font class="right color_999 fs18">&#xe6aa;</font>
          </li>
        </ul>
      </div>
    </div>
    <v-footer :current-nav="2"></v-footer>
  </div>
</template>

<script>
  import {MY_NAV} from "../../lib/config";
  import {dataCache} from "../../lib/cache";
  import {isLoginMixin} from '../../mixins/isLogin'
  import InfoItem from "../../components/my/info-item";
  import VFooter from "../../components/common/v-footer";

  export default {
    components: {VFooter, InfoItem},
    data() {
      return {
        nav: MY_NAV
      }
    },

    computed: {
      patInfo() {
        let {user} = this;
        return user ? user.userCommonPatVo : {}
      },
      pat() {
        let {user} = this;
        return user ? user.pat : {}
      }
    },

    mixins: [isLoginMixin],

    async created() {

    },

    methods: {
      goDetail() {
        this.$cache.set('patInfo', this.patInfo);
        this.$router.push({
          path: '/my/detail',
          query: {id: this.patInfo.id}
        });

      },
      handler(data, type = 'nav') {
        switch (type) {
          case "detail":
            dataCache.set(this.patInfo);
            this.$router.push({
              path: `/my/detail`,
            });
            break;
          case 'nav':
            if (data.id == 'kefu') {
              this.$weuijs.alert('客服电话：0570-8895120', {
                title: '联系客服'
              });
            } else {
              data.id && this.$router.push({
                path: `/my/${data.id}`
              })
            }
            break;
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  ol {
    li {
      width: (100% / 2);
    }
  }


</style>
