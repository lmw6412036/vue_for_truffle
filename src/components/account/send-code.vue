<template>
  <button class="weui-vcode-btn" @click="send">{{text}}</button>
</template>

<script>
  import Validate from 'ty-light-validate'

  const INIT_TIME = 60;
  /**
   * props
   * **** mobile
   * **** service
   * events
   * **** ok
   */
  export default {
    name: "send-code",
    props: {
      id: String,
      data: {type: Object},
      service: String,
      nomobile: {
        type: Boolean,
        default: false
      },
      mobile: [String, Number]
    },
    data() {
      return {
        t: INIT_TIME
      }
    },
    computed: {
      text() {
        return this.t !== INIT_TIME ? `${this.t}s后重发` : '获取验证码'
      }
    },

    created() {
      this.timer = null;
    },

    methods: {
      async send() {
        let {t, mobile, service} = this;
        if (t == INIT_TIME) {
          let Validater = new Validate();

          Validater.add(mobile, [
            {type: 'isMobile', error: '手机号格式不正确'}
          ]);

          Validater.add(service, [
            {type: 'required', error: 'service不能为空'}
          ]);

          let error = Validater.run();

          if (error && !this.nomobile) {
            bus.$emit('msg', error);
            return false;
          }

          let options = {mobile};
          if (this.data) {
            options = Object.assign({}, options, this.data);
          }

          let {code, obj, msg} = await this.$http(service, options);
          if (code == 0) {
            Log('code', {...obj});
            if (obj.value) delete obj.value;
            this.$emit('ok', obj);
            this.cutdown();
          } else bus.$emit('msg', msg || `code:${code}`);
        }
      },

      cutdown() {
        let {t} = this;
        if (t > 0) {
          this.t--;
          this.timer = setTimeout(this.cutdown, 1000);
        } else {
          this.t = INIT_TIME;
        }
      }
    },

    watch: {
      id() {
        clearTimeout(this.timer);
        this.timer = null;
        this.t = INIT_TIME;
      }
    }
  }
</script>

<style scoped>

</style>
