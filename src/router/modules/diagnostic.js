import Layout from '@/layout'

const diagnosticRouter = {
  path: '/diagnostic',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/diagnostic/index'),
      name: 'diagnostic',
      meta: { title: 'Diagnostic', icon: 'icon', noCache: false }
    }
  ]
}
export default diagnosticRouter
