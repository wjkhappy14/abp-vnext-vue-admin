import Layout from '@/layout'

const warehouseRouter = {
  path: '/IdentityServer',
  component: Layout,
  redirect: 'noRedirect',
  name: 'IdentityServer',
  meta: {
    title: 'Identity Server',
    icon: 'chart'
  },
  children: [
    {
      path: 'client',
      component: () => import('@/views/IdentityServer/client'),
      name: 'client',
      meta: { title: 'Client', noCache: true }
    },
    {
      path: 'apiResource',
      component: () => import('@/views/IdentityServer/apiResource'),
      name: 'apiResource',
      meta: { title: 'ApiResource', noCache: true }
    },
    {
      path: 'identityResource',
      component: () => import('@/views/IdentityServer/identityResource'),
      name: 'identityResource',
      meta: { title: 'IdentityResource', noCache: true }
    }
  ]
}

export default warehouseRouter
