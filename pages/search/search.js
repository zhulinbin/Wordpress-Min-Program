import httpService from '../../configs/httpService'
import {
  apiConfig
} from '../../configs/api'

Page({
  data: {
    searchValue: '',
    articleList: [],
    excludeId: {
      article: [97, 167]
    },
    isLoadingArticle: true,
    isResetSubmitValue: false,
    isShowNoMore: false,
    skeletonRow: 8,
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
      this.getArticleList({
        skeletonRow: 2
      })
    }
  },
  onPullDownRefresh: function() {
    this.resetSubmitValue(this.data.searchValue)
    this.getArticleList({
      isPullDown: true
    })
  },
  onGoDetailPage: function(ev) {
    wx.navigateTo({
      url: '../detail/detail?url=' + ev.detail
    })
  },
  getArticleList: function(obj = {}) {
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
    let params = `?per_page=${this.data.pageObj.count}&orderby=date&order=desc&page=${this.data.pageObj.number}&search=${this.data.searchValue}&exclude=${this.data.excludeId.article}`

    httpService.get(apiConfig.server.posts + params).then((res) => {
      if (res) {
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
      }

      wx.stopPullDownRefresh()
    })
  }
})