import { fetchList, update } from '@/api/IdentityServer/apiResource'

const state = {
  apiResource: {
    items: []
  }
}
const getters = {
  apiResource: (state) => {
    return state.apiResource;
  }
}
const mutations = {
  setApiResources: (state, items) => {
    state.apiResource.items = items
  }
}

const actions = {
  update({ commit }, permission) {
    return new Promise((resolve, reject) => {
      update(permission).then(response => {
        commit('setApiResources', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getApiResources({ commit }) {
    return new Promise((resolve, reject) => {
      fetchList().then(response => {
        commit('setApiResources', response)
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
