import httpService from './configs/httpService'
import { apiConfig } from './configs/api'

App({
  onLaunch: function () {
  	let openid = wx.getStorageSync('openid')
  	if (openid) {
		wx.checkSession({
		  success() {
		    // session_key 未过期，并且在本生命周期一直有效
		  },
		  fail() {
			this.doLogin()
		  }
		})
  	} else {
  		this.doLogin()
  	}
  },
  doLogin: function() {
    wx.login({
	  success(res) {
	  	console.log('login')
	  	console.log(res)
	    if (res.code) {
		  	wx.getUserInfo({
				success: (subRes) => {
					console.log('subRes')
					this.getOpenId(res.code, subRes.userInfo)
				},
				fail: () => {
					console.log('falied')
				}
		  	})
	    } else {
	      console.log('登录失败！' + res.errMsg)
	    }
	  }
	})
  },
  getOpenId: function(jsCode, userInfo) {
	let obj = {
		avatarUrl: userInfo.avatarUrl,
		encryptedData: encryptedData,
		iv: iv,
		js_code: jsCode,
		nickname: userInfo.nickName
	}
	httpService.post(apiConfig.server.getOpenId, obj)
	  .then((res) => {
	  	console.log('获取openid', res)
	  	wx.setStorageSync('openid',res.openid)
	  })
  }
})
