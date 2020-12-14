import Layout from '@/layout'
export const identityRoutes = {
  path: '/identity',
  component: Layout,
  redirect: '/identity/index',
  alwaysShow: true,
  name: 'identity',
  meta: {
    title: 'Identity',
    icon: 'lock',
    roles: ['admin', 'editor']
  },
  children: [
    {
      path: 'contact',
      component: () => import('@/views/Identity/contact'),
      name: 'contact',
      meta: {
        title: 'Contact'
      }
    },
    {
      path: 'user',
      component: () => import('@/views/Identity/user'),
      name: 'user',
      meta: {
        title: 'User'
      }
    },
    {
      path: 'role',
      component: () => import('@/views/Identity/role'),
      name: 'role',
      meta: {
        title: 'Role',
      }
    },
    {
      path: 'region',
      component: () => import('@/views/Identity/region'),
      name: 'region',
      meta: {
        title: 'Country&Region',
      }
    },
    {
      path: 'stateProvince',
      component: () => import('@/views/Identity/stateProvince'),
      name: 'stateProvince',
      meta: {
        title: 'StateProvince',
      }
    },
    {
      path: 'city',
      component: () => import('@/views/Identity/city'),
      name: 'city',
      meta: {
        title: 'City',
      }
    },
    {
      path: 'serviceProvider',
      component: () => import('@/views/Identity/serviceProvider'),
      name: 'serviceProvider',
      meta: {
        title: 'ServiceProvider',
      }
    },
    {
      path: 'torrent',
      component: () => import('@/views/Identity/torrent'),
      name: 'torrent',
      meta: {
        title: 'Torrent',
      }
    }
  ]
}

export default identityRoutes
