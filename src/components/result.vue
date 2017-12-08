<template>
	<div class="result">
		<div class="score-wrapper">
			<div class="score">{{95}}分</div>
		</div>
		<div class="desc-wrapper">
			<div class="desc">你可能过了一个假的2017年</div>
		</div>
		<img src="../assets/images/as.png" alt="" class="qrcode">
		<div class="botton-wrapper">
			<div class="btn btn1" @click="playAgain" :class="{active : btn1clicked}">{{txt1}}</div>
			<div class="btn btn2" @click="help" :class="{active : btn1clicked}">{{txt2}}</div>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			txt1: '不服再战',
			txt2: '寻求帮助',
			btn1clicked: false,
			btn2clicked: false
		}
	},
	components: {

	},
	props: {

	},
	created () {
		console.log(this.$store.state.userScore)
	},
	methods: {
		playAgain () {
			this.btn1clicked = true
		},
		help () {
			this.btn2clicked = true
		}
	},
	computed: {
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
			.score
				text-align center
				margin-left 8%
				padding-top 3%
				font-size 60px
				letter-spacing 1.5px
		.desc-wrapper
			margin 0 auto
			width 276px
			height calc(276px * 0.25)
			background url('../assets/images/message.png') center no-repeat
			background-size 100%;
			.desc
				text-align center
				padding-top 5%
				font-size 19px
				letter-spacing 0.2px
		.qrcode
			display block
			margin 0 auto
		.botton-wrapper
			margin-top 10px
			display flex
			justify-content space-around
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

/* iphone4、5*/
@media screen and (max-width: 320px)
	.result .score-wrapper .score
		font-size 55px
</style>