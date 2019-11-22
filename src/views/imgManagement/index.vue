<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>

        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers="uploadHeaders"
          name="image"
          :on-success="onUploadSuccess"
          style="float:right"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
        <div>
        <el-radio-group v-model="type" @change="onFind">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <!-- <el-row :gutter="20"> -->
      <el-row :gutter="20">
        <el-col :span="4"  v-for="item in imgs" :key="item.id" class="col">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.url" height="200px" width="220px"/>
            <div style="padding: 14px; ">

              <i :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off': !item.is_collected
              }"
              @click="onstatus(item)"></i>

              <i class="el-icon-delete-solid" @click="onDel(item)" style="float:right"></i>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'imgsmanagement',
  data () {
    return {
      imgs: [],
      type: '全部',
      uploadHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  },
  created () {
    this.loadImgs()
  },
  methods: {
    loadImgs (is_collected = false) {
      this.$axios({
        method: 'GET',
        url: 'user/images',
        params: {
          collect: is_collected
        }
      })
        .then(res => {
          // // console.log(res)
          this.imgs = res.data.data.results
        })
        .catch(res => {
          // // console.log(res)
        })
    },
    onstatus (a) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${a.id}`,
        data: {
          collect: !a.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        a.is_collected = !a.is_collected
      }).catch(res => {
        // // console.log(err)
        this.$message.error('操作失败')
      })
    },
    onDel (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定执行
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })

          // 更新列表
          this.loadImgs(this.type !== '全部')
        }).catch(res => {
          // // console.log(err)
          this.$message.error('删除失败')
        })
      }).catch(() => {
        // 取消执行
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onUploadSuccess () {
      // 刷新图片列表
      this.loadImgs(this.type !== '全部')
    },
    onFind (value) {
      // // console.log(value, 2)
      this.loadImgs(value !== '全部')
    }

  }
}
</script>

<style scoped>
    .col {
        margin-bottom: 20px;
        font-size: 20px
    }
</style>
