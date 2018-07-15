export const accountMixin = {
  methods: {
    /**
     * 校验验证码
     * @param cid
     * @param captcha
     * @returns {Promise<boolean>}
     */
    async mixin_account_code_check(cid, captcha) {
      let {code} =await this.$http('smarthos.captcha.check', {cid, captcha});
      return code == 0;
    }
  }
}
