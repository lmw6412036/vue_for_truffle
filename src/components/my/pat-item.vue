<template>
  <div class="pat-item relative bg_fff pt30 pb30 pl30 pr30" @click="handler(info)">
    <h3 class="flex">
      <span class="fs16 color_333">{{info.commpatName}} </span> <span class="fs14 color_666">&nbsp;{{info.commpatGender|sex(2)}} {{info.commpatIdcard|getAgeFromIdCard}}岁</span>
    </h3>
    <ul>
      <li class="flex">
        <v-label class="color_999 fs14" title="身份证号"></v-label>
        <span class="fs14 color_666 ml10">{{info.commpatIdcard|hidden(3,4,11)}}</span>
      </li>
      <li class="flex mt20">
        <v-label class="color_999 fs14" title="手机号码"></v-label>
        <span class="fs14 color_666 ml10">{{info.commpatMobile|hidden(3,4,4)}}</span>
      </li>
      <li class="flex mt20">
        <v-label class="color_999 fs14" title="病案号"></v-label>
        <span class="fs14 color_666 ml10">{{compatRecord}}</span>
      </li>
    </ul>
    <div class="arrow absolute r30">
      <font>&#xe7d5;</font>
    </div>
  </div>
</template>

<script>
  import VLabel from "../common/v-label";
  import {getAgeFromIdCard, hidden, sex} from 'ty-vue-filters'

  /**
   * events
   * **** click
   */
  export default {
    name: "pat-item",
    props: {
      info: Object,
    },
    computed: {
      compatRecord() {
        if (this.info.userCommonPatRecords.length > 0) {
          for (let i = 0; i < this.info.userCommonPatRecords.length; i++) {
            let obj = this.info.userCommonPatRecords[i];
            if (obj.compatRecord) return obj.compatRecord
          }
        }
        return "暂无"
      }
    },
    data() {
      return {}
    },
    filters: {getAgeFromIdCard, sex, hidden},
    components: {VLabel},
    methods: {
      handler(data) {
        this.$emit('click', data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/public";

  h3 {
    line-height: 80px;
  }

  .v-label {
    width: 150px;
    justify-content: space-between;
  }

  li {
    line-height: 1.2;
  }

  .arrow {
    top: 50%;
    margin-top: -23px;
  }
</style>
