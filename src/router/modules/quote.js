import Layout from '@/layout'

const quoteRouter = {
  path: '/quote',
  component: Layout,
  redirect: 'noRedirect',
  name: 'quote',
  meta: {
    title: 'Quote',
    icon: 'chart'
  },
  children: [
    {
      path: 'commodity',
      component: () => import('@/views/quote/commodity'),
      name: 'commodity',
      meta: { title: 'Commodity', noCache: true }
    },
    {
      path: 'contract',
      component: () => import('@/views/quote/contract'),
      name: 'contract',
      meta: { title: 'Contract', noCache: true }
    }
  ]
}

export default quoteRouter
