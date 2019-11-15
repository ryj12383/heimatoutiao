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
            <el-radio label="全部">全部</el-radio>
            <el-radio label="草稿">草稿</el-radio>
            <el-radio label="待审核">待审核</el-radio>
            <el-radio label="审核成功">审核成功</el-radio>
            <el-radio label="审核失败">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="filterForm.channel_id" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据展示部分 -->
    <el-card style="margin-top:10px;background-color:#eee">
      <div slot="header" class="clearfix">
        <span>共找到59806条符合条件的内容</span>
      </div>
      <el-table :data="articles" stripe style="width: 100%">
        <el-table-column prop="data" label="封面" width="100" >
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
            <template>
              <el-button type="danger" size="mini">删除</el-button>
              <el-button type="primary" size="mini">编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>

export default {
  name: 'articles',
  data () {
    return {
      // 数据过滤的表单
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      daterange: '',
      articles: [],
      articleStatus: [
        { type: '', label: '全部' },
        { type: 'info', label: '待审核' },
        { type: 'success', label: '审核成功' },
        { type: 'danger', label: '审核失败' },
        { type: 'info', label: '草稿' }
      ]
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle () {
      const token = window.localStorage.getItem('token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.articles = res.data.data.results
        console.log(this.articles)
      }).catch(res => {
        console.log(res, 2)
      })
    }
  }
}
</script>

<style>
</style>
