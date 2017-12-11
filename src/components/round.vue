<template>
	<!-- <transition name="roundShow"> -->
		<div class="round">
			<img class="head-img" src="../assets/images/round1.png" v-show="round === 1"></img>
			<img class="head-img" src="../assets/images/round2.png" v-show="round === 2"></img>
			<img class="head-img" src="../assets/images/round3.png" v-show="round === 3"></img>
			<img class="head-img" src="../assets/images/round4.png" v-show="round === 4"></img>
			<img class="txt" src="../assets/images/txdt.gif" alt="">
			<!-- <h1>round{{round}}</h1>
			<h2>{{title}}</h2> -->
		</div>
	<!-- </transition> -->
</template>
<script>
export default {
	data () {
		return {
		}
	},
	props: {
		round: {
			type: Number,
			default: 1
		},
		title: {
			type: String,
			default: '小试牛刀'
		}
	}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
	.round
		transform translateX(0)
		padding-top 47.5px
		img
			display block
			margin 0 auto
		.head-img
			width 96.4%
		.txt
			width 78.6%
			margin-top -40%
		&.roundShow-enter-active, &.roundShow-leave-active
			transition all 2s ease
		&.roundShow-enter
			transform translateX(800px)
		&.roundShow-leave-active
			transform translateX(-500px)
</style>