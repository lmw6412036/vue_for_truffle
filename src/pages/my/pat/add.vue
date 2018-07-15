<template>
  <div class="page">
    <v-header>
      <div @click="sub" class="right absolute pr30 fs16 color_main" slot="right">下一步</div>
      添加就诊人
    </v-header>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.commpatName" type="text" placeholder="请输入姓名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.commpatIdcard" type="text" placeholder="请输入身份证号">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.mobile" type="number" placeholder="请输入手机号">
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.captcha" type="tel" placeholder="验证码">
        </div>
        <div class="weui-cell__ft">
          <send-code :mobile="form.mobile" @ok="ok" service="smarthos.captcha.commpat.add"></send-code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SendCode from "../../../components/account/send-code";

  import Validate from 'ty-light-validate'


  export default {
    name: "add",
    data() {
      return {
        form: {
          cid: ''
        }
      }
    },
    components: {SendCode},
    methods: {
      ok(data) {
        this.$set(this.form, 'cid', data.cid);
        if (data.value) {
          this.$set(this.form, 'captcha', data.value);
        }
      },

      async sub() {
        let {form} = this;
        const Validater = new Validate();

        Validater.add(form.commpatName, [
          {type: 'required', error: '姓名不能为空'}
        ]);

        Validater.add(form.commpatIdcard, [
          {type: 'required', error: '身份证不能为空'}
        ]);

        Validater.add(form.mobile, [
          {type: 'required', error: '手机号不能为空'},
          {type: 'isMobile', error: '手机号格式不正确'}
        ]);

        Validater.add(form.captcha, [
          {type: 'required', error: '验证码不能为空'}
        ]);

        Validater.add(form.cid, [
          {type: 'required', error: '验证码不能为空'}
        ]);

        let error = Validater.run();
        if (error) {
          bus.$emit('msg', error);
          return false;
        }

        let {code: ok} = await this.$http('smarthos.captcha.check', form);
        if (ok != 0) {
          bus.$emit('msg', '验证码验证失败');
          return false;
        }
        let {code, msg} = await this.$http('smarthos.user.commpat.add', this.form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          this.$router.back();
        }
      }
    },

  }
</script>

<style scoped>

</style>
