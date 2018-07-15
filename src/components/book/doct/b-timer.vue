<template>
  <ul class="week flex bg_fff">
    <li @click="giveTime(o,i)" v-for="(o,i) in weekArr" :key="i" :class="[{bl:i>0},{color_main:showIndex==i}]"
        class="lh12 pt20 pb20 center color_666" :style="[{width:`${100/dateLength}%`}]">
      <p class="fs13">{{o.week}}</p>
      <p class="fs13">{{o.date}}</p>
    </li>
  </ul>
</template>

<script>
  import T from 'lmw-time-format'
  import {week} from 'ty-vue-filters'

  /**
   *
   * props
   * **** dateLength 几天
   * **** hasToday 是否包含当天 0包含，1不包含
   * events
   * **** reSelectByNum({value,week,date})
   */
  export default {
    name: 'b-timer',
    data() {
      return {
        weekArr: [],
        time: 0,
        showIndex: 0,
      };
    },
    props: {
      dateLength: {
        type: Number,
        default: 7
      },
      hasToday: {
        type: Number,
        default: 1
      }
    },

    created() {
      this.make();
    },
    watch: {
      showIndex: {
        handler(newV) {
          this.emit(newV)
        },
        immediate: true
      }
    },

    methods: {
      emit(index) {
        let {weekArr} = this;
        if (weekArr && weekArr.length > 0) {
          this.$emit('reSelectByNum', weekArr[index]);
        } else setTimeout(() => {
          this.emit(index)
        }, 20);
      },
      make() {
        let now = new Date().getTime();
        this.weekArr = new Array(this.dateLength).fill(0).map((r, i) => {
          let t = now + (i + this.hasToday) * 24 * 3600 * 1000;
          return {
            week: week(T(t, "%w")),
            date: T(t, "%m-%d"),
            value: T(t, "%Y%m%d")
          }
        });
      },

      giveTime(item, index) {
        this.showIndex = index;
        //this.$emit('reSelectByNum', item.value);
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
