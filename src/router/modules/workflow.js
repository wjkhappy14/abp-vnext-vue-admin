import Layout from '@/layout'

const workflowRouter = {
  path: '/workflow',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/workflow/index'),
      name: 'workflow',
      meta: { title: 'Workflow', icon: 'icon', noCache: true }
    }
  ]
}
export default workflowRouter
