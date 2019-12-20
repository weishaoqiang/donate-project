let AppId, APPURL, APIURL
if (process.env.NODE_ENV === 'development') {
  APPURL = 'bssjyjjh.org.cn:8080' // 服务器访问前端项目地址
  APIURL = '' // 服务器访问后台服务地址
  AppId = 'wx9e36f53353161660'
} else if (process.env.NODE_ENV === 'production') {
  APPURL = 'bssjyjjh.org.cn' // 服务器访问前端项目地址
  APIURL = '' // 服务器访问后台服务地址
  AppId = 'wxf74397d97d66fa59'
}

export { AppId, APPURL, APIURL }