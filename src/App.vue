<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  }

  .login-container .el-input {
    display: inline-block;
    height: 47px;
    line-height: 47px;
    width: 354px;
  }

  .login-container .el-input input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
    background-color: #2d3a4b !important;
  }

  .login-container .el-input input {
    background: transparent !important;
    -webkit-appearance: none;
    border: 0;
    border-radius: 0;
    padding: 12px 0 12px 15px;
    color: #eeeeee;
    height: 47px;
  }

  .input-new-tag .el-input__inner {
    height: 24px;
  }

  .editor-toolbar a {
    outline: none !important;
  }

  .el-upload-dragger:hover {
    border-width: 2px;
  }
</style>
