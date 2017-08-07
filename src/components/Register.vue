<template>
  <div class="login-container">
    <img class="login-logo" src="../assets/logo-black@3x.png">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left" label-width="0px" class="login-form">
      <h3 class="login-title">用户注册</h3>
      <el-form-item prop="email">
        <span class="svg-container"><icon-svg icon-class="duanxin"></icon-svg></span>
        <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="邮 箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><icon-svg icon-class="jiesuo"></icon-svg></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin"
                  v-model="loginForm.password" autoComplete="on" placeholder="密 码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><icon-svg icon-class="jiesuo"></icon-svg></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin"
                  v-model="loginForm.password" autoComplete="on" placeholder="重复密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleRegister">注 册
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="text" class="register-btn" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data: function () {
      const validateEmail = (rule, value, callback) => {
        /* eslint-disable */
        const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (!emailPattern.test(value)) {
          callback(new Error('请输入正确的合法邮箱'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        loginForm: {
          'email': '',
          'password': ''
        },
        loginRules: {
          email: [
            {required: true, trigger: 'blur', validator: validateEmail}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        }
      }
    },
    methods: {
      handleRegister () {
        this.loading = true
        setTimeout(() => {
          this.$notify({
            title: '成功',
            message: '注册成功，请登陆。',
            type: 'success'
          })
          this.$router.push('login')
        }, 1000)
      },
      handleLogin () {
        this.$router.push('login')
      }
    }
  }
</script>

<style scoped>
  .login-container {
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
  }

  .login-logo {
    width: 60px;
    height: 60px;
    margin-top: 50px;
  }

  .login-form {
    width: 400px;
    margin: auto;
  }

  .login-title {
    font-size: 26px;
    color: #eeeeee;
    margin: 50px auto;
    text-align: center;
    font-weight: bold;
  }

  .login-container .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .login-container .svg-container {
    padding: 8px 4px 6px 18px;
    font-size: 12px;
    color: #889aa4;
  }

  .login-btn, .login-container .register-btn {
    width: 100%;
    height: 45px;
  }

  .login-container .register-btn:hover {
    transition: background-color 0.5s;
    background-color: #20A0FF;
    color: #ffffff;
  }
</style>
