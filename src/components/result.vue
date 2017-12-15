<template>
	<div class="result">
		<div class="score-wrapper">
			<div class="score">{{score}}分</div>
		</div>
		<div class="desc-wrapper">
			<div class="desc" :class="{dobuleline : !(score < 30 || (score >= 60 && score <= 69))}">{{desc}}</div>
		</div>
		<img src="../assets/images/qrcode-0.gif" alt="" class="qrcode" v-show="score >= 0 && score <= 29">
		<img src="../assets/images/qrcode-30.gif" alt="" class="qrcode" v-show="score >= 30 && score <= 59">
		<img src="../assets/images/qrcode-60.gif" alt="" class="qrcode" v-show="score >= 60 && score <= 69">
		<img src="../assets/images/qrcode-70.gif" alt="" class="qrcode" v-show="score >= 70 && score <= 89">
		<img src="../assets/images/qrcode-90.gif" alt="" class="qrcode" v-show="score >= 90 && score <= 99">
		<img src="../assets/images/qrcode-100.gif" alt="" class="qrcode" v-show="score === 100">
		
		<div class="botton-wrapper" v-show="!hasShareScore">
			<div class="btn btn1" @click="playAgain" :class="{active : btn1clicked}">{{txt1}}</div>
			<div class="btn btn2" @click="help" :class="{active : btn2clicked}">{{txt2}}</div>
		</div>
		<div class="guide" v-show="showGuide" @click="hideGuide">
			<img src="../assets/images/guide.png" alt="">
		</div>
		<div class="shareTxt" v-show="hasShareScore" :class="{top : (score >= 0 && score <= 29), bottom: !(score >= 0 && score <= 29)}">
			<div >2017大事件考试</div>
			<div>长按关注二维码</div>
			<div>立即参与</div>
		</div>
	</div>
</template>
<script>
import device from '../common/utils/device.js'
import getQueryString from '../common/utils/parseurl.js'
let shareScore = getQueryString('score')
/*eslint-disable no-undef*/
// 埋点
let deviceType
let softType
if (device.wnl) {
	softType = 'wnl'
}
if (device.weixin) {
	softType = 'wx'
}
if (device.ios) {
	deviceType = 'ios'
}
else {
	deviceType = 'android'
}
export default {
	data () {
		return {
			hasShareScore: false,
			btn1clicked: false,
			btn2clicked: false,
			showGuide: false
		}
	},
	created () {
		if (shareScore) {
			this.hasShareScore = true
		}
	},
	methods: {
		playAgain () {
			this.btn1clicked = true
			this.$emit('changeToindex')
			setTimeout(() => {
				this.btn1clicked = false
			}, 300);
			_czc.push(['_trackEvent', softType + '-不服再战点击-' + deviceType]);
		},
		help () {
			this.btn2clicked = true
			setTimeout(() => {
				this.btn2clicked = false
			}, 300);
			if (device.wnl) {
				window.wnlui.wnlShare.showSharePlatform();
			}
			else {
				this.showGuide = true
			}
			_czc.push(['_trackEvent', softType + '-分享点击-' + deviceType]);
		},
		hideGuide () {
			this.showGuide = false
		}
	},
	computed: {
		score () {
			if (shareScore) {
				return parseInt(shareScore)
			}
			return parseInt(this.$store.state.userScore)
		},
		desc () {
			if (this.score >= 0 && this.score <= 29) {
				return '你可能过了一个假的2017年...'
			}
			else if (this.score >= 30 && this.score <= 59) {
				return '有没有记住考点，你心里没点数吗？'
			}
			else if (this.score >= 60 && this.score <= 69) {
				return '跑过及格线，不怕你骄傲！'
			}
			else if (this.score >= 70 && this.score <= 89) {
				return '撸起袖子加油干！解锁更多姿势'
			}
			else if (this.score >= 90 && this.score <= 99) {
				return '好好学习天天向上，你就是三好学生！'
			}
			else if (this.score === 100) {
				return '你真厉害！万年历为你疯狂打call！'
			}
		},
		txt1 () {
			if (this.score === 100) {
				return '还要挑战'
			}
			else {
				return '不服再战'
			}
		},
		txt2 () {
			if (this.score === 100) {
				return '炫耀一下'
			}
			else if (this.score <= 99 && this.score >= 60) {
				return '呼唤朋友'
			}
			else {
				return '寻求帮助'
			}
		}
	}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
	.result
		.score-wrapper
			margin 58px auto 13px
			width calc(100% - 20px)
			height calc((100vw - 20px) * 0.338368580060423)
			background url('../assets/images/belt.png') center no-repeat
			background-size 100%;
			@media screen and (max-width 325px) {
				margin-bottom 0
			}
			.score
				text-align center
				margin-left 5%
				padding-top 3%
				font-size 60px
				letter-spacing 1.5px
		.desc-wrapper
			margin 0 auto
			width 276px
			height 72px
			background url('../assets/images/duihuak1.png') center no-repeat
			background-size 100%
			@media screen and (min-height 700px) {
				margin 10px auto 20px 
			}
			.desc
				text-align center
				padding 7% 5px 0 5px
				font-size 19px
				letter-spacing 0.2px
				line-height 1.2
				&.dobuleline
					text-align justify
					padding 3% 20px 0 20px
		.qrcode
			display block
			margin 0 auto
			width 53.6%
		.botton-wrapper
			margin-top 10px
			display flex
			justify-content space-around
			@media screen and (max-width 325px) {
				margin-top 5px
			}
			.btn
				width 141px
				height 70px
				text-align center
				line-height 58px
				font-size 21.4px
			.btn1
				background url('../assets/images/again.png') center no-repeat
				background-size 100%;
				&.active
					background url('../assets/images/again-after.png') center no-repeat
					background-size 100%;
			.btn2
				color #ffffff
				-webkit-text-stroke 1.5px #000000
				background url('../assets/images/help.png') center no-repeat
				background-size 100%;
				&.active
					background url('../assets/images/help-after.png') center no-repeat
					background-size 100%;
		.guide
			position fixed
			top 0
			left 0
			width 100%
			height 100%
			background-color #000
			opacity 0.7
			text-align right
			img
				margin-right 30px
		.shareTxt
			text-align center
			font-size 18px
			&.top
				@media screen and (min-width: 325px) {
					margin-top 15px
				}
				@media screen and (min-height 700px) and (max-height 736px) {
					margin-top 35px 
				}
				@media screen and (min-height 737px) {
					margin-top 50px
				}
			&.bottom
				@media screen and (min-width: 325px) {
					margin-top 40px
				}
				@media screen and (min-height 700px) and (max-height 736px) {
					margin-top 50px 
				}
				@media screen and (min-height 737px) {
					margin-top 50px
				}
			div
				margin-top 7px
/* iphone4、5*/
@media screen and (max-width: 320px)
	.result .score-wrapper .score
		font-size 55px
</style>