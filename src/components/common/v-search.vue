<template>
  <div class="weui-search-bar" :class="[focus?'weui-search-bar_focusing':'']" id="searchBar">
    <form class="weui-search-bar__form" action="javascript:return true" @submit.prevent="sub">
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" v-model="key" @keyup.13="search" @blur="handler('cancel')"
               id="searchInput"
               :placeholder="placeholder" required="">
        <a href="javascript:" class="weui-icon-clear" id="searchClear" @click="handler('clear')"></a>
      </div>
      <label class="weui-search-bar__label" id="searchText" @click="handler('focus')"
             style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
        <i class="weui-icon-search"></i>
        <span>{{placeholder}}</span>
      </label>
    </form>
    <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" @click="handler('cancel')">取消</a>
  </div>
</template>
<script>
  /**
   * 搜索组件，用在搜索页
   * props
   * **** placeholder
   *
   * events
   * **** search(key)
   */
  export default {
    name: "v-search",
    props: {
      placeholder: {
        type: String,
        default: '搜索'
      }
    },
    data() {
      return {
        key: "",
        focus: false
      }
    },
    methods: {
      handler(type) {
        const $searchInput = document.getElementById('searchInput')

        switch (type) {
          case 'focus':
            this.focus = true;
            $searchInput.focus();
            break;
          case "clear":
            $searchInput.focus();
            this.key = "";
            break;
          case "cancel":
            this.focus = false;
            $searchInput.blur();
            break;
        }


      },

      search() {
        this.$emit('search', this.key);
      },

      sub() {
        return false;
      }
    }
  }
</script>

<style scoped>

</style>
