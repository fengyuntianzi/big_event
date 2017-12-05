<template>
	<transition name="roundShow">
		<div class="round">
			<h1>round{{round}}</h1>
			<h2>{{title}}</h2>
		</div>
	</transition>
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
		h1
			font-size: 24px;
			line-height: 1.29;
			font-weight: 700;
		h2 
			font-size: 30px;
			line-height: 1.29;
			font-weight: 700;
		&.roundShow-enter-active, &.roundShow-leave-active
			transition all 2s ease
		&.roundShow-enter
			transform translateX(800px)
		&.roundShow-leave-active
			transform translateX(-500px)
		// &.active
		// 	transform translateX(100px)
		// 	transition all 2s linear
	// .roundIn-enter-avtive
	// 	animation: roundShow 2s;	
	// .roundIn-leave-avtive
	// 	animation: roundShow 2s reverse;
	// 	@keyframes roundShow {
	// 		0% {
	// 			transform rotate(45deg)
	// 		}
	// 		50% {
	// 			transform rotate(180deg)
	// 		}
	// 		100% {
	// 			transform rotate(45deg)
	// 		}
	// 	}
</style>