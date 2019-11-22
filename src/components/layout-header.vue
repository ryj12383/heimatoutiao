<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle" style="background-color:#eee">
      <el-col :span="6" class="left">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="3" class="right" v-model="user">
        <img :src="user.photo" width="50px" height="50px" />
        <el-dropdown trigger="click">
          <span> {{ user.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账户信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item @click.native='onloginOut'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '@/until/event-bus'
export default {
  name: 'userheader',
  data () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  created () {
    this.loadUser()
    eventBus.$on('updata-user', user => {
      this.user.photo = user.photo
      this.user.name = user.name
    })
  },
  methods: {
    // 显示用户基本信息
    loadUser () {
      this.$axios({
        method: 'GET',
        url: 'user/profile'
      }).then(res => {
        this.user = res.data.data
      }).catch(res => {
        // console.log(res)
      })
    },
    // 退出程序
    onloginOut () {
      this.$confirm('此操作将退出程序, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 4px;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
