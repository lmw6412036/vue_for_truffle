<template>
  <div class="page">
    <v-header>账户相关</v-header>
    <div class="main">
      <ul class="bg_fff pl30 pr30">
        <router-link :to='{path:"/my/pat/mobile",query:{type:"pat",step:1,value:user.userCommonPatVo.commpatMobile}}' tag="li" class="flex pt25 pb25 fs15">
            <span class="flex1">
              修改手机号
            </span>
          <font class="flex0 color_999">&#xe7d5;</font>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about"
  }
</script>

<style scoped>

</style>
