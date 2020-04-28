import { asyncRoutes, constantRoutes } from '@/router'


const state = {
  routes: constantRoutes,
  addRoutes: []
}
const getters = {
  routes: state => state.routes
}
const mutations = {

}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {

    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
