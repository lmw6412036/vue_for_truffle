<template>
  <div class="page">
    <div class="weui-cells__title fs15 color_333">请输入手机号</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.mobile" type="number" placeholder="请输入">
        </div>
      </div>
    </div>

    <div class="weui-cells__title fs15 color_333">请输入验证码</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.captcha" type="text" placeholder="请输入">
        </div>
        <div class="weui-cell__ft">
          <send-code @ok="ok" service="smarthos.captcha.pat.wechat.bind" :mobile="form.mobile"></send-code>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_primary ml30 mr30 mt60" @click="sub">{{nextBiz=='REGISTER'?'下一步':'绑定'}}</a>
  </div>
</template>

<script>
  import V from 'ty-light-validate'
  import SendCode from "../../components/account/send-code";

  export default {
    name: "bind",
    data() {
      return {
        nextBiz: '',
        form: {}
      }
    },
    components: {SendCode},
    methods: {
      ok(data) {
        Log('接收验证码', data);
        this.$set(this.form, 'cid', data.cid);
        if (data.value) {
          this.$set(this.form, 'captcha', data.value);
        }
        this.nextBiz = data.nextBiz;
      },
      async sub() {
        let {nextBiz, form, $route: {query}} = this;
        const v = new V();
        v.add(form.cid, [
          {type: 'required', error: '验证码不能为空'}
        ]);

        v.add(form.captcha, [
          {type: 'required', error: '验证码不能为空'}
        ]);

        let error = v.run();
        if (error) {
          bus.$emit('msg', error);
          return;
        }

        let {code: c, msg: m} = await this.$http('smarthos.captcha.check', form);

        if (c != 0) {
          bus.$emit('msg', m);
          return;
        }


        if (nextBiz == 'REGISTER') {
          this.$router.replace({
            path: `/account/register`,
            query: {
              ...this.form,
              redirect: query.redirect
            }
          });
        } else {
          form.openid = openidCache.get();
          let {code, msg} = await this.$http('smarthos.user.pat.wechat.bind', form);
          code != 0 && (bus.$emit('msg', msg))
          if (code == 0) {
            this.$router.replace(query.redirect);
          }
        }
      }
    }
  }
</script>

<style scoped>
  .weui-cells__title {
    margin-top: 0;
    padding-top: 10px;
  }
</style>
