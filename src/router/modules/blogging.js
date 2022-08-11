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
      path: 'post',
      component: () => import('@/views/Blogging/post'),
      name: 'post',
      meta: { title: 'post', icon: 'documentation', affix: false }
    },
    {
      path: 'comment',
      component: () => import('@/views/Blogging/comment'),
      name: 'comment',
      meta: { title: 'comment', icon: 'zip', affix: false }
    },
    {
      path: 'blog',
      component: () => import('@/views/Blogging/blog'),
      name: 'blog',
      meta: { title: 'blog', icon: 'pdf', affix: false }
    },
    {
      path: 'index',
      component: () => import('@/views/Blogging/index'),
      name: 'index',
      meta: { title: '动态', icon: 'pdf', affix: false }
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
