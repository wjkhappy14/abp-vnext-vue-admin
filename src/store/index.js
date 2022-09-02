import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import account from './modules/account'
import identity from './modules/identity'
import quote from './modules/quote'
import app from './modules/app'
import permission from './modules/permission'
import errorLog from './modules/errorLog'
import order from './modules/order'
import policy from './modules/policy'
import tagsView from './modules/tagsView'
import menu from './modules/menu'
import blogging from './modules/blogging'
import backgroundJob from './modules/backgroundJob'
import auditLogging from './modules/auditLogging'
import region from './modules/region'
import summary from './modules/summary'
import sale from './modules/sale'
import im from './modules/im'

const store = new Vuex.Store({
  modules: {
    account,
    app,
    errorLog,
    order,
    tagsView,
    backgroundJob,
    auditLogging,
    identity,
    policy,
    permission,
    menu,
    quote,
    blogging,
    region,
    summary,
    sale,
    im
  }
})

export default store
