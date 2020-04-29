<template>
  <div class="login-container">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             autocomplete="on"
             label-position="left">

      <div class="title-container">
        <h4 style="text-align:center">Hello ABP VNext</h4>
        <div class="title">
          <h3>>登录<</h3>
        </div>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username"
                  v-model="loginForm.username"
                  placeholder="账号"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">确定</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>...</span>
        </div>

      </div>
    </el-form>


  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  import SocialSign from './components/SocialSignin'

  export default {
    name: 'Login',
    components: { SocialSign },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入有效的Email'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('登录密码不能少于6个字符'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: "Admin@10000.com",
          password: "Admin@10000.com",
          tenanId: "",
          loading: false,
          grant_type: "password",
          scope: "XManagement",
          client_id: "XManagement_App",
          client_secret: "1q2w3e*"
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkCapslock({ shiftKey, key } = {}) {
        if (key && key.length === 1) {
          if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
            this.capsTooltip = true
          } else {
            this.capsTooltip = false
          }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
          this.capsTooltip = false
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('account/login', this.loginForm)
              .then(() => {
                this.$router.push({
                  path: this.redirect || '/article',
                  query: this.otherQuery
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>

<style lang="scss">

  $bg:#283443;
  $light_gray:#454545;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input

  {
    color: $cursor;
  }

  }

  /* reset element-ui css */
  .login-container {
    .el-input

  {
    display: inline-block;
    height: 47px;
    width: 85%;
    input

  {
    background: transparent;
    border: 1px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    height: 47px;
    caret-color: $cursor;
    &:-webkit-autofill

  {
    box-shadow: 0 0 0px 1000px $bg inset !important;
    -webkit-text-fill-color: $cursor !important;
  }

  }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  }
</style>

<style lang="scss" scoped>

  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-image: linear-gradient(62deg, black 10%, #E0C3FC 100%);
    overflow: hidden;
    .login-form

  {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
    span

  {
    &:first-of-type

  {
    margin-right: 16px;
  }

  }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title

  {
    font-size: 26px;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  }
</style>
