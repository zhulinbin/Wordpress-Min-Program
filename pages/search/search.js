import httpService from '../../configs/httpService'
import {
  apiConfig
} from '../../configs/api'

Page({
  data: {
    searchValue: '',
    articleList: [],
    isLoadingArticle: true,
    isResetSubmitValue: false,
    pageObj: {
      count: 20,
      number: 1,
      isLast: false
    }
  },
  onLoad: function(options) {
    this.setData({
      searchValue: options.value
    })
    this.getArticleList()
  },
  doClear: function() {
    this.resetSubmitValue()
  },
  doSearchBarConfirm: function(ev) {
    this.resetSubmitValue(ev.detail.value)
    this.getArticleList()
  },
  doChange: function(ev) {
    this.resetSubmitValue(ev.detail.value)
  },
  doCancel: function() {
    this.resetSubmitValue()
  },
  resetSubmitValue: function(value = '') {
    this.setData({
      'pageObj.number': 1,
      'pageObj.isLast': false,
      searchValue: value,
      isResetSubmitValue: true
    })
  },
  onReachBottom: function() {
    if (!this.data.pageObj.isLast) {
      this.getArticleList()
    }
  },
  onPullDownRefresh: function() {
    this.resetSubmitValue(this.data.searchValue)
    this.getArticleList()
  },
  onGoDetailPage: function(ev) {
    wx.navigateTo({
      url: '../detail/detail?id=' + ev.detail
    })
  },
  getArticleList: function() {
    this.setData({
      isLoadingArticle: true
    })
    let params = `?per_page=${this.data.pageObj.count}&orderby=date&order=desc&page=${this.data.pageObj.number}&search=${this.data.searchValue}`

    httpService.get(apiConfig.server.posts + params).then((res) => {
      let articleList = this.data.isResetSubmitValue ? res : this.data.articleList.concat(res)

      this.setData({
        isLoadingArticle: false,
        articleList: articleList,
        'pageObj.number': ++this.data.pageObj.number,
        isResetSubmitValue: false
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