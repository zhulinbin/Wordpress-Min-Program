let WxParse = require('../../static/lib/wxParse/wxParse.js')

import httpService from '../../configs/httpService'
import { apiConfig } from '../../configs/api'

let app = getApp()

Page({
  data: {
    headerImg: apiConfig.image.releaseVideo.headerImg,
    videoUrl: '',
    articleId: 97,
  },
  onInputChange: function(ev) {
    if (ev.detail) {
      this.setData({
        videoUrl: ev.detail.value
      })
    }
  },
  doClear: function() {
    this.setData({
      videoUrl: ''
    })
  },
  checkVideoUrl: function(videoUrl) {
    let rule ='(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';

    let regExp = new RegExp(rule);
    if (videoUrl === '') {
      return '请输入视频链接'
    } else {
      if (!regExp.test(videoUrl)) {
        return '请输入正确的视频链接'
      }
    }
    return ''
  },
  doReleaseVideo: function() {
    let errorMsg = this.checkVideoUrl(this.data.videoUrl)
    if (errorMsg !== '') {
      wx.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 1000
      })
      return
    }
    let userInfo = app.globalData.userInfo.userInfo
    let obj = {
      post: this.data.articleId,
      author_email: 'test@qq.com',
      author_name: userInfo.nickName,
      content: `${userInfo.nickName},${userInfo.avatarUrl},${this.data.videoUrl}`,
      author_url: userInfo.avatarUrl,
      openid: wx.getStorageSync('openid')
    }

    httpService.post(apiConfig.server.postWxComment, obj).then((res) => {
      if (res.status === '200') {
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: '投稿失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }
})