<template>
  <div class="setting-container">
    <el-row :gutter="40">
      <el-col :span="12">
        <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="chineseName">
            <el-input v-model="formData.chineseName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="博客" prop="blogUrl">
            <el-input v-model="formData.blogUrl"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input type="textarea" :autosize="{minRows: 3, maxRows: 3}" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="update-btn" type="primary" @click="updateInfo('ruleForm')">更 新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button>上传新头像</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'setting',
    data () {
      return {
        formData: {
          chineseName: '郑彬彬',
          email: 'dhuzbb@gmail.com',
          blogUrl: 'http://geekbing.com/',
          intro: 'I make website and apps. I love it!'
        },
        imageUrl: '',
        rules: {
          chineseName: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          blogUrl: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          intro: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      updateInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .setting-container {
    width: 100%;
    height: 100%;
    padding: 40px;
    text-align: center;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .update-btn {
    width: 100%;
  }
</style>
