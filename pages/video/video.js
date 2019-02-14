let WxParse = require('../../static/lib/wxParse/wxParse.js')

import httpService from '../../configs/httpService'
import { apiConfig } from '../../configs/api'

Page({
  data: {
    videoList: [],
    releaseVideoBtn: apiConfig.image.index.releaseVideoBtn,
    releaseBtnObj: {
      x: 0,
      y: 0
    },
    isLoadingVideo: true,
    pageObj: {
      count: 8,
      number: 1,
      isLast: false
    }
  },
  onLoad: function() {
    this.setReleaseBtnOffset()
  },
  onReady: function() {
    this.getMedia()
  },
  setReleaseBtnOffset: function() {
    let systemInfo = wx.getSystemInfoSync()
    this.setData({
      'releaseBtnObj.x': systemInfo.windowWidth - 80,
      'releaseBtnObj.y': systemInfo.windowHeight - 100
    })
  },
  onReachBottom: function() {
    if (!this.data.pageObj.isLast) {
      this.getMedia()
    }
  },
  onPullDownRefresh: function() {
    this.setData({
      'pageObj.number': 1,
      'pageObj.isLast': false,
      videoList: []
    })
    this.getMedia()
  },
  getMedia: function() {
    this.setData({
      isLoadingVideo: true
    })
    httpService.get(apiConfig.server.media + `?per_page=${this.data.pageObj.count}&order=desc&orderby=date&page=${this.data.pageObj.number}&media_type=video`).then((res) => {
      res.forEach(item => {
        item.caption = item.caption.rendered.replace(/<[^<>]+?>/g, '').split(',')
      })

      this.setData({
        isLoadingVideo: false,
        videoList: this.data.videoList.concat(res),
        'pageObj.number': ++this.data.pageObj.number
      })

      if (res.length < this.data.pageObj.count) {
        this.setData({
          'pageObj.isLast': true
        })
      }
      wx.stopPullDownRefresh()
    })
  },
  goReleasePage: function() {
    wx.navigateTo({
      url: '../releaseVideo/releaseVideo'
    })
  }
})