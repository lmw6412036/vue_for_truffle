<template>
    <div class="remind flex color_fff radius10 page ml30 mr30 mb50 fs13" >
      <font class="icon fs30 pl30">&#xe60c;</font>

      <p class="pl10">由于微信不支持视频功能，<br/>请务必下载App以和医生视频</p>

      <router-link to='/download' class="mt30">
        <button class="btn color_333 bg_fff radius6 mr30 fs13">
          下载App
        </button>
      </router-link>

    </div>
</template>

<script>
    export default {
        name: "downRemain"
    }
</script>

<style scoped lang="scss">
  .remind{
    width: 345*2px;
    height: 70*2px;
    background-color: #ff6666;
    margin-top: -30px;
    justify-content: space-between;
  }
  .btn{
    width: 70*2px;
    height: 30*2px;
    border-style: none;
    margin-top: 6%;
  }
  .icon{
    padding-top: 3%;
  }
  p{
    padding-top: 4%;
  }
</style>
