import Layout from '@/layout'

const auditLoggingRouter = {
  path: '/AuditLogging',
  component: Layout,
  name: 'logging',
  redirect: '/AuditLogging/index',
  meta: {
    title: 'Audit Logging',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/AuditLogging/index'),
      name: 'logging',
      meta: { title: 'Audit Logging', icon: 'guide', noCache: true }
    }
  ]
}
export default auditLoggingRouter
