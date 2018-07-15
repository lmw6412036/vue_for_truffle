<template>
  <div class="filter bb bg_fff relative">
    <ol class="flex" ref="nav">
      <li class="flex0 center" v-for="(o,i) in filters" :key="i" :class="[{bl:i>0}]" @click="show(i)"
          :style="{width:100/filters.length + '%'}">
        <span class="color_333 fs16" :class="[currFilter==i?'color_main':'']">{{form[o+"Text"]|mbSubstr(5)}}</span>
        <font class="fs10 color_999 inline-block" :class="[currFilter==i?'color_main cover':'']">&#xe64f;</font>
      </li>
    </ol>
    <div class="wrap">
      <transition name="mask">
        <div v-if="currFilter>=0" class="mask rgba5 absolute l0 r0" :style="maskStyle" @click="hide"></div>
      </transition>
      <transition name="main">
        <div v-if="currFilter>=0" class="main flex absolute l0 r0 bg_fff overflow-hidden"
             :class="[{line:currFilter==0}]"
             :style="mainStyle">
          <!--dept-->
          <template v-if="currFilter==0">
            <ul class="dept flex0 overflow-y-auto">
              <li :class="[{color_main:currDept==i}]" class="pl30 pr30 pt25 pb25 fs16 color_333 bt"
                  @click="currDept=i"
                  v-for="(o,i) in depts" :key="i">{{o.deptName}}
              </li>
            </ul>
            <ul class="sons flex1 overflow-y-auto">
              <li class="pl30 pr30 pt25 pb25 fs16 color_333 bt" v-for="(o,i) in sons" :key="i"
                  @click.stop="handler(o)">{{o.deptName}}
              </li>
            </ul>
          </template>
          <!--type-->
          <ul class="sons flex1 overflow-y-auto" v-if="currFilter==1">
            <li class="pl30 pr30 pt25 pb25 fs16 color_333 center bt" v-for="(o,i) in types" :key="i"
                @click.stop="handler(o)">{{o.name}}
            </li>
          </ul>
          <!--sort-->
          <ul class="sons flex1 overflow-y-auto" v-if="currFilter==2">
            <li class="pl30 pr30 pt25 pb25 fs16 color_333 center bt" v-for="(o,i) in sorts" :key="i"
                @click.stop="handler(o)">{{o.name}}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mbSubstr} from 'ty-vue-filters'
  import {consult_sorts, consult_types} from "../../lib/config/consult";

  const FILTERS = ['dept', 'type', 'sort'];

  /**
   * 用于找医生 - 筛选框
   * events
   * **** change(form)
   */
  export default {
    name: "consult-filter",
    data() {
      return {
        maskStyle: {},
        mainStyle: {},
        filters: FILTERS,
        currFilter: -1,
        form: {},
        types: consult_types,
        sorts: consult_sorts,
        depts: [], currDept: 0
      }
    },

    computed: {
      sons() {
        let {depts, currDept} = this;
        return depts.length ? depts[currDept].subDeptList ? depts[currDept].subDeptList : [depts[currDept]] : [];
      }
    },

    filters: {mbSubstr},

    async created() {
      await this.getDept();
    },

    methods: {
      async getDept() {
        let {code, list} = await this.$http('smarthos.system.stddept.list', {
          deptLevel: 2,
          hasDept: true,
          hasDoc: true
        });
        if (code == 0) {
          this.depts = list;
          this.depts.unshift({
            id: '',
            deptName: '全部科室'
          })
        }
      },

      handler(data) {
        let {currFilter} = this,
          curr = FILTERS[currFilter];

        Log('data', data);

        this.$set(this.form, curr, data.id);
        if (currFilter == 0) {
          this.$set(this.form, `${curr}Text`, data.deptName);
        }
        else if (currFilter == 1 || currFilter == 2) {
          this.$set(this.form, `${curr}Text`, data.name);
        }
        this.$emit('change', this.form);
        this.hide();
      },

      hide() {
        this.currFilter = -1;
      },

      show(index) {
        if (this.currFilter >= 0) {
          this.hide();
          return;
        }

        this.currFilter = index;
        let pos = this.$refs.nav.getBoundingClientRect();
        let h = Math.min(window.innerHeight, screen.availHeight);
        this.maskStyle = {
          height: `${h - pos.height - pos.top}px`
        }
        this.mainStyle = {
          maxHeight: `${h - pos.height - pos.top - 100}px`
        }
      }
    },

    watch: {
      form: {
        handler(val) {
          !val.dept && (this.$set(this.form, 'deptText', '全部科室'));
          !val.type && (this.$set(this.form, 'typeText', '全部形式'));
          !val.sort && (this.$set(this.form, 'sortText', '默认排序'));
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  .mask-enter-active, .mask-leave-active {
    transition: all .3s;
  }

  .mask-enter, .mask-leave-to /* .mask-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .main-enter-active, .main-leave-active {
    transition: all .3s;
    transform-origin: 0% 0%;
  }

  .main-enter, .main-leave-to /* .main-leave-active below version 2.1.8 */
  {
    transform: scale(1, 0);
  }

  $h: 90px;

  .filter {
    height: $h;
  }

  .mask, .main {
    top: $h;
    z-index:10000;
    height: auto;
  }

  ol {
    li {
      @include h_lh($h);
    }
    font {
      transition: all 0.3s;
      &.cover {
        transform: rotate(-180deg);
      }
    }
  }

  .dept {
    width: 300px;
  }

  .line {
    &::after {
      content: "";
      position: absolute;
      left: 300px;
      top: 0;
      bottom: 0;
      display: block;
      border-left: 0.5px solid #ddd;
    }
  }


</style>
