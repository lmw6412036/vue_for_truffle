<template>
  <div class="page column flex">
    <v-header class="flex0">
      <router-link tag="div" slot="right" to="/my/pat/add" class="right absolute fs16 color_main pr30">
        添加
      </router-link>
      常用就诊人
    </v-header>
    <scroll :data="commpatList" class="list flex1 overflow-hidden">
      <div class="pt20 pb20">
        <pat-item @click="handler" :class="[i!==0?'mt20':'']" :key="i" v-for="(o,i) in commpatList"
                  :info="o"></pat-item>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll";
  import PatItem from "../../components/my/pat-item";
  import {commpatListMixin} from "../../mixins/commpatList";

  export default {
    name: "pat",

    data() {
      return {}
    },
    components: {PatItem, Scroll},
    mixins: [commpatListMixin],
    created() {
      this.mixin_get_commpat_ist();
    },
    methods: {
      async cancel(data) {
        let {code, msg} = await this.$http('smarthos.user.commpat.delete', {commpatId: data.id})
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          this.mixin_get_commpat_ist();
        }
      },
      handler(data) {
        this.$weuijs.actionSheet([
          {
            label: '编辑',
            onClick: () => {
              this.$cache.set('patInfo', data);
              this.$router.push({
                path: '/my/detail',
                query: {id: data.id}
              })
            }
          },
          {
            label: '删除',
            onClick: () => {
              data.self === true && (bus.$emit('msg', '不能删除自己'));
              data.self === false && this.$weuijs.confirm('是否确定删除该就诊人?', () => {
                this.cancel(data);
              });
            }
          }
        ], [
          {
            label: '取消',
            onClick: () => {
            }
          }
        ], {isAndroid: false})
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
