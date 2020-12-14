import Layout from '@/layout'

const backgroundBobRouter = {
  path: '/BackgroundJob',
  component: Layout,
  name: 'BackgroundJob',
  redirect: '/BackgroundJob/index',
  meta: {
    title: 'Background Bob',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/BackgroundJob/index'),
      name: 'BackgroundJob',
      meta: { title: 'BackgroundJob', icon: 'guide', noCache: true }
    }
  ]
}
export default backgroundBobRouter
