import Layout from '@/layout'

const productionRouter = {
  path: '/production',
  component: Layout,
  redirect: 'noRedirect',
  name: 'component',
  meta: {
    title: 'Component',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/production/tinymce'),
      name: 'TinymceDemo',
      meta: { title: 'Tinymce' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/production/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/production/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: 'JSON Editor' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/production/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: 'SplitPane' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/production/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: 'Upload' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/production/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/production/sticky'),
      name: 'StickyDemo',
      meta: { title: 'Sticky' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/production/count-to'),
      name: 'CountToDemo',
      meta: { title: 'Count To' }
    },
    {
      path: 'mixin',
      component: () => import('@/views/production/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: 'Component Mixin' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/production/drag-select'),
      name: 'DragSelectDemo',
      meta: { title: 'Drag Select' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/production/dnd-list'),
      name: 'DndListDemo',
      meta: { title: '拖拽列表' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/production/drag-kanban'),
      name: 'DragKanbanDemo',
      meta: { title: 'Drag Kanban' }
    }
  ]
}

export default productionRouter
