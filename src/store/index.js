import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import account from './modules/account'
import identity from './modules/identity'
import app from './modules/app'
import errorLog from './modules/errorLog'
import order from './modules/order'
import policy from './modules/policy'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import menu from './modules/menu'
import blogging from './modules/blogging'
import region from './modules/region'
import permission from './modules/permission/index'

const store = new Vuex.Store({
  modules: {
    account,
    app,
    errorLog,
    order,
    settings,
    tagsView,
    identity,
    policy,
    menu,
    blogging,
    region,
    permission
  }
})

export default store
