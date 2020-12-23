import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import identityRoutes from './modules/identity'
import workflowRouter from './modules/workflow'
import diagnosticRouter from './modules/diagnostic'
import productionRouter from './modules/production'
import bloggingRouter from './modules/blogging'
import permissionRouter from './modules/permission'
import backgroundJobRouter from './modules/backgroundJob'
import auditLoggingRouter from './modules/auditLogging'
import identityServerRouter from './modules/identityServer'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Overviews', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
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
        name: 'profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

export const asyncRoutes = [
  workflowRouter,
  diagnosticRouter,
  identityRoutes,
  backgroundJobRouter,
  auditLoggingRouter,
  identityServerRouter,
  productionRouter,
  bloggingRouter,
  permissionRouter,
  {
    path: '/im',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/im/index'),
        name: 'im',
        meta: { title: 'SignalR', icon: 'theme' }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Settings/index'),
        name: 'settings',
        meta: { title: 'Settings', icon: 'setting' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
