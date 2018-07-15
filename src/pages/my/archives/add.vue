<template>
  <div class="page">
    <v-header>
      <span slot="right" class="right absolute pr30 color_main" @click="sub">保存</span>
      {{title}}
    </v-header>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" maxlength="200" v-model="val" placeholder="请输入文本" rows="3"></textarea>
          <div class="weui-textarea-counter"><span>{{val?val.length:0}}</span>/200</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {medicalinfo} from "../../../lib/config";

  export default {
    name: "add",
    data() {
      return {
        type: "",
        val: ''
      }
    },

    computed: {
      title() {
        return medicalinfo.find(r => r.type == this.type).name || '';
      }
    },

    created() {
      let {$route: {query}} = this;
      query && query.type && (this.type = query.type);
      query && query.value && (this.val = query.value);
    },

    methods: {
      async sub() {
        let {type, val} = this;
        let {code} = await this.$http('smarthos.medical.info.modify', {
          [type]: val
        });

        if (code == 0) {
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
