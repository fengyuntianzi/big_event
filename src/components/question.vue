<template>
	<div class="question">
		<div v-for="(item, index) in nowQuestion" v-show="index === nowIndex" class="item" :key="index" :class="{hidden : index!==nowIndex, ios9 : isIos9}">
			<div class="title">
				<!-- <img src="../assets/images/radio-paper.png" alt="" class="paper"> -->
				<div class="paper" :class="{multipaper : type===2, read : type === 4}"></div>
				<div class="subject" :class="{multipaper : type===2, judge : type===3, read : type === 4}" v-show="type !== 4">{{item.question}}</div>
				<div class="subject" v-show="type === 4" :class="{read : type === 4}">
					<div class="desc">{{item.question.split(' ')[0]}}</div>
					<div class="ques">{{item.question.split(' ')[1]}}</div>
				</div>
			</div>
			<!-- <div class="test">测试</div> -->
			<div class="option-section" :class="{read : type === 4, judge : type===3}">
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
	</div>
</template>
<script>
import device from '../common/utils/device.js'
const RadioScore = 4
const MultiScore = 6
const JudgeScore = 4
const ReadScore = 10
let resultShareData = {
	title: '我的2017大事件考卷得分为xx分！',
	text: '2017大事件全国统一考卷，鸡年你白过了吗',
	img: 'http://mobile.51wnl.com/temporary/event2017/static/img/share.png'
}
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
			nowIndex: 0,
			maxIndex: 0,
			nowQuestion: [],
			multiselect: [],
			optionClick: false,
			clickedConfirm: false,
			radioOptionSelected: false,
			isIos9: false
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
		if (device.ios) {
			if (device.osVersion.substring(0, 1) === '9') {
				this.isIos9 = true
			}
		}
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
			let that = this
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
					_czc.push(['_trackEvent', softType, '-交卷点击-' + deviceType]);
					window.wnlui.wxShare({
						title: '我的2017大事件考卷得分为' + that.$store.state.userScore + '分！',
						text: '2017大事件全国统一考卷，鸡年你白过了吗',
						imgUrl: resultShareData.img,
						url: 'https://mobile.51wnl.com/temporary/event2017/index.html?score=' + that.$store.state.userScore + '&name=' + encodeURIComponent(that.$store.state.userName) + '&isShare=true'
					})
					// alert(JSON.stringify(data))
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
				_czc.push(['_trackEvent', softType, '-多选题' + (num1 + 1) + '点击-' + deviceType]);
			}
			// 单选题
			else {
				if (this.type === 1) {
					_czc.push(['_trackEvent', softType, '-单选题' + (num1 + 1) + '点击-' + deviceType]);
				}
				if (this.type === 3) {
					_czc.push(['_trackEvent', softType, '-判断题' + (num1 + 1) + '点击-' + deviceType]);
				}
				if (this.type === 4) {
					_czc.push(['_trackEvent', softType, '-阅读题' + (num1 + 1) + '点击-' + deviceType]);
				}
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
				// console.log(option.answer)
				// console.log('当前分数：' + this.$store.state.userScore)
				// console.log('当前选择题目索引：' + this.nowIndex)
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
		position relative
		.item
			position absolute
			width calc(100% - 10px)
			top 0
			left 5px
			&.hidden
				display none
			animation moveX .7s ease-in-out forwards
			&.ios9
				animation moveIOS9 .7s ease-in-out forwards
			@keyframes moveX {
				0% {
					transform translate3d(500px,0,0)
				}
				100% {
					transform translate3d(0,0,0)
				}
			}
			@keyframes moveIOS9 {
				0% {
					left 100%
				}
				100% {
					left 0
				}
			}
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
					top 45px
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
						.desc
							font-size 18px
							@media screen and (max-width: 320px){
								font-size 16px
							}
					.desc
						font-size 20px
						line-height 1.5
						letter-spacing 0.4px
						@media screen and (max-width: 320px){
							font-size 16px
						}
					.ques
						font-size 25px
						margin-top 5px
						@media screen and (max-width: 320px){
							font-size 22px
							margin-top 5px
						}
			// .test
			// 	animation kkk 2s ease-in forwards
			// 	@keyframes kkk {
			// 		0% {
			// 			// transform translate3d(500px,0,0)
			// 			transform rotate(35deg)
			// 		}
			// 		100% {
			// 			// transform translate3d(0,0,0)
			// 			transform rotate(85deg)
			// 		}
			// 	}
			.option-section
				margin -20px 40px 0 39px
				&.read
					margin-top -30px
				&.judge
					margin-top 8px
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
						font-size 30px
						@media screen and (max-width: 325px){
							font-size 25px
						}
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
				.sure
					height 32px
/* iphone4、5*/
@media screen and (max-width: 325px)
	.question .item .title .subject
		font-size 19px
	.question .item .title .subject.read,.question .item .title .subject.multipaper
		font-size 16px !important
	.question .item .title .subject.judge
		font-size 20px !important
	.question .item .option-section .option .answer,.question .item .option-section .option.short .answer
		font-size 14px
</style>