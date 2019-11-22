<template>
  <div class="card">
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span>评论详情 1196354762019176448</span>
      </div>
       <el-table
        :data="comments"
        style="width: 100%">
        <el-table-column
          label="头像"
          width="180">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.aut_photo">
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="点赞"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.is_liking === 1 ? '已赞' : '没有赞' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="like_count"
          label="点赞数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="评论日期"
          width="180">
          <template slot-scope="scope">
            <!--
              不传参：{{ scope.row.pubdate | dateFormat }}
              传参：{{ scope.row.pubdate | dateFormat(参数) }}
             -->
            {{ scope.row.pubdate | dateFormat('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否推荐"
          width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_top"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onTop(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="reply_count"
          label="回复数量"
          width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'commentdetail',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.loadcomments()
  },
  methods: {
    loadcomments () {
      this.$axios({
        method: 'GET',
        url: 'comments',
        params: {
          type: 'a',
          //   source: this.$route.params.articleId
          source: this.articleId
        }
      }).then(res => {
        // console.log(res)
        this.comments = res.data.data.results
      }).catch(res => {
        // // console.log(res)
        this.$message.error('获取数据失败')
      })
    },
    onTop (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          // comment.is_top 双向绑定给了开关按钮
          // 所以获取 comment.is_top 就是在获取开关的状态
          sticky: comment.is_top
        }
      }).then(res => {
        this.$message('操作成功')
      }).catch(err => {
        this.$message.error('操作失败', err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .card {
    overflow: hidden;
  }
</style>
