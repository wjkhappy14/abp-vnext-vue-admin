import Layout from '@/layout'

export const identityRoutes = {
  path: '/identity',
  component: Layout,
  redirect: '/identity/index',
  alwaysShow: true,
  name: 'identity',
  meta: {
    title: '组织权限',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'contact',
      component: () => import('@/views/identity/contact'),
      name: 'contact',
      meta: {
        title: '联系人'
      }
    },
    {
      path: 'user',
      component: () => import('@/views/identity/user'),
      name: 'user',
      meta: {
        title: '用户'
      }
    },
    {
      path: 'role',
      component: () => import('@/views/identity/role'),
      name: 'role',
      meta: {
        title: '角色',
      }
    },
    {
      path: 'region',
      component: () => import('@/views/identity/region'),
      name: 'region',
      meta: {
        title: '区域',
      }
    },
    {
      path: 'address',
      component: () => import('@/views/identity/address'),
      name: 'address',
      meta: {
        title: '地址',
      }
    }
  ]
}

export default identityRoutes
