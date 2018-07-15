<template>
  <transition name="fade">
    <div v-if="showTag" class="v-msg fixed pl30 pr30">
      <span class="block color_fff radius20 pb15 pt15 center fs16">{{text}}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "v-msg",
    props: {
      delay: {type: Number, default: 3000}
    },
    data() {
      return {
        text: "",
        showTag: false
      }
    },
    methods: {
      show(txt) {
        this.text = txt;
        this.showTag = true;
        setTimeout(this.hide, this.delay)
      },
      hide() {
        this.showTag = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/public";

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(100%);
  }

  .v-msg {
    @include t_r_b_l(1, 0, 1, 0);
    bottom: 90px;
  }

  span {
    background-color: rgba(0, 0, 0, .5);
  }
</style>
