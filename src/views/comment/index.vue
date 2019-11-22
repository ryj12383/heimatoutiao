<template>
  <div class="comment">
    <el-card>
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <!-- 列表 -->
      <el-table :data="articles" style="width: 100%" >
        <el-table-column prop="title" label="标题" width="180"></el-table-column>

        <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>

        <el-table-column prop="fans_comment_count" label="粉丝评论数据"></el-table-column>

        <el-table-column label="评论状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              @change="onChangeStatus(scope.row)"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click='$router.push(`/comment/${scope.row.id}`)'>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination class="page"
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="onChangePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'commentIndex',
  data () {
    return {
      articles: [],
      count: 0,
      page: 1
    }
  },
  created () {
    this.loadcomment()
  },
  methods: {
    // 获得加载列表
    loadcomment (page = 1) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page: page,
          per_page: 10
        }
      })
        .then(res => {
          // // console.log(res, 1)
          this.articles = res.data.data.results
          this.count = res.data.data.total_count
        })
        .catch(res => {
          // // console.log(res, 2)
        })
    },
    onChangeStatus (newArticle) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: newArticle.id.toString()
        },
        data: {
          allow_comment: newArticle.comment_status
        }
      })
        .then(res => {
          // // console.log(res, 1)
          this.$message({
            type: 'success',
            message: `${
              newArticle.comment_status ? '开启评论' : '关闭评论'
            }成功`
          })
        })
        .catch(res => {
          // // // console.log(res, 2)
          this.$message.error('操作失败')
        })
    },
    onChangePage (page) {
      // // console.log(page)
      this.loadcomment(page)
      this.page = page
    }
  }
}
</script>

<style>
    .page {
        display: flex;
        justify-content: center;
        margin-top: 20px;

    }
</style>
