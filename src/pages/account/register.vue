<template>
  <div class="page">
    <v-header>
      <span @click="sub" class="absolute right pr30 color_main" slot="right">提交</span>
      注册
    </v-header>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.mobile" type="number" readonly placeholder="请输入手机号">
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.patName" type="text" placeholder="请输入姓名">
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">身份证</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.patIdcard" type="text" placeholder="请输入身份证">
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.captcha" type="text" placeholder="请输入验证码">
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  import {openidCache} from "../../lib/cache";

  export default {
    name: "register",
    data() {
      return {
        form: {patPassword: 123456}
      }
    },

    created() {
      let {$route: {query}} = this;
      this.form = Object.assign({}, this.form, query);
    },

    methods: {
      async sub() {
        let {form, $route: {query}} = this;
        form.openid = openidCache.get();
        let {code, msg} = await this.$http('smarthos.user.pat.register', form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == '12010105') {
          this.$router.back();
        } else if (code == 0) {
          if (query.redirect) {
            this.$router.replace({
              path: query.redirect
            })
          }
          else this.$router.replace({
            path: `/my`
          })
        }
      }
    }

  }
</script>

<style scoped>

</style>
