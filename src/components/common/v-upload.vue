<template>
  <input @change="change" class="fixed b0 l0" ref="file" type="file" :multiple="multiple" :accept="accept">
</template>

<script>
  /**
   * props
   * **** multiple Bool
   * **** accept String
   * **** limit Number
   * **** data Object 其他参数
   *
   * methods
   * **** start
   *
   * events
   * **** error
   * **** status
   * **** progress
   * **** success
   * **** scaned
   */

  import {readFile} from "../../lib/utils";
  import uploadAjax from '../../lib/uploadAjax'

  export default {
    name: "v-upload",
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: "image/*"
      },
      limit: {
        type: Number,
        default: 0
      },
      data: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },

    data() {
      return {
        queueList: []
      }
    },

    methods: {
      start() {
        let fileInput = this.$refs.file;
        fileInput.click();
      },

      async change() {
        let {limit} = this;
        let fileInput = this.$refs.file,
          files = fileInput.files;
        if (limit && files.length > limit) {
          this.$emit("error", "还能上传 " + limit + ' 张');
          return false;
        } else {
          this.$emit("status", "started");
          await this.doQueue(files);
          this.$emit("status", "loading");
          await this.doUpload(files);
          this.$emit("status", "ended");
        }
      },

      async doQueue(files) {
        for (let i = 0, l = files.length; i < l; i++) {
            let file = files[i];
            this.$emit('queued', file);
            this.queueList.push({
            file: file,
          });
          try {
            let res = await readFile(file);
            let obj = {
              file: file,
              result: res
            };
            this.$emit('scaned', obj);
            this.changeQueueList(obj);
          } catch (e) {
            this.$emit('error', e);
          }


        }
      },

      async doUpload(files) {
        for (let i = 0, l = files.length; i < l; i++) {
          let file = files[i];
          let {code, obj, msg} = await uploadAjax(file, Object.assign({}, this.data, {
            progress: data => {
              this.progress(data, file)
            }
          }));
          code != 0 && (bus.$emit('msg', msg));
          if (code == 0) {
            let d = {
              file: file,
              response: obj
            };
            this.$emit('success', d);
            this.changeQueueList(d);
          }
        }
      },

      progress(data, file) {
        Log('progress', data);
        let obj = {
            file: file,
            progress: {
              loaded: data.loaded,
              total: data.total,
              progress: data.loaded / data.total
            }
          }
        ;
        this.$emit('progress', obj);
        this.changeQueueList(obj)
      },

      changeQueueList(data) {
        let index = this.queueList.findIndex(r => r.file == data.file);
        if (index >= 0) {
          data = Object.assign({}, this.queueList[index], data);
          this.queueList.splice(index, 1, data);
        } else {
          this.queueList.push(data);
        }
      }
    }
  }
</script>

<style scoped>
  input {
    opacity: 0;
    height: 0;
    width: 0;
  }
</style>
