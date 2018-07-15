import {userCache} from "../lib/cache";

export const isLoginMixin = {
  data() {
    return {
      user: null
    }
  },

  methods: {
    mixin_redirect_login() {
      this.$router.replace({
        path: '/account/bind',
        query: {redirect: this.$route.fullPath}
      });
    },
    async mixin_is_login() {
      let {code, obj} = await this.$http('smarthos.user.pat.get', {});
      if (code == 0) {
        userCache.set(obj);
        this.user = obj;
        return true;
      } else return false;
    }
  }
}
