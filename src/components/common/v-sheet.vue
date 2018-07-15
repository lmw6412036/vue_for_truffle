<template>
  <div class="v-sheet">
    <transition name="mask">
      <div v-if="showTag" @click.stop="hide" class="mask fixed rgba5 t0 r0 b0 l0"></div>
    </transition>
    <transition name="fade">
      <div v-if="showTag" class="main fixed bg_fff l0 r0 b0 overflow-hidden">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "v-sheet",
    data() {
      return {
        showTag: false
      }
    },
    methods: {
      show() {
        this.showTag = true;
      },
      hide() {
        this.showTag = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/public";

  .mask-enter-active, .mask-leave-active {
    transition: all .3s;
  }

  .mask-enter, .mask-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    transform: translateY(100%);
  }


  .main {
    top: 40%;
  }

</style>
