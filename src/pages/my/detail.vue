<template>
  <div class="page flex column">
    <v-header class="flex0">{{info.commpatName}}的资料</v-header>
    <div class="flex1 overflow-y-auto">
      <ul>
        <li v-if="info.self" class="flex bg_fff pl30 pr30 pt20 pb20">
          <div class="label flex0 fs16 color_333">头像</div>
          <div class="text flex1 right" @click="handler('upload')">
            <img v-if="pat.patAvatar" class="ava radius50" :src="pat.patAvatar" alt="">
            <img v-else class="ava radius50" src="../../assets/img/my/pat-f.png" alt="">
          </div>
          <font class="icon flex0 ml10">&#xe7d5;</font>
        </li>
        <div class="pl30 pr30 pt15 pb15 fs14 color_444">个人信息</div>
        <li class="flex bg_fff pl30 pr30 pt20 pb20" @click="handler('edit','name',info.commpatName,'patName')">
          <div class="label flex0 fs16 color_333">姓名</div>
          <div class="text flex1 color_999 fs16 right">
            {{info.commpatName}}
          </div>
          <font class="icon flex0 ml10">&#xe7d5;</font>
        </li>
        <li class="flex bg_fff pl30 pr30 pt20 pb20 bt" @click="handler('edit','idcard',info.commpatIdcard,'patIdcard')">
          <div class="label flex0 fs16 color_333">身份证</div>
          <div class="text flex1 color_999 fs16 right">
            {{info.commpatIdcard}}
          </div>
          <font class="icon flex0 ml10">&#xe7d5;</font>
        </li>
        <li class="flex bg_fff pl30 pr30 pt20 pb20 bt" @click="handler('mobile','pat',info.commpatMobile)">
          <div class="label flex0 fs16 color_333">手机号</div>
          <div class="text flex1 color_999 fs16 right">
            {{info.commpatMobile}}
          </div>
          <font class="icon flex0 ml10">&#xe7d5;</font>
        </li>
        <li class="flex bg_fff pl30 pr30 pt20 pb20 bt">
          <div class="label flex0 fs16 color_333">年龄</div>
          <div class="text flex1 color_999 fs16 right">
            {{info.commpatIdcard|getAgeFromIdCard}}
          </div>
          <font class="icon flex0 ml10">&nbsp;</font>
        </li>
        <li class="flex bg_fff pl30 pr30 pt20 pb20 bt">
          <div class="label flex0 fs16 color_333">性别</div>
          <div class="text flex1 color_999 fs16 right">
            {{info.commpatGender|sex(2)}}
          </div>
          <font class="icon flex0 ml10">&nbsp;</font>
        </li>
        <li class="flex bg_fff pl30 pr30 pt20 pb20 bt" @click="handler('area')">
          <div class="label flex0 fs16 color_333">所在地区</div>
          <div class="text flex1 color_999 fs16 right">
            {{info.areaName}}
          </div>
          <font class="icon flex0 ml10">&#xe7d5;</font>
        </li>
        <li class="flex bg_fff pl30 pr30 pt20 pb20 bt" @click="handler('ship')">
          <div class="label flex0 fs16 color_333">与我关系</div>
          <div class="text flex1 color_999 fs16 right">
            {{info.self?'本人':info.relationship}}
          </div>
          <font class="icon flex0 ml10">&#xe7d5;</font>
        </li>
        <div class="pl30 pr30 pt15 pb15 fs14 color_444">医院账号</div>

        <ul>
          <li class="hoslis flex bg_fff pl30 pr30 pt20 pb20 fs16" v-if="o.compatRecord"
              v-for="o in info.userCommonPatRecords">
            <p>衢州市人民医院</p>
            <p class="color_999">{{o.compatRecord}}</p>
          </li>
        </ul>

        <router-link
          :to="{path:'/account/record/create',query:{commpatId:info.id}}" tag="div"
          class="center color_main fs16 pt20">
          +添加医院账号
        </router-link>
      </ul>
    </div>
    <v-upload ref="upload" @status="uploadStatus" @success="uploadSuccess"
              :data="{module:'PAT',fileType:'IMAGE'}"></v-upload>
  </div>
</template>

<script>
  import {relationShip} from "../../lib/config";
  import {getAgeFromIdCard, sex} from 'ty-vue-filters'
  import VUpload from "../../components/common/v-upload";
  import {isLoginMixin} from "../../mixins/isLogin";
  import {commpatListMixin} from "../../mixins/commpatList";
  import getArea from '../../lib/formatArea'

  export default {
    filters: {getAgeFromIdCard, sex},
    components: {VUpload},
    mixins: [isLoginMixin, commpatListMixin],
    data() {
      return {
        info: {}
      }
    },

    computed: {
      pat() {
        if (this.user) {
          return this.user.pat;
        } else {
          return {}
        }
      }
    },

    async created() {
      await this.mixin_is_login();
      this.info = this.$cache.get('patInfo');
      await this.initData();
    },

    methods: {
      async initData() {
        await this.mixin_get_commpat_ist();
        this.commpatList.forEach(r => {
          if (r.id == this.$route.query.id) {
            this.info = r;
          }
        })
      },

      async modify(service, form) {
        let {code, msg, obj} = await this.$http(service, form);
        code != 0 && (bus.$emit('msg', msg));
        if (code == 0) {
          this.$weuijs.toast('修改成功', {
            callback: () => {
              this.initData()
            }
          });
        }
      },


      async uploadSuccess(data) {
        if (data.response) {
          let {code} = await this.$http('smarthos.user.pat.infomation.modify', {
            patAvatar: data.response.attaFileUrl
          });
          if (code == 0) {
            this.mixin_is_login();
          }
        }
      },
      uploadStatus(data) {
        if (data == 'started') {
          this.loading = this.$weuijs.loading('上传中...');
        }
        if (data == 'ended') {
          this.loading.hide();
        }
      },

      hasBind(info) {
        if (info.userCommonPatRecords && info.userCommonPatRecords.length > 0) {
          this.$weuijs.alert('已绑定病案号，资料不可更改');
          return true;
        }
        return false;
      },

      handler(type, mode, value, field) {
        let commpatId;
        let {info} = this;
        let service = 'smarthos.user.pat.infomation.modify';
        switch (type) {
          case "ship":
            if (!info.self) {
              service = 'smarthos.user.commpat.infomation.modify';
              commpatId = info.id;
              let menus = relationShip.map(r => {
                return {
                  label: r,
                  onClick: () => {
                    this.modify(service, {
                      commpatId,
                      relationship: r
                    })
                  }
                }
              });
              this.$weuijs.actionSheet(menus,
                [{label: '取消'}], {isAndroid: false})
            }
            break;
          case "area":
            let area = getArea(), defaultValue = getArea(info.areaCode)
            if (!info.self) {
              service = 'smarthos.user.commpat.infomation.modify';
              commpatId = info.id;
            }

            this.$weuijs.picker(area, {
              defaultValue,
              onConfirm: (res) => {
                Log('res', res);
                this.modify(service, {
                  commpatId,
                  areaCode: res[2].value
                });
              }
            });
            break;
          case "mobile":
            if (this.hasBind(info)) {
              return false;
            }

            if (!info.self) {
              mode = 'commpat';
              commpatId = info.id
            }

            this.$router.push({
              path: '/my/pat/mobile',
              query: {step: 1, type: mode, value, commpatId}
            })
            break;
          case "upload":
            this.$refs.upload.start();
            break;
          case "edit":
            if (mode == 'idcard') {
              if (this.hasBind(info)) {
                return false;
              }
            }
            if (!info.self) {
              service = 'smarthos.user.commpat.infomation.modify';
              commpatId = info.id;
              switch (field) {
                case "patName":
                  field = 'commpatName';
                  break;
                case "patIdcard":
                  field = 'commpatIdcard';
                  break;
              }
            }
            this.$router.push({
              path: '/my/edit',
              query: {type: mode, service, value, field, commpatId}
            })
            break;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/public";

  .ava {
    @include w_h(100px);
  }

  li {
    align-items: center;
  }

  .hoslis {
    justify-content: space-between;
  }
</style>
