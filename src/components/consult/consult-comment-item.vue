<template>
	<div class="flex pt30 pb30 pl30 pr30 bg_fff">
	  <v-ava class="mr20 flex0">
	    <img src="../../assets/img/doctorM.png" class="w_h50" alt="" slot="error">
	  </v-ava>
	  <div class="flex1 color_999">
	    <div class="flex h_lh50">
	      <span class="color_333 mr20">{{docName}}</span>
	      <span class="mr20">{{hospitalName}}</span>
	      <span>|</span>
	      <span class="ml20">{{deptName}}</span>          
	    </div>
	    <div class="mt5 mb5">{{createTime}}</div>
	    <p class="color_333 sr" v-if="consultContent">{{consultContent}}</p>
			<div v-if="mediaSrc" class="mt20 media-audio bg_main radius40 relative color_fff pl30 pr30 h_lh80 aic flex" @click.capture.self="playAudio">
				<img class="flex0 w_h_icon" src="../../assets/img/audio.png" alt="" />
				<span class="flex1 right">2'30"</span>
				<!-- <audio class="audio-media"  :src="mediaSrc">该浏览器不支持audio属性</audio> -->
			</div>
	  </div>
	</div>
</template>
<script>
import VAva from "../common/v-ava";
export default {
	name: 'consult-comment-item',
	components: {VAva},
	props: {
		/**
		 * deptName 科室名称
		 * createTime 评论时间
		 * consultContent 咨询内容
		 * docName 医生名称
		 * hospitalName 医院名称
		 */
		deptName: String,
		createTime: String,
		consultContent: String,
		docName: String,
		hospitalName: String,
		mediaSrc: String
	},
	methods: {
		playAudio (item) {
			// 目标元素
			const target = event.target
			console.log(target)
			if (target.className.indexOf('media-audio')) {
				
			}
			/*const audioMedia = target.querySelector('.audio-media')
			if (audioMedia.error) {
				this.$vux.toast.text('音频无法正常播放')
				return false
			}
			if (audioMedia.paused) {
				audioMedia.play()
			} else {
				audioMedia.pause()
			}*/
			// // 保存点击的语音状态
			// const status = item.puased
			// // 把其余语音状态置为false
			// this.value.forEach(el => {
			// 	el.puased = true
			// })
			// item.puased = !status
			// // 为audio元素绑定暂停事件
			// audioMedia.addEventListener('pause', function () {
			// 	item.puased = true
			// 	// 重置当前播放时间
			// 	audioMedia.currentTime = 0
			// }, {once: true})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../style/public";
.w_h50 {
  @include w_h(50px);
}
.w_h_icon {
  @include w_h(21px, 30px);	
}
.media-audio {
	@include w_h(300px, 80px);
  &:before {
  	border-left: 30px solid transparent;
    left: -20px;
    transform: rotate(10deg);
    transform-origin: 30px 30px;
		position: absolute;
		top: 8px;
		content: '';
		width: 0;
		height: 0;
		border-top: 30px solid $mainColor;
  }
}
.sr {
  @include lines(2);
}
.h_lh80 {
  @include h_lh(80px);  
}
</style>