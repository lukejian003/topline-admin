<template>
  <div class="login-warp">
    <div class="login-from-warp">
      <div class="login-head">
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-from">
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input v-model="form.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button @click="handleSendCode">发送验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" id="dl">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt.js'
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '17777777777',
        code: ''
      },
      captchaObj: null
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleSendCode () {
      const { mobile } = this.form
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }

      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const data = res.data.data
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind'
          },
          captchaObj => {
            this.captchaObj = captchaObj
            // 这里可以调用验证实例 captchaObj 的实例方法

            captchaObj
              .onReady(function () {
                // 验证码ready之后才能调用verify方法显示验证码
                console.log('验证码ready之后才能调用verify方法显示验证码')
                captchaObj.verify()
              })
              .onSuccess(function () {
                // your code
                console.log('验证成功')
              })
              .onError(function () {
                // your code
                console.log('验证错误')
              })
          }
        )
      })
    }
  }
}
</script>

<style lang="less" scopend>
.login-warp {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(./login_bg.jpg) repeat 0, 0;
  background-size: 100%;
  .login-from-warp {
    padding: 50px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      img {
        width: 60%;
        height: 60%;
      }
    }
  }
  #dl {
    width: 100%;
  }
}
</style>
