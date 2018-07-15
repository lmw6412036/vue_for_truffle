<template>
  <div id="app" class="relative bg">
    <router-view/>
    <v-msg ref="msg"></v-msg>
    <v-loading :show-tag="showLoading"></v-loading>
  </div>
</template>

<script>
  import VMsg from './components/common/v-msg'
  import VLoading from "./components/common/v-loading";

  export default {
    name: 'App',
    data() {
      return {
        loadingQueue: [],
        showLoading: false
      }
    },
    components: {VLoading, VMsg},
    created() {
      bus.$on("msg", (msg) => {
        this.$refs.msg.show(msg);
      });
      bus.$on('loading', (data) => {
        if (data === false) {
          let index = this.loadingQueue.findIndex(r => r.status === true),
            item = this.loadingQueue[index];
          item.status = false;
          this.loadingQueue.splice(index, 1, item);
          if (this.loadingQueue.every(r => r.status === false)) {
            this.showLoading = false;
            this.loadingQueue = [];
          }
        } else {
          this.showLoading = true;
          this.loadingQueue.push({
            t: new Date().toLocaleString(),
            status: true
          })
        }
      })
    },
    watch: {
      showLoading(newV) {
        bus.$emit('showLoading', newV);
      }
    }
  }
</script>

<style lang="scss">
  @import "./style/base";
  @import "./style/program";
  @import "./style/mixin";

  #app, .page {
    height: calc(100vh);
  }
</style>
