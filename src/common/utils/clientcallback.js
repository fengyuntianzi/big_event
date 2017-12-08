import root from './root'
let Base64 = require('js-base64').Base64;
import store from '../../store/store'

root.userinfocallback = function (result) {
	var originalString = Base64.decode(result);
	var originalAllObj = JSON.parse(originalString);
	// alert(originalString)
	// // 设置userid、deviceid
	// store.commit('setUserInfo', {
	// 	userId: originalAllObj.native_score.userId,
	// 	deviceId: originalAllObj.native_score.deviceId
	// })
	// 设置用户名
	if(originalAllObj.native_usercenter != undefined || originalAllObj.native_usercenter != null) {
		store.userName = originalAllObj.native_usercenter.name || originalAllObj.native_usercenter.nickname
	}
}

// let url = location.href.replace(/payresult=1/ig, '');
// let localUrl = url.replace(/#/ig,'?#');
// console.log('localUrl:' + localUrl);
// let title = '每日一言评论专区';
// let text = '每日一言评论专区';
// let imageURL = 'http://qiniu.image.cq-wnl.com/sentenceimg/20171002b2d5c7bbedc045ac8c9eb2fe7b435f9f.jpg';

// window.textObj = {
// 	title: title,
// 	text: text,
// 	image: '0',
// 	imageURL: imageURL,
// 	url: localUrl,
// 	pureText: text,
// 	prefix: ''
// };
// window.textObj1 = {
// 	title: title,
// 	text: text,
// 	image: '0',
// 	imageURL: imageURL,
// 	targetUrl: localUrl,
// 	perfix: ''
// };

// window.appCallback_share = function () {
// 	try {
// 		if (window.ylwindow) {
// 			ylwindow.reportHasShare(true);
// 			location.href = 'protocol://share:' + encodeURI(JSON.stringify(window.textObj1));
// 		}
// 		else {
// 			location.href = 'protocol://share#' + encodeURI(JSON.stringify(window.textObj));
// 		}
// 	}
// 	catch (e) { }
// 	return 1;
// }