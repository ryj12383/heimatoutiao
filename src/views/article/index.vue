<template>
  <div class="article" style="margin-left:-10px;margin-top:-15px;margin-right:-10px">
    <!-- 查询部分 -->

    <el-card >
      <div slot="header">
        <span>全部图文</span>
      </div>
      <!-- 搜索文章表单 -->
      <el-form  label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="filterForm.channel_id" placeholder="请选择频道">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onquery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据展示部分 -->
    <el-card style="margin-top:10px;background-color:#eee">
      <div slot="header" class="clearfix">
        <span>共找到{{ totalCount}}条符合条件的内容</span>
      </div>
      <el-table
      :data="articles" stripe style="width: 100%"

      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      >
        <el-table-column  label="封面" width="100" >
            <template slot-scope="scope">
              <img style="width:55px" :src="scope.row.cover.images[0]" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column label="状态" width="150">
            <template slot-scope="scope">
                <el-tag :type="articleStatus[scope.row.status].type">
                  {{ articleStatus[scope.row.status].label }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期" ></el-table-column>
        <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="onDelet(scope.row.id)">删除</el-button>
              <el-button type="primary" size="mini" @click="$router.push('/publish/'+scope.row.id)">编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
       @current-change="onchangePage"
       :current-page="page"
       :disabled="loading">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'articles-list',
  data () {
    return {
      // 数据过滤的表单（文章类型筛选）
      filterForm: {
        status: null,
        channel_id: null
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      daterange: '', // 时间区域
      articles: [], // 文章列表
      articleStatus: [ // 文章状态
        { type: '', label: '草稿' },
        { type: 'info', label: '待审核' },
        { type: 'success', label: '审核成功' },
        { type: 'danger', label: '审核失败' },
        { type: 'info', label: '已删除' }
      ],
      totalCount: 0, // 文章总数
      loading: true, // loading加载动画
      channels: [],
      page: 1 // 当前页码
    }
  },
  created () {
    this.loadArticle() // 加载文章
    this.loadchannels() // 加载频道
  },
  methods: {
    // 加载文章列表
    loadArticle (page = 1) {
      this.loading = true

      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('token')}`
        // },
        params: {
          page: page,
          per_page: 10,
          status: this.filterForm.status,
          channel_id: this.filterForm.channel_id,
          begin_pubdate: this.daterange ? this.daterange[0] : null,
          end_pubdate: this.daterange ? this.daterange[1] : null
        }
      }).then(res => {
        // // console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
        // // console.log(this.articles)
      }).catch(res => {
        // console.log(res, 2)
      }).finally(() => {
        this.loading = false
      })
    },
    // 分页器事件
    onchangePage (page) {
      // // console.log(page)
      this.page = page
      this.loadArticle(page)
    },
    // 获取频道
    loadchannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // // console.log(res)
        this.channels = res.data.data.channels
      }).catch(res => {
        // console.log(err)
      })
    },
    // 删除文章
    onDelet (articleId) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}`
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('token')}`
        // }
      }).then(res => {
        this.loadArticle(this.page) // 这里的page传的是当前页的page
      }).catch(res => {
        // console.log(err, '删除失败')
      })
    },
    // 点击查询
    onquery () {
      this.loadArticle(1)
      // 让页码显示在第一页，保持在高亮状态
      this.page = 1
    }
  }
}
</script>

<style>
</style>
