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
    isShowNoMore: false,
    isDisabledBottomRefresh: false,
    pageObj: {
      count: 10,
      number: 1
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
      searchValue: value,
      isResetSubmitValue: true
    })
  },
  onReachBottom: function() {
    if (!this.data.isDisabledBottomRefresh) {
      this.getArticleList()
    }
  },
  onPullDownRefresh: function() {
    this.resetSubmitValue(this.data.searchValue)
    this.getArticleList()
  },
  onGoDetailPage: function(ev) {
    wx.navigateTo({
      url: '../detail/detail?url=' + ev.detail
    })
  },
  getArticleList: function() {
    this.setData({
      isShowNoMore: false,
      isLoadingArticle: true,
      isDisabledBottomRefresh: true
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
          isShowNoMore: true
        })
      } else {
        this.setData({
          isDisabledBottomRefresh: false
        })
      }
      wx.stopPullDownRefresh()
    })
  }
})