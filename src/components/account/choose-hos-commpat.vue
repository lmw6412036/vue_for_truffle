<template>
  <ul>
    <li class="flex pl30 pr30 pt25 pb25 bg_fff fs16 aic">
      <span class="flex1 color_333">选择医院</span>
      <span class="flex0 color_main" @click="mixin_hos_choose">{{mixinCurrHos.yymc}}</span>
      <font class="flex0 color_999 ml10 fs14">&#xe7d5;</font>
    </li>
    <li class="flex pl30 pr30 pt25 pb25 bg_fff mt20 fs16 aic">
      <span class="flex1 fs16 color_333">就诊人信息</span>
      <span class="flex0 color_main" @click="mixin_choose_commpat">{{currPat.commpatName}}</span>
      <font class="flex0 color_999 ml10 fs14">&#xe7d5;</font>
    </li>
    <li class="flex pl30 pr30 pt25 pb25 bg_fff mt20 fs16 aic">
      <span class="flex1 fs16 color_333">病案号</span>
      <span class="flex0 color_main">{{jzkh}}</span>
      <font class="flex0 color_999 ml10 fs14">&#xe7d5;</font>
    </li>
  </ul>
</template>

<script>
  import {commpatListMixin} from "../../mixins/commpatList";
  import {hosMixin} from "../../mixins/hos";

  /**
   * events
   * **** change
   */
  export default {
    name: "choose-hos-commpat",
    mixins: [commpatListMixin, hosMixin],
    data() {
      return {
        form: {}
      }
    },
    methods: {
      setForm(field, data) {
        let name;
        switch (field) {
          case 'currPatIndex':
            name = 'pat'
            break;
          case 'mixin_hos_index':
            name = 'hos'
            break;
          case 'jzkh':
            name = 'jzkh'
            break;
        }
        this.$set(this.form, name, data);
      }
    },
    watch: {
      form: {
        handler(newV) {
          this.$emit('change', newV);
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
