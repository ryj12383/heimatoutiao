<template>
  <div class="login">
    <!-- 卡片内容 -->
    <el-card class="login-card">
      <!-- 卡片图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:30px" ref="loginObj" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入你的电话号码"  v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入你的验证码" style="width:65%" v-model="loginForm.code"></el-input>
          <el-button style="float:right" type="primary" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">
            我已阅读并同意
            <span>用户协议</span>和
            <span>隐私条款</span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="onlogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入电话号码' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的电话号码' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位数字的验证码' }
        ],
        checked: [
          {
            validator: function (rule, value, callBack) {
              if (value) {
                callBack()
              } else {
                callBack(new Error('您必须选择条款'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    onlogin () {
      this.$refs.loginObj.validate(isok => {
        if (isok) {
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'
          })
            .then(res => {
              window.localStorage.setItem('token', res.data.data.token)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '手机或者验证码错误'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 360px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
