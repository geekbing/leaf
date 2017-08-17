<template>
  <div class="leaf-container" v-loading.body="pageLoading" element-loading-text="加载中...">
    <div class="form-container">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item class="form-item" label="标 题">
          <el-input v-model="formData.title" placeholder="标 题"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="标 签">
          <el-select v-model="formData.tags" multiple filterable remote placeholder="标 签"
                     :remote-method="queryTags" :loading="tagLoading">
            <el-option v-for="item in formData.options" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="日 期">
          <el-date-picker v-model="formData.date" type="daterange" align="right"
                          placeholder="选择日期范围" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container">
      <el-row :gutter="40">
        <el-col :span="12" v-for="(leaf, index) in leafs" :key="index">
          <div class="one-leaf">
            <el-row>
              <el-col :span="12"><p class="leaf-title">{{leaf.article.title}}</p></el-col>
              <el-col :span="12"><p class="leaf-time">{{leaf.article.createTime | timeFormatter}}</p></el-col>
            </el-row>
            <el-row>
              <el-col>
                <p class="leaf-intro">{{leaf.article.body}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <p class="leaf-tags">
                  <el-tag :type="tagType" class="el-tag-random" v-for="(tag, index) in leaf.tags" :key="index">{{tag}}
                  </el-tag>
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!--<el-col :span="12">-->
        <!--<div class="one-leaf">-->
        <!--<el-row>-->
        <!--<el-col :span="12"><p class="leaf-title">Java 红黑树解析</p></el-col>-->
        <!--<el-col :span="12"><p class="leaf-time">2017-06-07</p></el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
        <!--<el-col><p class="leaf-intro">-->
        <!--Leafer是基于Java实现的一个私人笔记管理项目，现在还是处于beta版本，如果有任何的bug或者功能改进方面上的建议，欢迎大家提issues帮我改进。</p></el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
        <!--<el-col>-->
        <!--<p class="leaf-tags">-->
        <!--<el-tag type="gray">标签二</el-tag>-->
        <!--<el-tag type="primary">标签三</el-tag>-->
        <!--<el-tag type="success">标签四</el-tag>-->
        <!--<el-tag type="warning">标签五</el-tag>-->
        <!--<el-tag type="danger">标签六</el-tag>-->
        <!--</p>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--</div>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <div class="page-container">
      <el-pagination small layout="prev, pager, next" :total="100" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
  import fetch from '../utils/fetch'

  export default {
    name: 'leaf',
    created: function () {
      this.fetchData()
    },
    data () {
      return {
        pageLoading: false,
        tagLoading: false,
        leafs: [],
        pagination: {
          page: 1,
          size: 4
        },
        formData: {
          title: '',
          tags: [],
          date: '',
          options: []
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    filters: {
      timeFormatter (time) {
        let _date = new Date(time)
        let year = _date.getFullYear()
        let month = _date.getMonth() + 1 < 10 ? '0' + (_date.getMonth() + 1) : (_date.getMonth() + 1)
        let date = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()
        return year + '-' + month + '-' + date
      }
    },
    computed: {
      tagType: function () {
        var types = ['', 'gray', 'primary', 'success', 'warning', 'danger']
        var index = Math.floor(Math.random() * 5)
        console.log('index: ' + index)
        let type = types[index]
        console.log('type: ' + type)
        return type
      }
    },
    methods: {
      fetchData: function () {
        let vm = this
        vm.pageLoading = true
        fetch({
          url: '/leafapi/article',
          method: 'get',
          params: {
            'page': vm.pagination.page,
            'size': vm.pagination.size
          }
        }).then(function (response) {
          if (response.status === 200) {
            vm.leafs = response.data.data
          }
        })
        setTimeout(() => {
          this.pageLoading = false
        }, 1000)
      },
      queryTags (query) {
      },
      handleSearch () {
        this.fetchData()
      },
      currentChange () {
        this.fetchData()
      }
    }
  }
</script>

<style scoped>
  .leaf-container {
    width: 100%;
    height: 100%;
  }

  .form-container {
    padding-top: 40px;
    text-align: center;
  }

  .form-container .form-item {
    margin-bottom: 0;
  }

  .content-container {
    margin: 0 40px 40px 40px;
  }

  .page-container {
    text-align: center;
  }

  .one-leaf {
    margin-top: 40px;
    padding: 0 20px;
    border: 1px solid #dedede;
    border-radius: 6px;
    box-shadow: 0 0 5px #efefef;
  }

  .one-leaf:hover {
    cursor: pointer;
    box-shadow: 0 0 20px #dedede;
  }

  .leaf-title {
    font-size: 20px;
    color: #999;
    font-weight: bold;
  }

  .leaf-time {
    color: #999;
    font-size: 14px;
    font-weight: normal;
    text-align: right;
    line-height: 40px;
  }

  .leaf-intro {
    font-size: 16px;
    color: #666;
    line-height: 30px;
    margin: 0;
  }

  .el-tag-random {
    margin-right: 8px;
  }
</style>
