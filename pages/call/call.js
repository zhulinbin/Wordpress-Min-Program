Page({
  data: {
    isVisible: true
  },
  onLoad: function() {
    wx.showNavigationBarLoading()
  },
  onReady: function() {
    wx.hideNavigationBarLoading()
  },
  onShow: function() {
    if (!this.data.isVisible) {
      this.setData({
        isVisible: true
      })
    }
  },
  onClosed: function() {
    wx.hideNavigationBarLoading()
    wx.switchTab({
      url: '../index/index'
    })
  },
  doClose: function() {
    wx.showNavigationBarLoading()
    this.setData({
      isVisible: false
    })
  },
  doAddWeChat: function() {
    wx.showToast({
      title: '正在加班开通中',
      icon: 'none'
    })
  }
})