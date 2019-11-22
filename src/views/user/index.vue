<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-form>
          <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input type="textarea" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input disabled v-model="user.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
        </el-form>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :http-request="onUpload">
          <img v-if="user.photo" :src="user.photo" width="100" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '@/until/event-bus'
export default {
  name: 'UserIndex',
  data () {
    return {
      user: {
        email: '', // 邮箱
        intro: '', // 简介
        mobile: '', // 手机号
        name: '', // 昵称
        photo: '' // 头像
      }
    }
  },
  created () {
    this.loadUserMessage()
  },
  methods: {
    // 加载用户信息
    loadUserMessage () {
      this.$axios({
        method: 'GET',
        url: 'user/profile'
      }).then(res => {
        this.user = res.data.data
        // console.log(res)
      }).catch(res => {
        console.log(res)
      })
    },
    // 提交修改用户基本信息
    onSubmit () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name: this.user.name,
          email: this.user.email,
          intro: this.user.intro
        }
      }).then(res => {
        eventBus.$emit('updata-user', this.user)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(res => {
        this.$message.error('修改失败')
      })
    }, // 上传头像
    onUpload (config) {
      // console.log(config)
      const fd = new FormData()
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      }).then(res => {
        this.user.photo = res.data.data.photo
        eventBus.$emit('updata-user', this.user)
      }).catch(res => {
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
  border: 2px dashed #eee;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: green;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
