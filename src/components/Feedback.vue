<template>
  <div class="feedback-container" v-loading.body="form.loading" element-loading-text="提交中...">
    <el-card class="box-card">
      <el-form class="feedback-form" ref="form" :model="form" label-width="80px">
        <el-form-item label="问题类型">
          <el-select class="type-select" v-model="form.type" placeholder="请选择分类">
            <el-option label="功能Bug" value="1"></el-option>
            <el-option label="功能优化" value="2"></el-option>
            <el-option label="界面美化" value="3"></el-option>
            <el-option label="建议新功能" value="4"></el-option>
            <el-option label="使用帮助" value="5"></el-option>
            <el-option label="其它问题" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情描述">
          <el-input type="textarea" v-model="form.desc" :rows="3" placeholder="请输入遇到的问题或建议" resize="none"></el-input>
        </el-form-item>
        <el-form-item label="图片说明">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                     :on-preview="handlePictureCardPreview" :on-remove="handleRemove"><i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="form.dialogVisible" size="tiny">
            <img width="100%" :src="form.dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.name" placeholder="电话或邮箱（选填，便于我们联系你）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="onSubmit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'feedback',
    data () {
      return {
        form: {
          loading: false,
          dialogImageUrl: '',
          dialogVisible: false,
          name: '',
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        this.form.loading = true
        // TODO 提交反馈信息
        setTimeout(() => {
          this.form.loading = false
          this.$message.success('提交成功，感谢您的宝贵意见。')
        }, 1000)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
  .feedback-container {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .box-card {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: none;
    margin-top: 50px;
  }

  .box-card:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .feedback-form {
    width: 400px;
    margin: auto;
  }

  .type-select {
    width: 100%;
  }

  .submit-btn {
    width: 100%;
  }
</style>
