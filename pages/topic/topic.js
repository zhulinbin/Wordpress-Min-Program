let WxParse = require('../../static/lib/wxParse/wxParse.js')

import httpService from '../../configs/httpService'
import { apiConfig } from '../../configs/api'

Page({
  data: {
    categoryList: [],
    pageObj: {
      count: 8,
      number: 1,
      isLast: false
    }
  },
  onReady: function() {
    this.getCategory()
  },
  onReachBottom: function() {
    if (!this.data.pageObj.isLast) {
      this.getCategory()
    }
  },
  getCategory: function() {
    httpService.get(apiConfig.server.categories + `?per_page=${this.data.pageObj.count}&order=desc&orderby=count&page=${this.data.pageObj.number}`)
      .then((res) => {
        this.setData({
          categoryList: this.data.categoryList.concat(res),
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