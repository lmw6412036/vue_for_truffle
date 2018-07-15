<template>
  <div class="weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
              <li v-if="list.length>0" class="weui-uploader__file" @click="scan(o)"
                  :class="[{'weui-uploader__file_status':(o.progress&&o.progress.progress<1)||!o.progress}]"
                  :style="{backgroundImage:'url('+o.result+')'}" v-for="o in list">
                <div v-if="o.progress&&o.progress.progress<1" class="weui-uploader__file-content">
                  {{(o.progress.progress*100).toFixed(2)}}%
                </div>
              </li>
            </ul>
            <template v-if="limit>0">
              <div class="weui-uploader__input-box" @click="start"></div>
              <div class="text ml10 flex column aic ignore">
                <div><h4 class="fs15 color_333">添加图片</h4>
                  <p class="fs13 color_999">上传相关照片</p></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <v-upload ref="upload" :limit="limit" :data="{module:'MEDICAL',fileType:'IMAGE'}" :multiple="true"
              class="fixed b0 l0"
              @error="error"
              @queued="queued"
              @scaned="scaned"
              @progress="progress"
              @success="success"
              @status="status"
    ></v-upload>
  </div>
</template>

<script>
  import VUpload from "./v-upload";

  const MAX = 9

  /**
   *
   * props
   * **** filelist [{attaFileUrl,id}]
   * events
   * **** ended
   */
  export default {
    name: "piclist-uploader",
    props: {
      filelist: Array
    },
    data() {
      return {
        list: []
      }
    },

    computed: {
      limit() {
        return MAX - this.list.length;
      }
    },

    components: {VUpload},
    created() {
      this.filelist && this.filelist.forEach(r => {
        this.list.push({
          response: {id: r.id},
          progress: {progress: 1},
          result: r.attaFileUrl
        })
      })

    },
    methods: {
      error(data) {
        Log('error', data);
        typeof data == "string" && bus.$emit('msg', data);
      },
      queued(data) {
        this.list.push(data);
      },
      scaned(data) {
        let index = this.list.findIndex(r => r.file == data.file);
        this.list.splice(index, 1, data);
      },
      progress(data) {
        let index = this.list.findIndex(r => r.file == data.file),
          item = this.list[index];
        item.progress = data.progress;
        this.list.splice(index, 1, item);
      },
      success(data) {
        let index = this.list.findIndex(r => r.file == data.file),
          item = this.list[index];
        item.response = data.response;
        this.list.splice(index, 1, item);
      },
      status(data) {
        data == "ended" && this.$emit('ended', this.list);
      },
      scan(data){
        this.$weuijs.gallery(data.result);
      },
      start() {
        this.$refs.upload.start();
      }
    }
  }
</script>

<style scoped>
  .ignore {
    height: 77px;
  }

  .text {
    justify-content: center;
    float: left;
  }
</style>
