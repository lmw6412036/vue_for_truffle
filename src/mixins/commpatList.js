export const commpatListMixin = {
  data() {
    return {
      commpatList: [],
      currPatIndex: 0,
      currJzkhIndex: 0,
    }
  },

  computed: {
    currPat() {
      let pat = this.commpatList.length > 0 ? this.commpatList[this.currPatIndex] : {};
      this.setForm && this.setForm('currPatIndex', pat);
      return pat;
    },
    jzkhList() {
      let currPat = this.currPat;
      if (currPat && currPat.userCommonPatRecords) {
        return currPat.userCommonPatRecords.filter(r => r.compatRecord)
      } else return [];
    },
    jzkh() {
      let re = "暂无", list = this.jzkhList;
      if (list.length > 0) {
        re = list[this.currJzkhIndex].compatRecord
      }
      this.setForm && this.setForm('jzkh', re);
      return re;
    }
  },

  created() {
    this.mixin_get_commpat_ist();
  },

  methods: {
    mixin_alert_bind_commpat_record() {
      this.$weuijs.confirm('该就诊人没有绑定医院帐号，无法使用该功能。请先绑定医院帐号。', {
        isAndroid: false,
        buttons: [
          {label: '不了', type: 'default'},
          {
            label: '去绑定', onClick: () => {
              let {currPat} = this;
              this.$router.replace({
                path: '/account/record/create',
                query: {commpatId: currPat.id},
              });
            }
          }
        ]
      })
    },


    /**
     * 选择常用就诊人
     */
    mixin_choose_commpat() {
      let menus = [...this.commpatList].map((r, i) => {
        return {
          label: r.commpatName,
          onClick: () => {
            this.currPatIndex = i;
          }
        }
      })

      menus.push({
        label: '添加就诊人',
        onClick: () => {
          this.$router.push('/my/pat/add')
        }
      })

      this.$weuijs.actionSheet(menus, [
        {
          label: '取消',
          onClick: () => {
          }
        },
      ], {isAndroid: false})
    },


    /**
     * 获得常用就诊人列表
     * @returns {Promise<void>}
     */
    async mixin_get_commpat_ist() {
      let {code, list} = await this.$http('smarthos.user.commpat.list', {});
      if (code == 0) {
        this.commpatList = list;
      }
    }
  }
}
