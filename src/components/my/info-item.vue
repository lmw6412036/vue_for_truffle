<template>
  <div class="info-item flex pl30 pr30" @click="handler">
    <v-ava :url="pat.patAvatar">
      <img slot="error" src="../../assets/img/my/pat-m.png" alt="">
    </v-ava>
    <div class="user flex1  ml30 flex column" :class="[{color_fff:type=='index'}]">
      <h3 class="fs16">姓名：{{userCommonPatVo.commpatName}}</h3>
      <div class="fs14 mt20">{{userCommonPatVo.commpatGender|sex(2)}}
        {{userCommonPatVo.commpatIdcard|getAgeFromIdCard}}岁 {{userCommonPatVo.areaName}}
      </div>
    </div>
    <template v-if="type=='index'">
      <div class="icon flex0 flex column">
        <font class="color_fff">&#xe7d5;</font>
      </div>
    </template>
  </div>
</template>

<script>

  import {getAgeFromIdCard, sex} from 'ty-vue-filters'
  import {isLoginMixin} from "../../mixins/isLogin";
  import VAva from "../common/v-ava";

  export default {
    name: "info-item",
    components: {VAva},
    props: {
      type: String
    },

    computed: {
      userCommonPatVo() {
        return this.user ? this.user.userCommonPatVo : {};
      },
      pat() {
        return this.user ? this.user.pat : {};
      }
    },

    filters: {sex, getAgeFromIdCard},
    mixins: [isLoginMixin],

    async created() {
      let is = await this.mixin_is_login();
    },

    methods: {
      handler() {
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/public";

  $w: 160px;
  .ava {
    @include w_h($w);
    img {
      @include w_h($w);
    }
  }

  .user, .icon {
    height: $w;
    justify-content: center;
  }
</style>
