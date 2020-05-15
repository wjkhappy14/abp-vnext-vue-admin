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
import blog from './modules/blog'
import region from './modules/region'

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
    blog,
    region
  }
})

export default store
