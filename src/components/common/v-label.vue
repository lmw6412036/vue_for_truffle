<template>
  <div class="v-label flex">
    <span v-for="r in list" >{{r}}</span>
  </div>
</template>

<script>
  export default {
    name: "v-label",
    props: {
      /*是需要冒号*/
      haveColon: {
        type: Boolean,
        default: true
      },
      title: String
    },
    data() {
      return {
        list: []
      }
    },

    created() {
      if (this.title) {
        this.init();
      } else {

      }
    },

    methods: {
      init() {
        this.list = this.title.split('').map((r, i, arr) => {
          if (this.haveColon && i + 1 == arr.length) {
            return r + ":"
          }
          return r
        });
      }
    }
  }
</script>

<style scoped>

</style>
