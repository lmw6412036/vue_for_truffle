<template>
  <v-sheet ref="vSheet">
    <div class="select-num ignore absolute flex t0 r0 b0 l0 pl30 pt30 pr30 pb30">
      <div class="title flex0">
        <h3 class="fs20">2017-03-25 周二 上午</h3>
        <p class="fs15 color_333">号源时段以医院实际情况为准</p>
      </div>
      <ul class="flex pt20 pb20 pl30 pr30 flex1 overflow-y-auto">
        <li @click.stop="handler(o)" v-for="(o,i) in 20" :key="i" class="flex0 center radius20" :class="[i>=2?'mt20':'']">{{o}}</li>
      </ul>
    </div>
  </v-sheet>
</template>

<script>
  import VSheet from "../common/v-sheet";

  export default {
    name: 'select-num',
    data() {
      return {};
    },
    computed: {},
    components: {VSheet},
    mixins: [],
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handler(data) {
        this.$emit('num-change', data);
        this.$refs.vSheet.hide();
      },
      show() {
        this.$refs.vSheet.show();
      },
    }
  };
</script>

<style scoped lang="scss">
  @import "../../style/public";

  .select-num {
    flex-direction: column;
  }

  ul {
    margin: 0 -30px;
    flex-flow: wrap;
    justify-content: space-between;
  }

  li {
    border: 1px solid rgba(#4A90E2, .5);
    width: 167px * 2;
    background-color: rgba(#4A90E2, 0.05);
    @include h_lh(90px);
  }

</style>
