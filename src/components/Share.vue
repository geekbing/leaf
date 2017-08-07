<template>
  <div class="share-container">
    <div class="form-container">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="标 题">
          <el-input v-model="formData.user" placeholder="标 题"></el-input>
        </el-form-item>
        <el-form-item label="标 签">
          <el-select v-model="formData.region" placeholder="标 签">
            <el-option label="Vue" value="vue"></el-option>
            <el-option label="Vue-router" value="vue-router"></el-option>
            <el-option label="Element" value="element"></el-option>
            <el-option label="Bootstrap" value="bootstrap"></el-option>
            <el-option label="Spring Boot" value="spring-boot"></el-option>
            <el-option label="Spring Cloud" value="spring-cloud"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日 期">
          <el-date-picker v-model="formData.date" type="daterange" align="right"
                          placeholder="选择日期范围" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table v-loading.body="loading" :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="标题" width="200"></el-table-column>
        <el-table-column prop="address" label="标签"></el-table-column>
        <el-table-column prop="date" label="日期" align="center" width="150"></el-table-column>
        <el-table-column label="操作" align="center" width="210">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
            <el-button size="small" @click="handleShare(scope.$index, scope.row)">分 享</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page="pagination.currentPage" :page-size="pagination.pageSize" :total="pagination.total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share',
    created: function () {
      this.fetchData()
    },
    data () {
      return {
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
        },
        formData: {
          user: '',
          region: '',
          date: ''
        },
        loading: false,
        tableData: [],
        pagination: {
          currentPage: 4,
          pageSize: 20,
          total: 100
        }
      }
    },
    methods: {
      fetchData () {
        this.loading = true
        setTimeout(() => {
          this.tableData = [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
          this.loading = false
        }, 1500)
      },
      handleSizeChange () {
      },
      handleCurrentChange () {
      },
      handleEdit () {
      },
      handleShare () {
      },
      handleDelete () {
      },
      handleSearch () {
      }
    }
  }
</script>

<style scoped>
  .share-container {
    width: 100%;
    height: 100%;
  }

  .form-container {
    padding: 20px;
    text-align: center;
  }

  .table-container {
    margin: auto 20px;
  }

  .pagination-container {
    margin-top: 10px;
    text-align: center;
  }
</style>
