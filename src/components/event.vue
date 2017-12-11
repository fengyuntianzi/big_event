<template>
	<div class="event">
		<!-- <div class="music" id='music' ref="music" @click="closeMusic">
			<audio src="../assets/Synthion.mp3" autoplay="autoplay"></audio>
		</div> -->
		<div class="loading" v-show="section === -1">
			<div class="loading-section">
				<div class="progress">
					<div class="pencil" :style="{left : (progress-10) + '%'}"></div>
					<!-- <div class="inner" :style="{width : progress + '%'}"></div> -->
				</div>
				<div class="progress inner" :style="{width : progress + '%'}"></div>
			</div>
			<div class="num">{{progress}}<span>%</span></div>
		</div>
		<div class="type-logo" v-show="showLogo">
			<div class="logo-txt">{{logoTxt}}</div>
		</div>
		<div class="index-logo" v-show="section === 0">
			<img  src="../assets/images/index-tag.png" width="166" height="69">
			<div class="index-copyright">
				<div>出品方:</div>
				<img src="../assets/images/tubiao.png" alt="" width="29" height="29">
				<div>万年历</div>
			</div>
		</div>
		<div class='index-section' v-show="section === 0">
			<div class="index-content">
				<div class="img-content"> 
					<img class="title" src="../assets/images/index-title.png">
					<img class="book" src="../assets/images/index-book.gif">
				</div>
				<div class="paper-info">
					<div class="get-paper">
						<div>答卷人:</div>
						<input type="text" class="name" v-model="inputName" ref="name" placeholder="请输入你的名字">
					</div>
				</div>
				<div class="begin" @click="enter" :class="{active : enterClicked}">进入</div>
			</div>
		</div>
		
		<div class='round1-section temp-round' v-show="section === 1">
			<round :round="1" :title="'小试牛刀'" v-show="!showQuestion" class='nowround'/>
			<question :type='1' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>
		
		<div class='round2-section temp-round' v-show="section === 2">
			<round :round="2" :title="'知微见著'" v-show="!showQuestion" class='nowround'/>
			<question :type='2' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>
		<div class='round3-section temp-round' v-show="section === 3">
			<round :round="3" :title="'明察秋毫'" v-show="!showQuestion" class='nowround'/>
			<question :type='3' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>
		<div class='round4-section temp-round' v-show="section === 4">
			<round :round="4" :title="'炉火纯青'" v-show="!showQuestion" class='nowround'/>
			<question :type='4' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>

		<div class='result-section' v-show="section === 5">
			<result v-on:changeToindex = "changeToindex"></result>
		</div>

		<div class="bottom-section" v-show="section!==0 && section!==5 && !showQuestion">
			<div class="circle-list">
				<div v-for="(item, index) in questions" class="circle" 
					:id="'circle_' + (index+1)" :style="{'margin-left' : left}"></div>
			</div>
			<div class="activecircle" id="activecircle" :style="{left : circleLeft}"></div>
			<div class="line"></div>
		</div>

	</div>
</template>
<script>
import store from '../store/store'
import round from './round.vue'
import question from './question.vue'
import result from './result.vue'
import questions from '../common/question.json'
// import wnlui from '../common/utils/wnlui.js'
window.wnlShare.setShareData({
	title: '接招吧！历友',
	text: '年底大考核，全对算你赢',
	image: 'http://www.51wnl.com/wnl_bless/img/write2-myself@3x.png',
	url: location.href
})
// window.wnlShare.showSharePlatform();
// window.wxShare({
// 	title: 'title',
// 	text: 'text',
// 	imageUrl: 'http://www.51wnl.com/wnl_bless/img/write2-myself@3x.png',
// 	url: 'http://www.baidu.com'
// });
export default {
	data () {
		return {
			progress: 10,
			section: -1,
			inputName: '',
			showLogo: false,
			showQuestion: true,
			questions: questions,
			enterClicked: false,
			circleLeft: '0px',
			left: (window.innerWidth - 76 - 62.5) / 5 + 'px'
		}
	},
	store,
	components: {
		round,
		question,
		result
	},
	props: {

	},
	created () {
		// 异步获取用户信息
		setTimeout(() => {
			let name = store.userName
			if (name !== '') {
				this.inputName = name
			}
		}, 500)
		// 进度条
		let interval = setInterval(() => {
			this.progress += 1
			if (this.progress === 36) {
				this.progress = 49
			}
			if (this.progress === 56) {
				this.progress = 70
			}
			if (this.progress === 89) {
				this.progress = 99
			}
			if (this.progress >= 100) {
				clearInterval(interval)
				setTimeout(() => {
					this.section = 0
				}, 300);
			}
		}, 70)
	},
	mounted () {
		if (this.section === 5) {
			this.showLogo = true
		}
	},
	methods: {
		closeMusic (e) {
			console.log(e.target.style)
			// console.log(this.$refs.music.style.cssText)
		},
		changeToindex () {
			setTimeout(() => {
				this.section = 0
				this.showLogo = false
				this.showQuestion = true
				this.enterClicked = false
				this.circleLeft = '0px'
				this.left = (window.innerWidth - 76 - 62.5) / 5 + 'px'
			}, 200)
			this.$store.state.userScore = 0
			this.questions.forEach((item) => {
				item.forEach((temp) => {
					temp.options.forEach((a) => {
						a.isActive = false
					})
				})
			})
		},
		changeSection (data) {
			console.log(data)
			this.section += 1
			if (this.section === 5) {
				this.showLogo = true
			}
			else {
				this.showLogo = true
				setTimeout(() => {
					this.moveCircle(this.section)
				}, 200);
				this.showQuestion = false
				setTimeout(() => {
					this.showQuestion = true
					this.showLogo = false
				}, 3000);
			}
		},
		enter () {
			if (this.inputName === '' || this.inputName === undefined || this.inputName === 'undefined') {
				this.$vux.toast.show({
					type: 'text',
					text: '请输入名字',
					position: 'bottom',
					time: 1000
				})
				return
			}
			this.enterClicked = true
			setTimeout(() => {
				this.section = 1
				this.showLogo = true
				setTimeout(() => {
					this.moveCircle(this.section)
				}, 200);
			}, 200)
			this.showQuestion = false
			setTimeout(() => {
				this.showQuestion = true
				this.showLogo = false
			}, 3000);
		},
		moveCircle (index) {
			if (index === 1) {
				this.circleLeft = this.left
			}
			else {
				this.circleLeft = (parseInt(this.circleLeft.replace('px', '')) + parseInt(this.left.replace('px', '')) + 12.5 + 4.5) + 'px'
			}
		}
	},
	computed: {
		logoTxt () {
			let arr = ['单选题', '多选题', '判断题', '阅读题', '成绩单']
			return arr[this.section - 1]
		}
	},
	watch: {
		inputName: (val) => {
			console.log(val)
		}
	}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../common/stylus/base.styl';
	.event
		width 100%;
		min-height 100%;
		// overflow auto
		overflow-x hidden
		position relative
		background-color #ffdb12
		.loading
			width 100vw
			height 100vh
			background-color #ffffff
			display flex
			justify-content center
			align-items center
			flex-direction column
			.loading-section
				position relative
				width 60%
				.progress
					width 100%
					height 25px
					border solid 2.5px #000000
					border-radius 24px
					position relative
					.pencil
						position absolute
						top -100px
						left 0
						width 58px
						height 83px
						background url('../assets/images/qianbi.png') center no-repeat
						background-size 100%
						transition all .2s linear
						animation pencil 1s linear infinite
						@keyframes pencil {
							0% {
								transform rotate(-13deg)
							}
							50% {
								transform rotate(5deg)
							}
							100% {
								transform rotate(-13deg)
							}
						}
					&.inner
						position absolute
						top 0
						left 0
						background-color #ffde00
						transition all 0.1s linear
			.num
				margin-top 12.5px
				font-size 27.3px
				font-family GillSans,'PingFangSC',"\82F9\65B9-\7B80", "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif;
				letter-spacing -2.2px
				span 
					margin-left 2px
		.music
			position absolute
			top 20px
			left 20px
			width 35px
			height 35px
			z-index 100
			background url('../assets/images/music.png') center no-repeat
			background-size cover
			animation rotate 3s cubic-bezier(.62,1.39,.39,-0.24) infinite
			@keyframes rotate
				0% {
					transform rotate(0deg)
				}
				100% {
					transform rotate(360deg)
				}
		.type-logo
			width 131px
			height 69px
			background url('../assets/images/type-tag.png') center no-repeat
			background-size 100%
			position absolute
			top -20px
			right 20px
			animation bounceInDown 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards
			.logo-txt
				position absolute
				bottom 14px
				left 22%
				font-size 20.35px
				letter-spacing 5.3px
			@keyframes bounceInDown {
				0% {
					transform: translate3d(0, -3000px, 0);
				}
				60% {
					transform: translate3d(0, 25px, 0);
				}
				75% {
					transform: translate3d(0, -10px, 0);
				}
				90% {
					transform: translate3d(0, 5px, 0);
				}
				to {
					transform: translate3d(0, 0, 0);
				}
			}
		.index-logo
			position absolute
			top -12px
			right 16.5px
			z-index 10
			.index-copyright
				display flex
				align-items center
				position absolute
				top 30px
				left 10px
				img 
					margin 0 5px
		.index-section
			width 100%
			min-height 100%
			position relative
			.index-content
				margin 0 17px 0 19px
				padding-top 51.5px
				.img-content
					position relative
					.title
						width 100%
						height calc((100vw - 36px) * 0.6430678466076696)
					.book
						width 90%
						position absolute
						top -30px
						left 10%
				.desc
					font-size 30px
					line-height 1.29
					font-weight 700
					text-align justify
				.paper-info 
					margin-top 43%
					.get-paper
						display flex
						align-items baseline
						justify-content center
						flex-wrap nowrap
						font-size 18px
						margin-bottom 11.5px
						color #000
						input
							width 50%
							outline 0
							margin-left 7px
							border-bottom 1px solid #333
							border-radius 0
							background-color transparent
							&::-webkit-input-placeholder
								color #d5ba01
				.begin
					width 257px
					height 74px
					background url('../assets/images/enter.png') center no-repeat
					background-size 100%
					line-height 50px
					letter-spacing 5px
					margin 0 auto
					font-size 24px
					text-align center
					&.active 
						background url('../assets/images/enter-after.png') center no-repeat
						background-size 100%
		.temp-round
			padding-top 13.5px
			margin 0 2px 0
			.nowround
				position absolute
		.bottom-section
			width calc(100% - 76px)
			position absolute
			bottom 100px
			margin 0 38px
			.activecircle
				width 12.5px
				height 12.5px
				background-color #ff8f45
				border: solid 2px #000
				border-radius 50%
				position absolute
				top 0
				left 0
				transition all .8s linear
			.circle-list
				display flex
				margin-bottom -9px
				.circle
					width 12.5px
					height 12.5px
					background-color #ffffff
					border: solid 2px #000000
					border-radius 50%
					// margin-left calc((100vw - 76px - 62.5px) / 5)
					&.active
						background-color #ff8f45
			.line
				border: solid 1px #000000

</style>