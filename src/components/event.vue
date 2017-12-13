<template>
	<div class="event">
		<div class="music-icon" @click.stop.prevent="toggleMusic" v-show="section!==-1" :class="{pause : musicPause, play : !musicPause}">
			<audio src="../assets/Synthion-large.mp3" class='music' id="audio" autoplay="autoplay" loop='true'></audio>
		</div>
		<!-- <div class="clickDiv" @click="playMusic" style="width:100px;height:100px;position:absolute;top:-500px;left:0"></div> -->
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
		<div class="type-logo" v-show="showLogo" :class="{result : section === 5}">
			<div class="logo-txt" :class="{result : section === 5}">{{logoTxt}}</div>
			<!-- <div class="result-txt">{{logoTxt}}</div> -->
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
import getQueryString from '../common/utils/parseurl.js'
import device from '../common/utils/device.js'
/*eslint-disable no-unused-vars*/
// import autoPlayMusic from '../common/utils/autoplay.js'
import { mapState } from 'vuex'
let shareData = {
	title: '2017大事件全国统一考卷',
	text: '年底大考核，全对算你赢',
	img: 'http://mobile.51wnl.com/temporary/event2017/static/img/share.png'
}
let resultShareData = {
	title: '我的2017大事件考卷得分为xx分！',
	text: '2017大事件全国统一考卷，鸡年你白过了吗',
	img: 'http://mobile.51wnl.com/temporary/event2017/static/img/share.png'
}

export default {
	data () {
		return {
			musicPause: true,
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
		// 将当前vue实例对象指向一个变量，才能在watch周期中使用
		// vueObject = this
		// if (this.section === -1) {
		// 	document.addEventListener('touchstart', function (e) {
		// 		e.preventDefault()
		// 	});
		// }
		// 非结果页
		if (this.section !== 5) {
			if (device.weixin) {
				window.wnlui.wxShare({
					title: shareData.title,
					text: shareData.text,
					imgUrl: shareData.img,
					url: location.href
				})
			}
			if (device.wnl) {
				window.wnlui.wnlShare.setShareData({
					title: shareData.title,
					text: shareData.text,
					image: shareData.img,
					url: location.href
				})
			}
		}
		let score = getQueryString('score')
		let name = getQueryString('name')
		// alert(name)
		if (score) {
			this.section = 5
			this.inputName = name
		}
		// 异步获取用户信息
		setTimeout(() => {
			let name = this.$store.state.userName
			if (name !== '') {
				this.inputName = name
			}
		}, 500)
		// 结果页 阻止进度条
		if (this.section === 5) {
			return
		}
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
					setTimeout(() => {
						// document.addEventListener('touchstart', () => {
						// 	let audio = document.getElementById('audio');
						// 	audio.play();
						// 	this.musicPause = false
						// });
					}, 200);
				}, 300);
			}
		}, 70)
	},
	mounted () {
		if (this.section === 5) {
			this.showLogo = true
		}
		document.getElementsByClassName('music')[0].pause()
	},
	methods: {
		toggleMusic () {
			let audio = document.getElementById('audio');
			if (audio.paused) {
				audio.play()
				this.musicPause = false
			}
			else {
				audio.pause()
				this.musicPause = true
			}
		},
		changeToindex () {
			setTimeout(() => {
				this.section = 0
				this.showLogo = false
				this.showQuestion = true
				this.enterClicked = false
				this.circleLeft = '0px'
				this.left = (window.innerWidth - 76 - 62.5) / 5 + 'px'
				this.$store.state.userScore = 0
			}, 200)
			for (let i = 0; i < 4; i++) {
				document.getElementById('circle_' + (i + 1)).className = 'circle'
			}
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
				let url
				if (location.href.indexOf('?') > -1) {
					url = location.href + '&score=' + this.$store.state.userScore + '&name=' + this.inputName
				}
				else {
					url = location.href + '?score=' + this.$store.state.userScore + '&name=' + this.inputName
				}
				if (device.weixin) {
					window.wnlui.wxShare({
						title: resultShareData.title.replace('xx', this.$store.state.userScore),
						text: resultShareData.text,
						imgUrl: resultShareData.img,
						url: url
					})
				}
				if (device.wnl) {
					window.wnlui.wnlShare.setShareData({
						title: resultShareData.title.replace('xx', this.$store.state.userScore),
						text: resultShareData.text,
						image: resultShareData.img,
						url: url
					})
				}
			}
			else {
				if (device.weixin) {
					window.wnlui.wxShare({
						title: shareData.title,
						text: shareData.text,
						imgUrl: shareData.img,
						url: location.href
					})
				}
				if (device.wnl) {
					window.wnlui.wnlShare.setShareData({
						title: shareData.title,
						text: shareData.text,
						image: shareData.img,
						url: location.href
					})
				}
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
			// console.log(this)
			if (this.inputName === '' || this.inputName === undefined || this.inputName === 'undefined') {
				this.$vux.toast.show({
					type: 'text',
					text: '请输入名字',
					position: 'bottom',
					time: 1000
				})
				return
			}
			if (this.inputName.length > 4) {
				this.$vux.toast.show({
					type: 'text',
					text: '输入的名字太长啦~',
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
			setTimeout(() => {
				document.getElementById('circle_' + index).className = 'circle active'
			}, 1000);
		}
	},
	computed: mapState({
		logoTxt () {
			let arr = ['单选题', '多选题', '判断题', '阅读题']
			if (this.section === 5) {
				return this.inputName + '的成绩单'
			}
			else {
				return arr[this.section - 1]
			}
		},
		userScore: state => state.userScore
	}),
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
		.music-icon
			position absolute
			top 10px
			left 10px
			width 27px
			height 27px
			z-index 100
			&.play
				background url('../assets/images/music-play.png') center no-repeat
				background-size cover
				// animation rotate 3s cubic-bezier(.62,1.39,.39,-0.24) infinite
				animation rotate 3s linear infinite
			&.pause
				animation none
				background url('../assets/images/music-pause.png') center no-repeat
				background-size cover
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
			&.result
				width 235px
				height 73px
				background url('../assets/images/type-tag-large.png') center no-repeat
				background-size 100%
			// .result-txt
			// 	display inline-block
			// 	margin 0 auto
			// 	text-align center
			// 	line-height 100px
			.logo-txt
				position absolute
				bottom 14px
				left 22%
				font-size 20.35px
				letter-spacing 5.3px
				&.result
					position static
					margin 0 auto
					text-align center
					line-height 100px
					font-family: 'PingFangSC',"苹方-简", "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif;
					font-weight bold
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
							padding-bottom 3px
							// margin-top -3px
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
					@media screen and (min-height 700px) and (max-height 736px) {
						margin-top 35px
					}
					@media screen and (min-height 737px) {
						margin-top 50px
					}
		.temp-round
			padding-top 13.5px
			margin 0 2px 0
			.nowround
				position absolute
		.bottom-section
			width calc(100% - 76px)
			position absolute
			bottom 80px
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
					&.active
						background-color #ff8f45
			.line
				border: solid 1px #000000

</style>