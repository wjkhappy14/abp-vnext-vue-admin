import Layout from '@/layout'

const financialRouter = {
  path: '/financial',
  component: Layout,
  redirect: 'noRedirect',
  name: 'financial',
  meta: {
    title: 'Financial',
    icon: 'chart'
  },
  children: [
    {
      path: 'month',
      component: () => import('@/views/financial/month'),
      name: 'month',
      meta: { title: 'Month', noCache: true }
    },
    {
      path: 'year',
      component: () => import('@/views/financial/year'),
      name: 'year',
      meta: { title: 'Year', noCache: true }
    },
    {
      path: 'day',
      component: () => import('@/views/financial/day'),
      name: 'day',
      meta: { title: 'Day', noCache: true }
    }
  ]
}

export default financialRouter
