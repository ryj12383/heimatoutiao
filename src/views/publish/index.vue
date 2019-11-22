<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <span>卡片名称</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题" placeholder="文章名称">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" style="height:300px">
          <!-- <el-input v-model="article.content" ></el-input> -->
          <!-- 富文本框 -->
          <quill-editor v-model="article.content"
                ref="myQuillEditor"
                :options="editorOption"
                style="height:200px"
               >
          </quill-editor>

        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onSubmit(false)">发布</el-button>
        <el-button @click="onSubmit(true)">存为草稿</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  name: 'publish-article',
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: [] },
        channel_id: ''
      },
      channels: [],
      editorOption: {
        // some quill options

      }
    }
  },
  created () {
    this.loadChannels() // 加载频道
    // 加载特定的文章数据
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // // console.log(res)
        this.channels = res.data.data.channels
      }).catch(res => {
        // console.log(res, '请求失败')
      })
    },
    onSubmit (Draft) {
      if (this.$route.params.articleId) {
        this.editArticle(Draft)
      } else {
        this.addArticle(Draft)
      }
    },
    // 加载特定的文章数据
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      }).catch(res => {
        // console.log(res, 2)
      })
    },
    // 发布文章的方法
    addArticle (Draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft: Draft
        },
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('token')}`
        // },
        data: this.article
      }).then(res => {
        // console.log(res)
        this.$message({
          message: '恭喜你，发布成功',
          type: 'success'
        })
        this.$router.push('/article')
      }).catch(res => {
        this.$message.error('错了哦，发布失败')
      })
    },
    // 编辑文章的方法
    editArticle (Draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft: Draft
        },
        data: this.article
      }).then(res => {
        // console.log(res, 1)
        this.$message({
          message: '恭喜你，发布成功',
          type: 'success'
        })
        this.$router.push('/article')
      }).catch(res => {
        // console.log(res, 2)
        this.$message.error('错了哦，发布失败')
      })
    }
  }
}
</script>

<style>
</style>
