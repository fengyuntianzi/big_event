<template>
	<div class="question">
		<transition-group name="fadeIn">
			<div v-for="(item, index) in nowQuestion" v-if="index === nowIndex" class="item" :key="index">
				<div class="title">
					<!-- <img src="../assets/images/radio-paper.png" alt="" class="paper"> -->
					<div class="paper" :class="{multipaper : type===2, read : type === 4}"></div>
					<div class="subject" :class="{multipaper : type===2, judge : type===3, read : type === 4}">{{item.question}}</div>
				</div>
				<div class="option-section" :class="{read : type === 4}">
					<div v-for="(optionItem,optionIndex) in item.options" class='option' 
							@click="select(index, optionIndex)" :class="{short : optionItem.answer.length <= 4,multipaper : type===2,read : type === 4,
							 active : optionItem.isActive && type !==3, judge : type===3, judgeActive : optionItem.isActive && type===3}">
						<div class="select">{{changeToOption(optionIndex)}}</div>
						<div class="answer" :class="{correct : type === 3, error : type===3 && optionIndex===1}">
							{{type === 3 ? '' : optionItem.answer}}</div>
					</div>
				</div>
				<div class="confirm" v-show="type === 2 || (type === 4 && nowIndex===maxIndex)" :class="{read : type === 4}">
					<div @click="confirm" class="sure" :class="{scale : clickedConfirm}">{{(type === 4 && nowIndex===maxIndex) ? '交卷':'确认'}}</div>
					<img src="../assets/images/jt.png" width="49" height="34" @click="confirm" 
						:class="{scale : clickedConfirm}">
				</div>
			</div>
		</transition-group>
	</div>
</template>
<script>
// import store from '../store/store'
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
			optionClick: false,
			clickedConfirm: false,
			radioOptionSelected: false
		}
	},
	components: {

	},
	// store,
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
		/**
		 * 返回当前问题的正确答案
		 * @returns {Array}
		*/
		correctAnswer () {
			return this.nowQuestion[this.nowIndex].options.filter((item) => {
				return item.correct === true
			})
		},
		/**
		 * 返回当前问题的已选择答案
		 * @returns {Array}
		*/
		selectAnswer () {
			return this.nowQuestion[this.nowIndex].options.filter((item) => {
				return item.isActive === true
			})
		},
		/**
		 * 将当前序号改成选项值
		 * @param {int} num 当前序号
		 * @returns {String}  当前序号对应选项
		*/
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
		/**
		 * 多选题--确认、交卷
		*/
		confirm () {
			setTimeout(() => {
				this.clickedConfirm = true
			}, 200);
			if (this.selectAnswer().length < 1) {
				this.$vux.toast.show({
					type: 'text',
					text: '请至少选择一项',
					position: 'bottom',
					time: 1000
				})
				setTimeout(() => {
					this.clickedConfirm = false
				}, 200)
				return
			}
			else {
				if (this.type === 4) {
					console.log('交卷')
					// console.log('得分：' + this.$store.state.userScore)
					// localStorage.setItem('userscore', this.$store.state.userScore)
				}
				else {
					if (this.correctAnswer().toString() === this.selectAnswer().toString()) {
						this.$store.state.userScore += MultiScore
						console.log('当前分数' + this.$store.state.userScore)
					}
				}
				setTimeout(() => {
					this.changeIndex()
				}, 200)
			}
			console.log(this.correctAnswer().toString())
			console.log(this.selectAnswer().toString())
		},
		/**
		 * select()选择答案
		 * @param {int} num1 当前问题的序号
		 * @param {int} num2 当前问题对应选项的序号
		*/
		select (num1, num2) {
			let option = this.nowQuestion[num1].options[num2]
			// 多选题
			if (this.type === 2) {
				option.isActive = !option.isActive
			}
			// 单选题
			else {
				if (this.radioOptionSelected) {
					return
				}
				this.radioOptionSelected = true
				// if (num1 >= this.maxIndex) {
				// 	setTimeout(() => {
				// 		this.radioOptionSelected = false
				// 	}, 600);
				// }
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
				if (this.type === 4 && this.nowIndex === this.maxIndex) {
					return
				}
				this.changeIndex()
			}
		},
		/**
		 * 改变当前问题的序号
		*/
		changeIndex () {
			setTimeout(() => {
				this.clickedConfirm = false
			}, 100)
			if (this.nowIndex < this.maxIndex) {
				setTimeout(() => {
					this.nowIndex = this.nowIndex + 1
					this.radioOptionSelected = false
				}, 300);
			}
			else {
				setTimeout(() => {
					this.$emit('changeSection', 1);
					this.init()
				}, 100)
			}
		},
		init () {
			this.nowIndex = 0
			this.nowQuestion = this.questions[this.type - 1]
			this.maxIndex = this.questions[this.type - 1].length - 1
			this.multiselect = []
			this.optionClick = false
			this.clickedConfirm = false
			this.radioOptionSelected = false
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
				transform translateX(0)
				transition all .7s cubic-bezier(0.22, 0.61, 0.36, 1)
			&.fadeIn-enter,&.fadeIn-leave-active
				transform translateX(500px)
			.title
				position relative
				font-size 17px
				color #000
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
					&.read
						width 97%
						height calc((100vw - 20px) * 0.8324324324324324)
						margin-top -13.5px
						margin-left 5px
						background url("../assets/images/multi-paper.png") center no-repeat
						background-size 100%
				.subject
					position absolute
					top 58px
					left 19.7%
					width 72.3%
					font-size 24px
					line-height 1.44
					letter-spacing 0.5px
					&.multipaper
						top 42px
						font-size 21px
					&.judge
						top 90px
					&.read
						font-size 19px
						top 45px
			.option-section
				margin -20px 40px 0 39px
				&.read
					margin-top -30px
				.option
					margin-bottom 10px
					display flex
					align-items center
					justify-content flex-start
					width 100%
					height calc((100vw - 79px) * 0.2356902356902357)
					background url('../assets/images/small-frame.png') center no-repeat
					background-size 100%
					&.read
						margin-bottom 2px
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
						margin 0 8px 10px 15px
						font-size 33px
					.answer
						margin-bottom 10px
						margin-right 10px
						font-size 18px
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
							margin-left 33%
							margin-right 13px
						.answer
							font-size 20px
			.confirm
				display flex
				justify-content flex-end
				align-items center
				font-size 27.25px
				margin 5px 46.25px 0
				&.read
					margin-top -1px
				.sure,img
					transition all .5s ease
					&.scale
						transform scale(.5)
/* iphone4、5*/
@media screen and (max-width: 320px)
	.question .item .title .subject
		font-size 21px
	.question .item .title .subject.read,.question .item .title .subject.multipaper
		font-size 16px !important
	.question .item .title .subject.judge
		font-size 20px !important
	.question .item .option-section .option .answer
		font-size 14px
/* iphone6p*/
// @media screen and (min-width: 400px) and (max-width 420px)
</style>