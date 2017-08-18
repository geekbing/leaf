<template>
  <div class="sidebar-container" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="退出中...">
    <el-menu default-active="leaf" class="el-menu-vertical" @select="menuClick" :collapse="isCollapse" theme="dark">
      <div class="top-container">
        <img :class="['avatar', isCollapse ? 'avatar-close' : 'avatar-open']" @click="isCollapse = !isCollapse"
             src="../assets/avatar.jpg">
        <p class="email" v-if="!isCollapse">dhuzbb@163.com</p>
      </div>
      <el-menu-item index="/new">
        <i class="el-icon-plus"></i>
        <span slot="title">新 增</span>
      </el-menu-item>
      <el-menu-item index="/leaf">
        <i class="el-icon-menu"></i>
        <span slot="title">片 段</span>
      </el-menu-item>
      <el-menu-item index="/share">
        <i class="el-icon-share"></i>
        <span slot="title">分 享</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设 置</span>
      </el-menu-item>
      <el-menu-item index="/feedback">
        <i class="el-icon-information"></i>
        <span slot="title">反 馈</span>
      </el-menu-item>
      <el-menu-item index="/logout">
        <i class="el-icon-upload2"></i>
        <span slot="title">退 出</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        isCollapse: false,
        fullscreenLoading: false
      }
    },
    methods: {
      menuClick (key) {
        // 点击退出则弹出提示确认框
        if (key === 'logout') {
          this.$confirm('确定要退出吗?', '退出', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.fullscreenLoading = true
            setTimeout(() => {
              this.fullscreenLoading = false
              this.$router.push('login')
            }, 1500)
          }).catch(() => {
            this.fullscreenLoading = false
          })
        } else {
          this.$router.push(key)
        }
      }
    }
  }
</script>

<style scoped>
  .sidebar-container {
    width: 100%;
    height: 100%;
  }

  .el-menu-vertical {
    max-width: 140px;
    height: 100%;
    border-radius: 0;
  }

  .avatar {
    display: block;
    margin: 10px auto;
    border: none;
    border-radius: 30px;
    box-shadow: 0 0 10px #ededed;
  }

  .avatar:hover {
    cursor: pointer;
    box-shadow: 0 0 20px #ededed;
  }

  .avatar-open {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .avatar-close {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  .email {
    font-size: 14px;
    color: #ededed;
    width: 140px;
  }
</style>
