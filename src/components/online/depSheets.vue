<template>
  <div>
    <transition name="fade">
      <div v-if="showTag" @click.stop="hide" class="mask fixed rgba5 t0 r0 l0 b0"></div>
    </transition>

    <transition name="fade">
      <div v-if="showTag" class="chooseBox flex main fixed l0 r0 b0 bg2 overflow-y-auto">

        <div class="leftDep">
          <ul class="relative left bg2" v-for="(item,i) in list" :key="i">
            <li class="leftLi  bg2 color_999" :class="[{hover:index==i}]" @click="index=i">
              <p class="ml40">{{item.deptName}}</p>
            </li>
          </ul>
        </div>

        <div class="rightRoom bg_fff">
          <ul v-for="item in sons" class=" fs15 color_333">
            <li class="rightItem pl30 bg_fff" @click="handle(item)">
              <p>{{item.ksmc}}</p>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  /*
  * props
  *
  * events
  * **** saveksid
  *
  * methods
  * show()
  *
  * */
  import {HOSID} from "../../lib/config";

  export default {
    name: "depSheets",
    props: {},
    data() {
      return {
        index: 0,
        list: [],
        showTag: false,

      }
    },
    computed: {
      sons() {
        let {index, list} = this;
        if (list.length > 0) {
          let sons = list[index].yyghYyksList;
          return sons;
        } else {
          return []
        }
      }
    },

    async created() {
      let {index} = this;
      let {code, list} = await this.getList(HOSID);
      if (code == 0) {
        this.list = list;
        let arr={deptCode:'00',deptName:'全部科室',yyghYyksList:[{ksid:'00',ksmc:'全部科室'}]};
        this.list.unshift(arr);
        this.$emit('saveksid',list[index].yyghYyksList[0])
      }
    },

    methods: {
      async getList(hosId) {
        return await this.$http('smarthos.yygh.ApiDepartmentService.oneClassDepartmentList', {hosId})
      },

      async show() {
        this.showTag = true;
      },
      hide() {
        this.showTag = false;
      },

      handle(data) {
        this.$emit('saveksid', data);
        this.hide()
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  $h: 45*2px;

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    transform: translateY(100%);
  }

  .mask {
    z-index: 10000;
  }

  .main {
    z-index: 11000;
    top: 40vh;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .leftDep {
    width: 125*2px;
    display: block;
    background-color: $bgColor2;
  }

  .leftLi {
    width: 125*2px;
    height: $h;
    line-height: $h;
    box-sizing: border-box;
    p {
      width: 90*2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .leftLi.hover {
    color: $mainColor;
    border-left: 6px solid $mainColor;
    background-color: #ffffff;
  }

  .rightItem {
    height: $h;
    line-height: $h;
    p {
      width: 251*2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

</style>
