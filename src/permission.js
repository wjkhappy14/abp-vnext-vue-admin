import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration


router.beforeEach(async (to, from, next) => {
  console.log({
    'to': to,
    'from': from
  });

  // 显示进度条
  NProgress.start()

  //next({ ...to, replace: true })
  next();
  NProgress.done()

})

router.afterEach(() => {
  NProgress.done()
})
