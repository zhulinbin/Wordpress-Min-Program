import httpService from '../../configs/httpService'
import {
  apiConfig
} from '../../configs/api'

let WxParse = require('../../static/lib/wxParse/wxParse.js')

Page({
  data: {
    url: '',
    isLoading: true
    // content: ''
  },
  onLoad: function(options) {
    // 如果是个人小程序不可以使用webview的，所以按照文章id使用WxParse去解析渲染，本人用企业账号所以直接用webview
    // this.fetchArticleDetail(options.id)
    wx.showNavigationBarLoading()
    let url = options.url
    if (url && url.indexOf('https://') === -1) {
      url = decodeURIComponent(url)
    }

    if (url) {
      this.setData({
        url: url
      })
    }
  },
  doLoadOver: function() {
    wx.hideNavigationBarLoading()
  },
  doLoadError: function() {
    wx.showToast({
      title: '加载失败',
      icon: 'none',
      duration: 900,
      complete: function() {
        wx.hideNavigationBarLoading()
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  },
  onShareAppMessage: function() {
  }
  // fetchArticleDetail(id) {
  //   wx.showLoading()
  //   httpService.get(apiConfig.server.posts + `/${id}`).then((res) => {
  //     wx.hideLoading()
  //     if (res && res.title && res.content) {
  //       wx.setNavigationBarTitle({
  //         title: res.title.rendered
  //       })
  //       WxParse.wxParse('articleDetail', 'html', res.content.rendered, this)
  //       this.setData({
  //         content: res.content.rendered
  //       })
  //     } else {
  //       wx.showToast({
  //         title: '加载失败',
  //         icon: 'none',
  //         duration: 900,
  //         complete: function() {
  //           setTimeout(() => {
  //             wx.navigateBack({
  //               delta: 1
  //             })
  //           }, 1000)
  //         }
  //       })
  //     }
  //   })
  // }
})