<template>
	<div class="question1">
		<transition-group name="fadeIn">
			<div v-for="(item, index) in questions" v-if="index === nowIndex" class="question" :key="index">
				<div class="title">{{item.question}}</div>
				<div v-for="(optionItem,optionIndex) in item.options" class='option'>
					<div class="select" @click="select(index, optionIndex)" :class="{active : optionItem.isActive}">{{changeToOption(optionIndex)}}</div><div>{{optionItem.answer}}</div>
				</div>
			</div>
		</transition-group>
	</div>
</template>
<script>
export default {
	data () {
		return {
			nowIndex: 0
		}
	},
	components: {

	},
	props: {
		questions: {
			type: Array
		}
	},
	created () {

	},
	methods: {
		changeToOption (num) {
			let arr = ['A', 'B', 'C', 'D', 'E']
			return arr[num]
		},
		select (num1, num2) {
			console.log(this.questions[num1].options[num2].answer)
			this.questions[num1].options[num2].isActive = true
			// this.questions.forEach((item) => {
				// console.log(item[num1].options[num2])
				// if (item === num1) {
				// 	console.log(item.options[num2])
				// 	return item.options[num2]
				// }
			// })
			setTimeout(() => {
				this.nowIndex = num1 + 1
			}, 500);
		}
	},
	computed: {
	}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
	.question1
		.question
			&.fadeIn-enter-active
				opacity 1
				transition all 1s ease
			&.fadeIn-enter,&.fadeIn-leave-active
				opacity 0
			.title
				font-size 17px
				color #333
				margin-bottom 15px
			.option
				margin-bottom 10px
				display flex
				align-items baseline
				.select
					padding 3px 9px
					margin-right 10px
					background-color #ffffff
					color #333
					border-radius 10px
					border 1px solid #333
					&.active
						background-color blue
						color #ffffff
</style>