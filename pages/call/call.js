Page({
  data: {
    isVisible: true
  },
  onLoad: function() {
    wx.showLoading()
  },
  onReady: function() {
    wx.hideLoading()
  },
  onShow: function() {
    if (!this.data.isVisible) {
      this.setData({
        isVisible: true
      })
    }
  },
  onClosed: function() {
    wx.hideLoading()
    wx.switchTab({
      url: '../index/index'
    })
  },
  doClose: function() {
    wx.showLoading()
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