<template>
  <v-sheet ref="vSheet">
    <div class="flex absolute ignore t0 r0 b0 l0 bafter-l">
      <div class="first flex0 overflow-y-auto">
        <ul>
          <li :class="[i!==0?'bt':'']" class="pl30 pt25 pb25" v-for="(o,i) in 35" :key="i">{{o}}</li>
        </ul>
      </div>
      <div class="sons flex1 overflow-y-auto">
        <ul>
          <li @click.stop="handler(o)" :class="[i!==0?'bt':'']" class="pl30 pt25 pb25" v-for="(o,i) in 35" :key="i">{{o}}</li>
        </ul>
      </div>
    </div>
  </v-sheet>
</template>

<script>
  import VSheet from "../common/v-sheet";

  export default {
    name: "select-dept",
    components: {VSheet},
    data() {
      return {}
    },
    methods: {
      show() {
        this.$refs.vSheet.show();
      },
      handler(data) {
        this.$refs.vSheet.hide();
        this.$emit('dept-change', data);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/public";

  $firstWidth: 150px;

  .ignore {
    .first {
      width: $firstWidth;
    }
    &:after {
      left: $firstWidth;
    }
  }

  .first {

  }

</style>
