let AppId, APPURL, APIURL
if (process.env.NODE_ENV === 'development') {
  APPURL = 'bssjyjjh.org.cn:8080' // 服务器访问前端项目地址
  APIURL = 'http://119.23.29.116:8090/' // 服务器访问后台服务地址
  AppId = 'wxf74397d97d66fa59'
} else if (process.env.NODE_ENV === 'production') {
  APPURL = 'bssjyjjh.org.cn' // 服务器访问前端项目地址
  APIURL = 'http://119.23.29.116:8090/' // 服务器访问后台服务地址
  AppId = 'wxf74397d97d66fa59'
}

export { AppId, APPURL, APIURL }