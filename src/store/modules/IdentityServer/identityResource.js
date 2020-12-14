import { fetchList, update } from '@/api/IdentityServer/identityResource'

const state = {
  identityResource: {
    items: []
  }
}
const getters = {
  identityResource: (state) => {
    return state.identityResource;
  }
}
const mutations = {
  setIdentityResources: (state, items) => {
    state.identityResource.items = items
  }
}

const actions = {
  update({ commit }, permission) {
    return new Promise((resolve, reject) => {
      update(permission).then(response => {
        commit('setIdentityResources', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getIdentityResources({ commit }) {
    return new Promise((resolve, reject) => {
      fetchList().then(response => {
        commit('setIdentityResources', response)
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
