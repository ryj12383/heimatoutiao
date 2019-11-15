import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/' // 左侧导航栏布局
import Login from '@/views/login/' // 登录页面
import Home from '@/views/home' // 首页
import Article from '@/views/article' // 文章列表
import Publish from '@/views/publish' // 发布文章
import Nprogress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   component: Login
  // },
  {
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish
      }
    ]

  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
// woken验证以及进度条设置

router.beforeEach((to, from, next) => {
  Nprogress.start()
  if (to.path === '/login') {
    next()
    return
  }
  Nprogress.done()
  const token = window.localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
router.afterEach((to, next) => {
  Nprogress.done()
})
export default router
