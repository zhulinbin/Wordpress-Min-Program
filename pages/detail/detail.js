import httpService from '../../configs/httpService'
import {
  apiConfig
} from '../../configs/api'

let WxParse = require('../../static/lib/wxParse/wxParse.js')

Page({
  data: {
    id: '',
    content: ''
  },
  onLoad: function(options) {
    this.fetchArticleDetail(options.id)
  },
  fetchArticleDetail(id) {
    wx.showLoading()
    httpService.get(apiConfig.server.posts + `/${id}`).then((res) => {
      wx.hideLoading()
      if (res && res.title && res.content) {
        wx.setNavigationBarTitle({
          title: res.title.rendered
        })
        WxParse.wxParse('articleDetail', 'html', res.content.rendered, this)
        this.setData({
          content: res.content.rendered
        })
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 900,
          complete: function() {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      }
    })
  }
})