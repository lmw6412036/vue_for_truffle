<template>
  <div class="page">
    <v-header>
      绑定医院账号
    </v-header>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="type" class="weui-label">就诊卡类型</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="form.cardType" class="weui-select" name="type" id="type">
            <option value="0">请选择</option>
            <option :value="o.value" v-for="o in cardType" >{{o.text}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">就诊卡号</label></div>
        <div class="weui-cell__bd">
          <input v-model="form.cardNo" class="weui-input" type="text" placeholder="填写就诊卡号">
        </div>
      </div>
    </div>

    <a href="javascript:" @click="bind" class="weui-btn weui-btn_primary mt30 ml30 mr30 bg_main">确认添加</a>
  </div>
</template>

<script>
  import {isLoginMixin} from "../../../mixins/isLogin";
  import {bookHosId, CardType} from "../../../lib/config";

  export default {
    name: "create",
    data() {
      return {
        form: {
          cardType: 0,
          bookHosId
        },
        cardType: CardType
      }
    },

    computed: {
      userCommonPatVo() {
        return this.user ? this.user.userCommonPatVo : {}
      }
    },

    mixins: [isLoginMixin],

    async created() {
      let is = await this.mixin_is_login();
    },

    methods: {
      async bind() {
        let {$route: {query}, form} = this;
        if (query.commpatId) form.commpatId = query.commpatId;
        let {code, msg, obj} = await this.$http('smarthos.user.commpat.record.check', form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          switch (obj) {
            case "needCreate":
              this.doCreate(form);
              break;
            case "needBind":
              this.doBind(form);
              break;
            case 'success':
              this.$router.back();
              break;
          }
        }
      },
      async doCreate(form) {
        let {code, msg} = await this.$http('smarthos.user.commpat.record.new', form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          this.$router.back();
        }
      },
      async doBind(form) {
        let {code, msg} = await this.$http('smarthos.user.commpat.record.bind', form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          this.$router.back();
        }
      }
    }

  }
</script>

<style scoped>

</style>
