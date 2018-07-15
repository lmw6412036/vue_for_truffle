/**
 * 医院列表相关mixin
 * @type {{data(): *, created(): void, methods: {getList(): Promise<void>}}}
 */
export const hosMixin = {
  data() {
    return {
      mixin_hos_list: [],
      mixin_hos_index: 0
    }
  },

  computed: {
    mixinCurrHos() {
      let hos = this.mixin_hos_list.length > 0 ? this.mixin_hos_list[this.mixin_hos_index] : {};
      this.setForm && this.setForm('mixin_hos_index', hos);
      return hos;
    }
  },
  created() {
    this.mixin_hos_get_book_list();
  },
  methods: {
    mixin_hos_choose() {
      let menus = [...this.mixin_hos_list].map((r, i) => {
        return {
          label: r.yymc,
          onClick: () => {
            this.mixin_hos_index = i;
          }
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
    async mixin_hos_get_book_list() {
      let {code, list = []} = await this.$http('smarthos.yygh.ApiHospitalService.areaHosList', {})
      if (code == 0) {
        this.mixin_hos_list = list;
      }
    }
  }
}
