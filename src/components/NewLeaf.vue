<template>
  <div class="newLeaf-container" v-loading.body="loading" element-loading-text="保存中...">
    <el-form class="new-form" ref="form" :model="form" label-width="80px">
      <el-form-item label="描 述">
        <el-input v-model="form.desc" placeholder="描 述"></el-input>
      </el-form-item>
      <el-form-item label="标 签">
        <el-tag class="mini-tag" :key="tag" v-for="tag in form.tags" :closable="true" :close-transition="false"
                @close="handleClose(tag)">{{tag}}
        </el-tag>
        <el-input v-if="form.inputVisible" class="input-new-tag" v-model="form.inputTag" ref="saveTagInput"
                  size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
        <el-button v-else class="tag-btn" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="内 容">
        <markdown-editor :configs="configs" v-model="form.content" ref="markdownEditor"></markdown-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">新 增</el-button>
        <el-button @click="handleCancle">取 消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="上传图片" :visible.sync="dialogTableVisible">
      <div class="upload-container">
        <el-upload class="upload-demo" drag multiple action="https://jsonplaceholder.typicode.com/posts/"
                   :on-success="uploadSuccess" :on-error="uploadError">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { markdownEditor } from 'vue-simplemde'

  export default {
    name: 'newLeaf',
    components: {
      markdownEditor
    },
    computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    mounted () {
      let _this = this
      this.simplemde.codemirror.on('drop', function (editor, e) {
        let fileList = e.dataTransfer.files
        if (fileList.length > 1) {
          _this.$message.error('一次只能上传一张图片')
          return false
        }
        if (fileList[0].type.indexOf('image') === -1) {
          _this.$message.error('只能上传图片！')
          return false
        }

        // placeholder
        let placeholder = '![Uploading ' + fileList[0]['name'] + '...]()'
        editor.replaceRange(placeholder, {
          line: editor.getCursor().line,
          ch: editor.getCursor().ch
        })

        let img = new FormData()
        img.append('img', fileList[0])

        editor.setValue(editor.getValue().replace(placeholder, '![](qqq)'))
//        axios.post('/images/upload', img).then((res) => {
//          if (res.data['status'] == 'success') {
//            editor.setValue(editor.getValue().replace(tips, '![](' + res.data['uri'] + ')'))
//          } else {
//            _this.$message.error(res.data['message'])
//          }
//        })
      })
    },
    data () {
      return {
        form: {
          desc: '',
          tags: ['Vue', 'Element', 'Spring Boot', 'Spring Cloud'],
          inputVisible: false,
          inputTag: '',
          content: ''
        },
        loading: false,
        dialogTableVisible: false,
        configs: {
          tabSize: 4,
          status: false,                        // 禁用底部状态栏
          initialValue: '// 开始愉快的Coding',    // 设置初始值
          toolbar: ['bold', 'italic', 'heading', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', {
            name: 'custom',
            action: this.customFunction,
            className: 'fa fa-image',
            title: '自定义按钮'
          }, 'table', '|', 'preview', 'side-by-side', 'fullscreen', '|', 'code', 'guide'],
          renderingConfig: {
            codeSyntaxHighlighting: true,       // 开启代码高亮
            highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
          }
        }
      }
    },
    methods: {
      customFunction (editor) {
//        this.dialogTableVisible = true
        // placeholder
      },
      handleSave () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$router.push('leaf')
        }, 1500)
      },
      showInput () {
        this.form.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleClose (tag) {
        this.form.tags.splice(this.form.tags.indexOf(tag), 1)
      },
      handleInputConfirm () {
        let inputValue = this.form.inputTag
        if (inputValue) {
          this.form.tags.push(inputValue)
        }
        this.form.inputVisible = false
        this.form.inputTag = ''
      },
      handleCancle () {
        this.$router.push('leaf')
      },
      uploadSuccess (err, file, fileList) {
        console.log(err)
      },
      uploadError (event, file, fileList) {
        this.dialogTableVisible = false

        let editor = this.simplemde
        let placeholder = '![Uploading...]()'
        editor.replaceRange(placeholder, {
          line: editor.getCursor().line,
          ch: editor.getCursor().ch
        })
//        this.dialogTableVisible = false
//        console.log('上传错误')
//        console.log(this.$refs.markdownEditor)
//        console.log(this.$refs.markdownEditor.simplemde)
//        console.log(this.simplemde)
//        console.log(this.simplemde.codemirror)
//        this.simplemde.value('error')
      }
    }
  }
</script>

<style scoped>
  .newLeaf-container {
    width: 100%;
    height: 100%;
  }

  .new-form {
    padding: 20px;
  }

  .mini-tag {
    margin-left: 10px;
  }

  .tag-btn {
    margin-left: 10px;
    height: 24px;
    line-height: 22px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    margin-left: 10px;
    width: 78px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .upload-container {
    width: 400px;
    margin: auto;
    text-align: center;
  }

  .upload-demo {
    margin: auto;
  }
</style>
