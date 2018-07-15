<template>
  <div class="footer">
    <ul class="flex bg_fff">
      <li class="flex0 center lh15 pt20 pb20" v-for="o,i in nav" @click="goPage(o)" :class="[currentNav==i?'color_main':'']">
        <div class="icon iconfont fs26" :class="['icon-'+o.class]"></div>
        <div class="text fs16 color_333">{{o.value}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import config from "../../lib/config/home"

  export default {
    name: 'v-footer',
    props: {
      currentNav: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        nav: config.nav
      };
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      goPage(page) {
        this.$router.push(`/${page.name}`)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../style/public";

  li {
    width: (100% / 3);
    &.color_main {
      div{
        color: $mainColor;
      }
    }
  }
</style>
