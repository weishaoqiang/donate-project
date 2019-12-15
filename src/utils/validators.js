import patterns from '@/utils/patterns'

/**
 * 校验器方法
 */

let validator = {
  // 必须项
  required(val, must = true) {
    if (typeof val === 'boolean' && !must) return true
    return !this.isEmptyValue(val)
  },

  // 检查空值
  isEmptyValue(val) {
    if (typeof val === null || typeof val === undefined) {
      return true
    }
    if (typeof val === 'array' && !val.length) {
      return true
    }
    if (typeof val === 'string' && !val.length) {
      return true
    }
    return false
  }
}

// 添加正则检验
Object.keys(patterns).forEach(key => {
  validator[key] = (val) => {
    const pattern = new RegExp(patterns[key])
    return pattern.test(val)
  }
})

export default validator