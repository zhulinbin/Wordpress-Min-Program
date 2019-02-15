let WxParse = require('../../static/lib/wxParse/wxParse.js')

import httpService from '../../configs/httpService'
import { apiConfig } from '../../configs/api'

Page({
  data: {
    videoList: [],
    iconSets: {
      releaseVideoBtn: apiConfig.image.video.releaseVideoBtn,
      userHeadIcon: apiConfig.image.common.userHeadIcon
    },
    releaseBtnObj: {
      x: 0,
      y: 0
    },
    isLoadingVideo: true,
    isShowNoMore: false,
    isDisabledBottomRefresh: false,
    pageObj: {
      count: 10,
      number: 1
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
    if (!this.data.isDisabledBottomRefresh) {
      this.getMedia()
    }
  },
  onPullDownRefresh: function() {
    this.setData({
      'pageObj.number': 1,
      videoList: []
    })
    this.getMedia()
  },
  getMedia: function() {
    this.setData({
      isShowNoMore: false,
      isLoadingVideo: true,
      isDisabledBottomRefresh: true
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
          isShowNoMore: true
        })
      } else {
        this.setData({
          isDisabledBottomRefresh: false
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