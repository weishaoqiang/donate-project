import validators from '@/utils/validators'

// 作用于内全局私有函数
const isFunction = val => typeof val === 'function'

const isPlainObject = val => (typeof val === 'object' && val !== null)

const defaultOptions = {
  handleMessage(val) { // 校验失败触发的函数
  },
  message(key) { // 返回默认定义的错误格式
    return `${key}校验失败`
  }
}

class Validate {
  constructor(source, rules, options = {}) {
    this._source = source
    this._rules = rules
    this._validators = validators
    this._options = Object.assign({}, defaultOptions, options)
    this._errors = new Set() // 存放错误信息
  }

  // 私有方法，获取_source中的key对应值，支持点分割对象
  _getValue(key) {
    const subkeys = key.split('.')
    let value = this._source
    for (let i = 0; i < subkeys.length; i++) {
      value = value[subkeys[i]]
    }
    return value
  }

  // 私有方法，校验每个传入的规则
  _validateRule(key, rule) {
    /**
     * 解析出来这个rule中的每个规则
     * 对每个规则进行校验,过滤掉消息
     */
    let pass = true
    Object.keys(rule)
    .filter(attr => attr !== 'message' && attr !== 'handleMessage') // 筛选出来不属于错误提示的函数
    .forEach(attr => {
      const errorHandle = rule.handleMessage || this._options.handleMessage // 除非rule中有定义错误的handle否则使用默认handle
      let value = this._getValue(key)
      if (attr in this._validators) {
        /**
         * 调用vaidator的检验方法，并拿到校验结果
         * 如果校验不通过，要把错误信息存起来并反映到页面上
         **/
        pass = isFunction(this._validators[attr]) && this._validators[attr](value, rule[attr])
        if(!pass) {
          isFunction(errorHandle) && errorHandle(rule.message || this._options.message(attr))
          this._errors.add(rule.message || this._options.message(attr))
        }
      } else if (attr === 'validator' && isFunction(rule[attr])) {
        /**
         * 这种情况有两种定义错误的方式
         * 第一种是自定义校验函数返回true或false
         * 第二种是自定义函数抛出一个错误
         */
        try {
          const result = rule[attr].call(null, value)
          if (!result) {
            pass = false
            isFunction(errorHandle) && errorHandle(rule.message || this._options.message(attr))
            this._errors.add(rule.message || this._options.message(attr))
          }
        } catch (err) {
          pass = false
          isFunction(errorHandle) && errorHandle(err.message)
          this._errors.add(err.message)
        }
      } else {
        throw new Error('the rule expression must be wrong!')
      }
    })
    return pass
  }

  validate() {
    const promise = new Promise((resolve, reject) => {
        Object.keys(this._rules)
        .forEach(key => {
          this._rules[key].forEach(rule => {
            this._validateRule(key, rule)
          })
        })
        if (this._errors.size) {
          reject(this._errors)
        }
        resolve()
    })
    return promise
  }
}

export default Validate