<template>
  <div class="page flex column">
    <v-header class="flex0">
      <span @click="sub" class="absolute right pr30 color_main" slot="right">修改</span>
      编辑资料
    </v-header>
    <div class="main flex1 overflow-y-auto">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell" v-if="form.type=='name'">
          <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="form[form.field]" type="text" placeholder="请输入姓名">
          </div>
        </div>
        <div class="weui-cell" v-if="form.type=='idcard'">
          <div class="weui-cell__hd"><label class="weui-label">身份证</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="form[form.field]" type="text" placeholder="请输入身份证">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "edit",
    data() {
      return {
        form: {}
      }
    },

    created() {
      let {$route: {query}} = this;
      this.form = query;
      this.$set(this.form, query.field, query.value);
    },

    methods: {
      async sub() {
        let {code, obj, msg} = await this.$http(this.form.service, this.form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          let patInfo = this.$cache.get('patInfo');
          this.$cache.set('patInfo', obj.userCommonPatVo || Object.assign({}, patInfo, {
            [this.form.field]: obj[this.form.field]
          }))
          this.$weuijs.toast('编辑成功', {
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
