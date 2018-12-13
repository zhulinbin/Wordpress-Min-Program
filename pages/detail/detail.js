let WxParse = require('../../static/lib/wxParse/wxParse.js')

import httpService from '../../configs/httpService'
import { apiConfig } from '../../configs/api'

Page({
  data: {
    swipeImgList: [],
    navList: [
      {
        img: 'https://www.jwdai.com.cn/wordpress/wp-content/uploads/2018/12/tooopen_sy_143912755726.jpg',
        url: '',
        text: '排行榜单'
      },
      {
        img: 'https://www.jwdai.com.cn/wordpress/wp-content/uploads/2018/12/tooopen_sy_143912755726.jpg',
        url: '',
        text: '微信小程序'
      }
    ],
    articleList: [],
    pageObj: {
      count: 4,
      number: 1,
      isLast: false
    }
  },
  onReady: function() {
    this.getSwipe()
    this.getArticleList()
    // httpService.get(apiConfig.server.pages + '/23')
    // .then((res) => {
    // 	if (res.data) {
    // 		WxParse.wxParse('article', 'html', res.data.content.rendered, this, 5)
    // 	}
    // })
  },
  onReachBottom: function() {
    if (!this.data.pageObj.isLast) {
      this.getArticleList()
    }
  },
  getSwipe: function() {
    httpService.get(apiConfig.server.swipe)
      .then((res) => {
        this.setData({
          swipeImgList: res.posts
        })
      })
  },
  getArticleList: function() {
    httpService.get(apiConfig.server.posts + `?per_page=${this.data.pageObj.count}&orderby=date&order=desc&page=${this.data.pageObj.number}`)
      .then((res) => {
        this.setData({
          articleList: this.data.articleList.concat(res),
          'pageObj.number': ++this.data.pageObj.number
        })

        if (res.length < this.data.pageObj.count) {
          this.setData({
            'pageObj.isLast': true
          })
        }
        wx.stopPullDownRefresh()
      })
  }
})