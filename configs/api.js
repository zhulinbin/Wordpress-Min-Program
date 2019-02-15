/* 
 * REST API接口文档请参考: https://developer.wordpress.org/rest-api/reference
 */

let server = 'https://www.jwdai.com.cn/wordpress/index.php'

/* wordpress自带插件REST API prefix */
let wpApi = `${server}/wp-json/wp/v2`

/* 自定义扩展REST API prefix */
let customApi = `${server}/wp-json/watch-life-net/v1`

export let apiConfig = {
  image: {
    common: {
      loadingIcon: '../../assets/img/loading.jpg',
      userHeadIcon: '../../assets/img/userHead.png'
    },
    index: {
      authorizeHead: '../../assets/img/authorizeHead.png'
    },
    video: {
      releaseVideoBtn: '../../assets/img/releaseVideoBtn.png'
    },
    releaseVideo: {
      headerImg: '../../assets/img/releaseVideoHeader.png'
    }
  },
	server: {
		posts: `${wpApi}/posts`, // 文章相关内容
		categories: `${wpApi}/categories`, // 分类列表
		tags: `${wpApi}/tags`, // tag相关文章列表
		pages: `${wpApi}/pages`, // 页面相关内容
		comments: `${wpApi}/comments`, // 评论相关内容
		media: `${wpApi}/media`,
		users: `${wpApi}/users`,

		/* 获取文章轮播图:
		 * method: get
		 * params: 无
		 * note: 需要在后台配置需要轮播的文章id
		 */
		swipe: `${customApi}/post/swipe`,

		/* 获取评论和回复:
		 * method: post
		 * params: {
		 *	avatarUrl: xxx,
		 *	encryptedData: xxx,
		 *	iv: xxx,
		 *	js_code: xxx,
		 *  nickname: xxx
		 * }
		 * note: 这些数据需要从微信的wx.login里获取,具体查看微信小程序文档
		 */
		getOpenId: `${customApi}/weixin/getopenid`,

		/* 获取是否开启评论设置:
		 * method: get
		 * params: 无
		 */
		getIsEnabledComment: `${customApi}/options/enableComment`,

		/*
		 * null
		 */
		category: `${customApi}/category/postsubscription`,

		/* 提交微信评论
		 * mothod: null,
		 * params: null
		 */
		postWxComment: `${customApi}/comment/add`,

		/* 获取微信评论
		 * mothod: get,
		 * params: openid=xxx
		 */
		getWxComment: `${customApi}/comment/get`,

		/* 获取热点文章列表
		 * mothod: get,
		 * params: null
		 */
		getHotArticleList: {
 			hot: `${customApi}/post/hotpostthisyear`, // 年热点
 			visits: `${customApi}/post/pageviewsthisyear`, // 年浏览
 			like: `${customApi}/post/likethisyear`, // 年收藏
 			praise: `${customApi}/post/praisethisyear` // 年点赞
		},

		/* 更新文章浏览数:
		 * method: get
		 * params: id
		 * note: 直接拼接'/${id}'即可，不需要加?id字眼
		 */
		updateVisits: `${customApi}/post/addpageview`,

		/* 文章点赞:
		 * method: get
		 * params: null
		 */
		postPraise: `${customApi}/post/like`,

		/* 获取当前用户是否点赞文章:
		 * method: get
		 * params: null
		 */
		getIsPraise: `${customApi}/post/islike`,

		/* 获取我的点赞:
		 * method: get
		 * params: openid=xxx
		 */
		getMyPraise: `${customApi}/post/mylike`,

		/* 打赏获取支付密匙:
		 * method: get
		 * params: null,
		 * note: 需要在后台配置支付密匙
		 */
		getTippingUrl: `${customApi}/payment`,

		/* 更新打赏数据:
		 * method: get
		 * params: null,
		 */
		updateTipping: `${customApi}/post/praise`,

		/* 获取我的打赏数据:
		 * method: get
		 * params: openid=xxx,
		 */
		getTipping: `${customApi}/post/mypraise`,

		/* 获取所有打赏数据:
		 * method: get
		 * params: openid=xxx
		 */
		getAllTipping: `${customApi}/post/allpraise`,

		/* 发送模板消息:
		 * method: get
		 * params: null
		 */
		sendTemplateMsg: `${customApi}/weixin/sendmessage`,

		/* 获取订阅分类列表:
		 * method: get
		 * params: null
		 */
		getCategoryList: `${customApi}/category/getsubscription`,

		/* 发布订阅分类:
		 * method: get
		 * params: null
		 */
		postCategory: `${customApi}/category/postsubscription`,

		/* 删除订阅分类:
		 * method: get
		 * params: null
		 */
		delCategory: `${customApi}/category/delSubscription`,

		/* 获取评论和回复:
		 * method: get
		 * params: postid=xxx&limit=xxx&page=xxx&order=desc
		 */
		getCommentAndReply: `${customApi}/comment/getcomments`,

		/* 生成海报:
		 * method: post
		 * params: {
		 *	path: xxx,
		 *	postid: xxx
		 * }
		 * example params:
		 * {
		 *	path: 'pages/detail/detail?id=1485',
		 *	postid: 166
		 * }
		 */
		createPoster: `${customApi}/weixin/qrcodeimg`,

		/* 获取海报:
		 * method: get
		 * params: 无
		 */
		getPoster: `${server}/wp-content/plugins/rest-api-to-miniprogram/poster`,

		/* 获取二维码:
		 * method: get
		 * params: 无
		 */
		getQrcode: `${server}/wp-content/plugins/rest-api-to-miniprogram/qrcode`
	}
}