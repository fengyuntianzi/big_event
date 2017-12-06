<template>
	<div class="event">
		<div class="music">
			<audio src="../assets/music.mp3" autoplay="autoplay" ref="audio" id='audio'></audio>
		</div>
		<div class="type-logo" v-show="showLogo">{{logoTxt}}</div>
		<div class='index-section' v-show="section === 0">
			<div class="index-content">
				<h2 class="title">2017大事件全国统一考卷</h2>
				<h1 class="desc">年底大考核，全对算你赢！</h1>
				<div class="paper-info">
					<div class="set-paper">出卷人：万年历</div>
					<div class="get-paper">
						<div>答卷人：</div>
						<input type="text" class="name" v-model="inputName" ref="name" placeholder="请输入你的名字">
					</div>
				</div>
				<div class="begin" @click="enter">进入</div>
			</div>
		</div>
		
		<div class='round1-section temp-round' v-show="section === 1">
			<round :round="1" :title="'小试牛刀'" v-show="!showQuestion" class='round'/>
			<question :type='1' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>
		
		<div class='round2-section temp-round' v-show="section === 2">
			<round :round="2" :title="'知微见著'" v-show="!showQuestion" class='round'/>
			<question :type='2' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>
		<div class='round3-section temp-round' v-show="section === 3">
			<round :round="3" :title="'明察秋毫'" v-show="!showQuestion" class='round'/>
			<question :type='3' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>
		<div class='round4-section temp-round' v-show="section === 4">
			<round :round="4" :title="'炉火纯青'" v-show="!showQuestion" class='round'/>
			<question :type='4' :questions="questions" v-show="showQuestion" v-on:changeSection= 'changeSection'></question>
		</div>

		<div class='result-section' v-show="section === 5"></div>

		<div class="bottom-section" v-show="section!==0 && section!==5">
			<div class="pencil" :style="{ 'margin-left' : left }"></div>
			<div class="line"></div>
		</div>

		<!-- <toast v-model="showToast" type="text">{{toastText}}</toast> -->
	</div>
</template>
<script>
import store from '../store/store'
import round from './round.vue'
import question from './question.vue'
import questions from '../common/question.json'

export default {
	data () {
		return {
			section: 0,
			userName: '',
			inputName: '',
			left: '0',
			showLogo: false,
			showQuestion: true,
			questions: questions
		}
	},
	store,
	questions,
	components: {
		round,
		question
	},
	props: {

	},
	created () {
		// 异步获取用户信息
		setTimeout(() => {
			this.userName = this.$store.state.userName
			console.log(this.userName)
			if (this.userName !== '') {
				this.inputName = this.userName
			}
		}, 500)
	},
	mounted () {
		// document.getElementById('audio').play()
	},
	methods: {
		changeSection (data) {
			console.log(data)
			if (this.section === 4) {
				this.section += 1
			}
			else {
				this.section += 1
				this.showLogo = true
				setTimeout(() => {
					this.left = '15%'
				}, 500)
				this.showQuestion = false
				setTimeout(() => {
					this.showQuestion = true
					this.showLogo = false
				}, 3000);
			}
		},
		enter () {
			if (this.inputName === '') {
				this.$vux.toast.show({
					type: 'text',
					text: '请输入名字',
					position: 'bottom',
					time: 1000
				})
				return
			}
			this.section = 1
			this.showLogo = true
			setTimeout(() => {
				this.left = '5%'
			}, 500)
			this.showQuestion = false
			setTimeout(() => {
				this.showQuestion = true
				this.showLogo = false
			}, 3000);
		}
	},
	computed: {
		logoTxt () {
			let arr = ['单选题', '多选题', '判断题', '阅读题']
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
		height 100%;
		position relative
		background-color #1902
		.music
			position absolute
			top 20px
			right 20px
			width 35px
			height 35px
			z-index 100
			background url('../assets/music.png') center no-repeat
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
			width 100px
			height 40px
			border 5px solid #486
			position absolute
			top 0
			right 50px
			animation bounceInDown 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards
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
		// .index-section, .result-section, .temp-round
		// 	width 100%
		// 	height 100%
		.index-section
			width 100%
			min-height 100%
			// padding 70px 20px 0
			position relative
			background-color #eee
			.index-content
				margin 0 20px 0
				padding-top 70px
				.title
					margin 0 0 50px
					font-size 18px
					text-align center
				.desc
					font-size 30px
					line-height 1.29
					font-weight 700
					text-align justify
				.paper-info 
					margin-top 80px
					.get-paper
						display flex
						align-items baseline
						flex-wrap nowrap
						margin 20px 0 50px
						input
							// vertical-align top
							outline 0
							border-bottom 1px solid #333
							border-radius 0
							background-color transparent
				.begin
					width 70px
					height 30px
					line-height 30px
					margin 0 auto
					border 1px solid #444
					border-radius 15px
					text-align center
		.temp-round
			padding-top 90px
			margin 0 20px 30px
			.round
				position absolute
				
		.bottom-section
			padding-top 50px
			.pencil
				display inline-block
				// margin-left 0
				width 35px
				height 35px
				background url('../assets/pencil.png') center no-repeat
				background-size cover
				margin-bottom 5px
				transition all .8s linear
				animation shake 1s linear infinite
				@keyframes shake {
					0% {
						transform rotate(-30deg)
					}
					50% {
						transform rotate(-10deg)
					}
					100% {
						transform rotate(-30deg)
					}
				}
			.line
				border-1px(#333)

</style>