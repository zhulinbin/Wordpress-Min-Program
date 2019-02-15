import httpService from '../../configs/httpService'
import {
  apiConfig
} from '../../configs/api'

let app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    excludeId: {
      article: 97,
      category: [1, 27]
    },
    swipeImgList: [],
    articleList: [],
    currentTab: -1,
    isLoadingArticle: true,
    isShowNoMore: false,
    isDisabledBottomRefresh: false,
    tabList: [
      {
        key: '-1',
        title: '最新'
      }
    ],
    pageObj: {
      count: 10,
      number: 1
    },
    iconSets: {
      authorizeHead: apiConfig.image.index.authorizeHead
    },
    userInfo: {},
    isShowAuthorizeModal: false
  },
  onReady: function() {
    this.doGetUserInfo()
    this.getCategories()
    this.getSwipe()
    this.getArticleList()
  },
  doGetUserInfo: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              app.globalData.userInfo = res
              this.setData({
                userInfo: res
              })
              this.doLogin()
            }
          })
        } else {
          wx.hideTabBar({
            animation: true,
            success: () => {
              this.setData({
                isShowAuthorizeModal: true
              })
            },
            fail: () => {}
          })
        }
      }
    })
  },
  onGetUserInfo: function(ev) {
    if (ev.detail.userInfo) {
      app.globalData.userInfo = ev.detail
      this.setData({
        userInfo: ev.detail,
        isShowAuthorizeModal: false
      })
      wx.showTabBar()
      this.doLogin()
    }
  },
  doLogin: function() {
    wx.login({
      success: (res) => {
        if (res.code) {
          this.getOpenId(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getOpenId: function(jsCode) {
    let obj = {
      avatarUrl: this.data.userInfo.userInfo.avatarUrl,
      encryptedData: this.data.userInfo.encryptedData,
      iv: this.data.userInfo.iv,
      js_code: jsCode,
      nickname: this.data.userInfo.userInfo.nickName
    }
    httpService.post(apiConfig.server.getOpenId, obj).then((res) => {
      wx.setStorageSync('openid', res.openid)
    })
  },
  onReachBottom: function() {
    if (!this.data.isDisabledBottomRefresh) {
      this.getArticleList()
    }
  },
  onPullDownRefresh: function() {
    this.setData({
      'pageObj.number': 1,
      articleList: []
    })
    this.getArticleList()
  },
  onTabsChange: function(ev) {
    this.setData({
      currentTab: ev.detail.key,
      'pageObj.number': 1,
      articleList: []
    })
    this.getArticleList()
  },
  getSwipe: function() {
    httpService.get(apiConfig.server.swipe).then((res) => {
      this.setData({
        swipeImgList: res.posts
      })
    })
  },
  getCategories: function() {
    let list = this.data.tabList
    httpService.get(apiConfig.server.categories + `?&exclude=${this.data.excludeId.category}`).then((res) => {
      if (res) {
        res.forEach(item => {
          let obj = {
            key: item.id,
            title: item.name
          }
          list.push(obj)
        })
        this.setData({
          tabList: list
        })
      }
    })
  },
  onGoDetailPage: function(ev) {
    wx.navigateTo({
      url: '../detail/detail?url=' + ev.detail
    })
  },
  doSearchBarConfirm: function(ev) {
    wx.navigateTo({
      url: '../search/search?value=' + ev.detail.value
    })
  },
  getArticleList: function() {
    this.setData({
      isShowNoMore: false,
      isLoadingArticle: true,
      isDisabledBottomRefresh: true
    })
    let params = `?per_page=${this.data.pageObj.count}&orderby=date&order=desc&page=${this.data.pageObj.number}&exclude=${this.data.excludeId.article}`
    if (parseInt(this.data.currentTab) !== -1) {
      params = params + `&categories=${this.data.currentTab}`
    }
    httpService.get(apiConfig.server.posts + params).then((res) => {
      this.setData({
        isLoadingArticle: false,
        articleList: this.data.articleList.concat(res),
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
  }
})