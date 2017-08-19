<template>
  <div class="leafDetail-container" v-cloak v-loading.body="pageLoading" element-loading-text="加载中...">
    <el-row>
      <el-col>
        <p class="article-title">{{article.title}}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <p class="article-second-title"><span>{{article.username}}</span><span
          class="blank"></span><span>{{article.createTime | dateFormatter}}</span></p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <p class="leaf-tags">
          <color-tag v-for="(tag, index) in tags" :key="index">{{tag}}</color-tag>
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="article-body">{{article.body}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import fetch from '../utils/fetch'
  import { dateFormatter } from '../utils/util'

  export default {
    name: 'leafDetail',
    data: function () {
      return {
        pageLoading: false,
        article: {
          title: '',
          username: '',
          createTime: '',
          body: ''
        },
        tags: []
      }
    },
    created: function () {
      this.fetchData()
    },
    filters: {
      dateFormatter (time) {
        return dateFormatter(time)
      }
    },
    methods: {
      fetchData () {
        let vm = this
        vm.pageLoading = true
        fetch({
          method: 'get',
          url: '/leafapi/article/' + vm.$route.params.id
        }).then(function (response) {
          if (response.status === 200) {
            vm.article = response.data.data.article
            vm.tags = response.data.data.tags
            vm.pageLoading = false
          }
        })
      },
      handleRegister () {

      }
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none !important;
  }

  .leafDetail-container {
    width: 100%;
    height: 100%;
  }

  .article-title {
    font-size: 20px;
    color: #666;
    font-weight: bold;
    text-align: center;
  }

  .article-second-title {
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .blank {
    margin: 6px;
  }

  .leaf-tags {
    text-align: center;
  }

  .article-body {
    margin: auto 50px;
  }
</style>
