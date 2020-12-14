import { fetchList, update } from '@/api/BackgroundJob/index'

const state = {
  job: {
    items: []
  }
}
const getters = {
  permission: (state) => {
    return state.permission;
  }
}
const mutations = {
  setPermissions: (state, items) => {
    state.permission.items = items
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
  getPermissions({ commit }) {
    return new Promise((resolve, reject) => {
      fetchList().then(response => {
        commit('setPermissions', response)
      }).catch(error => {
        reject(error)
      })
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
