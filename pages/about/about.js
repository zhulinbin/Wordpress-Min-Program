let WxParse = require('../../static/lib/wxParse/wxParse.js')

// import httpService from '../../configs/httpService'
import { apiConfig } from '../../configs/api'

Page({
  data: {
  },
  onReady: function() {
    // httpService.get(apiConfig.server.pages + '/23')
    // .then((res) => {
    // 	if (res.data) {
    // 		WxParse.wxParse('article', 'html', res.data.content.rendered, this, 5)
    // 	}
    // })
  }
})