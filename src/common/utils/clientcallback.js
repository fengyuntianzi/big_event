import root from './root'
let Base64 = require('js-base64').Base64;
import store from '../../store/store'

root.userinfocallback = function (result) {
	var originalString = Base64.decode(result);
	var originalAllObj = JSON.parse(originalString);
	// alert( originalAllObj.native_usercenter.name)
	// 设置用户名
	if(originalAllObj.native_usercenter != undefined || originalAllObj.native_usercenter != null) {
		// store.userName = originalAllObj.native_usercenter.name ? originalAllObj.native_usercenter.name : originalAllObj.native_usercenter.nickname
		store.commit('setUserName', {
			userName: originalAllObj.native_usercenter.name ? originalAllObj.native_usercenter.name : originalAllObj.native_usercenter.nickname
		})
	}
}