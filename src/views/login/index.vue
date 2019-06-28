<template>
  <div class="login-warp">
    <div class="login-from-warp">
      <div class="login-head">
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-from">
        <el-form ref="ruleForm" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button @click="handleSendCode" :disabled="!!codeTimer||codeLoading">{{codeTimer?`剩余 ${codeSecons} 秒`:'发送验证码'}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="agree">
            <el-checkbox v-model="form.agree">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" id="dl" :loading="loginLoading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import '@/vendor/gt.js'
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '17777318254',
        code: '246810',
        agree: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度 11 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度 6 个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意服务条款', trigger: 'change' },
          { pattern: /true/, message: '请同意服务条款', trigger: 'change' }
        ]
      },
      captchaObj: null,
      loginLoading: false,
      codeSecons: 60,
      codeTimer: null,
      sendMobile: '',
      codeLoading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      this.$http({
        method: 'POST',
        url: '/authorizations',
        data: this.form
      })
        .then(data => {
          // console.log(res)
          window.localStorage.setItem('user_info', JSON.stringify(data))
          this.$message({
            message: '牛逼，登录成功！',
            type: 'success'
          })
          this.loginLoading = false
          this.$router.push({
            name: 'home'
          })
        })
        .catch(err => {
          this.loginLoading = false
          // console.log(err)
          // console.log(status)
          const status = err.response.status
          if (status === 400) {
            this.$message.error('卧槽，手机号和验证码错了吧!')
          } else if (status === 403) {
            this.$message.error('卧槽，无权限登录!')
          } else if (status === 507) {
            this.$message.error('GG，服务器数据库异常!')
          }
        })
    },
    handleSendCode () {
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().lenght > 0) {

        }
      })

      if (this.captchaObj) {
        if (this.form.mobile !== this.sendMobile) {
          this.showGeetest()
        } else {
          return this.captchaObj.verify()
        }
      } else {
        this.showGeetest()
      }
    },
    showGeetest () {
      this.codeLoading = true
      const { mobile } = this.form

      this.$http({
        method: 'GET',
        url: `/captchas/${mobile}`
      }).then(data => {
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
              .onReady(() => {
                // 验证码ready之后才能调用verify方法显示验证码
                // console.log('验证码ready之后才能调用verify方法显示验证码')
                this.codeLoading = false
                this.sendMobile = this.form.mobile
                captchaObj.verify()
              })
              .onSuccess(() => {
                // your code
                // console.log(captchaObj.getValidate())
                const {
                  geetest_challenge: challenge,
                  geetest_seccode: seccode,
                  geetest_validate: validate
                } = captchaObj.getValidate()
                this.$http({
                  method: 'GET',
                  url: `/sms/codes/${mobile}`,
                  params: {
                    challenge,
                    seccode,
                    validate
                  }
                }).then(data => {
                  // console.log(res)
                  // 倒计时在这里
                  this.codeCounDown()
                })
              })
              .onError(function () {
                // your code
                console.log('验证错误')
              })
          }
        )
      })
    },
    codeCounDown () {
      console.log('倒计时开始')
      this.codeTimer = window.setInterval(() => {
        this.codeSecons--
        if (this.codeSecons <= 0) {
          this.codeSecons = 10
          window.clearInterval(this.codeTimer)
          // console.log(this.codeTimer)
          this.codeTimer = null
        }
      }, 1000)
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
  background: url(./login_bg1.jpeg) repeat;
  background-size: 50%;
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
