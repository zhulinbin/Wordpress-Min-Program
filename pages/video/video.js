let WxParse = require('../../static/lib/wxParse/wxParse.js')

import httpService from '../../configs/httpService'
import { apiConfig } from '../../configs/api'

Page({
  data: {
    mediaId: 167,
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
    skeletonRow: 8,
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
      this.getMedia({
        skeletonRow: 2
      })
    }
  },
  onPullDownRefresh: function() {
    this.setData({
      'pageObj.number': 1
    })
    this.getMedia({
      isPullDown: true
    })
  },
  getMedia: function(obj = {}) {
    let options = {
      isPullDown: false,
      skeletonRow: 8
    }
    options = Object.assign({}, options, obj)
    this.setData({
      isShowNoMore: false,
      isLoadingArticle: !options.isPullDown,
      isDisabledBottomRefresh: true,
      skeletonRow: options.skeletonRow
    })

    httpService.get(apiConfig.server.comments + `?per_page=${this.data.pageObj.count}&order=desc&orderby=date&page=${this.data.pageObj.number}&post=${this.data.mediaId}&password=luo641361&`).then((res) => {
      if (res) {
        res.forEach(item => {
          item.content = item.content.rendered.replace(/<[^<>]+?>/g, '').split(',')
        })
        let list = options.isPullDown ? res : this.data.videoList.concat(res)
        this.setData({
          isLoadingVideo: false,
          videoList: list,
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