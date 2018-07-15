<template>
  <div class='selectBtn relative'>
    <div class="allRoom  fs15 color_999 relative flex">
      <div class="allR center" @click="showSheet">
        {{form.deptName|mb_substr(4)||'全部科室'}}
        <img class="pl13 pb6" src="../../assets/img/online/bottom-arrow.png">
      </div>
    </div>
    <div class="vtime overflow-x-auto overflow-y-hidden">
      <ul class="time flex">
        <li class="selectData">
          <div class="datali color_aaa "
               :class="showIndex === 100 ? 'show' : ''"
               @click="allDate">
            <P class="fs14 pt5 pb0">不限</P>
            <p class="fs14 pb6 pt0">日期</p>
          </div>
        </li>

        <li class="datali selectData flex" v-for="(item,index) in dateArray" :key="index">
          <div class="color_aaa"
               @click="saveTime(item,index)"
               :class="showIndex === index ? 'show' : ''">
            <P style="font-size: 15px" class="pt5 pb0 mb0">{{item.week}}</P>
            <p style="font-size: 11px" class="pb4 pt0 mt0">{{item.date}}</p>
          </div>
        </li>
      </ul>
    </div>


  </div>



</template>

<script>

  import timeF from 'lmw-time-format'
  import {week} from 'ty-vue-filters'

  export default {
    name: 'v-timer',
    props:{
      form:{
        type:Object,
      }
    },
    data() {
      return {
        time: 0,
        year: '',
        date: '',
        dateArray: [],
        showIndex: 100,
      };
    },

    created() {
      this.getDateArr();
    },

    filters: {
      mb_substr(str, length) {
        if (!str) return "";
        if (str.length > length) {
          return str.substr(0, length-1) + '...'
        } else return str;
      }
    },
    methods: {
      /**
       * 获取从当天开始往后七天
       */
      getDateArr() {
        let dateArray = [];
        let now = new Date().getTime();
        for (let i = 1; i < 8; i++) {
          let t = now + i * 24 * 3600 * 1000,
            w = timeF(t, '%w');
          dateArray.push({
            value: timeF(t, '%Y%m%d'),
            date: timeF(t, '%m-%d'),
            week: week(w)
          })
        }
        this.dateArray = dateArray;
      },

      allDate() {
        this.showIndex = 100;
        this.$emit('getDocArr');
      },

      saveTime(item, index) {
        this.showIndex = index;
        this.$emit('getTodayDocArr', item.value);
      },

      showSheet(){
        this.$emit('showSheets')
      },
    }
  };
</script>

<style scoped lang="scss">

  .selectBtn {
    height: 40*2px;
    width: 375*2px;
    letter-spacing: 0;
    border-bottom: 1px solid #E1E9F0;
    position: sticky;
    .allRoom {
      float: left;
      width: 109*2px;
      height: 40*2px;
      background-color: #fff;
      display: inline-block;
      .allR {
        height: 40*2px;
        line-height: 40*2px;
      }
    }

    li {
      list-style-type: none;
      height: 40*2px;
      display: inline-block;
      border-right: 1px solid #E1E9F0;
      width: 55*2px;
      text-align: center;
      line-height: 35px;
    }

    .tip1 {
      letter-spacing: 2px;
      height: 40*2px;
    }
    .tip {
      float: top;
      margin-top: -2px;
    }
    .selectData :hover, .tip :hover {
      background-color: #F3F6F9;
      color: #666666;
    }
    .selectData {
      p {
        height: 40px;
      }
    }
  }

  .time {
    height: 40*2px;
  }

  .timer {
    height: 40*2px;
  }

  .vtime {
    width: 265*2px;
    height: 40*2px;
    float: left;
    display: block;
  }

  .selectData {
    p {
      height: 37px;
    }
  }

  .datali {
    width: 54*2px;
    height: 40*2px;
  }

  ul {
    width: 8*54*2px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: #fff;
  }

  li {
    width: 54*2px;
    float: left;
    border-left: 0.5px solid #E1E9F0;
    border-right: 0.5px solid #E1E9F0;
    display: block;
    text-align: center;
    text-decoration: none;
  }

  .color_aaa {
    height: 40*2px;
    line-height: 40px;
  }

  /*鼠标移动到选项上修改背景颜色 */
  .color_aaa:hover, .show {
    background-color: #F3F6F9;
    color: #666666;
  }
</style>
