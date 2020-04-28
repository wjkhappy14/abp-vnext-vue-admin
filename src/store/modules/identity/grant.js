import { fetchList, update } from '@/api/permission/index'

const state = {
  items: []
}
const getters = {
  permissions: (state) => {
    return state.items;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  }
}

const actions = {
  update({ commit }, permission) {
    return new Promise((resolve, reject) => {
      update(permission).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getPermissions({ }, options) {
    return fetchList(options);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
