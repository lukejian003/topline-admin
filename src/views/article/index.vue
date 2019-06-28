<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="状态" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择频道">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="开发者咨询" value="开发者咨询"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              v-model="ruleForm.date"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>内容列表</span>
      </div>

      <el-table
        :data="articles"
        style="width: 100%"
        v-loading="articleLoading"
        element-loading-text="玩命加载中..."
      >
        <el-table-column prop="cover.images[0]" label="封面" width="150">
          <template slot-scope="scope">
            <img width="100" :src="scope.row.cover.images[0]" alt>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
          <el-tag :type="statTypes[scope.row.status].type" effect="plain">{{statTypes[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" plain icon="el-icon-edit">修改</el-button>
          <el-button type="danger" plain icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>

      <el-row :gutter="20">
        <el-col :span="6" :offset="6">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalCount"
            :disabled="articleLoading"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      ruleForm: {
        region: '',
        date: '',
        resource: ''
      },
      totalCount: 0,
      articleLoading: false,
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ]
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle (page = 1) {
      this.articleLoading = true
      this.$http({
        methods: 'GET',
        url: '/articles',
        params: {
          page,
          per_page: 10
        }
      }).then(data => {
        console.log(data)
        this.articles = data.results
        this.totalCount = data.total_count
        this.articleLoading = false
      })
    },
    handleCurrentChange (page) {
      this.loadArticle(page)
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 18px;
}
.el-pagination {
  margin-top: 18px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
