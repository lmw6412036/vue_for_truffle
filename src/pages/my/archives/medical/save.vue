<template>
  <div class="page">
    <v-header>
      <span @click="sub" slot="right" class="right color_main pr30 absolute">保存</span>
      {{title}}
    </v-header>
    <div class="main bg_fff">
      <div class="flex color_333 fs15 pl30 pr30 pt25 pb25 aic">
        <label class="flex0">日期</label>
        <span class="flex1 right" @click="handler('time')">{{form.medicalTime}}</span>
        <font class="fs13 ml10 color_999">&#xe7d5;</font>
      </div>
      <div class="flex fs15 bt pl30 pr30 pt25 pb25">
        <label class="flex0">请输入病历详情</label>
        <span class="flex1 right">{{form.medContent?form.medContent.length:0}}/500</span>
      </div>
      <div class="flex bt pl30 pr30 pt25 pb25">
        <textarea v-model="form.medContent" class="fs15 flex1" maxlength="500" rows="5" placeholder="请输入"></textarea>
      </div>
      <piclist-uploader @ended="ended" :filelist="files"></piclist-uploader>
    </div>

    <a href="javascript:;" @click="del" v-if="$route.query&&$route.query.id"
       class="weui-btn weui-btn_warn ml30 mt30 mr30">删除</a>
  </div>
</template>

<script>
  import T from 'lmw-time-format'
  import PiclistUploader from "../../../../components/common/piclist-uploader";

  export default {
    name: "save",
    components: {PiclistUploader},
    data() {
      return {
        files: [],
        info: {},
        form: {}
      }
    },

    computed: {
      title() {
        let {$route: {query}} = this;
        if (query && query.id) return "编辑病历"
        else return "添加病历"
      }
    },

    created() {

      let {$route: {query}} = this;
      if (query && query.id) {
        this.info = this.$cache.get('medicalDetail');
        let {medicalHistory, attaList} = this.info;
        this.$set(this.form, 'medicalTime', T(medicalHistory.medicalTime, '%Y-%m-%d'));
        if (attaList && attaList.length > 0) {
          this.files = attaList;
          this.$set(this.form, 'attaList', [...attaList].map(r => r.id));
        }


        medicalHistory.medContent && this.$set(this.form, 'medContent', medicalHistory.medContent);
      } else this.$set(this.form, 'medicalTime', T(new Date(), '%Y-%m-%d'));
    },
    methods: {
      async del() {
        this.$weuijs.confirm('是否删除该病历？', async () => {
          let {code} = await this.$http('smarthos.medical.history.delete', {
            id: this.$route.query.id
          })
          if (code == 0) {
            this.$weuijs.toast('删除成功', {
              callback: () => {
                this.$router.back();
              }
            })
          }
        })
      },

      async sub() {
        let {form, $route: {query}} = this;
        let service = "";

        if (!form.medContent && !form.attaList) {
          bus.$emit('msg', '内容或图片至少填一个')
          return false;
        }

        if (query && query.id) {
          form.id = query.id;
          service = 'smarthos.medical.history.modify';
        } else service = 'smarthos.medical.history.add';


        let {code, msg} = await this.$http(service, form);
        code != 0 && bus.$emit('msg', msg);
        if (code == 0) {
          this.$weuijs.toast('保存成功', {
            callback: () => {
              this.$router.back();
            }
          })
        }
      },

      ended(list) {
        let attaList = [...list].map(r => r.response.id);
        this.$set(this.form, 'attaList', attaList);
      },

      handler(type) {
        let {form} = this;
        switch (type) {
          case 'time':
            this.$weuijs.datePicker({
              defaultValue: form.medicalTime.split('-'),
              onConfirm: (res) => {
                this.$set(this.form, 'medicalTime', res.map(r => r.value).map((r, i) => {
                  if (i == 1) return r < 10 ? `0${r}` : r;
                  else return r;
                }).join('-'));
              }
            });
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
