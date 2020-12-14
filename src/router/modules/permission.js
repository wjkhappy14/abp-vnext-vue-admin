import Layout from '@/layout'

const permissionRouter = {
  path: '/permission',
  component: Layout,
  name: 'permission',
  redirect: '/permission/index',
  meta: {
    title: 'Permission',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/Permission/index'),
      name: 'index',
      meta: { title: 'Permission', icon: 'guide', noCache: true }
    }
  ]
}
export default permissionRouter
