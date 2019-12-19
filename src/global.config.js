let AppId, PRODUCT_URL, PAGE_URL
if (process.env.NODE_ENV === 'development') {
  AppId = 'wx9e36f53353161660'
} else if (process.env.NODE_ENV === 'production') {
  AppId = 'wxf74397d97d66fa59'
}