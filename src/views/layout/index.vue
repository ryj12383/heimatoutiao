<template>
  <el-container>
    <!-- 左边 -->
    <el-aside class="aside" style='width:220px'>
      <div class="menu-title">
        <img src="../../assets/img/logo_admin.png" alt="" style="background-color:#353b4e;">
      </div>
      <el-menu
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      router
      style="width:221px">
        <el-menu-item index="/"><i class="el-icon-milk-tea"></i>首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-lollipop"></i>内容管理</template>
          <el-menu-item index="/publish"><i class="el-icon-ship"></i> 发布文章</el-menu-item>
          <el-menu-item index="/article"><i class="el-icon-dish-1"></i>内容列表</el-menu-item>
          <el-menu-item index="/comment"><i class="el-icon-dish"></i>评论列表</el-menu-item>
          <el-menu-item index="/imgManagement"><i class="el-icon-chicken"></i>素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-cold-drink"></i>粉丝管理</template>
          <el-menu-item index=""><i class="el-icon-sugar"></i>图文数据</el-menu-item>
          <el-menu-item index=""><i class="el-icon-cherry"></i>粉丝概况</el-menu-item>
          <el-menu-item index=""><i class="el-icon-goblet"></i>粉丝画像</el-menu-item>
          <el-menu-item index=""><i class="el-icon-grape"></i>粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="/user"><i class="el-icon-milk-tea"></i>用户管理</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右边 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 引入头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 主页 -->
      <el-main>
        <!-- 二级容器 -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from '../../components/layout-header.vue'

export default {
  name: 'layout',
  components: {
    'layout-header': layoutHeader // 也可以这样写layoutHeader
  }

}
</script>
<style lang="less" scoped>
  .aside {
    height: 100vh;
    background-color: #353b4e;
    overflow: hidden;
    .menu-title {
      text-align: center;
      padding: 15px 0;
      img {
        height: 30px;
      }
    }
  }
</style>
