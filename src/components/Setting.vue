<template>
  <div class="setting-container">
    <el-row :gutter="30">
      <el-col :span="8">
        <el-card class="box-card box-card-info" v-loading.body="infoForm.loading" element-loading-text="更新中...">
          <el-form :model="infoForm" :rules="infoFormRules" ref="infoForm" label-width="100px" class="infoForm">
            <el-form-item label="姓名" prop="chineseName" label-width="50px">
              <el-input v-model="infoForm.chineseName"></el-input>
            </el-form-item>
            <el-form-item label="博客" prop="blogUrl" label-width="50px">
              <el-input v-model="infoForm.blogUrl"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="intro" label-width="50px">
              <el-input v-model="infoForm.intro" type="textarea" :autosize="{minRows: 3, maxRows: 3}"></el-input>
            </el-form-item>
            <el-form-item label-width="50px">
              <el-button class="info-update-btn" type="primary" @click="updateInfo('infoForm')">更 新
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card box-card-email" v-loading.body="emailForm.loading" element-loading-text="更新中...">
          <el-form :model="emailForm" :rules="emailFormRules" ref="emailForm" label-width="100px" class="emailForm">
            <el-form-item label="旧邮箱" prop="oldEmail" label-width="60px">
              <el-input v-model="emailForm.oldEmail"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode" label-width="60px">
              <el-input v-model="emailForm.verificationCode"></el-input>
            </el-form-item>
            <el-form-item label="新邮箱" prop="newEmail" label-width="60px">
              <el-input v-model="emailForm.newEmail"></el-input>
            </el-form-item>
            <el-form-item label-width="60px">
              <el-button class="email-update-btn" type="primary" :loading="emailForm.loading"
                         @click="updateEmail('emailForm')">
                更 新
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card box-card-avatar">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip el-upload_tip_first">1. 点击头像来上传新头像，只能上传jpg/png图片</div>
            <div slot="tip" class="el-upload__tip">2. 图片尺寸180 x 180，图片大小不超过500kb </div>
          </el-upload>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'setting',
    data () {
      return {
        infoForm: {
          loading: false,
          chineseName: '郑彬彬',
          email: 'dhuzbb@gmail.com',
          blogUrl: 'http://geekbing.com/',
          intro: 'I make website and apps. I love it!'
        },
        infoFormRules: {
          chineseName: [
            {min: 1, max: 10, message: '不超过 10 个字符', trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur,change'}
          ],
          blogUrl: [
            {min: 1, max: 100, message: '最大 100 个字符', trigger: 'blur'}
          ],
          intro: [
            {min: 1, max: 100, message: '最大 100 个字符', trigger: 'blur'}
          ]
        },
        emailForm: {
          loading: false,
          oldEmail: 'dhuzbb@gmail.com',
          verificationCode: '',
          newEmail: ''
        },
        emailFormRules: {
          oldEmail: [
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur,change'}
          ],
          newEmail: [
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur,change'}
          ]
        },
        imageUrl: ''
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
            this.infoForm.loading = true
            // TODO 更新个人信息
            setTimeout(() => {
              this.infoForm.loading = false
              this.$message.success('更新个人信息成功')
            }, 1000)
          } else {
            this.$message.error('请根据提示修改正确后再提交')
            return false
          }
        })
      },
      updateEmail (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.emailForm.loading = true
            // TODO 更新邮箱
            setTimeout(() => {
              this.emailForm.loading = false
              this.$message.success('更新邮箱成功')
            }, 1000)
          } else {
            this.$message.error('请根据提示修改正确后再提交')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .setting-container {
    margin: 30px;
    text-align: center;
  }

  .box-card {
    box-shadow: none;
  }

  .box-card:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .infoForm {
    margin-top: 10px;
  }

  .emailForm {
    margin-top: 30px;
  }

  .avatar-uploader {
    margin-top: 10px;
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

  .info-update-btn, .email-update-btn {
    width: 100%;
  }

  .email-update-btn {
    margin-top: 20px;
  }

  .el-card.box-card {
    padding: 0;
    height: 310px;
  }

  .box-card-info {
    width: 100%;
    text-align: center;
    padding: 20px 20px 0 0;
  }

  .box-card-email {
    width: 100%;
    text-align: center;
    padding: 20px 20px 0 0;
  }

  .box-card-avatar {
    width: 100%;
  }

  .el-upload_tip_first {
    padding-top: 15px;
  }

  .el-upload__tip {
    text-align: left;
    margin: 10px auto auto 10px;
  }
</style>
