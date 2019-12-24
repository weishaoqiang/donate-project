import http from '@/http'

// 获取openId
export const getOpenId = params => http.get('getOpenId', { params })

// 获取捐款总数解救
export const getDonateTotal = params => http.get('someApi', { params })

// 获取捐款人信息
export const getDonatesInfo = params => http.get('someApi', { params })

// 提交订单接口
export const submitDonateBill = params => http.post('someApi', { params })

// 生成预付单接口
export const paybill = params => http.get('someApi', { params })
