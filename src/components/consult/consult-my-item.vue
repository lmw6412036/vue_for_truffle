<template>
	<div class="pt30 pb30 pl28 pr28 bg_fff mb20">
		<div class="flex">
			<span class="color_333">团队咨询</span>
			<span class="color_666 flex1 ml30">￥{{consultPrice}}</span>
			<span :class="statusClsName">{{consultStatus}}</span>
		</div>
		<p class="color_888 mt20 mb20">
			吾问无为谓吾问无为谓我我我我吾问无为谓吾问无为谓我我我我吾问无为谓吾问无为谓我我我我吾问无为谓吾问无为谓我我我我吾问无为谓吾问无为谓我我我我吾问无为谓吾问无为谓我我我我
		</p>
		<div class="flex space-between">
			<div class="w_h220 bg_999"></div>
			<div class="w_h220 bg_999"></div>
			<div class="w_h220 bg_999"></div>
		</div>
		<div class="flex color_999 mt20">
			<span class="flex aic flex1" v-if="docName">
				<span class="mr20 w_h30 radius50 bg_green inline-block"></span>
				<span>{{docName}}</span>
			</span>
			<span class="flex1" v-else>暂无医生回答</span>
			<span class="mr20">1小时前</span>
			<span>|</span>
			<span class="ml20">2条回复</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'consult-my-item',
	props: {
		/**
		 * status 咨询状态
		 * docName 医生名称
		 * consultPrice 咨询价格
		 */
		status: String,
		docName: String,
		consultPrice: {
			type: Number,
			default: 0	
		}
	},
	computed: {
		consultStatus () {
			const list = ['代付款', '待处理', '进行中', '待评价', '已评价']
			return list[this.status]
		},
		statusClsName () {
			const list = ['orange', 'main', 'main', 'main', '999']
			const name = list[this.status]
			return `color_${name}`
		}
	}
}
</script>

<style  lang="scss" scoped>
	$greenColor: #29ab91;
	.bg_green {
		background-color: $greenColor;
	}
  @import "../../style/public";
	p {
		@include lines(2);
	}
	.w_h30 {
		@include w_h(30px)
	}
	.w_h220 {
		@include w_h(220px)
	}
</style>