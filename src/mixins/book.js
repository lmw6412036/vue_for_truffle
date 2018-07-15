export const bookMixin = {
  methods: {
    /**
     * 取消预约
     * @param orderid
     * @param pass
     * @param orgid
     * @returns {Promise<any>}
     */
    mixin_book_order_cancel(orderid, pass, orgid) {
      return new Promise((resolve, reject) => {
        this.$weuijs.confirm('取消预约后无法撤销。如有退费将会在10个工作日内退回您的支付账户。', {
          title: '取消预约',
          isAndroid: false,
          buttons: [
            {
              label: '确定取消', type: 'default',
              onClick: async () => {
                let data = await this.$http('smarthos.yygh.apiOrderService.cancel', {orderid, pass, orgid});
                resolve(data);
              }
            },
            {label: '我再想想'}
          ]
        })
      })
    },

    /**
     * 科室排班（专家号）
     * @param hosId
     * @param deptId
     * @param date
     * @returns {Promise<void>}
     */
    async mixin_book_dept_pblist(hosId, deptId, date) {
      let {code, msg, list = []} = await this.$http('smarthos.yygh.ApiDoctorService.pblist', {
        hosId, deptId,
        isPb: 0,
        isSspb: null,
        date
      });
      code != 0 && (bus.$emit('msg', msg));
      if (code == 0) {
        return list;
      }
    },

    /**
     * 科室排班（普通号）
     * @param hosId
     * @param deptId
     * @returns {Promise<void>}
     */
    async mixin_book_dept_pt(hosId, deptId) {
      await this.$http('smarthos.yygh.ApiDoctorService.ptpbinfo', {hosId, deptId})
    },

    /**
     * 获取号源
     * @param schid
     * @param ampm
     * @returns {Promise<void>}
     */
    async mixin_get_api(schid, ampm){
      await this.$http('smarthos.yygh.apiQueryNumberService.selectNum', {schid, ampm});
    },

    /**
     * 预约成功
     * @param numPassword
     */
    mixin_alert_book_succeed(numPassword) {
      this.$weuijs.confirm(
        '<span class="fs15">您的取号密码是</span>'
        +numPassword
        // +'<span class="fs15 color_main">{{numPassword}}</span></br>'
        +'</br><span class="fs12">您可以前往[个人中心]查看预约记录</span>',
        {
          isAndroid: false,
          title: "预约成功",
          buttons: [
            {
              label: '我知道了'
            }
          ]
        })
    },


    },
  };

