// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'babel-polyfill'

import './common/utils/clientcallback'
import device from './common/utils/device'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

Vue.prototype.$http = axios

if (device.wnl) {
	location.href = 'protocol://getuserinfo#userinfocallback'
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
})
