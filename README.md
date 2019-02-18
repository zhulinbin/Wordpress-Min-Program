
## 介绍
不通过后台只需要一个前端如何搭建简单的小程序?<br/>
wordpress开源CMS系统提供了免费的REST API接口
https://developer.wordpress.org/rest-api/reference/ <br/>
可供前端开发调用,包括文章发布、评论、点赞、视频发布、用户登录等功能。
会PHP的同学可以自行
<a href="https://developer.wordpress.org/rest-api/extending-the-rest-api/" target="_blank" rel="noopener">扩展REST API</a>


## 微信小程序接入

在小程序中可以通过接口获取数据通过第三方解析工具<a href="https://github.com/icindy/wxParse/" target="_blank" rel="noopener">wxParse</a>解析html标签，在前端进行解析渲染(部分数据如果是json数据则不需要解析)。<br/>
当然也可以通过web-view标签引用html页面到小程序(不支持个人、海外小程序账号)


## 功能
在以上的基础上自己搭建了一个简单的小程序

* 获取健身相关文章
* 查看、搜索相关文章
* 查看和发布(须管理员审核)健身相关视频
* 在线约健身

![小程序截图](https://www.jwdai.com.cn/images/screenShot.png)

![线上小程序二维码](https://www.jwdai.com.cn/images/QRCode.png)

## 相关文章
[从零开始搭建wordpress小程序](https://www.watch-life.net/wordpress-weixin-app)

## Todo
* 加入文章、视频点赞评论
* 加入【我的】Tab
* 查看点赞评论排行榜
