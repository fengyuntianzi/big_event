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
		<div class="wx-back" v-show="section===-999"></div>
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
				<!-- <div v-for="(item, index) in questions" class="circle"
					:id="'circle_' + (index+1)" :style="{marginLeft : left}"></div> -->
				<div class="circle" id="circle_1" :style="{marginLeft : left}"></div>
				<div class="circle" id="circle_2" :style="{marginLeft : left}"></div>
				<div class="circle" id="circle_3" :style="{marginLeft : left}"></div>
				<div class="circle" id="circle_4" :style="{marginLeft : left}"></div>
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
// import ResLoader from '../common/utils/resLoader.js'
/*eslint-disable no-unused-vars*/
import autoPlayMusic from '../common/utils/autoplay.js'
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

if (device.weixin) {
	window.wnlui.wxShare({
		title: shareData.title,
		text: shareData.text,
		imgUrl: shareData.img,
		url: 'https://mobile.51wnl.com/temporary/event2017/index.html'
	})
}
if (device.wnl) {
	window.wnlui.wnlShare.setShareData({
		title: shareData.title,
		text: shareData.text,
		image: shareData.img,
		url: 'https://mobile.51wnl.com/temporary/event2017/index.html'
	})
}
let wxNickName = ''

/*eslint-disable no-undef*/
let percent = 0

export default {
	data () {
		return {
			musicPause: false,
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
		if (device.weixin) {
			let openid = getQueryString('openid')
			if (openid) {
				wxNickName = getQueryString('nickname')
				console.log('已获取到信息')
				this.section = -1
			}
			else {
				this.section = -999
				location.href = 'https://b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href)
			}
		}
		// let that = this
		// let loader = new ResLoader({
		// 	resources: [
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/belt.bd7b56f.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/enter.c0dc41c.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/enter-after.b2a9516.png',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/index-book.b701f09.gif',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/index-title.e5307ec.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/judge.65ca195.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/judge-after.db0a41c.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/multi-paper.700e273.png',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/qrcode-0.67feba0.gif',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/qrcode-30.ac0cbc3.gif',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/qrcode-60.060dff9.gif',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/qrcode-70.31eb758.gif',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/qrcode-90.287bfed.gif',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/qrcode-100.d868f05.gif',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/radio-paper.9f45ff8.png',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/round1.44bc131.png',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/round2.1bf4380.png',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/round3.07a22f4.png',
		// 		// 'https://mobile.51wnl.com/temporary/event2017/static/img/round4.3de518f.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/small-frame-after.f9c696a.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/small-paper.e7cda8d.png',
		// 		'https://mobile.51wnl.com/temporary/event2017/static/img/txdt.83b0639.gif'
		// 	],
		// 	onStart: function (total) {
		// 		console.log('start:' + total);
		// 	},
		// 	onProgress: function (current, total) {
		// 		console.log(current + '/' + total);
		// 		percent = (current / total * 100).toString().split('.')[0];
		// 		console.log((percent))
		// 		that.progress = percent
		// 		// if (that.progress >= 100) {
		// 		// 	setTimeout(() => {
		// 		// 		that.section = 0
		// 		// 	}, 300);
		// 		// }
		// 	},
		// 	onComplete: function (total) {
		// 		console.log('加载完毕:' + total + '个资源');
		// 		setTimeout(() => {
		// 			that.section = 0
		// 		}, 300);
		// 	}
		// });
		// loader.start();
		// 将当前vue实例对象指向一个变量，才能在watch周期中使用
		// vueObject = this
		let score = getQueryString('score')
		let name = decodeURIComponent(getQueryString('name'))
		// 异步获取用户信息
		setTimeout(() => {
			if (device.wnl) {
				let name = this.$store.state.userName
				if (name !== '') {
					this.inputName = name
				}
			}
			if (device.weixin) {
				this.inputName = wxNickName
			}
		}, 500)
		// alert(name)
		if (score && name) {
			let that = this
			this.section = 5
			setTimeout(() => {
				this.inputName = name
				this.$store.state.userName = name
			}, 600);
			if (device.weixin) {
				window.wnlui.wxShare({
					title: '我的2017大事件考卷得分为' + score + '分！',
					text: '2017大事件全国统一考卷，鸡年你白过了吗',
					imgUrl: resultShareData.img,
					url: 'https://mobile.51wnl.com/temporary/event2017/index.html?score=' + score + '&name=' + encodeURIComponent(name)
				})
			}
			if (device.wnl) {
				window.wnlui.setShareData({
					title: resultShareData.title.replace('xx', score),
					text: resultShareData.text,
					imgUrl: resultShareData.img,
					url: location.href
				})
			}
		}
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
				}, 300);
			}
		}, 70)
	},
	mounted () {
		if (this.section === 5) {
			this.showLogo = true
		}
		document.getElementsByClassName('music')[0].play()
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
			if (device.weixin) {
				window.wnlui.wxShare({
					title: shareData.title,
					text: shareData.text,
					imgUrl: shareData.img,
					url: 'https://mobile.51wnl.com/temporary/event2017/index.html'
				})
			}
			if (device.wnl) {
				window.wnlui.wnlShare.setShareData({
					title: shareData.title,
					text: shareData.text,
					image: shareData.img,
					url: 'https://mobile.51wnl.com/temporary/event2017/index.html'
				})
			}
		},
		changeSection (data) {
			console.log(data)
			this.section += 1
			if (this.section === 5) {
				this.showLogo = true
				let score = this.$store.state.userScore
				let url
				if (location.href.indexOf('?') > -1) {
					url = location.href + '&score=' + score + '&name=' + this.inputName
				}
				else {
					url = location.href + '?score=' + score + '&name=' + this.inputName
				}
				if (device.wnl) {
					window.wnlui.wnlShare.setShareData({
						title: resultShareData.title.replace('xx', score),
						text: resultShareData.text,
						image: resultShareData.img,
						url: url
					})
				}
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
			if ((this.inputName === this.$store.state.userName || this.inputName === wxNickName) && this.inputName !== '') {
				console.log('不限制')
			}
			else {
				if (this.inputName === '' || this.inputName === undefined || this.inputName === 'undefined') {
					this.$vux.toast.show({
						type: 'text',
						text: '请输入名字~',
						position: 'bottom',
						time: 1000
					})
					return
				}
				if (this.inputName.length > 10) {
					this.$vux.toast.show({
						type: 'text',
						text: '输入的名字太长啦~',
						position: 'bottom',
						time: 1000,
						width: '9.7em'
					})
					return
				}
			}
			this.$store.state.userName = this.inputName
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
				if (this.inputName.length >= 5) {
					return this.inputName.substring(0, 4) + '...的成绩单'
				}
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
			// this.$store.state.userName = val
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
		.wx-back
			position fixed
			top 0
			left 0
			width 100%
			height 100%
			z-index 9999
			background-color #ffffff
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
					font-size 20.35px
					letter-spacing 3px
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
				padding-top 66px
				@media screen and (max-width 325px){
					padding-top 65px
				}
				.img-content
					position relative
					.title
						width 100%
						height calc((100vw - 36px) * 0.5727272727272727)
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
						align-items center
						justify-content center
						flex-wrap nowrap
						font-size 18px
						margin-bottom 11.5px
						color #000
						input
							width 50%
							height 22px
							outline 0
							margin-left 7px
							border-bottom 1px solid #333
							border-radius 0
							background-color transparent
							padding 3px 0
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