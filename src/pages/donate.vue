<template>
  <div class="container">
    <div class="header-panel">
      <div class="logo">
        <img src="@/assets/image/logo.jpeg" alt="">
      </div>
      <div class="title">
        <h1>百色市教育基金会</h1>
      </div>
    </div>
    <div class="content-panel">
      <van-cell-group :border="false">
        <div class="scroll-content" ref="scrollBox">
          <p class="text" :style="{'left': `${left}px`}" ref="scrollText">滚动文字滚动文字滚动文字滚动fkdlkfldkfldfkldfkdddddddlfdlfldfklvmlkdfmvldkmfvdlfndkjcnkdncksdnckdsncksdncksdnckdscnkdnckdsnckdscnkdncjkdsnckdsckeufierhiuiernvckdncksdcnkdscnksdnckwjoecmlsmcldmclkmsdvldfnvld文字滚滚动文字滚动文字滚动文字滚动fkdlkfldkfldfkldfkdddddddlfdlfldfklvmlkdfmvldkmfvdlfndkjcnkdncksdnckdsncksdncksdnckdscnkdnckdsnckdscnkdncjkdsnckdsckeufierhiuiernvckdncksdcnkdscnksdnckwjoecmlsmcldmclkmsdvldfnvld文字滚滚动文字滚动文字滚动文字滚动fkdlkfldkfldfkldfkdddddddlfdlfldfklvmlkdfmvldkmfvdlfndkjcnkdncksdnckdsncksdncksdnckdscnkdnckdsnckdscnkdncjkdsnckdsckeufierhiuiernvckdncksdcnkdscnksdnckwjoecmlsmcldmclkmsdvldfnvld文字滚滚动文字滚动文字滚动文字滚动fkdlkfldkfldfkldfkdddddddlfdlfldfklvmlkdfmvldkmfvdlfndkjcnkdncksdnckdsncksdncksdnckdscnkdnckdsnckdscnkdncjkdsnckdsckeufierhiuiernvckdncksdcnkdscnksdnckwjoecmlsmcldmclkmsdvldfnvld文字滚</p>
        </div>
        <van-cell :border="false" title="已捐赠总数" :value="totalDonatemoney + '元'" />
      </van-cell-group>
      <van-cell-group>
        <van-field type="number" label="捐赠金额(元)" v-model="listValue.donatemoney" placeholder="请输入" />
        <van-field label="姓名" v-model="listValue.name" placeholder="请输入" />
        <van-field label="单位" v-model="listValue.unit" placeholder="请输入" />
        <van-field label="联系电话" type="tel" v-model="listValue.phone" placeholder="请输入" />
        <van-field label="联系地址" v-model="listValue.address" placeholder="请输入" />
        <van-field label="发票" v-model="listValue.bill" placeholder="选填" />
        <van-field label="税号" v-model="listValue.utyParagraph" placeholder="选填" />
        <van-field v-model="listValue.remark" rows="2" autosize label="备注" type="textarea" maxlength="200" placeholder="选填,请输入留言" show-word-limit />
      </van-cell-group>
    </div>
    <van-submit-bar
      class="foot-panel"
      :price="listValue.donatemoney * 100"
      button-text="确认捐赠"
      @submit="onSubmit"
      safe-area-inset-bottom
    />
  </div>
</template>

<script>
import { Button, Panel, Divider, Field, Cell, CellGroup, SubmitBar, AddressEdit } from 'vant'
import Validate from '@/utils/validator'
import { getOpenId, submitDonateBill, paybill, getDonatesInfo, getDonateTotal } from '@/api/donate'
import { getUrlParams } from '@/utils/util'
import { AppId, APPURL, APIURL } from '@/global.config'
export default {
  name: 'Donate',
  components: {
    [Button.name]: Button,
    [Panel.name]: Panel,
    [Divider.name]: Divider,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SubmitBar.name]: SubmitBar,
    [AddressEdit.name]: AddressEdit
  },
  data() {
    return {
      totalDonatemoney: 0, // 捐赠总额
      listValue: {
        donatemoney: '',
        name: '',
        unit: '',
        phone: '',
        address: '',
        bill: '',
        utyParagraph: '',
        remark: ''
      },
      code: '061EeHrI1XACg40YvOtI1XkTrI1EeHr7',
      left: 0,
      requestAnimationID: null,
      rules: {
        donatemoney: [{ required: true, message: '请填写捐赠金额' }],
        name: [{ required: true, message: '请填写姓名' }],
        unit: [{ required: true, message: '请填写单位' }],
        phone: [
          { required: true, message: '请填写联系电话' },
          { isPhone: true, message: '电话号码格式错误' }],
        address: [{ required: true, message: '请填写通信地址' }]
      }
    }
  },
  mounted() {
    const pageUrl = window.location.href
    const SCOPE = 'snsapi_base'
    const code = getUrlParams('code') || this.code
    if(!code) {
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(pageUrl)}&response_type=code&scope=${SCOPE}&state=123#wechat_redirect` //若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。
    } else {
      this.code = code
      console.log('code:' + this.code)
      getOpenId({ code: this.code }).then(res => {
        console.log(res)
      })
    }
    this.$nextTick(() => {
      this.requestAnimationID = window.requestAnimationFrame(this.textScrollAnimation)
    })
  },
  destroyed() {
    cancelAnimationFrame(this.requestAnimationID)
  },
  computed: {
    scrollTextW() {
      return this.$refs.scrollText.offsetWidth
    },
    scrollBoxW: {
      get() {
        return this.$refs.scrollBox.offsetWidth
      },
      set(val) {
        this.left = val
      }
    }
  },
  methods: {
    textScrollAnimation() {
      // 文字滚送方法
      if (this.left > -this.scrollTextW) {
        this.left -= 1
      } else {
        this.left = this.scrollBoxW
      }
      window.requestAnimationFrame(this.textScrollAnimation)
    },
    async getDonateTotal() {
      const  donateTotal = await getDonateTotal()
      console.log(donateTotal)
    },
    async getDonatesInfo() {
      const donatesInfo = await getDonatesInfo()
      console.log(donatesInfo)
    },
    validate() {
      const validate = new Validate(this.listValue, this.rules)
      return validate.validate()
    },
    onSubmit() {
      /**
       * 1. 调起提交订单接口，提交捐款生成账单，并返回账单id
       * 2. 调起生成预付单接口，提交订单id，返回支付接口的支付参数
       * 3. 调起微信支付
       */
      this.validate().then(async res => {
        const { billId } = await submitDonateBill(this.listValue)
        const openId = await getOpenId({ code: this.code })
        const { timeStamp, nonceStr, signType, paySign } = await paybill({ billId })
          WeixinJSBridge.invoke('getBrandWCPayRequest', { // eslint-disable-line no-undef
            "appId": timeStamp, //公众号名称，由商户传入     
            "timeStamp": timeStamp, //时间戳，自1970年以来的秒数     
            "nonceStr": nonceStr, //随机串     
            // "package": package,
            "signType":"MD5", //微信签名方式：     
            "paySign": paySign //微信签名 
          },
          function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            }
          })
        }).catch(err => {
        this.$notify([...err][0])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    background-color: #fff;
  }

  .header-panel {
    height: 88px;
    width: 100%;
    box-sizing: border-box;
    padding: 14px 10px;
    display: flex;
    justify-content: flex-start;
    .logo {
      width: 60px;
      height: 60px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      flex: 1;
      line-height: 60px;
      padding: 0 12px;
      h1 {
        font-size: 24px;
        color: #323232;
      }
    }
  }

  .content-panel {
    height: calc(100vh - 146px);
  }

  .scroll-content {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    line-height: 1;
    box-sizing: border-box;
    overflow: hidden;
    background-color: rgba(37,37,37,0.04);
    .text {
      position: absolute;
      height: 40px;
      line-height: 40px;
      left: 0;
      top: 0;
      color: #e81e1e;
      white-space: nowrap;
    }
  }

  .foot-panel {
    box-shadow: 0 1px 4px rgba(37, 37, 37, 0.07);
  }
</style>