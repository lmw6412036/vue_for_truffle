import Vue from 'vue'
import weuijs from 'weui.js'
import http from './http'
import VHeader from '../components/common/v-header'
import storage from 'good-storage'
import {userCache} from "./cache";


export default {
  install(options) {
    /*实例属性*/
    Vue.prototype.$weuijs = weuijs;
    Vue.prototype.$http = http;
    Vue.prototype.$cache = storage.session;

    /*全局mixin*/
    Vue.mixin({
      data() {
        return {
          user: null
        }
      },
      computed: {
        userCommonPatVo() {
          if (this.user && this.user.userCommonPatVo) {
            return this.user.userCommonPatVo;
          } else {
            return {};
          }
        },

        userCommonPatRecords() {
          if (this.userCommonPatVo && this.userCommonPatVo.userCommonPatRecords && this.userCommonPatVo.userCommonPatRecords.length > 0) {
            return this.userCommonPatVo.userCommonPatRecords;
          } else {
            return [];
          }
        },

        loading() {
          return this.$root.$children[0].showLoading;
        }

      },
      components: {VHeader},

      created() {
        this.user = userCache.get();
      },

      methods: {
        /**
         * 全局提示未开通功能
         */
        global_noopen() {
          this.$weuijs.alert('该功能暂未开通');
        }
      }
    })
  }
}
