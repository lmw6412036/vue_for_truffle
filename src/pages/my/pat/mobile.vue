<template>
  <div class="page">
    <v-header>
      <span @click="doSub" class="absolute pr30 t0 right color_main" slot="right" v-if="form.step==2">提交</span>
      <span @click="doNext" class="absolute pr30 t0 right color_main" slot="right" v-else-if="next===true">下一步</span>
      {{form.step==1?'修改绑定手机号':'验证新手机'}}
    </v-header>
    <div class="weui-cells weui-cells_form" v-if="form.step==1">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.value" readonly type="number" placeholder="请输入手机号">
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.captcha" type="text" placeholder="请输入验证码">
        </div>
        <template v-if="form.type=='pat'">
          <div class="weui-cell__ft">
            <send-code @ok="patok1" id="p1" service="smarthos.captcha.pat.mobile.modify" :nomobile="true"></send-code>
          </div>
        </template>
        <template v-if="form.type=='commpat'">
          <div class="weui-cell__ft">
            <send-code class="commpat1" id="c1" service="smarthos.captcha.commpat.mobile.modify" @ok="commpatok1"
                       :data="{commpatId:form.commpatId,_t:1}"
                       :mobile="form.value"></send-code>
          </div>
        </template>
      </div>
    </div>


    <div class="weui-cells weui-cells_form" v-if="form.step==2">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>

        <div class="weui-cell__bd" v-if="form.type=='pat'">
          <input class="weui-input" v-model="form.patMobile" type="number" placeholder="请输入手机号">
        </div>
        <div class="weui-cell__bd" v-else-if="form.type=='commpat'">
          <input class="weui-input" v-model="form.mobile" type="number" placeholder="请输入手机号">
        </div>

      </div>
      <div class="weui-cell  weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.newCaptcha" type="text" placeholder="请输入验证码">
        </div>

        <div class="weui-cell__ft" v-if="form.type=='pat'">
          <send-code @ok="patok2" id="p2" service="smarthos.captcha.pat.mobile.modify" :mobile="form.patMobile"></send-code>
        </div>
        <div class="weui-cell__ft" v-else-if="form.type=='commpat'">
          <send-code class="commpat2" id="c2" service="smarthos.captcha.commpat.mobile.modify" @ok="commpatok2"
                     :data="{commpatId:form.commpatId,_t:2}"
                     :mobile="form.mobile"></send-code>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import V from 'ty-light-validate'
  import SendCode from "../../../components/account/send-code";

  export default {
    name: "mobile",
    components: {SendCode},
    data() {
      return {
        next: false,
        form: {}
      }
    },
    created() {
      let {$route: {query}} = this;
      this.form = query;
    },
    methods: {
      doNext() {
        this.$set(this.form, 'step', 2);
      },

      patok1(data) {
        this.next = true;
        this.$set(this.form, 'cid', data.cid)
        data.value && (this.$set(this.form, 'captcha', data.value));
      },

      commpatok1(data) {
        this.next = true;
        this.$set(this.form, 'cid', data.cid)
        data.value && (this.$set(this.form, 'captcha', data.value));
      },

      patok2(data) {
        this.$set(this.form, 'newCid', data.cid)
        data.value && (this.$set(this.form, 'newCaptcha', data.value));
      },

      commpatok2(data) {
        this.$set(this.form, 'cid', data.cid)
        data.value && (this.$set(this.form, 'captcha', data.value));
      },

      async doSub() {
        const v = new V();
        let service;
        let {form} = this;
        if (form.type == 'pat') {
          service = 'smarthos.user.pat.mobile.modify';
        } else {
          service = "smarthos.user.commpat.mobile.modify";
          v.add(form.mobile, [
            {type: 'required', error: '手机号不能为空'}
          ]);
          let error = v.run();
          if (error) {
            bus.$emit('msg', error);
            return false
          }
        }

        let {code, msg} = await this.$http(service, form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          this.$weuijs.toast('修改成功', {
            callback: () => {
              this.$router.back();
            }
          });
        }
      }


    }
  }
</script>

<style scoped>

</style>
