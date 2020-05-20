import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import identityRoutes from './identity'
export const constantRoutes = [
  {
    path: '/',
    name: 'defalult',
    redirect: '/home'

  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
    hidden: true,
    children: [
      {
        path: '/news',
        component: () => import('@/views/home/news/index'),
        name: 'news',
        meta: { title: '新闻动态', icon: 'theme' }
      },
      {
        path: '/about',
        component: () => import('@/views/home/about/index'),
        name: 'about',
        meta: { title: '关于我们', icon: 'theme' }
      }
    ]
  },
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/index',
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      title: '主题管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/blogging/blog/list'),
        name: 'list',
        meta: { title: '主题动态', icon: 'guide', noCache: true }
      },
      {
        path: 'item ',
        hidden: true,
        component: () => import('@/views/blogging/blog/item'),
        name: 'detail',
        meta: { title: '详细信息', icon: 'pdf', affix: false }
      },
      {
        path: 'create ',
        component: () => import('@/views/blogging/blog/create'),
        name: 'create',
        meta: { title: '发布主题', icon: 'pdf', affix: false }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '我的', icon: 'user', noCache: true }
      }
    ]
  },
  identityRoutes
]


export const asyncRoutes = [
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/workflow/index'),
        name: 'Icons',
        meta: { title: '工作流', icon: 'icon', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => (
    { y: 0 }
  ),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
