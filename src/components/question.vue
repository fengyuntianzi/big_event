<template>
	<div class="question">
		<transition-group name="fadeIn">
			<div v-for="(item, index) in nowQuestion" v-if="index === nowIndex" class="item" :key="index">
				<div class="title">
					<!-- <img src="../assets/images/radio-paper.png" alt="" class="paper"> -->
					<div class="paper" :class="{multipaper : type===2}"></div>
					<div class="subject" :class="{multipaper : type===2, judge : type===3}">{{item.question}}</div>
				</div>
				<div class="option-section">
					<div v-for="(optionItem,optionIndex) in item.options" class='option' 
							@click="select(index, optionIndex)" :class="{short : optionItem.answer.length <= 4,
							 active : optionItem.isActive && type !==3, judge : type===3, judgeActive : optionItem.isActive && type===3}">
						<div class="select">{{changeToOption(optionIndex)}}</div>
						<div class="answer" :class="{correct : type === 3, error : type===3 && optionIndex===1}">
							{{type === 3 ? '' : optionItem.answer}}</div>
					</div>
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
			multiselect: [],
			optionClick: false
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
			let arr
			if (this.type === 3) {
				arr = ['对', '错']
			}
			else {
				arr = ['A', 'B', 'C', 'D', 'E']
			}
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
				position relative
				font-size 17px
				color #333
				margin-bottom 15px
				font-family 'tx'
				.paper
					width 100%
					height calc((100vw - 4px) * 0.8594594594594595)
					background url("../assets/images/radio-paper.png") center no-repeat
					background-size 100%
					&.multipaper
						height calc((100vw - 4px) * 0.5273224043715847)
						background url("../assets/images/small-paper.png") center no-repeat
						background-size 100%
				.subject
					position absolute
					top 58px
					left 19.7%
					width 72.3%
					font-size 25px
					line-height 1.44
					letter-spacing 0.5px
					&.multipaper
						top 42px
						font-size 23px
					&.judge
						top 90px
			.option-section
				margin -15px 40px 0 39px
				.option
					margin-bottom 10px
					display flex
					align-items center
					justify-content flex-start
					width 100%
					height calc((100vw - 79px) * 0.2356902356902357)
					background url('../assets/images/small-frame.png') center no-repeat
					background-size 100%
					&.judge
						width 100%
						height calc((100vw - 79px) * 0.2693602693602694)
						background url('../assets/images/judge.png') center no-repeat
						background-size 100%
					    &.judgeActive
							background url('../assets/images/judge-after.png') center no-repeat
							background-size 100%
					&.active
						background url('../assets/images/small-frame-after.png') center no-repeat
						background-size 100%
					.select
						margin 0 13px 10px 15px
						font-size 33px
					.answer
						margin-bottom 10px
						&.correct
							width 53px
							height 41px
							background url('../assets/images/correct.png')
							background-size 100%
						&.error
							width 35px
							height 32px
							background url('../assets/images/wrong.png')
							background-size 100%
					&.short
						.select
							margin-left 26%
						.answer
							font-size 20px
			.confirm
				border 1px solid #333
				border-radius 5px
				width 75px
				height 25px
				margin 15px auto 0
				text-align center;
				line-height 25px;
/* iphone4、5*/
@media screen and (max-width: 320px)
	.question .item .title .subject
		font-size 20px !important
	.question .item .option-section .option .answer
		font-size 18px
</style>