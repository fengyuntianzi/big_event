<template>
	<div class="event">
		<!-- <div class="music" id='music' ref="music">
			<audio src="../assets/Synthion.mp3" autoplay="autoplay"></audio>
		</div> -->
		<div class="type-logo" v-show="showLogo">
			<div class="logo-txt">{{logoTxt}}</div>
		</div>
		<div class="index-logo" v-show="section === 0">
			<img  src="../assets/images/index-tag.png" width="166" height="69">
			<div class="index-copytight">
				<div>出品方：</div><img src="../assets/logo.png" alt="" width="29" height="29"><div>万年历</div>
			</div>
		</div>
		<div class='index-section' v-show="section === 0">
			<div class="index-content">
				<img class="title" src="../assets/images/index-title.png">
				<!-- <img class="title" src="../assets/images/index-title.png"> -->
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
export default {
	data () {
		return {
			section: 5,
			userName: '',
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
			this.userName = this.$store.state.userName
			console.log(this.userName)
			if (this.userName !== '') {
				this.inputName = this.userName
			}
		}, 500)
	},
	mounted () {
		// let dom = this.$refs.music
		// console.log(window.getComputedStyle(dom).top)
		if (this.section === 5) {
			this.showLogo = true
		}
	},
	methods: {
		changeToindex () {
			// this.section = 0
			// this.questions.forEach((item) => {
			// 	item.forEach((temp) => {
			// 		temp.options.forEach((a) => {
			// 			a.isActive = true
			// 		})
			// 	})
			// })
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
			if (this.inputName === '') {
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
		overflow auto
		position relative
		background-color #ffdb12
		.music
			position absolute
			top 20px
			right 20px
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
			.index-copytight
				display flex
				align-items center
				position absolute
				top 30px
				left 10px
		.index-section
			width 100%
			min-height 100%
			position relative
			.index-content
				margin 0 17px 0 19px
				padding-top 51.5px
				.title
					width 100%
					height calc((100vw - 36px) * 0.6430678466076696)
				.desc
					font-size 30px
					line-height 1.29
					font-weight 700
					text-align justify
				.paper-info 
					margin-top 30px
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
			bottom 60px
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