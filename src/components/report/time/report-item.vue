<template>
  <div @click="handle" class="bg_fff pt30 pb30 pl30 pr30 mt30 ml30 mr30 radius10">
    <p class="fs20 color_333 pb10">{{restyle.slice(0,2)}}报告单</p>
    <p class="fs15 color_999">浙二医院（解放路总院）</p>
    <div class="fs15 color_999 flex row space-between">林水军<p>2017-07-04<span class="pl5">18:00</span></p></div>

  </div>
</template>

<script>
    export default {
        name: "report-item",
      props:{
           restyle:{
             type:String
           }
      },
      methods:{
          handle(){
            this.$emit('toDetail')
          }
      }
    }
</script>

<style scoped>

</style>
