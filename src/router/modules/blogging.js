import Layout from '@/layout'
const bloggingRouter = {
  path: '/Blogging',
  component: Layout,
  redirect: '/Blogging/index',
  name: 'Blogging',
  meta: {
    title: 'Blogging',
    icon: 'example'
  },
  children: [
    {
      path: 'excel',
      component: () => import('@/views/Blogging/excel'),
      name: 'excel',
      meta: { title: 'Excel', icon: 'documentation', affix: false }
    },
    {
      path: 'image',
      component: () => import('@/views/Blogging/image'),
      name: 'image',
      meta: { title: '图片库', icon: 'zip', affix: false }
    },
    {
      path: 'pdf',
      component: () => import('@/views/Blogging/pdf'),
      name: 'pdf',
      meta: { title: 'PDF', icon: 'pdf', affix: false }
    },
    {
      path: 'index',
      component: () => import('@/views/Blogging/index'),
      name: 'index',
      meta: { title: '新闻动态', icon: 'pdf', affix: false }
    },
    {
      path: 'create ',
      component: () => import('@/views/Blogging/create'),
      name: 'create',
      meta: { title: '发布动态', icon: 'pdf', affix: false }
    }
  ]
}

export default bloggingRouter
