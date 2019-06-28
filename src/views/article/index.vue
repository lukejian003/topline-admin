<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form :model="filterParams" label-width="100px">
        <el-form-item label="状态" prop="resource">
          <el-radio-group v-model="filterParams.status">
            <el-radio label>全部</el-radio>
            <el-radio
              v-for="(item,index) in statTypes"
              :key="item.label"
              :label="index + ''"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" prop="region">
          <el-select v-model="filterParams.channel_id" placeholder="请选择频道">
            <el-option label="全部" value=" "></el-option>
            <el-option v-for="item in channels " :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="handleDateChenge"
              v-model="filterParams.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="articleLoading">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          共查到
          <strong>{{totalCount}}</strong> 条符合条件的数据
        </span>
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
            <el-tag
              :type="statTypes[scope.row.status].type"
              effect="plain"
            >{{statTypes[scope.row.status].label}}</el-tag>
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
            :current-page="page"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      articles: [],
      totalCount: 0,
      articleLoading: false,
      page: 1,
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
      ],
      channels: [],
      filterParams: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        date: ''
      }
    }
  },
  created () {
    this.loadArticle()
    this.loadChennele()
  },
  methods: {
    loadArticle (page = 1) {
      this.articleLoading = true
      const filterDate = {}
      for (let key in this.filterParams) {
        if (this.filterParams[key]) {
          filterDate[key] = this.filterParams[key]
        }
      }
      // console.log(filterDate)
      this.$http({
        methods: 'GET',
        url: '/articles',
        params: {
          page,
          per_page: 10,
          ...filterDate
        }
      }).then(data => {
        // console.log(data)
        this.articles = data.results
        this.totalCount = data.total_count
        this.articleLoading = false
      })
    },
    loadChennele () {
      this.$http({
        methods: 'GET',
        url: '/channels'
      }).then(data => {
        this.channels = data.channels
      })
    },
    handleCurrentChange (page) {
      this.page = page
      this.loadArticle(page)
    },
    handleDateChenge (value) {
      // console.log(value)
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    },
    submitForm () {
      this.page = 1
      this.loadArticle()
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
