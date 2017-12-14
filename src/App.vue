<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<!-- <router-view/> -->
		<event/>
	</div>
</template>

<script>
import event from './components/event'
export default {
	name: 'app',
	components: {
		event
	}
}
</script>

<style>
html,body {
	font-family: 'PingFangSC',"苹方-简", "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif;
}
@font-face {
	font-family: 'tx';
	src: url('./assets/tx.ttf');
}
#app {
	width: 100%;
	height: 100%;
	font-family: 'tx';
	overflow-x: hidden;
}
.weui-toast_text .weui-toast__content {
	font-size: 15px !important
}
/* .weui-toast.weui-toast_text.vux-toast-bottom {

} */
</style>