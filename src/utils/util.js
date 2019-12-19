// 获取连接中query的值
export const getUrlParams = name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const match = window.location.search.substr(1).match(reg)
  return match !== null ? unescape(match[2]) : null
}