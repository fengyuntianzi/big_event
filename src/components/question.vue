<template>
	<div class="question">
		<transition-group name="fadeIn">
			<div v-for="(item, index) in nowQuestion" v-if="index === nowIndex" class="item" :key="index">
				<div class="title">{{item.question}}</div>
				<div v-for="(optionItem,optionIndex) in item.options" class='option' @click="select(index, optionIndex)">
					<div class="select" :class="{active : optionItem.isActive}">{{changeToOption(optionIndex)}}</div><div>{{optionItem.answer}}</div>
				</div>
				<div class="confirm" @click="confirm" v-show="type === 2">确认</div>
			</div>
		</transition-group>
	</div>
</template>
<script>
import store from '../store/store'
/*eslint-disable no-unused-vars*/
const RadioScore = 4
const MultiScore = 6
const JudgeScore = 4
const ReadScore = 10
export default {
	data () {
		return {
			nowIndex: 0,
			maxIndex: 0,
			nowQuestion: [],
			multiselect: []
		}
	},
	components: {

	},
	store,
	props: {
		questions: {
			type: Array,
			default: []
		},
		type: {
			type: Number,
			default: 1
		}
	},
	created () {
		this.nowQuestion = this.questions[this.type - 1]
		this.maxIndex = this.questions[this.type - 1].length - 1
	},
	watch: {
		// nowIndex (val) {
		// 	console.log('当前索引' + val)
		// }
	},
	methods: {
		correctAnswer () {
			return this.nowQuestion[this.nowIndex].options.filter((item) => {
				return item.correct === true
			})
		},
		selectAnswer () {
			return this.nowQuestion[this.nowIndex].options.filter((item) => {
				return item.isActive === true
			})
		},
		changeToOption (num) {
			let arr = ['A', 'B', 'C', 'D', 'E']
			return arr[num]
		},
		confirm () {
			if (this.selectAnswer().length < 1) {
				this.$vux.toast.show({
					type: 'text',
					text: '请至少选择一项',
					position: 'bottom',
					time: 1000
				})
				return
			}
			else {
				if (this.correctAnswer().toString() === this.selectAnswer().toString()) {
					this.$store.state.userScore += MultiScore
					console.log('当前分数' + this.$store.state.userScore)
				}
				this.changeIndex()
			}
			console.log(this.correctAnswer().toString())
			console.log(this.selectAnswer().toString())
		},
		select (num1, num2) {
			let option = this.nowQuestion[num1].options[num2]
			// 多选题
			if (this.type === 2) {
				option.isActive = !option.isActive
			}
			// 单选题
			else {
				option.isActive = true
				if (option.correct) {
					if (this.type === 1) {
						this.$store.state.userScore += RadioScore
					}
					if (this.type === 3) {
						this.$store.state.userScore += JudgeScore
					}
					if (this.type === 4) {
						this.$store.state.userScore += ReadScore
					}
				}
				console.log(option.answer)
				console.log('当前分数：' + this.$store.state.userScore)
				console.log('当前选择题目索引：' + this.nowIndex)
				this.changeIndex()
			}
		},
		changeIndex () {
			if (this.nowIndex < this.maxIndex) {
				setTimeout(() => {
					this.nowIndex = this.nowIndex + 1
				}, 500);
			}
			else {
				setTimeout(() => {
					this.$emit('changeSection', 1);
				}, 500)
			}
		}
	},
	computed: {
	}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
	.question
		.item
			&.fadeIn-enter-active
				opacity 1
				transition all 1s ease
			&.fadeIn-enter,&.fadeIn-leave-active
				opacity 0
			.title
				font-size 17px
				color #333
				margin-bottom 15px
				font-family 'tx'
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
			.confirm
				border 1px solid #333
				border-radius 5px
				width 75px
				height 25px
				margin 15px auto 0
				text-align center;
				line-height 25px;
</style>